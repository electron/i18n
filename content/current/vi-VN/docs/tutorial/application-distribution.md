# Phân phối ứng dụng

## Overview

To distribute your app with Electron, you need to package and rebrand it. To do this, you can either use specialized tooling or manual approaches.

## With tooling

You can use the following tools to distribute your application:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron application, such as bundling your application, rebranding the executable, and setting the right icons.

You can check the example of how to package your app with `electron-forge` in our [Quick Start Guide](quick-start.md#package-and-distribute-the-application).

## Phân phối thủ công

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Tiếp theo, thư mục chứa ứng dụng của bạn nên đặt tên là `app` và được đặt trong thư mục của Electron's như ví dụ dưới.

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*Trên macOS:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*Trên Windows và Linux:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar](https://github.com/electron/asar) archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

To use an `asar` archive to replace the `app` folder, you need to rename the archive to `app.asar`, and put it under Electron's resources directory like below, and Electron will then try to read the archive and start from it.

*Trên macOS:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*Trên Windows và Linux:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository](https://github.com/electron/asar).

### Rebranding with downloaded binaries

After bundling your app into Electron, you will want to rebrand Electron before distributing it to users.

#### macOS

You can rename `Electron.app` to any name you want, and you also have to rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in the following files:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

You can also rename the helper app to avoid showing `Electron Helper` in the Activity Monitor, but make sure you have renamed the helper app's executable file's name.

The structure of a renamed app would be like:

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

You can rename `electron.exe` to any name you like, and edit its icon and other information with tools like [rcedit](https://github.com/electron/rcedit).

#### Linux

Bạn có thể đổi tên file thực thi `electron` thành bất cứ tên nào mà bạn thích.

### Rebranding by rebuilding Electron from source

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to set the build argument corresponding to the product name (`electron_product_name = "YourProductName"`) in the `args.gn` file and rebuild.
