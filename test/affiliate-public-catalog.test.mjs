import test from "node:test";
import assert from "node:assert/strict";

import {
  formatAffiliatePrice,
  getAffiliatePublicCatalog,
  parseAffiliatePublicCatalog,
} from "../lib/affiliate-public-catalog.js";

function createProduct(overrides = {}) {
  return {
    id: " producto-1 ",
    name: " Producto de prueba ",
    description: " Descripción ",
    affiliateUrl: "https:" + "//meli.la/producto-1",
    imageUrl: "https:" + "//example.com/producto-1.jpg",
    secondaryImageUrl: null,
    category: " Tecnología ",
    brand: " LearciNet ",
    currency: "mxn",
    priceCents: 149900,
    originalPriceCents: 169900,
    promotionText: " Oferta ",
    promotionCode: " PROMO10 ",
    deliveryToday: true,
    freeShipping: true,
    featured: false,
    ...overrides,
  };
}

function createPayload({
  products = [createProduct()],
  page = 1,
  pageSize = 12,
  pageCount = 1,
  total = products.length,
} = {}) {
  return {
    ok: true,
    apiVersion: "v1",
    data: {
      products,
      pagination: {
        page,
        pageSize,
        pageCount,
        total,
      },
    },
  };
}

test("acepta y normaliza un contrato público válido", () => {
  const result = parseAffiliatePublicCatalog(createPayload());

  assert.ok(result);
  assert.equal(result.products.length, 1);
  assert.equal(result.discardedProducts, 0);
  assert.equal(result.products[0].id, "producto-1");
  assert.equal(result.products[0].name, "Producto de prueba");
  assert.equal(result.products[0].description, "Descripción");
  assert.equal(result.products[0].currency, "MXN");
  assert.equal(result.products[0].priceCents, 149900);
  assert.equal(result.products[0].promotionCode, "PROMO10");
});

test("descarta productos defectuosos sin perder los válidos", () => {
  const result = parseAffiliatePublicCatalog(
    createPayload({
      products: [
        createProduct(),
        createProduct({
          id: "producto-invalido",
          affiliateUrl: "javascript:alert(1)",
        }),
      ],
      total: 2,
    })
  );

  assert.ok(result);
  assert.equal(result.products.length, 1);
  assert.equal(result.discardedProducts, 1);
});


test("envía filtros públicos normalizados a la API", async () => {
  let requestedUrl = null;

  const fetchImpl = async (url) => {
    requestedUrl = new URL(url);

    return {
      ok: true,
      json: async () => ({
        ok: true,
        apiVersion: "v1",
        data: {
          products: [],
          pagination: {
            page: 2,
            pageSize: 12,
            pageCount: 2,
            total: 13,
          },
        },
      }),
    };
  };

  const result = await getAffiliatePublicCatalog({
    page: 2,
    q: "  ninja  ",
    category: "  Licuadoras  ",
    offer: "discount",
    sort: "price-asc",
    fetchImpl,
  });

  assert.equal(result.ok, true);
  assert.equal(requestedUrl.searchParams.get("page"), "2");
  assert.equal(requestedUrl.searchParams.get("q"), "ninja");
  assert.equal(
    requestedUrl.searchParams.get("category"),
    "Licuadoras"
  );
  assert.equal(
    requestedUrl.searchParams.get("offer"),
    "discount"
  );
  assert.equal(
    requestedUrl.searchParams.get("sort"),
    "price-asc"
  );
});

test("conserva la petición compatible cuando no hay filtros", async () => {
  let requestedUrl = null;

  const fetchImpl = async (url) => {
    requestedUrl = new URL(url);

    return {
      ok: true,
      json: async () => ({
        ok: true,
        apiVersion: "v1",
        data: {
          products: [],
          pagination: {
            page: 1,
            pageSize: 12,
            pageCount: 1,
            total: 0,
          },
        },
      }),
    };
  };

  const result = await getAffiliatePublicCatalog({
    fetchImpl,
  });

  assert.equal(result.ok, true);
  assert.equal(requestedUrl.searchParams.get("page"), "1");
  assert.equal(requestedUrl.searchParams.has("q"), false);
  assert.equal(requestedUrl.searchParams.has("category"), false);
  assert.equal(requestedUrl.searchParams.has("offer"), false);
  assert.equal(requestedUrl.searchParams.has("sort"), false);
});

