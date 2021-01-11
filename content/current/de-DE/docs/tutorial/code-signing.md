# Codesignatur

Code-Signierung ist eine Sicherheitstechnologie, mit der Sie bestätigen, dass eine App von Ihnen erstellt wurde.

Auf macOS kann das System Änderungen an der App erkennen, ob die Änderung versehentlich oder durch bösartigen Code eingeführt wird.

Unter Windows weist das System Ihrem Codesignierungszertifikat eine Vertrauensstufe zu, die, wenn Sie es nicht haben oder wenn Ihr Vertrauenslevel niedrig ist, werden Sicherheitsdialoge angezeigt, wenn Benutzer Ihre Anwendung verwenden.  Vertrauen Sie dem Level im Laufe der Zeit zu, so dass es besser ist, die Codesignierung so früh wie möglich zu starten.

Obwohl es möglich ist, unsignierte Apps zu verbreiten, wird es nicht empfohlen. Both Windows and macOS will, by default, prevent either the download or the execution of unsigned applications. Beginnend mit macOS Catalina (Version 10.15) müssen Benutzer mehrere manuelle Schritte durchlaufen, um unsignierte Anwendungen zu öffnen.

![macOS Catalina Gatekeeper Warnung: Die App kann nicht geöffnet werden, da der Entwickler
nicht verifiziert werden kann](../images/gatekeeper.png)

Wie Sie sehen können, erhalten Benutzer zwei Möglichkeiten: Verschieben Sie die App direkt in den Papierkorb, oder beenden Sie den Betrieb ab. Sie möchten nicht, dass Ihre Benutzer diesen Dialog sehen.

Wenn Sie eine Electron-App erstellen, die Sie paketieren und verteilen möchten, sollte sie code-signiert sein.

# Unterzeichne & notarielle MacOS-Builds

Die richtige Vorbereitung von MacOS-Anwendungen für die Veröffentlichung erfordert zwei Schritte: Erstens muss die -App code-signiert werden. Dann muss die App für einen -Prozess namens „Notarisierung“ auf Apple hochgeladen werden wo automatisierte Systeme weiter verifizieren, dass Ihre App nichts tut, um ihre Nutzer zu gefährden.

Um den Prozess zu starten, stellen Sie sicher, dass Sie die Voraussetzungen für die Unterzeichnung erfüllen und Ihre App notarisieren:

