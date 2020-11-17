# Aggiornamento delle applicazioni

Ci sono molti modi di aggiornare una app di Electron. La più facile ed ufficiale supportata si avvantaggia del framework incorporato [Squirrel](https://github.com/Squirrel) e del modulo [autoUpdater](../api/auto-updater.md) di Electron.

## Usando `aggiorna.electronjs.org`

Il team di Electron mantiene [update.electronjs.org][], un servizio web gratuito e open-source che le app Electron possono utilizzare per l'auto-aggiornamento. Il servizio è progettato per le applicazioni Electron che soddisfano i seguenti criteri:

- App eseguite su macOS o Windows
- App con repository di GitHub pubblica
- Build pubblicate a Rilasci GitHub
- Build sono firmate con codice

La via più facile di usare questo servizio è installando [aggiorna-electron-app][], un modulo Node.js preconfigurato da usare con aggiorna.electronjs.org.

Installa il modulo:

```sh
npm install update-electron-app
```

Invoca l'updater dal file di processo principale della tua app:

```js
richiedi('aggiorna-electron-app')()
```

Per impostazione predefinita, questo modulo controllerà gli aggiornamenti all'avvio dell'app, poi ogni dieci minuti. Quando trova un aggiornamento, questo sarà automaticamente scaricato in background. Al termine del download, viene visualizzata una finestra di dialogo che consente all'utente di riavviare l'app.

Se hai bisogno di personalizzare la configurazione, puoi [passare le opzioni a `update-electron-app`][update-electron-app] o [utilizzare direttamente il servizio di aggiornamento][update.electronjs.org].

## Implementare un Server Aggiornamento

Se stai sviluppando un'applicazione privata di Electron o se non stai pubblicando rilasci su GitHub Releases, potrebbe essere necessario eseguire il proprio server di aggiornamento.

In base alle tue necessità, puoi scegliere da una di queste:

- [Hazel][hazel] - Aggiorna server per app a fonte libera o private che possono essere implementate gratuitamente su [Now][now]. Esso recupera da [GitHub Rilasci][gh-releases] ed utilizza la forza di GitHub CDN.
- [Nuts][nuts] - Usa anche [GitHub Rilasci][gh-releases] ma aggiorna la cache dell'app su disco e supporta depositi privati.
- [electron-rilascio-server][electron-release-server] - Fornisce una dashboard per i rilasci manuali e non richiede rilasci originati su GitHub.
- [Nucleus][nucleus] - Un server di aggiornamento completo per le app Electron mantenute da Atlassian. Supporta molte app e canali; usa un archivio di file statici per minimizzare i costi del server.

## Implementando gli Aggiornamenti nella Tua App

Una volta depositato il tuo server di aggiornamento, continua ad importare i moduli richiesti nel tuo codice. Il codice seguente potrevve variare per differenti server di softwarw, ma funziona come descritto usando [Hazel](https://github.com/zeit/hazel).

**Importante:** Assicurati che il codice sotto sia eseguito solo nella tua app impacchettata e non in sviluppo. Puoi usare [electron-è-dev](https://github.com/sindresorhus/electron-is-dev) per controllare l'ambiente.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Poi, costruisci l'URL del server si aggiornamento e dillo all'[autoUpdater](../api/auto-updater.md):

```javascript
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

Come passo finale, controllare gli aggiornamenti. L'esempio sottostante controllerà ogni minuto:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Una volta [impacchettata](../tutorial/application-distribution.md) la tua app, riceverà un aggiornamento ogni pubblicazione di un nuovo[Rilascio GitHub](https://help.github.com/articles/creating-releases/).

## Applicando Aggiornamenti

Ora che hai configurato il meccanismo di base di aggiornamento per la tua app, devi assicurarti che l'utente sia notificato quando c'è un aggiornamento. Questo è fatto usando gli [eventi](../api/auto-updater.md#events) della API dell'autoUpdater:

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? rilascioNote : rilascioNome,
    dettaglio: 'Una nuova versione è stata scaricata. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

Assicurati anche che gli errori siano [gestiti](../api/auto-updater.md#event-error). Ecco un esempio per registrarli a `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('C'è stato un problema nell'aggiornamento dell'app')
  console.error(messaggio)
})
```

## Handing Updates Manualmente

Poiché le richieste fatte da Auto Update non sono sotto il controllo diretto, potresti trovare situazioni difficili da gestire (come se il server di aggiornamento è dietro l'autenticazione). Il campo `url` supporta i file, il che significa che con qualche sforzo, puoi eludere l'aspetto della comunicazione del server del processo. [Ecco un esempio di come questo potrebbe funzionare](https://github.com/electron/electron/issues/5020#issuecomment-477636990).

[now]: https://zeit.co/now
[hazel]: https://github.com/zeit/hazel
[nuts]: https://github.com/GitbookIO/nuts
[gh-releases]: https://help.github.com/articles/creating-releases/
[electron-release-server]: https://github.com/ArekSredzki/electron-release-server
[nucleus]: https://github.com/atlassian/nucleus
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[aggiorna-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
