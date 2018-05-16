# `sandbox` Ang opsyon

> Lumikha ng isang browser window kasama ang tagabigay na maaaring gumana sa loob ng sandbox ng Chromium OS. Kasama ang pinaganang opsyon, ang tagabigay ay dapat makipag-ugnayan sa pamamagitan ng IPC sa mga pangunahing proseso nang sa gayon ay ma-access ang mga node ng API. Gayunpaman, para mapagana ang sandbox ng Chromium OS, ang electron ay dapat na umandar kasama ang `--enable-sandbox` ng argumento sa linya ng komand.

Isa sa mga katangian ng susing pangseguridad ng Chromium ay ang lahat ng kodigo ng blink rendering/JavaScript ay isinagawa sa loob ng isang sandbox. Ang sandbox na ito ay gumagamit ng partikular na mga katangian ng OS para matiyak na ang pagsasamantala sa mga prosesong tagasalin ay hindi makakasira sa sistema.

Sa madaling salita, kapag ang sandbox ay pinagana, ang mga tagasalin ay maaari lamang gumawa ng mga pagbabago sa sistema sa pamamagitan ng pagtatalaga ng mga gawain sa pangunahing proseso sa pamamagitan ng IPC. [Here's](https://www.chromium.org/developers/design-documents/sandbox) ang mas maraming impormasyon tungkol sa sandbox.

Dahilan sa ang isang pangunahing katangian ng electron ay ang kakayahang patakbuhin ang node.js sa prosesong tagasalin (ginagawa nitong mas madali ang pagbuo ng mga aplikasyon ng desktop gamit ang mga teknolohiya ng web), ang sandbox ay pinapahinto ng electron. Ito ay dahil sa ang karamihan ng mga API ng node.js ay nangangailangan ng access sa sistema. Ang `require()` bilang halimbawa, ay hindi posible kung walang mga permiso ng file ng sistema, kung saan ay hindi magagamit sa kapaligiran ng isang sandbox.

Karaniwang ito ay hindi problema para sa mga aplikasyon ng desktop dahil ang mga kodigo ay palaging mapagkakatiwalaan, ngunit maaaring ang electron ay hindi gaanong ligtas kaysa chromium para sa pagpapakita ng hindi mapagkakatiwalaang laman ng web. Para sa mga aplikasyon na nangangailangan ng mas higit na siguridad, ang flag ng `sandbox` ay pipilitin ang electron na maglabas ng isang klasikong tagasalin ng chromium na nababagay sa sandbox.

Ang tagasalin ng isang sandbox ay hindi magkakaroon ng gumaganang kapaligiran ng isang node.js at hindi ilalantad ang mga JavaScript API ng node.js sa kodigo ng kliyente. Ang tanging eksepsyon ay ang preload script, kung saan ay may access sa isang tagasalin ng API ng electron.

Ang isa pang pagkakaiba ay ang mga tagasalin ng sandbox ay hindi binabago ang alinman sa mga default ng mga API ng JavaScript. Consequently, some APIs such as `window.open` will work as they do in chromium (i.e. they do not return a `BrowserWindowProxy`).

## Mga halimbawa

Para lumikha ng isang window na naka-sandbox, ipasa lamang ang `sandbox: true` sa `webPreferences`:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  w.loadURL('http://google.com')
})
```

In the above code the `BrowserWindow` that was created has node.js disabled and can communicate only via IPC. Ang paggamit nitong pagpipilian ay mahihinto ang elektron sa paglika ng isang node.js runtime sa tagatanghal. Also, within this new window `window.open` follows the native behaviour (by default electron creates a `BrowserWindow` and returns a proxy to this via `window.open`).

Ito ay mahalaga na tandaan na ang opsyun nito na nag-iisa ay hindi nkapagpapagana ng OS-enforced sandbox. Upang paganahin ang tampok na ito, ang `– mapagana-sandbox` ang linya ng utos sa argumento dapat maipasa sa elektron, na kung saan ay pipilitin `sandbox: totoo` para sa lahat ng mga kaganapan ng `BrowserWindow`.

Upang paganahin ang OS-enforced sandbox sa `BrowserWindow` o `webview` na proseso na may `sandbox:tama` na walang sanhi ng buong app sa sandbox, `--enable-mixed-sandbox` utos-sa-linya ay dapat maipasa sa elektron. Ang opsyun na ito ay kasalukuyang suportado sa macOS at Windows lamang.

```js
let win
app.on('ready', () => {
  // no need to pass `sandbox: true` since `--enable-sandbox` was enabled.
  win = new BrowserWindow()
  w.loadURL('http://google.com')
})
```

Tandaan na ito ay hindi sapat upang tawagin ang `app.commandLine.appendSwitch('--enable-sandbox')`, bilang elektron o node startup code na tumatakbo pagkatapos ito ay posibleng gumawa ng mga pagbabago sa mga settings ng chromium sandbox. Ang switch ay dapat dumaan sa elektron sa mga command-line:

    elektron --enable-sandbox app.js
    

Ito ay hindi posible na magkaroon ng OS sandbox na aktibo lamang para sa ilang mga renderers, kung `--enable-sandbox` ay gumagana, ang normal na elektron windows ay hindi malilikha.

Kung kailangan na ihalo sa sandboxed at non-sandboxed renderers sa iisang aplikasyun, tanggalin lamang ang `--enable-sandbox` na argumento. Kung walang argumento ito, nilikha ang windows sa `sandbox: tama` ay magkakaroon parin nang node.js na hindi gumagana at kaugnayan lamang sa pamamagitan ng IPC, kung saan ito mismo makakuha mula sa seguridad POV.

## Preload

Ang app na ito ay maaaring makapagcustomize sa sandboxed renderers gamit ang preload script. Ito ang halimbawa:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  w.loadURL('http://google.com')
})
```

