# Code Signierung

Code-Signierung ist eine Sicherheitstechnologie, mit der Sie bestätigen, dass eine App von Ihnen erstellt wurde.

Auf macOS kann das System Änderungen an der App erkennen, ob die Änderung versehentlich oder durch bösartigen Code eingeführt wird.

Unter Windows weist das System Ihrem Codesignierungszertifikat eine Vertrauensstufe zu, die, wenn Sie es noch nicht haben, oder wenn Ihr Vertrauenslevel niedrig ist, werden Sicherheitsdialoge angezeigt, wenn Benutzer Ihre Anwendung verwenden.  Vertrauen Sie dem Level mit der Zeit zu vertrauen, damit es besser ist, die Codesignierung so früh wie möglich zu starten.

Obwohl es möglich ist, unsignierte Apps zu verbreiten, wird es nicht empfohlen. Sowohl Windows als auch macOS werden standardmäßig entweder den Download oder die Ausführung von nicht signierten Anwendungen durch verhindern. Beginnend mit macOS Catalina (Version 10.15), Benutzer müssen mehrere manuelle Schritte durchlaufen, um unsignierte Anwendungen zu öffnen.

![macOS Catalina Gatekeeper Warnung: Die App kann nicht geöffnet werden, da der Entwickler nicht verifiziert werden kann](../images/gatekeeper.png)

Wie Sie sehen können, erhalten Benutzer zwei Möglichkeiten: Verschieben Sie die App direkt in den Papierkorb, oder beenden Sie den Betrieb ab. Sie möchten nicht, dass Ihre Benutzer diesen Dialog sehen.

Wenn Sie eine Electron-App erstellen, die Sie paketieren und verteilen möchten, sollte sie code-signiert sein. Die Mac- und Windows-App-Stores erlauben keine vorzeichenlosen Apps.

# Signierung von macOS builds

Um macOS-Builds zu signieren, musst du folgendes tun:

1. Enroll in the [Apple Developer Program][] (requires an annual fee)
2. Download and install [Xcode][]
3. Generate, download, and install [signing certificates][]

Es gibt eine Reihe von Tools zum Signieren Ihrer gepackten App:

- [`electron-osx-sign`][] is a standalone tool for signing macOS packages.
- [`electron-packager`][] bundles `electron-osx-sign`. Wenn Sie `Elektron-Packager`verwenden, übergeben Sie das `--osx-sign=true` Flag um Ihren Build zu signieren.
  - [`electron-forge`][] uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
- [`electron-builder`][] has built-in code-signing capabilities. Siehe [electron.build/code-signier](https://www.electron.build/code-signing)

## Notarisierung

Beginnend mit macOS Catalina erfordert Apple eine Notarisierung der Anwendungen. "Notarization" as defined by Apple means that you upload your previously signed application to Apple for additional verification _before_ distributing the app to your users.

To automate this process, you can use the [`electron-notarize`][] module. You do not necessarily need to complete this step for every build you make – just the builds you intend to ship to users.

## Mac App Store

See the [Mac App Store Guide][].

# Signiere Windows-Builds

Bevor Sie Windows-Versionen signieren, müssen Sie Folgendes tun:

1. Holen Sie sich ein Windows Authenticode-Zertifikat zur Unterzeichnung (erfordert eine jährliche Gebühr)
2. Installieren Sie Visual Studio 2015/2017 (um das Unterzeichnungsprogramm zu erhalten)

Sie können ein Zertifikat von vielen Wiederverkäufern erhalten. Die Preise variieren, so dass es sich lohnt, Ihre Zeit zu verbringen. Beliebte Wiederverkäufer sind:

* [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
* [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
* [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
* Unter anderem kaufen Sie bitte herum, um einen zu finden, der Ihren Bedürfnissen entspricht. Google ist Ihr Freund :)

Es gibt eine Reihe von Tools zum Signieren Ihrer gepackten App:

- [`electron-winstaller`][] will generate an installer for windows and sign it for you
- [`electron-forge`][] can sign installers it generates through the Squirrel.Windows or MSI targets.
- [`electron-builder`][] can sign some of its windows targets

## Windows Store

See the [Windows Store Guide][].

[Apple Developer Program]: https://developer.apple.com/programs/
[`electron-builder`]: https://github.com/electron-userland/electron-builder
[`electron-forge`]: https://github.com/electron-userland/electron-forge
[`electron-osx-sign`]: https://github.com/electron-userland/electron-osx-sign
[`electron-packager`]: https://github.com/electron/electron-packager
[`electron-notarize`]: https://github.com/electron/electron-notarize
[`electron-winstaller`]: https://github.com/electron/windows-installer
[Xcode]: https://developer.apple.com/xcode
[signing certificates]: https://github.com/electron/electron-osx-sign/wiki/1.-Getting-Started#certificates
[Mac App Store Guide]: mac-app-store-submission-guide.md
[Windows Store Guide]: windows-store-guide.md
