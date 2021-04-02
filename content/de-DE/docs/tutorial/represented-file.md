# Repräsentierte Datei für macOS BrowserWindows

## Übersicht

Unter macOS können Sie eine dargestellte Datei für jedes Fenster in Ihrer Anwendung festlegen. Das Symbol der dargestellten Datei wird in der Titelleiste angezeigt, und wenn Benutzer `Command-Click` oder `Control-Click`, wird ein Popup mit einem Pfad zur Datei angezeigt.

![Repräsentierte Datei][1]

> HINWEIS: Der obige Screenshot ist ein Beispiel, in dem diese Funktion verwendet wird, um die aktuell geöffnete Datei im Atom-Texteditor anzuzeigen.

Sie können auch den bearbeiteten Status für ein Fenster festlegen, sodass das Dateisymbol angeben kann, ob das Dokument in diesem Fenster geändert wurde.

Um die dargestellte Datei des Fensters festzulegen, können Sie die [BrowserWindow.setRepresentedFilename][setrepresentedfilename] und [BrowserWindow.setDocumentEdited][setdocumentedited] APIs verwenden.

## Beispiel

Beginnend mit einer funktionierenden Anwendung aus dem [Quick Start Guide](quick-start.md), fügen Sie folgende Zeilen in die `main.js` Datei ein:

```javascript fiddle='docs/fiddles/features/represented-file'
const { app, BrowserWindow } = require('electron')

app.whenReady().then()=>
  const win = new BrowserWindow()

  win.setRepresentedFilename('/etc/passwd')
  win.setDocumentEdited(true)

```

Nachdem Sie die Electron-Anwendung gestartet haben, klicken Sie auf den Titel mit `Command` oder `Control` Taste gedrückt. Es sollte ein Popup mit der gerade definierten Datei angezeigt werden:

![Vertretene Datei](../images/represented-file.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
