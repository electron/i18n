# Цифровая подпись

Подпись кода - это технология безопасности, которую вы используете для удостоверения того, что приложение было создано вами.

В macOS система может обнаружить любые изменения в приложении, является ли изменение введенным случайно или вредоносным кодом.

Windows назначает уровень доверия к подписи сертификата; если у вас его нет — система не будет доверять приложению и будет показывать окна безопасности перед запуском.  Уровень доверия строится со временем, поэтому лучше начинать подписывание кода как можно раньше.

Можно распространять неподписанные приложения, но не рекомендуется. По умолчанию Windows и macOS предотвратят загрузку или выполнение неподписанных приложений. Начиная с macOS Catalina (версия 10.15), пользователи должны пройти несколько ручных шагов для открытия неподписанных приложений.

![macOS Catalina Gatekeeper предупреждает: Приложение не может быть открыто, потому что разработчик не может быть проверен](../images/gatekeeper.png)

Как видите, пользователи получают два варианта: Переместить приложение прямо в корзину или отменить его выполнение. Вы не хотите, чтобы ваши пользователи видели это диалоговое окно.

Если вы создаете приложение Electron, которое вы собираетесь поставлять и распространять, то оно должно быть подписано кодом. В магазинах приложений Mac и Windows не разрешены неподписанные приложения.

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

## Нотаризация

Начиная с macOS Catalina, Apple требуется нотариальные приложения. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. Вам не обязательно нужно завершать этот шаг для каждой сборки – просто сборки, которые вы собираетесь поставлять пользователям.

## Mac App Store

See the [Mac App Store Guide][].

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
