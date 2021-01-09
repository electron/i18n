# Natywne przeciąganie i upuszczanie plików

Niektóre rodzaje aplikacji, które manipulują plikami mogą chcieć obsługiwać natywnych plików systemu operacyjnego przeciągnij & funkcję upuszczania. Przeciąganie plików do zawartości stron internetowych jest powszechne i obsługiwane przez wiele stron. Electron dodatkowo obsługuje przeciąganie plików i treści z treści internetowych do świata systemu operacyjnego.

Aby zaimplementować tę funkcję w aplikacji, musisz wywołać `webContents.startDrag(item)` API w odpowiedzi na zdarzenie `ondragstart`.

W procesie renderowania zajmij zdarzenie `ondragstart` i przekaż informacje do głównego procesu.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Następnie, w głównym procesie, zwiększa wydarzenie ścieżką do pliku, który jest ciągnięty i ikonę.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
