# Notifiche (Windows, Linux, macOS)

I tre sistemi operativi menzionati nel titolo forniscono alle applicazioni gli strumenti per inviare notifiche agli utenti. Electron consente agli sviluppatori di inviare notifiche in maniera semplice impiegando l'[API Notifiche HTML5](https://notifications.spec.whatwg.org/), che sfrutta, per la visualizzazione, l'API notifiche nativa del sistema operativo in uso.

**Nota:** Essendo questa una API HTML5 è disponibile nel solo processo di rendering. Se vuoi visualizzare le notifiche per mezzo del processo principale controlla la documentazione del modulo [Notification](../api/notification.md).

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Pur potendo considerare il codice e l'esperienza utente sostanzialmente identiche nei tre sistemi operativi, permangono tuttavia alcune sottili differenze.

## Windows
* Su Windows 10, una scorciatoia alla tua app con un [ID Modello Applicazione Utente][app-user-model-id] deve essere installato al Menu Avvio. Questo può essere overkill durante lo sviluppo, quindi l'aggiunta `node_modules\electron\dist\electron.exe` al tuo menu Start fa anche il trucco. Navigare nel file in Explorer, fare clic con il tasto destro del mouse e 'Pin al menu di avvio'. Sarà quindi necessario aggiungere la riga `app.setAppUserModelId(process.execPath)` al processo principale per visualizzare le notifiche.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Nota, comunque, che non necessita di essere inserito nella schermata Start.
* Su Windows 7, le notifiche lavorano per un'implementazione personalizzata che riassembla visualmente quella nativa sui sistemi più nuovi.

Electron tenta di automatizzare il lavoro intorno all'ID del modello utente dell'applicazione. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Inoltre, Electron rileverà che Squirrel è stato usato e chiamerà automaticamente `app.setAppUserModelId()` con il valore corretto. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Inoltre, in Windows 8, la lunghezza massima per il corpo notifica è 250 caratteri, con il team di Windows raccomandante che le notifiche dovrebbero essere mantenute a 200 caratteri. Detto questo, tale limitazione è stata rimossa in Windows 10, con il team di Windows richiedente agli sviluppatori di essere ragionevoli. Provare ad inviare giganti quantità di testo all'API (migliaia di caratteri) potrebbe risultare in instabilità.

### Notifiche Avanzate

Le ultime versioni di Windows consentono le notifiche avanzate, con template personalizzati, immagini ed altri elementi flessibili. Per inviare queste notifiche (dal processo principale o da quello di rendering), usa il modulo userland [electron-windows-notifiche](https://github.com/felixrieseberg/electron-windows-notifications) che usa componenti aggiuntivi nativi di Node per inviare oggetti `ToastNotifiche` e `TileNotifiche`.

Mentre le notifiche inclusi i pulsanti funzionano con `electron-windows-notifications`, gestire le risposte richiede l'uso di [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), che aiuta a registrare i componenti COM richiesti e a chiamare la tua app Electron con i dati utente inseriti.

### Ore Silenziose / Modalità Presentazione

Per identificare se o se non si possono inviare notifiche, usa il modulo userland [electron-notifiche-stato](https://github.com/felixrieseberg/electron-notification-state).

Ciò ti permette di determinare se Windows eliminerà in silenzio le notifiche o meno.

## macOS

Le notifiche sono semplici su macOS, ma dovresti essere a conoscenza delle linee guida di [Interfaccia Umana di Apple per quanto riguarda le notifiche](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Nota che le notifiche sono limitate di taglia a 256 byte e saranno troncate se eccederai questo limite.

### Notifiche Avanzate

Le ultime versioni di macOS consentono le notifiche con un campo di input, permettendo all'utente di rispondere velocemente ad una notifica. Per mandare notifiche con un campo input, usa il modulo userland [node-mac-notificatore](https://github.com/CharlieHess/node-mac-notifier).

### Non disturbare / Stato Sessione

Per identificare se o se non si possono inviare notifiche, usa il modulo userland [electron-notifiche-stato](https://github.com/felixrieseberg/electron-notification-state).

Ti permetterà di individuare se la notifica sarà o meno mostrata.

## Linux

Le notifiche sono inviate usando `libnotify` che può mostrare notifiche su ogni ambiente desktop che segue la [Specifica Notifiche Desktop][notification-spec], inclusi Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
