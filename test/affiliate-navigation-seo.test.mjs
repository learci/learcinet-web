import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readProjectFile = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("incluye Recomendaciones en la navegación principal", async () => {
  const source = await readProjectFile("data/siteData.js");

  assert.match(
    source,
    /\{ label: "Recomendaciones", href: "\/recomendaciones" \}/,
  );
});

test("incluye Recomendaciones en el sitemap", async () => {
  const source = await readProjectFile("app/sitemap.js");

  assert.match(source, /"\/recomendaciones"/);
});

test("conserva los metadatos SEO del escaparate", async () => {
  const source = await readProjectFile("app/recomendaciones/page.js");

  assert.match(source, /title: "Recomendaciones \| LearciNet"/);
  assert.match(source, /canonical: "\/recomendaciones"/);
  assert.match(source, /url: "\/recomendaciones"/);
});
