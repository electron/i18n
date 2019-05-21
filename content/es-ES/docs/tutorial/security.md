# Seguridad, capacidades nativas y su responsabilidad

Como desarrolladores web, usualmente disfrutamos la seguridad fuerte de la red del buscador - los riesgos asociados con el código que escribimos son relativamente bajos. A nuestras páginas web se les concede poderes limitados en un sandbox, y confiamos en que nuestros usuarios disfrutan un buscador construido por un gran equipo de ingenieros que es capaz de responder rápidamente a recientes amenazas de seguridad descubiertas.

Cuando se trabaje con Electron, es importante entender que Electron no es un navegador web. Te permite construir aplicaciones de escritorio llenas de utilidades con tecnologías web familiares, pero tu código tiene mucho más poder. JavaScript puede acceder a los archivos del sistema, actividades del usuario y más. Esto permite que construyas aplicaciones nativas de alta calidad, pero los riesgos inherentes de seguridad escalan con el poder adicional concedido a tu código.

Con eso en mente, ten en cuenta que mostrar contenido arbitrario proveniente de fuentes poco confiables viene con un riesgo severo que Electron no está diseñado para manejar. De hecho, las aplicaciones de electron más populares (Atom, Slack, Visual Studio Code, etc) muestran contenido local primero (o confiable, asegurado contenido remoto sin integración nodal) - si tu aplicación ejecuta código de una fuente online es tu responsabilidad asegurar que el código no es malicioso.

## Reportando problemas de seguridad

