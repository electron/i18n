# Підпис коду

Code signing is a security technology that you use to certify that an app was created by you.

На macOS система може виявити будь-які зміни в додатку, будь то зміни введені випадково, або через шкідливий код.

На Windows система призначає рівень довіри до сертифікату вашого підпису коду , який у вас немає в наявності, або якщо ваш рівень довіри низький, це призведе до показу діалогів безпеки у разі використання вашої програми.  Збудування рівня довіри з часом для того, щоб почати підписувати код якомога раніше.

Хоча можна розповсюджувати непідписані програми, це не рекомендується. За замовчуванням одночасно Windows і macOS, запобігайте завантаженню або виконанню непідписаних програм. Починаючи з macOS Catalina (версія 10.15), користувачам потрібно пройти через кілька ручних кроків для відкриття непідписаних додатків.

![macOS Catalina Gatekeeper попередження: Додаток не можна відкрити, оскільки
розробник не може бути перевірений](../images/gatekeeper.png)

Як бачите, користувачі отримують два варіанти: перемістіть програму прямо у смітник або скасовуйте запуск. Ви не хочете, щоб ваші користувачі бачили це діалогове вікно.

If you are building an Electron app that you intend to package and distribute, it should be code-signed.

# Підписання & що відображає macOS збірку

Правильно підготовка macOS додатків для випуску потребує двох кроків: спочатку додаток повинен бути підписаний на код. Потім додаток повинен бути завантажений в Apple для процесу , що називається "нотації", де автоматизовані системи будуть надалі перевіряти чи ваш додаток не робить нічого, щоб загрожувати його користувачам.

Щоб розпочати процес, переконайтеся, що ви виконаєте вимоги для підпису й зверніть увагу на вашу програму:

1. Увімкнути у [Програма розробника Apple](https://developer.apple.com/programs/) (потрібна щорічна плата)
2. Завантажте та встановіть [Xcode](https://developer.apple.com/xcode) - для цього потрібен комп'ютер, що працює на macOS
3. Генерувати, завантажувати та встановлювати [сертифікати підпису](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Абоненти екосистеми Electron дозволяє налаштувати та свободу, тому існує декілька способів підписати вашу програму та замітити.

## `electron-forge`

Якщо ви використовуєте улюблений інструмент збірки Electron, для отримання вашого додатку підписаного та зазначення потребує кілька доповнень до вашої конфігурації. [Forge](https://electronforge.io) це збірка офіційних інструментів Electron, використовуючи [`electron-packager`], [`electron-osx-sign`], та [`electron-notarize`] під кодом.

Давайте розглянемо приклад конфігурації з усіма обов'язковими полями. Не всі з них є обов'язковими: інструменти будуть достатньо розумними, щоб автоматично знайти відповідний `ідентифікатор`наприклад, але ми рекомендуємо що ви явні.

```json
{
  "name": "my-app",
  "версія": "0.0. ",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Заявки розробника: Felix Rieseberg (LT94ZKYDCJ)",
          "harded-runtime": true,
          "права": "права на права". list",
          "entitlements-inherit": "прав. list",
          "signature-flags": "бібліотека"
        },
        "osxNotarize": {
          "appleId": "felix@felix. un",
          "appleIdPassword": "my-apple-id-password",
        }
      }
    }
  }
}
```

На `plist` файл посилається тут на наступні macOS-відповідні права щоб забезпечити механізми безпеки Apple, які ваш додаток робить ці речі не означаючи ніякої шкоди:

```xml
<?xml версія="1.0" кодування="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Щоб побачити все це в дії, перевірте вихідний код Electron Fiddle's [, особливо його `electron-forge` конфігурації файлу](https://github.com/electron/fiddle/blob/master/forge.config.js).

Якщо ви плануєте доступ до мікрофона або камери у вашому додатку, використовуючи API Electron, ви також повинні додати наступні дозволи:

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/>
```

Якщо це не присутні у ваших правах під час виклику, наприклад:

```js
const { systemPreferences } = require('electron')

const мікрофон = systemPreferences.askForMediaAccess('microphone')
```

Може призвести до збою у програмі. Перегляньте розділ доступу ресурсів в [Змінений Runtime](https://developer.apple.com/documentation/security/hardened_runtime) для отримання додаткової інформації та прав, які вам знадобляться.

## `electron-builder`

Electron Builder приймає користувацьке рішення для підписання застосунку. You can find [its documentation here](https://www.electron.build/code-signing).

## `електро-пакувальник`

Якщо ви не використовуєте інтегрований конвеєр збірки, такий як Forge чи Будівельник, ,швидше за все, з використанням [`electron-packager`], який включає в себе [`electron-osx-sign`] і [`electron-notarize`].

Якщо ви використовуєте Packagager's API, ви можете передати [у конфігурації, що обидва знаки і поміщати ваш додаток](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    ідентичність: 'ID розробника: Felix Rieseberg (LT94ZKYDCJ)',
    'жорсткий runtime': true,
    право на отримання прав: 'прав. list',
    'entitlements-inherit': 'entitlements-inherit': 'entitlements. list',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
    appleIdPassword: 'my-apple-id-password'
  }
})
```

На `plist` файл посилається тут на наступні macOS-відповідні права щоб забезпечити механізми безпеки Apple, які ваш додаток робить ці речі не означаючи ніякої шкоди:

```xml
<?xml версія="1.0" кодування="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac App Store

Дивіться [Mac App Store](mac-app-store-submission-guide.md).

# Створення підписів Windows

Перед підписанням будівель Windows потрібно зробити наступне:

1. Отримати сертифікат коду авторизації Windows (потрібна річна комісія)
2. Встановіть Visual Studio для отримання утиліти для підписання (безкоштовна [версія спільноти ](https://visualstudio.microsoft.com/vs/community/) достатньо)

Ви можете отримати сертифікат про підписання коду від багатьох посередників. Ціни варіюються, отже це може коштувати вам Вашого часу в магазині. Популярні посередники включають у себе:

* [дігісерт](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Серед інших, будь ласка, пошукайте команду, яка вам потрібна, Google - ваш друг 😄

Є кілька інструментів для підписання упакованої програми:

* [`electron-winstaller`] сгенерує інсталятор для вікон і підписує його на
* [`electron-forge`] можуть підписати встановлювачі, які вони генерують, через Squirrel.Windows або цілі MSI.
* [`electron-builder`] може підписати частину своїх цілей у вікні

## Windows Store

Дивіться [Інструкція Windows Store](windows-store-guide.md).
