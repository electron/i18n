# Aplikace balení

To mitigate [issues](https://github.com/joyent/node/issues/6960) around long path names on Windows, slightly speed up `require` and conceal your source code from cursory inspection, you can choose to package your app into an [asar][asar] archive with little changes to your source code.

Most users will get this feature for free, since it's supported out of the box by [`electron-packager`][electron-packager], [`electron-forge`][electron-forge], and [`electron-builder`][electron-builder]. Pokud nepoužíváte žádný z těchto nástrojů, přečtěte si to.

## Generování `asar` Archivy

An [asar][asar] archive is a simple tar-like format that concatenates files into a single file. Electron může číst libovolné soubory bez rozbalování celého souboru.

Kroky k balení vaší aplikace do archivu `asar`:

### 1. Nainstalovat asar nástroj

```sh
$ npm install -g asar
```

### 2. Balíček s `sadou asarů`

```sh
$ asar balíček tvoje aplikace
```

## Použití `asar` Archivy

V Electronu jsou dva soubory API: API uzlu poskytuje Node.js a Web API, které poskytuje Chromium. Obě API podporují čtení souborů z `asar` archivů.

### API uzlu

Se speciálními záplatami v Electronu, Node API jako `fs. eadFile` a `vyžaduje` přistupovat k `asarů` archivům jako k virtuálním adresářům, a soubory v něm jako normální soubory v souborovém systému.

Předpokládejme například, že máme archiv `příklad.asar` pod `/cesta/to`:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

Číst soubor v archivu `asar`:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

Seznam všech souborů v kořenovém adresáři archivu:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

Použít modul z archivu:

```javascript
vyžaduje('./cesta/do/example.asar/dir/module.js')
```

Můžete také zobrazit webovou stránku v `asaru,` archivu s `BrowserWindow`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

Na webové stránce mohou být soubory v archivu požadovány pomocí `souboru:` protokolu. Stejně jako API uzlu jsou i archivy `asar` považovány za adresáře.

Například, chcete-li získat soubor s `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### Nakládání s `asarem` Archivovat jako normální soubor

V některých případech, jako je ověření kontroly `asar` , archivu musíme si přečíst obsah asaru `` archivu jako soubor. Za tímto účelem můžete použít vestavěný modul `original-fs` , který poskytuje originální `fs` API bez `asar` : podpora:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

You can also set `process.noAsar` to `true` to disable the support for `asar` in the `fs` module:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Omezení Node API

I když jsme se snažili udělat `asar` archivy v uzlu API co nejvíce fungují jako adresáře, stále existují omezení z důvodu nízké úrovně API.

### Archivy jsou pouze pro čtení

Archivy nelze upravit, takže všechny API, které mohou měnit soubory, nebudou fungovat s `asar` archivy.

### Pracovní adresář nemůže být nastaven na adresáře v archivu

Ačkoli `asar` archivy jsou považovány za adresáře, v souborovém systému neexistují žádné adresáře, takže nikdy nemůžete nastavit pracovní adresář na adresáře v archivech `asar`. Jejich předáním jako možnost `cwd` některých API také způsobí chyby.

### Extra rozbalit na některá API

Většina `fs` API může číst soubor nebo získat informace o souboru z `asar` archivů bez rozbalení, ale pro některé API, které spoléhají na převedení skutečné cesty souboru na základní systémová volání, Electron rozbalí potřebný soubor do dočasného souboru a předá cestu dočasného souboru API, aby fungoval . Toto přidává trochu režijní náklady pro tato API.

API, která vyžaduje další rozbalení:

* `dět_proces.execFile`
* `dítě_proces.execFileSync`
* `fs.open`
* `fs.openSync`
* `proces.dlopen` - používá `vyžadovat` na nativních modulech

### Informace o falešných Stat `fs.stat`

`Statistika` objekt vrácen `fs. tat` a jeho přátelé na souborech v `asar` archivy jsou generovány odhadem, protože tyto soubory v souborovém systému neexistují. Neměli byste tedy důvěřovat objektu `statistiky` kromě získání souboru velikosti a kontroly typu souboru.

### Provádění binárních souborů uvnitř `asar` Archiv

Existují Node API, které mohou spouštět binární soubory jako `child_process.exec`, `child_process.spawn` a `child_process. xecFile`, ale pouze `execFile` je podporováno pro provádění binárních souborů uvnitř `asar` archivu.

Důvodem je to, že `exec` a `spawn` přijmout `příkaz` namísto `souboru` jako vstup, a `příkazy`s jsou prováděny pod skořápkou. Neexistuje žádný spolehlivý způsob, jak určit, zda příkaz používá soubor v archivu, a to i v případě, že ano, nemůžeme si být jisti, zda můžeme cestu nahradit bez vedlejších efektů.

## Přidávání nebalených souborů do `asar` archivů

Jak bylo uvedeno výše, některé API uzlu odbalí soubor do souborového systému při volání. Apart from the performance issues, various anti-virus scanners might be triggered by this behavior.

Jako řešení můžete ponechat různé soubory rozbalené pomocí volby `--unpack`. V následujícím příkladu nebudou sdílené knihovny modulů nativní Node.js zabaleny:

```sh
$ asar pack app app.asar --unpack *.node
```

Po spuštění příkazu zjistíte, že složka s názvem `app.asar.unpacked` byla vytvořena společně s `, app.asar`. Obsahuje rozbalené soubory a měly by být odeslány společně s archivem `app.asar`.

[asar]: https://github.com/electron/asar
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder

