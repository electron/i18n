# Seguridad, capacidades nativas y su responsabilidad

Como desarrolladores web, usualmente disfrutamos la seguridad fuerte de la red del buscador - los riesgos asociados con el código que escribimos son relativamente bajos. A nuestras páginas web se les concede poderes limitados en un sandbox, y confiamos en que nuestros usuarios disfrutan un buscador construido por un gran equipo de ingenieros que es capaz de responder rápidamente a recientes amenazas de seguridad descubiertas.

Cuando se trabaje con Electron, es importante entender que Electron no es un navegador web. Te permite construir aplicaciones de escritorio llenas de utilidades con tecnologías web familiares, pero tu código tiene mucho más poder. JavaScript puede acceder a los archivos del sistema, actividades del usuario y más. Esto permite que construyas aplicaciones nativas de alta calidad, pero los riesgos inherentes de seguridad escalan con el poder adicional concedido a tu código.

Con eso en mente, ten en cuenta que mostrar contenido arbitrario proveniente de fuentes poco confiables viene con un riesgo severo que Electron no está diseñado para manejar. De hecho, las aplicaciones de electron más populares (Atom, Slack, Visual Studio Code, etc) muestran contenido local primero (o confiable, asegurado contenido remoto sin integración nodal) - si tu aplicación ejecuta código de una fuente online es tu responsabilidad asegurar que el código no es malicioso.

## Reportando problemas de seguridad

