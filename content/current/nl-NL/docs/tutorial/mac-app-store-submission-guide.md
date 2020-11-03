# Mac App Store indiening gids

Sinds v0.34.0 kan Electron verpakte apps indienen in de Mac App Store (MAS). Deze handleiding biedt informatie op: hoe uw app en de beperkingen van de MAS build.

**Opmerking:** verzenden van een app naar Mac App Store vereist inschakelen in het [Apple Developer Programma](https://developer.apple.com/support/compare-memberships/), wat geld kost.

## Hoe verstuur je app

De volgende stappen introduceren een eenvoudige manier om uw app te verzenden naar de Mac App Store. Deze stappen zorgen er echter niet voor dat je app wordt goedgekeurd door Apple; u moet nog steeds Apple's [inzenden van uw app](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) gids over het voldoen aan de Mac App Store-eisen.

### Certificaat verkrijgen

Om je app in de Mac App Store te kunnen plaatsen, moet je eerst een certificaat krijgen van Apple. Je kunt deze [bestaande handleidingen](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) op het internet volgen.

### Verkrijg Team ID

Voordat je je app tekent, moet je het Team ID van je account kennen. To locate your Team ID, Sign in to [Apple Developer Center](https://developer.apple.com/account/), and click Membership in the sidebar. Je team-ID verschijnt in het Lidmaatschap Informatiegedeelte onder de naam van het team.

### Onderteken je app

Na het voltooien van het voorbereidingswerk, kunt u uw app verpakken met het volgende [Applicatie Distributie](application-distribution.md), en ga vervolgens naar het ondertekenen van uw app.

Eerst moet u een `ElectronTeamID` sleutel toevoegen aan de `Info. lijst`, welke uw Team ID als waarde heeft:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Vervolgens moeten er drie bestanden over rechten worden opgesteld.

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
<!DOCTYPE plist PUBLIC "-/Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0. td">
<plist version="1.0">
  <dict>
    <key>com.apple.security. pp-sandbox</key>
    <true/>
  </dict>
</plist>
```

Je moet `TEAM_ID` vervangen door je Team ID, en `jouw.bundle.id` vervangen door de Bundle ID van je app.

En teken vervolgens je app met het volgende script:

```sh
#!/bin/bash

# Naam van uw app.
APP="YourApp"
# Het pad van uw app om te ondertekenen.
APP_PATH="/path/naar/YourApp.app"
# Het pad naar de locatie dat u het ondertekende pakket wilt plaatsen.
RESULT_PATH="~/Desktop/$APP.pkg"
# De naam van de certificaten die u heeft aangevraagd.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# Het pad van uw plist bestanden.
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

Als je nieuw bent bij de sandboxing van app onder macOS, leest u ook door Apple's [Laat App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) inschakelen om een fundamenteel idee te hebben. voeg vervolgens sleutels toe voor de machtigingen die je app nodig heeft op de rechten bestanden.

Naast het handmatig ondertekenen van uw app, kunt u ook de module [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) gebruiken om deze taak te vervullen.

#### Oorspronkelijke modules ondertekenen

Moederlijke modules die gebruikt worden in uw app moeten ook ondertekend worden. Als u electron-osx-sign, zorg er dan voor dat u het pad naar de gebouwde binaries in de argumentenlijst opneemt:

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Houd er ook rekening mee dat inheemse modules tussentijdse bestanden geproduceerd kunnen hebben die niet moeten worden opgenomen (omdat ze ook moeten worden ondertekend). Als je [electron-packager](https://github.com/electron/electron-packager) voor versie 8.1.0 gebruikt, voeg je `--ignore=.+\.o$` toe aan je build stap om deze bestanden te negeren. Versies 8.1.0 en later kunnen deze bestanden standaard negeren.

### Upload je app

Na het ondertekenen van uw app, kunt u Applicatie Loader gebruiken om deze te uploaden naar iTunes Connect voor verwerking, zorg ervoor dat u [een record](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) hebt aangemaakt voor het uploaden.

### Dien uw app ter beoordeling in

Na deze stappen kunt u [uw app ter beoordeling verzenden](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Beperkingen van MAS Build

Om te voldoen aan alle vereisten voor app sandboxing, zijn de volgende modules uitgeschakeld in de MAS build:

* `crashReporter`
* `autoUpdater`

en de volgende gedragingen zijn gewijzigd:

* Video-opname werkt mogelijk niet voor sommige machines.
* Bepaalde toegankelijkheidsfuncties werken mogelijk niet.
* Apps zullen niet op de hoogte zijn van DNS-wijzigingen.

Ook, door het gebruik van app sandboxing, zijn de bronnen die kunnen worden geopend door de app strikt beperkt; lees [App Sandboxing](https://developer.apple.com/app-sandboxing/) voor meer informatie.

### Extra titels

Afhankelijk van welke Electron API's je app gebruikt, moet je mogelijk extra rechten toevoegen aan je `ouder. lijst van` bestand om deze API's te kunnen gebruiken uit de Mac App Store versie van uw app.

#### Netwerk toegang

Schakel uitgaande netwerkverbindingen in zodat uw app verbinding kan maken met een server:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Inkomende netwerkverbindingen inschakelen zodat uw app een netwerk kan openen met socket luistert:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

Zie de [Inschakelen van netwerktoegang-documentatie](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) voor meer details.

#### dialog.showOpenDialoogvenster

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

Zie de [Inschakelen van gebruiker geselecteerde bestandstoegang-documentatie](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) voor meer details.

#### dialoog.showOpslaandialoogvenster

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Zie de [Inschakelen van gebruiker geselecteerde bestandstoegang-documentatie](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) voor meer details.

## Cryptografische algoritmen gebruikt door Electron

Afhankelijk van de landen waarin u uw app publiceert, u kunt verplicht zijn om informatie te verstrekken over de cryptografische algoritmen die worden gebruikt in uw software. Zie de [encryptie export conformiteitsdocumenten](https://help.apple.com/app-store-connect/#/devc3f64248f) voor meer informatie.

Electron gebruikt cryptografische algoritmes:

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
* IDEA - "Op het ontwerp en de beveiliging van Blok Ciphers" boek door X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - https://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)
