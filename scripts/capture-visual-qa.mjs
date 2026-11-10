import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const cdpBase = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const outputDir = path.join(process.cwd(), "artifacts", "screenshots-cdp");

const specs = [
  { name: "desktop-home", width: 1440, height: 1200, mobile: false, selector: null },
  { name: "desktop-projects", width: 1440, height: 1200, mobile: false, selector: "#projects" },
  { name: "mobile-home", width: 390, height: 844, mobile: true, selector: null },
  { name: "mobile-resumes", width: 390, height: 844, mobile: true, selector: "#resumes" },
];

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function capture(spec) {
  const target = await fetch(`${cdpBase}/json/new?${encodeURIComponent(siteUrl)}`, {
    method: "PUT",
  }).then((response) => response.json());
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  let commandId = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++commandId;
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params }));
    });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: spec.width,
    height: spec.height,
    deviceScaleFactor: 1,
    mobile: spec.mobile,
  });
  await send("Page.navigate", { url: siteUrl });
  await sleep(1800);

  if (spec.selector) {
    await send("Runtime.evaluate", {
      expression: `document.querySelector(${JSON.stringify(spec.selector)})?.scrollIntoView({block: "start"})`,
    });
    await sleep(1200);
  }

  const metrics = await send("Runtime.evaluate", {
    expression:
      "JSON.stringify({innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,scrollY})",
    returnByValue: true,
  });
  const dimensions = JSON.parse(metrics.result.value);
  if (dimensions.scrollWidth > dimensions.innerWidth || dimensions.bodyWidth > dimensions.innerWidth) {
    throw new Error(`${spec.name} has horizontal overflow: ${JSON.stringify(dimensions)}`);
  }

  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const output = path.join(outputDir, `${spec.name}.png`);
  await writeFile(output, Buffer.from(screenshot.data, "base64"));
  socket.close();
  await fetch(`${cdpBase}/json/close/${target.id}`);
  return { output, dimensions };
}

await mkdir(outputDir, { recursive: true });
for (const spec of specs) {
  const result = await capture(spec);
  console.log(`${spec.name}: ${JSON.stringify(result.dimensions)} -> ${result.output}`);
}
