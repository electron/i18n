# Konu Özeti

> Node.js ve Electron API'leri nasıl kullanılır.

Bütün [Node.js'in built-in modülleri](https://nodejs.org/api/) Electron'da kullanılabilir ve üçüncü parti node modülleri de tamamıyla desteklenir ([native modüller ](../tutorial/using-native-node-modules.md) dahil).

Electron ayrıca yerli masaüstü uygulamaları üretiminin geliştirilmesi için ekstra yerleşik modüller de sağlamaktadır. Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in either process type.

Temek kural şudur: eğer modül [GUI][gui] yada düşük-seviyeli bir sistemle alakalı ise, o zaman sadece ana işlemde olmalıdır. You need to be familiar with the concept of [main process vs. renderer process](../tutorial/quick-start.md#main-and-renderer-processes) scripts to be able to use those modules.

Ana işlem betiği normal bir Node.js betiği gibidir:

```javascript
const { app, BrowserWindow } = require('electron')
let win = null

app.whenReady().then(() => {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('https://github.com')
})
```

The renderer process is no different than a normal web page, except for the extra ability to use node modules if `nodeIntegration` is enabled:

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const fs = require('fs')
  console.log(fs.readFileSync(__filename, 'utf8'))
</script>
</body>
</html>
```

Uygulamanızı çalıştırmak için,[Run your app](../tutorial/quick-start.md#run-your-application).

## İmha Görevi

0.37 itibariyle, [destructuring assignment][destructuring-assignment]'ı dahili modülleri kullanmayı kolaylaştırmak için kullanabilirsiniz.

```javascript
const { app, BrowserWindow } = require('electron')

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

`electron` modülünün tamamına ihtiyacınız varsa, bunu isteyebilir ve daha sonra `electron`'den ayrı modüllere erişmek için yapısallaştırmayı kullanabilirsiniz.

```javascript
const electron = require('electron')
const { app, BrowserWindow } = electron

let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

Bu, aşağıdaki koda eşdeğerdir:

```javascript
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let win

app.whenReady().then(() => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

[gui]: https://en.wikipedia.org/wiki/Graphical_user_interface
[destructuring-assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