at preload.js:

```js
// Ang file na ito ay isinasakay tuwing ang isang javascript na konteksto ay nilikha. Ito ay tumatakbo sa isang // pribadong saklaw na maaaring ma-akses ang isang subset ng elektron na tagasalin ng APIs. Dapat tayong maging // maingat para hindi tumagas ang anumang bagay sa mga pandaigdigang saklaw!
const fs = require('fs')
const {ipcRenderer} = require('electron')

// read a configuration file using the `fs` module
const buf = fs.readFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window.open

function customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}

window.open = customWindowOpen
```

Mahahalagang bagay na mapapansin sa preload script:

- Kahit na ang sandboxed na tagsalin na walang node.js na tumatakbo, ito parin ay ma-aakses sa isang limitadong node-like na kapaligiran: `Buffer`, `proseso`, `setlmmediate` at `nangangailangan` ay magagamit.
- Ang preload script ay maaaring ma-akses na hindi direkta ang lahat na APIs na mula sa pangunahing proseso sa pamamagitan ng `remote` at `ipcRenderer` na mga modyul. Ito ay kung paano ang `fs` (na ginagamit sa itaas) at ang ibang modyul ay ipinatupad: Ang mga proxy na katapat sa pangunahing proseso.
- Ang preload script ay dapat nakapaloob sa isang iskrip, pero ito din ay posible na magkaroon ng mga kumplikado na preload na kodigo na binubuo ng maramihang mga modyul sa parang kasangkapan na browserify, na naipaliwanag sa ibaba. Sa katunayan, ang browserify na ginagamit ng mga elektron upang magbigay ng isang katulad ng node na kapaligiran sa preload iskrip.

Sa paglikha ng isang bungkos ng browserify at gamitin ito bilang isang preload na iskrip, ang sumusunod ay dapat gamitin:

    browserify preload/index.js \
      -x electron \
      -x fs \
      --insert-global-vars=__filename,__dirname -o preload.js
    

Ang `-x` na watawat ay dapat gamitin sa anumang modyul na kasalukuyang nka-ekspos sa preload na saklaw, at nagsasabi sa browserify na gamitin ang enclosing na `require` na function nito. `--paningit-global-vars` ay tinitiyak na `proseso`, `Buffer` at `setlmmediate` ay nakukuha rin mula sa nka-enclose na saklaw(normally browserify injects code para sa mga).

Kasalukuyan ang `require` ng function na nakapagbibigay ng preload na saklaw na inilalantad sa mga sumusunod na mga modyul:

- `child_process`
- `electron` (crashReporter, remote and ipcRenderer)
- `fs`
- `os`
- `mga timers`
- `url`

Maaring marami ang maidagdag sa kinakailngan na mailantad na maraming elektron APIs sa sandbox, pero anumang modyul sa pangunahing proseso na ginamit sa pamamagitan ng `elektron.remote.require`.

## Katayuan

Pakiusap na gamitin ang `sandbox` na opsyun na may pangangalaga, katulad pa rin sa isang experimentong tampok nito. Kami ay wala pa ring kamalayan sa seguridad ng paglalantad sa ilang elektron na tagatanghal APIs sa preload na iskrip, pero narito ang mga ilang bagay na isinasaalang-alang bago e-render ang di-pinagkakatiwalaan na nilalaman:

- A preload script can accidentaly leak privileged APIs to untrusted code.
- Ang ilang bug sa V8 engine ay maaring payagan ang malisyusong kodigo para ma-akses ang renderer preload APIs, na epiktibong bigyan ng buong akses sa sistema sa pamamagitan ng `remote` na modyul.

Dahil sa pagrender ng hindi makapagtiwalaang nilalaman sa elektron ay wala pa sa mapa ng teritoryo, ang APIs ay nakalantad sa sandbox preload na iskrip na dapt na maisaalang-alang na maraming hindi matatag kaysa sa ilang elektron ng APIs, ay maaring mayroong pagsira sa mga pagbabago para ayusin ang isyu sa seguridad.

Isang planadong paghuhusay na dapat may malaking dagdag sa seguridad ay para maharangan ang mensahe ng IPC galing sa sandboxed renderers sa pamamagitan ng default, nagpapahintulot na ang pangunahing proseso sa tahasang pagtutukoy sa isang itinakdang mensahe sa renderer ay mapayagan na maipadala.