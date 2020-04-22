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

1. Зарегистрироваться в [Apple Developer Program](https://developer.apple.com/programs/) (требует оплату раз в год)
2. Загрузить и установить [Xcode](https://developer.apple.com/xcode)
3. Сгенерировать [подписанные сертификаты](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Существует ряд инструментов для подписывания приложений:

- [`electron-osx-sign`] — устанавливаемая утилита для подписи.
- [`electron-packager`] включает в себя `electron-osx-sign`. Если вы используете `electron-packager`, укажите аргумент `--osx-sign=true` при сборке.
  - [`electron-forge`] использует `electron-packager` внутри, поэтому можно использовать аргумент `osxSign` в конфиге.
- [`electron-builder`] имеет в себе возможности подписывания. Смотри страницу [electron.build/code-signing](https://www.electron.build/code-signing)

Больше информации на странице [Mac App Store Submission Guide](mac-app-store-submission-guide.md).

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

- [`electron-winstaller`] создаст инсталлятор для Windows и подпишет его
- [`electron-forge`] подписывает инсталляторы, сгенерированные через Squirrel.Windows или MSI.
- [`electron-builder`] подписывает некоторые приложения для Windows

## Магазин приложений Windows

Смотри страницу [Windows Store Guide](windows-store-guide.md).
