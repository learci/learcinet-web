const DEFAULT_SITE_URL = "https://learcinet.com";

function normalizeText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.replace(/\s+/g, " ").trim();
}

function normalizeHttpUrl(value) {
  const normalized = normalizeText(value);

  if (!normalized) {
    return null;
  }

  try {
    const url = new URL(normalized);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

export function buildAffiliateRecommendationAnchor(productId) {
  const normalized = normalizeText(productId)
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return `producto-${normalized || "recomendado"}`;
}

export function buildLearciNetRecommendationUrl({
  productId,
  siteUrl = DEFAULT_SITE_URL,
}) {
  const normalizedProductId = normalizeText(productId);
  const baseUrl = normalizeHttpUrl(siteUrl);

  if (
    !normalizedProductId ||
    normalizedProductId.length > 128 ||
    !/^[a-z0-9_-]+$/i.test(normalizedProductId) ||
    !baseUrl
  ) {
    return null;
  }

  const recommendationUrl = new URL(
    `/recomendaciones/${encodeURIComponent(normalizedProductId)}`,
    baseUrl
  );

  return recommendationUrl.toString();
}

export function buildAffiliateShareTargets({
  name,
  price,
  url,
}) {
  const productName = normalizeText(name);
  const productPrice = normalizeText(price);
  const recommendationUrl = normalizeHttpUrl(url);

  if (!productName || !recommendationUrl) {
    return null;
  }

  const priceText = productPrice
    ? ` por ${productPrice}`
    : "";

  const title = `LearciNet te recomienda: ${productName}`;
  const text =
    `LearciNet te recomienda: ` +
    `${productName}${priceText}.`;

  const facebook = new URL(
    "https://www.facebook.com/sharer/sharer.php"
  );
  facebook.searchParams.set(
    "u",
    recommendationUrl.toString()
  );

  const whatsapp = new URL("https://wa.me/");
  whatsapp.searchParams.set(
    "text",
    `${text}\n${recommendationUrl.toString()}`
  );

  const x = new URL(
    "https://twitter.com/intent/tweet"
  );
  x.searchParams.set("text", text);
  x.searchParams.set(
    "url",
    recommendationUrl.toString()
  );

  return {
    title,
    text,
    url: recommendationUrl.toString(),
    facebook: facebook.toString(),
    whatsapp: whatsapp.toString(),
    x: x.toString(),
  };
}
