# AFILIADOS-03B.3 — Compartir recomendaciones en redes

## Alcance implementado

- Botón principal `Compartir` dentro de cada tarjeta.
- Acciones para Facebook, WhatsApp y X / Twitter.
- Copia del enlace con confirmación accesible.
- Compartir nativo del dispositivo cuando el navegador lo permite.
- Orientación honesta para Instagram mediante compartir nativo o copiar enlace.
- Cierre del panel al hacer clic fuera o presionar `Escape`.
- Navegación por teclado y respeto a `prefers-reduced-motion`.

La URL compartida pertenece a LearciNet y abre `/recomendaciones` con la
búsqueda del producto y el foco en su tarjeta. El botón `Ver producto` conserva
por separado el enlace afiliado de Mercado Libre.

## Archivos incluidos

- `app/recomendaciones/ProductShare.js`
- `app/recomendaciones/share.module.css`
- `lib/affiliate-share.js`
- `test/affiliate-share.test.mjs`
- `AFILIADOS-03B.3-page.patch`

## Integración en `learcinet-web`

Desde la raíz del repositorio, con la base de AFILIADOS-03B.2 limpia:

```bash
git switch -c feat/afiliados-03b-3-social-share

unzip -o \
  ~/Downloads/learcinet-web-afiliados-03b-3-compartir.zip \
  -d .

git apply --check AFILIADOS-03B.3-page.patch
git apply AFILIADOS-03B.3-page.patch
rm AFILIADOS-03B.3-page.patch

node --test test/*.test.mjs
npm run build
git diff --check
git status -sb
```

## Validación funcional sugerida

1. Abrir `/recomendaciones` y desplegar `Compartir` en más de una tarjeta.
2. Confirmar que Facebook, WhatsApp y X abren una ventana o aplicación nueva.
3. Confirmar que WhatsApp recibe nombre, precio y enlace de LearciNet.
4. Usar `Copiar enlace` y verificar el mensaje `Enlace copiado`.
5. Abrir el enlace copiado y confirmar que la recomendación queda filtrada y
   enfocada.
6. En móvil, probar `Más opciones`; Instagram sólo aparecerá cuando el sistema
   operativo y la aplicación instalada lo ofrezcan.
7. Presionar `Escape` con el panel abierto y comprobar que el foco regresa al
   botón `Compartir`.

## Fuera de alcance

- Publicación automática mediante APIs de Meta.
- Inicio de sesión con Facebook o Instagram.
- Métricas de clics o eventos de analítica.
- Ficha individual permanente por producto.
