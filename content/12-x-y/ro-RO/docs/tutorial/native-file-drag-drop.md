# Fișier nativ Drag & Drop

## Overview

Anumite tipuri de aplicaţii care manipulează fişierele ar putea dori să suporte caracteristica de fişier nativ al sistemului de operare drag & drop Dragging files into web content is common and supported by many websites. (Automatic Copy) Electron în plus suportă tragerea fișierelor și conținutul din conținutul web în lumea sistemului de operare .

Pentru a implementa această caracteristică în aplicație, trebuie să apelați la [`webContents. tartDrag(articol)`](../api/web-contents.md#contentsstartdragitem) API ca răspuns la evenimentul `ondragstart`.

## Exemplu

Începând cu o aplicație de lucru din [Ghidul de pornire rapidă](quick-start.md), adaugă următoarele linii în fișierul `index.html`:

```html
<a href="#" id="drag">Trage</a>
<script src="renderer.js"></script>
```

și adaugă următoarele linii la fișierul `renderer.js`:

```js
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/the/item')

```

Codul de mai sus instruiește procesul de redare să se ocupe de evenimentul `ondragstart` și transmite informația către procesul principal.

În procesul principal (`principal. s` fișier), extindeți evenimentul cu o cale către fișierul care este glisat și o pictogramă:

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    fișier: filePath,
    icon: '/path/to/icon.png'
  })
})
```

După lansarea aplicației Electron, încercați să glisați și să plasați articolul din Fereastra Broswerdow pe desktopul dvs. În acest ghid, elementul este un fișier Markdown situat în rădăcina proiectului:

![Trageți și fixați](../images/drag-and-drop.gif)
