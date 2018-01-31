# Seguridad, capacidades nativas y su responsabilidad

Como desarrolladores web, usualmente disfrutamos la seguridad fuerte de la red del buscador - los riesgos asociados con el código que escribimos son relativamente bajos. A nuestras páginas web se les concede poderes limitados en un sandbox, y confiamos en que nuestros usuarios disfrutan un buscador construido por un equipo largo de ingenieros que es capaz de responder rápidamente a recientes amenazas de seguridad descubiertas.

Cuando se trabaje con Electron, es importante entender que Electron no es un navegador web. Te permite construir aplicaciones de escritorio llenas de utilidades con tecnologías web familiares, pero tu código tiene mucho más poder. JavaScript puede acceder a los archivos del sistema, actividades del usuario y más. Esto permite que construyas aplicaciones nativas de alta calidad, pero los riesgos inherentes de seguridad escalan con el poder adicional concedido a tu código.

Con eso en mente, ten en cuenta que mostrar contenido arbitrario proveniente de fuentes poco confiables viene con un riesgo severo que Electron no está diseñado para manejar. De hecho, las aplicaciones de electron más populares (Atom, Slack, Visual Studio Code, etc) muestran contenido local primero (o confiable, asegurado contenido remoto sin integración nodal) - si tu aplicación ejecuta código de una fuente online es tu responsabilidad asegurar que el código no es malicioso.

## Reportando problemas de seguridad

