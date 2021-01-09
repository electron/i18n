# Функция `window.open`

> Open a new window and load a URL.

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](browser-window.md) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

The proxy has limited standard functionality implemented to be compatible with traditional web pages. For full control of the new window you should create a `BrowserWindow` directly.

The newly created `BrowserWindow` will inherit the parent window's options by default. To override inherited options you can set them in the `features` string.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (optional)
* `features` String (optional)

Returns [`BrowserWindowProxy`](browser-window-proxy.md) - Creates a new window and returns an instance of `BrowserWindowProxy` class.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options. These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Например:
```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Notes:**

* Node integration will always be disabled in the opened `window` if it is disabled on the parent window.
* Context isolation will always be enabled in the opened `window` if it is enabled on the parent window.
* JavaScript will always be disabled in the opened `window` if it is disabled on the parent window.
* Non-standard features (that are not handled by Chromium or Electron) given in `features` will be passed to any registered `webContent`'s `new-window` event handler in the `additionalFeatures` argument.

### `window.opener.postMessage(message, targetOrigin)`

* `потребителско име` Низ
* `targetOrigin` String

Изпраща съобщение до новия прозорец с определен произход или <0citybanamex perfiles >*</code>5256783105227699 ако няма предпочитание към произхода.

### Using Chrome's `window.open()` implementation

5256783105227699

`citybanamex perfiles </p>

<p spaces-before="0">5256783105227699</p>

<pre><code class="html"><webview webpreferences="nativeWindowOpen=yes"></webview>
`</pre>

`12</p>

<pre><code class="javascript">5256783105227699
`</pre>

```javascript
</h1>023119042275829058
```
