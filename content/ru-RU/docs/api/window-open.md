# Открытие окон от рендерера

Существует несколько способов управления тем, как окна создаются из надежного или содержимого в рендеринге. Windows может быть создана из рендерера двумя способами:

- нажав на ссылки или отправки формы украшены `target=_blank`
- JavaScript `window.open()`

В не-песочнице рендеров, или когда `nativeWindowOpen` является ложным (по умолчанию), это приводит к созданию [`BrowserWindowProxy`](browser-window-proxy.md), свет обертка вокруг `BrowserWindow`.

Однако, когда `sandbox` (или непосредственно, `nativeWindowOpen`) параметр установлен, `Window` экземпляр создается, как и следовало ожидать в браузере. Для содержимого одного же происхождения новое окно создается в рамках того же процесса, что позволяет доступ к окну ребенка напрямую. Это может быть очень полезно для подок окон приложения, которые действуют как панели предпочтений, или аналогичные, как родитель может оказать в подокну непосредственно, как если бы это `div` в родительском.

Electron пар этого родного `Window` с BrowserWindow под капотом. Вы можете воспользоваться всеми преимуществами настройки, доступными при создании BrowserWindow в основном процессе, используя `webContents.setWindowOpenHandler()` для созданных рендерером окон.

Параметры конструктора BrowserWindow устанавливаются в порядке увеличения приоритета : варианты, унаследованные от родителя, разобраные варианты из строки `features` от `window.open()`, связанные с безопасностью webPreferences унаследованные от родителя, и варианты, данные [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler). Обратите внимание, `webContents.setWindowOpenHandler` имеет последнее слово и полную привилегию , потому что он вызывается в основном процессе.

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String (опиционально)
* `features` String (опиционально)

Возвращает [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` является запятой разделенный список ключевых значений, следуя стандартному формату браузера. Electron будет анализировать `BrowserWindowConstructorOptions` этого списка , где это возможно, для удобства. Для полного управления и улучшения эргономики, рассмотреть возможность `webContents.setWindowOpenHandler` для настройки создания BrowserWindow.

Подмножество `WebPreferences` может быть установлено непосредственно, , из строки функций: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`и `webviewTag`.

Например:

```js
window.open ('https://github.com', '_blank', 'top'500,left'200,frame-false,nodeIntegration'no')
```

**Замечания:**

* Интеграция узла всегда будет отключена в открытой `window` если она отключена на родительском окне.
* Изоляция контекста всегда будет включена в открытой `window` если она включена в родительском окне.
* JavaScript всегда будет отключен в открытой `window` если он отключен родительского окна.
* Нестандартные функции (которые не обрабатываются Chromium или Electron), данные в `features` , будут переданы любому зарегистрированного обработчику событий `webContents`'s `did-create-window` в `additionalFeatures` аргументе.

Чтобы настроить или отменить создание окна, можно дополнительно установить обработчик с `webContents.setWindowOpenHandler()` из основного процесса. Возвращаясь `false` отменяет окно, при возврате объекта устанавливается `BrowserWindowConstructorOptions` , используемого при создании окна. Обратите внимание, это более мощно, чем передача опций через строку функций, так как renderer имеет более ограниченные привилегии при определении предпочтений безопасности, чем основной процесс.

### `BrowserWindowProxy` пример

```javascript

главное.js
const mainWindow - новый BrowserWindow ()

mainWindow.webContents.setWindowOpenHandler ((({ url }) -> -
  если (url.startsWith ('https://github.com/')) -
    возврат { action: 'allow' }

  возврата { action: 'deny' }
)

mainWindow.webContents.on ('did-create-window', (childWindow) ->
  // Например...
  childWindow.webContents ('will-navigate', (e) ->
    e.preventDefault ()
  )
)
```

```javascript
рендер.js
const windowProxy - window.open ("https://github.com/', null, 'minimizable'false')
windowProxy.postMessage ("привет", 'к')
```

### Родной `Window` пример

```javascript
главное.js
const mainWindow - новый BrowserWindow (no
  webPreferences: {
    nativeWindowOpen: true
  }
)

// В этом примере будут созданы только окна с URL-адресом 'about:blank'.
Все остальные URL-адреса будут заблокированы.
mainWindow.webContents.setWindowOpenHandler ((({ url }) -> -
  если (url -1":blank') -
    возврат :
      кадр: ложный,
      полноэкранный: ложный,
      backgroundColor:
      webPrefers: {
        preload: 'my-child-window-preload-script.js'
      }
    -
  


```

```javascript
процесс рендерирования (mainWindow)
const childWindow - window.open (', 'modal')
childWindow.document.write",'<h1>Hello</h1>')
```
