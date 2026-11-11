import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const data = await readFile(path.join(root, "lib", "portfolio-data.ts"), "utf8");

const repositoryNames = [
  ...data.matchAll(/repository: `\$\{github\}\/([^`]+)`/g),
].map((match) => match[1]);

const localFiles = [
  "public/project-media/alif-donations.webp",
  "public/images/farah-ben-harb-black-dress.webp",
];

const remoteUrls = [
  ...repositoryNames.map((name) => `https://github.com/farah-ben-harb/${name}`),
  "https://footballmatch-api-demo2.nicewater-00626e15.francecentral.azurecontainerapps.io/health",
  "https://footballmatch-api-demo2.nicewater-00626e15.francecentral.azurecontainerapps.io/docs",
];

const localResults = await Promise.all(
  localFiles.map(async (file) => {
    await access(path.join(root, file));
    return `OK local  ${file}`;
  }),
);

const remoteResults = await Promise.all(
  remoteUrls.map(async (url) => {
    const response = await fetch(url, {
      headers: { "User-Agent": "farah-me-link-checker/1.0" },
      redirect: "follow",
      signal: AbortSignal.timeout(20_000),
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}: ${url}`);
    }
    return `OK ${response.status}  ${url}`;
  }),
);

console.log([...localResults, ...remoteResults].join("\n"));
console.log(
  `\nValidated ${localResults.length} local resources and ${remoteResults.length} public URLs. LinkedIn is excluded because it blocks automated checks.`,
);
