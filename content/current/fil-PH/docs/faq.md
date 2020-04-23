# Electron FAQ

## Bakit ako nagkakaproblema sa pag-install ng Electron?

Habang pinatatakbo and `npm install electron`, ang ibang user ay kadalasang nakakasalubong ng error sa pag-install.

Sa maraming pagkakataon, ang mga problemang ito ay resulta ng problema sa network at hindit talaga aktwal na isyu ng `electron` npm package. Ang problema gaya ng `ELIFECYCLE`,`EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` ay mga indikasyon na mayroon problema sa iyong network. The best resolution is to try switching networks, or wait a bit and try installing again.

Maari mo ring subukan i download ang Electron ng direkta mula sa [electron/electron/releases](https://github.com/electron/electron/releases)kung ang pag-iinstall sa pamamagitan ng `npm` ay hindi nagtatagumpay.

## Kailan ang Electron mag-aupgrade sa pinakabagong Chrome?

Ang Chrome version ng Electron ay kadalasang inilalabas sa loob ng isa o dalawang linggo pagkatapos mailabas ang bagong maayos na Chrome version. Ang tayang ito ay hindi garantisado at depende parin sa dami ng trabahong kailangang gawin na nakapaloob sa pag-a upgrade.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

Para sa karagdagang impormasyon, mangyaring tignan lamang ang [ security introduction](tutorial/security.md).

## Kailan ang Electron mag-aupgrade sa pinakabagong Node.js?

Kapag ang bagong bersyon ng Node.js ay nailabas, kadalasan ay naghihintay kami ng isang buwan bago i-upgrade ang isang nasa Electron. Para maiwasan naming maapektuhan ng mga bugs na kasama sa bagong bersyon ng Node.js, na nangyayari ng madalas.

Ang bagong tampok ng Node.js ay kadalasang dala ng V8 upgrade, dahil ang Electron ay gumagamit ng V8 na dala ni Chrome browser, ang makinang at bagong tampok mula sa JavaScript ng bagong bersyon ng Node.js ay kadalasang kasama na sa Electron.

## Paano magbahagi ng data sa pagitan ng mga pahina ng web?

Para magbahagi ng mga datos sa pagitan ng pahina ng web ( ang nagbabahagi ay nagpoproseso) ang pinaka simpleng paraan ay ang paggamit ng HTML5 API na maari nang gamitin sa mga browser. Ang mabuting kandidato ay [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), and [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

O maaari mo ring gamitin ang IPC system, na partikular na sa Electron, upang itabi ang mga bagay sa pangunahing proseso bilang isang pandaigdigang variable, at pagkatapos para ma access ang mga ito mula sa mga renderers sa pamamagitan ng `remote`property `electron`module:

```javascript
// Sa mga pangunahing proseso.
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

## My app's tray disappeared after a few minutes.

This happens when the variable which is used to store the tray gets garbage collected.

Kung nakatagpo ka ng problemang ito, maaaring makatulong ang mga sumusunod na artikulo:

* [Pamamahala ng kaisipan](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Baryanteng Saklaw](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Kung gusto mo ng isang mabilis na ayusin, maaari mong gawin ang mga variable global sa pamamagitan ng pagpapalit ng iyong code mula dito:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

sa ganito:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Hindi ko magamit ang jQuery/RequireJS/Meteor/AngularJS sa Electron.

Dahil sa pagsasama ng Node.js ng Electron, mayroong ilang dagdag na simbolo ipinasok sa DOM tulad ng `module`,`exports`, `require`. Ito ay nagiging sanhi ng mga problema para sa ilang mga aklatan dahil gusto nilang ipasok ang mga simbolo na may parehong mga pangalan.

Upang malutas ito, maaari mong i-off ang pagsasama ng node sa Electron:

```javascript
// Sa mga pangunahing proseso.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Ngunit kung nais mong panatilihin ang mga kakayahan ng paggamit ng Node.js at Electron API, ikaw kailangang palitan ang pangalan ng mga simbolo sa pahina bago isama ang iba pang mga library:

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

## `require('electron').xxx` ay hindi natukoy.

Kapag gumagamit ng built-in na module ng Electron maaari kang makatagpo ng error tulad nito:

```sh
>
nangangailangan('electron').webFrame.setZoomFactor (1.0)
Uncaught TypeError: Hindi mabasa ang 'setZoomLevel' property ng hindi natukoy
```

It is very likely you are using the module in the wrong process. Halimbawa`electron.app`ay maari lamang magamit sa pangunahing proseso, habang ang `electron.webFrame`ay tanging magagamit sa proseso ng tagasalin.

## The font looks blurry, what is this and what can I do?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Halimbawa:

![subpixel rendering example](images/subpixel-rendering-screenshot.gif)

Sub-pixel anti-aliasing needs a non-transparent background of the layer containing the font glyphs. (See [this issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) for more info).

To achieve this goal, set the background in the constructor for [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Notice that just setting the background in the CSS does not have the desired effect.
