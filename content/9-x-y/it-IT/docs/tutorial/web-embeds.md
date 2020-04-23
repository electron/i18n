# Incorporamenti web in Electron

Se vuoi incorporare contenuti web (di terze parti) in un `BrowserWindows` di Electron, ci sono tre opzioni disponibili per te: `<iframe>` tag, `<webview>` tag, e `BrowserViews`. Ognuno offre funzionalità lievemente differenti ed è utile in situazioni differenti. Per aiutarti a scegliere tra queste, questa guida spiegherà le differenze e le capacità di ognuno.

## Iframes

Gli Iframe in Electron si comportano come gli iframe nei broswer regulari. Un `<iframe>`elemento nella tua pagina può mostrare pagine web esterne, premesso che la loro [Politica sulla Sicurezza del Contenuto](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) lo consenta. Per limitare la quantità delle capacità un sito in un `<iframe>` tag, si consiglia di usare l'[attributo `sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) e consente solo le capacità che vuoi supportare.

## WebViews

[WebViews](../api/webview-tag.md) si basano sulle WebViews di Chromium e non sono esplicitamente supportate da Electron. Non garantiamo che le API di WebView rimarranno disponibile nelle versioni future di Electron. This is why, if you want to use `<webview>` tags, you will need to set `webviewTag` to `true` in the `webPreferences` of your `BrowserWindow`.

WebViews are a custom element (`<webview>`) that will only work inside Electron. They are implemented as an "out-of-process iframe". This means that all communication with the `<webview>` is done asynchronously using IPC. The `<webview>` element has many custom methods and events, similar to `webContents`, that allow you much greater control over the contents.

Compared to an `<iframe>`, `<webview>` tends to be slightly slower but offers much greater control in loading and communicating with the third party content and handling various events.

## BrowserViews

[BrowserViews](../api/browser-view.md) are not part of the DOM - instead, they are created in and controlled by your main process. They are simply another layer of web content on top of your existing window. This means that they are completely separate from your own `BrowserWindow` content and that their position is not controlled by the DOM or CSS but by setting the bounds in the main process.

BrowserViews offer the greatest control over their contents, since they implement the `webContents` similarly to how a `BrowserWindow` implements it. However, they are not part of your DOM but are overlaid on top of them, which means you will have to manage their position manually.
