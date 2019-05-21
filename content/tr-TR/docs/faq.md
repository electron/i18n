# Electron SSS

## Neden Electron yüklerken sorunla karşılaşıyorum?

`npm install electron` çalıştırılırken, bazı kullanıcılar bazen kurulum hatalarıyla karşılaşmaktadırlar.

Hemen hemen tüm durumlarda bu hatalar, ağ sorunları ve `electron` npm paketi ile ilgili olmayan sorunlar sonucudur. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, ve `ETIMEDOUT` gibi hatalar, ağ bağlantı problemlerinin göstergesidir. 가장 좋은 해결책은 네트워크를 전환하거나, 잠시 기다렸다가 다시 설치하는 것입니다.

Eğer `npm` ile kurulum hataya düşüyorsa, Electron'u doğrudan [electron/electron/releases](https://github.com/electron/electron/releases)' den indirmeyi deneyebilirsiniz.

## Electron ne zaman en son ki Chrome sürümüne yükseltiliyor?

Electron Chrome sürümü genellikle, Chrome'un yeni kararlı sürümü çıktıktan 1 veya 2 hafta sonrasında dahil edilmiş olunuyor. Bu değer tahminidir, garanti edilemez ve yükseltme ile ilgili çalışma miktarına bağlıdır.

Sadece istikrarlı Chrome kanalı kullanılır. Eğer beta veya geliştirme kanalında önemli bir hata düzeltmesi varsa, biz arka bağlantı noktası olacağız.

Daha fazla bilgi için lütfen [güvenlik giriş](tutorial/security.md)'ine bakınız.

## Electron ne zaman en son ki Node.js sürümüne yükseltiliyor?

Node.js'in yeni sürümü yayınlandığında, biz genellikle Electron'u güncellemek için yaklaşık 1 ay bekliyoruz. Bu sayede, yeni Node.js sürümlerinde sıklıkla karşılaşılan hataları önleyebiliyoruz.

Node.js'in yeni özellikleri genellikle V8 yükseltmeleri tarafından getirilir, Electron Chrome tarayıcısı tarafından gönderilen V8'i kullandığı için, parlak yeni JavaScript özelliği olan Yeni Node.js sürümü genellikle zaten Elektron'da mevcuttur.

## Web sayfaları arasında veri paylaşmak nasıl gerçekleştirilir?

Web sayfaları arasında veri paylaşımının (işleyici işlemleri) en kolay yolu, tarayıcılarda zaten mevcut olan HTML5 API'lerini kullanmaktır. [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), ve [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) iyi adaylardır.

Veya ana süreçte nesneleri global bir değişken olarak depolamak için Electron'a özgü IPC sistemini kullanabilirsiniz ve daha sonra bunlara oluşturuculardan `electron` modülünün `uzak` özelliği ile erişmek için:

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

Pencere/tepsi depolamak için kullanılan değişken anlamsız verileri toplamaya başladığında bu gerçekleşir.

Eğer bu problemle karşılaşılırsa, aşağıdaki makaleler yardımcı olabilir:

* [Bellek Yönetimi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Değişken Etki Alanı](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Eğer hızlı çözüm istiyorsanız, değişkenlerinizi evrensel olarak değiştirebilirsiniz. Bu kodu:

```javascript
const { app, Tray } = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('Merhaba dünya')
})
```

buna:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('merhaba dünya')
})
```

## Electron'da jQuery/RequireJS/Meteor/AngularJS kullanamıyorum.

Electron'un Node.js entegrasyonu nedeniyle bazı fazladan semboller `modül`, `dışa aktarır`, `gerektirir` gibi DOM'a eklenir. Bu, bazı kütüphaneler aynı isimlerdeki sembolleri eklemek istedikleri için sorunlara neden olur.

Bunu çözmek için Electron'daki node entegrasyonunu kapatabilirsiniz:

```javascript
// Ana süreç içerisinde.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Ancak, Node.js ve Electron API'lerini kullanma yeteneklerini korumak istiyorsanız, diğer kitaplıkları içermeden önce sayfadaki sembolleri yeniden adlandırmanız gerekir:

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

Electron'un yerleşik modülünü kullanırken böyle bir hatayla karşılaşabilirsiniz:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Yakalanmamış TipHatası: Geçersiz 'setZoomLevel' değeri okunamıyor
```

Bunun nedeni, daha önceden Electron'un yerleşik modülünü geçersiz kılan [npm`electron`modül](https://www.npmjs.com/package/electron)'ünün yerleşik veya global olarak daha önceden yüklemiş olmanızdır.

Doğru yerleşik modülü kullanıp kullanmadığınızı doğrulamak için, ` electron ` modülünün yolunu yazdırabilirsiniz:

```javascript
console.log(require.resolve('electron'))
```

ve sonra aşağıdaki biçimde olup olmadığını kontrol edin:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

Eğer `node_modules/electron/index.js` gibi birşey ise, npm`electron` modülünü ya kaldırmalı ya da yeniden isimlendirmelisiniz.

```sh
npm uninstall electron
npm uninstall -g electron
```

Bununla birlikte, yerleşik modülü kullanıyorsanız ancak yine de bu hatayı alıyorsanız büyük bir ihtimalle modülü yanlış süreç ile kullanıyorsunuzdur. Örneğin ` electron.app ` yalnızca ana süreçte kullanılabilirken, ` electron.webFrame ` yalnızca oluşturucu süreçlerinde kullanılabilir.

## The font looks blurry, what is this and what can i do?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Example:

![subpixel rendering example](images/subpixel-rendering-screenshot.gif)

Sub-pixel anti-aliasing needs a non-transparent background of the layer containing the font glyphs. (See [this issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) for more info).

To achieve this goal, set the background in the constructor for [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you dont see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Notice that just setting the background in the CSS does not have the desired effect.