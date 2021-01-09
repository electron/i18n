# Nativní přetažení souborů & Zahodit

Certain kinds of applications that manipulate files might want to support the operating system's native file drag & drop feature. Přetažení souborů do webového obsahu je běžné a podporováno mnoha webovými stránkami. Electron navíc podporuje přetahování souborů a obsahu z webového obsahu do světa operačního systému.

Chcete-li implementovat tuto funkci ve vaší aplikaci, musíte zavolat `webContents.startDrag(item)` API v reakci na událost `ondragstart`.

Ve vašem procesu renderer můžete zpracovat událost `ondragstart` a předat informace vašemu hlavnímu procesu.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

V hlavním procesu pak událost rozšíří o cestu k souboru, který je přetažen a ikona.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event filePath) => {
  event.sender.startDrag({
    soubor: filePath,
    icon: '/path/to/icon.png'
  })
})
```
