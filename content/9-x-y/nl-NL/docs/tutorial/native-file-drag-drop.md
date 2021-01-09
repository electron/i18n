# Drag & Drop Bestanden

Bepaalde soorten toepassingen die bestanden manipuleren willen misschien het besturingssysteem standaard bestand slepen & drop functie. Bestanden verplaatsen naar webinhoud is veel voorkomende en wordt door veel websites ondersteund. Electron ondersteunt additioneel het slepen van bestanden en inhoud van webcontent naar het besturingssysteem systeem.

Om deze functie te implementeren in uw app, moet u `webContents.startDrag(item)` API aanroepen in reactie op het `ondragstart` evenement.

In uw renderer proces kunt u de `ondragstart` gebeurtenis verwerken en de informatie doorsturen naar uw hoofdproces.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Vervolgens, in het hoofdproces, verhoog de gebeurtenis met een pad naar het bestand dat wordt gesleept en een pictogram.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icoon: '/path/to/icon.png'
  })
})
```
