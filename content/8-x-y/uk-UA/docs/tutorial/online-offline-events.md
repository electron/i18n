# Виявлення Онлайн/Офлайн Подій

[Онлайн і офлайн подія](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) детектор може бути реалізований за допомогою [`навігатора. nLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) атрибут, частина стандартного HTML5 API. Атрибут `navigator.onLine` повертає `false` , якщо будь-які мережеві запити гарантовано успішні, тобто безумовно в автономному режимі (відключення з мережі). Повертає `true` у всіх інших випадках. Оскільки всі інші умови повертаються `true`, один повинен мислити про отримання помилкових позитивних результатів, як ми не можемо припустити, `true` значення обов'язково означає, що Electron може отримувати доступ до Інтернету. Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

Приклад:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

_online-status.html_

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online', alertOnlineStatus)
  window.addEventListener('offline', alertOnlineStatus)

  alertOnlineStatus()
</script>
</body>
</html>
```

Там можуть бути екземпляри, де ви хочете відповісти на ці події в головному процесі. Однак головний процес не має `навігатор` об’єкт і, таким чином, не може виявити ці події безпосередньо. Використання міжпроцесні програми Electron, події можна переслати до головного процесу і опрацьовувати як це необхідно в наступному прикладі.

_main.js_

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.on('ready', () => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

_online-status.html_

```html
<! OCTYPE html>
<html>
<body>
<script>
  з { ipcRenderer } = require('electron')
  const updateOnlineStatus = () =>
    ipcRenderer. end('online-status-chang', navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  updateOnlineStatus()
</script>
</body>
</html>
```
