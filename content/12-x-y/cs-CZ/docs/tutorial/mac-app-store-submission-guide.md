# Mac App Store podání Průvodce

Od v0.34.0, Electron umožňuje odeslat zabalené aplikace do Mac App Store (MAS). Tento návod poskytuje informace o: jak odeslat vaši aplikaci a omezení sestavení MAS.

**Note:** Submitting an app to Mac App Store requires enrolling in the [Apple Developer Program][developer-program], which costs money.

## Jak odeslat svou aplikaci

Následující kroky představují jednoduchý způsob, jak odeslat vaši aplikaci do Mac App Store. However, these steps do not ensure your app will be approved by Apple; you still need to read Apple's [Submitting Your App][submitting-your-app] guide on how to meet the Mac App Store requirements.

### Získat certifikát

Chcete-li odeslat aplikaci do Mac App Store, musíte nejprve získat certifikát od Apple. You can follow these [existing guides][nwjs-guide] on web.

### Získat ID týmu

Před podpisem vaší aplikace musíte znát ID týmu vašeho účtu. Chcete-li najít ID týmu, přihlaste se k [Apple Developer Center](https://developer.apple.com/account/), a klikněte na členství v postranním panelu. Vaše ID týmu se zobrazí v členství Informační sekce pod názvem týmu.

### Podepsat svou aplikaci

Po dokončení přípravné práce můžete vaši aplikaci objednat sledováním [Distribuce aplikací](application-distribution.md), a pak pokračujte do podepsání vaší aplikace.

Nejprve musíte přidat klíč `ElectronTeamID` do `informací vaší aplikace. seznam`, který má tvé ID týmu:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Pak musíte připravit tři soubory nároků.

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
    <key>com.apple.security pp-sandbox</key>
    <true/>
    <key>com.apple.security pplicační skupiny</key>
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

Musíte nahradit `TEAM_ID` Vaším ID týmu a nahradit `vašem.bundle.id` Bundle ID vaší aplikace.

A poté podepisujte svou aplikaci následujícím skriptem:

```sh
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH="/cesta/do/YourApp.app"
# Cesta k umístění, které chcete vložit podepsaný balíček.
RESULT_PATH="~/Desktop/$APP.pkg"
# Název požadovaných certifikátů.
APP_KEY="3. strana Mac vývojářská aplikace: Název společnosti (APPIDENTITY)"
INSTALLER_KEY="3. smluvní vývojářský instalátor: název společnosti (APPIDENTITY)"
# Cesta souborů se seznamem.
CHILD_PLIST="/cesta/do/child.plist"
PARENT_PLIST="/cesta/to/parent.plist"
LOGINHELPER_PLIST="/cesta/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework. ramework/Verze / A/Electron Framework"
kódování -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework. ramework/Verze / A/Libraries/libffmpeg.dylib"
Kódy -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode. ylib"
kódování -s "$APP_KEY" -f --entitlements "$CHILD_PLIST"$FRAMEWORKS_PATH/Electron Framework. amework"
kódování -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper. pp/Contents/MacOS/$APP Helper"
kódové -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper. pp/"
kódování -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Knihovna/LoginItems/$APP Přihlašovací Helper. pp/Contents/MacOS/$APP Přihlášení Helper"
kódových -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST"$APP_PATH/Contents/Library/LoginItems/$APP Přihlašovací Helper. pp/"
kódy -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" " "$APP_PATH"

productbuild --component "$APP_PATH" /Apps --sign "$INSTALLER_KEY" " "$RESULT_PATH"
```

If you are new to app sandboxing under macOS, you should also read through Apple's [Enabling App Sandbox][enable-app-sandbox] to have a basic idea, then add keys for the permissions needed by your app to the entitlements files.

Apart from manually signing your app, you can also choose to use the [electron-osx-sign][electron-osx-sign] module to do the job.

#### Podepsat Nativní moduly

Nativní moduly používané ve vaší aplikaci musí být také podepsány. Pokud používáte elektronický osx-znak, nezapomeňte zahrnout cestu k vestavěným binárkám do seznamu:

```sh
elektronika osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Rovněž je třeba poznamenat, že původní moduly mohou mít vytvořené mezisoubory, které by neměly být zahrnuty (protože by také musely být podepsány). If you use [electron-packager][electron-packager] before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Verze 8.1.0 a tyto soubory ve výchozím nastavení ignorují.

### Nahrát aplikaci

After signing your app, you can use Application Loader to upload it to iTunes Connect for processing, making sure you have [created a record][create-record] before uploading.

### Odeslat vaši aplikaci k recenzi

After these steps, you can [submit your app for review][submit-for-review].

## Omezení sestavení MAS

Aby byly splněny všechny požadavky na pískovací skříňku aplikací, byly v sestavě MAS zakázány tyto moduly :

* `Hlášení pádů`
* `autoUpdater`

a došlo ke změně tohoto chování:

* Záznam videa nemusí fungovat pro některé stroje.
* Některé funkce přístupnosti nemusí fungovat.
* Aplikace nebudou informovány o změnách DNS.

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing][app-sandboxing] for more information.

### Dodatečné nároky

V závislosti na tom, která aplikace Electron API používá, možná budete muset přidat další oprávnění k vašemu rodičovi `. seznam` souborů, které mají být schopny používat tyto API z vaší aplikace Mac App Store.

#### Přístup k síti

Povolte připojení k odchozí síti, aby se aplikace mohla připojit k serveru:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Povolte příchozí síťové připojení, abyste mohli vaší aplikaci otevřít síť poslechem socketu:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

See the [Enabling Network Access documentation][network-access] for more details.

#### Dialog dialoguOpenOpenOpen

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

See the [Enabling User-Selected File Access documentation][user-selected] for more details.

#### Dialog dialoguUložení

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

See the [Enabling User-Selected File Access documentation][user-selected] for more details.

## Kryptografické algoritmy používané Electronem

V závislosti na zemích, ve kterých vydáváte aplikaci, můžete být požádáni o poskytnutí informací o kryptografických algoritmech použitých ve vašem softwaru. See the [encryption export compliance docs][export-compliance] for more information.

elektronky používají tyto šifrovací algoritmy:

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
* IDEA - kniha "On the Design and security of Block Ciphers" od X. Lai
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
