const SITE_URL = "https://advikgupta.dev";
const key = process.env.INDEXNOW_KEY;

if (!key) {
  console.error("Set INDEXNOW_KEY before running this script.");
  process.exit(1);
}

const sitemap = await fetch(`${SITE_URL}/sitemap.xml`).then((r) => r.text());
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("No URLs found in the sitemap.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList,
  }),
});

console.log(
  `IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`,
);
if (!res.ok) process.exit(1);
