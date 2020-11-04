# Notifiche (Windows, Linux, macOS)

## Overview

Tutti e tre i sistemi operativi consentono alle applicazioni di inviare notifiche all'utente. La tecnica di visualizzazione delle notifiche è diversa per i processi Main e Renderer.

Per il processo Renderer, Electron consente comodamente agli sviluppatori di inviare notifiche con l'API di notifica [HTML5](https://notifications.spec.whatwg.org/), usando le API di notifica nativa del sistema operativo attualmente in esecuzione per visualizzarla.

Per mostrare le notifiche nel processo principale, è necessario utilizzare il modulo [Notification](../api/notification.md).

## Esempio

### Mostra le notifiche nel processo Renderer

Supponendo di avere un'applicazione Electron funzionante dalla [Guida rapida di avvio](quick-start.md), aggiungi la seguente riga all'indice `. file tml` prima della chiusura `</body>` tag:

```html
<script src="renderer.js"></script>
```

and add the `renderer.js` file:

```js
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Dopo aver lanciato l'applicazione Electron, dovresti vedere la notifica:

![Notifica nel processo Renderer](../images/notification-renderer.png)

Se si apre la console e quindi fare clic sulla notifica, vedrai il messaggio che è stato generato dopo aver attivato l'evento `onclick`:

![Messaggio Onclick per la notifica](../images/message-notification-renderer.png)

### Mostra le notifiche nel processo principale

Iniziando con un'applicazione funzionante dalla [Guida rapida](quick-start.md), aggiorna il file `main.js` con le seguenti righe:

```js
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

Dopo aver lanciato l'applicazione Electron, dovresti vedere la notifica:

![Notifica nel processo principale](../images/notification-main.png)

## Informazioni supplementari

Pur potendo considerare il codice e l'esperienza utente sostanzialmente identiche nei tre sistemi operativi, permangono tuttavia alcune sottili differenze.

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu. Questo può essere overkill durante lo sviluppo, quindi l'aggiunta di `node_modules\electron\dist\electron.exe` al tuo menu Start fa anche il trucco. Navigare nel file in Explorer, fare clic con il tasto destro del mouse e 'Pin al menu di avvio'. Dovrai quindi aggiungere la riga `app.setAppUserModelId(process.execPath)` a il tuo processo principale per vedere le notifiche.
* Su Windows 8. e Windows 8, una scorciatoia alla tua app con un [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) deve essere installata nella schermata Start. Nota, comunque, che non necessita di essere inserito nella schermata Start.
* Su Windows 7, le notifiche lavorano per un'implementazione personalizzata che riassembla visualmente quella nativa sui sistemi più nuovi.

Electron tenta di automatizzare il lavoro intorno all'ID del modello utente dell'applicazione. Quando Electron viene utilizzato insieme all'installazione e all'aggiornamento del framework Squirrel, le scorciatoie [verranno automaticamente impostate correttamente](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Inoltre, Electron rileverà che Squirrel è stato usato e chiamerà automaticamente `app.setAppUserModelId()` con il valore corretto. Durante lo sviluppo, potresti avere per chiamare [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) te stesso.

Inoltre, in Windows 8, la lunghezza massima per il corpo notifica è 250 caratteri, con il team di Windows raccomandante che le notifiche dovrebbero essere mantenute a 200 caratteri. Detto questo, tale limitazione è stata rimossa in Windows 10, con il team di Windows richiedente agli sviluppatori di essere ragionevoli. Provare ad inviare giganti quantità di testo all'API (migliaia di caratteri) potrebbe risultare in instabilità.

#### Notifiche Avanzate

Le ultime versioni di Windows consentono le notifiche avanzate, con template personalizzati, immagini ed altri elementi flessibili. Per inviare queste notifiche (dal processo principale o da quello di rendering), usa il modulo userland [electron-windows-notifiche](https://github.com/felixrieseberg/electron-windows-notifications) che usa componenti aggiuntivi nativi di Node per inviare oggetti `ToastNotifiche` e `TileNotifiche`.

Mentre le notifiche inclusi i pulsanti funzionano con `electron-windows-notifications`, gestire le risposte richiede l'uso di [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), che aiuta a registrare i componenti COM richiesti e a chiamare l'app Electron con i dati utente inseriti.

#### Ore Silenziose / Modalità Presentazione

Per rilevare se hai il permesso o meno di inviare una notifica, usa il modulo userland [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Questo consente di determinare in anticipo se Windows sarà silenziosamente buttare via la notifica.

### macOS

Le notifiche sono dirette su macOS, ma dovresti considerare le [Linee Guida Interfaccia Apple Riguardanti Notifiche](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Nota che le notifiche sono limitate di taglia a 256 byte e saranno troncate se eccederai questo limite.

#### Notifiche Avanzate

Le ultime versioni di macOS consentono le notifiche con un campo di input, permettendo all'utente di rispondere velocemente ad una notifica. Per mandare notifiche con un campo input, usa il modulo userland [node-mac-notificatore](https://github.com/CharlieHess/node-mac-notifier).

#### Non disturbare / Stato Sessione

Per identificare se o se non si possono inviare notifiche, usa il modulo userland [electron-notifiche-stato](https://github.com/felixrieseberg/electron-notification-state).

Ti permetterà di individuare se la notifica sarà o meno mostrata.

### Linux

Le notifiche sono inviate usando `libnotify` che può mostrare notifiche su ogni ambiente desktop che segue la [Specifica Notifiche Desktop](https://developer.gnome.org/notification-spec/), inclusi Cinnamon, Enlightenment, Unity, GNOME, KDE.