Para información sobre cómo revelar las vulnerabilidad de Electrón dirigirse a [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Actualizaciones y problemas de seguridad Chromium

Mientras Electron se esfuerza para apoyar nuevas versiones de Chromium lo más pronto posible, los desarrolladores deben estar consientes que actualizar es una tarea muy serio - involucrando ediciones a mano a docenas o hasta cientos de archivos. Dados los recurso y contribuciones disponibles hoy, Electron no va a estar usando la última versión de Chomium, rezagandose por días o semanas.

Sentimos que el sistema actual de actualización de el componente Chromium alcanza un balance apropiado entre los recursos que tenemos disponibles y las necesidades de la mayoría de las aplicaciones construidas por encima de el framework. Estamos definitivamente interesados en escuchar más sobre casos específicos de gente que construye cosas encima de Electron. Solicitudes de extracción y contribuciones apoyando este esfuerzo son siempre bienvenidas.

## Ignorando Consejos

Un problema de seguridad existe sin importar si recibes un código de un lugar remoto y lo ejecutas localmente. Como un ejemplo, considera una página web remota siendo mostrada dentro de un [`BrowserWindow`](browser-window). Si un atacante, de alguna manera, logra cambiar dicho contenido (atacando la fuente directamente o estableciéndose entre tu aplicación y el destino actual), ellos serán capaces de ejecutar el código nativo en la máquina de usuario.

> :warning: Debajo de ninguna circunstancia deberías cargar y ejecutar el código remoto con la integración Node.js activada. En vez de eso, usa solo archivos locales (empaquetado juntos con tu aplicación) para ejecutar el código Node.js. Para mostrar contenido remoto, usa el tag [`webview`](web-view) y asegúrate de desactivar el `nodeIntegration`.

#### Lista: Recomendaciones de Seguridad

Esto no es aprueba de balas, pero debería intentar lo siguiente al menos:

* [Solo carga contenido seguro](#only-load-secure-content)
* [Desactiva la integración Node.js en todas las renderizadores que muestran el contenido remoto](#disable-node.js-integration-for-remote-content)
* [Permite el aislamiento de contexto en todos los renderizadores que muestran el contenido remoto](#enable-context-isolation-for-remote-content)
* [Usar `ses.setPermissionRequestHandler()` en todas las sesiones que cargan contenido remoto](#handle-session-permission-requests-from-remote-content)
* [No desactives `webSecurity`](#do-not-disable-websecurity)
* [Define un `Content-Security-Policy`](#define-a-content-security-policy) y usa reglas extrictas (i.e. `script-src 'self'`)
* [Sobrescribe y desactiva `eval`](#override-and-disable-eval), lo que permite que las cadenas sean ejecutadas como código.
* [No establezca `allowRunningInsecureContent` a `true`](#do-not-set-allowRunningInsecureContent-to-true)
* [No active ajustes experimentales](#do-not-enable-experimental-features)
* [No use `blinkFeatures`](#do-not-use-blinkfeatures)
* [Visor web: no use `allowpopups`](#do-not-use-allowpopups)
* [WebViews: Verifique las opciones y parámetros de todos los `<webview>` tags](#verify-webview-options-before-creation)

## Solo Carga Contenido Seguro

Cualquier recurso no incluido con tu aplicación debería ser cargado usando un protocolo de seguridad como `HTTPS`. En otras palabras, no uses protocolos inseguros como `HTTP`. Similarmente, recomendamos el uso de `WSS` antes de `WS`, `FTPS` sobre `FTP`, y así sucesivamente.

### ¿Por què?

`HTTPS` tiene tres beneficios principales:

1) Autentica el servidor remoto, asegurando que tu aplicación conecte al anfitrión correcto en vez de un falsificador. 2) Asegura integridad de data, afirmando que la data no fue modificada mientras estaba en tránsito entre tu aplicación y el anfitrión. 3) Encripta el tráfico entre tu usuario y el anfitrión destinatario, haciéndolo más difícil escuchar a escondidas las información establecida entre tu aplicación y el anfitrión.

### ¿Còmo?

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

## Desactiva la Integración Node.js para contenido remoto

Es necesario que desactives la integración Node.js en cualquier renderizador ([`BrowserWindow`](browser-window), [`BrowserView`](browser-view), o [`WebView`](web-view)) que cargue contenido remoto. La meta es limitar los poderes que concedes al contenido remoto, aunque lo hace dramáticamente más difícil para un atacante lastimar a tus usuarios, ellos deberían ganar la habilidad de ejecutar JavaScript en tu página web.

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

## Activa aislamiento de contexto para contenido remoto

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

## Otorga pedidos de permiso de sesión en el contenido remoto

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### ¿Por què?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

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

## Define a Content Security Policy

A Content Security Policy (CSP) is an additional layer of protection against cross-site-scripting attacks and data injection attacks. We recommend that they be enabled by any website you load inside Electron.

### ¿Por què?

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://your-page.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your applications security.

### ¿Còmo?

Electron respects [the `Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) and the respective `<meta>` tag.

The following CSP will allow Electron to execute scripts from the current website and from `apis.mydomain.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## Override and Disable `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### ¿Por què?

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, just like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### ¿Còmo?

```js
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## Do Not Set `allowRunningInsecureContent` to `true`

*Recommendation is Electron's default*

By default, Electron will now allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### ¿Por què?

Simply put, loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#only-display-secure-content) for more details.

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

## Do Not Enable Experimental Features

*La recomendación por defecto es Electrón*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` and `experimentalCanvasFeatures` properties.

### ¿Por què?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Futhermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

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

## Do Not Use `blinkFeatures`

*Recommendation is Electron's default*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `blinkFeatures` property allows developers to enable features that have been disabled by default.

### ¿Por què?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### ¿Còmo?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    blinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

## Do Not Disable WebSecurity

*Recommendation is Electron's default*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](browser-window), [`BrowserView`](browser-view), or [`WebView`](web-view)) disables crucial security features.

Do not disable `webSecurity` in production applications.

### ¿Por què?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

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

## Do Not Use `allowpopups`

*Recommendation is Electron's default*

If you are using [`WebViews`](web-view), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](browser-window) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### ¿Por què?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](browser-window) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### ¿Còmo?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](web-view) from the main process and to verify that their webPreferences do not disable security features.

### ¿Por què?

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](web-view) tags.

### ¿Còmo?

Before a [`<WebView>`](web-view) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of WebViews with possibly insecure options.

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