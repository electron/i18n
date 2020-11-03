# Veröffentlichung im Mac App Store

Seit Version 0.34.0 ermöglicht Electron das Einreichen von gepackten Apps im Mac App Store (MAS). In dieser Anleitung finden Sie Informationen wie Sie Ihre App und die Einschränkungen des MAS Builds einreichen.

**Hinweis:** Das Einsenden einer App im Mac App Store erfordert eine Anmeldung im [Apple Developer Programm](https://developer.apple.com/support/compare-memberships/), was Geld kostet.

## Wie Sie Ihre App einreichen

Die folgenden Schritte führen eine einfache Möglichkeit ein, Ihre App im Mac App Store einzureichen. Diese Schritte stellen jedoch nicht sicher, dass Ihre App von Apple genehmigt wird; Sie müssen noch Apple's [lesen, indem Sie Ihre App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) Anleitung für einreichen, wie Sie die Anforderungen des Mac App Store erfüllen.

### Zertifikat abrufen

Um Ihre App beim Mac App Store einzureichen, müssen Sie zuerst ein Zertifikat von Apple erhalten. Du kannst diesen [vorhandenen Anleitungen](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) im Web folgen.

### Team-ID erhalten

Bevor Sie Ihre App signieren, müssen Sie die Team-ID Ihres Kontos kennen. Um Ihre Team-ID zu finden, melden Sie sich bei [Apple Developer Center](https://developer.apple.com/account/), an und klicken Sie auf Mitgliedschaft in der Seitenleiste. Ihre Team-ID erscheint im Bereich Mitgliedschaft unter dem Teamnamen.

### Unterzeichnen Sie Ihre App

Nach Abschluss der Vorbereitungsarbeiten können Sie Ihre App paketieren, indem Sie [Anwendungsverteilung](application-distribution.md)folgen , und fahren Sie dann mit der Unterschrift Ihrer App fort.

Zuerst müssen Sie einen `ElectronTeamID` Schlüssel zu den `Informationen Ihrer App hinzufügen. Liste`, die Ihre Team-ID als Wert besitzt:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

Dann müssen Sie drei Dateien mit Berechtigungsansprüchen vorbereiten.

`kind.plist`:

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
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//DE" "http://www. pple.com/DTDs/PropertyList-1.0.dtd>
<plist version="1.0">
  <dict>
    <key>com.apple.security. pp-sandbox</key>
    <true/>
    <key>com.apple.security. pplication-Gruppen</key>
    <array>
      <string>TEAM_ID. unser.bundle.id</string>
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

Sie müssen `TEAM_ID` durch Ihre Team-ID ersetzen und `your.bundle.id` durch die Bundle-ID Ihrer App ersetzen.

Und dann unterzeichnen Sie Ihre App mit dem folgenden Skript:

```sh
#!/bin/bash

# Name Ihrer App.
APP="Ihre App"
# Der Pfad Ihrer zu unterzeichnenden App.
APP_PATH="/path/to/YourApp.app"
# Der Pfad zu dem Ort, den Sie signieren wollen.
RESULT_PATH="~/Desktop/$APP.pkg"
# Der Name der Zertifikate, die Sie angefordert haben.
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# Der Pfad Ihrer Pistendateien.
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" " "$FRAMEWORKS_PATH/Electron Framework. ramework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework. ramework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode. ylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework. ramework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper. pp/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper. pp/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helfer. pp/Contents/MacOS/$APP Login Helfer"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper. pp/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" " "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" " "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

Wenn Sie neu in der App Sandbox unter macOS sind, du solltest auch Apples durchlesen [App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) aktivieren, um eine grundlegende Idee zu haben, dann fügen Sie Schlüssel für die Berechtigungen Ihrer App zu den Berechtigungsdateien hinzu.

Neben der manuellen Signierung Ihrer App können Sie auch das [Electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) Modul verwenden, um den Job zu erledigen.

#### Signiere Native Module

Native Module, die in Ihrer App verwendet werden, müssen ebenfalls signiert werden. Wenn Sie Elektron-osx-Zeichen verwenden, stellen Sie sicher, dass Sie den Pfad zu den gebauten Binärdateien in die Argumentliste einfügen:

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

Beachten Sie auch, dass native Module Zwischendateien generieren können, die nicht enthalten sollten (wie sie auch signiert werden müssten). Wenn Sie [electron-packager](https://github.com/electron/electron-packager) vor Version 8.1.0 verwenden, fügen Sie `--ignore=.+\.o$` zu Ihrem Build-Schritt hinzu, um diese Dateien zu ignorieren. Versionen 8.1.0 und ignorieren diese Dateien später standardmäßig.

### Laden Sie Ihre App hoch

Nach der Signierung Ihrer App können Sie den App-Loader verwenden, um ihn zu iTunes hochzuladen Verbinden für die Verarbeitung, stellen Sie sicher, dass Sie [einen Datensatz erstellt haben](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) vor dem Hochladen.

### Übermitteln Sie Ihre App zur Überprüfung

Nach diesen Schritten können Sie [Ihre App zur Überprüfung einreichen](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

## Grenzen des MAS Builds

Um alle Anforderungen für App-Sandboxen zu erfüllen, wurden folgende Module in der MAS-Version deaktiviert:

* `crashReporter`
* `autoUpdater`

und die folgenden Verhaltensweisen wurden geändert:

* Videoaufnahme funktioniert möglicherweise nicht für einige Maschinen.
* Bestimmte Funktionen zur Barrierefreiheit können nicht funktionieren.
* Apps sind sich der DNS-Änderungen nicht bewusst.

Außerdem sind die Ressourcen, auf die zugegriffen werden kann, aufgrund der Nutzung von App-Sandboxen streng begrenzt; Sie können [App Sandboxing](https://developer.apple.com/app-sandboxing/) für weitere Informationen lesen.

### Zusätzliche Rechte

Depending on which Electron APIs your app uses, you may need to add additional entitlements to your `parent.plist` file to be able to use these APIs from your app's Mac App Store build.

#### Netzwerkzugriff

Aktivieren Sie ausgehende Netzwerkverbindungen, damit Ihre App sich mit einem Server verbinden kann:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

Aktivieren Sie eingehende Netzwerkverbindungen, damit Ihre App einen Netzwerk-Socket öffnen kann:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

Siehe [Netzwerkzugriffsdokumentation](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) für weitere Details.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

Siehe [Benutzerdefinierte Dateizugriffsdokumentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) für weitere Details.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

Siehe [Benutzerdefinierte Dateizugriffsdokumentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) für weitere Details.

## Kryptographische Algorithmen von Electron verwendet

Abhängig von den Ländern, in denen Sie Ihre App freigeben, Sie werden möglicherweise benötigt, um Informationen über die kryptographischen Algorithmen bereitzustellen, die in Ihrer Software verwendet werden. See the [encryption export compliance docs](https://help.apple.com/app-store-connect/#/devc3f64248f) for more information.

Electron verwendet folgende kryptographische Algorithmen:

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
* IDEA - Buch "On the Design and Security of Block Ciphers" von X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - https://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)
