# Função `window.open`

> Abri uma nova janela e carregar uma URL.

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](browser-window.md) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

O proxy é limitado a funcionalidade padrão implementada para ser compatível com páginas web tradicionais. Para ter o controle total da nova janela, você deve criar um `BrowserWindow` diretamente.

O recém-criado `BrowserWindow` herdará as opções da janela pai por padrão. Para substituir as opções herdadas, você pode defini-las na string `features`.

### `window.open(url[, frameName][, features])`

* String `url`
* `frameName` String (opcional)
* `features` String (opcional)

Retorna [`BrowserWindowProxy`](browser-window-proxy.md) - Cria uma nova janela e retorna uma instância da classe `BrowserWindowProxy`.

A string `features` segue o formato padrão do navegador, mas cada feature deve ser um campo das opções de `BrowserWindow`.

**Notas:**

* Node integration will always be disabled in the opened `window` if it is disabled on the parent window.
* Context isolation will always be enabled in the opened `window` if it is enabled on the parent window.
* JavaScript will always be disabled in the opened `window` if it is disabled on the parent window.
* Non-standard features (that are not handled by Chromium or Electron) given in `features` will be passed to any registered `webContent`'s `new-window` event handler in the `additionalFeatures` argument.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Envia uma mensagem para a janela pai com a origem especificada ou `*` para origem sem preferência.

### Usando a implementação de `window.open()` do Chrome

Se você deseja usar a implementação built-in de `window.open()` do Chrome, defina `nativeWindowOpen` como `true` no objeto de opções `webPreferences`.

Native `window.open()` allows synchronous access to opened windows so it is convenient choice if you need to open a dialog or a preferences window.

This option can also be set on `<webview>` tags as well:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

The creation of the `BrowserWindow` is customizable via `WebContents`'s `new-window` event.

```javascript
// main process
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nativeWindowOpen: true
  }
})
mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'modal') {
    // open window as modal
    event.preventDefault()
    Object.assign(options, {
      modal: true,
      parent: mainWindow,
      width: 100,
      height: 100
    })
    event.newGuest = new BrowserWindow(options)
  }
})
```

```javascript
// renderer process (mainWindow)
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>')
```