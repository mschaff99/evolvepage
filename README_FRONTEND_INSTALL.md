# Guía de Instalación y Despliegue del Frontend - EvolveAsesores

Este documento detalla los pasos necesarios para instalar, configurar y desplegar la aplicación frontend de EvolveAsesores.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado el siguiente software en tu sistema:

*   **Node.js**: Versión 14.0.0 o superior (se recomienda la versión LTS más reciente).
    *   Descargar: [https://nodejs.org/](https://nodejs.org/)
*   **npm**: Gestor de paquetes de Node (se instala automáticamente con Node.js).

## 🚀 Instalación

1.  **Descargar/Clonar el proyecto**:
    Asegúrate de tener los archivos del proyecto en tu máquina local.

2.  **Abrir una terminal**:
    Navega hasta la carpeta raíz del proyecto (donde se encuentra el archivo `package.json`).

3.  **Instalar dependencias**:
    Ejecuta el siguiente comando para descargar e instalar todas las librerías necesarias:
    ```bash
    npm install
    ```
    *Este proceso puede tardar unos minutos dependiendo de tu conexión a internet.*

## ⚙️ Configuración

La aplicación utiliza variables de entorno para configurar la conexión con el backend.

1.  Verifica que exista un archivo llamado `.env` en la raíz del proyecto.
2.  El contenido debe ser similar a:
    ```env
    REACT_APP_API_URL=http://127.0.0.1:5000/api
    ```
    *Si vas a desplegar en producción, asegúrate de cambiar esta URL por la dirección real de tu servidor backend (ej: `https://api.evolveasesores.cl/api`).*

## 💻 Desarrollo Local

Para ejecutar la aplicación en modo de desarrollo (con recarga automática):

```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador en [http://localhost:3000](http://localhost:3000).

## 📦 Construcción para Producción (Build)

Para generar los archivos optimizados listos para subir a un servidor web:

1.  Ejecuta el comando de construcción:
    ```bash
    npm run build
    ```

2.  Al finalizar, se creará una carpeta llamada `build/` en la raíz del proyecto.
    *   Esta carpeta contiene todos los archivos estáticos (HTML, CSS, JS, imágenes) minificados y optimizados.

## 🌐 Despliegue

Para desplegar el frontend en un servidor web (Apache, Nginx, Hosting compartido, etc.):

1.  Sube **únicamente el contenido de la carpeta `build/`** al directorio público de tu servidor (usualmente `public_html`, `www` o `htdocs`).
2.  Configura tu servidor web para que todas las rutas sean manejadas por el archivo `index.html` (necesario para React Router).

### Ejemplo de configuración para Apache (.htaccess):
Si tu servidor usa Apache, asegúrate de tener un archivo `.htaccess` en la carpeta de despliegue con el siguiente contenido:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🛠️ Solución de Problemas Comunes

*   **Error "opensslErrorStack"**: Si encuentras errores relacionados con OpenSSL al ejecutar `npm start`, intenta actualizar `react-scripts` o usa una versión de Node.js compatible (v16 o v18 suelen ser estables).
*   **Dependencias faltantes**: Si falta alguna librería, ejecuta `npm install` nuevamente o borra la carpeta `node_modules` y el archivo `package-lock.json` y reinstala desde cero.
