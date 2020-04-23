# توقيع الكود

Code signing is a security technology that you use to certify that an app was created by you.

On macOS the system can detect any change to the  app, whether the change is introduced accidentally or by malicious code.

On Windows the system assigns a trust level to your code signing certificate which if you don't have, or if your trust level is low will cause security dialogs to appear when users start using your application.  Trust level builds over time so it's better to start code signing as early as possible.

While it is possible to distribute unsigned apps, it is not recommended. For example, here's what macOS users see when attempting to start an unsigned app:

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> App can't be opened because it is from an unidentified developer

If you are building an Electron app that you intend to package and distribute, it should be code signed. The Mac and Windows app stores do not allow unsigned apps.

# Signing macOS builds

Before signing macOS builds, you must do the following:

1. Enroll in the [Apple Developer Program](https://developer.apple.com/programs/) (requires an annual fee)
2. Download and install [Xcode](https://developer.apple.com/xcode)
3. Generate, download, and install [signing certificates](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates)

يوجد رقم للأداة لأجل توقيع حزمة تطبيقك:

- [`electron-osx-sign`] is a standalone tool for signing macOS packages.
- [`electron-packager`] bundles `electron-osx-sign`. If you're using `electron-packager`, pass the `--osx-sign=true` flag to sign your build.
  - [`electron-forge`] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`] has built-in code-signing capabilities. See [electron.build/code-signing](https://www.electron.build/code-signing)

For more info, see the [Mac App Store Submission Guide](mac-app-store-submission-guide.md).

# Signing Windows builds

قبل التوقيع بناءات Windows، يجب عليك القيام بما يلي:

1. Get a Windows Authenticode code signing certificate (requires an annual fee)
2. Install Visual Studio 2015/2017 (to get the signing utility)

يمكنك أخذ كود مصادقة موقعة من الكثير من الموزعين. الأسعار متفاوتة، لذا ربما يستحق لتأخذ وقتك لتجوال في التسوق. تحتوي على البائعين الشائعين:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Amongst others, please shop around to find one that suits your needs, Google is your friend :)

يوجد رقم للأداة لأجل توقيع حزمة تطبيقك:

- [`electron-winstaller`] will generate an installer for windows and sign it for you
- [`electron-forge`] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`] can sign some of its windows targets

## متجر تطبيقات Windows

انظر الى[دليل متجر Windows](windows-store-guide.md).
