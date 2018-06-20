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

Ang isang isyu ay nangyayari tuwing makakatanggap ka ng code galing sa malayo na patutunguhan at ma-execute ito ng lokal. Bilang halimbawa, isaalang-alang ang bahagyang website na ipnapakita sa loob ng [`BrowserWindow`](../api/browser-window.md). Kung ang isang attacker ay makakabago ng nasabing nilalaman (alinmang aatakehin nito ang direktang nilalaman o sa pamamagitan ng pag-upo sa pagitan ng iyong app at ang aktwal na patutunguhan), kaya nilang mag-execute na natibong code sa machine ng taga gamit.

> :babala: Sa anumang pangyayari ay hindi ka maaaring mag-load at mag-execute ng remote code kasama ng Node.js integrasyong napagana. Sa halip, gamitin lamang ang lokal na mga file (nakabalot kasama ang iyong aplikasyon) para ma-execute ang Node.js na code. Para maipakita ang bahagyang nilalaman, gamiting ang [`webview`](../api/web-view.md) na tag para makasiguradong hindi gumana ang `nodeIntegration`.

## Babala sa seguridad ng Electron

From Electron 2.0 on, developers will see warnings and recommendations printed to the developer console. They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.

You can force-enable or force-disable these warnings by setting `ELECTRON_ENABLE_SECURITY_WARNINGS` or `ELECTRON_DISABLE_SECURITY_WARNINGS` on either `process.env` or the `window` object.

## Checklist: Security Recommendations

This is not bulletproof, but at the least, you should follow these steps to improve the security of your application.

