# Aggiornamento delle applicazioni

Ci sono molti modi di aggiornare una app di Electron. La più facile ed ufficiale supportata si avvantaggia del framework incorporato [Squirrel](https://github.com/Squirrel) e del modulo [autoUpdater](../api/auto-updater.md) di Electron.

## Usando `aggiorna.electronjs.org`

Il team di GitHub di Electron mantiene aggiorna.electronjs.org, un servizio web gratuito e libero che le app di Electron possono usare per auto aggiornarsi. Il servizio è designato per le app di Electron che incontrano i seguenti criteri:</p> 

- App eseguite su macOS o Windows
- App con repository di GitHub pubblica
- Build pubblicate a Rilasci GitHub
- Build sono firmate con codice

La via più facile di usare questo servizio è installando [aggiorna-electron-app](https://github.com/electron/update-electron-app), un modulo Node.js preconfigurato da usare con aggiorna.electronjs.org.

Installa il modulo:

```sh
npm install update-electron-app
```

Invoca l'updater dal file di processo principale della tua app:

```js
richiedi('aggiorna-electron-app')()
```

Di default, questo modulo controllerà per aggiornamenti alla startup dell'app, poi ogni dieci minuti. Quando trova un aggiornamento, questo sarà automaticamente scaricato in background. Quando il download è completo, un dialogo è mostrato per consentire all'utente di riavviare l'app.

Se hai bisogno di personalizzare la tua configurazione puoi [passare opzioni a `aggiorna-electron-app`](https://github.com/electron/update-electron-app) o [usare direttamente il servizio aggiornamento](https://github.com/electron/update.electronjs.org).

## Usando `electron-costruttore`

Se la tua app è impacchettata con [`electron-costruttore`](https://github.com/electron-userland/electron-builder) puoi usare il modulo [electron-updater](https://www.electron.build/auto-update), che non richiede un server e consente aggiornamenti da S3, GitHub o qualsiasi altro host di file statico. Questo meccanismo di aggiornamento incorporato di Electron è evitato, il resto di questa documentazione non si applicherà all'updater di `electron-costruttore`.

## Implementare un Server Aggiornamento

Se stai sviluppando un'app Electron privata o se non pubblichi rilasci a GitHub Rilasci, potrebbe essere necessario eseguire il tuo proprio server di aggiornamento.

In base alle tue necessità, puoi scegliere da una di queste:

- [Hazel](https://github.com/zeit/hazel) - Aggiorna server per app a fonte libera o private che possono essere implementate gratuitamente su [Now](https://zeit.co/now). Esso recupera da [GitHub Rilasci](https://help.github.com/articles/creating-releases/) ed utilizza la forza di GitHub CDN.
- [Nuts](https://github.com/GitbookIO/nuts) - Usa anche [GitHub Rilasci](https://help.github.com/articles/creating-releases/) ma aggiorna la cache dell'app su disco e supporta depositi privati.
- [electron-rilascio-server](https://github.com/ArekSredzki/electron-release-server) - Fornisce una dashboard per i rilasci manuali e non richiede rilasci originati su GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) - Un server di aggiornamento completo per le app Electron mantenute da Atlassian. Supporta molte app e canali; usa un archivio di file statici per minimizzare i costi del server.

## Implementare Aggiornamenti nella Tua App

Una volta depositato il tuo server di aggiornamento, continua ad importare i moduli richiesti nel tuo codice. Il codice seguente potrevve variare per differenti server di softwarw, ma funziona come descritto usando [Hazel](https://github.com/zeit/hazel).

**Importante:** Assicurati che il codice sotto sia eseguito solo nella tua app impacchettata e non in sviluppo. Puoi usare [electron-è-dev](https://github.com/sindresorhus/electron-is-dev) per controllare l'ambiente.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Poi, costruisci l'URL del server si aggiornamento e dillo all'[autoUpdater](../api/auto-updater.md):

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

Come passo finale controlla per aggiornamenti. L'esempio sotto controllerà ogni minuto:

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
    dettaglio: 'Una nuova versione è stata scaricata. Riavvia l'app per applicare gli aggiornamenti.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

Assicurati anche che gli errori [siano controllati](../api/auto-updater.md#event-error). Qui un esempio per la loro registrazione a `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('C'è stato un problema nell'aggiornamento dell'app')
  console.error(messaggio)
})
```