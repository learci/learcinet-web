# AFILIADOS-03B.3.1 — Ficha social de recomendación

Este paquete completa la capa web de AFILIADOS-03B.3.1.

## Resultado funcional

- Cada producto se comparte mediante `https://learcinet.com/recomendaciones/:productId`.
- La ficha obtiene exclusivamente un producto publicado desde Workspace.
- Open Graph y Twitter generan título, descripción e imagen específicos.
- El título social utiliza `LearciNet te recomienda: [producto]`.
- Facebook recibe la URL LearciNet y construye su vista previa desde estos metadatos.
- WhatsApp, X y el compartir nativo incluyen el texto `LearciNet te recomienda`.
- La compra final conserva el enlace de afiliado oficial y su atributo `sponsored`.
- La ficha invita a seguir navegando por el catálogo de LearciNet.

## Integración

Ejecuta desde la rama actual `feat/afiliados-03b-3-social-share`, conservando los cambios sin commit de 03B.3:

```bash
cd /Users/eddermoraponce/Documents/LearciNet/learcinet-web

git status -sb

unzip -o \
~/Downloads/learcinet-web-afiliados-03b-3-1-social-product-page.zip \
-d .

node --test test/*.test.mjs
npm run build

git diff --check
git status -sb
git diff --stat
```

No hagas commit todavía. Comparte la salida completa para revisar el cierre conjunto de Workspace y Web.

## Consideración para Facebook

Facebook no permite prellenar el comentario personal de una publicación. La frase predeterminada se controla mediante el título Open Graph de la vista previa. Después del despliegue se debe volver a analizar una URL de producto en Facebook Sharing Debugger para reemplazar la vista previa anterior que pueda conservarse en caché.
