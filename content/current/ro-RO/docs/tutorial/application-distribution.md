# Distribuția aplicației

## Overview

Pentru a distribui aplicația ta cu Electron, trebuie să o împachetezi și să-l redenumești. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [ambalator de electroni](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Distribuție manuală

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Apoi, dosarul care conține aplicația dvs. ar trebui să fie numit `aplicația` și plasat în directorul de resurse Electron așa cum se arată în următoarele exemple.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*Pe macOS:*

```plaintext
electron/Electron.app/Contents/Resurse/app/
• pachete.json
<unk> · ─ main.js
• ─ index.html
```

*Pe Windows și Linux:*

```plaintext
electron/resources/app
<unk> • ─ package.json
<unk> • ─ main.js
• ─ index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Pentru a folosi o arhivă `asar` pentru a înlocui folderul `app` , trebuie să redenumești arhiva în `aplicație. sar`, și pune-l în directorul de resurse Electron ca dedesubt, și Electron va încerca să citească arhiva și să înceapă de la ea.

*Pe macOS:*

```plaintext
electron/Electron.app/Conținut/Resurse/
Ribavirin ─ app.asar
```

*Pe Windows și Linux:*

```plaintext
electron/resources/
<unk> ─ app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

După ce ați împachetat aplicația în Electron, veți dori să remarcați Electron înainte de a o distribui utilizatorilor.

#### macOS

Poți redenumi `Electron. pp` la orice nume dorești și trebuie de asemenea să redenumești `CFBundleDisplayName`, `CFBundleIdentifier` și `CFBundleName` în următoarele fișiere:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

De asemenea, poți redenumi aplicația de ajutor pentru a evita afișarea `Electron Helper` în Monitorizarea Activității dar asigură-te că ai redenumit numele executabil al fișierului al aplicației ajutătoare.

Structura unei aplicații redenumite ar fi:

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

#### Ferestre

Poți să redenumești `electron. xe` pentru orice nume dorești și editează icoana și alte informații cu instrumente ca [rcedit](https://github.com/electron/rcedit).

#### Linux

Poți redenumi `electronul` executabil cu orice nume dorești.

### Rebranding by rebuilding Electron from source

De asemenea, este posibil să remarcați Electron schimbând numele produsului și construindu-l din sursă. To do this you need to set the build argument corresponding to the product name (`electron_product_name = "YourProductName"`) in the `args.gn` file and rebuild.
