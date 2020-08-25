# Цифровая подпись

Подпись кода - это технология безопасности, которую вы используете для удостоверения того, что приложение было создано вами.

On macOS the system can detect any change to the app, whether the change is introduced accidentally or by malicious code.

Windows назначает уровень доверия к подписи сертификата; если у вас его нет — система не будет доверять приложению и будет показывать окна безопасности перед запуском.  Уровень доверия строится со временем, поэтому лучше начинать подписывание кода как можно раньше.

Можно распространять неподписанные приложения, но не рекомендуется. Both Windows and macOS will, by default, prevent either the download or the execution of unsigned applications. Starting with macOS Catalina (version 10.15), users have to go through multiple manual steps to open unsigned applications.

![macOS Catalina Gatekeeper warning: The app cannot be opened because the developer cannot be verified](../images/gatekeeper.png)

As you can see, users get two options: Move the app straight to the trash or cancel running it. You don't want your users to see that dialog.

If you are building an Electron app that you intend to package and distribute, it should be code-signed. В магазинах приложений Mac и Windows не разрешены неподписанные приложения.

# Подписывание сборок для macOS

Перед подписью, следует:

1. Зарегистрироваться в [Apple Developer Program][] (требует оплату раз в год)
2. Загрузить и установить [Xcode][]
3. Сгенерировать [подписанные сертификаты][]

Существует ряд инструментов для подписывания приложений:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. Если вы используете `electron-packager`, укажите аргумент `--osx-sign=true` при сборке.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. Смотри страницу [electron.build/code-signing](https://www.electron.build/code-signing)

## Notarization

Starting with macOS Catalina, Apple requires applications to be notarized. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. You do not necessarily need to complete this step for every build you make – just the builds you intend to ship to users.

## Mac App Store

See the [Mac App Store Guide][].

# Подписывание сборок для Windows

Перед подписью, следует:

1. Get a Windows Authenticode code signing certificate (requires an annual fee)
2. Установить Visual Studio 2015 или 2017

You can get a code signing certificate from a lot of resellers. Prices vary, so it may be worth your time to shop around. Popular resellers include:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* и куча других, множество магазинов вокруг для любых нужд; в общем, Гугл — твой друг

Существует ряд инструментов для подписывания приложений:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Windows Store

Смотри страницу [Windows Store Guide][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[подписанные сертификаты]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
