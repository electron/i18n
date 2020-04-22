# Trascina & Rilascia File Nativo

Alcuni tipi di app che manipolano file potrebbero voler supportare la funzione trascina & rilascia del file nativo del sistema operativo. Rilasciare file nel contenuto web è comune e supportato da molti siti web. Electron supporta inoltre il rilascio di file e contenuti fuori dal contenuto web nel mondo del sistema operativo.

Per aggiungere questa funzione nella tua app, devi chiamare l'API `Contenutiweb.avviaTrascina(elemento)` in risposta all'evento `avviatrascinasu`.

Nel tuo processo di rendering, gestisci l'evento `avviatrascinasu` e inoltra l'informazione al tuo processo principale.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Poi, nel processo principale, puoi aumentare l'evento con un percorso al file trascinato ed all'icona.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
