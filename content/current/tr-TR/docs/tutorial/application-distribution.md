# Uygulama Dağıtımı

## Genel Bakış

To distribute your app with Electron, you need to package and rebrand it. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Manual distribution

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Sonra, klasör `app` olarak adlandırılmalı ve Electron'un kaynaklarına yerleştirilmelidir aşağıdaki örneklerde gösterildiği gibi.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*MacOS üzerinde:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*Windows ve Linux üzerinde:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

`asar` arşivini `app` klasörünü değiştirmek için kullanmak için, arşivi `app.asar` olarak yeniden adlandırmanız ve aşağıda olduğu gibi Electron'un resources dizini altına koymanız gerekir, Electron da arşivi okumaya çalışacaktır ve ondan başlayacaktır.

*MacOS üzerinde:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Windows ve Linux üzerinde:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

Uygulamanızı Electron'da topladıktan sonra, Electron'u kullanıcılara dağıtmadan önce yeniden markalamak isteyeceksiniz.

#### macOS

`Electron.app` 'yi istediğiniz herhangi bir adla yeniden adlandırabilir ayrıca yeniden adlandırma alanındaki `CFBundleDisplayName`, `CFBundleIdentifier` ve `CFBundleName` dosyalar aşağıdadır:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Etkinlik İzleyicisinde `Electron Helper`'in görüntülenmesini engellemek için yardımcı uygulamasının adını da değiştirebilirsiniz fakat yardımcı uygulamasının yürütülebilir dosyasının adını değiştirdiğinizden emin olun.

Yeniden adlandırılan bir uygulamanın yapısı aşağıdaki gibi olur:

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

`electron.exe` adını istediğiniz herhangi bir adla yeniden adlandırabilir simgesini ve diğer simgelerini düzenleyebilirsiniz, araçlar hakkında bilgi [rcedit](https://github.com/electron/rcedit).

#### Linux

`electron` yürütülebilir dosyasını istediğiniz herhangi bir adla yeniden adlandırabilirsiniz.

### Rebranding by rebuilding Electron from source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to set the build argument corresponding to the product name (`electron_product_name = "YourProductName"`) in the `args.gn` file and rebuild.
