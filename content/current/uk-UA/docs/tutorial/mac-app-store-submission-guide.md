# Інструкція Додання в Mac App Store

Оскільки v0.34.0, Electron дозволяє надсилати упаковані програми до Mac App Store (MAS). У цьому керівництві є інформація на: як представити ваш застосунок і обмеження збірки MAS.

**Примітка:** Надсилання програми до Mac App Store потребує анні в програмі [Apple Developer ](https://developer.apple.com/support/compare-memberships/), яка коштує грошей.

## Як розмістити ваш додаток

Наступні кроки представляють простий спосіб відправки вашої програми в Mac App Store. Однак, ці кроки не гарантують, що ваш додаток буде схвалено Apple; вам все ще потрібно прочитати Apple [На давача програми](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) посібника на як відповідати вимогам Mac App Store.

### Отримати сертифікат

Для надсилання програми до Mac App Store, спочатку необхідно отримати сертифікат з Apple. За цим ви можете слідкувати [існуючі інструкції](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) в Мережі.

### Отримати ID команди

Перш ніж підписати ваш додаток, ви повинні знати ID команди вашого облікового запису. Щоб знайти спільний ID, увійдіть до [Apple Developer Center](https://developer.apple.com/account/), і натисніть Членство в бічній панелі. ID вашої команди з'являється в належності розділ інформації під назвою команди.

### Зареєструйте свій додаток

Після завершення підготовки ви можете прикріпити ваш додаток слідуючи [Дистрибутиву Програми](application-distribution.md), а потім підписати додаток.

Спочатку потрібно додати `ключ ElectronTeamID` до додатку `Info. список`, який має ідентифікатор вашої команди як своє значення:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Потім потрібно підготувати три файли прав.

`child.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
    <true/>
  </dict>
</plist>
```

`parent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.application-groups</key>
    <array>
      <string>TEAM_ID.your.bundle.id</string>
    </array>
  </dict>
</plist>
```

`loginhelper.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
  </dict>
</plist>
```

Ви повинні замінити `TEAM_ID` на ваш командний ідентифікатор і замінити `your.bundle.id` на ID вашого застосунку.

І тоді підпишіть вашу програму за допомогою наступного сценарію:

```sh
#!/bin/bash

# Ім'я Вашого додатку.
APP="YourApp"
# Шлях до вашої програми для підписання.
APP_PATH="/path/to/YourApp.app"
# Шлях до місця, на яку потрібно перейти підписаний пакунок.
RESULT_PATH="~/Desktop/$APP.pkg"
# Ім'я сертифікатів, які ви запитували.
APP_KEY="Сторонній додаток для розробників Mac: Назва компанії (APPIDENTITY)"
INSTALLER_KEY="Установник розробників сторонніх осіб: Назва компанії (APPIDENTITY)"
# Шлях ваших плутаних файлів.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

Якщо ви новачок в пісочницю програми на macOS, ви також повинні прочитати через Apple [Увімкнення пісочниці](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) для отримання базової ідеї ще додавайте ключі для дозволів, необхідних для вашої програми до файлів прав.

Крім ручного підписування застосунку, ви також можете обрати модуль [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) для виконання роботи.

#### Модулі Sign ative

Також слід підписати власні модулі, які використовувалися у вашому застосунку. If using electron-osx-sign, be sure to include the path to the built binaries in the argument list:

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Також зверніть увагу, що вбудовані модулі можуть мати проміжні файли, які не повинні бути включені (як вони також повинні бути підписані). Якщо ви використовуєте [electron-packager](https://github.com/electron/electron-packager) до версії 8.1.0, додайте `--ignore=.+\.o$` до вашого кроку збірки, щоб ігнорувати ці файли. Версії 8.1.0 і пізніше ігнорувати ці файли за замовчуванням.

### Завантажити додаток

Після підписання вашого додатку, ви можете використовувати Application Loader для завантаження його в iTunes Connect для обробки, переконайтеся, що ви [створили запис](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) перед завантаженням.

### Надіслати додаток для перегляду

Після цього ви можете [надіслати ваш додаток для перегляду](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Обмеження збірки MAS

Для того, щоб задовольнити всі вимоги для пісочниці додатків, наступні модулі були вимкнені в MAS збірці:

* `crashReporter`
* `autoUpdater`

і наступні поведінки були змінені:

* Відеозйомка не може працювати на деяких машинах.
* Деякі функції доступності можуть не працювати.
* Додатки не будуть знати про зміни в DNS.

Також через використання пісочниці додатків, ресурси, які можуть бути доступні додаток суворо обмежений; ви можете прочитати [App Sandboxing](https://developer.apple.com/app-sandboxing/) для додаткової інформації.

### Додаткові заголовки

Залежно від того, який API Electron використовує ваш додаток, вам може знадобитися додати додаткові права для вашого `батьківського об'єкта. список` файл який може використовувати ці API з вашого додатку Mac App Store build.

#### Доступ до мережі

Увімкніть вихідні з’єднання, щоб додаток підключився до сервера:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Увімкніть вхідні підключення до мережі, щоб дозволити вам відкрити мережу слухати сокет:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

див. [Увімкнення документації доступу до мережі](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) для більш подробиць.

#### діалогове вікно

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

Дивіться [Увімкнення документації вибраного користувачем файлу](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) на додаткової інформації.

#### діалогове вікно навігації

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Дивіться [Увімкнення документації вибраного користувачем файлу](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) на додаткової інформації.

## Криптографічні алгоритми, що використовуються Electron

Залежно від країн, в яких ви випускаєте свій додаток, може знадобитися , щоб надати інформацію про криптографічні алгоритми, які використовуються у вашому програмному забезпеченні . See the [encryption export compliance docs](https://help.apple.com/app-store-connect/#/devc3f64248f) for more information.

Electron використовує наступні криптографічні алгоритми:

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](https://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144) [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](https://www.secg.org/sec1-v2.pdf)
* IDEA - "На розробці та безпеці блок-шифрування" книгою X. Лай
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - https://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)
