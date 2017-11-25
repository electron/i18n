# powerMonitor

> Monitoruje zmiany stanu zasilania.

Proces: [Main](../glossary.md#main-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

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

Emitted when the system is suspending.

### Zdarzenie: 'resume'

Emitowane, gdy praca systemu jest wznawiana.

### Zdarzenie: 'ac' *Windows*

Emitowane, gdy system znajduje się na zasilaniu sieciowym.

### Zdarzenie: 'bateria' *Windows*

Emitowane, gdy system znajduje się na zasilaniu z baterii.