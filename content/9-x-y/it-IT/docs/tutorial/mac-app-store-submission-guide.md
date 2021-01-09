# Guida alla pubblicazione su Mac App Store

Dal v0.34.0, Electron consente di inviare app confezionate al Mac App Store (MAS). Questa guida fornisce informazioni su: come inviare la tua app e le limitazioni della build MAS.

**Note:** Submitting an app to Mac App Store requires enrolling in the [Apple Developer Program][developer-program], which costs money.

## Come inviare la tua app

I passi seguenti introducono ad un metodo semplice per inviare la tua app al Mac App Store. Comunque, questi passi non assicurano che la tua app sia approvata dalla Apple; devi ancora leggere la guida [Inviare la Tua App][submitting-your-app] su come incontrare i requisiti del Mac App Store.

### Ottieni Certificato

Per inviare la tua app al Mac App Store, devi prima ottenere un certificato da Apple. Puoi seguire queste [guide esistenti][nwjs-guide] sul web.

### Ottieni ID Team

Prima di firmare la tua app, devi conoscere l'ID del tuo account. Per individuare il tuo ID Squadra, Accedi a [Apple Developer Center](https://developer.apple.com/account/), e fai clic su Iscrizione nella barra laterale. Il tuo ID del Team appare nella sezione Informazioni dell'Abbonamento sotto il nome del team.

### Firma La Tua App

Dopo aver terminato il lavoro di preparazione, puoi imballare la tua app seguendo [Distribuzione Applicazioni](application-distribution.md), e poi procedi a firmare la tua app.

In primo luogo, devi aggiungere una chiave `ElectronTeamID` alle `informazioni della tua app. list`, che ha il tuo ID Team come valore:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Poi, è necessario preparare tre file di diritti.

`child.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
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
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www. pple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security. pp-sandbox</key>
    <true/>
    <key>com.apple.security. pplication-groups</key>
    <array>
      <string>TEAM_ID. il nostro .bundle.id</string>
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
    <key>com.apple.security. pp-sandbox</key>
    <true/>
  </dict>
</plist>
```

Devi sostituire `TEAM_ID` con il tuo ID Squadra, e sostituire `il tuo.bundle.id` con il Bundle ID della tua app.

E poi firmare la tua app con il seguente script:

```sh
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH="/path/to/YourApp.app"
# Il percorso della posizione che si desidera inserire il pacchetto firmato.
RESULT_PATH="~/Desktop/$APP.pkg"
# Il nome dei certificati richiesti.
APP_KEY="Applicazione per sviluppatori Mac di terze parti: Nome Aziendale (APPIDENTITY)"
INSTALLER_KEY="Installatore per sviluppatori Mac di terze parti: Nome Aziendale (APPIDENTITY)"
# Il percorso dei tuoi file plist.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework. ramework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework. ramework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode. ylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework. ramework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper. pp/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper. pp/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper. pp/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST"$APP_PATH/Contents/Library/LoginItems/$APP Login Helper. pp/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" " "$APP_PATH"

prodotto build --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" " "$RESULT_PATH"
```

If you are new to app sandboxing under macOS, you should also read through Apple's [Enabling App Sandbox][enable-app-sandbox] to have a basic idea, then add keys for the permissions needed by your app to the entitlements files.

Apart from manually signing your app, you can also choose to use the [electron-osx-sign][electron-osx-sign] module to do the job.

#### Firma Moduli Nativi

Anche i moduli nativi utilizzati nell'app devono essere firmati. Se si utilizza electron-osx-sign, assicurarsi di includere il percorso ai binari costruiti nella lista degli argomenti :

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Si noti inoltre che i moduli nativi possono avere file intermedi prodotti che non dovrebbero essere inclusi (come dovrebbero anche essere firmati). If you use [electron-packager][electron-packager] before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Le versioni 8.1.0 e in seguito ignorano questi file di default.

### Carica La Tua App

After signing your app, you can use Application Loader to upload it to iTunes Connect for processing, making sure you have [created a record][create-record] before uploading.

### Invia la tua app per la revisione

After these steps, you can [submit your app for review][submit-for-review].

## Limitazioni della MAS Build

Al fine di soddisfare tutti i requisiti per la sandbox delle app, i seguenti moduli sono stati disabilitati nell'edificio MAS:

* `riportatorecrash`
* `autoUpdater`

e i seguenti comportamenti sono stati modificati:

* L'acquisizione video potrebbe non funzionare per alcune macchine.
* Alcune caratteristiche di accessibilità potrebbero non funzionare.
* Le app non saranno a conoscenza dei cambiamenti DNS.

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing][app-sandboxing] for more information.

### Diritti Aggiuntivi

A seconda di quali API Electron utilizza la tua app, potrebbe essere necessario aggiungere diritti aggiuntivi al tuo `genitore. elenca` file per poter utilizzare queste API dalla build di Mac App Store della tua app .

#### Accesso Alla Rete

Abilita le connessioni di rete in uscita per consentire alla tua app di connettersi a un server:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Abilita le connessioni di rete in entrata per consentire alla tua app di aprire un socket di ascolto di rete:

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

## Algoritmi crittografici utilizzati da Electron

A seconda dei paesi in cui stai rilasciando la tua app, potresti essere richiesto di fornire informazioni sugli algoritmi crittografici utilizzati nel tuo software. See the [encryption export compliance docs][export-compliance] for more information.

Electron utilizza i seguenti algoritmi crittografici:

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
* IDEA - "On the Design and Security of Block Ciphers" libro di X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
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
