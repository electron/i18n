# Pamamahagi ng aplikasyon

## Overview

To distribute your app with Electron, you need to package and rebrand it. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [pagpipilit ng elektron](https://github.com/electron-userland/electron-forge)
* [pagbubuo ng elektron](https://github.com/electron-userland/electron-builder)
* [pagpapackage ng elektron](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Manual distribution

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Sunod, ang foloder na naglalaman ng iyong app ay dapat nakapangalan sa `app` at iniligay sa mga pinagkukunan ng Electron Ang direktoryo ay ipinapakita sa mga sumusunod na halimbawa.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*Sa macOs:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*Sa Windows at Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Para gamitin ang `asar` i-archive para palitan ang `app` na folder, kailangan mo ring palitan ang pangalan ang archive sa `app.asar`, at ilagay ito sa ilalim ng mga mapagkukunan sa Electron na direktoryo kagaya ng nasa ilalim at ang Electron ay susubukin ulit basahin ang archive at simulan ulit ito.

*Sa macOs:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Sa Windows at Linux:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

Pagkatapos mong pag-bundle ng iyong app sa Elektron, gusto mong i-rebrand ang elektron bago ipamamahagi ito sa mga gumagamit.

#### macOS

Maari mong palitan ng pangalan ang `Electron.app` sa anumang gusto mo, at maari mo ring palitan ng pangalan ang `CFBundleDisplayName`,`CFBundleIdentifier` at `CFBundleName` sa mga larangan sa mga sumusunod na file:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Maari mo ring palitan ng pangalan ang tumutulong na app upang maiwasan ang pagpapakita `Electron Helper` sa aktibidad ng monitor, ngunit siguraduhin na palitan mo nang pangalan ang helper app's para mapalitan ng pangalan ang mga file.

Ang istraktura na pinalitang pangalan ng app ay magiging tulad ng:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
            └── MyApp Helper
```

#### Windows

Maari mong palitan ang `electron.exe` sa anumang pangalan na gusto mo, at i-edit ang icon nito at iba pang impormasyong sa mga kagamitang [credit](https://github.com/electron/rcedit).

#### Linux

Maari mong palitan ng pangalan ang `elektron` maaring palitan sa anumang gusto mo.

### Rebranding by rebuilding Electron from source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to set the build argument corresponding to the product name (`electron_product_name = "YourProductName"`) in the `args.gn` file and rebuild.
