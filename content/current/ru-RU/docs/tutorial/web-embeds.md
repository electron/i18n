# Встраивание веб в Electron

Если вы хотите встроить (сторонний) веб-контент в Electron `BrowserWindow`, то вам доступны три варианта: тег `<iframe>`, тег `<webview>`, и `BrowserViews`. Каждый из них предлагает немного различную функциональность и полезны в разных ситуациях. Чтобы помочь вам выбрать между ними, это руководство объяснит различия и возможности каждого из них.

## Iframes

Iframe в Electron ведет себя так же, как iframe в обычных браузерах. Элемент `<iframe>` на вашей странице может показывать внешние веб-страницы, при условии, что их [политика безопасности содержимого](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) позволяет это. Чтобы ограничить количество возможностей сайта в теге `<iframe>`, рекомендуется использовать [атрибут `sandbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) и разрешать только те возможности, которые вы хотите поддерживать.

## WebViews

[WebViews](../api/webview-tag.md) are based on Chromium's WebViews and are not explicitly supported by Electron. We do not guarantee that the WebView API will remain available in future versions of Electron. This is why, if you want to use `<webview>` tags, you will need to set `webviewTag` to `true` in the `webPreferences` of your `BrowserWindow`.

WebViews are a custom element (`<webview>`) that will only work inside Electron. They are implemented as an "out-of-process iframe". This means that all communication with the `<webview>` is done asynchronously using IPC. The `<webview>` element has many custom methods and events, similar to `webContents`, that allow you much greater control over the contents.

Compared to an `<iframe>`, `<webview>` tends to be slightly slower but offers much greater control in loading and communicating with the third party content and handling various events.

## BrowserViews

[BrowserViews](../api/browser-view.md) are not part of the DOM - instead, they are created in and controlled by your main process. They are simply another layer of web content on top of your existing window. This means that they are completely separate from your own `BrowserWindow` content and that their position is not controlled by the DOM or CSS but by setting the bounds in the main process.

BrowserViews offer the greatest control over their contents, since they implement the `webContents` similarly to how a `BrowserWindow` implements it. However, they are not part of your DOM but are overlaid on top of them, which means you will have to manage their position manually.
