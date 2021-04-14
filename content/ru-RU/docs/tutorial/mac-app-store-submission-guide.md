# Руководство по распространению с помощью Mac App Store

Начиная с версии 0.34.0, Electron позволяет отправлять упакованные приложения в Mac App Store (MAS). В этом руководстве содержится информация о том, как отправить ваше приложение и о ограничениях сборки MAS.

**Примечание:** Отправка приложения на Mac App Store требует регистрации в [apple Developer программе][developer-program], которая стоит денег.

## Как отправить приложение

Следующие шаги представляют собой простой способ отправить ваше приложение в Mac App Store. Однако эти шаги не гарантируют, что ваше приложение будет одобрено Apple; Вам еще нужно прочитать руководство Apple по отправке [App][submitting-your-app] о том как соответствовать требованиям Mac App Store.

### Получить сертификат

Чтобы отправить ваше приложение в Mac App Store, вы должны получить сертификат от Apple. Вы можете следить за [существующими][nwjs-guide] в Интернете.

### Получить Team ID

Прежде чем подписать приложение, вы должны знать идентификатор команды вашей учетной записи. Чтобы найти ваш Team ID, войдите в [Центр Разработчика Apple](https://developer.apple.com/account/), и нажмите на Членство в боковой панели. ID вашей команды появится в разделе Членство Информация под названием команды.

### Зарегистрируйте Ваше приложение

После завершения подготовительной работы вы можете упаковать ваше приложение, подписавшись на [Распределение приложений](application-distribution.md), и переходите к подписанию вашего приложения.

Во-первых, вы должны добавить `ElectronTeamID` ключ к веб- `Info.plist`приложения, имеет свой идентификатор команды в качестве его значения:

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
Вопрос!/bin/bash

- Имя вашего приложения.
АПП "YourApp"
- Путь вашего приложения для подписания.
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

Если вы только что в приложении песочнице под macOS, вы также должны прочитать Apple [Включение App Sandbox][enable-app-sandbox] иметь основную идею, а затем добавить ключи для разрешений, необходимых для вашего приложения на права файлов.

Помимо ручной подписи приложения, вы также можете использовать [-osx-sign][electron-osx-sign] для работы.

#### Нативные модули подписи

Нативные модули, используемые в вашем приложении, также должны быть подписаны. При использовании знака , убедитесь, что в списке аргументов указан путь к собранным двоичным папкам:

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Также обратите внимание на то, что родные модули могут иметь промежуточные файлы, которые не должны быть включены в (а также их нужно подписать). Если вы используете [-пакет][electron-packager] до версии 8.1.0, `--ignore=.+\.o$` к шагу сборки, чтобы игнорировать эти файлы. Версии 8.1.0 и позже игнорировать эти файлы по умолчанию.

### Загрузите приложение

После подписания приложения вы можете использовать App Loader для загрузки в iTunes Connect для обработки, убедившись, что вы [создали запись][create-record] перед загрузкой.

### Отправить ваше приложение на проверку

После этих шагов вы можете [приложение для просмотра][submit-for-review].

## Ограничения сборки MAS

Для того чтобы удовлетворить все требования для песочницы приложений, следующие модули были отключены в сборе MAS:

* `crashReporter`
* `autoUpdater`

и были изменены следующие поведения:

* Видеозапись может не работать на некоторых машинах.
* Некоторые функции специальных возможностей могут не работать.
* Приложения не будут знать о изменениях DNS.

Кроме того, из-за использования приложения песочнице, ресурсы, которые могут быть доступны приложение строго ограничены; Вы можете прочитать [App Sandboxing][app-sandboxing] для дополнительной информации.

### Дополнительные права

В зависимости от используемого Electron API вам может потребоваться добавить дополнительные права для вашего `родителя. список` файлов, которые смогут использовать эти API из сборки App Store вашего приложения для Mac на Mac.

#### Сетевой доступ

Включите исходящие сетевые подключения, чтобы позволить приложению подключаться к серверу:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Включите входящие сетевые подключения, чтобы позволить приложению открыть сеть с прослушиванием сокета:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

Более подробную информацию [можно получить в][network-access] ,6 доступа к сети.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

Более подробную информацию [можно получить в][user-selected] , ,  пользователь выбрал доступ к файлам.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Более подробную информацию [можно получить в][user-selected] , ,  пользователь выбрал доступ к файлам.

## Криптографические алгоритмы, которые использует Electron

В зависимости от стран, в которых вы выпускаете ваше приложение, вам может понадобиться для предоставления информации о криптографических алгоритмах, используемых в вашем программном обеспечении. Для получения дополнительной [можно получить документы об][export-compliance] соответствии шифрованию.

Electron использует следующие криптографические алгоритмы:

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](https://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](https://www.secg.org/sec1-v2.pdf)
* IDEA - "Об дизайне и безопасности блочных шифров" книга Х. Лай
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - https://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

[developer-program]: https://developer.apple.com/support/compare-memberships/
[submitting-your-app]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html
[nwjs-guide]: https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps
[enable-app-sandbox]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html
[create-record]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html
[electron-osx-sign]: https://github.com/electron-userland/electron-osx-sign
[electron-packager]: https://github.com/electron/electron-packager
[submit-for-review]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[export-compliance]: https://help.apple.com/app-store-connect/#/devc3f64248f
[user-selected]: https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6
[network-access]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9