Para información sobre cómo revelar las vulnerabilidad de Electrón dirigirse a [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Actualizaciones y problemas de seguridad Chromium

Mientras Electron se esfuerza para apoyar nuevas versiones de Chromium lo más pronto posible, los desarrolladores deben estar conscientes que actualizar es una tarea muy seria - involucrando ediciones a mano a docenas o hasta cientos de archivos. Dados los recursos y contribuciones disponibles, Electron no va a estar sobre la última versión de Chromium, rezagándose por días o semanas.

Sentimos que el sistema actual de actualización de el componente Chromium alcanza un balance apropiado entre los recursos que tenemos disponibles y las necesidades de la mayoría de las aplicaciones construidas por encima de el framework. Estamos definitivamente interesados en escuchar más sobre casos de uso específicos de gente que construye cosas sobre de Electron. Solicitudes de extracción y contribuciones apoyando este esfuerzo son siempre bienvenidas.

## La seguridad es la responsabilidad de Todos

Es importante recordar que la seguridad de tu aplicación Electron es el resultado de la seguridad general de la base de framework (*Chromium*, *Node.js*), Electron mismo, todas las dependencias NPM y tu código. Por tanto, es tu responsabilidad seguir algunas importantes mejores prácticas:

* **Mantenga su aplicación actualizada con la última versión liberada de Electron.** Cuando libere su producto, también está compartiendo un conjunto compuesto de Electron, librerías compartidas de Chromium y Node.js. Vulnerabilidades afectando a estos componentes pueden impactar en la seguridad de su aplicación. Actualizando Electron a la última versión, asegura que las vulnerabilidades críticas (tales como *nodeIntegration bypasses*) ya estén reparadas y no puedan ser explotadas en su aplicación.

* **Evalue sus dependencias.**Mientras NPM provee más de medio millón de paquetes reusables, es su responsabilidad la elección de librerías confiables de terceros. Si utiliza librerías desactualizadas afectadas por vulnerabilidades conocidas o basado en código escasamente mantenido, la seguridad de su aplicación puede estar en peligro.

* **Adopte prácticas de programación segura.** La primera línea de defensa de su aplicación es su propio código. Vulnerabilidades usuales, tales como Cross-Site Scripting (XSS), tienen un alto impacto en la seguridad en las aplicaciones Electron así es altamente recomendable adoptar políticas confiables de buenas prácticas en el desarrollo de software y realizar pruebas de seguridad.

## Aislamiento para contenido no confiable

Un problema de seguridad existe siempre que recibes código de un lugar no confiable (e.g. un servidor remoto) y lo ejecutas localmente. Como un ejemplo, considera una página web remota siendo mostrada dentro de un default [`BrowserWindow`](../api/browser-window.md). Si un atacante de algún modo se las arregla para cambiar dicho contenido (bien sea atacando la fuente directamente, o interviniendo entre su aplicación y el destino real), será capaz de ejecutar códigos nativos en la máquina del usuario.

> :warning: bajo ninguna circunstancia deberías cargar y ejecutar código remoto con la integración Node.js activada. En vez de eso, usa solo archivos locales (empaquetados juntos con tu aplicación) para ejecutar el código Node.js. To display remote content, use the [`<webview>`](../api/webview-tag.md) tag or [`BrowserView`](../api/browser-view.md), make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Advertencias de seguridad de Electron

Desde Electron 2.0, los desarrolladores verán advertencias y recomendaciones impresas en la consola de desarrolladores. They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.

You can force-enable or force-disable these warnings by setting `ELECTRON_ENABLE_SECURITY_WARNINGS` or `ELECTRON_DISABLE_SECURITY_WARNINGS` on either `process.env` or the `window` object.

## Lista: Recomendaciones de Seguridad

You should at least follow these steps to improve the security of your application:

1. [Solo carga contenido seguro](#1-only-load-secure-content)
2. [Desactiva la integración Node.js en todas las renderizadores que muestran el contenido remoto](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Permite el aislamiento de contexto en todos los renderizadores que muestran el contenido remoto](#3-enable-context-isolation-for-remote-content)
4. [Usar `ses.setPermissionRequestHandler()` en todas las sesiones que cargan contenido remoto](#4-handle-session-permission-requests-from-remote-content)
5. [No desactives `webSecurity`](#5-do-not-disable-websecurity)
6. [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7. [No establezca `allowRunningInsecureContent` a `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [No active ajustes experimentales](#8-do-not-enable-experimental-features)
9. [Do not use `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Do not use `allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Verificar opciones y parámetros](#11-verify-webview-options-before-creation)
12. [Deshabilitar o limitar la navegación](#12-disable-or-limit-navigation)
13. [Deshabilitar o limitar la generación de nuevas ventanas](#13-disable-or-limit-creation-of-new-windows)
14. [No utilice `openExternal` con contenido no confiable](#14-do-not-use-openexternal-with-untrusted-content)
15. [Deshabilitar el módulo `remote`](#15-disable-the-remote-module)
16. [Filtrar el módulo `remote`](#16-filter-the-remote-module)

To automate the detection of misconfigurations and insecure patterns, it is possible to use [electronegativity](https://github.com/doyensec/electronegativity). For additional details on potential weaknesses and implementation bugs when developing applications using Electron, please refer to this [guide for developers and auditors](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Only Load Secure Content

Cualquier recurso no incluido con tu aplicación debería ser cargado usando un protocolo de seguridad como `HTTPS`. En otras palabras, no uses protocolos inseguros como `HTTP`. Similarly, we recommend the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

### ¿Por què?

`HTTPS` tiene tres beneficios principales:

1) Autentica el servidor remoto, asegurando que tu aplicación conecte al anfitrión correcto en vez de un falsificador. 2) Asegura integridad de data, afirmando que la data no fue modificada mientras estaba en tránsito entre tu aplicación y el anfitrión. 3) Encripta el tráfico entre tu usuario y el anfitrión destinatario, haciéndolo más difícil escuchar a escondidas las información establecida entre tu aplicación y el anfitrión.

### ¿Cómo?

```js
// Malo
browserWindow.loadURL('http://example.com')

// Bueno
browserWindow.loadURL('https://example.com')
```

```html
<!-- Malo -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Bueno -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Do not enable Node.js Integration for Remote Content

*This recommendation is the default behavior in Electron since 5.0.0.*

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) that loads remote content. La meta es limitar los poderes que concedes al contenido remoto, aunque lo hace dramáticamente más difícil para un atacante lastimar a tus usuarios, ellos deberían ganar la habilidad de ejecutar JavaScript en tu página web.

Luego de esto, puedes conceder permisos adicionales para anfitriones específicos. Por ejemplo, si estás abriendo un BrowserWindow direccionado a `https://example.com/", puedes darle a esa página web las habilidades exactas que necesita, pero no más.

### ¿Por què?

Un ataque cross-site-scripting (XSS) es más peligroso si un atacante puede altar fuera del proceso de renderizado y ejecutar el código en la computadora del usuario. Ataques cross-site-scripting son muy comunes - y durante un problema, su poder es usualmente limitado a molestar a la página en dónde los están ejecutando. Desactivar la integración Node.js ayuda a prevenir un XSS de ser escalado en un llamado ataque de "Ejecución de Código Remoto".

### ¿Còmo?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html
<!-- Incorrecto -->
<webview nodeIntegration src="page.html"></webview>

<!-- Correcto -->
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

Even when you use `nodeIntegration: false` to enforce strong isolation and prevent the use of Node primitives, `contextIsolation` must also be used.

### ¿Por què?

El aislamiento de contenido permite que cada guión se ejecute en el renderizado para hacer cambios a su ambiente JavaScript sin preocuparse acerca de conflictos con los guiones en el API Electron en el guión pre cargado.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts, which mitigates so-called "Prototype Pollution" attacks.

Al mismo tiempo, los guiones pre cargados todavía tienen acceso al `documento` y a los objetos de `window`. En otras palabras, estás teniendo un retorno decente en una pequeña inversión.

### ¿Còmo?

```js
// Main process
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: path.join(app.getAppPath(), 'preload.js')
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

    // Verify URL
    if (!url.startsWith('https://example.com/')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## 5) No deshabilitar WebSecurity

*La recomendación por defecto es Electrón*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`<webview>`](../api/webview-tag.md)) disables crucial security features.

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
// Bueno
const mainWindow = new BrowserWindow()
```

```html
<!-- Incorrecto -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Correcto -->
<webview src="page.html"></webview>
```

## 6) Definir una política de seguridad de contenido

Un Contenido de Política de Seguridad (CSP) es una capa adicional de protección contra los ataques cross-site-scripting attacks y ataques de inyecciones de data. Recomendamos que ellos estén activados por cualquier página web cargada dentro de Electron.

### ¿Por què?

CSP permite que el servidor dando contenido pueda restringir y controlar los recursos que Electron puede cargar para esa página web dada. `https://example.com` debería estar permitido para guiones de pre carga de los orígenes que definiste mientras que los guiones de `https://evil.attacker.com` no debería tener permitido ejecutarse. Defining a CSP is an easy way to improve your application's security.

El siguiente CSP permitirá que Electron ejecute guiones desde la página web actual y desde `apis.example.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### Encabezado CSP HTTP

Electron respects the [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) which can be set using Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      ...details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Etiqueta

CSP's preferred delivery mechanism is an HTTP header, however it is not possible to use this method when loading a resource using the `file://` protocol. It can be useful in some cases, such as using the `file://` protocol, to set a policy on a page directly in the markup using a `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

#### `webRequest.onHeadersReceived([filter, ]listener)`

## 7) Do Not Set `allowRunningInsecureContent` to `true`

*La recomendación por defecto es Electrón*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Establecer la propiedad `allowRunningInsecureContent` a `true` deshabilita esa protección.

Descargar la inicial HTML de un sitio web mediante `HTTPS` e intentar descargar recursos subsecuentes mediante `HTTP` es también conocido como "contenido mixto".

### ¿Por què?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. Ver la sección en [only displaying secure content](#1-only-load-secure-content) para más detalles.

### ¿Còmo?

```js
// Malo
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Bueno
const mainWindow = new BrowserWindow({})
```

## 8) Do Not Enable Experimental Features

*La recomendación por defecto es Electrón*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` property.

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
// Bueno
const mainWindow = new BrowserWindow({})
```

## 9) Do Not Use `enableBlinkFeatures`

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
// Bueno
const mainWindow = new BrowserWindow()
```

## 10) Do Not Use `allowpopups`

*La recomendación por defecto es Electrón*

If you are using [`<webview>`](../api/webview-tag.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `<webview>` tags are otherwise not allowed to create new windows.

### ¿Por què?

Si usted no necesita ventanas emergentes, le conviene no permitir la creación de nuevos [`BrowserWindows`](../api/browser-window.md) por defecto. Esto sigue el principio de acceso de mínimamente requerido: No permita que un sitio web cree nuevas ventanas excepto usted sepa que se necesita esa función.

### ¿Còmo?

```html
<!-- Incorrecto -->
<webview allowpopups src="page.html"></webview>

<!-- Correcto -->
<webview src="page.html"></webview>
```

## 11) Verify WebView Options Before Creation

Un WebView creado en un proceso de renderizado que no contenga integración habilitada de Node.js no será capaz de habilitar integración por sí mismo. Sin embargo, a WebView siempre creará un proco de renderizado independiente con su propio `webPreferences`.

It is a good idea to control the creation of new [`<webview>`](../api/webview-tag.md) tags from the main process and to verify that their webPreferences do not disable security features.

### ¿Por què?

Since `<webview>` live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron habilita a desarrolladores a inhabilitar varias funciones de seguridad que controlan un proceso de renderizado. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](../api/webview-tag.md) tags.

### ¿Còmo?

Before a [`<webview>`](../api/webview-tag.md) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

De nuevo, esta lista solo minimiza los riesgos, no los remueve. Si su meta es mostrar una página web, un navegador sería una opción más segura.

## 12) Deshabilitar o limitar la navegación

If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.

### ¿Por què?

Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.

### ¿Còmo?

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`](../api/web-contents.md#event-will-navigate) handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

We recommend that you use Node's parser for URLs. Simple string comparisons can sometimes be fooled - a `startsWith('https://example.com')` test would let `https://example.com.attacker.com` through.

```js
const URL = require('url').URL

app.on('web-contents-created', (event, contents) => {
  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl.origin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Disable or limit creation of new windows

If you have a known set of windows, it's a good idea to limit the creation of additional windows in your app.

### ¿Por què?

Much like navigation, the creation of new `webContents` is a common attack vector. Attackers attempt to convince your app to create new windows, frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. This is commonly the case for apps that open one `BrowserWindow` and do not need to open an arbitrary number of additional windows at runtime.

### ¿Còmo?

[`webContents`](../api/web-contents.md) will emit the [`new-window`](../api/web-contents.md#event-new-window) event before creating new windows. That event will be passed, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you use the event to scrutinize the creation of windows, limiting it to only what you need.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', async (event, navigationUrl) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    event.preventDefault()

    await shell.openExternal(navigationUrl)
  })
})
```

## 14) Do not use `openExternal` with untrusted content

Shell's [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) allows opening a given protocol URI with the desktop's native utilities. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.

### ¿Por què?

Improper use of [`openExternal`](../api/shell.md#shellopenexternalurl-options-callback) can be leveraged to compromise the user's host. When openExternal is used with untrusted content, it can be leveraged to execute arbitrary commands.

### ¿Còmo?

```js
//  Bad
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```js
//  Good
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Deshabilitar el módulo `remote`

El módulo `remoto` suministra una manera al proceso de renderizado a acceder a las APIs que normalmente solo están disponibles en el proceso principal. Using it, a renderer can invoke methods of a main process object without explicitly sending inter-process messages. Si su aplicación de escritorio no ejecuta contenido no confiable, esta puede ser una manera valedera para que los procesos de renderizado accedan y trabajen con los módulos que solo están disponibles en el proceso principal, tales como aquellos módulos vinculados con la interface de usuario (sea cuadro de diálogos, menús, etc.).

However, if your app can run untrusted content and even if you [sandbox](../api/sandbox-option.md) your renderer processes accordingly, the `remote` module makes it easy for malicious code to escape the sandbox and have access to system resources via the higher privileges of the main process. Por lo tanto, debería deshabilitarse en tales circunstancias.

### ¿Por què?

`remote` uses an internal IPC channel to communicate with the main process. "Prototype pollution" attacks can grant malicious code access to the internal IPC channel, which can then be used to escape the sandbox by mimicking `remote` IPC messages and getting access to main process modules running with higher privileges.

Additionally, it's possible for preload scripts to accidentally leak modules to a sandboxed renderer. Leaking `remote` arms malicious code with a multitude of main process modules with which to perform an attack.

Disabling the `remote` module eliminates these attack vectors. Enabling context isolation also prevents the "prototype pollution" attacks from succeeding.

### ¿Còmo?

```js
// Bad if the renderer can run untrusted content
const mainWindow = new BrowserWindow({})
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})
```

```html
<!-- Malo si el renderizado no puede ejecutar contenido no confiable  -->
<webview src="page.html"></webview>

<!-- Bueno -->
<webview enableremotemodule="false" src="page.html"></webview>
```

## 16) Filtrar el módulo `remote`

Si no puede deshabilitar el módulo `remote`, debería filtrar los globales, Node, y los módulos Electron (también llamados built-ins) accesibles vía `remote` que su aplicación no los requiere. Esto puede ser llevado a cabo bloqueando ciertos módulos de manera total y reemplazándolos por otros sea con proxies que exponen solamente la funcionalidad que su aplicación necesita.

### ¿Por què?

Due to the system access privileges of the main process, functionality provided by the main process modules may be dangerous in the hands of malicious code running in a compromised renderer process. By limiting the set of accessible modules to the minimum that your app needs and filtering out the others, you reduce the toolset that malicious code can use to attack the system.

Note that the safest option is to [fully disable the remote module](#15-disable-the-remote-module). If you choose to filter access rather than completely disable the module, you must be very careful to ensure that no escalation of privilege is possible through the modules you allow past the filter.

### ¿Còmo?

```js
const readOnlyFsProxy = require(/* ... */) // exposes only file read functionality

const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = new Set(['shell'])
const allowedGlobals = new Set()

app.on('remote-require', (event, webContents, moduleName) => {
  if (proxiedModules.has(moduleName)) {
    event.returnValue = proxiedModules.get(moduleName)
  }
  if (!allowedModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-builtin', (event, webContents, moduleName) => {
  if (!allowedElectronModules.has(moduleName)) {
    event.preventDefault()
  }
})

app.on('remote-get-global', (event, webContents, globalName) => {
  if (!allowedGlobals.has(globalName)) {
    event.preventDefault()
  }
})

app.on('remote-get-current-window', (event, webContents) => {
  event.preventDefault()
})

app.on('remote-get-current-web-contents', (event, webContents) => {
  event.preventDefault()
})

app.on('remote-get-guest-web-contents', (event, webContents, guestWebContents) => {
  event.preventDefault()
})
```