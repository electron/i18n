# 应用部署

## 概览

要使用 Electron 分发您的应用，您需要打包并重命名它。 为此，您可以使用专用工具或手动方法。

## 专用工具

您可以使用以下工具来分发您的应用程序：

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

这些工具将自动进行所有的步骤，例如，打包您的应用程序，重组可执行文件，并设置正确的图标。

您可以查看 [快速上手指南](quick-start.md#package-and-distribute-your-application) 中如何用 `electron-forge` 打包您的应用程序的例子。

## 手动发布

### With prebuilt binaries

To distribute your app manually, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). 接下来，你存放应用程序的文件夹需要叫做 `app` 并且需要放在 Electron 的 资源文件夹Resources下，如下面的示例所示。

> *NOTE:* the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

*在 macOS 中:*

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

*在 Windows 和 Linux 中:*

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` on macOS, `electron` on Linux, or `electron.exe` on Windows, and Electron will start as your app. The `electron` directory will then be your distribution to deliver to users.

### With an app source code archive

Instead of from shipping your app by copying all of its source files, you can package your app into an [asar][] archive to improve the performance of reading files on platforms like Windows, if you are not already using a bundler such as Parcel or Webpack.

为了使用一个 `asar` 档案文件代替 `app` 文件夹，你需要修改这个档案文件的名字为 `app.asar` ， 然后将其放到 Electron 的资源文件夹下，然后 Electron 就会试图读取这个档案文件并从中启动。 如下所示：

*在 macOS 中:*

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

*在 Windows 和 Linux 中:*

```plaintext
electron/resources/
└── app.asar
```

You can find more details on how to use `asar` in the [`electron/asar` repository][asar].

### Rebranding with downloaded binaries

将您的应用程序捆绑到Electron后，您可能需要在把应用分发给用户前将Electron进行重新定制

#### macOS

你可以将 `Electron.app` 重命名为任意你喜欢的名字，然后你也需要将一些文件中的 `CFBundleDisplayName`， `CFBundleIdentifier` 以及 `CFBundleName` 字段一并修改掉。 这些文件如下：

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

你也可以重命名帮助程序以避免它在系统活动监视器中显示为`Electron Helper`， 但是请确保你已经修改了帮助应用的可执行文件的名字。

一个重命名后的应用程序的结构可能是这样的

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

你可以将 `electron.exe` 重命名为任何你喜欢的名字，然后可以使用像 [rcedit](https://github.com/electron/rcedit) 那样的工具编辑它的 icon 和其他信息。

#### Linux

你可以将 `electron` 重命名为任意你喜欢的名字。

### Rebranding by rebuilding Electron from source

你也可以通过改变产品名称后从源码构建来重塑Electron的形象。 你只需要在 `args.gn` 文件中将构建参数设置为对应产品的名称(`electron_product_name = "YourProductName"`)，并进行重新构建。

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
