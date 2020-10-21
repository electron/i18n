# Widevine CDM testen

In Electron kunt u de Widevine CDM bibliotheek gebruiken die met Chrome browser wordt verzonden.

Widevine Content Decryption Modules (CDMs) zijn hoe streaming services inhoud beschermen met HTML5 video naar webbrowsers zonder te vertrouwen op een NPAPI plugin zoals Flash of Silverlight. Widevine ondersteuning is een alternatieve oplossing voor streamingdiensten die momenteel afhankelijk zijn van Silverlight voor het afspelen van DRM-beschermde video-inhoud. Hiermee kunnen websites DRM-beschermde video inhoud in Firefox weergeven zonder het gebruik van NPAPI plugins. Het Widevine CDM werkt in een open-source CDM sandbox die betere gebruikersbeveiliging biedt dan NPAPI plugins.

#### Opmerking op VMP

Vanaf [`Electron v1.8. (Chrome v59)`](https://electronjs.org/releases#1.8.1), onderstaande stappen zijn mogelijk slechts enkele van de noodzakelijke stappen om Widevine in te schakelen; elke app die de Widevine CDM wil gebruiken moet ondertekend zijn met behulp van een licentie verkregen van [Widevine](https://www.widevine.com/) zelf.

Per [Widevine](https://www.widevine.com/):

> Chrome 59 (en later) bevat ondersteuning voor Geverifieerde Media Path (VMP). VMP biedt een methode om de authenticiteit van een apparaat te verifiëren. Voor browser implementaties zal dit een extra signaal zijn om te bepalen of een browsergebaseerde implementatie betrouwbaar en veilig is.
> 
> De proxy-integratiegids is bijgewerkt met informatie over VMP en hoe licenties te verstrekken.
> 
> Widevine raadt onze browsergebaseerde integraties (leveranciers en browsergebaseerde applicaties) aan om ondersteuning voor VMP toe te voegen.

Om het afspelen van video's met deze nieuwe beperking in te schakelen, [castLabs](https://castlabs.com/open-source/downstream/) heeft een [vork](https://github.com/castlabs/electron-releases) gemaakt die de noodzakelijke wijzigingen heeft doorgevoerd om Widevine te kunnen spelen in een Electron applicatie als de benodigde licenties heeft verkregen van widevine.

## De bibliotheek ophalen

Open `chrome://components/` in Chrome browser, zoek `Widevine Content Decryption Module` en zorg ervoor dat het up-to-date is dan vindt u de bibliotheekbestanden uit de toepassingsmap.

### In Windows

The library file `widevinecdm.dll` will be under `Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` directory.

### On MacOS

Het bibliotheekbestand `libwidevinecdm.dylib` zal onder `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86* /` directory.

**Opmerking:** Zorg ervoor dat chrome versie gebruikt door Electron groter is dan of gelijk is aan de `min_chrome_version` waarde van Chrome's widevine cdm component. De waarde kan worden gevonden in de `manifest.json` onder `WidevineCdm` map.

## De bibliotheek gebruiken

Na het ophalen van de bibliotheek bestanden moet u het pad doorgeven naar het bestand met `--widevine-cdm-pad` command line switch, en de bibliotheek versie met `--widevine-cdm-versie` wissel. De command line schakelt over op voordat de `event` van `app` module wordt uitgezonden.

Voorbeeld code:

```javascript
const { app, BrowserWindow } = require('electron')

// U moet de map doorgeven die breedvine bibliotheek bevat, het is
// * `libwidevinecdm. ylib` op macOS,
// * `widevinecdm.dl` op Windows.
app.commandLine.appendSwitch('widevine-cdm-pad', '/path/to/widevine_library')
// De versie van de plugin kan worden ontvangen van de `chrome://components` pagina in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## Widevine CDM-ondersteuning verifiëren

Om te controleren of breedvine werkt, kan je de volgende manieren gebruiken:

* Open https://shaka-player-demo.appspot.com/ en laad een manifest dat `Widevine` gebruikt.
* Open http://www.dash-player.com/demo/drm-test-area/, controleer of de pagina zegt `bitdash Widevine gebruikt in je browser`en speel daarna de video.
