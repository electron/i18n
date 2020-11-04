# Scrie prima ta aplicație Electron

Electron vă permite să creați aplicații desktop cu pure JavaScript, furnizând o rulare cu API-uri native (sistem de operare). Ați putut-o vedea ca o variantă a runtime Node.js care este concentrată pe aplicații desktop în loc de servere web.

Asta nu înseamnă că Electron este o legare JavaScript la bibliotecile grafice de interfață utilizator (GUI). În schimb, Electron folosește paginile web ca GUI, așa că ai putea să o vezi ca un browser de Chromium minim, controlat de JavaScript.

**Notă**: Acest exemplu este disponibil și ca un repo poți [descărca și rula imediat](#trying-this-example).

În ceea ce privește dezvoltarea, o aplicație Electron este în esență o aplicație Node.js. Punctul de plecare este un `pachet.json` care este identic cu cel al unui modul Node.js. O aplicație Electron de bază ar avea următoarea structură de dosare :

```plaintext
aplicația-ta/
Ribavirin ─ pachete.json
Ribavirin ─ main.js
•─ index.html
```

Creați un dosar nou gol pentru noua dvs. aplicație Electron. Deschideți clientul de comandă și executați `npm init` din acel director.

```sh
npm init
```

npm te va ghida prin crearea unui fișier `pachet.json`. Scriptul specificat de câmpul `principal` este script-ul de pornire al aplicației dvs., care va rula procesul principal. Un exemplu de pachetul `pachet.json` ar putea arăta în felul următor:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Note__: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). Dacă a fost de fapt o aplicație simplă Node, ați adăuga un `start` script care instruiește `nod` pentru a executa pachetul curent:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Transformarea acestei aplicații Node într-o aplicație Electron este destul de simplă - vom înlocui pur și simplu `terminalul` runtime cu `electronul` runtime.

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Instalarea Electron

În acest moment, va trebui să instalezi `electronul` însuși. Modul recomandat de a face acest lucru este să îl instalezi ca o dependență de dezvoltare în aplicația ta, care vă permite să lucrați pe mai multe aplicații cu diferite versiuni Electron. Pentru a face acest lucru, execută următoarea comandă din directorul aplicației tale:

```sh
npm instalare --save-dev electron
```

Alte mijloace pentru instalarea Electron există. Vă rugăm să consultaţi [ghidul de instalare](installation.md) pentru a afla despre utilizarea cu proxy-uri, oglinzi, şi geocutii personalizate.

## Dezvoltarea Electron într-un Nutshell

Aplicațiile Electron sunt dezvoltate în JavaScript folosind aceleași principii și metode găsite în dezvoltarea Node.js. Toate API-urile și caracteristicile găsite în Electron sunt accesibile prin modulul `electron` , care poate fi solicitat ca orice alt modul . s modul:

```javascript
const electron = require('electron')
```

Modulul `electron` expune caracteristici în spații de nume. Ca exemple, ciclul de viață al aplicației este gestionat prin `electron. pp`, ferestrele pot fi create folosind clasa `electron.BrowserWindow`. Un fişier simplu `main.js` ar putea aştepta ca aplicaţia să fie pregătită şi să deschidă o fereastră:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Creați fereastra browser-ului.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // și încarcă index.html al aplicației.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

`main.js` ar trebui să creeze ferestre şi să se ocupe de toate evenimentele de sistem pe care aplicaţia s-ar putea să le întâlnească. O versiune mai completă a exemplului de mai sus ar putea deschide unelte de dezvoltator, să gestioneze fereastra închisă, sau re-creați ferestre ferestre pe macOS dacă utilizatorul face clic pe pictograma aplicației în dock.

```javascript
const { app, BrowserWindow } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Deschideți DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Unele API-uri pot fi utilizate numai după acest eveniment.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // Pe macOS este comun ca aplicațiile și bara lor de meniu
  // să rămână active până când utilizatorul renunță în mod explicit la Cmd + Q
  dacă (proces. latform !== 'darwin') {
    app. uit()
  }
})

aplicație. n ('activat', () => {
  // Pe macOS este comun să se recreeze o fereastră în aplicație atunci când se face clic pe pictograma de andocare
  // și nu există alte ferestre deschise.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. De asemenea, le puteți pune în fișiere separate și le puteți cere aici.
```

În final, indexul `index.html` este pagina web pe care doriți să o afișați:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Rularea primei tale aplicații

Odată ce ați creat inițial `main.js`, `index.html`, și `pachetul. Fiu` fișiere, poți încerca aplicația rulând `npm pornește` din directorul al aplicației tale.

## Se încearcă acest exemplu

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`][quick-start] repository.

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

```sh
# Clonează depozitul
$ git clona https://github. om/electron/electron-quick-start
# Mergeți în depozitul
$ cd electron-start
# Instalare dependențe
$ npm instalare
# Rulează aplicația
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation][boilerplates].

[quick-start]: https://github.com/electron/electron-quick-start
[boilerplates]: ./boilerplates-and-clis.md
