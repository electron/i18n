# Konu Özeti

> Node.js ve Electron API'leri nasıl kullanılır.

Bütün [Node.js'in built-in modülleri](https://nodejs.org/api/) Electron'da kullanılabilir ve üçüncü parti node modülleri de tamamıyla desteklenir ([native modüller ](../tutorial/using-native-node-modules.md) dahil).

Electron ayrıca yerli masaüstü uygulamaları üretiminin geliştirilmesi için ekstra yerleşik modüller de sağlamaktadır. Bazı modüller yalnızca ana süreçte bulunur; bazıları yalnızca işleyici sürecinde (internet sayfası) mevcuttur ve bazıları her iki işlemde de kullanılabilir.

Temek kural şudur: eğer modül [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) yada düşük-seviyeli bir sistemle alakalı ise, o zaman sadece ana işlemde olmalıdır. You need to be familiar with the concept of main process vs. işleyici 1111 betiğini bu modülleri kullanabilmek içindir.</p> 

The main process script is like a normal Node.js script:

```javascript
const {app, BrowserWindow} = require('electron')
let win = null

app.on('ready', () => {
  win = new BrowserWindow({width: 800, height: 600})
  win.loadURL('https://github.com')
})
```

Oluşturma işlemi, düğüm modüllerini kullanmanın ekstra yeteneği haricinde normal bir internet sayfasından farklı değildir:

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const {app} = require('electron').remote
  console.log(app.getVersion())
</script>
</body>
</html>
```

Uygulamanızı çalıştırmak için,[Run your app](../tutorial/first-app.md#running-your-app).

## İmha Görevi

0.37 itibariyle, [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)'ı dahili modülleri kullanmayı kolaylaştırmak için kullanabilirsiniz.

```javascript
const {app, BrowserWindow} = require('electron')

let win

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```

`electron` modülünün tamamına ihtiyacınız varsa, bunu isteyebilir ve daha sonra `electron`'den ayrı modüllere erişmek için yapısallaştırmayı kullanabilirsiniz.

```javascript
const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
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

app.on('ready', () => {
  win = new BrowserWindow()
  win.loadURL('https://github.com')
})
```