# Mac App Store podání Průvodce

Od v0.34.0, Electron umožňuje odeslat zabalené aplikace do Mac App Store (MAS). Tento návod poskytuje informace o: jak odeslat vaši aplikaci a omezení sestavení MAS.

**Poznámka:** Odeslání aplikace do Mac App Store vyžaduje zapsání do [Apple Developer Program](https://developer.apple.com/support/compare-memberships/), který stojí peníze.

## Jak odeslat svou aplikaci

Následující kroky představují jednoduchý způsob, jak odeslat vaši aplikaci do Mac App Store. Tyto kroky však nezajistí, aby vaše aplikace byla schválena společností Apple; ještě si musíte přečíst [Odesílání vaší aplikace](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) průvodce , jak splnit požadavky Mac App Store.

### Získat certifikát

Chcete-li odeslat aplikaci do Mac App Store, musíte nejprve získat certifikát od Apple. Můžete sledovat tyto [existující návody](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) na webu.

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

# Název vaší aplikace.
APP="YourApp"
# Cesta k podpisu.
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

Pokud jste noví pro aplikaci sandboxing pod macOS, měli byste si také přečíst přes Apple [Povolit aplikaci Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) mít základní nápad, pak přidejte klíče pro oprávnění potřebná vaší aplikací do souborů s oprávněními.

Kromě manuálního podepsání vaší aplikace si můžete také zvolit použít modul [elektronický osx-sign](https://github.com/electron-userland/electron-osx-sign) k provedení úkolu.

#### Podepsat Nativní moduly

Nativní moduly používané ve vaší aplikaci musí být také podepsány. Pokud používáte elektronický osx-znak, nezapomeňte zahrnout cestu k vestavěným binárkám do seznamu:

```sh
elektronika osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Rovněž je třeba poznamenat, že původní moduly mohou mít vytvořené mezisoubory, které by neměly být zahrnuty (protože by také musely být podepsány). Pokud použijete [electron-packager](https://github.com/electron/electron-packager) před verzí 8.1.0, přidejte `--ignore=.+\.o$` k vašemu sestavení pro ignorování těchto souborů. Verze 8.1.0 a tyto soubory ve výchozím nastavení ignorují.

### Nahrát aplikaci

Po podepsání vaší aplikace můžete použít Loader aplikací pro její nahrání na iTunes Připojit pro zpracování, se ujistěte, že jste před nahráváním [vytvořili záznam](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) .

### Odeslat vaši aplikaci k recenzi

Po těchto krocích můžete [odeslat aplikaci k recenzi](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Omezení sestavení MAS

Aby byly splněny všechny požadavky na pískovací skříňku aplikací, byly v sestavě MAS zakázány tyto moduly :

* `Hlášení pádů`
* `autoUpdater`

a došlo ke změně tohoto chování:

* Záznam videa nemusí fungovat pro některé stroje.
* Některé funkce přístupnosti nemusí fungovat.
* Aplikace nebudou informovány o změnách DNS.

Také kvůli používání pískovacího boxu aplikací jsou zdroje, které může získat přístup k aplikaci, přísně omezené; můžete si přečíst [Sandboxing](https://developer.apple.com/app-sandboxing/) pro více informací.

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

Více podrobností viz [Povolení dokumentace k přístupu k síti](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9).

#### Dialog dialoguOpenOpenOpen

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

Viz [Povolení uživatelské dokumentace k přístupu k vybraným souborům](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) pro více podrobností.

#### Dialog dialoguUložení

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Viz [Povolení uživatelské dokumentace k přístupu k vybraným souborům](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) pro více podrobností.

## Kryptografické algoritmy používané Electronem

V závislosti na zemích, ve kterých vydáváte aplikaci, můžete být požádáni o poskytnutí informací o kryptografických algoritmech použitých ve vašem softwaru. See the [encryption export compliance docs](https://help.apple.com/app-store-connect/#/devc3f64248f) for more information.

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
