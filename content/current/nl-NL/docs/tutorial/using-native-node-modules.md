# Het gebruik van inheemse knooppunt modules

Oorspronkelijke Node modules worden ondersteund door Electron, maar sinds Electron erg is gebruiken waarschijnlijk een andere V8 versie van het Node binary geïnstalleerd op uw systeem. de modules die u gebruikt zullen opnieuw gecompileerd moeten worden voor Electron. Otherwise, you will get the following class of error when you try to run your app:

```sh
Fout: De module '/path/naar/native/module.node'
is gecompileerd tegen een andere Node.js versie met
NODE_MODULE_VERSION $XYZ. Deze versie van Node.js vereist
NODE_MODULE_VERSION $ABC. Probeer de module opnieuw te compileren of opnieuw te installeren
(bijvoorbeeld gebruik van `npm rebuild` of `npm install`).
```

## Hoe installeer je native modules

Er zijn verschillende manieren om native modules te installeren:

### Modules installeren en herbouwen voor Electron

U kunt modules zoals andere Node projecten installeren en vervolgens de modules herbouwen voor Electron met [`elektron-build`](https://github.com/electron/electron-rebuild) pakket. Deze module kan automatisch de versie van Electron bepalen en de handmatige stappen voor het downloaden van headers en het opnieuw bouwen van native modules voor je app afhandelen.

Bijvoorbeeld, het installeren van `electron-build` en het opbouwen van modules met deze via de opdrachtregel:

```sh
npm installeer --save-dev electron-build

# Elke keer dat u "npm installeren", voer dit uit:
./node_modules/. in/electron-build

# Op Windows als u problemen heeft, probeer dan
.\node_modules\.bin\electron-rebuild.cmd
```

Raadpleeg het project voor meer informatie over gebruik en integratie met andere hulpmiddelen.

### Gebruik `npm`

Door enkele omgevingsvariabelen in te stellen, kun je `npm` gebruiken om modules direct te installeren.

Bijvoorbeeld, om alle afhankelijkheden voor Electron: te installeren:

```sh
# Versie van Electron.
exporteer npm_config_target=1.2.3
# De Electron-architectuur, zie https://electronjs.org/docs/tutorial/support#supported-platforms
# voor ondersteunde architecturen.
exporteer npm_config_arch=x64
exporteer npm_config_target_arch=x64
# Download headers voor Electron.
exporteer npm_config_disturl=https://electronjs.org/headers
# Vertel node-pre-gyp dat we bouwen voor Electron.
exporteer npm_config_runtime=electron
# Vertel node-pre-gyp om module uit broncode te bouwen.
exporteer npm_config_build_from_source=true
# Installeer alle afhankelijkheden en sla de cache op naar ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Handmatig bouwen voor Electron

Als je een ontwikkelaar bent die een native module ontwikkelt en deze wil testen tegen Electron, u wilt misschien de module voor Electron handmatig herbouwen. Je kunt direct `node-gyp` gebruiken om te bouwen voor Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp build --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` wijzigingen waar je ontwikkelkoppen kunt vinden.
* `--target=1.2.3` is de versie van Electron.
* `--dist-url=...` geeft aan waar de koppen moeten worden gedownload.
* `--arch=x64` zegt dat de module is gebouwd voor een 64-bit systeem.

### Handmatig bouwen voor een custom build van Electron

Om native Node modules te compileren tegen een aangepaste build van Electron die niet overeenkomt met een publieke release, instructie `npm` om de versie van Node te gebruiken die u hebt gebundeld met uw aangepaste build.

```sh
npm opbouwen --nodedir=/path/to/electron/vendor/node
```

## Probleemoplossen

Als je een originele module hebt geïnstalleerd en vindt dat het niet werkte, moet je de volgende dingen controleren:

* Voer eerst `electron-build` uit.
* Zorg ervoor dat de originele module compatibel is met het doelplatform en architectuur voor je Electron app.
* Zorg ervoor dat `win_delay_load_hook` niet is ingesteld op `false` in de module `binding.gyp`.
* Nadat u Electron heeft geüpdatet, moet u meestal de modules opnieuw opbouwen.

### Een opmerking over `win_delay_load_hook`

In Windows verbindt standaard `node-gyp` native modules met `node.dll`. In Electron 4.x en hoger worden de symbolen die nodig zijn door inheemse modules geëxporteerd door `electron. Bijl`, en er is geen `node.dll`. Om native modules te laden op Windows, `node-gyp` installeert een [vertraging-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) die activeert wanneer de native module wordt geladen, en omleidt het `knooppunt. tot` de referentie om het uitvoerbaar laden te gebruiken in plaats van te zoeken naar `node. ll` in de bibliotheek zoek pad (wat niets zou opstarten). Zodoende is op Electron 4.x en hoger, `'win_delay_load_hook': 'true'` vereist voor het laden van native modules.

Als u een fout krijgt zoals `module heeft zichzelf niet geregistreerd`, of `De opgegeven
procedure kon niet gevonden worden`, het kan betekenen dat de module die je probeert te gebruiken de vertraging-load haak niet correct heeft meegenomen.  Als de module is gebouwd met node-gyp, zorg ervoor dat de `win_delay_load_hook` variabele is ingesteld op `waar` in de `binding. yp` bestand en wordt niet overreden waar dan ook.  Als de module is gebouwd met een ander systeem, je moet er zeker van zijn dat je bouwt met een vertragingslak die geïnstalleerd is in de hoofd `. ode` bestand. Je `link.exe` aanroep zou er als volgt uit moeten zien:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" vertraging.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

Het is met name belangrijk dat:

* je linkt tegen `node.lib` van _Electron_ en niet node. Als je tegen de verkeerde `node.lib` linkt, krijg je load-time fouten wanneer je de module in Electron nodig hebt.
* je vermeldt de vlag `/DELAYLOAD:node.exe`. Indien het `knooppunt. Bijl` link is niet vertraagd dan krijgt de delay-load hook geen kans om te schieten en de symbolen van node zullen niet correct worden opgelost.
* `win_delay_load_hook.obj` is direct gekoppeld aan de uiteindelijke DLL. Als de haak is ingesteld in een afhankelijke DLL, zal het niet op het juiste moment schieten.

Zie [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) voor een voorbeeld vertragingenshook als je eigen implementeert.

## Modules die vertrouwen op `vooraf bouwen`

[`prebuild`](https://github.com/prebuild/prebuild) biedt een manier om native Node modules met vooraf gebouwde binaries te publiceren voor meerdere versies van Node en Electron.

Als modules binaries bieden voor het gebruik in Electron, zorg ervoor dat je `--build-from-source` en de `npm_config_build_from_source` environment variabele weglaat om volledig te profiteren van de voorgebouwde binaries.

## Modules die vertrouwen op `node-pre-gyp`

De [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) biedt een manier om native Node modules met vooraf gebouwde binaries te implementeren, en veel populaire modules gebruiken het.

Meestal werken die modules prima onder Electron, maar soms wanneer Electron een nieuwere versie van V8 dan Node gebruikt en/of er ABI veranderingen, slechte dingen kunnen gebeuren. Dus over het algemeen wordt het aangeraden om altijd inheemse modules te bouwen uit broncode. `elektrisch opbouwen` zorgt ervoor dat je dit automatisch doet.

Als u de `npm` manier volgt van het installeren van modules, dan wordt dit standaard gedaan, zo niet, dan je moet `--build-from-source` to `npm`, of stel de `npm_config_build_from_source` omgeving variabele in.
