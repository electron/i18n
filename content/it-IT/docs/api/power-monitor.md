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

Il modulo `Monitorapotenza` emette i seguenti eventi:

### Evento: 'sospendi'

Emesso quando il sistema è in sospensione.

### Evento: "riprendi'

Emesso quando il sistema sta ripartendo.

### Evento: 'on-ac' *Windows*

Emesso quando il sistema cambia potenza AC.

### Evento: 'su-batteria' *Windows*

Emesso quando il sistema cambia a potenza batteria.