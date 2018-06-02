# 代码签名

代码签名是一种用来保证你对应用的创造性的一种安全技术。

在macOS系统中，系统可以区分开应用的变更是偶然产生的，还是被恶意代码生成的。

On Windows the system assigns a trust level to your code signing certificate which if you don't have, or if your trust level is low will cause security dialogs to appear when users start using your application. Trust level builds over time so it's better to start code signing as early as possible.

While it is possible to distribute unsigned apps, it is not recommended. For example, here's what macOS users see when attempting to start an unsigned app:

![在macOS系统中，会对未签名的应用提出警告](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> App can't be opened because it is from an unidentified developer

If you are building an Electron app that you intend to package and distribute, it should be code signed. The Mac and Windows app stores do not allow unsigned apps.

# 签署 macOS 应用程序

在签署macOS应用程序前，你需要完成以下事项：

1. 加入 <Apple Developer Program>(需要缴纳年费)
2. 下载并安装Xcode
3. 生成，下载，然后安装[签名证书（signing certificates）](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates)

你可以运用许多方式来签署你的应用：

- [`electron-osx-sign`] is a standalone tool for signing macOS packages.
- [`electron-packager`] bundles `electron-osx-sign`. If you're using `electron-packager`, pass the `--osx-sign=true` flag to sign your build. 
    - [`electron-forge`] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`] has built-in code-signing capabilities. See [electron.build/code-signing](https://www.electron.build/code-signing)

更多信息，参考[Mac App Store Submission Guide](mac-app-store-submission-guide.md).

# 签署windows应用程序

在签署Windows应用程序前，你需要完成以下事项：

1. 获取Windows Authenticode的代码签名证书
2. 安装Visual Studio 2015/2017(来获取签名功能)

你可以通过许多分销商来获取代码签名证书，比较常见的有：

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
- [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
- Amongst others, please shop around to find one that suits your needs, Google is your friend :)

你可以运用许多方式来签署你的应用：

- [`electron-winstaller`] will generate an installer for windows and sign it for you
- [`electron-forge`] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`] can sign some of its windows targets

## Windows Store

参考 [Windows Store Guide](windows-store-guide.md).