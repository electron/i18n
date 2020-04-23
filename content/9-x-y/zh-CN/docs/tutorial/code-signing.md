# 代码签名

代码签名是一种用来证明应用是由你创建的一种安全技术。

macOS 系统能通过代码签名检测对app的任何修改，包括意外修改和来自恶意代码的修改。

在Windows系统中，如果程序没有代码签名证书，或者代码签名授信级别较低时，系统同样会将其列为可信程序，只是当用户运行该应用时，系统会显示安全提示。  确立授信级别的过程比较费时，因此最好提早开始着手代码签名的工作。

即使开发者可以发布一个未签名的应用程序，但是我们并不建议这样做。 默认情况下，Windows和macOS都会禁止未签名的应用下载或运行。 从macOS Catalina（10.15版本）开始，用户需要操作数个步骤来运行一个未签名的应用。

![macOS Catalina Gatekeeper warning: The app cannot be opened because the developer cannot be verified](../images/gatekeeper.png)

如你所见，用户有两个选择：直接删除应用或者取消运行。 你不会想让用户看见该对话框。

如果你正在开发一款Electron应用，并打算将其打包发布，那你就应该为其添加代码签名。 Mac 和 Windows的应用商店中不允许出现未签名的应用程序。

# 签署 macOS 应用程序

在签署macOS应用程序前，你需要完成以下事项：

1. 加入 [Apple Developer Program](https://developer.apple.com/programs/)(需要缴纳年费)
2. 下载并安装 [Xcode](https://developer.apple.com/xcode)
3. 生成，下载，然后安装[签名证书（signing certificates）](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

你可以运用许多方式来签署你的应用：

- [`electron-osx-sign`]，一个独立的macOS签名工具。
- [`electron-packager`] 打包 `electron-osx-sign`. 如果你正在使用 `electron-packager`，那么在签署包文件时请传`--osx-sign=true`参数。
  - [`electron-forge`]，它在内部使用`electron-packager`，你可以在forge配置中设置 `osxSign`配置项。
- [`electron-builder`] 内置代码签名功能。 可参考[electron.build/code-signing](https://www.electron.build/code-signing)

## Notarization

Starting with macOS Catalina, Apple requires applications to be notarized. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`] module. You do not necessarily need to complete this step for every build you make – just the builds you intend to ship to users.

## Mac App Store

See the [Mac App Store Guide](mac-app-store-submission-guide.md).

# 签署windows应用程序

在签署Windows应用程序前，你需要完成以下事项：

1. Get a Windows Authenticode code signing certificate (requires an annual fee)
2. 安装Visual Studio 2015/2017(来获取签名功能)

You can get a code signing certificate from a lot of resellers. Prices vary, so it may be worth your time to shop around. Popular resellers include:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* 可以根据自身需求，选择其它的签名分销商。

你可以运用许多方式来签署你的应用：

- [`electron-winstaller`]，将会生成一个带有签名的windows安装包。
- [`electron-forge`] 可以签署Squirrel.Windows 或MSI 类型的安装包
- [`electron-builder`] 能签署一些windows安装包。

## Windows Store

参考 [Windows Store Guide](windows-store-guide.md).
