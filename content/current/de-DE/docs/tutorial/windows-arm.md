# Windows 10 auf Arm

Wenn Ihre App mit Electron 6.0.8 oder höher läuft, können Sie sie nun unter Arm für Windows 10 bauen. This considerably improves performance, but requires recompilation of any native modules used in your app. It may also require small fixups to your build and packaging scripts.

## Eine einfache App ausführen

Wenn Ihre App keine nativen Module verwendet, ist es wirklich einfach, eine Arm-Version Ihrer App zu erstellen.

1. Stelle sicher, dass das `node_modules` Verzeichnis deiner App leer ist.
2. Führen Sie mit einer _Befehlsaufforderung_ `aus: Setzen Sie npm_config_arch=arm64` bevor Sie `npm installieren`/`Garn installieren` wie üblich.
3. [Wenn Electron als Entwicklungsabhängigkeit](quick-start.md#prerequisites)installiert ist, wird npm die arm64-Version herunterladen und entpacken. Sie können dann Ihre App wie gewohnt paketieren und verteilen.

## Allgemeine Überlegungen

### Architektur-spezifischer Code

Lots of Windows-specific code contains if... else logic that selects between either the x64 or x86 architectures.

```js
if (process.arch === 'x64') {
  // Ding 64-bit Sache...
} else {
  // Tun Sie 32-Bit...
}
```

Wenn du arm64 anvisieren möchtest, wird die Logik wie diese normalerweise die falsche Architektur auswählen so sorgfältig prüfen Sie Ihre Anwendung und erstellen Sie Skripte auf solche Bedingungen. In benutzerdefinierten Build- und Paketskripten sollten Sie immer den Wert von `npm_config_arch` in der Umgebung überprüfen statt sich auf den aktuellen Prozessbogen zu verlassen.

### Native Module

Wenn Sie native Module verwenden, müssen Sie sicherstellen, dass diese gegen v142 des MSVC-Compilers kompiliert werden (bereitgestellt in Visual Studio 2017). Sie müssen auch überprüfen, dass jede vorfertige `.dll` oder `. ib` Dateien, die vom nativen Modul bereitgestellt oder referenziert werden, stehen für Windows unter Arm zur Verfügung.

### Testen Ihrer App

Um Ihre App zu testen, verwenden Sie ein Windows on Arm Gerät mit Windows 10 (ab Version 1903). Stellen Sie sicher, dass Sie Ihre Anwendung auf das Zielgerät kopieren - die Sandbox von Chromium funktioniert nicht korrekt, wenn Sie Ihre App-Assets von einem Netzwerk-Standort laden.

## Entwicklungsvoraussetzungen

### Node.js/node-gyp

[Node.js v12.9.0 oder höher werden empfohlen.](https://nodejs.org/en/) Wenn das Aktualisieren auf eine neue Version von Node nicht wünschenswert ist, Sie können stattdessen [npm's Kopie von node-gyp manuell aktualisieren](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) auf Version 5 aktualisieren. .2 oder höher, die die erforderlichen Änderungen enthält, um native Module für Arm zu kompilieren.

### Visual Studio 2017

Visual Studio 2017 (jede Edition) ist für das Crosskompilieren von nativen Modulen erforderlich. Sie können die Visual Studio Community 2017 über das Microsoft [Visual Studio Dev Essentials Programm](https://visualstudio.microsoft.com/dev-essentials/) herunterladen. Nach der Installation können Sie die armspezifischen Komponenten hinzufügen, indem Sie folgendes aus einer _Befehlsaufforderung_ ausführen:

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeRecommended Recommended Recommended Recommended Microsoft.VisualStudio.exe ^
```

#### Erstellen einer Cross-Compilation-Befehlsaufforderung

Setzen von `npm_config_arch=arm64` in der Umgebung erzeugt den korrekten arm64 `. bj` Dateien, aber die Standard _Entwickler-Befehlsaufforderung für VS 2017_ verwendet den x64-Link. Um dies zu beheben:

1. Duplizieren Sie die _x64_x86 Cross Tools Kommandozeile für VS 2017_ Verknüpfung (z. indem Sie es im Startmenü finden, mit der rechten Maustaste auf _Datei-Position öffnen_auswählen und kopieren und einfügen).
2. Klicken Sie mit der rechten Maustaste auf die neue Verknüpfung und wählen Sie _Eigenschaften_.
3. Ändern Sie das Feld _Ziel_ um `vcvarsamd64_arm64.bat` am Ende statt `vcvarsamd64_x86.bat` zu lesen.

Erfolgreich ausgeführt, sollte die Eingabeaufforderung beim Start etwas Ähnliches ausgeben:

```bat
******************************************************************
** Visual Studio 2017 Developer Command Prompt v15.9.15
** Copyright (c) 2017 Microsoft Corporation
**********************************************************************************
[vcvarsall.bat] Umgebung initialisiert für: 'x64_arm'
```

Wenn Sie Ihre Anwendung direkt auf einem Windows-Arm-Gerät entwickeln möchten, ersetzen Sie `vcvarsx86_arm64. unter` in _Target_ , damit die Cross-Kompilierung mit der x86-Emulation erfolgen kann.

### Verlinkung gegen die korrekte `node.lib`

By default, `node-gyp` unpacks Electron's node headers and downloads the x86 and x64 versions of `node.lib` into `%APPDATA%\..\Local\node-gyp\Cache`, but it does not download the arm64 version ([a fix for this is in development](https://github.com/nodejs/node-gyp/pull/1875).) Um dies zu beheben:

1. Lade die arm64 `node.lib` von https://electronjs.org/headers/v6.0.9/win-arm64/node.lib herunter
2. Verschiebe es nach `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

Ersetzen Sie `6.0.9` für die von Ihnen verwendete Version.

## native Module werden Cross-kompiliert

Nach dem Abschließen aller obigen Anweisungen öffnen Sie die Eingabeaufforderung für die Cross-Compilation und führen `setzen Sie npm_config_arch=arm64` ein. Verwenden Sie dann `npm install` um Ihr Projekt wie gewohnt zu bauen. Wie beim Cross-Kompilieren von x86-Modulen Sie müssen möglicherweise `node_modules` entfernen, um die Neukompilierung von nativen Modulen zu erzwingen, wenn diese zuvor für eine andere Architektur kompiliert wurden.

## Debuggen der nativen Module

Das Debuggen von nativen Modulen kann mit Visual Studio 2017 (auf Ihrem Entwicklungsrechner) und dem zugehörigen [Visual Studio Remote Debugger](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) durchgeführt werden, der auf dem Zielgerät läuft. Zu debug:

1. Starte deine App `. Axt` auf dem Zielgerät über die _Befehlsaufforderung_ (übergeben `--inspect-brk` , um es zu pausieren, bevor native Module geladen werden).
2. Starten Sie Visual Studio 2017 auf Ihrer Entwicklungsmaschine.
3. Verbinden Sie sich mit dem Zielgerät, indem Sie _Debug > An den Prozess anhängen..._ und geben Sie die IP-Adresse des Geräts und die Portnummer ein, die vom Visual Studio Remote Debugger Tool angezeigt wird.
4. Klicken Sie auf _Aktualisieren_ und wählen Sie den [passenden Electron-Prozess aus, der](../development/debug-instructions-windows.md) anhängen soll.
5. Möglicherweise müssen Sie sicherstellen, dass alle Symbole für native Module in Ihrer App korrekt geladen werden. Um dies zu konfigurieren, gehen Sie zu _Debug > Optionen..._ in Visual Studio 2017, und fügen Sie die Ordner hinzu, die Ihre `enthalten. db` Zeichen unter _Debugging > Symbole_.
6. Einmal angehängt, legen Sie geeignete Haltepunkte fest und setzen Sie die JavaScript-Ausführung mit den [Remote-Tools von Chrome für Knoten](debugging-main-process.md) fort.

## Weitere Hilfe erhalten

Wenn Sie ein Problem mit dieser Dokumentation haben, oder wenn Ihre App bei der Kompilierung für x86 funktioniert, aber nicht für arm64, bitte [schreiben Sie ein Problem](../development/issues.md) mit "Windows on Arm" im Titel.
