# powerMonitor

> Surveille les changements d'état de puissance.

Processus : [Main](../glossary.md#main-process)

Vous ne pouvez pas inclure ou utiliser ce module avant que l'événement `ready` du module `app` soit émis.

Par exemple :

```javascript
const electron = require('electron')
const {app} = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('Le système va se mettre en veille')
  })
})
```

## Événements

Le module `powerMonitor` émet les événements suivants :

### Événement : 'suspend'

Émis lorsque le système est suspendu.

### Événement : 'resume'

Émis lorsque le système reprend.

### Événement : 'on-ac' *Windows*

Émis lorsque le système est branché sur prise.

### Événement : 'on-battery' *Windows*

Émis lorsque le système passe sur batterie.