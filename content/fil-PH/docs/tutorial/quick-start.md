# Madali na pagsisimula

Ang Electron ang nagbibigay-daan para makalikha ng desktop application na may malinis na JavaScript sa pamamagitan ng pagbibigay ng runtime na may rich native (operating system)APIs. Maari mong makita ang mga ito bilang isang variant ng Node.js runtime na nakatuon sa desktop applications na sa halip na mga server ng web.

Hindi ito nangangahulugan na ang Electron ay isang JavaScript na may bisa sa graphical user interface (GUI) libraries. Sa halip, ang Electron ay gumagamit ng mga web pages bilang GUI, kaya pwede mong makita ito bilang isang minimal Chromium browser, kontrolado ng JavaScript.

### Pangunahing Proseso

Sa Electron, ang tawag sa proseso na tumatakbo ay `package.json`'s `main` script **ang mga pangunahing proseso**. Ang iskrip na tumatakbo sa pangunahing proseso ay maaring maipakita ang isang GUI sa pamamagitan ng paggawa ng web pages.

### Proseso ng Tagasalin

Dahil ang Electron ay gumagamit ng Chromium para sa pagpapakita ng web pages, Chromium's multi-process na arkitektura ay ginagamit din. Bawat web page ng Electron ay tumatakbo sa sarili nitong proseso, tinatawag itong **the renderer process**.

Sa normal na mga browsers, ang mga web pages ay karaniwang tumatabko sa sanboxed na kapaligiran at hindi ito pinapayagan na mag access sa native resources. Gayunman , sa mga gumagamit ng Electron ay may kapangyarihan na gamitin ang Node.js APIs sa web pages na nagpapahintulot sa mas mababang antas ng operating system ng interaksyon.

### Ang pagkakaiba ng pangunahing proseso at proseso ng tagasalin

Ang pangunahing proseso and gumagawa ng web pages sa pamamagitan ng `BrowserWindow` instances. Bawat `BrowserWindow` instance ay nagpapatakbo ng web page sa sarili nitong proseso ng tagasalin. Kapag ang `BrowserWindow` instance ay nasira ,ang kaukulang renderer process ay mapuputol din.

Ang pangunahing proceso ay namamahala sa lahat ng web pages at kaukulang mga proseso ng tagasalin. Bawat proseso ng tagasalin ay nakahiwalay at nagmamalasakit lamang sa web page na tumatakbo dito.

Sa web pages, ang pagtawag sa native GUI na may kaugnayan sa APIs ay hindi pinapayagan dahil ang pamamahala ng native GUI resources sa web pages ay lubhang mapanganib at madali itong i leak ang mga resources. Kapag gusto ninyong magsagawa ng GUI operations sa inyung web page, ang proseso ng tagasalin ng web page ay dapat makipag-ugnayan sa pangunahing proseso upang humiling sa pangunahing proseso para magsagawa ng lahat ng operasyon.

