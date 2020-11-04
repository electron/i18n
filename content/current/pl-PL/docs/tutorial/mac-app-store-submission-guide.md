# Dodawanie aplikacji do Mac App Store

Od v0.34.0, Electron pozwala na przesyłanie spakowanych aplikacji do Mac App Store (MAS). Ten przewodnik zawiera informacje na temat: jak przesłać aplikację i ograniczeń wersji MAS.

**Uwaga:** Przesyłanie aplikacji do Mac App Store wymaga zapisania do [Apple Developer Program](https://developer.apple.com/support/compare-memberships/), co kosztuje pieniądze.

## Jak przesłać aplikację

Poniższe kroki wprowadzają prosty sposób na przesłanie aplikacji do Mac App Store. Jednak te kroki nie gwarantują, że Twoja aplikacja zostanie zatwierdzona przez Apple; nadal musisz przeczytać [Prześlij Twoją aplikację](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) poradnik , jak spełnić wymagania Mac App Store.

### Pobierz certyfikat

Aby przesłać aplikację do Mac App Store, najpierw musisz uzyskać certyfikat z Apple. Możesz stosować się do tych [istniejących przewodników](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) w Internecie.

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

# Nazwa aplikacji.
APP="YourApp"
# Ścieżka do podpisania.
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

Jeśli jesteś nowy w piaskownicy aplikacji pod macOS, powinieneś również przeczytać Apple's [Enabling App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) , aby mieć podstawowy pomysł, następnie dodaj klucze dla uprawnień wymaganych przez aplikację do plików uprawnień.

Oprócz ręcznego podpisywania aplikacji, możesz również wybrać moduł [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) do wykonania zadania.

#### Podpisz natywne moduły

Moduły natywne używane w aplikacji również muszą być podpisane. Jeśli używasz electron-osx-sign, upewnij się, że ścieżka do wbudowanych binariów znajduje się na liście argumentów :

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Also note that native modules may have intermediate files produced which should not be included (as they would also need to be signed). Jeśli używasz [electron-packer](https://github.com/electron/electron-packager) przed wersją 8.1.0, dodaj `--ignore=.+\.o$` do kroku budowy, aby zignorować te pliki. Wersje 8.1.0 i później ignorują te pliki domyślnie.

### Prześlij swoją aplikację

Po podpisaniu aplikacji, możesz użyć Obciążenia Aplikacji, aby przesłać go do iTunes Połącz do przetwarzania, upewnij się, że [utworzyłeś rekord](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) przed przesłaniem.

### Prześlij swoją aplikację do sprawdzenia

Po tych krokach, możesz [przesłać swoją aplikację do sprawdzenia](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Ograniczenia budowy MAS

Aby spełnić wszystkie wymagania dla piaskownicy aplikacji, następujące moduły zostały wyłączone w kompilacji MAS:

* `crashReporter`
* `autoUpdater`

i następujące zachowania zostały zmienione:

* Nagrywanie może nie działać na dla niektórych urządzeń.
* Niektóre funkcje dostępności mogą nie działać.
* Aplikacje nie będą świadome zmian DNS.

Ponadto, ze względu na korzystanie z piaskownicy aplikacji, zasoby, do których może uzyskać dostęp, są ściśle ograniczone; możesz przeczytać [App Sandboxing](https://developer.apple.com/app-sandboxing/) po więcej informacji.

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

Zobacz [Włączanie dokumentacji dostępu do sieci](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) po więcej szczegółów.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.only</key>
<true/>
```

Zobacz [Włączanie dokumentacji dostępu do wybranych przez użytkownika plików](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) po szczegółów.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Zobacz [Włączanie dokumentacji dostępu do wybranych przez użytkownika plików](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) po szczegółów.

## Algorytmy kryptograficzne używane przez Electron

W zależności od krajów, w których udostępniasz aplikację, możesz być wymagany do dostarczenia informacji o algorytmach kryptograficznych używanych w Twoim oprogramowaniu . Zobacz [szyfrujące dokumenty zgodności](https://help.apple.com/app-store-connect/#/devc3f64248f) aby uzyskać więcej informacji.

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
