# Struktur des Quellcode-Verzeichnisses

Electrons Source Code ist aufgeteilt in einige Bereiche und folgt weitestgehend den Chromium separation conventions.

Es wäre hilfreich sich in [Chromium's Multi-Prozess Architekture](https://dev.chromium.org/developers/design-documents/multi-process-architecture) einzulesen um den Source Code besser zu verstehen.

## Struktur des Source Codes

```diff
Electron
├── build/ - Build configuration files needed to build with GN.
├── buildflags/ - Determines the set of features that can be conditionally built.
├── chromium_src/ - Source code copied from Chromium that isn't part of the content layer.
├── default_app/ - A default app run when Electron is started without
|                  providing a consumer app.
├── docs/ - Electron's documentation.
|   ├── api/ - Documentation for Electron's externally-facing modules and APIs.
|   ├── development/ - Documentation to aid in developing for and with Electron.
|   ├── fiddles/ - A set of code snippets one can run in Electron Fiddle.
|   ├── images/ - Images used in documentation.
|   └── tutorial/ - Tutorial documents for various aspects of Electron.
├── lib/ - JavaScript/TypeScript source code.
|   ├── browser/ - Main process initialization code.
|   |   ├── api/ - API implementation for main process modules.
|   |   └── remote/ - Code related to the remote module as it is
|   |                 used in the main process.
|   ├── common/ - Relating to logic needed by both main and renderer processes.
|   |   └── api/ - API implementation for modules that can be used in
|   |              both the main and renderer processes
|   ├── isolated_renderer/ - Handles creation of isolated renderer processes when
|   |                        contextIsolation is enabled.
|   ├── renderer/ - Renderer process initialization code.
|   |   ├── api/ - API implementation for renderer process modules.
|   |   ├── extension/ - Code related to use of Chrome Extensions
|   |   |                in Electron's renderer process.
|   |   • Remote/ - Logik, die die Verwendung des Remote-Moduls in
|   |   |             den Hauptprozess.
|   |   Web-View/ - Logik, die die Verwendung von Webviews im
|   |                   Renderer-Prozess.
|   - sandboxed_renderer/- Logik, die die Erstellung von Sandkasten-Renderer-
|   |   |                     Prozesse.
|   |   Api/ - API-Implementierung für Sandkasten-Rendererprozesse.
|   - Arbeitskraft/ - Logik, die die ordnungsgemäße Funktionalität von Node verarbeitet.js
|                 Umgebungen in Web Workers.
Patches/ - Patches, die auf die Kernabhängigkeiten von Electron aufgetragen werden
|   |          um Unterschiede zwischen unseren Anwendungsfällen und
|   |          Standardfunktionalität.
|   Boringssl/ - Patches auf Googles Gabel von OpenSSL, BoringSSL angewendet.
|   Chrom/ - Auf Chrom aufgetragene Patches.
|   - Patches, die auf Knoten.js angewendet werden.
|   V8/ - Patches auf Googles V8-Engine angewendet.
Shell/ - C++-Quellcode.
|   ├── app/ - System entry code.
|   Browser/ - Das Frontend mit dem Hauptfenster, der Benutzeroberfläche und allen
|   |   |          Hauptprozess-Dinge. Dies spricht mit dem Renderer, um Web-
| zu verwalten   |   |          Seiten.
|   |   Ui/ - Implementierung von UI-Material für verschiedene Plattformen.
|   |   |   • Kakao/- Kakao-spezifischer Quellcode.
|   |   |   Win/ - Windows GUI spezifischer Quellcode.
|   |   |   X11-spezifischer Quellcode.
|   |   Api/ - Die Implementierung der Hauptprozess-APIs.
|   |   Net/ - Netzwerk-Code.
|   |   Mac/ - Mac-spezifischer Objektiv-C-Quellcode.
|   |   Ressourcen/ - Icons, plattformabhängige Dateien usw.
|   - Renderer/ - Code, der im Renderer-Prozess ausgeführt wird.
|   |   Api/ - Die Implementierung von Renderer-Prozess-APIs.
|   • Common/ - Code, der sowohl von den Haupt- als auch von den Rendererprozessen verwendet wird,
|       |         einschließlich einiger Dienstprogrammfunktionen und Code zum Integrieren der
| des Knotens       |         Message-Schleife in die Message-Schleife von Chromium.
|       Api/ - Die Implementierung gemeinsamer APIs und Grundlagen der
|                  Die integrierten Module von Electron.
- Komponenten der Testsammlung von Electron werden im Renderer-Prozess ausgeführt.
• spec-main/ - Komponenten der Testsammlung von Electron laufen im Hauptprozess.
• BUILD.gn - Bauregeln von Electron.
```

## Struktur der anderen Verzeichnisse

* **.circleci** - Config-Datei für CI mit CircleCI.
* **.github** - GitHub-spezifische Konfigurationsdateien, einschließlich Problemvorlagen und CODEOWNERS.
* **dist** - Temporäres Verzeichnis, das vom skript `script/create-dist.py` erstellt wurde, wenn eine Distribution erstellt wird.
* **external_binaries** - Heruntergeladene Binärdateien von Drittanbieter-Frameworks, die das Erstellen mit `gn`nicht unterstützen .
* **node_modules** - Knotenmodule von Drittanbietern, die zum Erstellen verwendet werden.
* **npm** - Logic for installation of Electron via npm.
* **out** - Temporäres Ausgabeverzeichnis von `ninja`.
* **Skript** - Skripte, die für Entwicklungszwecke wie Gebäude, Verpackung, Tests usw. verwendet werden.

```diff
script/ - Der Satz aller Skripte, die Electron für eine Vielzahl von Zwecken ausgeführt.
Codesign/ - Fakes Codesigning für Electron-Apps; zum Testen verwendet werden.
- Verschiedene Python-Dienstprogrammskripte.
Release/ - Skripte werden während des Veröffentlichungsprozesses von Electron ausgeführt.
    Hinweise/ - Generiert Versionshinweise für neue Electron-Versionen.
    Uploader/ - Lädt verschiedene Release-bezogene Dateien während der Veröffentlichung hoch.
```

* **Tools** - Hilfsskripts, die von GN-Dateien verwendet werden.
  * Skripts, die hier gesetzt werden, sollten niemals direkt von Benutzern aufgerufen werden, im Gegensatz zu denen in `script`.
* **Typisierungen** - TypeScript-Typisierungen für den internen Code von Electron.
* **Anbieter** - Quellcode für einige Abhängigkeiten von Drittanbietern.
