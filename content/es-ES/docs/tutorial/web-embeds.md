# Página web embebida en Electron

Si usted quiere embeber contenido web (de terceros) en una aplicación Electron `BrowserWindow`, hay tres opciones displinibles para usted: `<iframe>` tags, `<webview>` tags, y `BrowserViews`. Cada una ofrece una funcionalidad ligeramente diferente y es útil en diferentes situaciones. Para ayudarle a elegir entre estos, esta guía le explicará las diferencias ente las capacidades de cada uno.

## Iframes

Iframes en Electron se comportan como iframes en los navegadores regulares. Un elemento `<iframe>` en tu página puede mostrar páginas web externas, siempre y cuando [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) lo permita. Para limitar la cantidad de capacidades de un sitio en una etiqueta `<iframe>`, es recomendado usar el [`sandbox` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) y solo permitir las capacidades que tu quieres soportar.

## WebViews

Las [WebViews](../api/webview-tag.md) están basadas en las WebViews de Chromium y no son soportadas explícitamente por Electron. Nosotros no garantizamos que la API de WebView permanecerá disponible en futuras versiones de Electron. Esto es porque, si quieres usar las etiquetas `<webview>` necesitaras establecer `webviewTag` a `true` en el `webPreferences` de tu `BrowserWindow`.

Las WebViews son a elemento personalizado (`<webview>`) que sólo funcionará dentro de Electron. Están implementadas como un "iframe fuera de proceso". Esto quiere decir que toda la comunicación con el `<webview>` se hace de forma asincrónica usando IPC. The `<webview>` element has many custom methods and events, similar to `webContents`, that allow you much greater control over the contents.

Compared to an `<iframe>`, `<webview>` tends to be slightly slower but offers much greater control in loading and communicating with the third party content and handling various events.

## BrowserViews

[BrowserViews](../api/browser-view.md) are not part of the DOM - instead, they are created in and controlled by your main process. They are simply another layer of web content on top of your existing window. This means that they are completely separate from your own `BrowserWindow` content and that their position is not controlled by the DOM or CSS but by setting the bounds in the main process.

BrowserViews offer the greatest control over their contents, since they implement the `webContents` similarly to how a `BrowserWindow` implements it. However, they are not part of your DOM but are overlaid on top of them, which means you will have to manage their position manually.
