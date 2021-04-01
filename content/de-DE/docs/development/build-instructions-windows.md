# Build Anweisungen (Windows)

Befolgen Sie die folgenden Richtlinien für den Aufbau von Electron unter Windows.

## Vorrausetzungen

* Windows 10 / Server 2012 R2 oder höher
* Visual Studio 2017 15.7.2 oder höher - [DOWNLOAD VS 2019 Community Edition zum kostenlos](https://www.visualstudio.com/vs/)
  * Weitere Informationen dazu, welche Visual Studio- Komponenten erforderlich sind, finden Sie in [der Chromium-Builddokumentation](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio) .
  * Wenn Visual Studio in einem anderen Verzeichnis als dem Standard verzeichnis installiert ist, müssen Sie einige Umgebungsvariablen festlegen, um die Toolchains auf ihren Installationspfad zu verweisen.
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community`, ersetzen Sie `2019` und `Community` durch die installierten Versionen und ersetzen Sie `DRIVE:` durch das Laufwerk, auf dem Visual Studio ist. Oft wird dies `C:`.
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`, ersetzen Sie `DRIVE:` durch das Laufwerk, auf dem windows Kits installiert ist. Oft wird dies `C:`.
  * [Python für Windows (pywin32) Erweiterungen](https://pypi.org/project/pywin32/#files) ist auch erforderlich, um den Buildprozess auszuführen.
* [Node.js](https://nodejs.org/download/)
* [Git](https://git-scm.com)
* Debugtools für Windows von Windows SDK 10.0.15063.468, wenn Sie planen, eine vollständige Verteilung zu erstellen , da `symstore.exe` zum Erstellen eines Symbols verwendet wird, aus `.pdb` Dateien speichern.
  * Verschiedene Versionen des SDK können nebeneinander installiert werden. Um das SDK zu installieren, öffnen Sie Visual Studio Installer, wählen Sie `Change` → `Individual Components`aus , scrollen Sie nach unten, und wählen Sie die entsprechende zu installierenden Windows SDK aus. Eine andere Möglichkeit wäre, die [Windows SDK und das Emulatorarchiv](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) zu betrachten und die eigenständige Version des SDK herunterzuladen.
  * Die SDK-Debugging-Tools müssen ebenfalls installiert sein. Wenn das Windows 10 SDK über das Visual Studio-Installationsprogramm installiert wurde, können sie installiert werden, indem Sie zu: `Control Panel` → `Programs` → `Programs and Features` → Wählen Sie das "Windows Software Development Kit" → `Change` → `Change` → überprüfen Sie "Debugging Tools For Windows" → `Change`. Sie können auch das eigenständige SDK-Installationsprogramm herunterladen und es zum Installieren der Debugging-Tools verwenden.

Wenn Sie derzeit keine Windows-Installation haben, verfügt [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) über zeitbombte Windows-Versionen, mit denen Sie Electron erstellen können.

Das Erstellen von Electron erfolgt vollständig mit Befehlszeilenskripts und kann nicht mit Visual Studio durchgeführt werden. Sie können Electron mit jedem Editor entwickeln, aber Die Unterstützung für Erstellen mit Visual Studio wird in der Zukunft kommen.

**Hinweis:** Obwohl Visual Studio nicht zum Erstellen verwendet wird, ist es immer noch **erforderlich** , da wir die Build-Toolchains benötigen, die es bereitstellt.

## Quellstruktur aus Windows Security ausschließen

Windows Security mag eine der Dateien im Chromium-Quellcode nicht (siehe https://crbug.com/441184), daher wird sie ständig gelöscht, was `gclient sync` Probleme verursacht. Sie können ausschließen, dass die Quellstruktur von Windows Security überwacht wird, indem Sie [diesen Anweisungen](https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c301afe13b26)folgen.

## Building

Siehe [Build Instruktionen: GN](build-instructions-gn.md)

## 32-Bit-Build

Um für das 32-Bit-Ziel zu bauen, müssen Sie `target_cpu = "x86"` als GN- arg übergeben. Sie können das 32-Bit-Ziel zusammen mit dem 64-Bit-Ziel erstellen, indem Sie ein anderes Ausgabeverzeichnis für GN verwenden, z. B. `out/Release-x86`mit unterschiedlichen Argumenten.

```powershell
$ gn gen out/Release-x86 --args="import(">electron/build/args/release.gn") target_cpu= "x86""
```

Die anderen Bauschritte sind genau die gleichen.

## Visual Studio-Projekt

Um ein Visual Studio-Projekt zu generieren, können Sie den `--ide=vs2017` -Parameter an `gn gen`übergeben:

```powershell
$ gn gen out/Testing --ide=vs2017
```

## Problemlösungen

### Befehl xxxx nicht gefunden

Wenn sie auf einen Fehler wie `Command xxxx not found`gestoßen sind, können Sie versuchen, der `VS2015 Command Prompt` Konsole zu verwenden, um die Buildskripts auszuführen.

### Schwerwiegender interner Compilerfehler: C1001

Stellen Sie sicher, dass Sie die neueste Visual Studio Version installiert haben.

### LNK1181: Eingabedatei 'kernel32.lib' kann nicht geöffnet werden

Versuchen Sie, 32bit Node.js neu zu installieren.

### Fehler: ENOENT, stat 'C:'Users'USERNAME'AppData\Roaming\npm'

Das Erstellen dieses Verzeichnisses [sollte das Problem beheben](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir -AppData\Roaming\npm
```

### node-gyp wird nicht als interner oder externer Befehl erkannt

Diese Fehlermeldung wird möglicherweise angezeigt, wenn Sie Git Bash zum Erstellen verwenden, stattdessen PowerShell oder VS2015-Eingabeaufforderung verwenden sollten.

### kann verzeichnis bei '...' nicht erstellen: Dateiname zu lang

node.js hat einige [extrem langen Pfadnamen](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), und standardmäßig wird git in Windows nicht korrekt mit langen Pfadnamen behandelt (obwohl Windows sie unterstützt). Dies sollte es beheben:

```sh
$ git config --system core.longpaths true
```

### Fehler: Verwendung des nicht deklarierten Bezeichners 'DefaultDelegateCheckMode'

Dies kann während des Builds geschehen, wenn Debugging Tools für Windows mit Windows Driver Kit installiert wurde. Deinstallieren Sie Das Windows Driver Kit und installieren Sie Die Debugging Tools mit den oben beschriebenen Schritten.

### ImportError: Kein Modul mit dem Namen win32file

Stellen Sie sicher, dass Sie `pywin32` mit `pip install pywin32`installiert haben.

### Build-Skripte hängen, bis Keypress

Dieser Fehler ist ein "Feature" der Windows-Eingabeaufforderung. Dies geschieht, wenn Sie im Eingabeaufforderungsfenster mit aktiviertem `QuickEdit` klicken und das einfache Auswählen und Kopieren von Ausgabetext ermöglichen sollen. Da bei jedem versehentlichen Klick der Buildprozess angehalten wird, sollten Sie dieses -Funktion in den Eingabeaufforderungseigenschaften deaktivieren.
