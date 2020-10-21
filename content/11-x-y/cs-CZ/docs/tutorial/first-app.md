# Vytvoření první aplikace

Electron vám umožňuje vytvářet desktopové aplikace za pomocí čistého JavaScriptu s použitím bohaté nabídky nativních API (operačního systému). Lze to chápat jako variantu Node.js zaměřenou na vytváření desktopových aplikací namísto webových.

To neznamená, že Electron je JavaScript vázaný na knihovny grafického uživatelského rozhraní (GUI). Místo toho, Electron využívá webové stránky jako GUI, takže by jste to mohli vidět jako ořezaný prohlížeč Chromium kontrolovaný JavaScriptem.

**Poznámka**: Tento příklad je také dostupný jako úložiště který si můžete [stáhnout a spustit ihned](#trying-this-example).

Pokud jde o vývoj, aplikace Elektronu je v podstatě Node.js aplikace. Začínající bod je soubor `package.json`, který je identický s tím, který vytváří Node.js. Nejvíce jednoduchá Electron aplikace by měla následující strukturu složek:

```plaintext
your-app/
├── package.json
├── main.js 
└── index.html
```

Vytvořte novou složku pro Vaší Electron aplikaci. Otevřte příkazovou řádku a spusťte příkaz `npm init` ve Vámi vytvořené složce.

```sh
npm init
```

npm skript vytvoří základní `package.json` soubor na základě Vámi zadaných dat. Příkaz, který je uveden (v package. json) v položce `main` je startup skriptem Vaší aplikace. An example of your `package.json` might look like this:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Poznámka__: Pokud položka `main` neexistuje v `package.json`, Electron se pokusí spustit`index.js` (stejně jako v případě Node.js).

Ve výchozím nastavení by `npm start` spustil hlavní skript s Node.js. aby běžel s Electron, můžete přidat `start` skript:

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

## Instalování Electronu

V tomto okamžiku budete muset nainstalovat samotný `elektroron`. Doporučeným způsobem je nainstalovat ji jako vývojovou závislost ve vaší aplikaci, které vám umožní pracovat na více aplikacích s různými verzemi Electronu. Chcete-li tak učinit, spusťte následující příkaz z adresáře aplikace:

```sh
npm install --save-dev electron
```

Existují jiné prostředky pro instalaci Electronu. Podívejte se prosím na [instalační příručku](installation.md) pro informace o použití pomocí proxies, mirrors, a vlastních keší.

## Vývoj pro Electron v kostce

Electron aplikace jsou vyvinuty v JavaScriptu pomocí stejných principů a metod nalezených ve vývoji Node.js. Všechny API a funkce nalezené v Electronu jsou přístupné v modulu `elektroron` , který může být vyžadován jako kterýkoliv jiný uzel. s modul:

```javascript
const elektronron = vyžadováno ('elektron')
```

Modul `elektroron` odhaluje funkce v jmenných prostorech. Jako příklad, životní cyklus aplikace je spravován prostřednictvím `elektroniky. pp`, okna mohou být vytvořena pomocí třídy `electron.BrowserWindow`. Jednoduchý soubor `main.js` může počkat , než bude aplikace připravena a otevře okno:

```javascript
const { app, BrowserWindow } = require('electron')

funkce createWindow () {
  // Create the browser window.
  const win = nový BrowserWindow({
    šířka: 800,
    výška: 600,
    webPreference: {
      nodeIntegration: true
    }
  })

  // a načtěte index.html aplikace.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

`main.js` by měl vytvářet okna a zpracovávat všechny systémové události, s nimiž se může setkat vaše aplikace. Komplexnější verze výše uvedeného příkladu může otevřít nástroje pro vývojáře a ovládat zavřené okno, nebo znovu vytvořit okna na macOS pokud uživatel klikne na ikonu aplikace v doku.

```javascript
const { app, BrowserWindow } = require('electron')

funkce createWindow () {
  // Create the browser window.
  const win = nový BrowserWindow({
    šířka: 800,
    výška: 600,
    webPreference: {
      nodeIntegration: true
    }
  })

  // a načtěte index.html aplikace.
  win.loadFile('index.html')

  // Otevřete DevTools.
  win.webContents.openDevTools()
}

// Tato metoda bude volána po dokončení Electronu
// inicializaci a je připravena k vytvoření oken prohlížeče.
// Některé API mohou být použity pouze po této události.
app.whenReady().then(createWindow)

// Ukončit po zavření všech oken, kromě macOS. Tam je běžné
// pro aplikace a jejich menu zůstat aktivní dokud uživatel neukončí
// explicitně s Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform!== 'darwin') {
    app. uit()
  }
})

aplikace. n('aktivovat', () => {
  // Na macOS je běžné znovu vytvořit okno v aplikaci po kliknutí na ikonu
  // doku a žádná další okna nejsou otevřena.
  pokud (BrowserWindow.getAllWindows(). Délka === 0) {
    createWindow()
  }
})

// V tomto souboru můžete zahrnout zbytek hlavního procesu vaší aplikace
// code. Můžete je také vložit do samostatných souborů a vyžadovat je zde.
```

Konečně `index.html` je webová stránka, kterou chcete zobrazit:

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

## Spuštění vaší aplikace

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Vyzkoušejte tento příklad

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`][quick-start] repository.

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

```sh
# Klonovat úložiště
$ klonování https://github. om/electron/electron-quick-start
# Jděte do repozitáře
$ cd electron-quick-start
# Install dependencies
$ npm install
# Spustit aplikaci
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation][boilerplates].

[quick-start]: https://github.com/electron/electron-quick-start
[boilerplates]: ./boilerplates-and-clis.md
