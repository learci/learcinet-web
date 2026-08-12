import test from "node:test";
import assert from "node:assert/strict";

import {
  buildAffiliateRecommendationAnchor,
  buildAffiliateShareTargets,
  buildLearciNetRecommendationUrl,
} from "../lib/affiliate-share.js";

test("crea un ancla segura y estable para la tarjeta", () => {
  assert.equal(
    buildAffiliateRecommendationAnchor(" MLM:123 / azul "),
    "producto-MLM-123-azul"
  );

  assert.equal(
    buildAffiliateRecommendationAnchor("✨"),
    "producto-recomendado"
  );
});

test("crea una URL pública de LearciNet que localiza el producto", () => {
  const result = buildLearciNetRecommendationUrl({
    productId: "producto-123",
  });

  const url = new URL(result);

  assert.equal(url.origin, "https://learcinet.com");
  assert.equal(
    url.pathname,
    "/recomendaciones/producto-123"
  );
  assert.equal(url.search, "");
  assert.equal(url.hash, "");
});

test("genera enlaces codificados para Facebook, WhatsApp y X", () => {
  const recommendationUrl =
    "https://learcinet.com/recomendaciones?q=Caf%C3%A9#producto-1";

  const result = buildAffiliateShareTargets({
    name: " Cafetera   automática ",
    price: " $1,540.00 ",
    url: recommendationUrl,
  });

  assert.equal(
    new URL(result.facebook).searchParams.get("u"),
    recommendationUrl
  );

  const whatsappText = new URL(
    result.whatsapp
  ).searchParams.get("text");

  assert.match(
    whatsappText,
    /Cafetera automática por \$1,540\.00\./
  );
  assert.match(whatsappText, /https:\/\/learcinet\.com/);

  const xUrl = new URL(result.x);
  assert.equal(
    xUrl.searchParams.get("url"),
    recommendationUrl
  );
  assert.equal(
    xUrl.searchParams.get("text"),
    "LearciNet te recomienda: " +
      "Cafetera automática por $1,540.00."
  );
});

test("prepara un payload compatible con compartir nativo", () => {
  const result = buildAffiliateShareTargets({
    name: "Mouse inalámbrico",
    price: "",
    url: "https://learcinet.com/recomendaciones?q=Mouse",
  });

  assert.deepEqual(
    {
      title: result.title,
      text: result.text,
      url: result.url,
    },
    {
      title: "LearciNet te recomienda: Mouse inalámbrico",
      text:
        "LearciNet te recomienda: " +
        "Mouse inalámbrico.",
      url: "https://learcinet.com/recomendaciones?q=Mouse",
    }
  );
});

test("rechaza entradas incompletas o URLs no navegables", () => {
  assert.equal(
    buildLearciNetRecommendationUrl({
      productId: "",
    }),
    null
  );

  assert.equal(
    buildLearciNetRecommendationUrl({
      productId: "../private",
    }),
    null
  );

  assert.equal(
    buildAffiliateShareTargets({
      name: "Producto",
      price: "$100",
      url: "javascript:alert(1)",
    }),
    null
  );
});
