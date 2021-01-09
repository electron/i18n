# Ghid de depunere a aplicației Mac

De la v0.34.0, Electron permite trimiterea de aplicații împachetate către Mac App Store (MAS). Acest ghid oferă informații despre cum să trimiteți aplicația dvs. și limitările MAS construite.

**Note:** Submitting an app to Mac App Store requires enrolling in the [Apple Developer Program][developer-program], which costs money.

## Cum să trimiți aplicația ta

Următorii pași introduc o modalitate simplă de a trimite aplicația către Mac App Store. However, these steps do not ensure your app will be approved by Apple; you still need to read Apple's [Submitting Your App][submitting-your-app] guide on how to meet the Mac App Store requirements.

### Obține certificatul

Pentru a trimite aplicația ta către Magazinul de aplicații Mac, trebuie mai întâi să obții un certificat de la Apple. You can follow these [existing guides][nwjs-guide] on web.

### Obține ID-ul Echipei

Înainte de a vă semna aplicația, trebuie să cunoașteți ID-ul echipei contului dvs. Pentru a localiza ID-ul echipei tale, autentifică-te la [Apple Developer Center](https://developer.apple.com/account/), și apasă pe abonament în bara laterală. ID-ul echipei dvs. apare în secțiunea de membri Informații sub numele echipei.

### Semnează aplicația ta

După finalizarea lucrării de pregătire, puteți să vă pachetați aplicația urmărind [Distribuția Aplicației](application-distribution.md), și apoi mergi la semnarea aplicației.

În primul rând, trebuie să adaugi cheia `ElectronTeamID` la `informații ale aplicației tale. lista`, care are ca valoare ID-ul echipei tale:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Apoi, trebuie să pregătiți trei dosare de drepturi.

`child.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-/Apple///DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtdd">
<plist version="1.0">
  <dict>
    <key>com. pple.security.app-sandbox</key>
    <true/>
    <key>com.apple. ecurity.inherit</key>
    <true/>
  </dict>
</plist>
```

`parent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-/Apple///DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security. pp-sandbox</key>
    <true/>
    <key>com.apple.security. grupuri pplication-groups</key>
    <array>
      <string>TEAM_ID. our.bundle.id</string>
    </array>
  </dict>
</plist>
```

`loginhelper.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!Pistul DOCTYPE PUBLIC "-/Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0. td">
<plist version="1.0">
  <dict>
    <key>com.apple.security. pp-sandbox</key>
    <true/>
  </dict>
</plist>
```

Trebuie să înlocuiești `TEAM_ID` cu ID-ul echipei tale și să înlocuiești `your.bundle.id` cu ID-ul Bundle al aplicației tale.

Și apoi semnați aplicația cu următorul script:

```sh
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH="/path/to/YourApp.app"
# Calea către locaţia pe care doriţi să puneţi pachetul semnat.
RESULT_PATH="~/Desktop/$APP.pkg"
# Numele certificatelor pe care le-ați solicitat.
APP_KEY="3rd party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)
# Calea fişierelor tale pliste.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/către/lo/helper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" " "$FRAMEWORKS_PATH/Cadrul Electron. ramework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Cadrul Electron. ramework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode. ylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Cadrul Electron. ramework"
codesign -s "$APP_KEY" -f --Drepturi "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Ajutor. pp/Contents/MacOS/$APP Ajutor"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" " "$FRAMEWORKS_PATH/$APP Ajutor. pp/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper. pp/Contents/MacOS/$APP Ajutor de conectare
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Librărie/LoginElemente/$APP Ajutor de Autentificare. pp/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

produs build --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

If you are new to app sandboxing under macOS, you should also read through Apple's [Enabling App Sandbox][enable-app-sandbox] to have a basic idea, then add keys for the permissions needed by your app to the entitlements files.

Apart from manually signing your app, you can also choose to use the [electron-osx-sign][electron-osx-sign] module to do the job.

#### Semnează module native

Modulele native utilizate în aplicația dvs. trebuie, de asemenea, să fie semnate. Dacă utilizați electron-osx-sign, asigurați-vă că includeți calea către binarele construite în lista de argumentare :

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

De asemenea, rețineți că modulele native pot avea fișiere intermediare produse care nu ar trebui incluse (deoarece ar trebui să fie și semnate). If you use [electron-packager][electron-packager] before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Versiuni 8.1.0 și mai târziu ignorați fișierele în mod implicit.

### Încarcă aplicația ta

After signing your app, you can use Application Loader to upload it to iTunes Connect for processing, making sure you have [created a record][create-record] before uploading.

### Trimite aplicația ta pentru recenzie

After these steps, you can [submit your app for review][submit-for-review].

## Limitări ale MAS Build

Pentru a satisface toate cerinţele pentru sandbox-ul aplicaţiilor, următoarele module au fost dezactivate în MAS construit:

* `crashReporter`
* `autoUpdater`

și următoarele comportamente au fost schimbate:

* Este posibil ca captura video să nu funcţioneze pentru unele maşini.
* Este posibil ca anumite caracteristici de accesibilitate să nu funcționeze.
* Aplicațiile nu vor avea cunoștință de modificările DNS.

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing][app-sandboxing] for more information.

### Drepturi suplimentare

În funcție de ce aplicație Electron APIă aplicația ta, s-ar putea să fie nevoie să adaugi drepturi suplimentare la `părintele tău. listează` fișierul pentru a putea utiliza aceste API-uri din calculatorul aplicației Mac App Store.

#### Acces la reţea

Activează conexiunile de rețea de ieșire pentru a permite aplicației să se conecteze la un server:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Activați conexiunile de rețea primite pentru a permite aplicației dvs. să deschidă o rețea care ascultă socket:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

See the [Enabling Network Access documentation][network-access] for more details.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

See the [Enabling User-Selected File Access documentation][user-selected] for more details.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

See the [Enabling User-Selected File Access documentation][user-selected] for more details.

## Algoritmi criptografici utilizați de Electron

În funcție de țările în care vă eliberați aplicația, este posibil să fie necesar să furnizați informații despre algoritmii criptografici utilizați în software-ul dvs . See the [encryption export compliance docs][export-compliance] for more information.

Electron folosește următorii algoritmi criptografici:

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
* IDEA - cartea "Design and Security of Block Ciphers" de X. Lai
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
