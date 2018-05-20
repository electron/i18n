# Цифровая подпись

Цифровая подпись — технология защиты, используемая для подтверждения прав на приложение.

macOS обнаруживает любое изменение приложение — случайное или вредоносное.

Windows назначает уровень доверия к подписи сертификата; если у вас его нет — система не будет доверять приложению и будет показывать окна безопасности перед запуском. Trust level builds over time so it's better to start code signing as early as possible.

Можно распространять неподписанные приложения, но не рекомендуется. Вот что видят пользователи macOS, когда запускают неподписанные приложения:

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> Программа не может быть открыта, так как её автор является неустановленным разработчиком

Если вы собираете приложение на Electron и будете его распространять, его следует подписать. Магазины приложени Mac и Windows не позволяют распространять неподписанные приложения.

# Подписывание сборок для macOS

Перед подписью, следует:

1. Зарегистрироваться в <Apple Developer Program> (требует оплату раз в год)
2. Установить Xcode
3. Сгенерировать [подписанные сертификаты](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Существует ряд инструментов для подписывания приложений:

- [`electron-osx-sign`] — устанавливаемая утилита для подписи.
- [`electron-packager`] bundles `electron-osx-sign`. If you're using `electron-packager`, pass the `--osx-sign=true` flag to sign your build. 
    - [`electron-forge`] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`] has built-in code-signing capabilities. See [electron.build/code-signing](https://www.electron.build/code-signing)

For more info, see the [Mac App Store Submission Guide](mac-app-store-submission-guide.md).

# Signing Windows builds

Before signing Windows builds, you must do the following:

1. Get a Windows Authenticode code signing certificate
2. Install Visual Studio 2015/2017 (to get the signing utility)

You can get a code signing certificate from a lot of resellers, popular ones include:

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
- [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
- Amongst others, please shop around to find one that suits your needs, Google is your friend :)

Существует ряд инструментов для подписывания приложений:

- [`electron-winstaller`] will generate an installer for windows and sign it for you
- [`electron-forge`] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`] can sign some of its windows targets

## Windows Store

See the [Windows Store Guide](windows-store-guide.md).