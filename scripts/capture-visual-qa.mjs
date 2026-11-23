import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const cdpBase = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const outputDir = path.join(process.cwd(), "artifacts", "screenshots-cdp");
const specs = [
  { name: "home-desktop", route: "/", width: 1440, height: 1000 },
  { name: "home-mobile", route: "/", width: 390, height: 844, mobile: true },
  { name: "home-mobile-en", route: "/en", width: 320, height: 740, mobile: true },
  { name: "catalog-desktop", route: "/projects", width: 1440, height: 1100 },
  { name: "catalog-mobile-en", route: "/en/projects", width: 320, height: 900, mobile: true },
  { name: "profile-desktop", route: "/profile", width: 1440, height: 1000 },
  { name: "profile-mobile", route: "/profile", width: 390, height: 844, mobile: true, selector: "#skills" },
  { name: "detail-desktop", route: "/projects/k8s-cluster-automation", width: 1440, height: 1000 },
  { name: "detail-mobile-en", route: "/en/projects/footballmatch-ai-platform-mlops", width: 320, height: 800, mobile: true },
];
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function capture(spec) {
  const target = await fetch(`${cdpBase}/json/new?about:blank`, { method: "PUT" }).then(response => response.json());
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener("open", resolve, { once: true }); socket.addEventListener("error", reject, { once: true }); });
  let commandId = 0;
  const pending = new Map();
  socket.addEventListener("message", event => {
    const message = JSON.parse(event.data);
    if (!pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message)); else resolve(message.result);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++commandId; pending.set(id, { resolve, reject }); socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => (await send("Runtime.evaluate", { expression, returnByValue: true })).result.value;
  try {
    await send("Page.enable");
    await send("Runtime.enable");
    await send("Emulation.setDeviceMetricsOverride", { width: spec.width, height: spec.height, deviceScaleFactor: 1, mobile: Boolean(spec.mobile) });
    await send("Page.navigate", { url: new URL(spec.route, siteUrl).href });
    await sleep(1400);
    await send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
    if (spec.selector) { await evaluate(`document.querySelector(${JSON.stringify(spec.selector)}).scrollIntoView({block:'start'})`); await sleep(500); }
    const metrics = JSON.parse(await evaluate(`JSON.stringify({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,lang:document.documentElement.lang,h1:document.querySelectorAll('h1').length,missingAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash),homeProjects:document.querySelectorAll('.home-project-list > li').length,catalogCards:document.querySelectorAll('.collection-card').length,catalogGroups:document.querySelectorAll('.collection-section').length,skillGroups:document.querySelectorAll('.skills-card').length,experienceCards:document.querySelectorAll('#experience article').length,educationCards:document.querySelectorAll('#education article').length,contactVisible:!!document.querySelector('#contact'),cvCount:document.querySelectorAll('a[href$=".pdf"]').length})`));
    const locale = spec.route.startsWith("/en") ? "en" : "fr";
    if (metrics.width !== spec.width || metrics.scrollWidth > spec.width || metrics.lang !== locale || metrics.h1 !== 1 || metrics.missingAnchors.length) throw new Error(`${spec.name}: layout or accessibility failure ${JSON.stringify(metrics)}`);
    if (spec.name.startsWith("home") && (metrics.homeProjects !== 4 || metrics.catalogCards !== 0 || metrics.skillGroups !== 0 || !metrics.contactVisible || metrics.cvCount !== 1)) throw new Error(`${spec.name}: home is not focused ${JSON.stringify(metrics)}`);
    if (spec.name.startsWith("catalog") && (metrics.catalogCards !== 15 || metrics.catalogGroups !== 4 || metrics.skillGroups !== 0)) throw new Error(`${spec.name}: catalog mismatch ${JSON.stringify(metrics)}`);
    if (spec.name.startsWith("profile") && (metrics.skillGroups !== 9 || metrics.experienceCards !== 3 || metrics.educationCards !== 4 || metrics.catalogCards !== 0)) throw new Error(`${spec.name}: profile mismatch ${JSON.stringify(metrics)}`);
    const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
    const output = path.join(outputDir, `${spec.name}.png`);
    await writeFile(output, Buffer.from(screenshot.data, "base64"));
    if (spec.name === "home-desktop") {
      await evaluate('document.querySelector(".hero .action-primary").click()'); await sleep(1000);
      if (!(await evaluate('location.pathname === "/projects" && document.querySelectorAll(".collection-card").length === 15'))) throw new Error("Home to catalog navigation failed");
    }
    if (spec.name === "catalog-desktop") {
      await evaluate('document.querySelector("#k8s-cluster-automation .project-details-link").click()'); await sleep(1000);
      if (!(await evaluate('location.pathname === "/projects/k8s-cluster-automation"'))) throw new Error("Catalog to detail navigation failed");
      await evaluate('document.querySelector(".back-to-projects").click()'); await sleep(1000);
      if (!(await evaluate('location.pathname === "/projects" && document.querySelectorAll(".collection-card").length === 15'))) throw new Error("Detail to catalog navigation failed");
    }
    if (spec.name === "profile-mobile") {
      await evaluate('document.querySelector(".skills-card summary").focus()');
      await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r" });
      await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
      if (!(await evaluate('document.querySelector(".skills-card").open && document.querySelector(".skills-card .tool-logo, .skills-card .tool-symbol") !== null'))) throw new Error("Skills disclosure keyboard interaction failed");
    }
    console.log(`${spec.name}: ${JSON.stringify(metrics)} -> ${output}`);
  } finally {
    socket.close();
    await fetch(`${cdpBase}/json/close/${target.id}`).catch(() => {});
  }
}

await mkdir(outputDir, { recursive: true });
const selectedSpecs = process.env.VISUAL_QA_SPEC ? specs.filter(spec => spec.name === process.env.VISUAL_QA_SPEC) : specs;
if (!selectedSpecs.length) throw new Error(`Unknown visual QA spec: ${process.env.VISUAL_QA_SPEC}`);
for (const spec of selectedSpecs) await capture(spec);
