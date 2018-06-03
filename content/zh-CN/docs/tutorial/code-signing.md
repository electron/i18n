# 代码签名

代码签名是一种用来保证你对应用的创造性的一种安全技术。

在macOS系统中，系统可以区分开应用的变更是偶然产生的，还是被恶意代码生成的。

在Windows系统中，如果程序没有代码签名证书，或者代码签名授信级别较低时，系统同样会将其列为可信程序，只是当用户运行该应用时，系统会显示安全提示。 确立授信级别的过程比较费时，因此最好提早开始着手代码签名的工作。

即使开发者可以发布一个未签名的应用程序，但是我们并不建议这样做。 下面就是macOS系统用户，在运行没有签名的应用程序时遇到的情形：

![在macOS系统中，会对未签名的应用提出警告](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> 应用无法打开，因为它来自身份不明的开发者

如果你正在开发一款Electron应用，并打算将其打包发布，那你就应该为其添加代码签名。 Mac 和 Windows的应用商店中不允许出现未签名的应用程序。

# 签署 macOS 应用程序

在签署macOS应用程序前，你需要完成以下事项：

1. 加入 <Apple Developer Program>(需要缴纳年费)
2. 下载并安装Xcode
3. 生成，下载，然后安装[签名证书（signing certificates）](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates)

你可以运用许多方式来签署你的应用：

- [`electron-osx-sign`]，一个独立的macOS签名工具。
- [`electron-packager`] 打包 `electron-osx-sign`. 如果你正在使用 `electron-packager`，那么在签署包文件时请传`--osx-sign=true`参数。 
    - [`electron-forge`]，它在内部使用`electron-packager`，你可以在forge配置中设置 `osxSign`配置项。
- [`electron-builder`] 内置代码签名功能。 可参考[electron.build/code-signing](https://www.electron.build/code-signing)

更多信息，参考[Mac App Store Submission Guide](mac-app-store-submission-guide.md).

# 签署windows应用程序

在签署Windows应用程序前，你需要完成以下事项：

1. 获取Windows Authenticode的代码签名证书
2. 安装Visual Studio 2015/2017(来获取签名功能)

你可以通过许多分销商来获取代码签名证书，比较常见的有：

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
- [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
- 可以根据自身需求，选择其它的签名分销商。

你可以运用许多方式来签署你的应用：

- [`electron-winstaller`]，将会生成一个带有签名的windows安装包。
- [`electron-forge`] 可以签署Squirrel.Windows 或MSI 类型的安装包
- [`electron-builder`] 能签署一些windows安装包。

## Windows 应用商店

参考 [Windows Store Guide](windows-store-guide.md).