import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const detailPage = await readFile(
  new URL(
    "../app/recomendaciones/[productId]/page.js",
    import.meta.url
  ),
  "utf8"
);

test("crea metadatos sociales dinámicos por producto", () => {
  assert.match(detailPage, /export async function generateMetadata/);
  assert.match(detailPage, /LearciNet te recomienda:/);
  assert.match(detailPage, /siteName: "LearciNet"/);
  assert.match(detailPage, /summary_large_image/);
  assert.match(detailPage, /images:/);
  assert.match(detailPage, /canonical:/);
});

test("mantiene la compra afiliada dentro de la ficha LearciNet", () => {
  assert.match(detailPage, /product\.affiliateUrl/);
  assert.match(detailPage, /rel="noopener noreferrer sponsored"/);
  assert.match(detailPage, /ProductShare/);
  assert.match(detailPage, /Ver catálogo completo/);
});
