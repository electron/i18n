# Функция `window.open`

> Открывает новое окно и загружает URL.

Когда `window.open` вызывается для создания нового окна на веб-странице, будет создаваться новый экземпляр [`BrowserWindow`](browser-window.md) по `url` и прокси возвратит `window.open` и позволить странице иметь ограниченный контроль над ним.

Прокси имеет ограниченный набор стандартных функций для совместимости с традиционными веб-страницами. Для полного контроля над новым окном вы должны создать `BrowserWindow` напрямую.

Только что созданный `BrowserWindow` будет по умолчанию наследовать свойства родительского окна. Для переопределения наследованных параметров вы можете установить их в параметре `features`.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (опционально)
* `features` String (опционально)

Возвращает [`BrowserWindowProxy`](browser-window-proxy.md) - создает новое окно и возвращает экземпляр класса `BrowserWindowProxy`.

Форматирование параметра `features` следует формату стандартного браузера, но каждая функция должна быть полем `BrowserWindow`. Вы можете установить с помощью параметра `features` следующие функции: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

Например:
```js
window.open('https://github.com', '_blank', 'nodeIntegration=no')
```

**Замечания:**

* Интеграция с Node будет всегда выключена в открытых `window` если она была выключена в родительском окне.
* Изоляция контекста будет всегда включена в открытых `window` если она была включена в родительском окне.
* JavaScript будет всегда включен в открытых `window` если он был включен в родительском окне.
* Нестандартные функции (которые не обрабатываются Chromium или Electron), указанные в `features` будут переданы любому зарегистрированному в `webContent` объекта `new-window` обработчику событий в виде `additionalFeatures` аргумента.

### `window.opener.postMessage(message, targetOrigin)`

* Строка `message`
* `targetOrigin` String

Отправить сообщение родительскому окну можно с указанием получателя или `*` для отправки без указания.

### С помощью Chrome `window.open()` реализации

Если вы хотите использовать встроенную в Chrome реализацию `window.open()`, установите параметр `nativeWindowOpen` объекта `webPreferences` на `true`.

Встроенный `window.open()` допускает синхронный доступ к открытым окнам. Так что, это хороший выбор, если вам нужно открыть диалоговое окно или окно настроек.

Параметр также может быть установлен на `<webview>` теге:

```html
<webview webpreferences="nativeWindowOpen=yes"></webview>
```

Создание `BrowserWindow` настраивается с помощью `new-window` события `WebContents`.

```javascript
// основной процесс
const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nativeWindowOpen: true
  }
})
mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
  if (frameName === 'modal') {
    // открыть окно как модальное
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
// процесс рендера (mainWindow)
const modal = window.open('', 'modal')
modal.document.write('<h1>Hello</h1>')
```
