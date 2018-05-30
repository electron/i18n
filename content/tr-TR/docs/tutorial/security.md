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

Uzak bir hedeften kod alıp yerel olarak çalıştırdığınızda bir güvenlik sorunu var demektir. Örneğin, bir[`BrowserWindow`](../api/browser-window.md) içerisinde gösterilen uzak bir web sitesi düşünün. Bir saldırgan bir şekilde bahsi geçen içeriği değiştirebilirse (kaynağa direkt olarak saldırarak ya da uygulamanız ve gerçek hedef arasına geçerek), kullanıcının cihazındaki yerel kodu çalıştırabilir.

> :warning: Node.js entegrasyonu açıkken hiçbir durumda uzaktan kod yüklemeyin ve çalıştırmayın. Bunun yerine, Node.js kodunu çalıştırmak için sadece yerel dosyaları (uygulamanızla birlikte gelen) kullanın. Uzaktan içeriği görüntülemek için, [`webview`](../api/web-view.md) etiketini kullanın ve `nodeIntegration` ı etkisiz hale getirdiğinizden emin olun.

## Electron Security Warnings

From Electron 2.0 on, developers will see warnings and recommendations printed to the developer console. They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.

You can force-enable or force-disable these warnings by setting `ELECTRON_ENABLE_SECURITY_WARNINGS` or `ELECTRON_DISABLE_SECURITY_WARNINGS` on either `process.env` or the `window` object.

## Yapılacaklar: Güvenlik Önerileri

This is not bulletproof, but at the least, you should follow these steps to improve the security of your application.

