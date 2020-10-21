# Ghid de pornire rapidă

## Quickstart

Electron este un cadru care îți permite să creezi aplicații desktop cu JavaScript, HTML și CSS. Aceste aplicații pot fi apoi ambalate pentru a rula direct pe macOS, Windows, Linux, sau distribuite prin intermediul Mac App Store sau Microsoft Store.

De obicei, creați o aplicație desktop pentru un sistem de operare (SO) folosind cadrele de aplicații native specifice fiecărui sistem de operare. Electron face posibilă scrierea aplicației odată folosind tehnologii pe care le cunoști deja.

### Cerințe preliminare

Înainte de a continua cu Electron trebuie să instalați [Node.js](https://nodejs.org/en/download/). Vă recomandăm să instalați cea mai recentă versiune `LTS` sau `Versiunea curentă` disponibilă.

> Vă rugăm să instalați Node.js folosind instalatori pre-construiți pentru platforma dvs. În caz contrar, puteți întâlni probleme de incompatibilitate cu diferite instrumente de dezvoltare.

Pentru a verifica dacă Node.js a fost instalat corect, tastați următoarele comenzi în clientul terminalului:

```sh
node -v
npm -v
```

Comenzile ar trebui să afișeze versiunile Node.js și npm în mod corespunzător. Dacă ambele comenzi au reușit, ești gata să instalezi Electron.

### Creați o aplicație de bază

Din perspectiva dezvoltării, o aplicație Electron este în esență o aplicație Node.js. Asta înseamnă că punctul de plecare al aplicației tale Electron va fi un fișier `package.json` ca în orice altă aplicație Node.js. O aplicare Electron minimă are următoarea structură:

```plain
aplicația mey-electron-app/
<unk> χ─ package.json
<unk> ε ─ main.js
<unk> · ─ index.html
```

Să creăm o aplicație de bază bazată pe structura de mai sus.

#### Install Electron

Creați un dosar pentru proiectul dvs. și instalați Electron acolo:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Creați scriptul principal

Scriptul principal specifică punctul de intrare al aplicației tale Electron (în cazul nostru, fișierul `main.js` care va rula procesul principal. De obicei, scriptul care se execută în procesul principal controlează ciclul de viață al aplicației, afișează interfața grafică a utilizatorului și elementele sale, execută interacțiuni native de sistem de operare și crează procese Renderer în pagini web. O aplicație Electron poate avea doar un singur proces principal.

Scriptul principal poate fi următorul:

```js
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    înălțime: 600,
    de preferințe web: {
      nodeIntegration: true
    }
  })

  câștigă. oadFile('index.html')
  win.webContents.openDevTools()
}

app. henReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app. uit()
  }
})

app.on('activate', () => {
  dacă (BrowserWindow. etAllWindows().length === 0) {
    createWindow()
  }
})
```

##### Ce se întâmplă mai sus?

1. Linia 1: Primul, importați modulele `aplicației` și `BrowserWindow` din pachetul `electron` pentru a putea gestiona evenimentele din ciclul de viață al aplicației dvs., crearea și controlul ferestrelor browser-ului.
2. Linia 3: După aceea, definiți o funcție care creează o [nouă fereastră de browser](../api/browser-window.md#new-browserwindowoptions) cu integrarea nodului activată, încarcă indexul `. fișier tml` în această fereastră (linia 12, vom discuta fișierul mai târziu) și deschidem Developer Tools (linia 13).
3. Linia 16: Creezi o nouă fereastră de browser prin utilizarea funcției `createWindow` odată ce aplicația Electron [este inițializată](../api/app.md#appwhenready).
4. Linia 18: Adăugați un nou ascultător care încearcă să închidă aplicația atunci când nu mai are ferestre deschise. Acest ascultător este un macOS de tip "no-op on macOS" din cauza comportamentului [de gestionare a ferestrei](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac).
5. Linia 24: Adăugaţi un nou ascultător care creează o nouă fereastră a browser-ului numai dacă atunci când aplicaţia nu are nicio fereastră vizibilă după ce a fost activată. De exemplu, după lansarea aplicației pentru prima dată, sau după relansarea aplicației care rulează deja.

#### Creaţi o pagină web

Aceasta este pagina web pe care doriți să o afișați odată ce aplicația este inițializată. Această pagină web reprezintă procesul de redare. Puteți crea mai multe ferestre de browser, unde fiecare fereastră utilizează propriul dispozitiv independent de redare. Fiecare fereastră poate fi acordată opțional cu acces deplin la Node.js API prin intermediul preferinței `nodeIntegration`.

Pagina `index.html` arată după cum urmează:

```html
<! OCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Salutare lume!</title>
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
</head>
<body>
    <h1>Bună lumea!</h1>
    Folosim documentul node <script>. rite(process.versions.node)</script>,
    Chrome <script>document.write(process.versions. hrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
</body>
</html>
```

#### Modificați fișierul pachete.json

Aplicația ta Electron folosește fișierul `package.json` ca punct principal de intrare (ca orice altă aplicație Node.js). Scriptul principal al aplicației tale este `main.js`, așa că modifică fișierul `package.json` în consecință:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js"
}
```

> NOTĂ: Dacă câmpul `principal` este omis, Electron va încerca să încarce un index `index. s` fișier din directorul care conține `pachete.json`.

În mod implicit, comanda de pornire `npm` va rula script-ul principal cu Node.js. Pentru a rula scriptul cu Electron, trebuie să îl schimbi ca atare:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }

```

#### Rulează cererea

```sh
start npm
```

Aplicația dvs. Electron care rulează ar trebui să apară după cum urmează:

![Aplicație Electron simplă](../images/simplest-electron-app.png)

### Pachet și distribuire cerere

Cea mai simplă și mai rapidă modalitate de a distribui aplicația nou creată este de a folosi [Electron Forge](https://www.electronforge.io).

1. Importă Electron Forge în folderul de aplicații:

    ```sh
    npx @electron-forge/cli import

    ✔ Verificarea sistemului dvs
    ✔ Inițializarea Repository Git
    ✔ Scrierea pachetului modificat. fisier fir
    ✔ Instalarea dependențelor
    ✔ Scrierea pachetului modificat. Fişier
    ✔ Fixing . Ignorați

    Avem ATTEMPTED pentru a converti aplicația dvs. într-un format pe care electron-forge îl înțelege.

    Mulțumim pentru că folosești "electron-forge"!!!
    ```

1. Creați un distribuitor:

    ```sh
    npm face ca

    > my-gsod-electron-app@1.0. fă /my-electron-app
    > electron-forge face

    ✔ Verificând sistemul tău
    ✔ Rezolvarea Forge Config
    Trebuie să vă ambalăm aplicația înainte de a o putea face
    ✔ Pregătirea cererii pentru arca: x64
    ✔ Pregătirea dependențelor native
    ✔ check_mark: Aplicația Packaging
    Faceți pentru următoarele ținte: zip
    format@@✔ Faceți zip - Pe platforma: dar: 64 - Pentru arca: 64 -
    ```

    Electron-forge creează dosarul `out` unde va fi localizat pachetul tău:

    ```plain
    // Exemplu pentru MacOS
    afară/
    Ribavirin ─ afară/march/zip/darwin/x64/mey-electron-app-darwin-x64-1.0.zip
    <unk> ─ ...
    • ─ ieșire/mea-electronon-app-darwin-x64/mey-electronon-app.app/Contents/MacOS/my-electron-app
    ```

## Învățarea elementelor de bază

Această secţiune vă ghidează prin elementele de bază ale modului în care Electron funcţionează sub îndoire. Acesta vizează consolidarea cunoștințelor despre Electron și despre aplicația creată mai devreme în secțiunea Quickstart.

### Arhitectura aplicației

Electron constă din trei piloni principali:

* **Chromium** pentru afișarea conținutului web.
* **Node.js** pentru lucrul cu sistemul de fișiere local și cu sistemul de operare.
* **API-uri personalizate** pentru lucrul cu funcții native ale OS de care este nevoie frecvent.

Dezvoltarea unei aplicații cu Electron este ca și cum ai construi o aplicație Node.js cu o interfață web sau ai construi pagini web cu integrare fără probleme Node.js.

#### Procese principale și de redare

După cum a fost menționat anterior, Electron are două tipuri de procese: Main și Renderer.

* Procesul principal **creează** pagini web prin crearea instanţelor `BrowserWindow`. Fiecare instanță `BrowserWindow` rulează pagina web în procesul de randare. Atunci când o instanță `BrowserWindow` este distrusă, procesul Randderer corespunzător se oprește, de asemenea.
* Procesul principal **administreaza** toate paginile web si procesele corespunzatoare de randare.

----

* Procesul de randare **gestionează** doar pagina web corespunzătoare. Un crash într-un proces de Renderer nu afectează alte procese de Renderer.
* Procesul de redare **comunică** cu procesul principal prin IPC pentru a efectua operațiuni GUI într-o pagină web. Apelarea API-urilor native legate de UIG din procesul de randare este restricționată direct din cauza problemelor de securitate și a posibilelor scurgeri de resurse.

----

Comunicarea dintre procese este posibilă prin intermediul modulelor Inter-Process Communication (IPC): [`ipcMain`](../api/ipc-main.md) și [`ipcRenderer`](../api/ipc-renderer.md).

#### API

##### Electron API

API-urile Electron sunt atribuite în funcție de tipul de proces, însemnând că unele module pot fi folosite fie din procesul Principal, fie din Renderer, iar altele din ambele. Documentatia API a Electron indica din ce proces poate fi folosit fiecare modul.

De exemplu, pentru a accesa API Electron în ambele procese, necesită modulul său inclus:

```js
const electron = require('electron')
```

Pentru a crea o fereastră, apelează clasa `BrowserWindow` , care este disponibilă doar în procesul principal:

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Pentru a apela procesul principal din Renderer, utilizați modulul IPC:

```js
// În procesul principal
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event, ...args) => {
  // ... fă acțiuni în numele Redatorului
})
```

```js
// În procesul de redare
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> NOTĂ: Deoarece procesele de Renderer pot rula cod neîncrezător (în special de la terți), este important să se valideze cu atenție cererile care vin în procesul principal.

##### Node.js API

> NOTĂ: Pentru a accesa API-ul Node.js din procesul Renderer, trebuie să setați preferința `nodeIntegration` la `true`.

Electron expune accesul complet la Node.js API și modulele sale atât în procesul Principal, cât și în cel de redare. De exemplu, puteţi citi toate fişierele din directorul rădăcină:

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Pentru a utiliza un modul Node.js, trebuie mai întâi să-l instalați ca o dependență:

```sh
npm instalare --save aws-sdk
```

Apoi, în aplicația ta Electron, necesită modulul:

```js
const S3 = require('aws-sdk/clients/s3')
```