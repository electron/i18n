# Nativní přetažení souborů & Zahodit

## Přehled

Certain kinds of applications that manipulate files might want to support the operating system's native file drag & drop feature. Přetažení souborů do webového obsahu je běžné a podporováno mnoha webovými stránkami. Electron navíc podporuje přetahování souborů a obsahu z webového obsahu do světa operačního systému.

Chcete-li implementovat tuto funkci ve vaší aplikaci, musíte zavolat [`webový obsah. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API v reakci na událost `ondragstart`.

## Ukázka

Začne fungující aplikací z [Rychlý startovací průvodce](quick-start.md), přidejte následující řádky do souboru `index.html`:

```html
<a href="#" id="drag">Přetáhněte mě</a>
<script src="renderer.js"></script>
```

a přidejte následující řádky do souboru `render.js`:

```js
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')
}
```

Výše uvedený kód dává Renderer pokyn k tomu, aby zvládl událost `ondragstart` a předal informace hlavnímu procesu.

V hlavním procesu(`hlavní. s` soubor), rozšíření přijaté události o cestu k souboru, který je přetažen a ikona:

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event filePath) => {
  event.sender.startDrag({
    soubor: filePath,
    icon: '/path/to/icon.png'
  })
})
```

Po spuštění Electron aplikace zkuste přetáhnout položku z BroswerWindow na vaši plochu. V této příručce je položka Markdown soubor umístěný v kořenovém adresáři projektu:

![Přetažení](../images/drag-and-drop.gif)
