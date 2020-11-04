# Applicatie Packaging

Om [issues](https://github.com/joyent/node/issues/6960) rond lange padnamen op Windows te mitigeren, iets sneller `vereisen` en verbergen van uw broncode voor verplichte inspectie, je kan ervoor kiezen om je app in een archief [as](https://github.com/electron/asar) te verpakken met weinig wijzigingen in je broncode.

De meeste gebruikers krijgen deze functie gratis omdat het wordt ondersteund vanuit het vak door [`electron-packager`](https://github.com/electron/electron-packager), [`electron-forge`](https://github.com/electron-userland/electron-forge), en [`electron-builder`](https://github.com/electron-userland/electron-builder). Als je geen van deze tools gebruikt, lees dan op.

## Genereren van `asar` Archieven

Een [asar](https://github.com/electron/asar) archief is een simpel tar-achtig formaat dat bestanden samenvoegt met tot een enkel bestand. Electron kan willekeurige bestanden ervan lezen zonder het hele bestand uit te pakken.

Stappen om je app te verpakken in een `asar` archief:

### 1. Installeer de asar Utility

```sh
$ npm install -g asar
```

### 2. Pakket met `asar pack`

```sh
$ asar pack your-app app.asar
```

## Gebruik `asar` Archieven

In Electron zijn er twee sets API's: Node API's provided by Node.js and Web API's provided by Chromium. Beide API's ondersteunen het lezen van bestanden van `asar` archieven.

### Node API

Met speciale patches in Electron, node API's zoals `fs. eadFile` en `vereisen` trad `asar` archieven als virtuele mappen en de bestanden als normale bestanden in het bestandssysteem.

Stel bijvoorbeeld dat we een `example.asar` archief hebben onder `/path/to`:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

Lees een bestand in het `asar` archief:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

Toon alle bestanden onder de root van het archief:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

Gebruik een module uit het archief:

```javascript
require('./path/to/example.asar/dir/module.js')
```

Je kunt ook een webpagina weergeven in een `asar` archief met `Browservenster`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

Op een webpagina kunnen bestanden in een archief worden opgevraagd met het `bestand:` protocol. Net als de Node API, worden `asar` archieven behandeld als directories.

Bijvoorbeeld, om een bestand te krijgen met `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### Een `asar` archief behandelen als een normaal bestand

Voor sommige gevallen, zoals het verifiëren van de `asar` archief, checksum, we moeten de inhoud van een `asar` archief als een bestand lezen. Met dit doel kunt u de ingebouwde `original-fs` module gebruiken, die originele `fs` API's biedt zonder `asar` ondersteuning:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

Je kunt het proces `ook instellen. oAsar` tot `true` om de ondersteuning voor `alsar` in de `fs` module uit te schakelen:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Beperkingen van de Node API

Ook al hebben we hard geprobeerd om `asar` archieven in Node API zo veel mogelijk te maken, zoals mappen er zijn nog steeds beperkingen vanwege de lage kwaliteit van de Node API.

### Archief is alleen-lezen

Het archief kan niet worden gewijzigd zodat alle Node API's die bestanden kunnen wijzigen niet werken met `as` archieven.

### Werkingsmap kan niet worden ingesteld op mappen in het archief

Hoewel `as` archieven worden behandeld als directories, zijn er geen echte mappen in het bestandssysteem. dus je kunt nooit de werkmap mappen instellen in `asar` archieven. Het doorgeven ervan als de `cwd` optie van sommige API's veroorzaakt ook fouten.

### Extra uitpakken van sommige API's

Meeste `fs` API's kunnen een bestand lezen of informatie van een bestand ophalen uit `asar` archieven zonder uitpakking, maar voor sommige API's is dat afhankelijk van het doorgeven van het echte bestandspad aan onderliggende systeemoproepen, Electron zal het benodigde bestand uitpakken in een tijdelijk bestand en het pad van het tijdelijke bestand doorgeven aan de API's om ze te laten werken. Dit voegt een beetje overhead toe voor deze API's.

API's die extra uitpakken vereist zijn:

* `kind_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - Gebruikt door `vereisen` op native modules

### Nep Stat Informatie van `fs.stat`

De `Statistieken` object geretourneerd door `fs. tat` en haar vrienden op bestanden in `asar` archieven worden gegenereerd door te raden omdat deze bestanden niet bestaan in het bestandssysteem . Dus je moet het object `Statistieken` niet vertrouwen, behalve voor het verkrijgen van bestand grootte en het controleren van het bestandstype.

### Het uitvoeren van Binaries in `asar` Archief

Er zijn Node API's die binaries kunnen uitvoeren zoals `child_process.exec`, `child_process.spawn` en `child_process. xecFile`, maar alleen `execFile` is ondersteund voor het uitvoeren van binaries binnen `as` archief.

Dit komt omdat `exec` en `spawn` `commando` in plaats van `bestand` als invoer accepteren en `commando`s worden uitgevoerd onder shell. Er is geen betrouwbare manier om te bepalen of een commando een bestand gebruikt in het asar archief, en zelfs als we dat wel doen, we kunnen niet zeker zijn of we het pad zonder bijwerkingen in de command kunnen vervangen.

## Voeg uitgepakte bestanden toe aan `asar` Archieven

Zoals hierboven vermeld, sommige Node API's zullen het bestand uitpakken naar het bestandssysteem wanneer wordt aangeroepen. Afgezien van de prestatieproblemen, kunnen diverse antivirusscanners door dit gedrag worden geactiveerd.

Als werktuig kun je verschillende bestanden uitpakken via de `--unpack` optie. In het volgende voorbeeld worden gedeelde bibliotheken van native Node.js modules niet verpakt:

```sh
$ asar pack app app.asar --unpack *.node
```

Na het uitvoeren van het commando, zal je merken dat een map met de naam `app.asar.unpacked` samen met het `app.asar` bestand is gemaakt. Het bevat de uitgepakte bestanden en moet samen met het `app.asar` archief worden verzonden.

