# Güvenlik, Yerli Yetenekler ve Sorumlulukların

Web geliştiricileri olarak, genellikle bir web tarayıcısının güvenlik ağının güçlü olması hoşumuza gider; çünkü yazdığımız koda ilişkin riskler nispeten azdır. Web sitelerimiz sizlere sınırlı yetkiler bahşeden sanal bir ortamdır, ve inanıyoruz ki siz kullanıcılarımız yeni keşfedilen güvenlik açıklarına hızlı bir şekilde cevap verebilen büyük bir mühendis takımı tarafından hazırlanan bu siteleri kullanırken zevk duyacaksınız.

Elektron ile çalışırken, Elektronun bir web tarayıcısı olmadığını bilmeniz önemlidir. Tanıdık web teknolojileri ile zengin özelliklere sahip masaüstü uygulamaları oluşturmanıza izin verir, ancak kodunuz daha fazla güç sağlar. JavaScript; dosya sistemine, kullanıcı kabuğuna ve daha fazlasına erişebilir. Bu da sizin yüksek kalitede yerel uygulamalar oluşturabilmenize olanak sağlar, ancak var olan güvenlik riskleri kodunuza eklediğiniz yetkiler doğrultusunda artmaktadır.

Bunu göz önünde bulundurarak, güvenilmeyen kaynaklardan keyfi içeriğin görüntülenmesinin, Electron'un ele alması tasarlanmamış ciddi bir güvenlik riski taşıdığına dikkat edin. Aslında, en popüler Elektron uygulamaları (Atom, Slack, Visual Studio Code vb.) öncelikle yerel içeriği görüntüler (veya güvenilir, düğüm entegrasyonu olmadan uzaktan içeriği güvenli hale getirir) - uygulamanız kodu çevrimiçi bir kaynaktan yürütürse kodun kötü niyetli olmadığından emin olmak sizin sorumluluğunuzdur.

## Güvenlik sorunlarını raporlama

Bir Electron'un güvenlik açığını düzgün bir şekilde açıklamayla ilgili bilgi için, bkz. [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium Güvenlik Sorunları ve Yükseltmeleri

Electron, Chromium'un yeni sürümünü mümkün olan en kısa sürede desteklemeye çalışsa da geliştiriciler, düzinelerce veya hatta yüzlerce dosyanın manuel olarak düzenlenmesini içeren ciddi bir girişim olduğunu farkında olmalıdır. Bugün mevcut kaynaklar ve katkılar göz önüne alındığında, Electron genellikle günler veya haftalarca geride kalan Chromium'un en son sürümünde olmayacak.

Mevcut Chromium özelliklerini güncellediğimiz sistemin bize sağladıklarıyla çerçeve üzerine inşa edilen çoğu uygulamanın ihtiyaçları arasında doğru dengede olduğunu sanıyoruz. Elektronların üstünde veri üreten insanlardan gelen özel kullanım davaları hakkında daha fazla bilgi almak istiyoruz. Bu çabaları destekleyen çekme talepleri ve katkılar her zaman açığız.

## Yukarıdaki önerileri dikkate alma

Uzak bir hedeften kod alıp yerel olarak çalıştırdığınızda bir güvenlik sorunu var demektir. Örneğin, bir[`BrowserWindow`](browser-window) içerisinde gösterilen uzak bir web sitesi düşünün. Bir saldırgan bir şekilde bahsi geçen içeriği değiştirebilirse (kaynağa direkt olarak saldırarak ya da uygulamanız ve gerçek hedef arasına geçerek), kullanıcının cihazındaki yerel kodu çalıştırabilir.

> :warning: Node.js entegrasyonu açıkken hiçbir durumda uzaktan kod yüklemeyin ve çalıştırmayın. Bunun yerine, Node.js kodunu çalıştırmak için sadece yerel dosyaları (uygulamanızla birlikte gelen) kullanın. Uzaktan içeriği görüntülemek için, [`webview`](web-view) etiketini kullanın ve `nodeIntegration` ı etkisiz hale getirdiğinizden emin olun.

#### Yapılacaklar: Güvenlik Önerileri

Bu kusursuz değildir, ancak en azından aşağıdakileri denemelisiniz:

* [Sadece güvenli içeriği yükleyin](#only-load-secure-content)
* [Uzaktan içeriği görüntülemek için Node.js entegrasyonunu bütün işleyicilerde etkisiz hale getirin](#disable-node.js-integration-for-remote-content)
* [Enable context isolation in all renderers that display remote content](#enable-context-isolation-for-remote-content)
* [Uzak içeriği yükleyen tüm oturumlarda `ses.setPermissionRequestHandler()` kullanın](#handle-session-permission-requests-from-remote-content)
* [`webSecurity` i kapatmayın](#do-not-disable-websecurity)
* [Bir `Content-Security-Policy`](#define-a-content-security-policy) belirleyin ve sınırlayıcı kurallar koyun (örneğin `script-src 'self'`)
* [Geçersiz kıl ve devredışı bırak `eval`](#override-and-disable-eval) , dizelerin kod olarak yürütülmesine izin verir.
* [`allowRunningInsecureContent` i `true` a ayarlamayın](#do-not-set-allowRunningInsecureContent-to-true)
* [Deneysel özellikleri aktifleştirmeyin](#do-not-enable-experimental-features)
* [`blinkFeatures` kullanmayın](#do-not-use-blinkfeatures)
* [WebViews:`allowpopups` kullanmayın](#do-not-use-allowpopups)
* [WebViews: Ayarlar ve parametreleri bütün `<webview>` etiketlerde doğrulayın](#verify-webview-options-before-creation)

## Sadece Güvenli İçeriği Yükleyin

Uygulamanıza dahil edilmemiş her kaynak `HTTPS` gibi bir güvenlik protokolü kullanılarak yüklenmelidir. Başka bir deyişle, `HTTP` gibi güvensiz protokoller kullanmayın. Benzer şekilde `WS` yerine `WSS`, `FTP` yerine `FTPS` vb. kullanın.

### Neden?

`HTTPS` nin üç temel yararı vardır:

1) Uzak sunucuyu onaylar, uygulamanızın taklitçiler yerine doğru sunucuya bağlanmasını garantiler. 2) Veri bütünlüğünü sağlar, verinin uygulama ve sunucu arasında geçiş yaparken değişip değişmediğini gösterir. 3) Kullanıcınız ve hedef sunucu arasındaki trafiği kriptolar, uygulamanız ve sunucu arasında gönderilen bilgilere üçüncü kişilerin erişimini zorlaştırır.

### Nasıl?

```js
// Yanlış
browserWindow.loadURL('http://my-website.com')

// Doğru
browserWindow.loadURL('https://my-website.com')
```

```html
<!-- Yanlış -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- Doğru -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## Uzaktan İçeriği Görüntülemek İçin Node.js Entegrasyonunu Bütün İşleyicilerde Etkisiz Hale Getirin

Uzaktan içeriği yükleyen her işleyicide ([`BrowserWindow`](browser-window), [`BrowserView`](browser-view), ya da [`WebView`](web-view)) Node.js entegrasyonunu kapamak çok önemlidir. Burada amaç uzak içeriğe verilen yetkileri sınırlayarak, bir saldırganın sitenizde JavaScript çalıştırabilmesini olabildiğince zor hale getirmektir.

Bundan sonra, belirli sunuculara ek izinler verebilirsiniz. Örneğin, `https://my-website.com/" a yönelen bir BrowserWindow açıyorsanız, web sitesine sadece ihtiyacı olan yetkileri verebilirsiniz.

### Neden?

Eğer saldırgan işleyici işleminden kurtulup kullanıcının bilgisayarındaki kodu çalıştırırsa cross-site-scripting (XSS) saldırısı daha tehlikeli olur. Cross-site-scripting saldırısı oldukça yaygındır - bir sorun olmasına karşın, yetkileri çalıştırıldıkları web sitesine müdahale etmekle sınırlıdır. Node.js entegrasyonunu kapatmak bir XSS'in Remote Code Execution (RCE) adlı saldırıya dönüşmesini engellemeye yardımcı olur.

### Nasıl?

```js
// Bad
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// Good
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<!-- Bad -->
<webview nodeIntegration src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

Node.js entegrasyonunu devre dışı bırakırken, API'ları web sitenize hala gösterebilirsiniz. Node.js modüllerini veya özelliklerini tüketirler. Önceden yüklenmiş komut dosyalarına erişmeye devam etmek için `require` ve diğer Node.js özellikleri, geliştiricilerin bir özel Uzaktan içerik yüklemeleri için API.

Aşağıdaki örnek önyükleme komutunda, daha sonra yüklenen web sitesi, ` window.readConfig () </ 0> yöntemine erişebilir, ancak Node.js özelliği yoktur.</p>

<pre><code class="js">const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
`</pre> 

## Uzak İçerik için Bağlam İzolasyonunu Etkinleştirmek

Bağlam izolasyonu, geliştiricilerin önceden yüklenmiş komut dosyalarında ve Electron API'lerinde özel bir JavaScript bağlamında kod çalıştırmasına olanak sağlayan bir Elektron özelliğidir. Pratikte, `Array.prototype.push` veya `JSON.parse` gibi genel nesnelerin, oluşturucu işleminde çalışan komutlarla değiştirilemediği anlamına gelir.

Elektron, Chromium'un Bu davranışı etkinleştirmek için. İçerik Komut Dosyaları </ 0> ile aynı teknolojiyi kullanıyor </p> 

### Neden?

Bağlam izolasyonu, işleyicide çalışan komut dosyalarının her birinin Electron API'deki komut dosyaları veya önyükleme komut dosyası ile çakıştığından endişelenmeden JavaScript ortamında değişiklikler yapar.

Bağlamsal izolasyon hala deneysel bir Elektron iken, ek güvenlik katmanı Elektron için yeni bir JavaScript dünyası yaratıyor API'ler ve önyükleme komut dosyaları.

Aynı zamanda, önyükleme komut dosyaları hala ` belgesine </ 0> erişebilir ve
<code> pencere </ 0> nesneleri. Başka bir deyişle, büyük olasılıkla çok küçük bir yatırımla iyi bir getiri elde edersiniz.</p>

<h3>Nasıl?</h3>

<pre><code class="js">// Main process
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
})
`</pre> 

```js
// Preload script

// Set a variable in the page before it loads
webFrame.executeJavaScript('window.foo = "foo";')

// The loaded page will not be able to access this, it is only available
// in this context
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // Will log out 'undefined' since window.foo is only available in the main
  // context
  console.log(window.foo)

  // Will log out 'bar' since window.bar is available in this context
  console.log(window.bar)
})
```

## Uzaktan İçeriklerde Oturum İzni İstemlerini Düzenleyin

Chrome kullanırken izin istemlerini görmüş olabilirsiniz: Bir web sitesi bir özelliği kullanmak istediğinde kullanıcının onaylaması için ortaya çıkarlar (bildirimlere benzer).

API,  Chromium izinleri API'sı </ 0> 'na dayanmaktadır ve aynı izin türlerini uygular.</p> 

### Neden?

Bir geliştirici manuel bir düzenleme yapmadığı takdirde Electron varsayılan olarak bütün izin istemlerini otomatik olarak onaylayacaktır. Varsayılan bu iken, güvenliğe önem veren geliştiriciler bunun tam tersini isteyebilir.

### Nasıl?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()

    if (permission === 'notifications') {
      // Approves the permissions request
      callback(true)
    }

    if (!url.startsWith('https://my-website.com')) {
      // Denies the permissions request
      return callback(false)
    }
  })
```

## Bir İçerik Güvenliği İlkesi Belirleyin

İçerik Güvenliği İlkesi (Content Security Policy, CSP) cross-site-scripting ve veri aşılama saldırılarına karşı koruyucu bir katmandır. Electron'a yüklediğiniz her sitede bulunmasını tavsiye ederiz.

### Neden?

CSP, sunum yapan sunucuya kaynakların kısıtlanmasına ve kontrol edilmesine izin verir. Verilen web sayfası için elektron yüklenebilir. `https://your-page.com` kaynak kodlu senaryoları tanımladığın kaynaklardan yüklemesine izin ver `https://evil.attacker.com` çalıştırılmasına izin verilmemelidir. CSP tanımlamak, uygulamalarınızın güvenliğini artırmanın kolay bir yolu.

### Nasıl?

` Content-Security-Policy </ 1> HTTP başlığına <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy"> elektronik saygı duyar </ 0>
ve ilgili <code><meta>` etiketini içerir.

Aşağıdaki CSP, Electron'un şu andaki komut dosyalarını web sitesinden ve ` apis.mydomain.com </ 0> adresinden.</p>

<pre><code class="txt">// Yanlış
Content-Security-Policy: '*'

// Doğru
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
`</pre> 

## Geçersiz kıl ve Devre Dışı Bırak `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### Neden?

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. Bu ne zaman zorunlu bir yöntemdir önceden bilinmeyen kodu değerlendirmeliyiz. While legitimate use cases exist, just like any other code generators, `eval()` is difficult to harden.

Genel olarak, `` eval () </ 0> işlevini tamamen devre dışı bırakmaktan daha kolaydır. Böylece, buna ihtiyacınız yoksa, devre dışı bırakmak iyi bir fikirdir.</p>

<h3>Nasıl?</h3>

<pre><code class="js">// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
``</pre> 

## `allowRunningInsecureContent` i `true` a Ayarlamayın

*Tavsiye edilen ayar Electron'da varsayılandır*

Electron varsayılan olarak, `HTTPS` üzerinden yüklenen websitelerine güvenliksiz kaynaklardan (`HTTP`) gelen betikler, CSS veya eklentileri yüklemeye izin verir. `allowRunningInsecureContent` i `true` a ayarlamak bu korumayı engeller.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Neden?

Basitçe açıklayacak olursak, `HTTPS` üzerinden içerik yüklemek veri trafiğini şifreleyerek, yüklenen kaynakların güvenilirliğini ve bütünlüğünü sağlar. Detaylı bilgi için [Sadece güvenli içeriği yükleyin](#only-display-secure-content) bölümüne bakabilirsiniz.

### Nasıl?

```js
// Yanlış
const mainWindow = new BrowserWindow({
 webPreferences: {
  allowRunningInsecureContent: true
 }
})
```

```js
// Doğru
const mainWindow = new BrowserWindow ({})
```

## Deneysel Özellikleri Aktifleştirmeyin

*Tavsiye edilen ayar Electron'da varsayılandır*

Deneyimli kullanıcılar deneysel Chromium özelliklerini `experimentalFeatures` be `experimentalCanvasFeatures` kullanarak aktifleştirebilir.

### Neden?

Deneysel özellikler adı üzerinde deneyseldirler ve bütün Chromium kullanıcılarında açık değildirler. Dahası, bunların Electon üzerindeki etkileri bütün olarak test edilmemiştir.

Geçerli kullanım senaryoları mevcut olmakla birlikte ne yaptığınızdan emin değilseniz bu özelliği açmanız önerilmez.

### Nasıl?

```js
// Yanlış
const mainWindow = new BrowserWindow({
 webPreferences: {
  experimentalFeatures: true
 }
})
```

```js
// Doğru
const mainWindow = new BrowserWindow ({})
```

## `blinkFeatures` Kullanmayın

*Tavsiye edilen ayar Electron'da varsayılandır*

Blink Chromium'un işleyici motorunun isminden gelir. `experimentalFeatures` da olduğu gibi `blinkFeatures` özelliği de geliştiricilere varsayılan olarak kapalı olan bazı özellikleri açar.

### Neden?

Genel olarak, bir özellik varsayılan olarak açık değilse ardıında bazı sebepler vardır. Belirli özelliklerin geçerli kullanım senaryoları mecvuttur. Bir geliştirici olarak, bir özelliği neden açmanız gerektiğini, sonuçlarını ve bunların uygulamanızın güvenliğini nasıl etkilediğinizi tam olarak bilmeniz gerekmektedir. Bu özellikleri keyfi bir şekilde kesinlikle açmamalısınız.

### Nasıl?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    blinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Doğru 
const mainWindow = new BrowserWindow()
```

## Do Not Disable WebSecurity

*Tavsiye edilen ayar Electron'da varsayılandır*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](browser-window), [`BrowserView`](browser-view), or [`WebView`](web-view)) disables crucial security features.

Üretim uygulamalarında `webSecurity` 'yi etkisiz hale getirmeyin.

### Neden?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### Nasıl?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Doğru 
const mainWindow = new BrowserWindow()
```

```html
<!-- Bad -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## ` allowpopups'u Kullanmayın </ 0>
</h2>

<p><em>Tavsiye edilen ayar Electron'da varsayılandır</em></p>

<p>
<a href="web-view"><code> WebViews </ 0> kullanıyorsanız, sayfalara ve komut dizelerine
yeni pencereleri açmak için <code><webview>` gereklidir. ` allowpopups </ 0> özniteliği
kullanarak yeni <a href="browser-window"><code> BrowserWindows </ 1> oluşturmalarına olanak tanır
<code> window.open () </ 0>  <code> WebViews </ 0> 'e, aksi takdirde yeni
pencereler.</p>

<h3>Neden?</h3>

<p>op-up'a ihtiyacınız yoksa, dosyanın oluşturulmasına izin vermeyin.
varsayılan olarak yeni <a href="browser-window"><code> BrowserWindows </ 0>. This follows the principle
of minimally required access: Don't let a website create new popups unless
you know it needs that feature.</p>

<h3>Nasıl?</h3>

<pre><code class="html"><!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
`</pre> 

## Bitirmeden Önce WebView Ayarlarını Doğrulayın

Node.js entegrasyonuna sahip olmayan bir oluşturucu işleminde oluşturulan bir WebView etkinleştirildiğinde entegrasyonu etkinleştirmeyecektir. Bununla birlikte, bir WebView kendi ` webPreferences </ 0> ile her zaman bağımsız bir oluşturucu işlemi oluşturun.</p>

<p>
Yeni <a href="web-view"><code> WebViews </ 0> 'in oluşturulmasını kontrol etmek iyi bir fikirdir.
Ana İşlem ve webPreferences'ın devre dışı bırakılmadığını doğrulama
güvenlik özellikleri.</p>

<h3>Neden?</h3>

<p>
WebViews, DOM'da yaşadığından, bunlar üzerinde çalışan bir komut dosyası ile oluşturulabilirler.
Node.js entegrasyonu aksi halde devre dışı bırakılmış olsa bile.</p>

<p>
Elektron, geliştiricilerin çeşitli güvenlik özelliklerini devre dışı bırakmasını sağlar.
bir oluşturucu işlemi. Çoğu durumda, geliştiricilerin hiçbirini devre dışı bırakmaları gerekmez.
bu özellikler - ve dolayısıyla farklı yapılandırmalara izin vermemelisiniz
yeni oluşturulan <a href="web-view"><code><WebView>`</a> etiketleri için.

### Nasıl?

Bir [`<WebView>`](web-view) etiketinin eklenmesinden önce, Elektron, ` web içeriği barındırma </ 1> 'nda will-attach-webview </ 1> etkinliği. Etkinliği,
muhtemelen güvensiz seçeneklerle WebViews oluşturulmasını engelleyin.</p>

<pre><code class="js">app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
`</pre> 

Yine, bu liste yalnızca riski en aza indirir, kaldırmaz. Amacınız bir web sitesini görüntülemek ise, tarayıcı daha güvenli bir seçenek olacaktır .