Sa Electron, may ilang paraan para makipagusap sa pagitan ng pangunahing proseso at proseso ng tagasalin. Katulad na lng ng [`ipcRenderer`](../api/ipc-renderer.md) at [`ipcMain`](../api/ipc-main.md)modules para sa pagpapadala ng mga mensahe,at sa [remote](../api/remote.md) module para sa RPC style communication. Mayroon ding isang FAQ entry sa [ kung paano magbahagi ng data sa pagitan ng web pages](../faq.md#how-to-share-data-between-web-pages).

## Isulat ang iyong unang Elecron App

Sa pangkalahatan, isang app ng Electron ay nakaayos katulad na lng nito:

```text
iyong-app/
├── package.json
├── main.js
└── index.html
```

Ang format ng `package.json` ay eksakto sa katulad ng Node's modules, at ang iskrip na tinukoy ng `pangunahing`field ay ang mga iskrip sa pagsisimula ng iyong app, na kung saan tatakbo ang pangunahing proseso. Ang halimbawa ng iyong `package.json` ay maaring ganito ang hitsura:

```json
{
  "name"    : "iyong-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Paalala**: kung ang `pangunahing` field ay hindi naroroon sa `package.json`,ang Electron ay magtatangkang i-load ang isang`index.js`.

Ang `main.js` ay dapat lumikha ng windows at hawakan ang system events,isang tipikal na halimbawa :

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

//Panatilihin ang global reference sa window object, kung hindi, ang window ay maaring isarado ng awtomatiko kapag ang JavaScript object ay nakakolekta ng basura.
hayaang manalo

function gumawa ngWindow () {
  // Gumawa ng browser window.
  win = bagong BrowserWindow({width: 800, height: 600})

  // i-load ang index.html sa app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Buksan ang DevTools.
  win.webContents.openDevTools()

  //Emitted kapag sarado na ang window.
  win.on('sarado', () => {
    // Dereference ang window object, karaniwang itago mo ang windows
   //sa isang array kung ang iyong app ay sumusuporta sa multi windows, ito ay ang oras kung kailan mo dapat burahin ang kaukulang elemento.
    win = null
  })
}

// Ang paraang ito ay tinatawag kapag ang Electron ay tapos na
// Inisyalisasyon at handa na itong gumawa ng browser windows.
Ilang APIs ay maari lamang gamitin matapos ang pangyayaring ito ay nangyayari.
app.on('humanda', lumikhangWindow)
Tumigil kapag sarado na ang lahat ng windows.
app.on('window-lahat-sarado', () => {
  // Sa macOS ito ay karaniwan para sa mga aplikasyon at kanilang menu bar
  //para manatiling aktibo hanggang ang gumagamit ay tahasang huminto sa Cmd+Q
  Kung (proseso.platporm !== 'darwin') {

app.on('activate', () => {
  //Sa macOS ito ay karaniwan upang muling lumikha ng window sa app kapag ang 
  //ang dock icon ay nag-click at wla nang iba pang windows na nakabukas.
  kung (win === null) {
    lumikhangWindow()
  }
})
//Sa file na ito pwede mong isama ang iba mo pang app's specific sa pangunahing code. Maari mo rin ilagay ang mga ito sa magkakahiwalay na mga file at dito nangangailangan sila.
```

Sa huli ang`index.html` ay ang web page na gusto mong ipakita:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    Kami ay gumagamit ng node<script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</6.
  </body>
</html>
```

## Patakbuhin ang iyong app

Kapag ginawa mo ang iyong inisyal `main.js`, `index.html`, at `package.json` mga files, Malamang gusto mong patakbuhin ang iyong app ng lokal para masubukan ito at tiyaking na gumagana ito tulad ng inaasahan.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) ay isang `npm`module na naglalaman ng pre-compiled na bersyon ng Electron.

Kapag naka-install ka nito globally sa `npm`, pagkatapos kailangan mo lang na patakbuhin ang mga sumusunud sa iyong app's source directory:

```sh
electron .
```

Kapag naka-install ka nito locally, pagkatapos ay pwede mo nang patakbuhin:

#### macOS/Linux

```sh
$ ./node_modules/.bin/electron .
```

#### Windows

```sh
$ .\node_modules\.bin\electron .
```

#### Node v8.2.0 at sa kalaunan

```sh
$ npx electron .
```

### Manu-mano na-download ang electron Binary

Kapag na-download mo ang Electron na mano-mano, pwede mong magamit ang kasamang binary upang isagawa ang iyong mga app nag direkta.

#### macOS

```sh
$ ./Electron.app/Contents/MacOS/Electron iyong-app/
```

#### Linux

```sh
$ ./electron/electron iyong-app/
```

#### Windows

```sh
$ .\electron\electron.exe iyong-app\
```

`Electron.app`Narito ang bahagi ng release package ng Electron, maari mong madownload ang mga ito mula[dito](https://github.com/electron/electron/releases).

### Tumakbo bilang isang distribusyon

Pagkatapos mong magsulat ng iyong app, pwede kang gumawa ng distribusyon sa pamamagitan ng mga sumusunod na[Application Distribusyon](./application-distribution.md) gabay at pagkatapos isinasagawa ang packaged app.

### Subukan ang mga halimbawang ito

Iclone at magpatakbo ng code sa tutorial sa pamamagitan ng[`electron/electron-madaling-pagsisimula`](https://github.com/electron/electron-quick-start) repository.

**Note**:Tumatakbo ang mga ito na nangangailangan ng [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (na kinabibilangan ng[npm](https://npmjs.org))sa iyong sistema.

```sh
# i-clone ang repository
$ git clone https://github.com/electron/electron-madaling-pagsisimula
# Pumunta sa repository
$ cd electron-madaling-pagsisimula
# I-install dependencies
$ npm install
# Patakbuhin ang app
$ npm simula
```

Para sa iba pang mga halimbawa ng app, tingnan ang[listahan ng mga boilerplates](https://electronjs.org/community#boilerplates)nilikha sa pamamagitan ng mga kahanga-hangang communidad ng electron.