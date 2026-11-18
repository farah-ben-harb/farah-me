import assert from "node:assert/strict";

const base = process.env.SITE_URL ?? "http://127.0.0.1:3100";
const assets = new Set();
const pages = new Set();
async function get(route) {
  const response = await fetch(new URL(route, base), { signal: AbortSignal.timeout(20000) });
  assert.equal(response.status, 200, `${route}: HTTP ${response.status}`);
  return response.text();
}
for (const locale of ["fr", "en"]) {
  const home = await get(locale === "fr" ? "/" : "/en");
  const education = home.split('id="education"')[1]?.split('</section>')[0] ?? "";
  const expectedEducation = locale === "fr"
    ? ["Cycle d’ingénieur en informatique", "Spécialisation Architecture IT et Cloud Computing.", "Semestre d’échange en dernière année", "Spécialisation Réseaux et Télécommunications."]
    : ["Engineering degree in Computer Science", "Specialization in IT Architecture and Cloud Computing.", "Final-year exchange semester", "Specialization in Networks and Telecommunications."];
  for (const text of expectedEducation) assert.ok(education.includes(text), `${locale}: education includes ${text}`);
  assert.ok(home.includes('href="tel:+33775691867"'), `${locale}: click-to-call link`);
  assert.ok(home.includes('+33 7 75 69 18 67'), `${locale}: readable phone number`);
  assert.ok(home.includes(`aria-label="${locale === "fr" ? "Appeler Farah au" : "Call Farah at"} +33 7 75 69 18 67"`), `${locale}: accessible phone label`);
  assert.equal([...home.matchAll(/class="selected-card project-details-link"/g)].length, 6, `${locale}: six selected projects`);
  assert.equal([...home.matchAll(/class="companion-link"/g)].length, 2, `${locale}: two companion repositories`);
  assert.ok(home.includes('id="ai-projects"') && home.includes('id="application-projects"'), `${locale}: domain groups`);
  const selected = home.match(/<ul class="selected-grid">([\s\S]*?)<\/section>/)?.[1] ?? "";
  assert.deepEqual([...selected.matchAll(/class="selected-card project-details-link"[^>]+id="([^"]+)"/g)].map(m => m[1]), [
    "k8s-cluster-automation", "footballmatch-ai-platform-mlops", "devsecops-incident-platform",
    "gitops-delivery-platform", "openstack-heat-infrastructure", "flask-azure-devops-pipeline",
  ], `${locale}: Cloud/DevOps featured order`);
  for (const [primary, companion] of [["devorecruiter", "devorecruiter-gitops"], ["alif-app", "Alif.tn-App-k8s"]]) {
    const item = home.split(`class="directory-item" id="${primary}"`)[1]?.split('class="directory-item"')[0] ?? "";
    assert.ok(item.includes(`class="companion-link" id="${companion}"`), `${locale}: ${companion} grouped with ${primary}`);
  }
  const links = [...new Set([...home.matchAll(/href="((?:\/en)?\/projects\/[^"#?]+)"/g)].map(m => m[1]))];
  assert.equal(links.length, 18, `${locale}: all 18 project pages must be discoverable`);
  for (const route of links) {
    assert.equal(route.startsWith("/en/"), locale === "en", `Wrong locale: ${route}`);
    const html = await get(route);
    pages.add(route);
    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`));
    assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, route);
    for (const section of ["architecture-title", "features-title", "deployment-title", "validation-title"]) assert.ok(html.includes(`id="${section}"`), `${route}: ${section}`);
    assert.ok(html.includes(`rel="canonical" href="https://farah-me.vercel.app${route}"`), `${route}: canonical`);
    assert.ok(html.includes(`property="og:url" content="https://farah-me.vercel.app${route}"`), `${route}: Open Graph URL`);
    assert.ok(html.includes('property="og:image" content="https://farah-me.vercel.app/opengraph-image"'), `${route}: Open Graph image`);
    const slug = route.split("/").at(-1);
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
