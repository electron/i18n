# Natives Datei Drag & Drop

Bestimmte Arten von Anwendungen, die Dateien manipulieren, könnten die native Datei-Drag & Drop Funktion des Betriebssystems unterstützen. Das Ziehen von Dateien in Webinhalte ist üblich und wird von vielen Webseiten unterstützt. Electron unterstützt zusätzlich das Ziehen von Dateien und Inhalten aus Webinhalten in die Welt des Betriebssystems .

Um diese Funktion in Ihrer App zu implementieren, müssen Sie `webContents.startDrag(item)` API als Antwort auf das Ereignis `ondragstart` aufrufen.

Behandeln Sie in Ihrem Renderer-Prozess das Ereignis `ondragstart` und leiten Sie die Informationen an Ihren Hauptprozess weiter.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Im Hauptprozess wird dann das Ereignis um einen Pfad zur Datei erweitert, die gezogen wird und ein Symbol.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
