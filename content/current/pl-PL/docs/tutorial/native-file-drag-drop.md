# Natywne przeciąganie i upuszczanie plików

## Przegląd

Niektóre rodzaje aplikacji, które manipulują plikami mogą chcieć obsługiwać natywnych plików systemu operacyjnego przeciągnij & funkcję upuszczania. Przeciąganie plików do zawartości stron internetowych jest powszechne i obsługiwane przez wiele stron. Electron dodatkowo obsługuje przeciąganie plików i treści z treści internetowych do świata systemu operacyjnego.

Aby zaimplementować tę funkcję w aplikacji, musisz wywołać [`webContents. tartDrag(item)`](../api/web-contents.md#contentsstartdragitem) API w odpowiedzi na zdarzenie `ondragstart`.

## Przykład

Zaczynając od działającej aplikacji z [Szybki Start Guide](quick-start.md), dodaj następujące linie do pliku `index.html`:

```html
<a href="#" id="drag">Przeciągnij mnie</a>
<script src="renderer.js"></script>
```

i dodaj następujące linie do pliku `renderer.js`:

```js
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/absolute/path/to/the/item')
}
```

Powyższy kod instruuje proces Renderer do obsługi zdarzenia `ondragstart` i przekazania informacji do głównego procesu.

W głównym procesie (`głównie. s` plik), rozwiń odebrane zdarzenie ze ścieżką do pliku, który jest ciągnięty i ikona:

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```

Po uruchomieniu aplikacji Electron spróbuj przeciągnąć i upuścić element z BroswerWindow na swój komputer. W tym przewodniku element jest plikiem Markdown znajdującym się w katalogu głównym projektu:

![Przeciągnij i upuść](../images/drag-and-drop.gif)
