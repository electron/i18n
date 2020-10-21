# Цифровая подпись

Подпись кода - это технология безопасности, которую вы используете для удостоверения того, что приложение было создано вами.

MacOS обнаруживает любое изменение приложения — случайное или вредоносное.

Windows назначает уровень доверия к подписи сертификата; если у вас его нет — система не будет доверять приложению и будет показывать окна безопасности перед запуском.  Уровень доверия строится со временем, поэтому лучше начинать подписывание кода как можно раньше.

Можно распространять неподписанные приложения, но не рекомендуется. Вот что видят пользователи macOS, когда запускают неподписанные приложения:

![предупреждение об отсутствии подписи приложения в macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> Программа не может быть открыта, так как её автор является неустановленным разработчиком

Если вы создаете приложение Electron, которое собираетесь упаковывать и распространять, оно должно быть подписано. В магазинах приложений Mac и Windows не разрешены неподписанные приложения.

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

Больше информации на странице [Mac App Store Submission Guide][].

# Подписывание сборок для Windows

Перед подписью, следует:

1. Получить сертификат для подписания кода аутентификации Windows (требуется ежегодная плата)
2. Установить Visual Studio 2015 или 2017

Вы можете получить сертификат подписи кода у многих реселлеров. Цены варьируются, поэтому может стоить вашего времени для покупок. Популярные реселлеры включают:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* и куча других, множество магазинов вокруг для любых нужд; в общем, Гугл — твой друг

Существует ряд инструментов для подписывания приложений:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Магазин приложений Windows

Смотри страницу [Windows Store Guide][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[подписанные сертификаты]: https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Submission Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
