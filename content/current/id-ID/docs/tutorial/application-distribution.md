# Distribusi Aplikasi

## Sekilas

To distribute your app with Electron, you need to package and rebrand it. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [elektron-penempa](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Manual distribution

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Selanjutnya, folder yang berisi aplikasi anda harus diberi nama `app` dan ditempatkan di direktori sumber daya electron seperti yang ditampilkan dalam contoh berikut.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*Pada macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*Pada Windows dan Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

Untuk menggunakan arsip `asar` untuk mengganti folder `app`, anda perlu untuk mengubah nama arsip menjadi `app.asar`, dan meletakkannya di direktori sumber daya electron yang seperti di bawah ini, dan electron akan mencoba untuk membaca arsip dan mulai dari sana.

*Pada macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Pada Windows dan Linux:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

Setelah memaket aplikasi anda ke electron, anda akan dapat mengubah citra elektron sebelum mendistribusikannya ke pengguna.

#### macOS

Anda dapat mengubah `Electron.app` ke nama yang Anda inginkan, dan anda juga perlu mengubah nama bidang `CFBundleDisplayName`, `CFBundleIdentifier` dan `CFBundleName` dalam file-file berikut:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Anda juga dapat mengubah nama helper app untuk menyembunyikan `Electron helper` pada Activity Monitor, tapi pastikan anda telah berganti nama menjadi nama file executable helper app.

Struktur aplikasi yang diganti namanya akan jadi seperti:

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

Anda dapat mengubah `electron.exe` ke nama apapun yang Anda suka, dan mengedit ikon dan informasi lainnya dengan alat seperti [rcedit](https://github.com/electron/rcedit).

#### Linux

Anda dapat mengubah executable `electron` ke nama apapun yang anda suka.

### Rebranding by rebuilding Electron from source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to set the build argument corresponding to the product name (`electron_product_name = "YourProductName"`) in the `args.gn` file and rebuild.
