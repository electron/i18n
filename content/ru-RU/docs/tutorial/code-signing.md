# Цифровая подпись

Code signing is a security technology that you use to certify that an app was created by you.

macOS обнаруживает любое изменение приложение — случайное или вредоносное.

Windows назначает уровень доверия к подписи сертификата; если у вас его нет — система не будет доверять приложению и будет показывать окна безопасности перед запуском. Trust level builds over time so it's better to start code signing as early as possible.

Можно распространять неподписанные приложения, но не рекомендуется. Вот что видят пользователи macOS, когда запускают неподписанные приложения:

![предупреждение об отсутствии подписи приложения в macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> Программа не может быть открыта, так как её автор является неустановленным разработчиком

If you are building an Electron app that you intend to package and distribute, it should be code signed. The Mac and Windows app stores do not allow unsigned apps.

# Подписывание сборок для macOS

Перед подписью, следует:

1. Зарегистрироваться в [Apple Developer Program](https://developer.apple.com/programs/) (требует оплату раз в год)
2. Download and install [Xcode](https://developer.apple.com/xcode)
3. Сгенерировать [подписанные сертификаты](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Существует ряд инструментов для подписывания приложений:

- [`electron-osx-sign`] — устанавливаемая утилита для подписи.
- [`electron-packager`] включает в себя `electron-osx-sign`. Если вы используете `electron-packager`, укажите аргумент `--osx-sign=true` при сборке. 
    - [`electron-forge`] использует `electron-packager` внутри, поэтому можно использовать аргумент `osxSign` в конфиге.
- [`electron-builder`] имеет в себе возможности подписывания. Смотри страницу [electron.build/code-signing](https://www.electron.build/code-signing)

Больше информации на странице [Mac App Store Submission Guide](mac-app-store-submission-guide.md).

# Подписывание сборок для Windows

Перед подписью, следует:

1. Получить сертификат Windows Authenticode
2. Установить Visual Studio 2015 или 2017

Вы можете получить сертификат от множества продавцов, включая самых популярных:

- [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
- [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
- [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
- и куча других, множество магазинов вокруг для любых нужд; в общем, Гугл — твой друг

Существует ряд инструментов для подписывания приложений:

- [`electron-winstaller`] создаст инсталлятор для Windows и подпишет его
- [`electron-forge`] подписывает инсталляторы, сгенерированные через Squirrel.Windows или MSI.
- [`electron-builder`] подписывает некоторые приложения для Windows

## Магазин приложений Windows

Смотри страницу [Windows Store Guide](windows-store-guide.md).