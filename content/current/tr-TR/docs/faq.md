# FAQ Electron

## Neden Electron yüklerken sorunla karşılaşıyorum?

`npm yükle electron` bazen çalıştırılırken bazı kullanıcılar hatayla karşılaşmaktadırlar.

Genelde bütün durumlarda bu hatalar, ağ sorunları ve `electron` npm paketi ile ilişkili olmayan hatalar sonucudur. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, ve `ETIMEDOUT` gibi hatalar, ağ bağıntı hatalarının belirtisidir. 가장 좋은 해결책은 네트워크를 전환하거나, 잠시 기다렸다가 다시 설치하는 것입니다.

Eğer `npm` ile yükleme başarısız oluyorsa, Electron'u doğrudan [electron/electron/releases](https://github.com/electron/electron/releases) ' den indirebilirsiniz.

## Electron ne zaman en son ki Chrome sürümüne yükseltiliyor?

Electron Chrome sürümü genellikle, Chrome'un yeni kararlı sürümü çıktıktan 1 veya 2 hafta sonrasında dahil edilmiş olunuyor. Bu değer tahminidir, garanti edilemez ve yükseltme ile ilgili çalışma miktarına bağlıdır.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

Daha fazla bilgi için lütfen [güvenlik giriş](tutorial/security.md)'ine bakınız.

## Electron ne zaman en son ki Node.js sürümüne yükseltiliyor?

Node.js'in yeni sürümü yayınlandığında, biz genellikle Electron'u güncellemek için yaklaşık 1 ay bekliyoruz. Bu sayede, yeni Node.js sürümlerinde sıklıkla karşılaşılan hataları önleyebiliyoruz.

Node.js'in yeni özellikleri genellikle V8 yükseltmeleri tarafından getirilir, Electron Chrome tarayıcısı tarafından gönderilen V8'i kullandığı için, parlak yeni JavaScript özelliği olan Yeni Node.js sürümü genellikle zaten Elektron'da mevcuttur.

## Web sayfaları arasında veri paylaşmak nasıl gerçekleştirilir?

Web sayfaları arasında veri paylaşımının (işleyici işlemleri) en kolay yolu, tarayıcılarda zaten mevcut olan HTML5 API'lerini kullanmaktır. [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), ve [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) iyi adaylardır.

Veya ana süreçte nesneleri global bir değişken olarak depolamak için Electron'a özgü IPC sistemini kullanabilirsiniz ve daha sonra bunlara oluşturuculardan `electron` modülünün `uzak` özelliği ile erişmek için:

```javascript
// Ana süreçte.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Uygulamamın simgesi birkaç dakika sonra kayboluyor.

Simge/tray depolamak için kullanılan değişken, anlamsız verileri toplamaya başladığında bu gerçekleşir.

Eğer bu problemle karşılaşılırsa, aşağıdaki makaleler yardımcı olabilir:

* [Bellek Yönetimi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Değişken Etki Alanı](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Eğer hızlı çözüm istiyorsanız, değişkenlerinizi evrensel olarak değiştirebilirsiniz. Bu kodu:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/dosya/yolu/ikon.png')
  tray.setTitle('Merhaba Dünya')
})
```

buna:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/dosya/yolu/ikon.png')
  tray.setTitle('Merhaba Dünya')
})
```

## Electron'da jQuery/RequireJS/Meteor/AngularJS kullanamıyorum.

Electron'un Node.js entegrasyonu nedeniyle bazı fazladan semboller `modül`, `dışa aktarır`, `gerektirir` gibi DOM'a eklenir. Bu, bazı kütüphaneler aynı isimlerdeki sembolleri eklemek istedikleri için sorunlara neden olur.

Bunu çözmek için Electron'daki node entegrasyonunu kapatabilirsiniz:

```javascript
// Ana süreçte.
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

Büyük ihtimalle modülü yanlış proseste kullanıyorsunuz. Örneğin ` electron.app ` yalnızca ana süreçte kullanılabilirken, ` electron.webFrame ` yalnızca oluşturucu süreçlerinde kullanılabilir.

## Yazı tipi bulanık görünüyor, bu nedir ve ne yapabilirim?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Örneğin:

![alt piksel oluşturma örneği](images/subpixel-rendering-screenshot.gif)

Alt piksel kenar yumuşatma için font gliflerini içeren katmanın saydam olmayan bir arka planına ihtiyacı vardır. (Daha fazla bilgi için [ bu konu'yu ](https://github.com/electron/electron/issues/6344#issuecomment-420371918) gör).

Bu başarabilmek için [BrowserWindow](api/browser-window.md) oluşturucusun arka planı ayarlayın:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Sadece CSS arka plan ayarının, istenen etkiye sahip olmadığını unutmayın.
