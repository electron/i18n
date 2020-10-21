# Руководство по распространению с помощью Mac App Store

Начиная с версии 0.34.0, Electron позволяет отправлять упакованные приложения в Mac App Store (MAS). В этом руководстве содержится информация о том, как отправить ваше приложение и о ограничениях сборки MAS.

**Примечание:** Отправка приложения в Mac App Store требует регистрации в [программе Apple Developer](https://developer.apple.com/support/compare-memberships/), которая стоит денег.

## Как отправить приложение

Следующие шаги представляют собой простой способ отправить ваше приложение в Mac App Store. However, these steps do not ensure your app will be approved by Apple; you still need to read Apple's [Submitting Your App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) guide on how to meet the Mac App Store requirements.

### Получить сертификат

Чтобы отправить ваше приложение в Mac App Store, вы должны получить сертификат от Apple. Вы можете следовать этим [существующим руководствам](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) в Интернете.

### Получить Team ID

Прежде чем подписать приложение, вы должны знать идентификатор команды вашей учетной записи. Чтобы найти ваш Team ID, войдите в [Центр Разработчика Apple](https://developer.apple.com/account/), и нажмите на Членство в боковой панели. ID вашей команды появится в разделе Членство Информация под названием команды.

### Зарегистрируйте Ваше приложение

После завершения подготовительной работы вы можете упаковать ваше приложение, подписавшись на [Распределение приложений](application-distribution.md), и переходите к подписанию вашего приложения.

First, you have to add a `ElectronTeamID` key to your app's `Info.plist`, which has your Team ID as its value:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Затем вам нужно подготовить три файла.

`ребенок.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com. pple.security.app-sandbox</key>
    <true/>
    <key>com.apple. ecurity.herit</key>
    <true/>
  </dict>
</plist>
```

`parent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security. песочница</key>
    <true/>
    <key>ком.apple.security. pplication-groups</key>
    <array>
      <string>TEAM_ID. our.bundle.id</string>
    </array>
  </dict>
</plist>
```

`loginhelper.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0. td">
<plist version="1.0">
  <dict>
    <key>com.apple.security. песочница</key>
    <true/>
  </dict>
</plist>
```

Вы должны заменить `TEAM_ID` на ваш ID команды и заменить `ваш набор файлов.id` идентификатором вашего приложения.

И затем подпишите ваше приложение следующим сценарием:

```sh
#!/bin/bash

# Имя вашего приложения.
APP="YourApp"
# Путь вашего приложения к подписанию.
APP_PATH="/path/to/YourApp.app"
# Путь к местоположению, которое вы хотите поставить подписанный пакет.
RESULT_PATH="~/Desktop/$APP.pkg"
# Имя запрошенного сертификата.
APP_KEY="Третье приложение разработчика Mac: Имя компании (APPIDENTITY)"
INSTALLER_KEY="Сторонник разработчика Mac: название компании (APPIDENTITY)"
# путь к вашим файлам из списка.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework. ramework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework. ramework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode. ylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework. ramework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/$APP Helper. PG/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/$APP Helper. "
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST"$APP_PATH/Contents/Library/LoginItems/$APP Login Helper. pp/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST"$APP_PATH/Contents/Library/LoginItems/$APP Login Helper. pp/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST"$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

Если вы новичок в режиме песочницы приложений под macOS, вам также следует прочитать через япля [включив App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) , чтобы получить базовую идею, затем добавьте ключи для разрешений, необходимых вашему приложению в файлы прав.

Кроме того, вы можете вручную подписать ваше приложение, используя модуль [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) для выполнения работы.

#### Нативные модули подписи

Нативные модули, используемые в вашем приложении, также должны быть подписаны. При использовании знака , убедитесь, что в списке аргументов указан путь к собранным двоичным папкам:

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Также обратите внимание на то, что родные модули могут иметь промежуточные файлы, которые не должны быть включены в (а также их нужно подписать). Если вы используете [электронных пакетов](https://github.com/electron/electron-packager) до версии 8.1.0, добавьте `--ignore=.+\.o$` к вашему шагу сборки, чтобы игнорировать эти файлы. Версии 8.1.0 и позже игнорировать эти файлы по умолчанию.

### Загрузите приложение

После подписания вашего приложения, вы можете использовать загрузчик приложений для загрузки в iTunes Подключиться для обработки, убедитесь, что вы создали [запись](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) перед загрузкой.

### Отправить ваше приложение на проверку

После этих шагов вы можете [отправить ваше приложение на проверку](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Ограничения сборки MAS

Для того чтобы удовлетворить все требования для песочницы приложений, следующие модули были отключены в сборе MAS:

* `crashReporter`
* `autoUpdater`

и были изменены следующие поведения:

* Видеозапись может не работать на некоторых машинах.
* Некоторые функции специальных возможностей могут не работать.
* Приложения не будут знать о изменениях DNS.

Кроме того, из-за использования песочницы приложений, ресурсы, к которым можно получить доступ , строго ограничены; вы можете прочитать [песочницу приложения](https://developer.apple.com/app-sandboxing/) для более подробной информации.

### Дополнительные права

Depending on which Electron APIs your app uses, you may need to add additional entitlements to your `parent.plist` file to be able to use these APIs from your app's Mac App Store build.

#### Network Access

Enable outgoing network connections to allow your app to connect to a server:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Enable incoming network connections to allow your app to open a network listening socket:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

See the [Enabling Network Access documentation](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) for more details.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

See the [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) for more details.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

See the [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) for more details.

## Криптографические алгоритмы, которые использует Electron

В зависимости от стран, в которых вы выпускаете ваше приложение, вам может понадобиться для предоставления информации о криптографических алгоритмах, используемых в вашем программном обеспечении. Смотрите [документы по экспорту шифрования](https://help.apple.com/app-store-connect/#/devc3f64248f) для дополнительной информации.

Electron использует следующие криптографические алгоритмы:

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
* IDEA - "On the Design and Security of Block Ciphers" book by X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)
