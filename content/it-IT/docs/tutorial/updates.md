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
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

## Implementing Updates in Your App

Once you've deployed your update server, continue with importing the required modules in your code. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

Next, construct the URL of the update server and tell [autoUpdater](../api/auto-updater.md) about it:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

As the final step, check for updates. The example below will check every minute:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Applying Updates

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. This can be achieved using the autoUpdater API [events](../api/auto-updater.md#events):

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```