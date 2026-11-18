import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const cdpBase = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const outputDir = path.join(process.cwd(), "artifacts", "screenshots-cdp");

const specs = [
  { name: "project-football-desktop", width: 1440, height: 1100, mobile: false, selector: null, route: "/projects/footballmatch-ai-platform-mlops", project: true },
  { name: "project-crm-mobile-en", width: 390, height: 844, mobile: true, selector: "#architecture", route: "/en/projects/crm-intelligence-mlops", project: true },
  { name: "project-campus-mobile", width: 320, height: 740, mobile: true, selector: null, route: "/projects/CampusIdeas-SPA", project: true },
  { name: "project-alif-media", width: 1280, height: 900, mobile: false, selector: ".project-media", route: "/projects/alif-app", project: true },
  { name: "desktop-home", width: 1440, height: 1200, mobile: false, selector: null },
  { name: "desktop-projects", width: 1440, height: 1200, mobile: false, selector: "#projects" },
  { name: "desktop-education", width: 1440, height: 960, mobile: false, selector: "#education" },
  { name: "mobile-skills", width: 390, height: 844, mobile: true, selector: "#skills" },
  { name: "mobile-home", width: 390, height: 844, mobile: true, selector: null },
  { name: "mobile-resumes", width: 390, height: 844, mobile: true, selector: "#resumes" },
  { name: "mobile-english", width: 320, height: 740, mobile: true, selector: null, route: "/en" },
  { name: "desktop-reduced-motion", width: 1280, height: 960, mobile: false, selector: null, reducedMotion: true },
];

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function capture(spec) {
  const target = await fetch(`${cdpBase}/json/new?about:blank`, {
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
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: spec.reducedMotion ? "reduce" : "no-preference" }],
  });
  await send("Emulation.setDeviceMetricsOverride", {
    width: spec.width,
    height: spec.height,
    deviceScaleFactor: 1,
    mobile: spec.mobile,
  });
  await send("Page.navigate", { url: new URL(spec.route ?? "/", siteUrl).href });
  await sleep(1800);
  await send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });

  if (spec.selector) {
    await send("Runtime.evaluate", {
      expression: `document.querySelector(${JSON.stringify(spec.selector)})?.scrollIntoView({block: "start"})`,
    });
    await sleep(1200);
  }

  if (spec.project) {
    const metrics = await send("Runtime.evaluate", {
      expression: `JSON.stringify({width: innerWidth, scrollWidth: document.documentElement.scrollWidth, lang: document.documentElement.lang, h1: document.querySelectorAll('h1').length, sections: document.querySelectorAll('.detail-section').length, sameProject: [...document.querySelectorAll('.language-nav a')].every(a => a.pathname.endsWith(location.pathname.split('/').at(-1))), badAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.hash.slice(1))).length})`, returnByValue: true,
    });
    const dimensions = JSON.parse(metrics.result.value);
    if (dimensions.scrollWidth > dimensions.width || dimensions.h1 !== 1 || dimensions.sections !== 4 || !dimensions.sameProject || dimensions.badAnchors || dimensions.lang !== (spec.route.startsWith('/en/') ? 'en' : 'fr')) throw new Error(`Project page failed: ${JSON.stringify(dimensions)}`);
    const screenshot = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
    const output = path.join(outputDir, `${spec.name}.png`);
    await writeFile(output, Buffer.from(screenshot.data, "base64"));
    const otherLocale = spec.route.startsWith('/en/') ? 'fr' : 'en';
    await send("Runtime.evaluate", { expression: 'document.querySelector(".language-nav a:not([aria-current])").click()' });
    await sleep(1500);
    const switched = await send("Runtime.evaluate", { expression: `document.documentElement.lang === ${JSON.stringify(otherLocale)} && location.pathname.endsWith(${JSON.stringify(spec.route.split('/').at(-1))})`, returnByValue: true });
    if (!switched.result.value) throw new Error(`${spec.name}: language navigation failed`);
    await send("Runtime.evaluate", { expression: 'document.querySelector(".back-to-projects").click()' });
    await sleep(1500);
    const returned = await send("Runtime.evaluate", { expression: 'location.hash === "#projects" && !!document.querySelector("#hero-title")', returnByValue: true });
    if (!returned.result.value) throw new Error(`${spec.name}: return-to-projects navigation failed`);
    await send("Runtime.evaluate", { expression: 'document.querySelector(".project-details-link").click()' });
    await sleep(1500);
    const opened = await send("Runtime.evaluate", { expression: 'location.pathname.endsWith("/projects/crm-intelligence-mlops") && !!document.querySelector("#project-title")', returnByValue: true });
    if (!opened.result.value) throw new Error(`${spec.name}: home-to-project navigation failed`);
    socket.close();
    await fetch(`${cdpBase}/json/close/${target.id}`);
    return { output, dimensions };
  }

  const metrics = await send("Runtime.evaluate", {
    expression: `JSON.stringify({
      innerWidth, scrollWidth: document.documentElement.scrollWidth, bodyWidth: document.body.scrollWidth, scrollY,
      language: document.documentElement.lang,
      heroImageCount: document.querySelectorAll(".hero img").length,
      atlasLinks: document.querySelectorAll(".atlas-links a").length,
      atlasAnimates: getComputedStyle(document.querySelector(".atlas")).animationName !== "none",
      cvCount: document.querySelectorAll("#resumes a[download]").length,
      cvLinks: Array.from(document.querySelectorAll('a[href$=".pdf"]'), (link) => link.getAttribute("href")),
      crm: Boolean(document.querySelector('#crm-intelligence-mlops')),
      educationCards: document.querySelectorAll('#education .education-card').length,
      experienceStacks: document.querySelectorAll('#experience article .stack').length,
      skillsGroups: document.querySelectorAll('#skills .skills-card').length,
      archiveStacks: document.querySelectorAll('#more-projects .archive-list li .stack').length,
      logoCount: document.querySelectorAll('.tool-logo').length,
      hasBaccalaureate: document.querySelector('#education')?.textContent.includes(${JSON.stringify("Baccalauréat scientifique")}) || document.querySelector('#education')?.textContent.includes('Scientific baccalaureate'),
      missingAnchors: [...document.querySelectorAll('a[href^="#"]')]
        .filter((link) => !document.getElementById(link.hash.slice(1))).map((link) => link.hash),
      archiveWorks: document.querySelector('#more-projects')?.tagName === 'DIV' && document.querySelectorAll('#more-projects .archive-list > li').length === 15
    })`,
    returnByValue: true,
  });
  const dimensions = JSON.parse(metrics.result.value);
  if (dimensions.scrollWidth > dimensions.innerWidth || dimensions.bodyWidth > dimensions.innerWidth) {
    throw new Error(`${spec.name} has horizontal overflow: ${JSON.stringify(dimensions)}`);
  }
  const expectedLocale = spec.route === "/en" ? "en" : "fr";
  const expectedResume = `/resumes/farah-ben-harb-cloud-engineering-${expectedLocale}.pdf`;
  if (dimensions.language !== expectedLocale ||
      dimensions.heroImageCount !== 0 || dimensions.cvCount !== 1 || !dimensions.crm ||
      dimensions.cvLinks.length !== 2 || dimensions.cvLinks.some((href) => href !== expectedResume) ||
      dimensions.atlasLinks !== 3 || dimensions.atlasAnimates === Boolean(spec.reducedMotion) ||
      dimensions.educationCards !== 4 || dimensions.experienceStacks !== 3 || dimensions.skillsGroups !== 3 ||
      dimensions.archiveStacks !== 15 || dimensions.logoCount < 20 || !dimensions.hasBaccalaureate ||
      dimensions.missingAnchors.length || !dimensions.archiveWorks) {
    throw new Error(`${spec.name} failed the portfolio smoke check: ${JSON.stringify(dimensions)}`);
  }

  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const output = path.join(outputDir, `${spec.name}.png`);
  await writeFile(output, Buffer.from(screenshot.data, "base64"));

  await send("Runtime.evaluate", { expression: 'document.querySelector(".flow-steps summary").focus()' });
  for (const type of ["keyDown", "keyUp"]) {
    await send("Input.dispatchKeyEvent", { type, key: " ", code: "Space", windowsVirtualKeyCode: 32 });
  }
  const flow = await send("Runtime.evaluate", {
    expression: `(() => {
      const steps = [...document.querySelectorAll(".flow-steps details")];
      const keyboardOpened = steps[0].open;
      steps[1].querySelector("summary").click();
      return JSON.stringify({count: steps.length, keyboardOpened, firstOpen: steps[0].open, secondOpen: steps[1].open});
    })()`,
    returnByValue: true,
  });
  const pipeline = JSON.parse(flow.result.value);
  if (pipeline.count !== 5 || !pipeline.keyboardOpened || pipeline.firstOpen || !pipeline.secondOpen) {
    throw new Error(`${spec.name}: pipeline accordion did not respond correctly: ${flow.result.value}`);
  }

  await send("Runtime.evaluate", {
    expression: 'document.querySelector(".atlas-links a[href=\\"#devsecops-incident-platform\\"]").click()',
  });
  await sleep(250);
  const navigation = await send("Runtime.evaluate", {
    expression: 'location.hash === "#devsecops-incident-platform" && document.querySelector("#devsecops-incident-platform").getBoundingClientRect().height > 0',
    returnByValue: true,
  });
  if (!navigation.result.value) throw new Error(`${spec.name}: DevOps shortcut did not reveal the project`);

  socket.close();
  await fetch(`${cdpBase}/json/close/${target.id}`);
  return { output, dimensions };
}

await mkdir(outputDir, { recursive: true });
for (const spec of specs) {
  const result = await capture(spec);
  console.log(`${spec.name}: ${JSON.stringify(result.dimensions)} -> ${result.output}`);
}
