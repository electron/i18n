# Electron ondersteuning

## Ondersteuning vinden

Als u een veiligheidsprobleem heeft, bekijk dan het [beveiligingsdocument](https://github.com/electron/electron/tree/master/SECURITY.md).

Als je op zoek bent naar programmeerhulp, voor antwoorden op de vragen of om deel te nemen aan discussie met andere ontwikkelaars die Electron gebruiken, je kunt communiceren met de community op deze locaties:

* [`Electron's Discord`](https://discord.com/invite/electron) has channels for:
  * Getting help
  * Ecosystem apps like [Electron Forge](https://github.com/electron-userland/electron-forge) and [Electron Fiddle](https://github.com/electron/fiddle)
  * Sharing ideas with other Electron app developers
  * And more!
* [`electron`](https://discuss.atom.io/c/electron) category on the Atom forums
* `#atom-shell` kanaal op Freenode
* `#electron` kanaal op [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
* [`electron-ru`](https://telegram.me/electron_ru) *(Russisch)*
* [`electron-br`](https://electron-br.slack.com) *(Braziliaans Portugees)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Koreaans)*
* [`electron-jp`](https://electron-jp.slack.com) *(Japans)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(Turkish)*
* [`elektron-id`](https://electron-id.slack.com) *(Indonesia)*
* [`electron-pl`](https://electronpl.github.io) *(Poland)*

Als je aan Electroon wilt bijdragen, zie het [bijdrage document](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Als u een bug hebt gevonden in een [ondersteunde versie](#supported-versions) van Electron, rapporteer deze dan met de [issue tracker](../development/issues.md).

[geweldige esome-electron](https://github.com/sindresorhus/awesome-electron) is een door de gemeenschap onderhouden lijst met handige voorbeeld apps, tools en bronnen.

## Ondersteunde versies

De laatste drie *stabiele* grote versies worden ondersteund door het Electron team. Bijvoorbeeld, als de nieuwste versie 6.1.x is, dan worden de 5.0.x evenals ondersteund omdat de 4.2.x serie wordt ondersteund.  We ondersteunen alleen de nieuwste minor release voor elke stabiele release-serie.  Dit betekent dat in het geval van een beveiligingsoplossing 6.1 zal de reparatie krijgen, maar we zullen geen nieuwe versie van 6.0.x releasen.

De laatste stabiele release ontvangt alle fixes van `master`, en de eerdere versie krijgt de overgrote meerderheid van deze fixes als tijd en bandbreedte garanties. De oudste ondersteunde releaselijn ontvangt alleen beveiligingsoplossingen direct.

Alle ondersteunde release lijnen accepteren externe pull requests tot backport fixes die eerder zijn samengevoegd met `master`, Hoewel dit van geval tot geval kan gebeuren voor een aantal oudere ondersteunde lijnen. Alle betwiste beslissingen rond release lijnachterpoortjes worden opgelost door de [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) als een agendapunt tijdens hun wekelijkse vergadering de week waarop de backport PR wordt gepresenteerd.

Wanneer een API wordt gewijzigd of verwijderd op een manier die bestaande functionaliteit breekt de eerdere functionaliteit zal worden ondersteund voor een minimum van twee grote versies wanneer mogelijk is voordat deze verwijderd wordt. Bijvoorbeeld, als een functie drie argumenten nodig heeft, en dat nummer wordt teruggebracht tot twee in de grote versie 10, de drie argumentenversie zal blijven werken totdat op zijn minst de grote versie 12 werkt. Verleden de minimum twee-versie drempelwaarde, we zullen proberen de compatibiliteit met achterwaarts te steunen na twee versies totdat de onderhouders de onderhoudslast te hoog achten om dit te blijven doen.

### Huidige ondersteunde versies

* 11.x.y
* 10.x.y
* 9.x.y

### Eind-van-leven

Wanneer een release branch het einde van de support cyclus bereikt, de serie wordt niet meer ondersteund in NPM en er wordt een definitieve end-of-support versie gemaakt. Deze release zal een waarschuwing toevoegen om te informeren dat een niet-ondersteunde versie van Electron in gebruik is.

Deze stappen zijn om app-ontwikkelaars te helpen leren wanneer een branch die ze gebruiken niet wordt ondersteund, maar zonder al te opdringerig om eindgebruikers te bereiken.

Als een aanvraag uitzonderlijke omstandigheden heeft en moet blijven op een niet-ondersteunde reeks Electro, ontwikkelaars kunnen de waarschuwing stoppen door de definitieve versie van de app `pakket weg te laten. zoon` `devDependencies`. Bijvoorbeeld, omdat de 1-6-x serie eindigde met een end-of-support 1.6. 8 release, ontwikkelaars kunnen voor kiezen om zonder waarschuwingen in de 1-6-x series te blijven met `devDependency` van `"electron": 1. .0 - 1.6.17`.

## Ondersteunde platformen

Volgende platformen worden ondersteund door Electron:

### macOS

Alleen 64bit binaries zijn beschikbaar voor macOS, en de minimum macOS versie ondersteund is macOS 10.10 (Yosemite).

### Windows

Windows 7 en later worden ondersteund, oudere besturingssystemen worden niet ondersteund (en werken niet).

Zowel `ia32` (`x86`) en `x64` (`amd64`) binaries zijn beschikbaar voor Windows. [Electron 6.0.8 en hoger voegen inheemse ondersteuning toe voor Windows on Arm (`arm64`) apparaten](windows-arm.md). Lopende apps verpakt met vorige versies is mogelijk met behulp van het ia32 binary.

### Linux

The prebuilt binaries of Electron are built on Ubuntu 18.04.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 18.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

* Ubuntu 14.04 and newer
* Fedora 24 and newer
* Debian 8 and newer
