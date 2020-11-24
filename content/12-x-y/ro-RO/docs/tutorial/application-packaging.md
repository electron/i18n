# Ambalajul aplicaţiei

To mitigate [issues](https://github.com/joyent/node/issues/6960) around long path names on Windows, slightly speed up `require` and conceal your source code from cursory inspection, you can choose to package your app into an [asar][asar] archive with little changes to your source code.

Most users will get this feature for free, since it's supported out of the box by [`electron-packager`][electron-packager], [`electron-forge`][electron-forge], and [`electron-builder`][electron-builder]. Dacă nu folosești niciuna dintre aceste unelte, citește mai departe.

## Generând `asar` arhive

An [asar][asar] archive is a simple tar-like format that concatenates files into a single file. Electron poate citi fișiere arbitrare din el fără depachetarea întregului fișier.

Pași pentru a împacheta aplicația ta într-o arhivă `asar`:

### 1. Instalează utilitatea asar

```sh
$ npm install -g asar
```

### 2. Pachet cu `pachetul asar`

```sh
$ asar pachet aplicaţie dvs. app.asar
```

## Folosind arhive `asar`

În Electron există două seturi de API-uri: Node API-uri furnizate de Node.js și API-uri Web furnizate de Chromium. Ambele API-uri suportă citirea de fișiere din `asar` arhive.

### Nod API

Cu patch-uri speciale în Electron, Node API-uri ca `fs. fișierul eadFile` și `necesită` trata `arhive` asar ca directoare virtuale, şi fişierele în el ca de obicei fişiere în sistemul de fişiere.

De exemplu, să presupunem că avem o arhivă `exemple.asar` sub `/path/to`:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

Citește un fișier în arhiva `asar`:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

Listează toate fişierele de sub rădăcina arhivei:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

Foloseste un modul din arhiva:

```javascript
require('./path/to/example.asar/dir/module.js')
```

De asemenea, poți afișa o pagină web într-o arhivă `asar` cu `BrowserWindow`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

Într-o pagină web, fișierele dintr-o arhivă pot fi solicitate cu `fișierul:` protocol. Ca API-ul Node, `asar` arhive sunt tratate ca directoare.

De exemplu, pentru a obține un fișier cu `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### Tratând un `asar` Arhivă ca un fişier normal

Pentru unele cazuri cum ar fi verificarea checksum-ului arhivei `asar` , trebuie să citim conținutul unei arhive `asar` ca fișier. În acest scop puteţi utiliza modulul `original-fs` care oferă versiunea originală `fs` API-uri fără `asar` suport:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

De asemenea, poți seta procesul `. oAsar` to `true` pentru a dezactiva suportul `asar` în modulul `fs`:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Limitări ale Node API

Chiar dacă am încercat din greu să facem arhive `asar` în directorul Node API ca cât mai mult posibil, există încă limitări din cauza nivelului scăzut al API-ului Node.

### Arhivele sunt numai pentru citire

Arhivele nu pot fi modificate astfel încât toate API-urile Node care pot modifica fişierele să nu funcţioneze cu `asar` arhive.

### Directorul de lucru nu poate fi setat în directoarele din arhivă

Deşi arhivele `asar` sunt tratate ca directoare, nu există directoare reale în sistemul de fişiere, astfel încât să nu puteți seta niciodată directorul de lucru în directoare în `asar` arhive. Trecerea lor ca opțiune `cwd` pentru unele API va provoca de asemenea erori.

### Despachetare suplimentară pe unele API-uri

Cele mai multe `fs` API-uri pot citi un fișier sau pot obține informațiile unui fișier din `asar` arhive fără dezpachetare, dar pentru unele API-uri care se bazează pe transmiterea căii de fișiere reale către apeluri din sistemul de bază, Electron va extrage fişierul necesar într-un fişier temporar şi va pasa calea fişierului temporar către API-uri pentru a le face să funcţioneze. Aceasta adaugă un pic de cheltuieli suplimentare pentru aceste API-uri.

API-uri care necesită dezambalare suplimentară sunt:

* `child_process.execută Fișier`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - Folosit de `necesită` în module native

### Informații de statistică Fake pentru `fs.stat`

Obiectul `Statistici` returnat de `fs. treabă` și prietenii săi în fișiere `asar` arhive sunt generate prin ghicire, pentru că aceste fişiere nu există pe sistemul de fişiere . Așa că nu ar trebui să ai încredere în obiectul `Statistici` cu excepția mărimii fișierului și a verificării tipului de fișier.

### Executând Binare în interiorul `asar` Arhivă

Există API-uri Node care pot executa binare ca `child_process.exec`, `child_process.spawn` și `child_process. xecFile`, dar numai `execFile` este acceptat pentru a executa binare înăuntrul arhivei `asar`.

Acest lucru se datorează faptului că `exec` și `spawn` acceptă comanda `` în loc de `fișierul` ca intrare, Comanda și ``sunt executate sub shell. Nu există o modalitate sigură de a determina dacă o comandă folosește un fișier în arhiva asar, și chiar dacă o facem, nu putem fi siguri dacă putem înlocui calea de comandă fără efecte secundare.

## Adăugare fişiere despachetate la `asar` Arhive

După cum s-a menţionat mai sus, unele API-uri Node vor dezarhiva fişierul în sistemul de fişiere atunci când este apelat. Apart from the performance issues, various anti-virus scanners might be triggered by this behavior.

Ca o soluţie, puteţi lăsa diverse fişiere neambalate folosind opţiunea `--unpack`. În următorul exemplu, librăriile de module native Node.js nu vor fi ambalate:

```sh
$ asar pack app app.asar --unpack *.node
```

După ce rulați comanda, veți observa că un folder numit `app.asar.unpacked` a fost creat împreună cu fișierul `app.asar`. Conține fișierele neambalate și ar trebui expediate împreună cu arhiva `app.asar`.

[asar]: https://github.com/electron/asar
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
