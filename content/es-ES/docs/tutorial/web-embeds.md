# Web embedidas

## Descripción general

Si quiere incrustar contenido web (de terceros) en un `BrowserWindow` de Electron, hay tres opciones disponible para usted: `<iframe>` tags, `<webview>` tags, y `BrowserViews`. Cada una ofrece una funcionalidad ligeramente diferente y es útil en diferentes situaciones. Para ayudarte a elegir entre estos, esta guía explica las diferencias y las capacidades de cada opción.

### Iframes

Iframes en Electron se comportan como iframes en los navegadores regulares. Un elemento `<iframe>` en tu página puede mostrar páginas web externas, siempre que su [política de seguridad del contenido](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) lo permita. Para limitar la cantidad de capacidades de un sitio en una etiqueta `<iframe>` , se recomienda usar el atributo [`sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) y solo permitir las capacidades que deseas admitir.

### WebViews

> Nota importante: [no se recomienda el uso de WebViews](../api/webview-tag.md#warning), ya que esta etiqueta genera cambios dramáticos en la arquitectura que podrían afectar a la estabilidad de tu aplicación. Considere cambiar a alternativas, como `iframe` y  `BrowserView` de Electron, o una  arquitectura que evite el contenido incrustado por diseño.

[WebViews](../api/webview-tag.md) son basados en las WebViews de Chromium y no están soportados explícitamente por Electron. No garantizamos que la API WebView permanezca disponible en versiones futuro de Electron. Para usar `<webview>` etiquetas, necesitaras establecer `webviewTag` a `true` en el `webPreferences` de tu `BrowserWindow`.

WebView es un elemento personalizado (`<webview>`) que sólo funcionara dentro de Electron. Están implementadas como un "iframe fuera de proceso". Esto quiere decir que toda la comunicación con el `<webview>` se hace de forma asíncrona usando IPC. El elemento `<webview>` tiene muchos métodos y eventos personalizados, similares a `webContents`, que te brindan un mayor control sobre el contenido.

Comparado con un `<iframe>`, `<webview>` tiende a ser ligeramente más lento, pero ofrece mucho más control en la carga y la comunicación con el contenido de terceros y la manipulación de diversos eventos.

### BrowserViews

[](../api/browser-view.md) BrowserViews no son parte del DOM-en su lugar, que son creadas y controladas por tu proceso principal. Son simplemente otra capa de contenido web sobre su ventana existente. Esto quiere decir que están completamente separados de tu propio contenido `BrowserWindow` y su posición no es controlada por el DOM o CSS. En su lugar, es controlado estableciendo limites en el Main process.

`BrowserViews` ofrece el mayor control sobre sus contenidos, ya que implementan el `webContents` de forma similar a como `BrowserWindow` lo hace. Sin embargo, como `BrowserViews` no son parte de tu DOM, sino que están superpuestos sobre ellos, tendrá que administrar su posición manualmente.
