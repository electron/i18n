# 应用部署

## 概览

要使用 Electron 分发您的应用，您需要打包并重命名它。 为此，您可以使用专用工具或手动方法。

## 专用工具

您可以使用以下工具来分发您的应用程序：

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

这些工具将自动进行所有的步骤，例如，打包您的应用程序，重组可执行文件，并设置正确的图标。

您可以在我们的 [快速启动指南](quick-start.md#package-and-distribute-the-application) 检查如何用 `electron-forge` 包装应用的示例。

## 手动发布

### 带预建二进制文件

要手动分发您的应用程序，您需要下载电子 [预制的 二进制文件](https://github.com/electron/electron/releases)。 接下来，你存放应用程序的文件夹需要叫做 `app` 并且需要放在 Electron 的 资源文件夹Resources下，如下面的示例所示。

> *注：* 电子预制二进制文件的位置 指示，下面的示例中 `electron/` 。

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

然后在 macOS 上执行 `Electron.app` ，在 Linux 上执行 `electron` ，或在 Windows 上执行 `electron.exe` ，电子将作为您的应用开始。 然后， `electron` 目录 将是您的分发，以交付给用户。

### 具有应用源代码存档

如果您尚未使用包裹或 Webpack 等捆绑包，您可以 将应用打包到 [asar][] 存档中，以提高在 Windows 等平台上阅读 文件的性能，而不是通过复制其所有源文件来运送应用。

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

您可以在 [`electron/asar` 存储库][asar]中找到有关如何使用 `asar` 的更多详细信息。

### 用下载的二进制文件重塑品牌

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

### 通过从源头上重建电子品牌重塑

你也可以通过改变产品名称后从源码构建来重塑Electron的形象。 你只需要在 `args.gn` 文件中将构建参数设置为对应产品的名称(`electron_product_name = "YourProductName"`)，并进行重新构建。

[asar]: https://github.com/electron/asar

[asar]: https://github.com/electron/asar
