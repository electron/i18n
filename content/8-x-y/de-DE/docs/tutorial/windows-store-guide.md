# Windows Store Guide

Mit Windows 10, die bewährten win32-Programmdateien bekamen einen neuen Verwandten: die Universelle Windows-Plattform. Das neue `.appx`-Format ermöglicht nicht nur neue APIs wie 'Cortana' oder 'Push Notifications', sondern, durch den Windows Store, wird das Aktualisieren und die Installation vereinfacht.

Microsoft [entwickelte ein Werkzeug, dass Electron-Apps in `.appx`-Pakete][electron-windows-store] kompiliert. Somit wird Entwicklern ermöglicht, einige der Annehmlichkeiten, welche sich im neuen Enticklungs-Modul finden, zu nutzen. Diese Anleitung erklärt Ihnen, wie man es benutzt - und was die Möglichkeiten und Begrenzungen von Electron-AppX-Paketen sind.

## Hintergrund und Voraussetzungen

Windows 10 "Anniversary Update" kann win32-`.exe`-Dateien ausführen, indem man sie zusammen mit einem virtualisiertem Dateisystem und einer Registry startet. Beides wird während der Kompilierung erstellt durch das Ausführen der App und des Installer in einem Windows-Container. Dies erlaubt Windows genau zu identifizieren, welche Änderungen am Betriebssystem gemacht werden während der Installation. Das Zusammenbringen der Programmdatei mit einem virtuellem Dateisystem und einer virtuellen Registry erlaubt Windows, dass Ein-Klick Installationen und Deinstallationen möglich sind.

Zusätzlich wird die exe innerhalb eines appx-Modells ausgeführt. Somit können viele der APIs genutzt werden, welche in der Universellen Windows-Plattform verfügbar sind. Um noch mehr Möglichkeiten zu bekommen, kann sich eine Electron-App im Hintergrund mit einem unsichtbaren UWP-Hintergrund-Task verbinden, welcher zusammen mit der `exe` startet. Sie wird als eine Art "Handlanger" gestartet, um Tasks im Hintergrund zu starten, damit Push Notifications empfangen werden können oder um mit anderen UWP-Anwendungen kommunizieren zu können.

Um eine existierende Ectron-App zu kompilieren, stellen Sie sicher, dass die folgenden Bedingungen erfüllt sind:

* Windows 10 mit Anniversary Update (veröffentlicht am 2. August 2016)
* Das Windows 10 SDK, [Download-Link][windows-sdk]
* Mindestens Node 4 (zum prüfen, `node -v` ausführen)

Als nächstes: Installieren der `electron-windows-store` CLI:

```sh
npm install -g electron-windows-store
```

## Schritt 1: Die Electron Anwendung packen

Packen Sie die Anwendung mittels des [Electron-Packagers][electron-packager] (oder einer vergleichbaren Anwendung). Achten Sie darauf, `node_modules` zu entfernen, die Sie in Ihrer endgültigen Anwendung nicht benötigen da jedes Modul, das Sie nicht benötigen, die Größe Ihrer Anwendung vergrößert.

Die Ausgabe sollte etwa wie folgt aussehen:

```plaintext
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Schritt 2: Ausführen des Electron-Windows-Store

Führen Sie aus einer erhöhten PowerShell (als Administrator) `Elektron-Windows-store` mit den erforderlichen Parametern aus sowohl die Eingabe als auch die Ausgabeverzeichnisse, den Namen und die Version der App übergeben und bestätigen, dass `node_modules` abgeflacht werden sollen.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0 `
    --package-name myelectronapp
