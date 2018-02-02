# Seguridad, Katutubong Kakayahan, at Iyong Responsibilidad

Bilang is tagapag-unlad ng web, kadalasan kami ay nagsasaya sa tibay ng security net ng mga browser - ang panganib na kaakibat ng mga code na aming sinusulat ay maliit lamang. Ang aming mga pook-sapot ay ginawaran lamang ng limitadong kapangyarihan sa sandbox, at kami ay nagtitiwala na ang gumagamit sa aming pook-sapot ay nagsasaya sa mga pook-sapot na ginawa ng aming malaking grupo ng mga enhinyero na may kakayahan na mabilis na tumugon sa mga bagong natutuklasang mga bagay na nakakaipekto sa seguridad.

Kapang nagtatrabaho sa Elektron, importanteng maintindihan na ang Elektron ay hindi pook-sapot. Ito ay nagpapahintulot sa iyo na magtayo ng saganang-tampok na desktop applications na may pamilyar na teknolohiyang web, ngunit ang iyong code ay gumagamit ng mas higit na kakayahan. JavaScript ay pwedeng ma-access ang filesystem, user shell, at iba pa. Ito ay nagpapahintulot sayo na magtayo ng mataas na kalidad na katutubo na mga aplikasyon, ngunit ang antas ng panganib sa seguridad ng karagdagang kapangyarihan na ipinagkaloob sa iyong code.

Nasasaisip iyan, dapat maging alerto sa mga nagpapakitang hindi makatwirang nilalaman sa mga di mapagkakatiwalaang pinanggalingan ay nagmumungkahi ng mahigpit na panganib sa seguridad na ang Elektron ay hindi nilalayon na maghawak. Sa katunayan, ang pinaka-popyular na Electron apps (Atom, Slack, Visual Studio Code, at iba pa) ay pangunahing nagpapakita ng lokal na nilalaman ( o pinagkakatiwalaan, ligtas na nilalaman na walang Node integration)- kung ang iyong aplikasyon ay nagsasagawa ng code na mula sa online, responsibilidad mo na tiyakin na ang code ay hindi malisyoso.

## Naguulat sa mga Isyung Panseguridad

Para sa inpormasyong kung paano ang tamang pagsisiwalat ng kahinaan ng Electron, tingnan ang [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md) 

## Mga Isyung Panseguridad at Upgrades ng Chromium

Habang sinisikap ng Electron na suportahan ang bagong bersyon ng Chromium kaagad, dapat ring may kamalayan ang mga developer na ang pag upgrade isang seryosong gawain - pagkabilang nga doenang edit-kamay o kahit daan-daang files. Napagbigyan ng mapagkukunan at kontribusyon na nandito ngayon, ang Electron ay maaaring wala minsan sa pinakabagong bersyon ng Chromium, nahuli sa pag-lagging ng anuman sa ilang araw o ilang linggo. 

Parang ang aming kasalukuyang sistema ng pag-update ng bahagi sa Chromium ay makakatama ng wastong balanse sa pagitan ng mga mapagkukunan na mayroon at ang kailangan n karamihan sa mga application upang masagawa ang tutok ng framework. Tayo ay tiyak na interesado sa pakikiknig ng higit pa tungkol sa partikular na paggamit ng mga case galing sa mga taong gumagawa ng mga bagay sa tutok ng Electron. Ang pagkuha ng mga request at mga kontribusyon para masuportahan ang effort na ito ay palaging tinatanggap.

## Pag-ignora ng Paaalala na nasa Itaas

Ang isang isyu ay nangyayari tuwing makakatanggap ka ng code galing sa malayo na patutunguhan at ma-execute ito ng lokal. Bilang halimbawa, isaalang-alang ang bahagyang website na ipnapakita sa loob ng [`BrowserWindow`](browser-window). Kung ang isang attacker ay makakabago ng nasabing nilalaman (alinmang aatakehin nito ang direktang nilalaman o sa pamamagitan ng pag-upo sa pagitan ng iyong app at ang aktwal na patutunguhan), kaya nilang mag-execute na natibong code sa machine ng taga gamit.

