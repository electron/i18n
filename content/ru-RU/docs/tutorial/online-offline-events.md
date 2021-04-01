# Обнаружение Online/Offline событий

## Обзор

[онлайн и оффлайн-](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) обнаружения событий могут быть реализованы в процессе Renderer с помощью [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) атрибута, часть стандартного HTML5 API.

Атрибут `navigator.onLine` возвращается:

* `false` если все сетевые запросы гарантированно выходят из строя (например, при отключении от сети).
* `true` во всех остальных случаях.

Поскольку во многих случаях `true`, вы должны относиться с осторожностью ситуации получения ложных срабатываний, как мы не всегда можем предположить, что `true` значение означает что Electron может получить доступ к Интернету. Например, в тех случаях, когда компьютер работает программное обеспечение для виртуализации, которое имеет виртуальные адаптеры Ethernet в "всегда подключенном" состоянии. Поэтому, если вы хотите определить доступ в статус Electron, вы должны разработать дополнительные средства для этой проверки.

## Пример

### Обнаружение событий в процессе Renderer

Начиная с рабочего приложения от [Руководство по быстрому](quick-start.md), обновите `main.js` файл со следующими строками:

```javascript
const { app, BrowserWindow } - требуют ('электрон')

пусть onlineStatusWindow

app.whenReady ().., то (()) -> -
  onlineStatusWindow - новый BrowserWindow ({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL ('файл://${__dirname}/index.html')
))
```

в `index.html` файле добавьте следующую строку перед закрытия `</body>` тега:

```html
<script src="renderer.js"></script>
```

и добавьте файл `renderer.js`:

```javascript fiddle='docs/fiddles/features/online-detection/renderer'
const alertOnlineStatus () -> window.alert (navigator.onLine? 'онлайн': 'offline') -

window.addEventListener ('online', alertOnlineStatus)
window.addEventListener ('offline', alertOnlineStatus)

alertOnlineStatus ()
```

После запуска приложения Electron вы должны увидеть уведомление:

![Обнаружение онлайн-оффлайн-событий](../images/online-event-detection.png)

### Обнаружение событий в главном процессе

Там могут быть ситуации, когда вы хотите ответить на онлайн / оффлайн события в основной процесс, а также. Основной процесс, однако, не имеет `navigator` и не может обнаружить эти события напрямую. В этом случае перейти события в основной процесс с помощью межиспийных утилит electron связи (IPC).

Начиная с рабочего приложения от [Руководство по быстрому](quick-start.md), обновите `main.js` файл со следующими строками:

```javascript
const { app, BrowserWindow, ipcMain } и требуют ('электрон')
пусть onlineStatusWindow

app.whenReady ().., то (() -> -
  onlineStatusWindow - новый BrowserWindow (ширина: 0, высота: 0, показать: ложные, webPreferences: { nodeIntegration: true } q)
  onlineStatusWindow.loadURL ('файл://${__dirname}/index.html')
q)

ipcMain.on ('онлайн-статус-изменен', (событие, статус) -> -
  консоль.log (статус)

```

в `index.html` файле добавьте следующую строку перед закрытия `</body>` тега:

```html
<script src="renderer.js"></script>
```

и добавьте файл `renderer.js`:

```javascript fiddle='docs/fiddles/features/online-detection/main'
const { ipcRenderer } требуют ('электрон')
const updateOnlineStatus () -> ipcRenderer.send ('online-status-changed', navigator.onLine? 'онлайн': 'offline') -

window.addEventListener ('online', updateOnlineStatus)
window.addEventListener ('offline', updateOnlineStatus)

updateOnlineStatus()
```

После запуска приложения Electron, вы должны увидеть уведомление в консоли:

```sh
npm

> electron@1.0.0 старт /электрон
> электрон.

Онлайн
```