test("rechaza un contrato incompatible", () => {
  assert.equal(
    parseAffiliatePublicCatalog({
      ...createPayload(),
      apiVersion: "v2",
    }),
    null
  );

  assert.equal(
    parseAffiliatePublicCatalog({
      ok: true,
      apiVersion: "v1",
      data: {
        products: [],
        pagination: null,
      },
    }),
    null
  );
});

test("formatea correctamente precios expresados en centavos", () => {
  assert.equal(formatAffiliatePrice(496400, "MXN"), "$4,964.00");
  assert.equal(formatAffiliatePrice(-1, "MXN"), null);
  assert.equal(formatAffiliatePrice(100, ""), null);
});

test("consulta la página solicitada y devuelve el catálogo", async () => {
  let requestedUrl = null;
  let requestedOptions = null;

  const result = await getAffiliatePublicCatalog({
    page: 3,
    apiUrl: "https:" + "//example.com/products",
    fetchImpl: async (url, options) => {
      requestedUrl = url.toString();
      requestedOptions = options;

      return {
        ok: true,
        status: 200,
        json: async () =>
          createPayload({
            page: 3,
            pageCount: 3,
            total: 25,
          }),
      };
    },
  });

  assert.equal(
    requestedUrl,
    "https:" + "//example.com/products?page=3"
  );
  assert.equal(requestedOptions.method, "GET");
  assert.equal(requestedOptions.cache, "no-store");
  assert.equal(requestedOptions.headers.Accept, "application/json");
  assert.equal(result.ok, true);
  assert.equal(result.products.length, 1);
  assert.equal(result.error, null);
});

test("normaliza una página inválida a la primera página", async () => {
  let requestedUrl = null;

  await getAffiliatePublicCatalog({
    page: -50,
    apiUrl: "https:" + "//example.com/products",
    fetchImpl: async (url) => {
      requestedUrl = url.toString();

      return {
        ok: true,
        status: 200,
        json: async () => createPayload(),
      };
    },
  });

  assert.equal(
    requestedUrl,
    "https:" + "//example.com/products?page=1"
  );
});

test("devuelve un error estable para respuestas HTTP fallidas", async () => {
  const result = await getAffiliatePublicCatalog({
    apiUrl: "https:" + "//example.com/products",
    fetchImpl: async () => ({
      ok: false,
      status: 503,
    }),
  });

  assert.equal(result.ok, false);
  assert.equal(result.error, "HTTP_503");
  assert.deepEqual(result.products, []);
});

test("detecta JSON inválido", async () => {
  const result = await getAffiliatePublicCatalog({
    apiUrl: "https:" + "//example.com/products",
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError("JSON inválido");
      },
    }),
  });

  assert.equal(result.ok, false);
  assert.equal(result.error, "INVALID_JSON");
});

test("detecta una respuesta que incumple el contrato", async () => {
  const result = await getAffiliatePublicCatalog({
    apiUrl: "https:" + "//example.com/products",
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        ok: true,
        apiVersion: "v1",
        data: {
          products: "dato-inválido",
        },
      }),
    }),
  });

  assert.equal(result.ok, false);
  assert.equal(result.error, "INVALID_CONTRACT");
});

test("aísla errores de red", async () => {
  const result = await getAffiliatePublicCatalog({
    apiUrl: "https:" + "//example.com/products",
    fetchImpl: async () => {
      throw new TypeError("Conexión rechazada");
    },
  });

  assert.equal(result.ok, false);
  assert.equal(result.error, "NETWORK_ERROR");
});

test("cancela una solicitud que excede el tiempo máximo", async () => {
  const result = await getAffiliatePublicCatalog({
    apiUrl: "https:" + "//example.com/products",
    timeoutMs: 10,
    fetchImpl: (_url, { signal }) =>
      new Promise((_resolve, reject) => {
        signal.addEventListener(
          "abort",
          () => {
            const error = new Error("Solicitud cancelada");
            error.name = "AbortError";
            reject(error);
          },
          { once: true }
        );
      }),
  });

  assert.equal(result.ok, false);
  assert.equal(result.error, "TIMEOUT");
});

test("rechaza una configuración inválida sin consultar la red", async () => {
  let fetchCalled = false;

  const result = await getAffiliatePublicCatalog({
    apiUrl: "dirección-inválida",
    fetchImpl: async () => {
      fetchCalled = true;
    },
  });

  assert.equal(fetchCalled, false);
  assert.equal(result.ok, false);
  assert.equal(result.error, "INVALID_CONFIGURATION");
});
