# Veröffentlichung im Windows Store

Mit Windows 10, die bewährten win32-Programmdateien bekamen einen neuen Verwandten: die Universelle Windows-Plattform. Das neue `.appx`-Format ermöglicht nicht nur neue APIs wie 'Cortana' oder 'Push Notifications', sondern, durch den Windows Store, wird das Aktualisieren und die Installation vereinfacht.

Microsoft [entwickelte ein Werkzeug, dass Electron-Apps in `.appx`-Pakete](https://github.com/catalystcode/electron-windows-store) kompiliert. Somit wird Entwicklern ermöglicht, einige der Annehmlichkeiten, welche sich im neuen Enticklungs-Modul finden, zu nutzen. Diese Anleitung erklärt Ihnen, wie man es benutzt - und was die Möglichkeiten und Begrenzungen von Electron-AppX-Paketen sind.

## Hintergrund und Voraussetzungen

Windows 10 "Anniversary Update" kann win32-`.exe`-Dateien ausführen, indem man sie zusammen mit einem virtualisiertem Dateisystem und einer Registry startet. Beides wird während der Kompilierung erstellt durch das Ausführen der App und des Installer in einem Windows-Container. Dies erlaubt Windows genau zu identifizieren, welche Änderungen am Betriebssystem gemacht werden während der Installation. Das Zusammenbringen der Programmdatei mit einem virtuellem Dateisystem und einer virtuellen Registry erlaubt Windows, dass Ein-Klick Installationen und Deinstallationen möglich sind.

Zusätzlich wird die exe innerhalb eines appx-Modells ausgeführt. Somit können viele der APIs genutzt werden, welche in der Universellen Windows-Plattform verfügbar sind. Um noch mehr Möglichkeiten zu bekommen, kann sich eine Electron-App im Hintergrund mit einem unsichtbaren UWP-Hintergrund-Task verbinden, welcher zusammen mit der `exe` startet. Sie wird als eine Art "Handlanger" gestartet, um Tasks im Hintergrund zu starten, damit Push Notifications empfangen werden können oder um mit anderen UWP-Anwendungen kommunizieren zu können.

Um eine existierende Ectron-App zu kompilieren, stellen Sie sicher, dass die folgenden Bedingungen erfüllt sind:

* Windows 10 mit Anniversary Update (veröffentlicht am 2. August 2016)
* Das Windows 10 SDK, [Download-Link](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Mindestens Node 4 (zum prüfen, `node -v` ausführen)

Als nächstes: Installieren der `electron-windows-store` CLI:

```sh
npm install -g electron-windows-store
```

## Schritt 1: Die Electron Anwendung packen

Packen Sie die Anwendung mittels des [Electron-Packagers](https://github.com/electron-userland/electron-packager) (oder einer vergleichbaren Anwendung). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

Die Ausgabe sollte etwa wie folgt aussehen:

```text
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
├── natives_blob.bin
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── snapshot_blob.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Schritt 2: Ausführen des Electron-Windows-Store

From an elevated PowerShell (run it "as Administrator"), run `electron-windows-store` with the required parameters, passing both the input and output directories, the app's name and version, and confirmation that `node_modules` should be flattened.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --flatten true `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Once executed, the tool goes to work: It accepts your Electron app as an input, flattening the `node_modules`. Then, it archives your application as `app.zip`. Using an installer and a Windows Container, the tool creates an "expanded" AppX package - including the Windows Application Manifest (`AppXManifest.xml`) as well as the virtual file system and the virtual registry inside your output folder.

Once the expanded AppX files are created, the tool uses the Windows App Packager (`MakeAppx.exe`) to create a single-file AppX package from those files on disk. Finally, the tool can be used to create a trusted certificate on your computer to sign the new AppX package. With the signed AppX package, the CLI can also automatically install the package on your machine.

## Schritt 3: Nutzen des AppX Pakets

Um Ihr Paket ausführen zu können, wird Windows 10 mit dem sogenannten "Anniversary Update" benötigt. Details, wie man Windows aktualisieren kann, können [hier](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update) gefunden werden.

Im Gegensatz zu traditionellen UWP-Apps, müssen sich gepackte Apps einem manuellen Prüfprozess unterziehen. Dieser kann [hier](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge) beantragt werden. In the meantime, all users will be able to install your package by double-clicking it, so a submission to the store might not be necessary if you're looking for an easier installation method. In einer verwalteten Umgebung (normalerweise Unternehmen), das `Add-AppxPackage` [Powershell Cmdlet](https://technet.microsoft.com/en-us/library/hh856048.aspx) kann benutzt werden, um es auf automatischem Wege zu installieren.

Eine weitere wichtige Beschränkung ist, dass das kompilierte AppX-Paket noch eine win32 Programmdatei beinhaltet. Somit wird es nicht auf der Xbox, HoloLens oder Mobiltelefonen ausführbar sein.

## Optional: Hinzufügen von UWP-Funktionen mittels eines Hintergrundprozesses

You can pair your Electron app up with an invisible UWP background task that gets to make full use of Windows 10 features - like push notifications, Cortana integration, or live tiles.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

## Optional: Convert using Container Virtualization

To generate the AppX package, the `electron-windows-store` CLI uses a template that should work for most Electron apps. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Before running the CLI for the first time, you will have to setup the "Windows Desktop App Converter". This will take a few minutes, but don't worry - you only have to do this once. Download and Desktop App Converter from [here](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter). You will receive two files: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1. Unzip `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2. Then, run the installation of the Desktop App Converter, passing in the location of the Windows base Image (downloaded as `BaseImage-14316.wim`), by calling `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. If running the above command prompts you for a reboot, please restart your machine and run the above command again after a successful restart.

Once installation succeeded, you can move on to compiling your Electron app.