1. Einschreiben für das [Apple Developer Program](https://developer.apple.com/programs/) (erfordert eine jährliche Gebühr)
2. [Xcode](https://developer.apple.com/xcode) herunterladen und installieren - dies erfordert einen Computer mit macOS
3. Erstellen, downloaden und installieren [Zertifikate signieren](https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates)

Das elektronische Ökosystem bevorzugt die Konfiguration und Freiheit, so gibt es mehrere Möglichkeiten, Ihre Bewerbung zu signieren und zu beglaubigen.

## `electron-forge`

Wenn Sie Electron's Lieblings-Build-Werkzeug verwenden, benötigen Sie ein paar Ergänzungen zu Ihrer Konfiguration, um Ihre Anwendung zu signieren und notariell zu beglaubigen. [Forge](https://electronforge.io) ist eine Sammlung der offiziellen Electron-Tools mit [`Elektron-Packager`], [`electron-osx-sign`], und [`electron-notarize`] unter der Haube.

Werfen wir einen Blick auf eine Beispielkonfiguration mit allen erforderlichen Feldern. Nicht alle werden benötigt: Die Werkzeuge werden intelligent genug sein, um automatisch eine passende `Identität zu finden`, zum Beispiel, aber wir empfehlen, dass Sie explizit sind.

```json
{
  "name": "my-app",
  "version": "0.0. ",
  "config": {
    "forge": {
      "packagerConfig": {
        "osxSign": {
          "identity": "Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)",
          "gehärtete Laufzeit": wahr,
          "Berechtigungen": "Berechtigungen. list",
          "entitlements-inherit": "entitlements. list",
          "signature-flags": "library"
        },
        "osxNotarize": {
          "appleId": "felix@felix. un",
          "appleIdPasswort": "my-apple-id-Passwort",
        }
      }
    }
  }
}
```

Die `plist` Datei, auf die hier verwiesen wird, benötigt die folgenden macOS-spezifischen Berechtigungen um die Apple-Sicherheitsmechanismen zu gewährleisten, dass Ihre App diese Dinge tut: ohne irgendeinen Schaden:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

Um dies alles in Aktion zu sehen, schauen Sie sich Electron Fiddles Quellcode an, [besonders seine `electron-forge` Konfiguration Datei](https://github.com/electron/fiddle/blob/master/forge.config.js) an.

Wenn Sie den Zugriff auf das Mikrofon oder die Kamera in Ihrer App über die elektronischen APIs planen, müssen Sie auch folgende Rechte hinzufügen:

```xml
<key>com.apple.security.device.audio-input</key>
<true/>
<key>com.apple.security.device.camera</key>
<true/> <true/>
```

Wenn diese beim Aufrufen nicht in den Ansprüchen Ihrer App enthalten sind, zum Beispiel:

```js
const { systemPreferences } = require('electron')

const microphone = systemPreferences.askForMediaAccess('microphone')
```

Ihre App könnte abstürzen. Lesen Sie den Bereich Ressourcen-Zugriff in [Hardened Runtime](https://developer.apple.com/documentation/security/hardened_runtime) für weitere Informationen und Berechtigungen, die Sie benötigen.

## `electron-builder`

Electron Builder enthält eine benutzerdefinierte Lösung für die Signierung Ihrer Anwendung. finden Sie hier [seine Dokumentation](https://www.electron.build/code-signing).

## `electron-packager`

Wenn Sie keine integrierte Build-Pipeline wie Forge oder Builder verwenden, verwenden Sie wahrscheinlich [`Elektron-packager`], mit [`Electron-osx-sign`] und [`Elektron-notarize`].

Wenn Sie die API von Packager verwenden, können Sie [in der Konfiguration übergeben, die sowohl Zeichen als auch Ihre Anwendung notariell beglaubigt](https://electron.github.io/electron-packager/master/interfaces/electronpackager.options.html).

```js
const packager = require('electron-packager')

packager({
  dir: '/path/to/my/app',
  osxSign: {
    identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    'gehärtete Laufzeit': true
    Berechtigungen: 'Berechtigungen. list',
    'entitlements-inherit': 'entitlements. list',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appleId: 'felix@felix. un',
    appleIdPasswort: 'my-apple-id-password'
  }
})
```

Die `plist` Datei, auf die hier verwiesen wird, benötigt die folgenden macOS-spezifischen Berechtigungen um die Apple-Sicherheitsmechanismen zu gewährleisten, dass Ihre App diese Dinge tut: ohne irgendeinen Schaden:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.cs.allow-jit</key>
    <true/>
    <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
    <true/>
    <key>com.apple.security.cs.debugger</key>
    <true/>
  </dict>
</plist>
```

## Mac App Store

Siehe [Mac App Store Guide](mac-app-store-submission-guide.md).

# Signiere Windows-Builds

Bevor Sie Windows-Versionen signieren, müssen Sie Folgendes tun:

1. Holen Sie sich ein Windows Authenticode-Zertifikat zur Unterzeichnung (erfordert eine jährliche Gebühr)
2. Installieren Sie Visual Studio um das Unterzeichnungsprogramm zu erhalten (die kostenlose [Community Edition](https://visualstudio.microsoft.com/vs/community/) reicht)

Sie können ein Zertifikat von vielen Wiederverkäufern erhalten. Die Preise variieren, so dass es sich lohnt, Ihre Zeit zu nutzen. Beliebte Wiederverkäufer sind:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Sectigo](https://sectigo.com/ssl-certificates-tls/code-signing)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Unter anderem bitte einkaufen, um einen zu finden, der Ihren Bedürfnissen entspricht. Google ist dein Freund 😄

Es gibt eine Reihe von Tools zum Signieren Ihrer gepackten App:

* [`Elektron-winstaller`] generiert einen Installer für Fenster und signiert ihn für Sie
* [`electron-forge`] kann Installer signieren, die es über die Squirrel.Windows oder MSI Ziele generiert.
* [`Elektron-Builder`] kann einige seiner Windows-Ziele unterzeichnen

## Windows Store

Siehe [Windows Store Guide](windows-store-guide.md).
