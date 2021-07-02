# Seguridad, capacidades nativas y su responsabilidad

Como desarrolladores web, usualmente disfrutamos la seguridad fuerte de la red del buscador - los riesgos asociados con el código que escribimos son relativamente bajos. A nuestras páginas web se les concede poderes limitados en un sandbox, y confiamos en que nuestros usuarios disfrutan un buscador construido por un gran equipo de ingenieros que es capaz de responder rápidamente a recientes amenazas de seguridad descubiertas.

Cuando se trabaje con Electron, es importante entender que Electron no es un navegador web. Te permite construir aplicaciones de escritorio llenas de utilidades con tecnologías web familiares, pero tu código tiene mucho más poder. JavaScript puede acceder a los archivos del sistema, actividades del usuario y más. Esto permite que construyas aplicaciones nativas de alta calidad, pero los riesgos inherentes de seguridad escalan con el poder adicional concedido a tu código.

Con eso en mente, ten en cuenta que mostrar contenido arbitrario proveniente de fuentes poco confiables viene con un riesgo severo que Electron no está diseñado para manejar. De hecho, las aplicaciones de electron más populares (Atom, Slack, Visual Studio Code, etc) muestran contenido local primero (o confiable, asegurado contenido remoto sin integración nodal) - si tu aplicación ejecuta código de una fuente online es tu responsabilidad asegurar que el código no es malicioso.

## Reportando problemas de seguridad

