const DEFAULT_API_URL =
  "https:" + "//workspace.learcinet.com/api/public/v1/affiliates/products";

const DEFAULT_TIMEOUT_MS = 5000;
const EXPECTED_API_VERSION = "v1";

function isPlainObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNullableString(value) {
  return value === null || typeof value === "string";
}

function isNonNegativeInteger(value) {
  return Number.isSafeInteger(value) && value >= 0;
}

function isPositiveInteger(value) {
  return Number.isSafeInteger(value) && value >= 1;
}

function normalizePage(value) {
  const page = Number(value);

  if (!Number.isSafeInteger(page) || page < 1) {
    return 1;
  }

  return page;
}

function normalizeOptionalString(value) {
  if (value === null) return null;
  return typeof value === "string" ? value.trim() || null : null;
}

function isValidHttpUrl(value) {
  if (!isNonEmptyString(value)) return false;

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidAffiliateProduct(value) {
  if (!isPlainObject(value)) return false;

  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.name) &&
    isNullableString(value.description) &&
    isValidHttpUrl(value.affiliateUrl) &&
    (value.imageUrl === null || isValidHttpUrl(value.imageUrl)) &&
    (value.secondaryImageUrl === null ||
      isValidHttpUrl(value.secondaryImageUrl)) &&
    isNullableString(value.category) &&
    isNullableString(value.brand) &&
    isNonEmptyString(value.currency) &&
    isNonNegativeInteger(value.priceCents) &&
    (value.originalPriceCents === null ||
      isNonNegativeInteger(value.originalPriceCents)) &&
    isNullableString(value.promotionText) &&
    isNullableString(value.promotionCode) &&
    typeof value.deliveryToday === "boolean" &&
    typeof value.freeShipping === "boolean" &&
    typeof value.featured === "boolean"
  );
}

function normalizeAffiliateProduct(value) {
  if (!isValidAffiliateProduct(value)) return null;

  return {
    id: value.id.trim(),
    name: value.name.trim(),
    description: normalizeOptionalString(value.description),
    affiliateUrl: value.affiliateUrl.trim(),
    imageUrl: normalizeOptionalString(value.imageUrl),
    secondaryImageUrl: normalizeOptionalString(value.secondaryImageUrl),
    category: normalizeOptionalString(value.category),
    brand: normalizeOptionalString(value.brand),
    currency: value.currency.trim().toUpperCase(),
    priceCents: value.priceCents,
    originalPriceCents: value.originalPriceCents,
    promotionText: normalizeOptionalString(value.promotionText),
    promotionCode: normalizeOptionalString(value.promotionCode),
    deliveryToday: value.deliveryToday,
    freeShipping: value.freeShipping,
    featured: value.featured,
  };
}

function normalizePagination(value, productCount) {
  if (!isPlainObject(value)) return null;

  if (
    !isPositiveInteger(value.page) ||
    !isPositiveInteger(value.pageSize) ||
    !isPositiveInteger(value.pageCount) ||
    !isNonNegativeInteger(value.total)
  ) {
    return null;
  }

  if (value.page > value.pageCount || productCount > value.pageSize) {
    return null;
  }

  return {
    page: value.page,
    pageSize: value.pageSize,
    pageCount: value.pageCount,
    total: value.total,
  };
}

export function formatAffiliatePrice(priceCents, currency = "MXN") {
  if (!isNonNegativeInteger(priceCents) || !isNonEmptyString(currency)) {
    return null;
  }

  try {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: currency.trim().toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(priceCents / 100);
  } catch {
    return null;
  }
}

export function parseAffiliatePublicCatalog(payload) {
  if (
    !isPlainObject(payload) ||
    payload.ok !== true ||
    payload.apiVersion !== EXPECTED_API_VERSION ||
    !isPlainObject(payload.data) ||
    !Array.isArray(payload.data.products)
  ) {
    return null;
  }

  const products = payload.data.products
    .map(normalizeAffiliateProduct)
    .filter(Boolean);

  const pagination = normalizePagination(
    payload.data.pagination,
    products.length
  );

  if (!pagination) return null;

  return {
    products,
    pagination,
    discardedProducts:
      payload.data.products.length - products.length,
  };
}

export async function getAffiliatePublicCatalog({
  page = 1,
  apiUrl = DEFAULT_API_URL,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  fetchImpl = fetch,
} = {}) {
  const requestedPage = normalizePage(page);

  if (
    !isValidHttpUrl(apiUrl) ||
    typeof fetchImpl !== "function" ||
    !Number.isSafeInteger(timeoutMs) ||
    timeoutMs < 1
  ) {
    return {
      ok: false,
      products: [],
      pagination: null,
      discardedProducts: 0,
      error: "INVALID_CONFIGURATION",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = new URL(apiUrl);
    url.searchParams.set("page", String(requestedPage));

    const response = await fetchImpl(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        products: [],
        pagination: null,
        discardedProducts: 0,
        error: `HTTP_${response.status}`,
      };
    }

    let payload;

    try {
      payload = await response.json();
    } catch {
      return {
        ok: false,
        products: [],
        pagination: null,
        discardedProducts: 0,
        error: "INVALID_JSON",
      };
    }

    const catalog = parseAffiliatePublicCatalog(payload);

    if (!catalog) {
      return {
        ok: false,
        products: [],
        pagination: null,
        discardedProducts: 0,
        error: "INVALID_CONTRACT",
      };
    }

    return {
      ok: true,
      ...catalog,
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      products: [],
      pagination: null,
      discardedProducts: 0,
      error:
        error instanceof Error && error.name === "AbortError"
          ? "TIMEOUT"
          : "NETWORK_ERROR",
    };
  } finally {
    clearTimeout(timeout);
  }
}
