#!/usr/bin/env node
// Submits changed URLs to IndexNow (Bing, Yandex, Seznam, Naver, ...).
// Usage: node scripts/indexnow.mjs <from-sha> <to-sha>
//        node scripts/indexnow.mjs --urls https://teguhcoding.com/a https://teguhcoding.com/b
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";

const HOST = "teguhcoding.com";
const SITE = `https://${HOST}`;

const keyFile = readdirSync("public").find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error("IndexNow key file not found in public/");
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/, "");

function urlsFromDiff(from, to) {
  const files = execFileSync("git", ["diff", "--name-only", from, to], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean);

  const urls = new Set();
  for (const file of files) {
    const post = file.match(/^content\/blog\/(.+)\.md$/);
    if (post) {
      urls.add(`${SITE}/blog/${post[1]}`);
      urls.add(`${SITE}/blog`);
      urls.add(`${SITE}/`);
      urls.add(`${SITE}/llms.txt`);
      continue;
    }
    const page = file.match(/^app\/((?:[^/[\]()]+\/)*)page\.tsx$/);
    if (page) {
      if (/^(bahlil|search)\//.test(page[1])) continue; // admin + noindex pages
      urls.add(`${SITE}/${page[1].replace(/\/$/, "")}`);
      continue;
    }
    if (file === "lib/projects.ts") urls.add(`${SITE}/projects`);
    if (file === "lib/experience.ts") urls.add(`${SITE}/experience`).add(`${SITE}/about`);
    if (file === "lib/chatbot/knowledge.ts") urls.add(`${SITE}/jasa-pembuatan-website`);
  }
  return [...urls];
}

const args = process.argv.slice(2);
const urlList =
  args[0] === "--urls" ? args.slice(1) : args.length === 2 ? urlsFromDiff(args[0], args[1]) : null;

if (!urlList) {
  console.error("Usage: indexnow.mjs <from-sha> <to-sha> | --urls <url...>");
  process.exit(1);
}
if (urlList.length === 0) {
  console.log("No indexable changes.");
  process.exit(0);
}

if (process.env.INDEXNOW_DRY_RUN) {
  console.log(`Dry run, would submit ${urlList.length} URL(s):\n  ${urlList.join("\n  ")}`);
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key,
    keyLocation: `${SITE}/${keyFile}`,
    urlList: urlList.slice(0, 10000),
  }),
});

console.log(`IndexNow ${res.status} for ${urlList.length} URL(s):`);
for (const url of urlList) console.log(`  ${url}`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
