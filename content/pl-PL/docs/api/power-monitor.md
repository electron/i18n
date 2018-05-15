# powerMonitor

> Monitoruje zmiany stanu zasilania.

Proces: [Main](../glossary.md#main-process)

Nie możesz użyć tego modułu, dopóki zdarzenie `ready` z modułu `app` nie zostanie wyemitowane.

Na przykład:

```javascript
const electron = require('electron') 
const {app} = electron

app.on('ready', () => {   
     electron.powerMonitor.on('suspend', () => {
             console.log('The system is going to sleep')   
     }) 
})
```

## Zdarzenia

Modułu `powerMonitor` emituje następujące zdarzenia:

### Zdarzenie: 'suspend'

Emitowane, gdy praca systemu jest zawieszana.

### Zdarzenie: 'resume'

Emitowane, gdy praca systemu jest wznawiana.

### Zdarzenie: 'ac' *Windows*

Emitowane, gdy system znajduje się na zasilaniu sieciowym.

### Zdarzenie: 'bateria' *Windows*

Emitowane, gdy system znajduje się na zasilaniu z baterii.

### Event: 'shutdown' *Linux* *macOS*

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.