> :babala: Sa anumang pangyayari ay hindi ka maaaring mag-load at mag-execute ng remote code kasama ng Node.js integrasyong napagana. Sa halip, gamitin lamang ang lokal na mga file (nakabalot kasama ang iyong aplikasyon) para ma-execute ang Node.js na code. Para maipakita ang bahagyang nilalaman, gamiting ang [`webview`](web-view) na tag para makasiguradong hindi gumana ang `nodeIntegration`.

#### Checklist: Security Recommendations

Hindi ito bulletproof: gayunpaman, kailangan kang tumangka sa mga sumusunod:

* [Mag load lamang ng siguradong nilalaman](#only-load-secure-content)
* [Huwang paganahin ang Node.js na integrasyon sa lahat ng mga renderer na maipakita ang bahagyang nilalaman.](#disable-node.js-integration-for-remote-content)
* [Paganahin ang kontekstong pagkakabukod na ipinakita ang bahagyang nilalaman.](#enable-context-isolation-for-remote-content)
* [Gamitin ang `ses.setPermissionRequestHandler()` sa lahat ng mga sesyon na maka-load ang bahagyang nilalaman.](#handle-session-permission-requests-from-remote-content)
* [Huwang i-disable ang `webSecurity`](#do-not-disable-websecurity)
* [Tukuyin ang`Nilalaman-Seguridad-Patakaran`](#define-a-content-security-policy)at gamitin ang mahigpit na panuntunan (halimbawa `script-src 'self'`)
* [I-override at huwag paganahin ang `eval`](#override-and-disable-eval), na nagpapahintulot ng mga string na mag-execute bilang code.
* [Huwag i-set ang `allowRunningInsecureContent` sa `true`](#do-not-set-allowRunningInsecureContent-to-true)
* [Huwag paganahin ang mga experimental na katangian](#do-not-enable-experimental-features)
* [Huwag gamitin ang `blinkFeatures`](#do-not-use-blinkfeatures)
* [WebViews: Huwag gamitin ang `allowpopups`](#do-not-use-allowpopups)
* [WebViews: I-verify ang mga opsyun at mga param sa lahat ng `<webview>`mga tag](#verify-webview-options-before-creation)

## Mag-load Lamang ng Ligtas na Nilalaman

Alinmang mga mapagkukunan na hindi kasama sa iyong aplikasyon ay dapat ma-load gamit ang ligtas na protocol gaya ng `HTTPS`. Sa ibang salita, huwag gumamit ng hindi ligtas na mga protocol gaya ng `HTTP`. Kapareho, inirekomenda namin ang paggamit ng `WSS` higit sa`WS`, `FTPS` higit sa `FTP`, at iba pa.

### Bakit?

Ang `HTTPS` ay mayroong tatlong pangunahing benepisyo:

1) Ito ay nagpapatunay sa bahagyang server, sinisigurado na ang iyong app ay kumukonekta sa tamang host sa halip ng isang manggagaya. 2) Sinisigurado ang integridad ng data, iginigiit na ang data ay hindi binago habang naka-transit sa pagitan ng iyong aplikasyon at ng host. 3) Ine-encrypt ng trapiko sa pagitan ng iyong tagagamit at ang host na patutunguhan, na magiging mas mahirap maka-eavesdrop sa mga impormasyon na ipinadala s apagitan ng iyong app at host.

### Paano?

```js
// Hindi Kaaya-aya
browserWindow.loadURL('http://my-website.com')

// Kaaya-aya
browserWindow.loadURL('https://my-website.com')
```

```html
<!-- Hindi Kaaya-aya -->
<script crossorigin src="http://cdn.com/react.js"></script>
<link rel="stylesheet" href="http://cdn.com/style.css">

<!-- Kaaya-aya -->
<script crossorigin src="https://cdn.com/react.js"></script>
<link rel="stylesheet" href="https://cdn.com/style.css">
```

## Huwag Paganahin ang Node.js integrasyon para sa Bahagyang Nilalaman

Ito ang paramount na hindi mo pinagana ang Node.js integrasyon sa anumang renderer ng ([`BrowserWindow`](browser-window), [`BrowserView`](browser-view), o [`WebView`](web-view)) na mag-load ng bahagyang nilalaman. Ang layunin ay ma-limit ang mga lakas na iginawad sa bahagyang nilalaman, kaya ginawang kapansin-pansin na mas mahirap para sa isang ataker na mapinsala ang gumagamit at magkaroon sila ng kakayahan maka-execute ng JavaScript sa iyong website.

Pagkatapos nito, iginagawad ng karagdagang pahintulot para sa tiyak na mga host. Halimbawa, kung nagbukas ka ng BrowserWindow na tinuturo sa `https://my-website.com/", mabibigyan mo ang website na iyan ng eksaktong kakayahan na kailangan, pero wala na.

### Bakit?

Ang isang cross-site-scripting (XSS) na atake ay mapanganib kung ang ataker ay maaaring tumalon palabas sa proseso ng renderer at mag-execute ng code sa computer ng gumagamit. Ang cross-site-scripting na mga atake ay mainam na karaniwan - at habang ang isyu, ang power ay karaniwang limitado sa messaging ng website na ini-execute. Ang pag-sumalanta ng Node.js na integrasyon ay makakatulong upang pigilan ang XXX na ma-escalate ito sa tinatawag nilang "Remote Code Execution" (RCE) na atake.

### Paano?

```js
// Hindi kaaya-aya
const mainWindow = new BrowserWindow()
mainWindow.loadURL('https://my-website.com')
```

```js
// Kaaya-aya
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    preload: './preload.js'
  }
})
```

```html
<!-- Hindi Kaaya-aya --><webview nodeIntegration src="page.html"></webview>

<! -- Kaaya-aya -->
<webview src="page.html"></webview>
```

Kapag sumalanta ang Node.js na integrasyon, maaari mong ilantad ang mga API sa iyong website na tumupok ng Node.js na mga modyul o mga katangian. Ang preload na mga manuskrito ay patuloy na may akses sa`require` at iba pang Node.js na mga katangian, na nagpapahintulot sa mga developer na ma-expose ang API na pasadya para bahagyang mag-load ang nilalaman.

Sa sumusunod na mga halimbawa ng preload na manuskrito, ang nakaraang nilalaman na website ay magkakaroon ng akses sa `window.readConfig()` na paraan, pero walang Node.js na mga tampok.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## Paganahin ang Kontekstong Pagkakabukod para sa Bahagyang Nilalaman

Context isolation is an Electron feature that allows developers to run code in preload scripts and in Electron APIs in a dedicated JavaScript context. In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) to enable this behavior.

### Bakit?

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### Paano?

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

## Handle Session Permission Requests From Remote Content

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### Bakit?

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### Paano?

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

## Define a Content Security Policy

A Content Security Policy (CSP) is an additional layer of protection against cross-site-scripting attacks and data injection attacks. We recommend that they be enabled by any website you load inside Electron.

### Bakit?

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://your-page.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your applications security.

### Paano?

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

### Bakit?

The `eval()` method has precisely one mission: To evaluate a series of characters as JavaScript and execute it. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, just like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### Paano?

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

### Bakit?

Simply put, loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#only-display-secure-content) for more details.

### Paano?

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

### Bakit?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Futhermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

### Paano?

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

### Bakit?

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### Paano?

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

### Bakit?

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### Paano?

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

### Bakit?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](browser-window) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### Paano?

```html
<!-- Bad -->
<webview allowpopups src="page.html"></webview>

<!-- Good -->
<webview src="page.html"></webview>
```

## Verify WebView Options Before Creation

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`WebViews`](web-view) from the main process and to verify that their webPreferences do not disable security features.

### Bakit?

Since WebViews live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<WebView>`](web-view) tags.

### Paano?

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

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.