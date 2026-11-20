import assert from "node:assert/strict";

const base = process.env.SITE_URL ?? "http://127.0.0.1:3100";
const assets = new Set();
const pages = new Set();
const normalizeTool = (tool) => ({
  "angular 18": "angular", kubeflow: "kubeflow pipelines", routage: "routing",
  "régression logistique": "logistic regression",
}[tool.toLowerCase()] ?? tool.toLowerCase());
const genericDescriptions = new Set(['web modules', 'ai/prediction', 'machine learning', 'n-tier architecture', 'private cloud']);
function toolTags(html) {
  return [...html.matchAll(/<ul class="stack"[^>]*>([\s\S]*?)<\/ul>/g)]
    .flatMap(match => [...match[1].matchAll(/<span>([^<]+)<\/span>/g)].map(tag => normalizeTool(tag[1])));
}
async function get(route) {
  const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `${route}: HTTP ${response.status}`);
  return response.text();
}
for (const locale of ["fr", "en"]) {
  const home = await get(locale === "fr" ? "/" : "/en");
  const skills = home.split('id="skills"')[1]?.split('</section>')[0] ?? '';
  const skillTags = toolTags(skills);
  const skillSet = new Set(skillTags);
  assert.equal([...skills.matchAll(/class="skills-card"/g)].length, 9, `${locale}: nine skill domains`);
  assert.equal(skillSet.size, skillTags.length, `${locale}: unique skill labels`);
  assert.ok(skillSet.size >= 90, `${locale}: expanded skills inventory`);
  const internships = home.split('id="experience"')[1]?.split('</section>')[0] ?? '';
  for (const tool of toolTags(internships)) assert.ok(skillSet.has(tool), `${locale}: internship tool ${tool} is covered`);
  for (const tool of ['langchain', 'chromadb', 'groq', 'huggingface', 'sqlalchemy', 'docker compose', 'kubeadm', 'react', 'next.js', 'gitleaks', 'dynatrace']) {
    assert.ok(skillSet.has(tool), `${locale}: documented tool ${tool} is included`);
  }
  console.log(`OK ${locale}: ${skillSet.size} unique skills across nine domains`);
  const education = home.split('id="education"')[1]?.split('</section>')[0] ?? "";
  const expectedEducation = locale === "fr"
    ? ["Cycle d’ingénieur en informatique", "Spécialisation Architecture IT et Cloud Computing.", "Semestre d’échange en dernière année", "Spécialisation Réseaux et Télécommunications."]
    : ["Engineering degree in Computer Science", "Specialization in IT Architecture and Cloud Computing.", "Final-year exchange semester", "Specialization in Networks and Telecommunications."];
  for (const text of expectedEducation) assert.ok(education.includes(text), `${locale}: education includes ${text}`);
  const contact = home.split('id="contact"')[1]?.split('</section>')[0] ?? "";
  assert.ok(contact.includes('aria-labelledby="contact-title"'), `${locale}: named contact section`);
  assert.ok(contact.includes(locale === "fr" ? 'Faisons connaissance.' : 'Let’s connect.'), `${locale}: localized invitation`);
  assert.ok(contact.includes(locale === "fr" ? '6 mois · À partir de mars 2027' : '6 months · From March 2027'), `${locale}: internship availability`);
  for (const href of ['mailto:benharbfarah85@gmail.com', 'tel:+33775691867', 'https://www.linkedin.com/in/farah-ben-harb-b26845313/', 'https://github.com/farah-ben-harb']) {
    assert.equal([...contact.matchAll(new RegExp(`href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g'))].length, 1, `${locale}: one contact link for ${href}`);
  }
  assert.ok(contact.includes('Rouen, France') && contact.includes('benharbfarah85@gmail.com'), `${locale}: readable location and email`);
  assert.ok(!contact.includes('<form'), `${locale}: no nonfunctional contact form`);
  const resume = `/resumes/farah-ben-harb-cloud-engineering-${locale}.pdf`;
  const hero = home.split('class="hero-copy"')[1]?.split('</section>')[0] ?? "";
  assert.ok(hero.includes('class="action action-outline hero-contact-link" href="#contact"'), `${locale}: direct contact shortcut`);
  const resumeLink = hero.match(/<a\b[^>]*class="icon-link resume-link"[^>]*>/)?.[0] ?? "";
  for (const attribute of [`href="${resume}"`, `hrefLang="${locale}"`, 'target="_blank"', 'rel="noopener noreferrer"', 'aria-label=', 'title=']) {
    assert.ok(resumeLink.includes(attribute), `${locale}: hero CV icon has ${attribute}`);
  }
  assert.ok(!/\sdownload(?:[\s=>])/.test(resumeLink), `${locale}: CV opens rather than forcing a download`);
  assert.equal([...home.matchAll(/href="[^"]+\.pdf"/g)].length, 1, `${locale}: one direct CV link`);
  assert.ok(!home.includes('<section class="section" id="resumes">'), `${locale}: no separate CV section`);
  const pdf = await fetch(new URL(resume, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(pdf.status, 200, `${locale}: CV is available`);
  assert.match(pdf.headers.get('content-type') ?? '', /application\/pdf/, `${locale}: CV MIME type`);
  assert.ok(!(pdf.headers.get('content-disposition') ?? '').includes('attachment'), `${locale}: PDF can open inline`);
  assert.equal(Buffer.from(await pdf.arrayBuffer()).subarray(0, 5).toString(), '%PDF-', `${locale}: valid PDF header`);
  assert.ok(home.includes('href="tel:+33775691867"'), `${locale}: click-to-call link`);
  assert.ok(home.includes('+33 7 75 69 18 67'), `${locale}: readable phone number`);
  assert.ok(home.includes(`aria-label="${locale === "fr" ? "Appeler Farah au" : "Call Farah at"} +33 7 75 69 18 67"`), `${locale}: accessible phone label`);
  const collection = home.split('class="project-collection"')[1]?.split('<section class="section" id="experience"')[0] ?? '';
  const categorySlugs = {
    'cloud-projects': ['k8s-cluster-automation', 'kubernetes-anomaly-detection-openstack'],
    'devops-projects': ['devsecops-incident-platform', 'gitops-delivery-platform', 'flask-azure-devops-pipeline'],
    'ai-projects': ['footballmatch-ai-platform-mlops', 'crm-intelligence-mlops', 'devorecruiter', 'CryptoCurrency-Project'],
    'application-projects': ['alif-app', 'Application-Airport-Management', 'wefarm-smart-agriculture-platform', 'SmartFarm-Desktop-Application', 'QuantumEscape-Game-2D-SDL', 'CampusIdeas-SPA'],
  };
  assert.equal([...collection.matchAll(/<li class="collection-card(?: collection-card-highlight)?"/g)].length, 15, `${locale}: fifteen grouped projects`);
  assert.equal([...collection.matchAll(/class="companion-link"/g)].length, 3, `${locale}: three companion repositories`);
  assert.deepEqual([...collection.matchAll(/<section class="collection-section" id="([^"]+)"/g)].map(m => m[1]), Object.keys(categorySlugs), `${locale}: four ordered categories`);
  for (const [id, slugs] of Object.entries(categorySlugs)) {
    const category = collection.split(`id="${id}"`)[1]?.split('</section>')[0] ?? '';
    assert.ok(collection.includes(`href="#${id}"`), `${locale}: navigation to ${id}`);
    assert.deepEqual([...category.matchAll(/<li class="collection-card(?: collection-card-highlight)?" id="([^"]+)"/g)].map(m => m[1]), slugs, `${locale}: projects in ${id}`);
  }
  for (const [primary, companion] of [["k8s-cluster-automation", "openstack-heat-infrastructure"], ["devorecruiter", "devorecruiter-gitops"], ["alif-app", "Alif.tn-App-k8s"]]) {
    const item = collection.split(`id="${primary}"`)[1]?.split('<li class="collection-card')[0] ?? '';
    assert.ok(item.includes(`class="companion-link" id="${companion}"`), `${locale}: ${companion} grouped with ${primary}`);
  }
  const cardIds = [...collection.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  assert.equal(new Set(cardIds).size, cardIds.length, `${locale}: no duplicate project anchors`);
  const links = [...new Set([...collection.matchAll(/href="((?:\/en)?\/projects\/[^"#?]+)"/g)].map(m => m[1]))];
  assert.equal(links.length, 18, `${locale}: all 18 project pages must be discoverable`);
  for (const route of links) {
    assert.equal(route.startsWith("/en/"), locale === "en", `Wrong locale: ${route}`);
    const html = await get(route);
    for (const tool of toolTags(html)) {
      if (!genericDescriptions.has(tool)) assert.ok(skillSet.has(tool), `${route}: ${tool} missing from skills`);
    }
    pages.add(route);
    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`));
    assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, route);
    assert.ok(!html.includes('class="limits-card"'), `${route}: no limitations panel`);
    assert.ok(html.includes(`aria-label="${locale === "fr" ? "Ressources du projet" : "Project resources"}"`), `${route}: resource-only sidebar`);
    assert.doesNotMatch(html, /<h[2-6][^>]*>[^<]*(?:Limites actuelles|Current limitations|Périmètre|Scope)[^<]*<\/h[2-6]>/i, `${route}: no scope or limitations headings`);
    for (const section of ["architecture-title", "features-title", "deployment-title", "validation-title"]) assert.ok(html.includes(`id="${section}"`), `${route}: ${section}`);
    assert.ok(html.includes(`rel="canonical" href="https://farah-me.vercel.app${route}"`), `${route}: canonical`);
    assert.ok(html.includes(`property="og:url" content="https://farah-me.vercel.app${route}"`), `${route}: Open Graph URL`);
    assert.ok(html.includes('property="og:image" content="https://farah-me.vercel.app/opengraph-image"'), `${route}: Open Graph image`);
    const slug = route.split("/").at(-1);
    const relatedSlug = { 'k8s-cluster-automation': 'openstack-heat-infrastructure', 'openstack-heat-infrastructure': 'k8s-cluster-automation' }[slug];
    if (relatedSlug) {
      const sidebar = html.split('class="project-sidebar"')[1]?.split('</aside>')[0] ?? '';
      assert.ok(sidebar.includes(`href="${locale === 'en' ? '/en' : ''}/projects/${relatedSlug}"`), `${route}: reciprocal infrastructure/cluster link`);
    }
    assert.ok(html.includes(`href="https://github.com/farah-ben-harb/${slug}"`), `${route}: GitHub`);
    assert.ok(html.includes(`href="/projects/${slug}"`) && html.includes(`href="/en/projects/${slug}"`), `${route}: FR/EN switch`);
    assert.equal(html.includes('class="action action-outline demo-link"'), slug === "footballmatch-ai-platform-mlops", `${route}: demo must be evidenced`);
    for (const match of html.matchAll(/src="(\/tool-icons\/[^" ]+\.svg)"/g)) assets.add(match[1]);
    console.log(`OK ${locale} ${route}`);
  }
}
for (const asset of assets) await get(asset);
const sitemap = await get("/sitemap.xml");
for (const route of pages) assert.ok(sitemap.includes(`https://farah-me.vercel.app${route}</loc>`), `Missing sitemap: ${route}`);
for (const route of ["/projects/not-a-project", "/en/projects/not-a-project"]) {
  assert.equal((await fetch(new URL(route, base))).status, 404, `${route}: should be 404`);
}
console.log(`Validated ${pages.size} bilingual pages, ${assets.size} local logos, sitemap, demos, locale switches and unknown-project 404s.`);
