# 代码签名

代码签名是一种用来证明应用是由你创建的一种安全技术。

On macOS the system can detect any change to the app, whether the change is introduced accidentally or by malicious code.

在Windows系统中，如果程序没有代码签名证书，或者代码签名授信级别较低时，系统同样会将其列为可信程序，只是当用户运行该应用时，系统会显示安全提示。 确立授信级别的过程比较费时，因此最好提早开始着手代码签名的工作。

即使开发者可以发布一个未签名的应用程序，但是我们并不建议这样做。 Both Windows and macOS will, by default, prevent either the download or the execution of unsigned applications. Starting with macOS Catalina (version 10.15), users have to go through multiple manual steps to open unsigned applications.

![macOS Catalina Gatekeeper warning: The app cannot be opened because the developer cannot be verified](../images/gatekeeper.png)

As you can see, users get two options: Move the app straight to the trash or cancel running it. You don't want your users to see that dialog.

If you are building an Electron app that you intend to package and distribute, it should be code-signed. The Mac and Windows app stores do not allow unsigned apps.

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

Starting with macOS Catalina, Apple requires applications to be notarized. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification *before* distributing the app to your users.

To automate this process, you can use the [`electron-notarize`] module. You do not necessarily need to complete this step for every build you make – just the builds you intend to ship to users.

## Mac App Store

See the [Mac App Store Guide](mac-app-store-submission-guide.md).

# 签署windows应用程序

在签署Windows应用程序前，你需要完成以下事项：

1. Get a Windows Authenticode code signing certificate (requires an annual fee)
2. 安装Visual Studio 2015/2017(来获取签名功能)

You can get a code signing certificate from a lot of resellers. Prices vary, so it may be worth your time to shop around. Popular resellers include:

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
- [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
- 可以根据自身需求，选择其它的签名分销商。

你可以运用许多方式来签署你的应用：

- [`electron-winstaller`]，将会生成一个带有签名的windows安装包。
- [`electron-forge`] 可以签署Squirrel.Windows 或MSI 类型的安装包
- [`electron-builder`] 能签署一些windows安装包。

## Windows Store

参考 [Windows Store Guide](windows-store-guide.md).