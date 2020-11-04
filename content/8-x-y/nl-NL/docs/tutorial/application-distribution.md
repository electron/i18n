# Applicatie distributie

Om de app te distribueren met Electro, moet je hem verpakken en opnieuw branden. De eenvoudigste manier om dit te doen is een van de volgende hulpmiddelen voor verpakkingen van derden te gebruiken:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [Elektron-verpakker](https://github.com/electron/electron-packager)

Deze hulpmiddelen zorgen voor alle stappen die je moet nemen om te eindigen met een distributable Electron applicaties, zoals verpakking van uw applicatie, herbranding van de uitvoerbaarheid, het instellen van de juiste pictogrammen en eventueel installateurs.

## Handmatige distributie
Je kunt er ook voor kiezen om je app handmatig klaar te maken voor verspreiding. De stappen die hiervoor nodig zijn, zijn hieronder beschreven.

Om je app te distribueren met Electro, moet je de [vooraf gebouwde binaries van Electron](https://github.com/electron/electron/releases) downloaden. Vervolgens moet de map met de naam `app` worden geplaatst in de Electron's resources map zoals weergegeven in de volgende voorbeelden. Merk op dat de locatie van de voorgebouwde -binaries met `elektron/` wordt aangegeven in de voorbeelden hieronder.

Op macOS:

```plaintext
electron/Electron.app/Contents/Resources/app/
½ Packpackage.json
ρρmain.js
ρρindex.html
```

Op Windows en Linux:

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

## Verpak je app in een bestand

Behalve verzending door uw app alle bronbestanden te kopiëren, je kunt de app ook in een [as](https://github.com/electron/asar) archief verpakken om te voorkomen dat de broncode van je app aan gebruikers onthult.

Om een `asar` archief te gebruiken ter vervanging van de `app` map, u moet het archief hernoemen naar `app. sar`, en zet het onder de resources map van Electron, zoals hieronder, en Electron zal dan proberen het archief te lezen en er vanaf te starten.

Op macOS:

```plaintext
electron/Electron.app/Contents/Resources/
½ app.asar
```

Op Windows en Linux:

```plaintext
elektron/hulpbronnen/
½ app.asar
```

Meer details zijn te vinden in [Applicatie verpakking](application-packaging.md).

## Herbranding met Gedownloade Binaries

Nadat je je app hebt gebundeld met Electroon, wil je Electron opnieuw branden, voordat je het aan gebruikers verspreidt.

### Windows

You can rename `electron.exe` to any name you like, and edit its icon and other information with tools like [rcedit](https://github.com/atom/rcedit).

### macOS

You can rename `Electron.app` to any name you want, and you also have to rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in the following files:

* `Electron.app/Contents/Info.plist`
* `Elektron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

U kunt ook de helper-app hernoemen om te voorkomen dat u `Electron Helper` in de Activiteitenmonitor toont, maar zorg ervoor dat u de naam van de uitvoerbare app van de helper-app bestand hebt hernoemd.

De structuur van een hernoemde app zou gelijk zijn:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
         └── MyApp Helper
```

### Linux

Je kunt het programma `elektron` hernoemen naar elke gewenste naam.

## Herbranding door Electron te herbouwen van Bron

Het is ook mogelijk om Electron te hertekenen door de productnaam te veranderen en het te bouwen vanaf de bron. Om dit te doen moet u het build argument instellen die overeenkomt met de productnaam (`electron_product_name = "YourProductNaam"`) in de `args. n` bestand en opnieuw opbouwen.

### Aanmaken van een individuele Electron vork

Het maken van een aangepaste fork van Electron is bijna zeker niet iets wat je moet doen om je app te bouwen zelfs voor "Production Level"-applicaties. Met behulp van een tool zoals `electron-packager` of `electron-forge` kunt u "Rebrand" Electron zonder deze stappen te hoeven doen.

Je moet Electron forken als je aangepaste C++ code hebt die je direct naar Electron hebt gepatenteerd, dat niet te upstreamen, of dat is afgekeurd in de officiële versie. Als onderhouders van Electro, willen we graag je scenario laten werken dus probeer zo hard als je kunt om de wijzigingen in de officiële versie van Electron te krijgen het zal veel gemakkelijker voor u zijn, en wij waarderen uw hulp.

#### Maak een aangepaste release met surf-build

1. Installeer [Surf](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`

2. Maak een nieuwe S3 bucket en maak de volgende lege map structuur:

    ```sh
    - elektron/
      - symbolen/
      - dist/
    ```

3. De volgende omgevingsvariabelen instellen:

  * `ELECTRON_GITHUB_TOKEN` - een token die releases kan maken op GitHub
  * `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - de plaats waar je Node.js headers en symbolen uploadt
  * `ELECTRON_RELEASE` - Zet op `true` en het upload deel wordt uitgevoerd, laat en `surf-build` los van CI-type controles, geschikt om voor elke pull request uit te voeren.
  * `CI` - Zet op `waar` of anders zal het mislukken
  * `GITHUB_TOKEN` - zet het op hetzelfde als `ELECTRON_GITHUB_TOKEN`
  * `SURF_TEMP` - ingesteld op `C:\Temp` op Windows om te voorkomen dat pad te lang is
  * `TARGET_ARCH` - ingesteld op `ia32` of `x64`

4. In `script/upload.py`, you _must_ set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

5. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

6. Wacht een zeer, zeer lange tijd om het gebouw te voltooien.
