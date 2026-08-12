const EXPECTED_API_VERSION = "v1";
const DEFAULT_API_URL =
  process.env.AFFILIATE_PUBLIC_API_URL ||
  "https://workspace.learcinet.com/api/public/v1/affiliates/products";
const DEFAULT_TIMEOUT_MS = 8000;

function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function isNonEmptyString(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

function isNonNegativeInteger(value) {
  return (
    Number.isSafeInteger(value) &&
    value >= 0
  );
}

function isHttpUrl(value) {
  if (!isNonEmptyString(value)) {
    return false;
  }

  try {
    const url = new URL(value);

    return (
      url.protocol === "https:" ||
      url.protocol === "http:"
    );
  } catch {
    return false;
  }
}

function normalizeNullableText(value) {
  return value === null
    ? null
    : value.trim();
}

function normalizeProductId(value) {
  if (!isNonEmptyString(value)) {
    return null;
  }

  const productId = value.trim();

  return (
    productId.length <= 128 &&
    /^[a-z0-9_-]+$/i.test(productId)
  )
    ? productId
    : null;
}

function normalizeAffiliateProduct(value) {
  if (!isPlainObject(value)) {
    return null;
  }

  if (
    !isNonEmptyString(value.id) ||
    !isNonEmptyString(value.name) ||
    !isHttpUrl(value.affiliateUrl) ||
    !isNonEmptyString(value.currency) ||
    !isNonNegativeInteger(value.priceCents) ||
    typeof value.deliveryToday !== "boolean" ||
    typeof value.freeShipping !== "boolean" ||
    typeof value.featured !== "boolean"
  ) {
    return null;
  }

  const nullableTexts = [
    value.description,
    value.category,
    value.brand,
    value.promotionText,
    value.promotionCode,
  ];

  if (
    nullableTexts.some(
      (item) =>
        item !== null &&
        !isNonEmptyString(item)
    )
  ) {
    return null;
  }

  if (
    value.imageUrl !== null &&
    !isHttpUrl(value.imageUrl)
  ) {
    return null;
  }

  if (
    value.secondaryImageUrl !== null &&
    !isHttpUrl(value.secondaryImageUrl)
  ) {
    return null;
  }

  if (
    value.originalPriceCents !== null &&
    !isNonNegativeInteger(value.originalPriceCents)
  ) {
    return null;
  }

  return {
    id: value.id.trim(),
    name: value.name.trim(),
    description: normalizeNullableText(value.description),
    affiliateUrl: value.affiliateUrl.trim(),
    imageUrl: normalizeNullableText(value.imageUrl),
    secondaryImageUrl: normalizeNullableText(
      value.secondaryImageUrl
    ),
    category: normalizeNullableText(value.category),
    brand: normalizeNullableText(value.brand),
    currency: value.currency.trim().toUpperCase(),
    priceCents: value.priceCents,
    originalPriceCents: value.originalPriceCents,
    promotionText: normalizeNullableText(
      value.promotionText
    ),
    promotionCode: normalizeNullableText(
      value.promotionCode
    ),
    deliveryToday: value.deliveryToday,
    freeShipping: value.freeShipping,
    featured: value.featured,
  };
}

function failure(error) {
  return {
    ok: false,
    product: null,
    error,
  };
}

export function parseAffiliatePublicProduct(payload) {
  if (
    !isPlainObject(payload) ||
    payload.ok !== true ||
    payload.apiVersion !== EXPECTED_API_VERSION ||
    !isPlainObject(payload.data)
  ) {
    return null;
  }

  return normalizeAffiliateProduct(
    payload.data.product
  );
}

export async function getAffiliatePublicProduct({
  productId,
  apiUrl = DEFAULT_API_URL,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  fetchImpl = fetch,
} = {}) {
  const requestedProductId =
    normalizeProductId(productId);

  if (
    !requestedProductId ||
    !isHttpUrl(apiUrl) ||
    typeof fetchImpl !== "function" ||
    !Number.isSafeInteger(timeoutMs) ||
    timeoutMs < 1
  ) {
    return failure("INVALID_CONFIGURATION");
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    timeoutMs
  );

  try {
    const url = new URL(apiUrl);
    url.pathname =
      `${url.pathname.replace(/\/+$/, "")}/` +
      encodeURIComponent(requestedProductId);
    url.search = "";
    url.hash = "";

    const response = await fetchImpl(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return failure(`HTTP_${response.status}`);
    }

    let payload;

    try {
      payload = await response.json();
    } catch {
      return failure("INVALID_JSON");
    }

    const product = parseAffiliatePublicProduct(
      payload
    );

    if (!product) {
      return failure("INVALID_CONTRACT");
    }

    return {
      ok: true,
      product,
      error: null,
    };
  } catch (error) {
    return failure(
      error instanceof Error &&
        error.name === "AbortError"
        ? "TIMEOUT"
        : "NETWORK_ERROR"
    );
  } finally {
    clearTimeout(timeout);
  }
}
