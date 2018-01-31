# FAQ sa Electron

## Bakit ako nagkakatrobol sa pag-install ng Electron?

Habang pinapagana ang `npm install electron`, ang ilang mga user ay madalas na nakaka-engkwentro ng error sa pag-install.

Sa halos lahat ng mga kaso, ang mga error na ito ay resulta ng mga problema sa network at hindi talaga aktwal na isyu sa npm package ng `electron`. Ang mga error gaya ng `ELIFECYCLE`,`EAI_AGAIN`, `ECONNRESET`, at `ETIMEDOUT` ay mga indikasyon tulad nitong mga problema sa network. Ang pinaka mahusay na paglutas ay ang pagsubok na pagpalitin ang mga network, o hindi kaya ay maghintay ng kaunti at subukang i-install muli.

Maari mo ring subukang i-download ang Electron ng direkta mula sa [electron/electron/releases](https://github.com/electron/electron/releases) kung ang pag-iinstall sa pamamagitan ng `npm` ay hindi nagtatagumpay.

## Kailan mag-uupgrade ang Electron sa pinakabagong Chrome?

Ang Chrome na bersyon ng Electron ay kadalasang na-ilalabas sa loob ng isa o dalawang linggo pagkatapos mailabas ang bagong maayos na bersyon ng Chrome. Ang estimasyong ito ay hindi garantisado at dumedepende sa dami ng trabahong kasangkot sa pag-uupgrade.

Tanging ang matatag na tsanel ng Chrome ang gagamitin, kung ang importanteng pag-aayos ay nasa beta o dev na tsanel, iba-back-port namin ito.

Para sa karagdagang impormasyon, mangyaring tignan lamang ang [Inroduksyon ng Seguridad](tutorial/security.md).

## Kailan mag-aupgrade ang Electrong sa pinakabagong Node.js?

Kapag ang bagong bersyon ng Node.js ay nailabas na, madalas kaming nag-hihintay ng isang buwan bago i-upgrade ang isa na nasa Electron. Upang maiwasan namin ang ma-apektuhan ng mga bug na ipinakilala sa bagong bersyon ng Node.js, na madalas na nangyayari.

Ang bagong mga tampok ng Node.js ay kadalasang dina-dala ng pag-upgrade ng V8, dahil ang Electron ay gumagamit ng V8 na dala-dala ng Chrome na browser, ang makintab na bagong tampok ng JavaScript ng isang bagong bersyong ng Node.js ay madalas na nasa Electron na.

## Paano magbahagi ng datos sa pagitan ng mga pahina ng web?

Para makapagbahagi ng mga datos sa pagitan ng mga pahina ng web (ang taga-render ay nag-poproseso) ang pinaka-simpleng paraan ay ang paggamit ng API ng HTML5 na maaari na sa mga browser. Ang mga mabuting kandidato ay [`Storage API`](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), at [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

O maaari mo ring gamitin ang system ng IPC, kung saan ay tiyak na sa Electron, upang mag-tabi ng mga bagay sa pangunahing proseso bilang isang pangkalahatang mga baryante, at pagkatapos para ma akses ang mga ito mula sa mga pang-render sa pamamagitan ng `remote` na katangian ng modyul ng `electron`:

```javascript
// Sa pangunahing proseso. 
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
Sa pahina 1.
require('electron').remote.getGlobal ('sharedObject').someProperty = 'new value'
```

```javascript
// Sa pahina 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Ang window/tray ng aking app ay nawala pagkalipas ng ilang mga minuto.

Ito ay nangyayari kapag ang baryante kung saan ay ginagamit para ilagay ang window/tray ay makakakuha ng basurang nakolekta.

Kung ika'y maka-engkwentro ng problemang ito, ang sumusunod na mga artikulo ay maaaring mapatunayang nakatutulong:

* [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Variable Scope](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Kung gusto mo ng mabilisang pag-aayos,  maaari mong gawing pangkalahatan ang mga baryante sa pamamagitan ng pagbago mo sa iyong code tulad nito:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

sa ganito:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Hindi ko magamit ang jQuery/RequireJS/Meteor/AngularJS sa Electron.

Dahil sa integrasyon ng Electron sa Node.js, mayroong ilang mga ekstrang mga simbulo na ipinasok sa DOM tulad ng `module`, `exports`, `require`. Ito ay nagiging sanhi ng mga problema para sa ilang mga library dahil sa gusto nilang ipasok ang mga simbulo na may parehong mga pangalan.

Para maresulba ito, maaari mong patayin ang integrasyon ng node sa Electron:

```javascript
// Sa pangunahing proseso.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Ngunit kung gusto mong panatilihin ang abilidad na magamit ang Node.js at ang API ng Electron, kailangan mong baguhin ang pangalan ng mga simbulo sa pahina bago isama ang ibang mga library:

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

## `require('electron').xxx` ay hindi matukoy.

Kapag gumagamit ng built-in na modyul ng Electron maaari kang maka-engkwentro ng error na tulad nito:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

Ito ay dahil sa meron kang [npm `electron` module](https://www.npmjs.com/package/electron) na naka-install maaari sa lokal o pangkalahatan, na umiibabaw sa build-in na modyul ng Electron.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

at pagkatapos i-tsek kung ito ay nasa sumusunod na anyo:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

Kung ito ay isang bagay tulad ng `node_modules/electron/index.js`, pagkatapos ay kailangan mong tanggalin ang alinman sa npm `electron` module, o baguhin ang pangalan nito.

```sh
npm uninstall electron
npm uninstall -g electron
```

Gayunpaman kung ikaw ay gumagamit ng built-in na modyul at nakakakuha ka parin ng error na ito, malaki ang posibilidad na ginagamit mo ang modyul sa maling proseso. Halimbawa ang `electron.app` ay maaari lamang magamit sa pangunahing proseso, habang ang `electron.webFrame`ay ang tanging maaari sa proseso ng pang-render.
