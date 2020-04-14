# Pagpapakete ng aplikasyon

Para maiwasan ang [mga isyu](https://github.com/joyent/node/issues/6960) sa paligid ng mahabang mga pangalan ng path sa Windows, bahagyang bilisan ang `require` para itago ang iyong source code mula sa pinasimpleng inspeksyon, pwede kang pumiling ipakete ang iyong app sa isang [asar](https://github.com/electron/asar) na archive na may maliit na pagbabago sa iyong source code.

Karamihan sa mga tagagamit ay makukuha ang katangiang ito nang libre, dahil sinusuportahan ito sa labas sa pamamagitan ng [`electron-packager`](https://github.com/electron/electron-packager), [`electron-forge`](https://github.com/electron-userland/electron-forge), at [`electron-builder`](https://github.com/electron-userland/electron-builder). Kung hindi mo ginagamit ang kahit alin sa mga kasangkapang ito, magbasa pa.

## Pagbubuo ng mga `asar` na Archive

Ang "[asar](https://github.com/electron/asar) na archive ay isang simpleng ayos tulad ng tar na dinudugtong sa mga payl upang maging isang payl. Ang Elektron ay maaaring basahin ang mga payl na arbitraryo galing dito nang hindi ina-unpack ang buong file.

Mga hakbang para mailagak ang iyong app sa archive ng `asar`:

### 1. I-install ang asar Utility

```sh
$ npm install -g asar
```

### 2. Pakete kasama ang `asar pack`

```sh
$ asar pack your-app app.asar
```

## Paggamit ng mga Archives ng `asar`

In Electron there are two sets of APIs: Node APIs provided by Node.js and Web APIs provided by Chromium. Both APIs support reading files from `asar` archives.

### Node na API

Kasama ang espesyal na mga sa Electron, ang mga Node na API tulad ng `fs.readFile` at `require` ay itinuturing ang archive ng `asar` bilang mga direktoryo ng birtwal, at ang mga file dito at bilang mga normal na mga file sa sistema nito.

Halimbawa, ating ipagpalagay na ang archive na `example.asar` sa ilalim ng `/path/to`:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

Basahin ang file sa archive ng `asar`:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

Ilista ang lahat ng mga filesa ilalim ng ugat ng archive:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

Gumamit ng modyul galing sa archive:

```javascript
require('/path/to/example.asar/dir/module.js')
```

Maaari ring i-display ang pahina ng web sa archive na `asar` kasama ang `BrowserWindow`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web na API

In a web page, files in an archive can be requested with the `file:` protocol. Like the Node API, `asar` archives are treated as directories.

Halimbawa, para makuha ang isang file gamit ang `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### Itinuturing ang Archive ng `asar` bilang Normal na File

Para sa ibang mga kaso tulad ng pagkumpirma sa checksum ng archive ng `asar`, kinakailangan nating basahin ang nilalaman ng archive ng `asar` bilang isang file. Para sa layuning ito, maaaring gumamit ng built-in na modyul ng `original-fs` na nagbibigay ng orihinal na `fs` na mga API nang hindi kasama ang suporta ng `asar`:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

Maaari ring itakda ang `process.noAsar` sa `true` para hindi magamit ang suporta para sa `asar` sa modyul ng `fs`:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Mga Limitasyon ng Node na API

Kahit pa ating subukan na gumawa ng archive ng `asar`, hangga't maaari sa loob ng Node na API tulad ng mga direktoryo, mayroon pa ring mga limitasyon dahil sa natural mababang antas ng "Node API".

### Ang mga Archive ay Read-only

Ang mga archive ay hindi maaaring mabago kaya ang lahat ng mga Node na API na maaaring magbago ng mga file ay hindi gagana sa mga archive ng `asar`.

### Ang Gumaganang Direktoryo ay Hindi Maaaring Itakda sa mga Direktoryo sa Archive

Bagaman, ang mga archive ng `asar` ay itinuturing bilang mga direktoryo, walang aktwal na mga direktoryo sa loob ng sistema ng file, kaya kailanman ay hindi maaaring itakda ang tumatakbong direktoryo sa mga direktoryo sa mga archive ng `asar`. Ang pagpapasa sa kanila bilang opsyon ng `cwd` ng ilang mga API ay magiging dahilan din ng mga mali.

### Dagdag na Unpacking sa Ilang mga API

Karamihan sa `fs` na API ay nakakabasa ng file o kumukuha ng impormasyon ng file galing sa mga archive ng `asar` nang hindi kasama ang unpacking, ngunit para sa ilang mga API na nakadepende sa pagdaan sa totoong path ng file na pinagbabatayan ng pagtawag ng sistema, ang Electron ay ililipat ang mga kailangang file sa pansamantalang file at dadaan sa path ng pansamantalang file patungo sa API para sila ay gumana. Ito ay nagdadagdag ng kaunting overhead para sa mga API na ito.

Ang mga API na nangangailangan ng karagdagang unpacking ay:

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - Ginamit ng `require` sa mga pinagmulang modyul

### Mga Impormasyon ng Fake Stat sa `fs.stat`

Ang `Stats` na bagay na ibinalik ng `ft.stat` at mga kalapit na mga file sa `asar` na archive ay nabuo sa pamamagitan ng paghula, dahil ang mga file na iyon ay hindi umiiral sa filesystem. Kaya hindi dapat pagkatiwalaan ang `Stats` na bagay maliban na lang sa pagkuha ng sukat ng file at pagsusuri sa uri ng file.

### Pagpapagana ng mga Binary sa Loob ng Archive ng `asar`

May mga na Node API na nagpapagana ng mga binary tulad ng `child_process.exec`, `child_process.spawn` at `child_process.execFile`, ngunit ang `execFile` lamang ang nag-iisang sinusuportahan sa pagpapagana ng mga binary sa loob ng archive ng `asar`.

Ito ay dahil sa `exec` at `spawn` na tumatanggap ng `command` sa halip na `file` bilang input, at mga `command` ay pinapagana sa ilalim ng shell. Walang ibang paraan upang matukoy kung ang command ay gumagamit ng payl sa archive ng asar, at kahit gawin natin, hindi tayo makakasiguro kung maaari nating palitan ang path sa command nang walang ibang masamang epekto.

## Pagdaragdag ng mga naka-unpack na mga file sa `asar` na mga Archive

As stated above, some Node APIs will unpack the file to the filesystem when called. Apart from the performance issues, various anti-virus scanners might be triggered by this behavior.

As a workaround, you can leave various files unpacked using the `--unpack` option. In the following example, shared libraries of native Node.js modules will not be packed:

```sh
$ asar pack app app.asar --unpack *.node
```

Pagkatapos paganahin ang utos, mapapansin mo na ang isang folder na pinangalanang `app.asar.unpacked` ay nailikha kasama ang `app.asar` na file. Naglalaman ito ng mga naka-unpack na mga file at dapat ipinadala kasabay ang `app.asar` na archive.

