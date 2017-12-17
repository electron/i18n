# Electron SSS

## Neden Electron yüklerken sorunla karşılaşıyorum?

`npm install electron` çalıştırılırken, bazı kullanıcılar bazen kurulum hatalarıyla karşılaşmaktadırlar.

Hemen hemen tüm durumlarda bu hatalar, ağ sorunları ve `electron` npm paketi ile ilgili olmayan sorunlar sonucudur. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, ve `ETIMEDOUT` gibi hatalar, ağ bağlantı problemlerinin göstergesidir. En iyi çözüm ağ bağlantılarını değiştirmek ya da biraz bekleyip tekrar kurmayı denemektir.

Eğer `npm` ile kurulum hataya düşüyorsa, Electron'u doğrudan [electron/electron/releases](https://github.com/electron/electron/releases)' den indirmeyi deneyebilirsiniz.

## Electron ne zaman en son ki Chrome sürümüne yükseltiliyor?

Electron Chrome sürümü genellikle, Chrome'un yeni kararlı sürümü çıktıktan 1 veya 2 hafta sonrasında dahil edilmiş olunuyor. Bu değer tahminidir, garanti edilemez ve yükseltme ile ilgili çalışma miktarına bağlıdır.

Sadece istikrarlı Chrome kanalı kullanılır. Eğer beta veya geliştirme kanalında önemli bir hata düzeltmesi varsa, biz arka bağlantı noktası olacağız.

Daha fazla bilgi için lütfen [güvenlik giriş](tutorial/security.md)'ine bakınız.

## Electron ne zaman en son ki Node.js sürümüne yükseltiliyor?

Node.js'in yeni sürümü yayınlandığında, biz genellikle Electron'u güncellemek için yaklaşık 1 ay bekliyoruz. Bu sayede, yeni Node.js sürümlerinde sıklıkla karşılaşılan hataları önleyebiliyoruz.

New features of Node.js are usually brought by V8 upgrades, since Electron is using the V8 shipped by Chrome browser, the shiny new JavaScript feature of a new Node.js version is usually already in Electron.

## Web sayfaları arasında veri paylaşmak nasıl gerçekleştirilir?

Web sayfaları arasında veri paylaşımının (işleyici işlemleri) en kolay yolu, tarayıcılarda zaten mevcut olan HTML5 API'lerini kullanmaktır. [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), ve [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) iyi adaylardır.

Or you can use the IPC system, which is specific to Electron, to store objects in the main process as a global variable, and then to access them from the renderers through the `remote` property of `electron` module:

```javascript
// Ana süreç içerisinde.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// Sayfa 1'de.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// Sayfa 2'de.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Uygulamamın penceresi/simge konumundaki kısmı birkaç dakika sonra kayboluyor.

This happens when the variable which is used to store the window/tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

* [Bellek Yönetimi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Değişken Etki Alanı](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

If you want a quick fix, you can make the variables global by changing your code from this:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('Merhaba dünya')
})
```

buna:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('merhaba dünya')
})
```

## Electron'da jQuery/RequireJS/Meteor/AngularJS kullanamıyorum.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

```javascript
// In the main process.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` geçersiz.

When using Electron's built-in module you might encounter an error like this:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```sh
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.