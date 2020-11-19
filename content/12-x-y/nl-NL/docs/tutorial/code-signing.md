# Code signeren

Code signing is a security technology that you use to certify that an app was created by you.

Op macOS kan het systeem wijzigingen in de app detecteren, of de wijziging nu per ongeluk of door kwaadwillende code is geïntroduceerd.

In Windows wijst het systeem een vertrouwensniveau toe aan uw code die certificaat als u dat niet hebt, ondertekent of als uw trust level laag is, zal de beveiliging dialogen verschijnen wanneer gebruikers uw applicatie gebruiken.  Vertrouw level bouwt na verloop van tijd, zodat het beter is om zo vroeg mogelijk te beginnen met code-ondertekening.

Hoewel het mogelijk is niet-ondertekende apps te verspreiden, wordt het niet aanbevolen. Zowel Windows als macOS zal standaard de download of uitvoering van niet-ondertekende applicaties voorkomen. Vanaf macOS Catalina (versie 10.15) moeten gebruikers door meerdere handmatige stappen gaan om niet-ondertekende applicaties te openen.

![macOS Catalina Gatekeeper waarschuwing: de app kan niet worden geopend omdat de ontwikkelaar van
niet kan worden geverifieerd](../images/gatekeeper.png)

Zoals je kunt zien, krijgen gebruikers twee opties: de app direct naar de prullenbak verplaatsen of het uitvoeren ervan annuleren. U wilt niet dat uw gebruikers dat dialoogvenster zien.

Als je een Electron app aan het maken bent die je van plan bent te verpakken en te verspreiden, het moet code-signed zijn.

# MacOS builds ondertekenen & notarizen

Het goed voorbereiden van macOS-applicaties voor release vereist twee stappen: ten eerste moet de app worden gecodeerd. Vervolgens moet de app naar Apple worden geüpload voor een proces genaamd "notariisatie", waar geautomatiseerde systemen zullen verifiëren dat uw app niets doet om de gebruikers in gevaar te brengen.

Om het proces te starten, zorg ervoor dat je voldoet aan de eisen voor het ondertekenen en je app notariëren:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Download en installeer [Xcode][] - hiervoor is een computer met macOS vereist
3. Generate, download, and install [signing certificates][]

Elektron's ecosysteem favoriet configuratie en vrijheid, dus er zijn meerdere manieren om je applicatie ondertekend en genotuleerd te krijgen.

## `electron-forge`

Als je de favoriete build tool van Electron, moet je sollicitatie ondertekend en genotificeerd krijgen een paar toevoegingen aan je configuratie. [Forge](https://electronforge.io) is een collectie van de officiële Electron tools, met behulp van [`elektron-packager`][], [`electron-osx-sign`][], en [`elektron-notarize`][] onder de kap.

Laten we een kijkje nemen in een voorbeeldconfiguratie met alle vereiste velden. Niet alle zijn vereist: de gereedschappen zullen slim genoeg zijn om automatisch een geschikte `identiteit`te vinden, , bijvoorbeeld maar wij raden u aan expliciet te zijn.

```json
{
  "name": "my-app",
  "version": "0.0. ",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identiek": "Developer ID applicatie: Felix Rieseberg (LT94ZKYDCJ)",
          "geharde runtime": waar,
          "rechtsplegingen": "aanspraken. lijst",
          "rechten -inerv": "aanspraken. lijst",
          "signer-flags": "bibliotheek"
        },
        "osxNotarize": {
          "appleId": "felix@felix. un",
          "appleIdPassword": "my-apple-id-id-password",
        }
      }
    }
  }
}
```

Het gerefereerde `plist` bestand heeft de volgende macOS-specifieke rechten nodig om de Apple beveiligingsmechanismen te verzekeren dat je app deze dingen doet zonder dat dit iets betekent:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Bekijk de broncode van Electron Fiddle's om dit allemaal in actie te zien, [vooral zijn `electron-forge` configuratie bestand](https://github.com/electron/fiddle/blob/master/forge.config.js).

Als u van plan bent toegang te krijgen tot de microfoon of camera in uw app met behulp van de Electron's API's, dan moet u de volgende rechten toevoegen:

```xml
<key>com.apple.security.device.audioive</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

Als deze niet aanwezig zijn in de rechten van je app wanneer je je inroept, bijvoorbeeld:

```js
const { systemPreferences } = require('electron')

const microfoon = systemPreferences.askForMediaAccess('microfoon')
```

Je app kan crashen. Zie de sectie Grondstoffen Toegang in [Hardened Runtime](https://developer.apple.com/documentation/security/hardened_runtime) voor meer informatie en rechten die je mogelijk nodig hebt.

## `electron-builder`

Electron Builder heeft een aangepaste oplossing voor het ondertekenen van je applicatie. U vindt [de documentatie hier](https://www.electron.build/code-signing).

## `Elektron-verpakker`

Als u geen gebruik maakt van een geïntegreerde bouw pipeline zoals Forge of Builder, u gebruikt waarschijnlijk [`electron-packager`][], met inbegrip van [`elektron-osx-sign`][] en [`elektron-notarize`][].

Als u de Packager's API gebruikt, kunt u [in configuratie doorsturen dat beide tekens en uw applicatie notariëren](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identiteit: 'Developer ID applicatie: Felix Rieseberg (LT94ZKYDCJ)',
    'hard-runtime': waar,
    aanspraken: 'aanspraken. lijst',
    "aanspraken op een erfgoed”: "aanspraken. lijst',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

Het gerefereerde `plist` bestand heeft de volgende macOS-specifieke rechten nodig om de Apple beveiligingsmechanismen te verzekeren dat je app deze dingen doet zonder dat dit iets betekent:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac App Store

See the [Mac App Store Guide][].

# Windows-versies worden ondertekend

Voordat u Windows-versies tekent, moet u het volgende doen:

1. Een Windows Authenticode code ondertekeningscertificaat (jaarlijkse kosten vereist)
2. Installeer Visual Studio om het ondertekeningsinstrument te krijgen (de gratis [Gemeenschap Edition](https://visualstudio.microsoft.com/vs/community/) is genoeg)

Je kunt een code krijgen die een certificaat tekent van veel resellers. Prijzen verschillen, dus het kan uw tijd waard zijn om te winkelen. Populaire resellers zijn:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Koop er onder andere één om er één te vinden die bij u past. Google is uw vriend 😄

Er zijn een aantal tools voor het ondertekenen van je verpakte app:

- [`electron-winstaller`][] zal een installatieprogramma voor vensters genereren en deze aan te melden voor u
- [`Elektron-forge`][] kan installateurs ondertekenen die het genereert via de Squirrel.Windows of MSI-doelen.
- [`electron-builder`][] can sign some of its windows targets

## Windows Store

See the [Windows Store Guide][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`Elektron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`elektron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`elektron-packager`]: https://github.com/electron/electron-packager
[`electron-packager`]: https://github.com/electron/electron-packager
[`elektron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
