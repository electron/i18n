# Web embedidas

## Descripción general

Si quiere incrustar contenido web (de terceros) en un `BrowserWindow` de Electron, hay tres opciones disponible para usted: `<iframe>` tags, `<webview>` tags, y `BrowserViews`. Cada una ofrece una funcionalidad ligeramente diferente y es útil en diferentes situaciones. To help you choose between these, this guide explains the differences and capabilities of each option.

### Iframes

Iframes en Electron se comportan como iframes en los navegadores regulares. An `<iframe>` element in your page can show external web pages, provided that their [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) allows it. To limit the number of capabilities of a site in an `<iframe>` tag, it is recommended to use the [`sandbox` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) and only allow the capabilities you want to support.

### WebViews

> Nota importante: [no se recomienda el uso de WebViews](../api/webview-tag.md#warning), ya que esta etiqueta genera cambios dramáticos en la arquitectura que podrían afectar a la estabilidad de tu aplicación. Considere cambiar a alternativas, como `iframe` y  `BrowserView` de Electron, o una  arquitectura que evite el contenido incrustado por diseño.

[WebViews](../api/webview-tag.md) son basados en las WebViews de Chromium y no están soportados explícitamente por Electron. No garantizamos que la API WebView permanezca disponible en versiones futuro de Electron. Para usar `<webview>` etiquetas, necesitaras establecer `webviewTag` a `true` en el `webPreferences` de tu `BrowserWindow`.

WebView es un elemento personalizado (`<webview>`) que sólo funcionara dentro de Electron. Están implementadas como un "iframe fuera de proceso". Esto quiere decir que toda la comunicación con el `<webview>` se hace de forma asíncrona usando IPC. The `<webview>` element has many custom methods and events, similar to `webContents`, that provide you with greater control over the content.

Compared to an `<iframe>`, `<webview>` tends to be slightly slower but offers much greater control in loading and communicating with the third-party content and handling various events.

### BrowserViews

[BrowserViews](../api/browser-view.md) are not a part of the DOM - instead, they are created in and controlled by your Main process. Son simplemente otra capa de contenido web sobre su ventana existente. Esto quiere decir que están completamente separados de tu propio contenido `BrowserWindow` y su posición no es controlada por el DOM o CSS. En su lugar, es controlado estableciendo limites en el Main process.

`BrowserViews` ofrece el mayor control sobre sus contenidos, ya que implementan el `webContents` de forma similar a como `BrowserWindow` lo hace. Sin embargo, como `BrowserViews` no son parte de tu DOM, sino que están superpuestos sobre ellos, tendrá que administrar su posición manualmente.
