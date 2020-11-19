# Întrebări și răspunsuri Electron

## De ce am probleme cu instalarea lui Electron?

Când rulezi `npm install electron</ 0>, unii utilizatori întâlnesc ocazional erori de instalare.</p>

<p spaces-before="0">Când rulezi <code>npm instalează electroni`, unii utilizatori întâlnesc ocazional erori de instalare. Errori ca `ELIFECYCLE`,`EAI_AGAIN`, `ECONNRESET`, si `ETIMEDOUT` sunt indicatii ca exista probleme de retea. Cea mai bună rezoluție este să încercați să schimbați rețelele, sau să așteptați puțin și să instalați din nou.

Puteți încerca să descărcați Electron direct de pe [electron/electron/releases](https://github.com/electron/electron/releases) dacă instalarea via `npm` eșuează.

## Când va face upgrade Electron la cel mai recent Chrome?

Versiunea de Chrome al Electron este de obicei bătută în una sau două săptămâni după o nouă versiune de Chrome stabilă. Această estimare nu este garantată și depinde de volumul de muncă implicat în modernizare.

Se utilizează numai canalul stabil al Chrome. Dacă o reparație importantă este în canalul beta sau dev , o vom întoarce spre portare.

Pentru mai multe informații, vă rugăm să consultați [introducerea de securitate](tutorial/security.md).

## Când va trece Electron la ultimul Node.js?

Atunci când o versiune nouă a Node.js este lansată, așteptăm de obicei aproximativ o lună înainte de a-l moderniza pe cel din Electron. Așa că putem evita să fim afectați de bug-uri introduși în versiunile noi de Node.js, ceea ce se întâmplă foarte des.

Noile caracteristici ale Node.js sunt, de obicei, aduse de upgrade-urile V8, deoarece Electron folosește V8-ul adus de browserul Chrome, nou-nouța caracteristică JavaScript a unei versiuni noi Node.js este, de obicei, deja în Electron.

## Cum se partajează datele între paginile web?

Pentru a partaja date între pagini web (procesele de redare), cea mai ușoară cale este de a utiliza API-urile HTML5 care sunt deja disponibile în browsere. Good candidates are [Storage API][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage], and [IndexedDB][indexed-db].

Alternativ, poți folosi primitivele IPC furnizate de Electron. Pentru a partaja date între procesele principale și de redare, poți utiliza modulele [`ipcMain`](api/ipc-main.md) și [`ipcRenderer`](api/ipc-renderer.md). Pentru a comunica direct între paginile web, puteți trimite un [`MessagePort`][message-port] de la unul la altul, posibil prin procesul principal folosind [`ipcRenderer. Mesaj ()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Comunicările ulterioare cu privire la porturile de mesaje sunt directe și nu străbate prin procesul principal.

## Bara pentru aplicațiile mele a dispărut după câteva minute.

Acest lucru se întâmplă atunci când variabila care este utilizată pentru a stoca bara devine gunoi colectat.

Dacă întâmpinați această problemă, următoarele articole se pot dovedi utile:

* [Gestionare memorie][memory-management]
* [Domeniu variabil][variable-scope]

Dacă vrei o rezolvare rapidă, poți face variabilele globale schimbând codul tău din asta:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

în acest sens:

```javascript
const { app, Tray } = require('electron')
nullapp.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Nu pot folosi jQuery/RequireJS/Meteor/AngularJS în Electron.

Datorită integrării Node.js a Electron, există unele simboluri suplimentare inserate în DOM ca `module`, `exports`, `require`. Acest lucru cauzează probleme pentru unele biblioteci, deoarece vor să introducă simboluri cu aceleași nume.

Pentru a rezolva acest lucru, puteți dezactiva integrarea nodurilor în Electron:

```javascript
// În procesul principal-main.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Dar dacă doriți să păstrați abilitățile de a utiliza API-uri Node.js și Electron, trebui să redenumiți simbolurile din pagină înainte de a include alte biblioteci:

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

## `Necesar ('electron').xxx` este nedefinit.

Când utilizați modulul încorporat Electron este posibil să întâlniți o eroare ca aceasta:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Tip neprins: Imposibil de citit proprietatea 'setZoomLevel' de nedefinit
```

Este foarte probabil să utilizați modulul într-un proces greșit. De exemplu `electron.app` poate fi utilizat numai în procesul principal, în timp ce `electron.webFrame` este disponibil numai în procesele de redare.

## Fontul arată încețoșat, ce pot face și ce pot face?

If [sub-pixel anti-aliasing](https://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Exemplu:

![subpixel randare exemplu][]

Sub-pixelii anti-aliasing au nevoie de un fundal netransparent al stratului care conține fontul glicol. (Vezi [această problemă](https://github.com/electron/electron/issues/6344#issuecomment-420371918) pentru mai multe informații).

Pentru a atinge acest obiectiv, setează fundalul în constructor pentru [BrowserWindow][browser-window]:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Chiar dacă nu vezi nicio diferență, unii dintre utilizatorii tăi ar putea să o facă. Cel mai bine este să setăm întotdeauna fundalul în acest mod, cu excepţia cazului în care există motive pentru a nu face acest lucru.

Observați că doar setarea fundalului în CSS nu are efectul dorit.

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[message-port]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[browser-window]: api/browser-window.md
[subpixel randare exemplu]: images/subpixel-rendering-screenshot.gif
