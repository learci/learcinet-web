# LearciNet Web Studio

Landing page creada con Next.js, inspirada en la composición editorial y minimalista
de un sitio para estudio digital, con diseño y contenido propios para LearciNet.

## Ejecutar localmente

Necesitas Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Crear versión de producción

```bash
npm run build
npm start
```

## Personalizar contenido

Edita:

```text
data/siteData.js
```

Desde ese archivo puedes cambiar:

- Servicios
- Proyectos
- Proceso
- Planes y precios
- Correo
- Enlace de WhatsApp

## Publicación en Hostinger

1. Sube el proyecto a GitHub o al administrador de archivos.
2. Crea una aplicación Node.js.
3. Configura:
   - Comando de instalación: `npm install`
   - Comando de compilación: `npm run build`
   - Comando de inicio: `npm start`
4. Usa Node.js 20 o superior.
5. Vincula el dominio o subdominio.

## Nota

El número de WhatsApp incluido es un marcador. Cámbialo en `data/siteData.js`.


## Página de contacto

La versión 2 incluye una ruta independiente:

```text
/contact
```

El formulario abre la aplicación de correo del visitante mediante `mailto:`.
Cambia teléfono, correo y WhatsApp en `data/siteData.js`.


## Página de servicios

La versión 3 incluye una ruta independiente:

```text
/services
```

Contiene catálogo detallado, metodología, beneficios, preguntas frecuentes y
llamadas a la acción conectadas con `/contact`.


## Menú unificado

La versión 4 utiliza el mismo encabezado en:

- `/`
- `/services`
- `/contact`

El menú incluye Inicio, Servicios, Proyectos, Proceso, Planes y Contacto.
También incorpora efectos hover en enlaces, botones, tarjetas y llamadas a la acción.


## Fondo ShapeGrid

La versión 5 integra un fondo interactivo de hexágonos en la sección:

```text
Soluciones claras para retos reales.
```

Configuración principal:

- Movimiento diagonal lento.
- Hexágonos de 42 px.
- Bordes blancos tenues.
- Hover verde LearciNet.
- Rastro interactivo de 8 figuras.
- Capa de contraste para conservar la legibilidad.


## Eyebrows negros

La versión 6 cambia los encabezados pequeños como “Estudio digital · México”:

- Texto negro.
- Sin brillo.
- Sin degradado.
- Sin animación.
- Sin sombras.
- En fondos oscuros se utiliza una base clara sólida para conservar la legibilidad.
