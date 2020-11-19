# Native Datei Drag & Drop

## Übersicht

Bestimmte Arten von Anwendungen, die Dateien manipulieren, könnten die native Datei-Drag & Drop Funktion des Betriebssystems unterstützen. Das Ziehen von Dateien in Webinhalte ist üblich und wird von vielen Webseiten unterstützt. Electron unterstützt zusätzlich das Ziehen von Dateien und Inhalten aus Webinhalten in die Welt des Betriebssystems .

Um diese Funktion in Ihrer App zu implementieren, müssen Sie den [`Webcontent aufrufen. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API als Antwort auf das `ondragstart` Ereignis.

## Beispiel

Beginnend mit einer funktionierenden Anwendung aus dem [Quick Start Guide](quick-start.md), fügen Sie folgende Zeilen in die `index.html` Datei ein:

```html
<a href="#" id="drag">Ziehen Sie mich</a>
<script src="renderer.js"></script>
```

und fügen Sie folgende Zeilen zur Datei `renderer.js` hinzu:

```js
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')
}
```

Der obige Code weist den Renderer-Prozess an, das `ondragstart` Event zu bearbeiten und die Informationen an den Hauptprozess weiterzuleiten.

Im Hauptprozess`. s` Datei), erweitern das empfangene Ereignis mit einem Pfad zur Datei, die gezogen wird, und einem Symbol:

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

Nachdem Sie die Electron-Anwendung gestartet haben, versuchen Sie das Element aus dem Broswer-Fenster auf Ihren Desktop zu ziehen. In dieser Anleitung ist das Element eine Markdown-Datei, die sich im Stammverzeichnis des Projekts befindet:

![Ziehen und Ablegen](../images/drag-and-drop.gif)
