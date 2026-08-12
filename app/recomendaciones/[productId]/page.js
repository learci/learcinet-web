import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { buildLearciNetRecommendationUrl } from "@/lib/affiliate-share";
import { formatAffiliatePrice } from "@/lib/affiliate-public-catalog";
import { getAffiliatePublicProduct } from "@/lib/affiliate-public-product";

import ProductShare from "../ProductShare";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const FALLBACK_DESCRIPTION =
  "Descubre esta recomendación seleccionada por LearciNet y consulta sus detalles antes de comprar.";

function buildDescription(product, price) {
  if (product.description) {
    return product.description;
  }

  return price
    ? `${product.name} por ${price}. Recomendación seleccionada por LearciNet.`
    : FALLBACK_DESCRIPTION;
}

const loadProduct = cache((productId) =>
  getAffiliatePublicProduct({ productId })
);

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const result = await loadProduct(productId);

  if (!result.ok) {
    return {
      title: "Recomendación no disponible | LearciNet",
      description: FALLBACK_DESCRIPTION,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const product = result.product;
  const price = formatAffiliatePrice(
    product.priceCents,
    product.currency
  );
  const description = buildDescription(product, price);
  const pathname = `/recomendaciones/${encodeURIComponent(product.id)}`;
  const imageUrl =
    product.imageUrl ||
    product.secondaryImageUrl;

  return {
    title: `LearciNet te recomienda: ${product.name}`,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: `LearciNet te recomienda: ${product.name}`,
      description,
      url: pathname,
      siteName: "LearciNet",
      type: "website",
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: product.name,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: imageUrl
        ? "summary_large_image"
        : "summary",
      title: `LearciNet te recomienda: ${product.name}`,
      description,
      ...(imageUrl
        ? { images: [imageUrl] }
        : {}),
    },
  };
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m4 7 8-4 8 4-8 4-8-4Z" />
      <path d="M4 7v10l8 4 8-4V7M12 11v10" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </svg>
  );
}

export default async function ProductRecommendationPage({
  params,
}) {
  const { productId } = await params;
  const result = await loadProduct(productId);

  if (!result.ok) {
    if (result.error === "HTTP_404") {
      notFound();
    }

    return (
      <>
        <SiteHeader />
        <main className={styles.page}>
          <section className={styles.unavailable}>
            <PackageIcon />
            <p className={styles.eyebrow}>
              Servicio temporalmente no disponible
            </p>
            <h1>No pudimos cargar esta recomendación.</h1>
            <p>
              Puedes intentarlo nuevamente en unos momentos o
              explorar el resto del catálogo de LearciNet.
            </p>
            <Link href="/recomendaciones">
              Ver recomendaciones
            </Link>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }

  const product = result.product;
  const price = formatAffiliatePrice(
    product.priceCents,
    product.currency
  );
  const originalPrice =
    product.originalPriceCents !== null
      ? formatAffiliatePrice(
          product.originalPriceCents,
          product.currency
        )
      : null;
  const hasDiscount =
    product.originalPriceCents !== null &&
    product.originalPriceCents > product.priceCents;
  const imageUrl =
    product.imageUrl ||
    product.secondaryImageUrl;
  const shareUrl = buildLearciNetRecommendationUrl({
    productId: product.id,
  });

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <nav className={styles.breadcrumb} aria-label="Ruta">
          <Link href="/recomendaciones">Recomendaciones</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Detalle</span>
        </nav>

        <article className={styles.product}>
          <div className={styles.visual}>
            {product.featured && (
              <span className={styles.featured}>
                Recomendado por LearciNet
              </span>
            )}

            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className={styles.placeholder}>
                <PackageIcon />
                <span>Imagen no disponible</span>
              </div>
            )}
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>
              LearciNet te recomienda
            </p>

            <div className={styles.meta}>
              {product.category && (
                <span>{product.category}</span>
              )}
              {product.brand && (
                <span>{product.brand}</span>
              )}
            </div>

            <h1>{product.name}</h1>

            {product.description && (
              <p className={styles.description}>
                {product.description}
              </p>
            )}

            <div className={styles.price}>
              {hasDiscount && originalPrice && (
                <span>{originalPrice}</span>
              )}
              <strong>{price}</strong>
            </div>

            {(product.promotionText ||
              product.promotionCode) && (
              <div className={styles.promotion}>
                {product.promotionText && (
                  <span>{product.promotionText}</span>
                )}
                {product.promotionCode && (
                  <strong>
                    Código: {product.promotionCode}
                  </strong>
                )}
              </div>
            )}

            {(product.deliveryToday ||
              product.freeShipping) && (
              <div className={styles.shipping}>
                <TruckIcon />
                <div>
                  {product.deliveryToday && (
                    <span>Entrega hoy</span>
                  )}
                  {product.freeShipping && (
                    <span>Envío gratis</span>
                  )}
                </div>
              </div>
            )}

            <a
              className={styles.productButton}
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              Ver producto en Mercado Libre
              <ArrowUpRight />
            </a>

            <ProductShare
              name={product.name}
              price={price}
              url={shareUrl}
            />

            <p className={styles.disclosure}>
              Este es un enlace de afiliado. LearciNet puede
              recibir una comisión si realizas una compra, sin
              costo adicional para ti.
            </p>
          </div>
        </article>

        <section className={styles.more}>
          <div>
            <p className={styles.eyebrow}>Sigue explorando</p>
            <h2>Más recomendaciones de LearciNet</h2>
          </div>
          <Link href="/recomendaciones">
            Ver catálogo completo
          </Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