```

Sobald das Werkzeug ausgeführt wurde, wird es zur Arbeit: Es akzeptiert Ihre Electron-App als Eingabe, verfacht die `node_modules`. Anschließend archiviert es Ihre Anwendung als `app.zip`. Mit Hilfe eines Installers und eines Windows-Containers erstellt das Tool ein "erweitertes" AppX Paket - einschließlich des Windows Application Manifest (`AppXManifest. ml`) sowie sowie das virtuelle Dateisystem und die virtuelle Registry in Ihrem Output Ordner.

Sobald die erweiterten AppX-Dateien erstellt wurden, verwendet das Tool den Windows App Packager (`MakeAppx. Axt`), um aus diesen Dateien ein AppX-Paket für eine einzelne Datei zu erstellen. Schließlich kann das Tool verwendet werden, um ein vertrauenswürdiges Zertifikat auf Ihrem Computer zu erstellen, um das neue AppX-Paket zu signieren. Mit dem signierten AppX-Paket kann das CLI auch das Paket automatisch auf Ihrem Rechner installieren.

## Schritt 3: Nutzen des AppX Pakets

Um Ihr Paket ausführen zu können, wird Windows 10 mit dem sogenannten "Anniversary Update" benötigt. Details, wie man Windows aktualisieren kann, können [hier][how-to-update] gefunden werden.

Im Gegensatz zu traditionellen UWP-Apps, müssen sich gepackte Apps einem manuellen Prüfprozess unterziehen. Dieser kann [hier][centennial-campaigns] beantragt werden. In der Zwischenzeit können alle Benutzer Ihr Paket durch einen Doppelklick installieren damit eine Einreichung im Shop nicht notwendig ist, wenn Sie nach einer einfacheren Installationsmethode suchen. In einer verwalteten Umgebung (normalerweise Unternehmen), das `Add-AppxPackage` [Powershell Cmdlet][add-appxpackage] kann benutzt werden, um es auf automatischem Wege zu installieren.

Eine weitere wichtige Beschränkung ist, dass das kompilierte AppX-Paket noch eine win32 Programmdatei beinhaltet. Somit wird es nicht auf der Xbox, HoloLens oder Mobiltelefonen ausführbar sein.

## Optional: Hinzufügen von UWP-Funktionen mittels eines Hintergrundprozesses
Sie können Ihre Electron-App mit einer unsichtbaren UWP-Hintergrund-Aufgabe koppeln, die die Funktionen von Windows 10 voll nutzen wird - wie Push-Benachrichtigungen, Cortana Integration oder Live-Fliesen.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample][background-task].

## Optional: Mit Container-Virtualisierung konvertieren

Um das AppX-Paket zu generieren, verwendet der `Elektron-Windows-Store` CLI eine Vorlage die für die meisten Electron-Apps funktionieren soll. Wenn Sie jedoch einen benutzerdefinierten -Installer verwenden oder Probleme mit dem generierten Paket haben sollten Sie können versuchen, ein Paket mit einem Windows-Container zu erstellen - in diesem Modus das CLI wird Ihre Anwendung in leerem Windows Container installieren und ausführen, um festzustellen, welche Änderungen Ihre Anwendung genau am Betriebssystem vornimmt.

Bevor Sie das CLI zum ersten Mal ausführen, müssen Sie den "Windows Desktop App Converter" einrichten. Dies wird einige Minuten dauern, aber keine Sorge. Du musst nur einmal machen. Download and Desktop App Converter from [here][app-converter]. Sie erhalten zwei Dateien: `DesktopAppConverter.zip` und `BaseImage-14316.wim`.

1. Entpacken `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2. Führen Sie dann die Installation des Desktop-App-Konverters durch und übergeben Sie die -Position des Windows-Basisbildes (heruntergeladen als `BaseImage-14316. im`), von aufrufen `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. Wenn Sie den obigen Befehl ausführen, rufen Sie bitte nach einem Neustart Ihren -Rechner neu und führen Sie den obigen Befehl nach einem erfolgreichen Neustart erneut aus.

Sobald die Installation erfolgreich war, können Sie zum Kompilieren Ihrer Electron-App übergehen.

[windows-sdk]: https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk
[app-converter]: https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter
[add-appxpackage]: https://technet.microsoft.com/en-us/library/hh856048.aspx
[electron-packager]: https://github.com/electron/electron-packager
[electron-windows-store]: https://github.com/catalystcode/electron-windows-store
[background-task]: https://github.com/felixrieseberg/electron-uwp-background
[centennial-campaigns]: https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge
[how-to-update]: https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update
