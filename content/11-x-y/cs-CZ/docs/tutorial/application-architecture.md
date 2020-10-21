# Architektura aplikace Electron

Než se budeme moci ponořit do Electronových API, musíme diskutovat o dvou typech dostupných v Electronu. Jsou zásadně odlišné a důležité pro pochopit.

## Hlavní a zobrazovací procesy

V Electronu se proces, který spouští `package.json`'s `main` script nazývá __hlavní proces__. Skript, který běží v hlavním procesu, může zobrazit GUI vytvořením webových stránek. Electron aplikace má vždy jeden hlavní proces, ale nikdy více.

Vzhledem k tomu, že Electron používá k zobrazování webových stránek Chromium , používá se také vícestupňová architektura. Každá webová stránka v Electronu běží v jeho vlastním procesu, který se nazývá __proces renderer__.

V běžných prohlížečích webové stránky obvykle běží v pískovacím prostředí a nemají přístup k původním zdrojům. Uživatelé Electronu však mají sílu používat Node.js API na webových stránkách, které umožňují interakce s operačním systémem na nižší úrovni .

### Rozdíly mezi hlavním procesem a procesem Renderer

Hlavní proces vytváří webové stránky vytvořením instancí `BrowserWindow`. Každá instance `BrowserWindow` spustí webovou stránku ve svém vlastním přehrávání. Když je zničena instance `BrowserWindow` , je ukončen také odpovídající proces vykreslování .

Hlavní proces spravuje všechny webové stránky a jejich odpovídající renderer procesy. Každý proces rendereru je izolovaný a zajímá se pouze o webovou stránku , která v něm běží.

Na webových stránkách, volání nativní API související s GUI není povoleno, protože správa nativních zdrojů GUI na webových stránkách je velmi nebezpečná a je snadné uvolnit zdroje. Pokud chcete provést operace GUI na webové stránce, proces vykreslování webové stránky musí komunikovat s hlavním procesem, aby požadoval, aby hlavní proces tyto operace provedl.

> #### Postoj: Komunikace mezi procesy
> 
> V elektronce komunikující mezi hlavním procesem a procesem zpracování obrazu probíhá prostřednictvím modulů [`ipcRenderer`](../api/ipc-renderer.md) a [`ipcMain`](../api/ipc-main.md). K dispozici je také časté dotazy [jak sdílet data mezi webovými stránkami][share-data].


## Používání Electron API

Electron nabízí řadu API, která podporuje vývoj desktopové aplikace jak v hlavním procesu, tak v procesu renderování. V obou procesech budete mít přístup k Electronovým API tím, že budete vyžadovat zahrnutý modul:

```javascript
const elektronron = vyžadováno ('elektron')
```

Všem Electron API je přiřazen typ procesu. Mnohé z nich mohou být použity pouze z hlavního procesu a některé pouze z procesu renderer, některé z nich. Dokumentace každého jednotlivého API bude uvádět, ze kterého procesu lze použít.

Okno v Electronu je vytvořeno pomocí `BrowserWindow` . Je k dispozici pouze v hlavním procesu.

```javascript
// Toto bude fungovat v hlavním procesu, ale buďte `undefined` v
// renderer procesu:
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

Vzhledem k tomu, že komunikace mezi procesy je možná, proces rendereru může zavolat hlavní proces k provádění úkolů prostřednictvím IPC.

```javascript
// V hlavním procesu:
const { ipcMain } = require('electron')

ipcMain. andle('perform-action', (event ...args) => {
  // ... do něčeho jménem rendereru ...
})

// V procesu vykreslování:
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('perform-action', ...args)
```

Všimněte si, že kód v rendereru nemusí být důvěryhodný, je proto důležité pečlivě potvrdit v hlavních procesních požadavcích, které pocházejí z renderers, zejména pokud hostí obsah třetích stran.

## Použití Node.js API

Electron vystavuje plný přístup k Node.js jak v hlavním procesu, tak v procesu vykreslování. To má dva důležité důsledky:

1) Všechny API dostupné v Node.js jsou k dispozici v Electronu. Volání následujícího kódu z aplikace Electron:

```javascript
const fs = require('fs')

const root = fs. eaddirSync('/')

// Toto vytiskne všechny soubory na úrovni root-level disku,
// buď '/' nebo 'C:\'.
console.log(root)
```

Jak už možná budete moci odhadnout, to má důležité bezpečnostní důsledky , pokud se někdy pokusíte nahrát vzdálený obsah. You can find more information and guidance on loading remote content in our [security documentation][security].

2) Ve vaší aplikaci můžete použít moduly Node.js. Vyberte si svůj oblíbený npm modul. npm v současné době nabízí největší světové úložiště open-source kódu – schopnost používat dobře udržovaný a testovaný kód, který byl vyhrazen pro serverové aplikace, je jedním z klíčových vlastností Electronu.

Jako příklad použijte oficiální AWS SDK ve vaší aplikaci, byste ji nainstalovali jako závislost:

```sh
npm install --save aws-sdk
```

Potom ve vaší Electronové aplikaci vyžadujte a používejte modul, jako byste vytvořili aplikaci Node.js:

```javascript
// připravený klient S3
const S3 = vyžadováno ('aws-sdk/clients/s3')
```

Je zde jedno důležité upozornění: Node. s moduly (tj. moduly, které vyžadují kompilaci nativního kódu před jejich použitím), budou muset být zkompilovány pro použití s Electronem.

The vast majority of Node.js modules are _not_ native. Pouze 400 z ~650,000 modulů je nativní. However, if you do need native modules, please consult [this guide on how to recompile them for Electron][native-node].

[security]: ./security.md
[native-node]: ./using-native-node-modules.md
[share-data]: ../faq.md#how-to-share-data-between-web-pages