Para información sobre cómo revelar las vulnerabilidad de Electrón dirigirse a [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Actualizaciones y problemas de seguridad Chromium

Electron se mantiene actualizado con versiones alternativas de Chromium. Para más información, vea la [publicación del blog de Electron Cadence](https://electronjs.org/blog/12-week-cadence).

## La seguridad es la responsabilidad de Todos

Es importante recordar que la seguridad de tu aplicación Electron es el resultado de la seguridad general de la base de framework (*Chromium*, *Node.js*), Electron mismo, todas las dependencias NPM y tu código. Por tanto, es tu responsabilidad seguir algunas importantes mejores prácticas:

* **Mantenga su aplicación actualizada con la última versión liberada de Electron.** Cuando libere su producto, también está compartiendo un conjunto compuesto de Electron, librerías compartidas de Chromium y Node.js. Vulnerabilidades afectando a estos componentes pueden impactar en la seguridad de su aplicación. Actualizando Electron a la última versión, asegura que las vulnerabilidades críticas (tales como *nodeIntegration bypasses*) ya estén reparadas y no puedan ser explotadas en su aplicación. Para más informacón, vea "[Use a current version of Electron](#15-use-a-current-version-of-electron)".

* **Evalue sus dependencias.**Mientras NPM provee más de medio millón de paquetes reusables, es su responsabilidad la elección de librerías confiables de terceros. Si utiliza librerías desactualizadas afectadas por vulnerabilidades conocidas o basado en código escasamente mantenido, la seguridad de su aplicación puede estar en peligro.

* **Adopte prácticas de programación segura.** La primera línea de defensa de su aplicación es su propio código. Vulnerabilidades usuales, tales como Cross-Site Scripting (XSS), tienen un alto impacto en la seguridad en las aplicaciones Electron así es altamente recomendable adoptar políticas confiables de buenas prácticas en el desarrollo de software y realizar pruebas de seguridad.

## Aislamiento para contenido no confiable

Un problema de seguridad existe siempre que recibes código de un lugar no confiable (e.g. un servidor remoto) y lo ejecutas localmente. Como un ejemplo, considera una página web remota siendo mostrada dentro de un default [`BrowserWindow`][browser-window]. Si un atacante de algún modo se las arregla para cambiar dicho contenido (bien sea atacando la fuente directamente, o interviniendo entre su aplicación y el destino real), será capaz de ejecutar códigos nativos en la máquina del usuario.

> :warning: bajo ninguna circunstancia deberías cargar y ejecutar código remoto con la integración Node.js activada. En vez de eso, usa solo archivos locales (empaquetados juntos con tu aplicación) para ejecutar el código Node.js. Para mostrar contenido remoto, use la etiqueta [`<webview>`][webview-tag] o [`BrowserView`][browser-view], asegúrese de deshabilitar el `nodeIntegration` y habilitar `contextIsolation`.

## Advertencias de seguridad de Electron

Desde Electron 2.0, los desarrolladores verán advertencias y recomendaciones impresas en la consola de desarrolladores. Estos solo se muestran cuando el nombre del binario es Electron, indicando que un desarrollador está mirando la consola.

Usted puede activar o desactivar estas advertencias forzosamente configurando `ELECTRON_ENABLE_SECURITY_WARNINGS` o `ELECTRON_DISABLE_SECURITY_WARNINGS` ya sea en `process.env` o en el objeto `window`.

## Lista: Recomendaciones de Seguridad

Al menos debes seguir los siguientes pasos para mejorar la seguridad de su aplicación:

1. [Solo carga contenido seguro](#1-only-load-secure-content)
2. [Desactiva la integración Node.js en todas las renderizadores que muestran el contenido remoto](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Permite el aislamiento de contexto en todos los renderizadores que muestran el contenido remoto](#3-enable-context-isolation-for-remote-content)
4. [Usar `ses.setPermissionRequestHandler()` en todas las sesiones que cargan contenido remoto](#4-handle-session-permission-requests-from-remote-content)
5. [No desactives `webSecurity`](#5-do-not-disable-websecurity)
6. [Define un `Content-Security-Policy`](#6-define-a-content-security-policy) y usa reglas estrictas (i.e. `script-src 'self'`)
7. [No establezca `allowRunningInsecureContent` a `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [No active ajustes experimentales](#8-do-not-enable-experimental-features)
9. [No use `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: No use`allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Verificar opciones y parámetros](#11-verify-webview-options-before-creation)
12. [Deshabilitar o limitar la navegación](#12-disable-or-limit-navigation)
13. [Deshabilitar o limitar la generación de nuevas ventanas](#13-disable-or-limit-creation-of-new-windows)
14. [No utilice `openExternal` con contenido no confiable](#14-do-not-use-openexternal-with-untrusted-content)
15. [Usar una versión actual de Electron](#15-use-a-current-version-of-electron)

Para automatizar la detección de configuraciones erróneas y de modelos inseguros, es posible usar [electronegativity](https://github.com/doyensec/electronegativity). Para detalles adicionales sobre potenciales debilidades y errores en la implementación durante el desarrollo de aplicaciones usando Electron, consulte [guía para desarrolladores y auditores](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Cargar solo contenido seguro

Cualquier recurso no incluido con tu aplicación debería ser cargado usando un protocolo de seguridad como `HTTPS`. En otras palabras, no uses protocolos inseguros como `HTTP`. De manera similar, recomendamos el uso de `WSS` antes de `WS`, `FTPS` antes de `FTP`, y así.

### ¿Por qué?

`HTTPS` tiene tres beneficios principales:

1) Autentica el servidor remoto, asegurando que tu aplicación conecte al  anfitrión correcto en vez de un falsificador. 2) Asegura integridad de data, afirmando que la data no fue modificada mientras estaba en  tránsito entre tu aplicación y el anfitrión. 3) Encripta el tráfico entre tu usuario y el anfitrión destinatario, haciéndolo  más difícil escuchar a escondidas las información establecida entre tu aplicación y el  anfitrión.

### ¿Cómo?

```js
// Bad
browserWindow.loadURL('http://example.com')

// Good
browserWindow.loadURL('https://example.com')
```

```html
<!-- Bad -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Good -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) No habilitar la integración Node.js para contenido Remote

_Esta recomendación es el comportamiento por defecto desde Electron 5.0.0._

Es primordial que no active la integración Node.js en ningún renderizador ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], o [`<webview>`][webview-tag]) que carga contenido remote. La meta es limitar los poderes que concedes al contenido remoto, aunque lo hace dramáticamente más difícil para un atacante lastimar a tus usuarios, ellos deberían ganar la habilidad de ejecutar JavaScript en tu página web.

Luego de esto, puedes conceder permisos adicionales para anfitriones específicos. Por ejemplo, si está abriendo una ventana de navegador apunta a `https://example. om/`, puedes dar a ese sitio web exactamente las habilidades que necesita, pero no más.

### ¿Por qué?

Un ataque cross-site-scripting (XSS) es más peligroso si un atacante puede altar fuera del proceso de renderizado y ejecutar el código en la computadora del usuario. Ataques cross-site-scripting son muy comunes - y durante un problema, su poder es usualmente limitado a molestar a la página en dónde los están ejecutando. Desactivar la integración Node.js ayuda a prevenir un XSS de ser escalado en un llamado ataque de "Ejecución de Código Remoto".

### ¿Cómo?

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

## 3) Habilitar el aislamiento del contexto para Contenido Remoto

Aislamiento de contexto es un ajuste de Electron que permite a los desarrolladores ejecutar códigos en guiones de pre carga y en APIs de Electron en un contexto dedicado de JavaScript. En práctica, eso significa que los objetos globales como `Array.prototype.push` o `JSON.parse` no puede ser modificado por guiones por guiones ejecutándose en el proceso de renderizado.

Electron usa la misma tecnología que los [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) de Chromium para activar este comportamiento.

Even when `nodeIntegration: false` is used, to truly enforce strong isolation and prevent the use of Node primitives `contextIsolation` **must** also be used.

### ¿Por qué & cómo?

Para más información sobre lo que es `contextIsolation` y cómo activarlo, por favor vea nuestro documento dedicado [Aislación de Contexto](context-isolation.md).

## 4) Gestionar las solicitudes de permiso de sesión desde el contenido remoto

Tu puedes haber visto pedidos de permiso mientras usas Chrome: Ellos avisan lo que sea que la página intente usar como una característica que el usuario tiene que aprobar manualmente (como notificaciones).

La API está basada en los [Chromium permissions API](https://developer.chrome.com/extensions/permissions) e implementa el mismo tipo de permisos.

### ¿Por qué?

Por defecto, Electron aprobará automáticamente todos los pedidos de permiso a menos que el desarrollador haya configurado manualmente un comerciante personalizado. Aunque es un sólido ajuste automático, los desarrolladores conscientes de la seguridad pueden querer asumir lo contrario.

### ¿Cómo?

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

_La recomendación por defecto es Electrón_

Puede que haya adivinado que deshabilitando la propiedad `webSecurity` en un render process ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) desactiva características de seguridad cruciales.

No deshabilite `webSecurity` en aplicaciones de producción.

### ¿Por qué?

Desactivar `webSecurity` deshabilitará la política de mismo-origen y establecer la propiedad `allowRunningInsecureContent` a `true`. En otras palabras, permite la ejecución de código inseguro desde diferentes dominios.

### ¿Cómo?

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

## 6) Definir una política de seguridad de contenido

Un Contenido de Política de Seguridad (CSP) es una capa adicional de protección contra los ataques cross-site-scripting attacks y ataques de inyecciones de data. Recomendamos que ellos estén activados por cualquier página web cargada dentro de Electron.

### ¿Por qué?

CSP permite que el servidor dando contenido pueda restringir y controlar los recursos que Electron puede cargar para esa página web dada. `https://example.com` debería estar permitido para guiones de pre carga de los orígenes que definiste mientras que los guiones de `https://evil.attacker.com` no debería tener permitido ejecutarse. Definir un CSP es una manera fácil de mejorar la seguridad de tus aplicaciones.

El siguiente CSP permitirá que Electron ejecute guiones desde la página web actual y desde `apis.example.com`.

```plaintext
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### Encabezado CSP HTTP

Electron respeta el [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) que puede ser establecido usando el manejador [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) de Electron:

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

El mecanismo de entrega preferido de CSP es una cabecera HTTP, sin embargo no es posible usar este método al cargar un recurso usando el protocolo `file://`. Puede ser útil en algunos casos, como usar el protocolo `file://`, para establecer una política en un página directamente en el markup usando un tag `<meta>`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 7) No establecer `allowRunningInsecureContent` a `true`

_La recomendación por defecto es Electrón_

Por defecto, Electron no permitirá sitios webs cargados sobre `HTTPS` para cargar y ejecutar scripts, CSS, o plugins desde orígenes inseguros (`HTTP`). Establecer la propiedad `allowRunningInsecureContent` a `true` deshabilita esa protección.

Descargar la inicial HTML de un sitio web mediante `HTTPS` e intentar descargar recursos subsecuentes mediante `HTTP` es también conocido como "contenido mixto".

### ¿Por qué?

Cargando contenido sobre `HTTPS` se asegura la autenticidad y la integridad de los recursos cargados mientras se cifra el trafico en si mismo. Ver la sección en [only displaying secure content](#1-only-load-secure-content) para más detalles.

### ¿Cómo?

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

## 8) No Habilitar características experimentales

_La recomendación por defecto es Electrón_

Usuarios avanzados de Electron pueden habilitar las características experimentales de Chromium usando la propiedad `experimentalFeatures`.

### ¿Por qué?

Las funciones experimentales son, como sugiere su nombre, experimentales y no han sido habilitadas para todos los usuarios de Chromium. Además, es probable que su impacto sobre Electron en su conjunto no haya sido probado.

Casos de uso legítimo existen, pero excepto que usted sepa lo que está haciendo, usted no debería habilitar esta propiedad.

### ¿Cómo?

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

## 9) No use `enableBlinkFeatures`

_La recomendación por defecto es Electrón_

Blink es el nombre del motor de renderizado detrás de Chromium. Como con la propiedad `experimentalFeatures`, la propiedad `enableBlinkFeatures` permite a los desarrolladores habilitar características que han sido deshabilitada por defecto.

### ¿Por qué?

En general, probablemente hay buenas razones si una función no fue habilitada por defecto. Casos de uso legítimo para habilitar funciones especificas existen. Como un desarrollador, usted debería saber exactamente por qué usted necesita habilitar una función, cuales son las ramificaciones, y como impacta las seguridad de su aplicación. Usted no debería habilitar funciones de forma especulativa bajo ninguna circunstancia.

### ¿Cómo?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow()
```

## 10) No use `allowpopups`

_La recomendación por defecto es Electrón_

Si estas usando [`<webview>`][webview-tag], puede que necesites las paginas y los scripts cargados en tu tag `<webview>` par abrir nuevas ventanas. El atributo `allowpopups` les permite crear nuevas [`BrowserWindows`][browser-window] usando el método `window.open()`. tags `<webview>` de otra manera no se permite crear nuevas ventanas.

### ¿Por qué?

Si usted no necesita ventanas emergentes, le conviene no permitir la creación de nuevos [`BrowserWindows`][browser-window] por defecto. Esto sigue el principio de acceso de mínimamente requerido: No permita que un sitio web cree nuevas ventanas excepto usted sepa que se necesita esa función.

### ¿Cómo?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## 11) Verificar las opciones de WebView antes de la creación

Un WebView creado en un proceso de renderizado que no contenga integración habilitada de Node.js no será capaz de habilitar integración por sí mismo. Sin embargo, a WebView siempre creará un proco de renderizado independiente con su propio `webPreferences`.

Es una buena ida controlar la creación de nuevas etiquetas [`<webview>`][webview-tag] desde el proceso principal y verificar que su webPreferences no deshabilitan características de seguridad.

### ¿Por qué?

Puesto que `<webview>` vive en el DOM, ellos pueden ser creados por un script corriendo en tu sitio web incluso si la integración con Node.js está descativada.

Electron habilita a desarrolladores a inhabilitar varias funciones de seguridad que controlan un proceso de renderizado. En la mayoría de los casos, los desarrolladores no necesitan desactivar ninguna de esas características - y por lo tanto no deberías permitir diferentes configuraciones para las etiquetas [`<webview>`][webview-tag] recién creados.

### ¿Cómo?

Antes que la etiqueta [`<webview>`][webview-tag] sea adjuntada, Electron va a disparar el evento `will-attach-webview` en el `webContents` hosting. Use el evento para evitar la creación de `webViews` con posibles opciones inseguras.

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

Una vez más, esta lista simplemente minimiza el riesgo, no lo elimina. Si su objetivo es mostrar un sitio web, un navegador será una opción más segura.

## 12) Deshabilitar o limitar la navegación

Si tu aplicación no tiene la necesidad de navegar o sólo necesita navegar a páginas conocidas, es una buena idea limitar la navegación directamente a ese alcance conocido, inhabilitando cualquier otro tipo de navegación.

### ¿Por qué?

La navegación es un vector de ataque común. Si un atacante puede convencer a su aplicación para que navegue lejos de su página actual, posiblemente puede forzar a tu aplicación a abrir sitios web en Internet. Incluso si tu `webContents` están configurados para ser más seguros (como tener `nodeIntegration` deshabilitado o `contextIsolation` habilitado), conseguir que tu aplicación abra un sitio web aleatorio hará que el trabajo de explotar tu aplicación sea mucho mas fácil.

Un patrón común de ataque es que el atacante convence a los usuarios de tu aplicación a interactuar con la aplicación de tal manera que navegue a una de las páginas del atacante. Esto usualmente se hace vía links, plugins u otro contenido generado por el usuario.

### ¿Cómo?

Si tu aplicación no tiene necesidad de navegación, puedes llamar a `event.preventDefault()` en un manejador [`will-navigate`][will-navigate]. Si sabes a que páginas tu aplicación puede navegar, revisa la URL en el manejador de evento y solo deja que ocurra la navegación si coincide con las URL que estás esperando.

Recomendamos que uses el parser para URLs de Node. Comparaciones simples de cadenas puede a veces engañar - una prueba `startsWith('https://example.com')` podría dejar pasar `https://example.com.attacker.com`.

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

## 13) Deshabilite o limite la creación de nuevas ventasnas

Si tienes un conjunto de ventanas conocido, es una buena idea limitar la creación de ventanas adicionales en tu aplicación.

### ¿Por qué?

Al igual que la navegación, la creación de nuevo `webContents` en un vector de ataque común. Los atacantes intentar convencer a tu aplicación a crear nuevas ventanas, frames u otros procesos renderer con más privilegios de lo que antes tenían; o con páginas abiertas que antes no pudieron abrir.

Si no tienes la necesidad de crear ventanas adicionales de la que sabes que tendrás que crear, desactivando la creación te compra un poco de seguridad extra sin costo alguno. Este comúnmente el caso de las aplicaciones que abre un `BrowserWindow` y no necesita abrir un número arbitrario de ventanas adicionales en tiempo de ejecución.

### ¿Cómo?

[`webContents`][web-contents] delegará a su [controlado de venta abierta][window-open-handler] antes de crear nuevas ventanas. The handler will receive, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you register a handler to monitor the creation of windows, and deny any unexpected window creation.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  })
})
```

## 14) No use `openExternal` con contenido no confiable

El [`openExternal`][open-external] de Shell permite abrir un protocolo URI dado con las utilidades nativas del escritorio. En macOS, a modo de ejemplo, esta función es similar a la utilidad de comando de terminal `open` y abrirá la aplicación especifica basado en la URI y en el tipo de archivo asociado.

### ¿Por qué?

El uso indebido de [`openExternal`][open-external] puede ser apalancado para comprometer el host del usuario. Cuando openExternal se usa con contenido no confiable, puede ser apalancado para ejecutar comandos arbitrarios.

### ¿Cómo?

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

## 15) Utilizar una versión actual de Electron

Debe esforzarse por utilizar siempre la última versión disponible de Electron. Cada vez que se lanza una nueva versión principal, deberías intentar actualizar tu aplicación lo antes posible.

### ¿Por qué?

Una aplicación construida con una versión anterior de Electron, Chromium y Node.js es un objetivo más fácil que una aplicación que está usando versiones más recientes de esos componentes. Generalmente hablando, los problemas de seguridad y exploits para viejas verciones de Chromium y Node.js están más ampliamente disponibles.

Ambos Chomium y Node.js impresionantes son impresionantes hazañas de ingeniería construidas por miles de talentosos desarrolladores. Dada su popularidad, su seguridad es cuidadosamente probada y analizada por investigadores de seguridad igualmente calificados. Muchos de esos investigadores [disclose vulnerabilities responsibly][responsible-disclosure], lo que generalmente quiere decir que los investigadores darán a Chromium y Node.js algo de tiempo para solucionar los problemas antes de publicarlos. Tu aplicación será más segura si está ejecutando una versión reciente de Electron (y por tanto, Chromium y Node.js) para los cuales problemas de seguridad potenciales no son tan conocidos.

[browser-window]: ../api/browser-window.md

[browser-window]: ../api/browser-window.md
[browser-view]: ../api/browser-view.md
[webview-tag]: ../api/webview-tag.md
[web-contents]: ../api/web-contents.md
[window-open-handler]: ../api/web-contents.md#contentssetwindowopenhandlerhandler
[will-navigate]: ../api/web-contents.md#event-will-navigate
[open-external]: ../api/shell.md#shellopenexternalurl-options
[responsible-disclosure]: https://en.wikipedia.org/wiki/Responsible_disclosure
