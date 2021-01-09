# Підпис коду

Code signing is a security technology that you use to certify that an app was created by you.

На macOS система може виявити будь-які зміни в додатку, будь то зміни введені випадково, або через шкідливий код.

На Windows система встановлює рівень довіри для сертифікату вашого підпису коду з яким в разі його відсутності, або якщо ваш рівень довіри низький призведе до того, що діалоги безпеки відображатимуться при використанні вашої програми.  Довіряти рівень з часом дозволяє почати підписувати код якомога раніше.

Хоча можна розповсюджувати непідписані програми, це не рекомендується. За замовчуванням одночасно Windows і macOS, запобігайте завантаженню або виконанню непідписаних програм. Починаючи з macOS Catalina (версія 10.15), користувачам потрібно пройти через кілька ручних інструкцій, щоб відкрити непідписані програми.

![macOS Catalina Gatekeeper попередження: Розробник не можна відкрити, оскільки розробника неможливо перевірити](../images/gatekeeper.png)

Як бачите, користувачі отримують два варіанти: перемістіть програму прямо у смітник або скасовуйте запуск. Ви не хочете, щоб ваші користувачі бачили це діалогове вікно.

If you are building an Electron app that you intend to package and distribute, it should be code-signed. Додаток Mac і Windows не блокують додатків.

# Підписання збірки macOS

Перед підписанням macOS збірки, ви повинні зробити наступне:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Download and install [Xcode][]
3. Generate, download, and install [signing certificates][]

Є кілька інструментів для підписання упакованої програми:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. Якщо ви використовуєте `electron-packager`, передати `--osx-sign=true` , щоб підписати вашу збірку.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. Дивіться [electron.build/code-signing](https://www.electron.build/code-signing)

## Нотаризація

Починаючи з macOS Catalina, Apple вимагає для визначення програм. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. Вам не обов'язково потрібно завершити цей крок для кожної збірки, яку ви створите - тільки збірки, які ви маєте намір відправити користувачам.

## Mac App Store

See the [Mac App Store Guide][].

# Створення підписів Windows

Перед підписанням будівель Windows потрібно зробити наступне:

1. Отримати сертифікат коду авторизації Windows (потрібна річна комісія)
2. Встановіть Visual Studio 2015/2017 (щоб отримати набір підписів)

Ви можете отримати сертифікат про підписання коду від багатьох посередників. Ціни різні, так що це може коштувати вам Вашого часу для покупок. Популярні посередники включають у себе:

* [дігісерт](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Серед інших, будь ласка, займайтесь магазином, щоб знайти потрібне, Google - твій друг :)

Є кілька інструментів для підписання упакованої програми:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Windows Store

See the [Windows Store Guide][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
