# Dodawanie aplikacji do Mac App Store

Od v0.34.0, Electron pozwala na przesyłanie spakowanych aplikacji do Mac App Store (MAS). Ten przewodnik zawiera informacje na temat: jak przesłać aplikację i ograniczeń wersji MAS.

**Note:** Submitting an app to Mac App Store requires enrolling in the [Apple Developer Program][developer-program], which costs money.

## Jak przesłać aplikację

Poniższe kroki wprowadzają prosty sposób na przesłanie aplikacji do Mac App Store. However, these steps do not ensure your app will be approved by Apple; you still need to read Apple's [Submitting Your App][submitting-your-app] guide on how to meet the Mac App Store requirements.

### Pobierz certyfikat

Aby przesłać aplikację do Mac App Store, najpierw musisz uzyskać certyfikat z Apple. You can follow these [existing guides][nwjs-guide] on web.

### Pobierz ID Drużyny

Przed podpisaniem aplikacji musisz znać Drużynowy ID swojego konta. Aby zlokalizować swojego Drużynowego ID, zaloguj się do [Centrum programisty Apple](https://developer.apple.com/account/), i kliknij członkostwo na pasku bocznym. Twój Team ID pojawia się w sekcji Informacje pod nazwą zespołu.

### Zarejestruj Swoją Aplikację

Po zakończeniu prac przygotowawczych możesz spakować swoją aplikację obserwując [Dystrybucję aplikacji](application-distribution.md), a następnie przejdź do podpisywania aplikacji.

Najpierw musisz dodać klucz `ElectronTeamID` do informacji `aplikacji. lista`, która ma Twój identyfikator zespołu jako swoją wartość:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Potem, musisz przygotować drzewo plików uprawnień.

`pedi.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com. pple.security.app-sandbox</key>
    <true/>
    <key>com.jabłko. ecurity.inherit</key>
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
    <key>com.apple.security pp-sandbox</key>
    <true/>
    <key>com.apple.security grupy pplication-groups</key>
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
    <key>com.apple.security pp-sandbox</key>
    <true/>
  </dict>
</plist>
```

Musisz zastąpić `TEAM_ID` swoim identyfikatorem zespołu i zastąpić `twój.bundle.id` pakietem ID aplikacji.

A następnie podpisz swoją aplikację za pomocą następującego skryptu:

```sh
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH="/path/to/YourApp.app"
# Ścieżka do miejsca, w którym chcesz umieścić podpisany pakiet.
RESULT_PATH="~/Desktop/$APP.pkg"
# Nazwa żądanych certyfikatów.
APP_KEY="Aplikacja programistów Mac: Nazwa firmy (APPIDENTITY)"
INSTALLER_KEY="Instalator programisty Mac: Nazwa firmy (APPIDENTITY)"
# Ścieżka twoich plików.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework. framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework. ramework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode. ylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework. ramework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/$APP Helper. pp/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/$APP Helper. pp/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST"$APP_PATH/Contents/Library/LoginItems/$APP Login Helper. pp/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST"$APP_PATH/Contents/Library/LoginItems/$APP Helper. pp/"
ekoprojekt -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
ekoprojektu -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

If you are new to app sandboxing under macOS, you should also read through Apple's [Enabling App Sandbox][enable-app-sandbox] to have a basic idea, then add keys for the permissions needed by your app to the entitlements files.

Apart from manually signing your app, you can also choose to use the [electron-osx-sign][electron-osx-sign] module to do the job.

#### Podpisz natywne moduły

Moduły natywne używane w aplikacji również muszą być podpisane. Jeśli używasz electron-osx-sign, upewnij się, że ścieżka do wbudowanych binariów znajduje się na liście argumentów :

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Also note that native modules may have intermediate files produced which should not be included (as they would also need to be signed). If you use [electron-packager][electron-packager] before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Wersje 8.1.0 i później ignorują te pliki domyślnie.

### Prześlij swoją aplikację

After signing your app, you can use Application Loader to upload it to iTunes Connect for processing, making sure you have [created a record][create-record] before uploading.

### Prześlij swoją aplikację do sprawdzenia

After these steps, you can [submit your app for review][submit-for-review].

## Ograniczenia budowy MAS

Aby spełnić wszystkie wymagania dla piaskownicy aplikacji, następujące moduły zostały wyłączone w kompilacji MAS:

* `crashReporter`
* `autoUpdater`

i następujące zachowania zostały zmienione:

* Nagrywanie może nie działać na dla niektórych urządzeń.
* Niektóre funkcje dostępności mogą nie działać.
* Aplikacje nie będą świadome zmian DNS.

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing][app-sandboxing] for more information.

### Dodatkowe uprawnienia

W zależności od tego, z jakich API Electron korzysta twoja aplikacja, być może będziesz musiał dodać dodatkowe uprawnienia do swojego `rodzica. lista` plików, aby móc korzystać z tych API z aplikacji w wersji Mac App Store.

#### Dostęp do sieci

Włącz połączenia sieciowe wychodzące, aby umożliwić aplikacji łączenie się z serwerem:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Włącz przychodzące połączenia sieciowe, aby umożliwić aplikacji otwarcie sieci gniazda słuchania:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

See the [Enabling Network Access documentation][network-access] for more details.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.only</key>
<true/>
```

See the [Enabling User-Selected File Access documentation][user-selected] for more details.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

See the [Enabling User-Selected File Access documentation][user-selected] for more details.

## Algorytmy kryptograficzne używane przez Electron

W zależności od krajów, w których udostępniasz aplikację, możesz być wymagany do dostarczenia informacji o algorytmach kryptograficznych używanych w Twoim oprogramowaniu . See the [encryption export compliance docs][export-compliance] for more information.

Electron używa poniższych algorytmów kryptograficznych:

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
* IDEA - książka „Design and Security of Block Ciphers” autorstwa X. Lai
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
