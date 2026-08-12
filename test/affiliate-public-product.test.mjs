import test from "node:test";
import assert from "node:assert/strict";

import {
  getAffiliatePublicProduct,
  parseAffiliatePublicProduct,
} from "../lib/affiliate-public-product.js";

function createProduct(overrides = {}) {
  return {
    id: " product-1 ",
    name: " Cafetera automática ",
    description: " Preparación sencilla. ",
    affiliateUrl: "https://meli.la/product-1",
    imageUrl: "https://example.com/product-1.jpg",
    secondaryImageUrl: null,
    category: " Hogar ",
    brand: " Marca ",
    currency: "mxn",
    priceCents: 154000,
    originalPriceCents: 199900,
    promotionText: " Oferta ",
    promotionCode: null,
    deliveryToday: false,
    freeShipping: true,
    featured: true,
    ...overrides,
  };
}

function createPayload(product = createProduct()) {
  return {
    ok: true,
    apiVersion: "v1",
    data: { product },
  };
}

test("acepta y normaliza un producto público válido", () => {
  const product = parseAffiliatePublicProduct(
    createPayload()
  );

  assert.ok(product);
  assert.equal(product.id, "product-1");
  assert.equal(product.name, "Cafetera automática");
  assert.equal(product.currency, "MXN");
  assert.equal(product.category, "Hogar");
});

test("rechaza contratos o URLs de producto inseguros", () => {
  assert.equal(
    parseAffiliatePublicProduct({
      ...createPayload(),
      apiVersion: "v2",
    }),
    null
  );

  assert.equal(
    parseAffiliatePublicProduct(
      createPayload({
        ...createProduct(),
        affiliateUrl: "javascript:alert(1)",
      })
    ),
    null
  );
});

test("consulta el endpoint individual codificando el identificador", async () => {
  let requestedUrl;

  const result = await getAffiliatePublicProduct({
    productId: " product-1 ",
    apiUrl:
      "https://workspace.learcinet.com/api/public/v1/affiliates/products",
    fetchImpl: async (url) => {
      requestedUrl = url;

      return {
        ok: true,
        json: async () => createPayload(),
      };
    },
  });

  assert.equal(result.ok, true);
  assert.equal(
    requestedUrl.toString(),
    "https://workspace.learcinet.com/api/public/v1/affiliates/products/product-1"
  );
});

test("conserva el estado HTTP cuando el producto no existe", async () => {
  const result = await getAffiliatePublicProduct({
    productId: "missing",
    fetchImpl: async () => ({
      ok: false,
      status: 404,
    }),
  });

  assert.deepEqual(result, {
    ok: false,
    product: null,
    error: "HTTP_404",
  });
});

test("aísla JSON inválido y errores de red", async () => {
  const invalidJson = await getAffiliatePublicProduct({
    productId: "product-1",
    fetchImpl: async () => ({
      ok: true,
      json: async () => {
        throw new Error("invalid");
      },
    }),
  });

  assert.equal(invalidJson.error, "INVALID_JSON");

  const network = await getAffiliatePublicProduct({
    productId: "product-1",
    fetchImpl: async () => {
      throw new Error("offline");
    },
  });

  assert.equal(network.error, "NETWORK_ERROR");
});

test("cancela una solicitud que excede el tiempo máximo", async () => {
  const result = await getAffiliatePublicProduct({
    productId: "product-1",
    timeoutMs: 10,
    fetchImpl: (_url, options) =>
      new Promise((_resolve, reject) => {
        options.signal.addEventListener("abort", () => {
          const error = new Error("aborted");
          error.name = "AbortError";
          reject(error);
        });
      }),
  });

  assert.equal(result.error, "TIMEOUT");
});

test("rechaza una configuración incompleta", async () => {
  const result = await getAffiliatePublicProduct({
    productId: "",
    fetchImpl: async () => {
      throw new Error("no debe consultarse");
    },
  });

  assert.equal(result.error, "INVALID_CONFIGURATION");

  const unsafeId = await getAffiliatePublicProduct({
    productId: "../private",
    fetchImpl: async () => {
      throw new Error("no debe consultarse");
    },
  });

  assert.equal(unsafeId.error, "INVALID_CONFIGURATION");
});
