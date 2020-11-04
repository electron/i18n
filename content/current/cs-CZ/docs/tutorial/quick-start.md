# Průvodce rychlým startem

## Rychlý start

Electron je framework, který umožňuje vytvářet desktopové aplikace pomocí JavaScript, HTML, a CSS. Tyto aplikace pak mohou být baleny tak, aby běžely přímo na macOS, Windows, Linuxu nebo přes Mac App Store nebo Microsoft Store.

Obvykle vytváříte desktopovou aplikaci pro operační systém (OS) pomocí specifických nativních aplikačních rámců každého operačního systému. Electron umožňuje psát vaši aplikaci jednou pomocí technologií, které již znáte.

### Prerequisites

Než budete pokračovat s Electronem, musíte nainstalovat [Node.js](https://nodejs.org/en/download/). Doporučujeme nainstalovat nejnovější `LTS` nebo `aktuální` verzi.

> Nainstalujte si prosím Node.js pomocí předkompilovaných instalátorů pro vaši platformu. V opačném případě se můžete setkat s problémy s nekompatibilitou s různými vývojovými nástroji.

Chcete-li zkontrolovat, že Node.js byl správně nainstalován, zadejte následující příkazy do vašeho terminálu klienta:

```sh
uzel -v
npm -v
```

Příkazy by měly odpovídajícím způsobem vytisknout verze Node.js a npm. Pokud oba příkazy uspějí, jste připraveni nainstalovat Electron.

### Vytvořit základní aplikaci

Z vývojového hlediska, Electron aplikace je v podstatě aplikace Node.js. To znamená, že výchozím bodem vaší Electron aplikace bude soubor `package.json` jako v jakékoliv jiné aplikaci Node.js. minimální elektronická aplikace má tuto strukturu:

```plain
muj-elektronická aplikace/
<unk> ，package.json
<unk> ázázázej, main.js
<unk> ázú index.html
```

Vytvořme základní aplikaci založenou na výše uvedené struktuře.

#### Install Electron

Vytvořte složku pro váš projekt a nainstalujte si tam Electron:

```sh
mkdir my-electron-app && cd my-electron-app
npm init -y
npm i --save-dev electron
```

#### Vytvořit hlavní soubor skriptu

Hlavní skript specifikuje vstupní bod vaší Electron aplikace (v našem případě soubor `main.js` , který spustí hlavní proces. Skript, který běží v hlavním procesu, obvykle řídí životní cyklus aplikace, zobrazuje grafické uživatelské rozhraní a jeho prvky, provádí interakce nativního operačního systému a vytváří procesy Renderer na webových stránkách. Electron aplikace může mít pouze jeden hlavní proces.

Hlavní skript může vypadat takto:

```js
const { app, BrowserWindow } = require('electron')

funkce createWindow () {
  const win = new BrowserWindow({
    wide: 800,
    výška: 600,
    webPreference: {
      nodeIntegration: true
    }
  })

  vyhrává. oadFile('index.html')
  win.webContents.openDevTools()
}

aplikace. henReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform!== 'darwin') {
    app. uit()
  }
})

app.on('activate', () => {
  if (BrowserWindow. etAllWindows().length === 0) {
    createWindow()
  }
})
```

##### Co se děje výše?

1. Řádek 1: Nejprve importujete moduly `aplikace` a `BrowserWindow` balíčku `electron` , abyste mohli spravovat životní cyklus vaší aplikace, stejně jako vytváření a ovládání oken prohlížeče.
2. 3. řádek: Poté definujete funkci, která vytváří [nové okno prohlížeče](../api/browser-window.md#new-browserwindowoptions) s povolenou integrací uzlu, načte `index. tml` soubor do tohoto okna (řádek 12, budeme diskutovat o souboru později) a otevře Nástroje vývojáře (řádek 13).
3. Řádek 16: Vytvoříte nové okno prohlížeče vyvoláním funkce `createWindow` , jakmile je Electron aplikace [inicializována](../api/app.md#appwhenready).
4. Řádek 18: Přidáte nový posluchač, který se pokouší ukončit aplikaci, když již nemá žádná otevřená okna. Tento posluchač je no-op na macOS kvůli [řízení oken systému](https://support.apple.com/en-ca/guide/mac-help/mchlp2469/mac).
5. Řádek 24: Přidáte nový posluchač, který vytvoří nové okno prohlížeče, pouze pokud aplikace nemá po aktivaci žádná viditelná okna. Například po prvním spuštění aplikace nebo po opětovném spuštění již spuštěné aplikace.

#### Vytvořit webovou stránku

Toto je webová stránka, kterou chcete zobrazit po inicializaci aplikace. Tato webová stránka představuje proces vykreslování. Můžete vytvořit více oken prohlížeče, kde každé okno používá vlastní nezávislé vykreslování. Každé okno může být uděleno s plným přístupem k Node.js API prostřednictvím předvolby `nodeIntegration`.

`index.html` stránka vypadá takto:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
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

#### Upravte soubor balíčku .json

Vaše Electron aplikace používá soubor `package.json` jako hlavní vstupní bod (jako jakákoli jiná aplikace Node.js). Hlavní skript vaší aplikace je `main.js`, takže podle toho upravte soubor `package.json`:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js"
}
```

> POZNÁMKA: Pokud je vynecháno pole `hlavní` Electron se pokusí načíst index `. s` soubor z adresáře obsahujícího `package.json`.

Ve výchozím nastavení příkaz `npm start` spustí hlavní skript s Node.js. Chcete-li spustit skript s Electronem, musíte jej změnit:

```json
{
    "name": "my-electron-app",
    "version": "0.1.0",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    }
}
```

#### Spustit aplikaci

```sh
npm start
```

Vaše spuštěná aplikace Electron by měla vypadat takto:

![Simplest Electron aplikace](../images/simplest-electron-app.png)

### Balík a rozesílat aplikaci

Nejjednodušší a nejrychlejší způsob, jak distribuovat nově vytvořenou aplikaci, je použití [Electron Forge](https://www.electronforge.io).

1. Importujte Electron Forge do složky aplikace:

    ```sh
    npx @electron-forge/cli import

    ✔ Kontrola vašeho systému
    ✔ Initializing Git Repository
    ✔ Writing modified package. syn soubor
    ✔ Instalace závislostí
    ✔ zápis modifikovaného balíčku. syn soubor
    ✔ Oprava . ignorovat

    Máme ATTEMPTED pro převod vaší aplikace ve formátu, kterému elektronická forge rozumí.

    Děkujeme, že používáte "elektronické"!!!
    ```

1. Vytvořit distribuovatelný:

    ```sh
    npm run make

    > my-gsod-electron-app@1.0. make /my-electron-app
    > electron-forge make

    ✔ Checking your system
    ✔ Resolving Forge Config
    We need to packing your application before we can make it
    ✔ Preparing to Package Application for arche: x64
    ✔ Preparing native dependencies
    ✔ Packaging Application
    Making for the following targets: zip
    ✔ zip - On platform: darwin - For arch: x64
    ```

    Electron-forge vytvoří složku `mimo` kde bude váš balíček umístěn:

    ```plain
    // Příklad pro MacOS
    od/
    <unk> (<unk> <unk> <unk> <unk> <unk> <unk> <unk> <unk> <unk> <unk> /zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    <unk> <unk> <unk> <unk> <unk> <unk> <unk> <unk> <unk> <unk> ...
    <unk> ázázázky/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

## Učit se základy

Tato sekce vás vede přes základy fungování Electronu pod hoodou. Jeho cílem je posílit znalosti o Electronu a aplikaci, která byla vytvořena dříve v sekci Rychlý start.

### Architektura aplikace

Elektron se skládá ze tří hlavních pilířů:

* **Chromium** pro zobrazení webového obsahu.
* **Node.js** pro práci s místním souborovým systémem a operačním systémem.
* **Vlastní API** pro práci s často potřebnými funkcemi.

Vývoj aplikace s Electron je jako vytváření aplikace Node.js s webovým rozhraním nebo vytváření webových stránek s integrací hladkého Node.js.

#### Hlavní a zobrazovací procesy

Jak již bylo zmíněno, Electron má dva typy procesů: Hlavní a Renderer.

* Hlavní proces **vytváří** webové stránky vytvořením instancí `BrowserWindow`. Každá instance `BrowserWindow` spustí webovou stránku v procesu Renderer. Když je zničena instance `BrowserWindow` , ukončí se také odpovídající proces vykreslování.
* Hlavní proces **spravuje** všechny webové stránky a jejich odpovídající procesy Renderer.

----

* Proces vykreslování **spravuje** pouze odpovídající webovou stránku. Pád v jednom procesu vykreslování nemá vliv na ostatní procesy vykreslování.
* Proces Renderer **komunikuje** s hlavním procesem přes IPC pro provádění operací GUI na webové stránce. Volání nativních API souvisejících s GUI z procesu Renderer je omezeno kvůli obavám z bezpečnosti a možnému úniku zdrojů.

----

Komunikace mezi procesy je možná prostřednictvím modulů Inter-Process Communication (IPC): [`ipcMain`](../api/ipc-main.md) a [`ipcRenderer`](../api/ipc-renderer.md).

#### API

##### Electron API

Electron API je přiřazena na základě typu procesu, znamená, že některé moduly mohou být použity buď z hlavního nebo Renderer a některé z nich. Dokumentace API Electronu uvádí, ze kterého procesu lze každý modul použít.

Například pro přístup k Electron API v obou procesech je třeba zahrnout modul:

```js
const elektronron = vyžadováno ('elektron')
```

Chcete-li vytvořit okno, zavolejte do třídy `BrowserWindow` , která je dostupná pouze v hlavním procesu:

```js
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
```

Chcete-li zavolat hlavní proces z aplikace Renderer, použijte modul IPC:

```js
// V hlavním procesu
const { ipcMain } = require('electron')

ipcMain.handle('perform-action', (event ...args) => {
  // ... podniká kroky jménem Renderer
})
```

```js
// V procesu Renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

> POZNÁMKA: Protože procesy vykreslování mohou spustit nedůvěryhodný kód (zejména od třetích stran), je důležité pečlivě potvrdit požadavky, které přicházejí do hlavního procesu.

##### Node.js API

> POZNÁMKA: Pro přístup k Node.js API z procesu Renderer musíte nastavit `nodeIntegration` preference na `true`.

Electron vystavuje plný přístup k Node.js API a jeho modulům jak v hlavních procesech, tak v procesu Renderer. Například můžete číst všechny soubory z kořenového adresáře:

```js
const fs = require('fs')

const root = fs.readdirSync('/')

console.log(root)
```

Chcete-li použít modul Node.js, musíte jej nejdříve nainstalovat jako závislost:

```sh
npm install --save aws-sdk
```

Potom ve vaší aplikaci Electron vyžaduje modul:

```js
const S3 = vyžadováno ('aws-sdk/clients/s3')
```
