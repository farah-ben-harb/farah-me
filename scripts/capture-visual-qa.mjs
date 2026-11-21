import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const cdpBase = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const outputDir = path.join(process.cwd(), "artifacts", "screenshots-cdp");

const specs = [
  { name: "project-football-desktop", width: 1440, height: 1100, mobile: false, selector: null, route: "/projects/footballmatch-ai-platform-mlops", project: true },
  { name: "project-football-tablet-resources", width: 820, height: 1180, mobile: true, selector: ".project-sidebar", route: "/projects/footballmatch-ai-platform-mlops", project: true },
  { name: "project-k8s-related", width: 1280, height: 1000, mobile: false, selector: "#architecture", route: "/projects/k8s-cluster-automation", project: true },
  { name: "project-crm-mobile-en", width: 390, height: 844, mobile: true, selector: "#architecture", route: "/en/projects/crm-intelligence-mlops", project: true },
  { name: "project-campus-mobile", width: 320, height: 740, mobile: true, selector: null, route: "/projects/CampusIdeas-SPA", project: true },
  { name: "project-alif-media", width: 1280, height: 900, mobile: false, selector: ".project-media", route: "/projects/alif-app", project: true },
  { name: "desktop-home", width: 1440, height: 1200, mobile: false, selector: null },
  { name: "desktop-contact", width: 1440, height: 900, mobile: false, selector: "#contact" },
  { name: "mobile-contact", width: 390, height: 1000, mobile: true, selector: "#contact" },
  { name: "mobile-contact-en", width: 320, height: 1100, mobile: true, selector: "#contact", route: "/en" },
  { name: "desktop-projects", width: 1440, height: 1200, mobile: false, selector: "#projects" },
  { name: "mobile-projects", width: 390, height: 844, mobile: true, selector: "#selected-projects" },
  { name: "tablet-projects", width: 820, height: 1180, mobile: true, selector: "#projects" },
  { name: "desktop-devops", width: 1440, height: 1050, mobile: false, selector: "#devops-projects" },
  { name: "desktop-applications", width: 1440, height: 1100, mobile: false, selector: "#application-projects" },
  { name: "desktop-other-projects", width: 1440, height: 1100, mobile: false, selector: "#other-projects" },
  { name: "mobile-other-projects", width: 390, height: 900, mobile: true, selector: "#other-projects" },
  { name: "mobile-cloud-en", width: 320, height: 1100, mobile: true, selector: "#cloud-projects", route: "/en" },
  { name: "desktop-groups", width: 1440, height: 1000, mobile: false, selector: "#ai-projects" },
  { name: "mobile-groups", width: 390, height: 844, mobile: true, selector: "#ai-projects" },
  { name: "desktop-education", width: 1440, height: 960, mobile: false, selector: "#education" },
  { name: "mobile-education", width: 390, height: 844, mobile: true, selector: "#education" },
  { name: "mobile-education-en", width: 320, height: 900, mobile: true, selector: "#education", route: "/en" },
  { name: "mobile-skills", width: 390, height: 844, mobile: true, selector: "#skills" },
  { name: "desktop-skills", width: 1440, height: 1200, mobile: false, selector: "#skills" },
  { name: "mobile-skills-en", width: 320, height: 1000, mobile: true, selector: "#skills", route: "/en" },
  { name: "mobile-home", width: 390, height: 844, mobile: true, selector: null },
  { name: "mobile-cv", width: 390, height: 844, mobile: true, selector: ".hero .actions" },
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
    const opened = await send("Runtime.evaluate", { expression: 'location.pathname.endsWith("/projects/k8s-cluster-automation") && !!document.querySelector("#project-title")', returnByValue: true });
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
      cvCount: document.querySelectorAll(".hero .actions .resume-link").length,
      contactLinks: document.querySelectorAll('#contact a').length,
      contactLandmark: document.querySelector('#contact')?.getAttribute('aria-labelledby') === 'contact-title',
      cvSectionCount: document.querySelectorAll("section#resumes").length,
      cvAccessible: (() => {
        const link = document.querySelector('.resume-link');
        const bounds = link?.getBoundingClientRect();
        return Boolean(link?.getAttribute('aria-label') && link?.title && link?.target === '_blank' && link?.relList.contains('noopener') && !link?.hasAttribute('download') && bounds.width >= 44 && bounds.height >= 44);
      })(),
      cvLinks: Array.from(document.querySelectorAll('a[href$=".pdf"]'), (link) => link.getAttribute("href")),
      crm: Boolean(document.querySelector('#crm-intelligence-mlops')),
      educationCards: document.querySelectorAll('#education .education-card').length,
      experienceStacks: document.querySelectorAll('#experience article .stack').length,
      skillsGroups: document.querySelectorAll('#skills .skills-card').length,
      skillIcons: document.querySelectorAll('#skills .tool-logo, #skills .tool-symbol').length,
      unknownSkillIcons: document.querySelectorAll('#skills .tool-fallback').length,
      projectCards: document.querySelectorAll('.collection-card').length,
      projectCategories: document.querySelectorAll('.collection-section').length,
      groupedInfrastructure: document.querySelector('#k8s-cluster-automation .companion-link')?.id === 'openstack-heat-infrastructure',
      companionLinks: document.querySelectorAll('.companion-link').length,
      logoCount: document.querySelectorAll('.tool-logo').length,
      hasBaccalaureate: document.querySelector('#education')?.textContent.includes(${JSON.stringify("Baccalauréat scientifique")}) || document.querySelector('#education')?.textContent.includes('Scientific baccalaureate'),
      missingAnchors: [...document.querySelectorAll('a[href^="#"]')]
        .filter((link) => !document.getElementById(link.hash.slice(1))).map((link) => link.hash),
      collectionNav: document.querySelectorAll('.collection-nav a').length === 5
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
      dimensions.heroImageCount !== 0 || dimensions.cvCount !== 1 || dimensions.cvSectionCount !== 0 || !dimensions.cvAccessible || !dimensions.crm ||
      dimensions.contactLinks !== 4 || !dimensions.contactLandmark ||
      dimensions.cvLinks.length !== 1 || dimensions.cvLinks.some((href) => href !== expectedResume) ||
      dimensions.atlasLinks !== 0 ||
      dimensions.educationCards !== 4 || dimensions.experienceStacks !== 3 || dimensions.skillsGroups !== 9 || dimensions.skillIcons !== 111 || dimensions.unknownSkillIcons !== 0 ||
      dimensions.projectCards !== 15 || dimensions.projectCategories !== 5 || !dimensions.groupedInfrastructure || dimensions.companionLinks !== 3 || dimensions.logoCount < 20 || !dimensions.hasBaccalaureate ||
      dimensions.missingAnchors.length || !dimensions.collectionNav) {
    throw new Error(`${spec.name} failed the portfolio smoke check: ${JSON.stringify(dimensions)}`);
  }

  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  const output = path.join(outputDir, `${spec.name}.png`);
  await writeFile(output, Buffer.from(screenshot.data, "base64"));

  if (spec.name.includes('skills')) {
    await send("Runtime.evaluate", { expression: 'document.querySelector(".skill-evidence summary").focus({preventScroll: true})' });
    for (const type of ["keyDown", "keyUp"]) {
      await send("Input.dispatchKeyEvent", { type, key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, ...(type === "keyDown" ? { text: "\r" } : {}) });
    }
    const evidenceOpened = await send("Runtime.evaluate", {
      expression: 'document.querySelector(".skill-evidence").open && document.querySelector(".skill-evidence a").getBoundingClientRect().height >= 44', returnByValue: true,
    });
    if (!evidenceOpened.result.value) throw new Error(`${spec.name}: skills evidence keyboard disclosure failed`);
  }

  await send("Runtime.evaluate", { expression: 'document.querySelector(".hero-contact-link").focus()' });
  let shortcutVisible = false;
  const focusDeadline = Date.now() + 5000;
  while (!shortcutVisible && Date.now() < focusDeadline) {
    const result = await send("Runtime.evaluate", {
      expression: '(() => { const link = document.querySelector(".hero-contact-link"); const bounds = link.getBoundingClientRect(); return document.activeElement === link && bounds.top >= 0 && bounds.bottom <= innerHeight; })()',
      returnByValue: true,
    });
    shortcutVisible = result.result.value === true;
    if (!shortcutVisible) await sleep(100);
  }
  if (!shortcutVisible) throw new Error(`${spec.name}: contact shortcut could not be focused on screen`);
  for (const type of ["keyDown", "keyUp"]) {
    await send("Input.dispatchKeyEvent", { type, key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  }
  let contactReached = false;
  const contactDeadline = Date.now() + 5000;
  while (!contactReached && Date.now() < contactDeadline) {
    const result = await send("Runtime.evaluate", {
      expression: 'location.hash === "#contact" && document.querySelector("#contact-title").getBoundingClientRect().top >= 0 && document.querySelector("#contact-title").getBoundingClientRect().bottom < innerHeight',
      returnByValue: true,
    });
    contactReached = result.result.value === true;
    if (!contactReached) await sleep(100);
  }
  if (!contactReached) {
    const diagnostics = await send("Runtime.evaluate", {
      expression: 'JSON.stringify({hash: location.hash, focused: document.activeElement?.className, headingTop: document.querySelector("#contact-title")?.getBoundingClientRect().top, scrollY, innerHeight})',
      returnByValue: true,
    });
    throw new Error(`${spec.name}: hero-to-contact keyboard navigation failed: ${diagnostics.result.value}`);
  }
  // Fragment focus changes can finish after the heading first enters view.
  // Let smooth scrolling settle before sending another keyboard interaction.
  let lastScroll = null;
  let stableScroll = 0;
  const settleDeadline = Date.now() + 5000;
  while (stableScroll < 3 && Date.now() < settleDeadline) {
    await sleep(100);
    const position = await send("Runtime.evaluate", { expression: 'scrollY', returnByValue: true });
    stableScroll = position.result.value === lastScroll ? stableScroll + 1 : 0;
    lastScroll = position.result.value;
  }

  await send("Runtime.evaluate", { expression: `document.querySelector('.collection-nav a[href="#ai-projects"]').focus({preventScroll: true})` });
  for (const type of ["keyDown", "keyUp"]) {
    await send("Input.dispatchKeyEvent", { type, key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  }
  let groupNavigationPassed = false;
  const navigationDeadline = Date.now() + 5000;
  // Wait for the real scroll result instead of racing a fixed animation delay.
  while (!groupNavigationPassed && Date.now() < navigationDeadline) {
    const groupNavigation = await send("Runtime.evaluate", {
      expression: 'location.hash === "#ai-projects" && document.querySelector("#ai-projects").getBoundingClientRect().top >= 0 && document.querySelector("#ai-projects").getBoundingClientRect().top < innerHeight',
      returnByValue: true,
    });
    groupNavigationPassed = groupNavigation.result.value === true;
    if (!groupNavigationPassed) await sleep(100);
  }
  if (!groupNavigationPassed) throw new Error(`${spec.name}: group keyboard navigation failed`);

  await send("Runtime.evaluate", { expression: 'document.querySelector(\'.collection-nav a[href="#devops-projects"]\').click()' });
  await sleep(250);
  const navigation = await send("Runtime.evaluate", { expression: 'location.hash === "#devops-projects" && document.querySelector("#devops-projects").getBoundingClientRect().height > 0', returnByValue: true });
  if (!navigation.result.value) throw new Error(`${spec.name}: DevOps category link failed`);

  if (spec.name === 'desktop-projects' || spec.name === 'mobile-cloud-en') {
    await send("Runtime.evaluate", { expression: 'document.querySelector("#openstack-heat-infrastructure").click()' });
    await sleep(1500);
    const infrastructure = await send("Runtime.evaluate", { expression: 'location.pathname.endsWith("/projects/openstack-heat-infrastructure") && !!document.querySelector("#project-title")', returnByValue: true });
    if (!infrastructure.result.value) throw new Error(`${spec.name}: grouped OpenStack link failed`);
    await send("Runtime.evaluate", { expression: 'document.querySelector(\'.project-sidebar a[href$="/projects/k8s-cluster-automation"]\').click()' });
    await sleep(1500);
    const cluster = await send("Runtime.evaluate", { expression: 'location.pathname.endsWith("/projects/k8s-cluster-automation") && !!document.querySelector("#project-title")', returnByValue: true });
    if (!cluster.result.value) throw new Error(`${spec.name}: related Kubernetes navigation failed`);
  }

  socket.close();
  await fetch(`${cdpBase}/json/close/${target.id}`);
  return { output, dimensions };
}

await mkdir(outputDir, { recursive: true });
const selectedSpecs = process.env.VISUAL_QA_SPEC
  ? specs.filter((spec) => spec.name === process.env.VISUAL_QA_SPEC)
  : specs;
if (!selectedSpecs.length) throw new Error(`Unknown visual QA spec: ${process.env.VISUAL_QA_SPEC}`);
for (const spec of selectedSpecs) {
  const result = await capture(spec);
  console.log(`${spec.name}: ${JSON.stringify(result.dimensions)} -> ${result.output}`);
}