Para información sobre cómo revelar las vulnerabilidad de Electrón dirigirse a [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Actualizaciones y problemas de seguridad Chromium

Mientras Electron se esfuerza para apoyar nuevas versiones de Chromium lo más pronto posible, los desarrolladores deben estar conscientes que actualizar es una tarea muy seria - involucrando ediciones a mano a docenas o hasta cientos de archivos. Dados los recurso y contribuciones disponibles hoy, Electron no va a estar usando la última versión de Chomium, rezagandose por días o semanas.

Sentimos que el sistema actual de actualización de el componente Chromium alcanza un balance apropiado entre los recursos que tenemos disponibles y las necesidades de la mayoría de las aplicaciones construidas por encima de el framework. Estamos definitivamente interesados en escuchar más sobre casos específicos de gente que construye cosas encima de Electron. Solicitudes de extracción y contribuciones apoyando este esfuerzo son siempre bienvenidas.

## Ignorando Consejos

Un problema de seguridad existe sin importar si recibes un código de un lugar remoto y lo ejecutas localmente. Como un ejemplo, considera una página web remota siendo mostrada dentro de un [`BrowserWindow`](../api/browser-window.md). Si un atacante, de alguna manera, logra cambiar dicho contenido (atacando la fuente directamente o estableciéndose entre tu aplicación y el destino actual), ellos serán capaces de ejecutar el código nativo en la máquina de usuario.

> :warning: Debajo de ninguna circunstancia deberías cargar y ejecutar el código remoto con la integración Node.js activada. En vez de eso, usa solo archivos locales (empaquetado juntos con tu aplicación) para ejecutar el código Node.js. Para mostrar contenido remoto, usa el tag [`webview`](../api/web-view.md) y asegúrate de desactivar el `nodeIntegration`.

## Advertencias de seguridad de Electron

From Electron 2.0 on, developers will see warnings and recommendations printed to the developer console. They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.

You can force-enable or force-disable these warnings by setting `ELECTRON_ENABLE_SECURITY_WARNINGS` or `ELECTRON_DISABLE_SECURITY_WARNINGS` on either `process.env` or the `window` object.

## Lista: Recomendaciones de Seguridad

This is not bulletproof, but at the least, you should follow these steps to improve the security of your application.

1. [Solo carga contenido seguro](#1-only-load-secure-content)
2. [Desactiva la integración Node.js en todas las renderizadores que muestran el contenido remoto](#2-disable-nodejs-integration-for-remote-content)
3. [Permite el aislamiento de contexto en todos los renderizadores que muestran el contenido remoto](#3-enable-context-isolation-for-remote-content)
4. [Usar `ses.setPermissionRequestHandler()` en todas las sesiones que cargan contenido remoto](#4-handle-session-permission-requests-from-remote-content)
5. [No desactives `webSecurity`](#5-do-not-disable-websecurity)
6. [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7. [Override and disable `eval`](#7-override-and-disable-eval), which allows strings to be executed as code.
8. [No establezca `allowRunningInsecureContent` a `true`](#8-do-not-set-allowrunninginsecurecontent-to-true)
9. [No active ajustes experimentales](#9-do-not-enable-experimental-features)
10. [Do not use `enableBlinkFeatures`](#10-do-not-use-enableblinkfeatures)
11. [Visor web: no use `allowpopups`](#11-do-not-use-allowpopups)
12. [WebViews: Verifique las opciones y parámetros de todos los `<webview>` tags](#12-verify-webview-options-before-creation)

## 1) Only Load Secure Content

Cualquier recurso no incluido con tu aplicación debería ser cargado usando un protocolo de seguridad como `HTTPS`. En otras palabras, no uses protocolos inseguros como `HTTP`. Similarly, we recommend the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

### ¿Por què?

`HTTPS` tiene tres beneficios principales:

1) Autentica el servidor remoto, asegurando que tu aplicación conecte al anfitrión correcto en vez de un falsificador. 2) Asegura integridad de data, afirmando que la data no fue modificada mientras estaba en tránsito entre tu aplicación y el anfitrión. 3) Encripta el tráfico entre tu usuario y el anfitrión destinatario, haciéndolo más difícil escuchar a escondidas las información establecida entre tu aplicación y el anfitrión.

### ¿Cómo?

```js
// Bad
browserWindow.loadURL('http://my-website.com')

// Good
browserWindow.loadURL('https://my-website.com')
```

```html
<!-- Bad -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- Good -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## 2) Disable Node.js Integration for Remote Content

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) that loads remote content. La meta es limitar los poderes que concedes al contenido remoto, aunque lo hace dramáticamente más difícil para un atacante lastimar a tus usuarios, ellos deberían ganar la habilidad de ejecutar JavaScript en tu página web.

Luego de esto, puedes conceder permisos adicionales para anfitriones específicos. Por ejemplo, si estás abriendo un BrowserWindow direccionado a `https://my-website.com/", puedes darle a esa página web las habilidades exactas que necesita, pero no más.

### ¿Por què?

Un ataque cross-site-scripting (XSS) es más peligroso si un atacante puede altar fuera del proceso de renderizado y ejecutar el código en la computadora del usuario. Ataques cross-site-scripting son muy comunes - y durante un problema, su poder es usualmente limitado a molestar a la página en dónde los están ejecutando. Desactivar la integración Node.js ayuda a prevenir un XSS de ser escalado en un llamado ataque de "Ejecución de Código Remoto".

### ¿Còmo?

```js
// Bad
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<!-- Bad -->
<webview nodeIntegration src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

Cuando desactivas la integración Node.js, todavía puedes exponer APIs a tu página web que consume módulos Node.js o características. Guiones precargados continúan teniendo acceso a `require` y otras características de Node.js, permitiendo que los desarrolladores expongan un API personalizado para cargar contenido de manera remota.

En el siguiente ejemplo de un guión pre cargado, la página web cargada más adelante tendrá acceso a el método `window.readConfig()`, pero ninguna característica de Node.js.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) Enable Context Isolation for Remote Content

Aislamiento de contexto es un ajuste de Electron que permite a los desarrolladores ejecutar códigos en guiones de pre carga y en APIs de Electron en un contexto dedicado de JavaScript. En práctica, eso significa que los objetos globales como `Array.prototype.push` o `JSON.parse` no puede ser modificado por guiones por guiones ejecutándose en el proceso de renderizado.

Electron usa la misma tecnología que los [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) de Chromium para activar este comportamiento.

### ¿Por què?

El aislamiento de contenido permite que cada guión se ejecute en el renderizado para hacer cambios a su ambiente JavaScript sin preocuparse acerca de conflictos con los guiones en el API Electron en el guión pre cargado.

Aunque todavía sea un ajuste experimental de Electron, los aislamientos de contenido añaden una capa adicional de seguridad. Crea un nuevo mundo de JavaScript para APIs de Electron y guiones pre cargados.

Al mismo tiempo, los guiones pre cargados todavía tienen acceso al `documento` y a los objetos de `window`. En otras palabras, estás teniendo un retorno decente en una pequeña inversión.

### ¿Còmo?

```js
// Main process
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
})
```

```js
// Preload script

// Set a variable in the page before it loads
webFrame.executeJavaScript('window.foo = "foo";')

// The loaded page will not be able to access this, it is only available
// in this context
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // Will log out 'undefined' since window.foo is only available in the main
  // context
  console.log(window.foo)

  // Will log out 'bar' since window.bar is available in this context
  console.log(window.bar)
})
```

## 4) Handle Session Permission Requests From Remote Content

Tu puedes haber visto pedidos de permiso mientras usas Chrome: Ellos avisan lo que sea que la página intente usar como una característica que el usuario tiene que aprobar manualmente (como notificaciones).

La API está basada en los [Chromium permissions API](https://developer.chrome.com/extensions/permissions) e implementa el mismo tipo de permisos.

### ¿Por què?

Por defecto, Electron aprobará automáticamente todos los pedidos de permiso a menos que el desarrollador haya configurado manualmente un comerciante personalizado. Aunque es un sólido ajuste automático, los desarrolladores conscientes de la seguridad pueden querer asumir lo contrario.

### ¿Còmo?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    if (!url.startsWith('https://my-website.com')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) Do Not Disable WebSecurity

*La recomendación por defecto es Electrón*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) disables crucial security features.

No deshabilite `webSecurity` en aplicaciones de producción.

### ¿Por què?

Desactivar `webSecurity` deshabilitará la política de mismo-origen y establecer la propiedad `allowRunningInsecureContent` a `true`. En otras palabras, permite la ejecución de código inseguro desde diferentes dominios.

### ¿Còmo?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

```html
<!-- Bad -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 6) Define a Content Security Policy

Un Contenido de Política de Seguridad (CSP) es una capa adicional de protección contra los ataques cross-site-scripting attacks y ataques de inyecciones de data. Recomendamos que ellos estén activados por cualquier página web cargada dentro de Electron.

### ¿Por què?

CSP permite que el servidor dando contenido pueda restringir y controlar los recursos que Electron puede cargar para esa página web dada. `https://your-page.com` debería estar permitido para guiones de pre carga de los orígenes que definiste mientras que los guiones de `https://evil.attacker.com` no debería tener permitido ejecutarse. Definir un CSP es una manera sencilla de mejorar tus aplicaciones de seguridad.

### ¿Còmo?

Electron respecta [el `Content-Security-Policy` encabezado de HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) y el respectivo `<meta>`tag.

El siguiente CSP permitirá que Electron ejecute guiones desde la página web actual y desde `apis.mydomain.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## 7) Override and Disable `eval`

`eval()` es un método principal de JavaScript que permite la ejecución de JavaScript desde una cadena. Desactivar esto desactivará la habilidad de tu aplicación de evaluar el JavaScript que no es conocido en avance.

### ¿Por què?

El método `eval()` tiene precisamente una misión: evaluar una serie de personajes como JavaScript y ejecutarlo. Es un método requerido cuando necesites evaluar códigos que no es conocido acerca del tiempo. While legitimate use cases exist, like any other code generators, `eval()` is difficult to harden.

En general, Es más sencillo desactivar por completo `eval()` que hacerlo a prueba de balas. Por los tanto, si usted no lo necesita, es buena idea desactivarlo.

### ¿Còmo?

```js
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## 8) Do Not Set `allowRunningInsecureContent` to `true`

*La recomendación por defecto es Electrón*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Establecer la propiedad `allowRunningInsecureContent` a `true` deshabilita esa protección.

Descargar la inicial HTML de un sitio web mediante `HTTPS` e intentar descargar recursos subsecuentes mediante `HTTP` es también conocido como "contenido mixto".

### ¿Por què?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. Ver la sección en [only displaying secure content](#1-only-load-secure-content) para más detalles.

### ¿Còmo?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 9) Do Not Enable Experimental Features

*La recomendación por defecto es Electrón*

Usuarios avanzados de Electron pueden habilitar funciones experimentales Chromium usando las propiedades `experimentalFeatures` y `experimentalCanvasFeatures`.

### ¿Por què?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Casos de uso legítimo existen, pero excepto que usted sepa lo que está haciendo, usted no debería habilitar esta propiedad.

### ¿Còmo?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## 10) Do Not Use `enableBlinkFeatures`

*La recomendación por defecto es Electrón*

Blink es el nombre del motor de renderizado detrás de Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### ¿Por què?

En general, probablemente hay buenas razones si una función no fue habilitada por defecto. Casos de uso legítimo para habilitar funciones especificas existen. Como un desarrollador, usted debería saber exactamente por qué usted necesita habilitar una función, cuales son las ramificaciones, y como impacta las seguridad de su aplicación. Usted no debería habilitar funciones de forma especulativa bajo ninguna circunstancia.

### ¿Còmo?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

## 11) Do Not Use `allowpopups`

*La recomendación por defecto es Electrón*

Si usted está usando [`WebViews`](../api/web-view.md), tal vez necesite las páginas y guiones cargados en su etiqueta `<webview>` para abrir nuevas ventanas. El atributo `allowpopups` los habilita para crear un nuevo [`BrowserWindows`](../api/browser-window.md) usando el método `window.open()`. De distinta forma, `WebViews` no están permitidos para crear nuevas ventanas.

### ¿Por què?

Si usted no necesita ventanas emergentes, le conviene no permitir la creación de nuevos [`BrowserWindows`](../api/browser-window.md) por defecto. Esto sigue el principio de acceso de mínimamente requerido: No permita que un sitio web cree nuevas ventanas excepto usted sepa que se necesita esa función.

### ¿Còmo?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 12) Verify WebView Options Before Creation

Un WebView creado en un proceso de renderizado que no contenga integración habilitada de Node.js no será capaz de habilitar integración por sí mismo. Sin embargo, a WebView siempre creará un proco de renderizado independiente con su propio `webPreferences`.

Es una buena idea controlar la creación de un nuevo [`WebViews`](../api/web-view.md) desde el proceso principal y verificar que sus webPreferences no deshabiliten funciones de seguridad.

### ¿Por què?

Como los WebViews viven en el DOM, ellos pueden ser creados por un guión ejecutado en su sitio web incluso si la integración de Node.js está deshabilitada.

Electron habilita a desarrolladores a inhabilitar varias funciones de seguridad que controlan un proceso de renderizado. En la mayoría de los casos, desarrolladores no necesitas deshabilitar ninguno de esas funciones - y usted debería por lo tanto no permitir configuraciones diferentes para etiquetas [`<WebView>`](../api/web-view.md) creadas recientemente.

### ¿Còmo?

Antes de que una etiqueta [`<WebView>`](../api/web-view.md) sea anexada, Electron disparará el evento `will-attach-webview` en el organizador `webContents`. Utilice el evento para prevenir la creación de WebViews con opciones posiblemente inseguras.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

De nuevo, esta lista solo minimiza los riesgos, no los remueve. Si su meta es mostrar una página web, un navegador sería una opción más segura.