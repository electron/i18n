# Build-Anweisungen

Befolgen Sie die folgenden Richtlinien für den Aufbau von Electron.

## Plattformvoraussetzungen

Überprüfen Sie die Buildvoraussetzungen für Ihre Plattform, bevor Sie fortfahren

* [macOS](build-instructions-macos.md#prerequisites)
* [Linux](build-instructions-linux.md#prerequisites)
* [Windows](build-instructions-windows.md#prerequisites)

## Buildtools

[Electron es Build Tools](https://github.com/electron/build-tools) einen Großteil des Setups für die Kompilierung von Electron aus der Quelle mit unterschiedlichen Konfigurationen und Buildzielen automatisieren. Wenn Sie die Umgebung manuell einrichten möchten, finden Sie die folgenden Anweisungen.

## GN-Voraussetzungen

Sie müssen [`depot_tools`][depot-tools]installieren, das Toolset , das zum Abrufen von Chromium und seinen Abhängigkeiten verwendet wird.

Außerdem müssen Sie unter Windows die Umgebungsvariable `DEPOT_TOOLS_WIN_TOOLCHAIN=0`festlegen. Öffnen Sie dazu `Control Panel` → `System- und
-Sicherheits` → `System` → `Advanced system settings` und fügen Sie eine Systemvariable `DEPOT_TOOLS_WIN_TOOLCHAIN` mit dem Wert `0`hinzu.  Dadurch wird `depot_tools` aufgefordert, Ihre lokal installierte Version von Visual Studio zu verwenden (standardmäßig wird `depot_tools` versuchen, eine Google-interne Version herunterzuladen, auf die nur Googler Zugriff haben).

### Einrichten des Git-Cache

Wenn Sie beabsichtigen, Electron mehrmals auszuchecken (z. B. um mehrere parallele Verzeichnisse auf verschiedene Zweige auszuchecken), beschleunigt die Verwendung des Git- -Cache nachfolgende Aufrufe von `gclient`. Legen Sie dazu eine `GIT_CACHE_PATH` Umgebungsvariable fest:

```sh
• Export GIT_CACHE_PATH="${HOME}/.git_cache"
"${GIT_CACHE_PATH}"
" Dies wird etwa 16G verwenden.
```

## Abrufen des Codes

```sh
$ mkdir-Elektronen- && -elektro-
--name "src/electron" --unmanaged https://github.com/electron/electron
--with_branch_heads --with_tags
- Dies wird eine Weile dauern, gehen Sie einen Kaffee.
```

> Anstelle `https://github.com/electron/electron`können Sie hier Ihre eigene Gabel verwenden (so etwas wie `https://github.com/<username>/electron`).

### Ein Hinweis zum Ziehen/Schieben

Wenn Sie in Zukunft `git pull` oder aus dem offiziellen `electron` -Repository  oder `git push` möchten, müssen Sie nun die Ursprungs-URLs des jeweiligen Ordners aktualisieren.

```sh
$ cd src/electron
- git remote remove origin
' git remote add origin https://github.com/electron/electron
' git checkout master
'git branch --set-upstream-to=origin/master
' cd -
```

:memo: `gclient` funktioniert, indem eine Datei mit dem Namen `DEPS` im Ordner `src/electron` auf Abhängigkeiten überprüft wird (z. B. Chrom oder Node.js). Durch das Ausführen `gclient sync -f` wird sichergestellt, dass alle abhängigkeiten, die zum Erstellen von Electron erforderlich sind, mit dieser Datei übereinstimmen.

Um zu ziehen, würden Sie die folgenden Befehle ausführen:

```sh
$ cd src/electron
' git pull
-f
```

## Building

```sh
$ cd src
- Export CHROMIUM_BUILDTOOLS_PATH='pwd'/buildtools
'gn gen out/Testing --args="import('>electron/build/args/testing.gn. $GN_EXTRA_ARGSgn.gn)"
```

Oder unter Windows (ohne optionales Argument):

```sh
$ cd src
- set CHROMIUM_BUILDTOOLS_PATH=%cd%'buildtools
'gn gen out/Testing --args="import('>electron/build/args/testing.gn'")"
```

Dadurch wird ein Buildverzeichnis generiert, das mit der Testbuildkonfiguration `out/Testing` unter `src/` wird. Sie können `Testing` durch einen anderen Namen ersetzen, aber es sollte ein Unterverzeichnis von `out`sein. Außerdem sollten Sie `gn gen` nicht erneut ausführen müssen – wenn Sie die Buildargumente ändern möchten, können Sie `gn args out/Testing` ausführen, um einen Editor aufzuladen.

Um die Liste der verfügbaren Buildkonfigurationsoptionen anzuzeigen, führen Sie `gn args
out/Testing --list`aus.

**Zum Generieren von Testing Build-Konfiguration von Electron:**

```sh
$ gn gen out/Testing --args="import(">electron/build/args/testing.gn.gn") $GN_EXTRA_ARGS"
```

**Zum Generieren von Release (auch als "nicht-Komponente" oder "statisch") build config von Electron:**

```sh
$ gn gen out/Release --args="import(">electron/build/args/release.gn") $GN_EXTRA_ARGS"
```

**Um zu bauen, laufen Sie `ninja` mit dem `electron` Ziel:** Nota Bene: Das wird auch eine Weile dauern und wahrscheinlich Ihre Runde aufheizen.

Für die Testkonfiguration:

```sh
$ Ninja -C-Out/Testing-Elektron
```

Für die Release-Konfiguration:

```sh
$ Ninja -C-Out/Release-Elektron
```

Dadurch wird das gesamte zuvor "libchromiumcontent" (d. h. das `content/` Verzeichnis von `chromium` und seinen Abhängigkeiten, inkl. WebKit und V8), , so dass es eine Weile dauern wird.

Die gebaute ausführbare Datei wird unter `./out/Testing`:

```sh
$ ./out/Testing/Electron.app/Contents/MacOS/Electron
oder, unter Windows
. ..exe
.
.
```

### Pakete erstellen

Entfernen Sie unter Linux zuerst die Debugging- und Symbolinformationen:

```sh
elektro/script/strip-binaries.py -d out/Release
```

So verpacken Sie den Elektronenbuild als verteilbare ZIP-Datei:

```sh
ninja -C out/Release-Elektron:electron_dist_zip
```

### Cross-Compiling

Um für eine Plattform zu kompilieren, die nicht mit der Plattform identisch ist, auf der Sie aufbauen, die `target_cpu` - und `target_os` GN-Argumente festlegen. Um beispielsweise ein x86-Ziel von einem x64-Host zu kompilieren, geben Sie `target_cpu = "x86"` in `gn args`an.

```sh
$ gn gen out/Testing-x86 --args='... target_cpu = "x86"'
```

Nicht alle Kombinationen von Quell- und Ziel-Prozessor/Betriebssystem werden von Chromium unterstützt.

| Host        | Ziel          | Status               |
| ----------- | ------------- | -------------------- |
| Windows x64 | Windows arm64 | Experimentell        |
| Windows x64 | Windows x86   | Automatisch getestet |
| Linux x64   | Linux x86     | Automatisch getestet |

Wenn Sie andere Kombinationen testen und diese funktionieren aktualisieren Sie bitte dieses Dokument :)

Siehe GN-Referenz für zulässige Werte von [`target_os`][target_os values] und [`target_cpu`][target_cpu values].

#### Windows auf Arm (experimentell)

Um Windows auf Arm zu kompilieren, folgen Sie[dem Chromium-Guide](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio) um die notwendigen Abhängigkeiten, SDK und Bibliotheken zu erhalten, und bauen Sie dann mit `ELECTRON_BUILDING_WOA=1` in Ihrer Umgebung, bevor Sie `gclient sync`ausführen.

```bat
set ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Oder (wenn Sie PowerShell benutzen):

```powershell
$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Als nächstes führe `gn gen` aus wie oben mit `target_cpu="arm64"`.

## Tests

Um die Tests durchzuführen, müssen Sie zuerst die Testmodule gegen die gleiche Version von Node.js bauen, die als Teil des Build-Prozesses gebaut wurde. Um Build Header für die Module zu kompilieren, führen Sie folgende Befehle in dem `src/` Verzeichnis aus.

```sh
$ Ninja -C out/Testing third_party/electron_node:headers
```

Sie können nun die Tests [](testing.md#unit-tests)ausführen.

Wenn Sie etwas debuggen kann es hilfreich sein einige zusätzlichen Flaggen zu der Electron Binärdatei zu übergeben:

```sh
$pm-Lauftest -- -
  --enable-logging -g 'BrowserWindow-Modul'
```

## Freigeben des Git-Cache zwischen mehreren Computern

Es ist möglich, den gclient git-Cache mit anderen Computern zu teilen, indem Sie ihn als SMB-Freigabe unter Linux exportieren, aber nur ein Prozess/Computer kann den Cache zu einem Zeitpunkt verwenden. Die sperren, die durch das Git-Cache-Skript erstellt werden, versuchen dies zu verhindern, aber es kann in einem Netzwerk nicht perfekt funktionieren.

Unter Windows verfügt SMBv2 über einen Verzeichniscache, der Probleme mit dem Git- Cacheskript verursacht, daher ist es notwendig, ihn durch Festlegen des Registrierungsschlüssels zu deaktivieren.

```sh
HKEY_LOCAL_MACHINE-System-CurrentControlSet-Services-Lanmanworkstation-Parameter-DirectoryCacheLifetime
```

auf 0. Weitere Informationen: https://stackoverflow.com/a/9935126

Dies kann schnell in powershell (als Administrator ausgeführt) eingestellt werden:

```powershell
New-ItemProperty -Pfad "HKLM:'System'CurrentControlSet'Services'Lanmanworkstation'Parameters" -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
```

## Problemlösungen

### gclient sync beschwert sich über Rebase

Wenn `gclient sync` unterbrochen wird, kann der Git-Baum in einem schlechten Zustand bleiben, was zu einer kryptischen Meldung führt, wenn `gclient sync` in der Zukunft ausgeführt wird:

```plaintext
2> Konflikt beim Umbasieren dieses Zweigs.
2> Beheben Sie den Konflikt und führen Sie gclient erneut aus.
2> Siehe man git-rebase für Details.
```

Wenn es in `src/electron`keine Git-Konflikte oder -Rebasen gibt, müssen Sie möglicherweise einen `git am` in `src`abbrechen:

```sh
$ cd .. /
git am --abort
- cd-Elektron
- gclient sync -f
```

### Ich werde nach einem Benutzernamen/Passwort für chromium-internal.googlesource.com

Wenn beim Ausführen `gclient sync` unter Windows eine Eingabeaufforderung für `Username for 'https://chrome-internal.googlesource.com':` angezeigt wird, liegt dies wahrscheinlich daran, dass die `DEPOT_TOOLS_WIN_TOOLCHAIN` Umgebungsvariable nicht auf 0 festgelegt ist. Öffnen Sie `Control Panel` → `System and Security` → `System` → `Advanced system settings` , und fügen Sie eine Systemvariable `DEPOT_TOOLS_WIN_TOOLCHAIN` mit dem Wert `0`hinzu.  Dadurch wird `depot_tools` aufgefordert, Ihre lokal installierte Version von Visual Studio zu verwenden (standardmäßig wird `depot_tools` versuchen, eine Google-interne Version herunterzuladen, auf die nur Googler Zugriff haben).

[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

[target_os values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values
[target_cpu values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values
