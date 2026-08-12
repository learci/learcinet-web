import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import {
  buildAffiliateRecommendationAnchor,
  buildLearciNetRecommendationUrl,
} from "@/lib/affiliate-share";
import {
  formatAffiliatePrice,
  getAffiliatePublicCatalog,
} from "@/lib/affiliate-public-catalog";

import ProductShare from "./ProductShare";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Recomendaciones | LearciNet",
  description:
    "Descubre productos seleccionados por LearciNet, promociones disponibles y enlaces seguros para comprar en Mercado Libre.",
  alternates: {
    canonical: "/recomendaciones",
  },
  openGraph: {
    title: "Recomendaciones | LearciNet",
    description:
      "Productos seleccionados, promociones y oportunidades disponibles en Mercado Libre.",
    url: "/recomendaciones",
    type: "website",
  },
};

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

function getVisiblePages(currentPage, pageCount) {
  const start = Math.max(
    1,
    Math.min(currentPage - 2, pageCount - 4)
  );

  const end = Math.min(
    pageCount,
    start + 4
  );

  return Array.from(
    {
      length: Math.max(
        0,
        end - start + 1
      ),
    },
    (_, index) => start + index
  );
}

function ProductImage({ product }) {
  const imageUrl =
    product.imageUrl ||
    product.secondaryImageUrl;

  if (!imageUrl) {
    return (
      <div className={styles.imagePlaceholder}>
        <PackageIcon />
        <span>Imagen no disponible</span>
      </div>
    );
  }

  return (
    <img
      className={styles.productImage}
      src={imageUrl}
      alt={product.name}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

function ProductCard({ product }) {
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
    product.originalPriceCents >
      product.priceCents;
  const shareAnchor =
    buildAffiliateRecommendationAnchor(
      product.id
    );
  const shareUrl =
    buildLearciNetRecommendationUrl({
      productId: product.id,
      productName: product.name,
    });

  return (
    <article
      id={shareAnchor}
      className={styles.productCard}
    >
      <div className={styles.imageArea}>
        {product.featured && (
          <span
            className={styles.featuredBadge}
          >
            Recomendado
          </span>
        )}

        <ProductImage product={product} />
      </div>

      <div className={styles.productContent}>
        <div className={styles.productMeta}>
          {product.category && (
            <span>{product.category}</span>
          )}

          {product.brand && (
            <span>{product.brand}</span>
          )}
        </div>

        <h2>{product.name}</h2>

        {product.description && (
          <p className={styles.description}>
            {product.description}
          </p>
        )}

        <div className={styles.priceBlock}>
          {hasDiscount &&
            originalPrice && (
              <span
                className={
                  styles.originalPrice
                }
              >
                {originalPrice}
              </span>
            )}

          <strong>{price}</strong>
        </div>

        {(product.promotionText ||
          product.promotionCode) && (
          <div className={styles.promotion}>
            {product.promotionText && (
              <span>
                {product.promotionText}
              </span>
            )}

            {product.promotionCode && (
              <strong>
                Código:{" "}
                {product.promotionCode}
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
          aria-label={`Ver ${product.name} en Mercado Libre`}
        >
          Ver producto
          <ArrowUpRight />
        </a>

        <ProductShare
          name={product.name}
          price={price}
          url={shareUrl}
        />
      </div>
    </article>
  );
}

function CatalogMessage({
  type,
  filtered = false,
}) {
  const unavailable =
    type === "unavailable";

  return (
    <section
      className={styles.catalogMessage}
    >
      <div className={styles.messageIcon}>
        <PackageIcon />
      </div>

      <p className={styles.eyebrow}>
        {unavailable
          ? "Servicio temporalmente no disponible"
          : filtered
            ? "Sin coincidencias"
            : "Catálogo"}
      </p>

      <h2>
        {unavailable
          ? "No pudimos cargar las recomendaciones."
          : filtered
            ? "No encontramos productos con estos filtros."
            : "Próximamente encontrarás nuevas recomendaciones."}
      </h2>

      <p>
        {unavailable
          ? "Puedes intentarlo nuevamente en unos momentos. El resto de LearciNet continúa funcionando normalmente."
          : filtered
            ? "Prueba modificando la búsqueda, categoría, oferta u ordenamiento."
            : "Estamos preparando una selección de productos útiles y oportunidades destacadas para ti."}
      </p>

      {unavailable && (
        <Link
          className={styles.retryButton}
          href="/recomendaciones"
        >
          Intentar nuevamente
        </Link>
      )}

      {!unavailable && filtered && (
        <Link
          className={styles.retryButton}
          href="/recomendaciones"
        >
          Limpiar filtros
        </Link>
      )}
    </section>
  );
}

function normalizeSearchParam(value) {
  if (Array.isArray(value)) {
    return typeof value[0] === "string"
      ? value[0].trim()
      : "";
  }

  return typeof value === "string"
    ? value.trim()
    : "";
}

function buildRecommendationsHref(
  page,
  filters
) {
  const params =
    new URLSearchParams();

  if (page > 1) {
    params.set(
      "page",
      String(page)
    );
  }

  if (filters.q) {
    params.set(
      "q",
      filters.q
    );
  }

  if (filters.category) {
    params.set(
      "category",
      filters.category
    );
  }

  if (
    filters.offer &&
    filters.offer !== "all"
  ) {
    params.set(
      "offer",
      filters.offer
    );
  }

  if (
    filters.sort &&
    filters.sort !== "recommended"
  ) {
    params.set(
      "sort",
      filters.sort
    );
  }

  const query =
    params.toString();

  return query
    ? `/recomendaciones?${query}`
    : "/recomendaciones";
}

function FilterPanel({
  filters,
  categories,
  total,
}) {
  return (
    <section
      className={styles.filters}
      aria-labelledby="catalog-filters-title"
    >
      <div
        className={
          styles.filtersHeading
        }
      >
        <div>
          <p className={styles.eyebrow}>
            Encuentra lo que buscas
          </p>

          <h2 id="catalog-filters-title">
            Filtra las recomendaciones
          </h2>
        </div>

        <span>
          {total}{" "}
          {total === 1
            ? "resultado"
            : "resultados"}
        </span>
      </div>

      <form
        className={styles.filterForm}
        action="/recomendaciones"
        method="get"
      >
        <div
          className={
            styles.searchField
          }
        >
          <label htmlFor="affiliate-search">
            Buscar
          </label>

          <input
            id="affiliate-search"
            name="q"
            type="search"
            placeholder="Producto, marca o categoría..."
            defaultValue={filters.q}
          />
        </div>

        <div
          className={
            styles.filterField
          }
        >
          <label htmlFor="affiliate-category">
            Categoría
          </label>

          <select
            id="affiliate-category"
            name="category"
            defaultValue={
              filters.category
            }
          >
            <option value="">
              Todas las categorías
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>
        </div>

        <div
          className={
            styles.filterField
          }
        >
          <label htmlFor="affiliate-offer">
            Oferta
          </label>

          <select
            id="affiliate-offer"
            name="offer"
            defaultValue={
              filters.offer
            }
          >
            <option value="all">
              Todas
            </option>

            <option value="discount">
              Con descuento
            </option>

            <option value="code">
              Código de descuento
            </option>

            <option value="free-shipping">
              Envío gratis
            </option>
          </select>
        </div>

        <div
          className={
            styles.filterField
          }
        >
          <label htmlFor="affiliate-sort">
            Ordenar por
          </label>

          <select
            id="affiliate-sort"
            name="sort"
            defaultValue={
              filters.sort
            }
          >
            <option value="recommended">
              Recomendados
            </option>

            <option value="newest">
              Más recientes
            </option>

            <option value="price-asc">
              Menor precio
            </option>

            <option value="price-desc">
              Mayor precio
            </option>
          </select>
        </div>

        <div
          className={
            styles.filterActions
          }
        >
          <button type="submit">
            Aplicar filtros
          </button>

          <Link href="/recomendaciones">
            Limpiar
          </Link>
        </div>
      </form>
    </section>
  );
}

function Pagination({
  pagination,
  filters,
}) {
  if (
    !pagination ||
    pagination.pageCount <= 1
  ) {
    return null;
  }

  const pages = getVisiblePages(
    pagination.page,
    pagination.pageCount
  );

  return (
    <nav
      className={styles.pagination}
      aria-label="Páginas del catálogo"
    >
      {pagination.page > 1 && (
        <Link
          href={buildRecommendationsHref(
            pagination.page - 1,
            filters
          )}
        >
          Anterior
        </Link>
      )}

      <div
        className={
          styles.pageNumbers
        }
      >
        {pages.map((page) => (
          <Link
            key={page}
            href={buildRecommendationsHref(
              page,
              filters
            )}
            className={
              page ===
              pagination.page
                ? styles.activePage
                : ""
            }
            aria-current={
              page ===
              pagination.page
                ? "page"
                : undefined
            }
          >
            {page}
          </Link>
        ))}
      </div>

      {pagination.page <
        pagination.pageCount && (
        <Link
          href={buildRecommendationsHref(
            pagination.page + 1,
            filters
          )}
        >
          Siguiente
        </Link>
      )}
    </nav>
  );
}

export default async function RecommendationsPage({
  searchParams,
}) {
  const params =
    await searchParams;

  const filters = {
    q: normalizeSearchParam(
      params?.q
    ),

    category:
      normalizeSearchParam(
        params?.category
      ),

    offer:
      normalizeSearchParam(
        params?.offer
      ) || "all",

    sort:
      normalizeSearchParam(
        params?.sort
      ) || "recommended",
  };

  const requestedPage =
    normalizeSearchParam(
      params?.page
    );

  const catalog =
    await getAffiliatePublicCatalog({
      page: requestedPage,
      q: filters.q,
      category:
        filters.category,
      offer:
        filters.offer,
      sort:
        filters.sort,
    });

  const categories =
    catalog.ok &&
    Array.isArray(
      catalog.facets?.categories
    )
      ? catalog.facets.categories
      : [];

  const hasActiveFilters =
    Boolean(filters.q) ||
    Boolean(filters.category) ||
    filters.offer !== "all" ||
    filters.sort !==
      "recommended";

  return (
    <>
      <SiteHeader />

      <main className={styles.page}>
        <section
          className={styles.hero}
        >
          <div
            className={
              styles.heroCopy
            }
          >
            <p
              className={
                styles.eyebrow
              }
            >
              Selección LearciNet ·
              Mercado Libre
            </p>

            <h1>
              Productos que vale la
              pena{" "}
              <span>
                descubrir.
              </span>
            </h1>

            <p
              className={
                styles.heroDescription
              }
            >
              Reunimos
              recomendaciones,
              promociones y productos
              útiles para ayudarte a
              encontrar buenas
              opciones de compra en
              menos tiempo.
            </p>
          </div>

          <div
            className={
              styles.heroPanel
            }
            aria-hidden="true"
          >
            <span>
              LEARCINET / PICKS
            </span>

            <strong>
              Elegir mejor comienza
              con información clara.
            </strong>

            <div>
              <small>
                Selección
              </small>

              <small>
                Promociones
              </small>

              <small>
                Compra segura
              </small>
            </div>
          </div>
        </section>

        <section
          className={
            styles.disclosure
          }
        >
          <strong>
            Transparencia
          </strong>

          <p>
            Algunos enlaces son de
            afiliado. Si realizas una
            compra, LearciNet puede
            recibir una comisión sin
            costo adicional para ti.
          </p>
        </section>

        {catalog.ok && (
          <FilterPanel
            filters={filters}
            categories={categories}
            total={
              catalog.pagination
                ?.total ?? 0
            }
          />
        )}

        {catalog.ok &&
        catalog.products.length >
          0 ? (
          <section
            className={
              styles.catalog
            }
          >
            <div
              className={
                styles.catalogHeading
              }
            >
              <div>
                <p
                  className={
                    styles.eyebrow
                  }
                >
                  Catálogo
                  actualizado
                </p>

                <h2>
                  Recomendaciones
                  disponibles
                </h2>
              </div>

              <span>
                {
                  catalog
                    .pagination
                    .total
                }{" "}
                {catalog
                  .pagination
                  .total === 1
                  ? "producto"
                  : "productos"}
              </span>
            </div>

            <div
              className={
                styles.productGrid
              }
            >
              {catalog.products.map(
                (product) => (
                  <ProductCard
                    key={
                      product.id
                    }
                    product={
                      product
                    }
                  />
                )
              )}
            </div>

            <Pagination
              pagination={
                catalog.pagination
              }
              filters={filters}
            />
          </section>
        ) : (
          <CatalogMessage
            type={
              catalog.ok
                ? "empty"
                : "unavailable"
            }
            filtered={
              catalog.ok &&
              hasActiveFilters
            }
          />
        )}
      </main>

      <SiteFooter />
    </>
  );
}