# Página web embebida en Electron

Si usted quiere embeber contenido web (de terceros) en una aplicación Electron `BrowserWindow`, hay tres opciones displinibles para usted: `<iframe>` tags, `<webview>` tags, y `BrowserViews`. Cada una ofrece una funcionalidad ligeramente diferente y es útil en diferentes situaciones. Para ayudarle a elegir entre estos, esta guía le explicará las diferencias ente las capacidades de cada uno.

## Iframes

Iframes en Electron se comportan como iframes en los navegadores regulares. Un elemento `<iframe>` en tu página puede mostrar páginas web externas, siempre y cuando [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) lo permita. Para limitar la cantidad de capacidades de un sitio en una etiqueta `<iframe>`, es recomendado usar el [`sandbox` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) y solo permitir las capacidades que tu quieres soportar.

## WebViews

Las [WebViews](../api/webview-tag.md) están basadas en las WebViews de Chromium y no son soportadas explícitamente por Electron. Nosotros no garantizamos que la API de WebView permanecerá disponible en futuras versiones de Electron. Esto es porque, si quieres usar las etiquetas `<webview>` necesitaras establecer `webviewTag` a `true` en el `webPreferences` de tu `BrowserWindow`.

Las WebViews son a elemento personalizado (`<webview>`) que sólo funcionará dentro de Electron. Están implementadas como un "iframe fuera de proceso". Esto quiere decir que toda la comunicación con el `<webview>` se hace de forma asincrónica usando IPC. El elemento `<webview>` tiene muchos métodos y eventos, similar a `webContents` que te permite mejor control sobre los contenidos.

Comparado con un `<iframe>`, `<webview>` tiende a ser un poco más lento pero ofrece un control mucho mayor en la carga y comunicación con el contenido de terceros y en la gestión de diversos eventos.

## BrowserViews

[BrowserViews](../api/browser-view.md) no son parte del DOM - en cambio, ellos son creados y controlados por su proceso principal. Son simplemente otra capa de contenido web sobre su ventana existente. Esto quiere decir que están completamente separados de su propio contenido `BrowserWindow` y que su posición no es controlado por el DOM o CSS pero estableciendo los límites en el proceso principal.

BrowserViews ofrecen el mayor control sobre su contenido, ya que implementan los `webContents` de forma similar a como un `BrowserWindow` lo implementa. Sin embargo, no son parte de su DOM sino que se superponen sobre ellos, lo que significa que usted tendrá que gestionar su posición manualmente.
