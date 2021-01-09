# Fișier nativ Drag & Drop

Anumite tipuri de aplicaţii care manipulează fişierele ar putea dori să suporte caracteristica de fişier nativ al sistemului de operare drag & drop Dragging files into web content is common and supported by many websites. (Automatic Copy) Electron în plus suportă tragerea fișierelor și conținutul din conținutul web în lumea sistemului de operare .

Pentru a implementa această caracteristică în aplicație, trebuie să apelați la `webContents.startDrag(item)` API ca răspuns la evenimentul `ondragstart`.

În procesul de redare, gestionați evenimentul `ondragstart` și transmiteți informația către procesul dvs. principal.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Apoi, în procesul principal, completați evenimentul cu o cale către fișierul care este tras și o pictogramă.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    fișier: filePath,
    icon: '/path/to/icon.png'
  })
})
```
