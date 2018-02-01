# Güvenlik, Yerli Yetenekler ve Sorumluluklarınız

Web geliştiricileri olarak, genellikle bir web tarayıcısının güvenlik ağının güçlü olması hoşumuza gider; çünkü yazdığımız koda ilişkin riskler nispeten azdır. Web sitelerimiz sizlere sınırlı yetkiler bahşeden sanal bir ortamdır, ve inanıyoruz ki siz kullanıcılarımız yeni keşfedilen güvenlik açıklarına hızlı bir şekilde cevap verebilen büyük bir mühendis takımı tarafından hazırlanan bu siteleri kullanırken zevk duyacaksınız.

Elektron ile çalışırken, Elektronun bir web tarayıcısı olmadığını bilmeniz önemlidir. Tanıdık web teknolojileri ile zengin özelliklere sahip masaüstü uygulamaları oluşturmanıza izin verir, ancak kodunuz daha fazla güç sağlar. JavaScript; dosya sistemine, kullanıcı kabuğuna ve daha fazlasına erişebilir. Bu da sizin yüksek kalitede yerel uygulamalar oluşturabilmenize olanak sağlar, ancak var olan güvenlik riskleri kodunuza eklediğiniz yetkiler doğrultusunda artmaktadır.

Bunu göz önünde bulundurarak, güvenilmeyen kaynaklardan keyfi içeriğin görüntülenmesinin, Electron'un ele alması tasarlanmamış ciddi bir güvenlik riski taşıdığına dikkat edin. Aslında, en popüler Elektron uygulamaları (Atom, Slack, Visual Studio Code vb.) öncelikle yerel içeriği görüntüler (veya güvenilir, düğüm entegrasyonu olmadan uzaktan içeriği güvenli hale getirir) - uygulamanız kodu çevrimiçi bir kaynaktan yürütürse kodun kötü niyetli olmadığından emin olmak sizin sorumluluğunuzdur.

## Güvenlik sorunlarını raporlama

Bir Electron'un güvenlik açığını düzgün bir şekilde açıklamayla ilgili bilgi için, bkz. [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium Güvenlik Sorunları ve Yükseltmeleri

Electron, Chromium'un yeni sürümünü mümkün olan en kısa sürede desteklemeye çalışsa da geliştiriciler, düzinelerce veya hatta yüzlerce dosyanın manuel olarak düzenlenmesini içeren ciddi bir girişim olduğunu farkında olmalıdır. Bugün mevcut kaynaklar ve katkılar göz önüne alındığında, Electron genellikle günler veya haftalarca geride kalan Chromium'un en son sürümünde olmayacak.

We feel that our current system of updating the Chromium component strikes an appropriate balance between the resources we have available and the needs of the majority of applications built on top of the framework. Elektronların üstünde veri üreten insanlardan gelen özel kullanım davaları hakkında daha fazla bilgi almak istiyoruz. Bu çabaları destekleyen çekme talepleri ve katkılar her zaman açığız.

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
* [Override and disable `eval`](#override-and-disable-eval) , which allows strings to be executed as code.
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

When disabling Node.js integration, you can still expose APIs to your website that do consume Node.js modules or features. Preload scripts continue to have access to `require` and other Node.js features, allowing developers to expose a custom API to remotely loaded content.

In the following example preload script, the later loaded website will have access to a `window.readConfig()` method, but no Node.js features.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## Enable Context Isolation for Remote Content

Context isolation is an Electron feature that allows developers to run code in preload scripts and in Electron APIs in a dedicated JavaScript context. In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) to enable this behavior.

### Neden?

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### Nasıl?

```js
// Main process
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
})
```

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

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

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

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://your-page.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your applications security.

### Nasıl?

Electron respects [the `Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) and the respective `<meta>` tag.

The following CSP will allow Electron to execute scripts from the current website and from `apis.mydomain.com`.

```txt
// Bad
Content-Security-Policy: '*'

// Good
Content-Security-Policy: script-src 'self' https://apis.mydomain.com
```

## Override and Disable `eval`

`eval()` is a core JavaScript method that allows the execution of JavaScript from a string. Disabling it disables your app's ability to evaluate JavaScript that is not known in advance.

### Neden?

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, just like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### Nasıl?

```js
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## Do Not Set `allowRunningInsecureContent` to `true`

*Recommendation is Electron's default*

By default, Electron will now allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Neden?

Simply put, loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#only-display-secure-content) for more details.

### Nasıl?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## Do Not Enable Experimental Features

*Recommendation is Electron's default*

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` and `experimentalCanvasFeatures` properties.

### Neden?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Futhermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

### Nasıl?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Good
const mainWindow = new BrowserWindow({})
```

## Do Not Use `blinkFeatures`

*Recommendation is Electron's default*

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `blinkFeatures` property allows developers to enable features that have been disabled by default.

### Neden?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

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
// Good
const mainWindow = new BrowserWindow()
```

## Do Not Disable WebSecurity

*Recommendation is Electron's default*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](browser-window), [`BrowserView`](browser-view), or [`WebView`](web-view)) disables crucial security features.

Do not disable `webSecurity` in production applications.

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
// Good
const mainWindow = new BrowserWindow()
```

```html
<!-- Bad -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## Do Not Use `allowpopups`

*Recommendation is Electron's default*

If you are using [`WebViews`](web-view), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](browser-window) using the `window.open()` method. `WebViews` are otherwise not allowed to create new windows.

### Neden?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](browser-window) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### Nasıl?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](web-view) from the main process and to verify that their webPreferences do not disable security features.

### Neden?

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](web-view) tags.

### Nasıl?

Before a [`<WebView>`](web-view) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of WebViews with possibly insecure options.

```js
app.on('web-contents-created', (event, contents) => {
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
```

Yine, bu liste yalnızca riski en aza indirir, kaldırmaz. Amacınız bir web sitesini görüntülemek ise, tarayıcı daha güvenli bir seçenek olacaktır .