1. [Sadece güvenli içeriği yükleyin](#1-only-load-secure-content)
2. [Uzaktan içeriği görüntülemek için Node.js entegrasyonunu bütün işleyicilerde etkisiz hale getirin](#2-disable-nodejs-integration-for-remote-content)
3. [Enable context isolation in all renderers that display remote content](#3-enable-context-isolation-for-remote-content)
4. [Uzak içeriği yükleyen tüm oturumlarda `ses.setPermissionRequestHandler()` kullanın](#4-handle-session-permission-requests-from-remote-content)
5. [`webSecurity` i kapatmayın](#5-do-not-disable-websecurity)
6. [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7. [Geçersiz kıl ve devredışı bırak `eval`](#7-override-and-disable-eval), dizelerin kod olarak yürütülmesine izin verir.
8. [`allowRunningInsecureContent` i `true` a ayarlamayın](#8-do-not-set-allowrunninginsecurecontent-to-true)
9. [Deneysel özellikleri aktifleştirmeyin](#9-do-not-enable-experimental-features)
10. [Do not use `enableBlinkFeatures`](#10-do-not-use-enableblinkfeatures)
11. [WebViews:`allowpopups` kullanmayın](#11-do-not-use-allowpopups)
12. [WebViews: Ayarlar ve parametreleri bütün `<webview>` etiketlerde doğrulayın](#12-verify-webview-options-before-creation)

## 1) Sadece Güvenli İçeriği Yükleyin

Uygulamanıza dahil edilmemiş her kaynak `HTTPS` gibi bir güvenlik protokolü kullanılarak yüklenmelidir. Başka bir deyişle, `HTTP` gibi güvensiz protokoller kullanmayın. Similarly, we recommend the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

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

## 2) Disable Node.js Integration for Remote Content

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) that loads remote content. Burada amaç uzak içeriğe verilen yetkileri sınırlayarak, bir saldırganın sitenizde JavaScript çalıştırabilmesini olabildiğince zor hale getirmektir.

Bundan sonra, belirli sunuculara ek izinler verebilirsiniz. Örneğin, `https://my-website.com/" a yönelen bir BrowserWindow açıyorsanız, web sitesine sadece ihtiyacı olan yetkileri verebilirsiniz.

### Neden?

Eğer saldırgan işleyici işleminden kurtulup kullanıcının bilgisayarındaki kodu çalıştırırsa cross-site-scripting (XSS) saldırısı daha tehlikeli olur. Cross-site-scripting saldırısı oldukça yaygındır - bir sorun olmasına karşın, yetkileri çalıştırıldıkları web sitesine müdahale etmekle sınırlıdır. Node.js entegrasyonunu kapatmak bir XSS'in Remote Code Execution (RCE) adlı saldırıya dönüşmesini engellemeye yardımcı olur.

### Nasıl?

```js
// Kötü
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// İyi
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})

mainWindow.loadURL('https://my-website.com')
```

```html
<!-- İyi-->
<webview nodeIntegration src="page.html"></webview>

<!-- Kötü-->
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

## 3) Enable Context Isolation for Remote Content

Bağlam izolasyonu, geliştiricilerin önceden yüklenmiş komut dosyalarında ve Electron API'lerinde özel bir JavaScript bağlamında kod çalıştırmasına olanak sağlayan bir Elektron özelliğidir. Pratikte, `Array.prototype.push` veya `JSON.parse` gibi genel nesnelerin, oluşturucu işleminde çalışan komutlarla değiştirilemediği anlamına gelir.

Elektron, Chromium'un Bu davranışı etkinleştirmek için. İçerik Komut Dosyaları </ 0> ile aynı teknolojiyi kullanıyor </p> 

### Neden?

Bağlam izolasyonu, işleyicide çalışan komut dosyalarının her birinin Electron API'deki komut dosyaları veya önyükleme komut dosyası ile çakıştığından endişelenmeden JavaScript ortamında değişiklikler yapar.

Bağlamsal izolasyon hala deneysel bir Elektron iken, ek güvenlik katmanı Elektron için yeni bir JavaScript dünyası yaratıyor API'ler ve önyükleme komut dosyaları.

Aynı zamanda, önyükleme komut dosyaları hala ` belgesine </ 0> erişebilir ve
<code> pencere </ 0> nesneleri. Başka bir deyişle, büyük olasılıkla çok küçük bir yatırımla iyi bir getiri elde edersiniz.</p>

<h3>Nasıl?</h3>

<pre><code class="js">// Ana süreç
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

## 4) Handle Session Permission Requests From Remote Content

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

## 5) Do Not Disable WebSecurity

*Tavsiye edilen ayar Electron'da varsayılandır*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) disables crucial security features.

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
<!-- İyi-->
<webview disablewebsecurity src="page.html"></webview>

<!-- Kötü-->
<webview src="page.html"></webview>
```

## 6) Define a Content Security Policy

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

## 7) Override and Disable `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### Neden?

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. Bu ne zaman zorunlu bir yöntemdir önceden bilinmeyen kodu değerlendirmeliyiz. While legitimate use cases exist, like any other code generators, `eval()` is difficult to harden.

Genel olarak, `` eval () </ 0> işlevini tamamen devre dışı bırakmaktan daha kolaydır. Böylece, buna ihtiyacınız yoksa, devre dışı bırakmak iyi bir fikirdir.</p>

<h3>Nasıl?</h3>

<pre><code class="js">// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
``</pre> 

## 8) Do Not Set `allowRunningInsecureContent` to `true`

*Tavsiye edilen ayar Electron'da varsayılandır*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). `allowRunningInsecureContent` i `true` a ayarlamak bu korumayı engeller.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Neden?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. Detaylı bilgi için [Sadece güvenli içeriği yükleyin](#1-only-load-secure-content) bölümüne bakabilirsiniz.

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

## 9) Do Not Enable Experimental Features

*Tavsiye edilen ayar Electron'da varsayılandır*

Deneyimli kullanıcılar deneysel Chromium özelliklerini `experimentalFeatures` be `experimentalCanvasFeatures` kullanarak aktifleştirebilir.

### Neden?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

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

## 10) Do Not Use `enableBlinkFeatures`

*Tavsiye edilen ayar Electron'da varsayılandır*

Blink Chromium'un işleyici motorunun isminden gelir. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### Neden?

Genel olarak, bir özellik varsayılan olarak açık değilse ardıında bazı sebepler vardır. Belirli özelliklerin geçerli kullanım senaryoları mecvuttur. Bir geliştirici olarak, bir özelliği neden açmanız gerektiğini, sonuçlarını ve bunların uygulamanızın güvenliğini nasıl etkilediğinizi tam olarak bilmeniz gerekmektedir. Bu özellikleri keyfi bir şekilde kesinlikle açmamalısınız.

### Nasıl?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Doğru 
const mainWindow = new BrowserWindow()
```

## 11) Do Not Use `allowpopups`

*Tavsiye edilen ayar Electron'da varsayılandır*

` WebViews </ 0> kullanıyorsanız, sayfalara ve komut dizelerine
yeni pencereleri açmak için <code><webview>` gereklidir. ` allowpopups </ 0> özniteliği
kullanarak yeni <a href="../api/browser-window.md"><code> BrowserWindows </ 1> oluşturmalarına olanak tanır
<code> window.open () </ 0>  <code> WebViews </ 0> 'e, aksi takdirde yeni
pencereler.</p>

<h3>Neden?</h3>

<p>op-up'a ihtiyacınız yoksa, dosyanın oluşturulmasına izin vermeyin.
varsayılan olarak yeni <a href="../api/browser-window.md"><code> BrowserWindows </ 0>. This follows the principle
of minimally required access: Don't let a website create new popups unless
you know it needs that feature.</p>

<h3>Nasıl?</h3>

<pre><code class="html"><!-- İyi-->
<webview allowpopups src="page.html"></webview>

<!-- Kötü-->
<webview src="page.html"></webview>
`</pre> 

## 12) Verify WebView Options Before Creation

Node.js entegrasyonuna sahip olmayan bir oluşturucu işleminde oluşturulan bir WebView etkinleştirildiğinde entegrasyonu etkinleştirmeyecektir. Bununla birlikte, bir WebView kendi ` webPreferences </ 0> ile her zaman bağımsız bir oluşturucu işlemi oluşturun.</p>

<p>
Yeni <a href="../api/web-view.md"><code> WebViews </ 0> 'in oluşturulmasını kontrol etmek iyi bir fikirdir.
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
yeni oluşturulan <a href="../api/web-view.md"><code><WebView>`</a> etiketleri için.

### Nasıl?

Bir [`<WebView>`](../api/web-view.md) etiketinin eklenmesinden önce, Elektron, ` web içeriği barındırma </ 1> 'nda will-attach-webview </ 1> etkinliği. Etkinliği,
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