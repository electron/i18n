# Funkcja `window.open`

> Otwiera nowe okno i ładuje adres URL.

Kiedy `window.open` jest wywołane do utworzenia nowego okna na stronie internetowej, nowa instancja [`BrowserWindow`](browser-window.md) zostanie utworzona dla `url`, a proxy zostanie zwrócone do `window.open`, aby strona miała nad nim ograniczoną kontrolę.

The proxy has limited standard functionality implemented to be compatible with traditional web pages. For full control of the new window you should create a `BrowserWindow` directly.

The newly created `BrowserWindow` will inherit the parent window's options by default. To override inherited options you can set them in the `features` string.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (optional)
* `features` String (optional)

Zwraca [`BrowserWindowProxy`](browser-window-proxy.md) - tworzy nowe okno i zwraca wystąpienie klasy `BrowserWindowProxy`.

Ciąg znaków `features` odpowiada formatowi standardowej przeglądarki, ale każda funkcja musi być kluczem opcji `BrowserWindow`. Oto funkcje, które można ustawić za pomocą `features`: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Na przykład:
```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Uwagi:**

* Integracja Node będzie wyłączona dla otwartego okna, jeśli jest wyłączona w oknie nadrzędnym.
* Izolacja kontekstu będzie włączona w otwartym oknie, jeśli jest włączona w oknie nadrzędnym.
* JavaScript będzie wyłączony w otwartym oknie, jeśli jest wyłączony w oknie nadrzędnym.
* Niestandardowe funkcjonalności (które nie są obsługiwane przez Chromium lub Electron) przekazane w `features` zostaną przekazane do każdego zarejestrowanego przez `webContent` wydarzenia `new-window` w kluczu `additionalFeatures`.

### `window.opener.postMessage(message, targetOrigin)`

* `message` String
* `targetOrigin` String

Wysyła komunikat do okna nadrzędnego określonego pochodzenia lub `*` w przypadku braku preferencji pochodzenia.

### Używanie implementacji Chrome `window.open()`

Jeśli chcesz użyć wbudowanego w Chrome `window.open()`, ustaw `nativeWindowOpen` na `true` w obiekcie opcji `webPreferences`.

Natywne wywołanie funkcji `window.open()` pozwala na synchroniczny dostęp do otwartych okien, dzięki temu jest to wygodny wybór, jeśli potrzebujesz otworzyć okno dialogowe lub okno Ustawień aplikacji.

Tę opcję można również ustawić poprzez tag `<webview>`:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

Utworzenie `BrowserWindow` jest konfigurowalne przez wydarzenie `WebContents` — `new-window`.

```javascript
// główny proces
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
// proces renderowania (mainWindow)
let modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>')
```
