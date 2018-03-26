# Monitorapotenza

> Monitora cambiamenti stato potenza.

Processo: [Main](../glossary.md#main-process)

Non puoi richiedere o usare questo modulo finchè l'evento `pronto` del modulo `app` non è emesso.

Ad esempio:

```javascript
const electron = richiede('electron')
const {app} = electron

app.on('ready', () => {
  electron.Monitorapotenz.on('sospendi', () => {
    console.log('Il sistema sta andando a dormire')
  })
})
```

## Eventi

The `powerMonitor` module emits the following events:

### Event: 'suspend'

Emitted when the system is suspending.

### Event: 'resume'

Emitted when system is resuming.

### Event: 'on-ac' *Windows*

Emitted when the system changes to AC power.

### Event: 'on-battery' *Windows*

Emitted when system changes to battery power.