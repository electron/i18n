---
title: Modificări ale API în Electron 1.0
author: zcbenz
date: '2015-11-17'
---

De la începutul Electron, porniţi înapoi când se numea Atom-Shell, am experimentat oferind un frumos JavaScript API pentru conținutul modulului Chromium și componentele GUI native. API au început foarte organic, şi de-a lungul timpului am făcut câteva modificări pentru a îmbunătăţi proiectele iniţiale.

---

Acum când Electron se pregătește pentru o versiune 1.0, am dori să profităm de ocazie pentru a schimba adresând ultimele detalii API niging. Modificările descrise mai jos sunt incluse în **0.35.**, cu vechile API-uri care raportează avertismentele de descurajare astfel încât să puteți ajunge la zi pentru viitoarea versiune 1.0 Un 1.0 Electron nu va mai fi exclus pentru câteva luni, așa că aveți ceva timp până când aceste modificări se destrămă.

## Avertismente de dezaprobare

În mod implicit, avertismentele vor arăta dacă folosiți API-uri învechite. Pentru a le dezactiva, puteți seta `process.noDeprecation` la `true`. Pentru a urmări sursele de utilizare API învechite, puteți seta procesul `. hrowDeprecation` to `true` to aruncare excepții în loc să tipărească avertismente, sau setează `process process. raceDeprecation` pentru `adevărat` pentru a afișa urmele dezprecațiilor.

## Mod nou de utilizare a modulelor încorporate

Modulele încorporate sunt acum grupate într-un singur modul, în loc să fie separate în module independente, astfel încât să le puteți folosi [fără conflicte cu alte module](https://github.com/electron/electron/issues/387):

```javascript
var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
```

Vechiul mod de `necesar ('app')` este în continuare acceptat pentru compatibilitate înapoi, dar puteți de asemenea să dezactivați dacă:

```javascript
require('electron').hideInternalModules()
require('app') // eroare de aruncare.
```

## Un mod mai ușor de a utiliza modulul `la distanță`

Din cauza modului în care s-a schimbat modul în care au fost folosite modulele încorporate, am facilitat utilizarea modulelor de la nivelul procesului principal în procesul de redare. Acum poți doar să accesezi atributele `la distanță`pentru a le folosi:

```javascript
// Mod nou.
var app = require('electron').remote.app
var BrowserWindow = require('electron').remote.BrowserWindow
```

În loc să se folosească un lanț lung necesar:

```javascript
// Vechea cale.
var app = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## Împărțirea modulului `ipc`

Modulul `ipc` a existat atât pe procesul principal, cât și pe procesul de redare, iar API a fost diferit pe fiecare parte, care este destul de confuză pentru utilizatorii noi. Am redenumit modulul în `ipcMain` în procesul principal, și `ipcRenderer` în procesul de redare pentru a evita confuzia:

```javascript
// In main process.
var ipcMain = require('electron').ipcMain
```

```javascript
// În procesul de cedare.
var ipcRenderer = require('electron').ipcRenderer
```

Iar pentru modulul `ipcRenderer` , un eveniment `suplimentar` a fost adăugat la primirea mesajelor, pentru a potrivi modul în care mesajele sunt tratate în `module ipcMain`:

```javascript
ipcRenderer.on('message', function (event) {
  console.log(event)
})
```

## Opțiuni standardizate `Fereastra Browser`

Opțiunile `BrowserWindow` au stiluri diferite bazate pe opțiunile altor API-uri, și au fost puțin mai greu de folosit în JavaScript din cauza `-` în nume. Acestea sunt acum standardizate în nume JavaScript tradiționale:

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## Ca urmare a convențiilor DOM, privind denumirile API

Numele API din Electron folosite pentru a prefera camelCase pentru toate numele API, ca `Url` to `URL`, dar DOM are propriile sale convenții, și preferă `URL-ul` către `Url`, în timp ce utilizați ID-ul `` în loc de `ID`. Am făcut următoarele redenumiri API pentru a se potrivi cu stilurile DOM:

* `Url` este redenumit la `URL`
* `Csp` este redenumit la `CSP`

Vei observa o mulțime de dezavantaje când folosești Electron v0.35.0 pentru aplicația ta din cauza acestor modificări. O modalitate ușoară de a le repara este înlocuirea tuturor instanțelor `Url` cu `URL`.

## Modificări la numele evenimentelor `Tăi`

Numele evenimentului `Tăi` a fost puţin diferit de alte module, astfel încât a fost făcută o redenumire pentru a se potrivi cu celelalte.

* `clic-ul` este redenumit la `click`
* `dublu-clic` este redenumit la `dublu-click`
* `clic-dreapta` este redenumit `clic-dreapta`