1. [Mag load lamang ng siguradong nilalaman](#1-only-load-secure-content)
2. [Huwang paganahin ang Node.js na integrasyon sa lahat ng mga renderer na maipakita ang bahagyang nilalaman.](#2-disable-nodejs-integration-for-remote-content)
3. [Paganahin ang kontekstong pagkakabukod na ipinakita ang bahagyang nilalaman.](#3-enable-context-isolation-for-remote-content)
4. [Gamitin ang `ses.setPermissionRequestHandler()` sa lahat ng mga sesyon na maka-load ang bahagyang nilalaman.](#4-handle-session-permission-requests-from-remote-content)
5. [Huwang i-disable ang `webSecurity`](#5-do-not-disable-websecurity)
6. [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7. [Override and disable `eval`](#7-override-and-disable-eval), which allows strings to be executed as code.
8. [Huwag i-set ang `allowRunningInsecureContent` sa `true`](#8-do-not-set-allowrunninginsecurecontent-to-true)
9. [Huwag paganahin ang mga experimental na katangian](#9-do-not-enable-experimental-features)
10. [Do not use `enableBlinkFeatures`](#10-do-not-use-enableblinkfeatures)
11. [WebViews: Huwag gamitin ang `allowpopups`](#11-do-not-use-allowpopups)
12. [WebViews: I-verify ang mga opsyun at mga param sa lahat ng `<webview>`mga tag](#12-verify-webview-options-before-creation)

## 1) Only Load Secure Content

Alinmang mga mapagkukunan na hindi kasama sa iyong aplikasyon ay dapat ma-load gamit ang ligtas na protocol gaya ng `HTTPS`. Sa ibang salita, huwag gumamit ng hindi ligtas na mga protocol gaya ng `HTTP`. Similarly, we recommend the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

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

## 2) Disable Node.js Integration for Remote Content

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) that loads remote content. Ang layunin ay ma-limit ang mga lakas na iginawad sa bahagyang nilalaman, kaya ginawang kapansin-pansin na mas mahirap para sa isang ataker na mapinsala ang gumagamit at magkaroon sila ng kakayahan maka-execute ng JavaScript sa iyong website.

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

## 3) Enable Context Isolation for Remote Content

Ang kontekstong pagbubukod ay isang Electron na tampok na nagpapahintulot sa mga developer na magpatakbo ng code sa preload na mga manuskrito at mga API ng Electron sa dedikadong JavaScript na conteksto. Sa pagsasanay, ibig sabihin nito ay ang pandaigdigang mga bagay gaya ng `Array.prototype.push` o `JSON.parse` ay hindi na maaaring baguhin ng mga manuskritong pinatakbo sa proseso ng renderer.

Gumagamit ang Electron ng parehong teknolohiya sa Chromium na [Mga Manuskritong Nilalaman](https://developer.chrome.com/extensions/content_scripts#execution-environment) para paganahin ang kilos.

### Bakit?

Ang kontekstong pagbubukod ay nagpapahintulot ang bawat isa sa mga manuskrito sa renderer na gumawa ng mga pagbabago sa JavaScript environment nang hindi nababahala tungkol sa hindi tugmang manuskrito ng Electron API o preload na manuskrito.

Habang experimantal pa rin ang tampok ng Electron, dinadagdagan ng kontekstong pagbubukod ang adisyunal layer ng seguridad. Lumulikha ng panibagong mundo ng JavaScript ang Electron na mga API at preload na mga manuskrito.

Sa parehong oras, ang preload na mga manuskrito ay mayroon pa ring akses sa `dokumento` at`window` na mga bagay. Sa ibang salita, nakakakuha ka ng desenteng tubo sa malamang maliit na pamumuhunan.

### Paano?

```js
// Pangunahing proseso
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true,
    preload: 'preload.js'
  }
})
```

```js
// Preload ng manuskrito

// I-set ang variable sa pahina bago mag-load
webFrame.executeJavaScript('window.foo = "foo";')

// Ang na-load na pahina ay hindi maaaring maka-akses nito. Ito ay magagamit lamang 
// sa kontekstong
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
  // Will log out 'undefined' since window.foo is only available in the main
  // konteksto
  console.log(window.foo)

  // Ini-logout ang 'bar' dahil ang window.bar ay maaari sa kontekstong ito
  console.log(window.bar)
})
```

## 4) Handle Session Permission Requests From Remote Content

Maaaring nakita mo na ang pahintulot ng kahilingan habang gumagamit ng Chrome: Ito ay nagpa-popup sa tuwing ang website ay magtatangkang gumamit ng tampok na mayrron ang gumagamit para mano-manong aprubahan (gaya ng mga abiso)

Ang API ay base sa [Chromium na mga permiso sa API](https://developer.chrome.com/extensions/permissions)at nagpapatupad ng parehong uri ng mga permiso.

### Bakit?

Sa pamamagitan ng default, ang Electron ay awtomatikong nagpahintulot sa lahat ng mga kahilingan ng permiso maliban kung ang developer ay mano-manong nag-configure ng nakaugaliang handler. Habang ang matibay na default, ang partikular sa seguridad na mga developer ay maaaring mag-akala ng kabuuang kabaliktaran.

### Paano?

```js
const { sesyon } = kailangan('electron')

sesyon
  .fromPartition('some-partition')
  .setPermissionRequestHandler((webContents, permiso, callback) => {
    const url = webContents.getURL()

    kung ang (permiso === 'notifications') {
      // Apbruhan ang kahilingan ng permiso
      mag-callback(true)
    }

    kung ang (!url.startsWith('https://my-website.com')) {
      // Tanggihan ang kahilingan ng permiso
      bumalik sa pag-callback(mali)
    }
  })
```

## 5) Do Not Disable WebSecurity

*Ang rekomendasyon ay default ng Electron*

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](../api/browser-window.md), [`BrowserView`](../api/browser-view.md), or [`WebView`](../api/web-view.md)) disables crucial security features.

Huwag paganahin ang `webSecurity` sa mga application ng produksyon.

### Bakit?

Ang disable `webSecurity` ay hindi paganahin ang patakaran ng parehong pinanggalingan at itatakda `allowRunningInsecureContent` ang ari-arian sa `true`. Sa madaling salita, pinapayagan nito ang pagpapatupad ng hindi secure na code mula sa iba't ibang mga domain.

### Paano?

```js
// Masama
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Mabuti
const mainWindow = new BrowserWindow()
```

```html
<!-- Hindi Kaaya-aya --><webview disablewebsecurity src="page.html"></webview>

<! -- Kaaya-aya -->
<webview src="page.html"></webview>
```

## 6) Define a Content Security Policy

Ang NIlalaman ng Patakarang Pangsegurado (CSP) ay isang karagdagang layer ng proteksyon laban sa cross-site na manuskritong atake at data iniksyong atake. Inirekomenda namin na ang mga ito ay paganahin sa anumang website na iyong ma-load sa loob ng Electron.

### Bakit?

an CSP ay nagpapahintulot sa server serving na nilalaman upang paghigpitan at kontrolin ang mga mapagkukunan na maaaring ma-load sa Electron sa binigay na web page. Ang `https://your-page.com` ay dapat pahintulutan na mag-load ng mga manuskrito galing sa ga pinagmulan na inyong itinukoy habang ang mga manuskritong galing sa `https://evil.attacker.com` ay hindi dapat pahintulutang patakbuhin. Defining a CSP is an easy way to improve your application's security.

Ang sumusunod na CSP ay nagpapahintulot sa Electron na mag-execute ng mga manuskrito galing sa kasalukuyang website at galing sa 0>apis.mydomain.com</code>.

```txt
// Hindi kaaya-aya
Nilalaman-Seguridad-Patakaran: '*'

// Kaaya-aya
Nilalaman-Seguridad-Patakaran: script-src 'self' https://apis.mydomain.com
```

### CSP HTTP Header

Electron respects the [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) which can be set using Electron's [`webRequest.onHeadersReceived`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const {session} = require('electron')

session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  callback({responseHeaders: `default-src 'none'`})
})
```

### CSP Meta Tag

CSP's preferred delivery mechanism is an HTTP header. It can be useful, however, to set a policy on a page directly in the markup using a `<meta>` tag:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

#### `webRequest.onHeadersReceived([filter, ]listener)`

## 7) Override and Disable `eval`

Ang `eval()` ay isang core JavaScript na pamamaraan na naggpapahintulot ng exekusyon sa JavaScript galing sa isang string. Ang pag-disable nito ay makaka-disable ng kakayahan ng iyong app para suriin ang JavaScript na hindi unang kilala.

### Bakit?

Ang `eval` na pamamaraan ay mayroong isang tiyak na misyon: Para suriin ang serye ng mga character bilang isang JavaScript at patakbuhin. It is a required method whenever you need to evaluate code that is not known ahead of time. While legitimate use cases exist, like any other code generators, `eval()` is difficult to harden.

Generally speaking, it is easier to completely disable `eval()` than to make it bulletproof. Thus, if you do not need it, it is a good idea to disable it.

### Paano?

```js
// ESLint will warn about any use of eval(), even this one
// eslint-disable-next-line
window.eval = global.eval = function () {
  throw new Error(`Sorry, this app does not support window.eval().`)
}
```

## 8) Do Not Set `allowRunningInsecureContent` to `true`

*Ang rekomendasyon ay default ng Electron*

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### Bakit?

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

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
// Mabuti
const mainWindow = new BrowserWindow({})
```

## 9) Do Not Enable Experimental Features

*Ang rekomendasyon ay default ng Electron*

Maaaring paganahin ng mga advanced na user ng Electron ang mga pang-eksperimentong tampok ng Chromium gamit ang `experimentalFeatures` at `experimentalCanvasFeatures` at ari-arian.

### Bakit?

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Ang mga lehitimong kaso ng paggamit ay umiiral, ngunit maliban kung alam mo kung ano ang iyong ginagawa, dapat mo hindi paganahin ang ari-arian na ito.

### Paano?

```js
// Masama
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Mabuti
const mainWindow = new BrowserWindow({})
```

## 10) Do Not Use `enableBlinkFeatures`

*Ang rekomendasyon ay default ng Electron*

Ang blink ay ang pangalan ng rendering engine sa likod ng Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### Bakit?

Sa pangkalahatan, malamang na may mga dahilan kung ang isang tampok ay hindi pinagana bilang default. Ang mga lehitimong kaso ng paggamit para sa pagpapagana ng mga partikular na tampok ay umiiral. Bilang isang developer, dapat mong malaman eksakto kung bakit kailangan mong paganahin ang isang tampok, kung ano ang Ang mga resulta ay, at kung paano ito nakakaapekto sa seguridad ng iyong aplikasyon. Sa ilalim walang mga pangyayari na dapat mong paganahin ang mga tampok na speculatively.

### Paano?

```js
// Bad
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: ['ExecCommandInJavaScript']
  }
})
```

```js
// Mabuti
const mainWindow = new BrowserWindow()
```

## 11) Do Not Use `allowpopups`

*Ang rekomendasyon ay default ng Electron*

If you are using [`WebViews`](../api/web-view.md), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](../api/browser-window.md) using the `window.open()` method. `WebViews` ay hindi pinapayagan na lumikha ng bago bintana.

### Bakit?

Kung hindi mo kailangan ang mga popup, ikaw ay mas mahusay na hindi pinapayagan ang paglikha ng bagong [`BrowserWindows`](../api/browser-window.md) bilang default. Kasunod nito ang prinsipyo ng minimally required access: Huwag hayaan ang isang website na lumikha ng mga bagong popup maliban kung alam mo na kailangan nito ang tampok na iyon.

### Paano?

```html
<!-- Hindi Kaaya-aya --><webview allowpopups src="page.html"></webview>

<! -- Kaaya-aya -->
<webview src="page.html"></webview>
```

## 12) Verify WebView Options Before Creation

Ang isang WebView na nilikha sa isang proseso ng renderer na walang pagsasama ng Node.js pinagana hindi makapag-enable ang pagsasama mismo. Gayunpaman, ang isang WebView ay laging lumikha ng isang malayang proseso ng pag-render na may sariling `webPreferences`.

Magandang ideya na kontrolin ang paglikha ng bagong [`WebViews`](../api/web-view.md) mula ang pangunahing proseso at upang mapatunayan na hindi pinagana ang kanilang mga webPreferences katangian ng seguridad.

### Bakit?

Dahil nabubuhay ang WebView sa DOM, maaari silang lumikha ng isang script na tumatakbo sa iyong website kahit na hindi naka-disable ang pagsasama ng Node.js.

Ang electron ay nagbibigay-daan sa mga developer na huwag paganahin ang iba't ibang mga tampok ng seguridad na kontrol isang proseso ng tagapag-render. Sa karamihan ng mga kaso, hindi kailangan ng mga developer na huwag paganahin ang alinman sa mga tampok na iyon - at dapat mong hindi pinapayagan ang iba't ibang mga pagsasaayos para sa mga bagong nilikha [`<WebView>`](../api/web-view.md) na mga tag.

### Paano?

Bago ang isang [`<WebView>`](../api/web-view.md) tag ay naka-attach, Electron ay sunugin ang `will-attach-webview` kaganapan sa hosting `webContents`. Gamitin ang event sa pigilan ang paglikha ng mga WebView na may posibleng mga opsyon na hindi secure.

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // I-strip ang mga preload script kung hindi ginagamit o i-verify ang kanilang lokasyon ay lehitimong
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable Node.js integration
    webPreferences.nodeIntegration = huwad

    // I-verify ang URL na na-load
    kung (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

Muli, ang listahang ito ay nagpapaliit lang sa panganib, hindi ito inaalis. Kung ang iyong layunin ay upang ipakita ang isang website, isang browser ay magiging isang mas ligtas na option.