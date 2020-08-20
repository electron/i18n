# Notifiche (Windows, Linux, macOS)

I tre sistemi operativi menzionati nel titolo forniscono alle applicazioni gli strumenti per inviare notifiche agli utenti. Electron consente agli sviluppatori di inviare notifiche in maniera semplice impiegando l'[API Notifiche HTML5](https://notifications.spec.whatwg.org/), che sfrutta, per la visualizzazione, l'API notifiche nativa del sistema operativo in uso.

**Nota:** Essendo questa una API HTML5 è disponibile nel solo processo di rendering. Se vuoi visualizzare le notifiche per mezzo del processo principale controlla la documentazione del modulo [Notification](../api/notification.md).

```javascript
const myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Pur potendo considerare il codice e l'esperienza utente sostanzialmente identiche nei tre sistemi operativi, permangono tuttavia alcune sottili differenze.

## Windows
* Su Windows 10, una scorciatoia alla tua app con un [ID Modello Applicazione Utente](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) deve essere installato al Menu Avvio. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navigate to the file in Explorer, right-click and 'Pin to Start Menu'. You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. Nota, comunque, che non necessita di essere inserito nella schermata Start.
* Su Windows 7, le notifiche lavorano per un'implementazione personalizzata che riassembla visualmente quella nativa sui sistemi più nuovi.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) yourself.

Inoltre, in Windows 8, la lunghezza massima per il corpo notifica è 250 caratteri, con il team di Windows raccomandante che le notifiche dovrebbero essere mantenute a 200 caratteri. Detto questo, tale limitazione è stata rimossa in Windows 10, con il team di Windows richiedente agli sviluppatori di essere ragionevoli. Provare ad inviare giganti quantità di testo all'API (migliaia di caratteri) potrebbe risultare in instabilità.

### Notifiche Avanzate

Le ultime versioni di Windows consentono le notifiche avanzate, con template personalizzati, immagini ed altri elementi flessibili. Per inviare queste notifiche (dal processo principale o da quello di rendering), usa il modulo userland [electron-windows-notifiche](https://github.com/felixrieseberg/electron-windows-notifications) che usa componenti aggiuntivi nativi di Node per inviare oggetti `ToastNotifiche` e `TileNotifiche`.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Ore Silenziose / Modalità Presentazione

Per identificare se o se non si possono inviare notifiche, usa il modulo userland [electron-notifiche-stato](https://github.com/felixrieseberg/electron-notification-state).

Ciò ti permette di determinare se Windows eliminerà in silenzio le notifiche o meno.

## macOS

Le notifiche sono dirette su macOS, ma dovresti considerare le [Linee Guida Interfaccia Apple Riguardanti Notifiche](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Nota che le notifiche sono limitate di taglia a 256 byte e saranno troncate se eccederai questo limite.

### Notifiche Avanzate

Le ultime versioni di macOS consentono le notifiche con un campo di input, permettendo all'utente di rispondere velocemente ad una notifica. Per mandare notifiche con un campo input, usa il modulo userland [node-mac-notificatore](https://github.com/CharlieHess/node-mac-notifier).

### Non disturbare / Stato Sessione

Per identificare se o se non si possono inviare notifiche, usa il modulo userland [electron-notifiche-stato](https://github.com/felixrieseberg/electron-notification-state).

Ti permetterà di individuare se la notifica sarà o meno mostrata.

## Linux

Le notifiche sono inviate usando `libnotify` che può mostrare notifiche su ogni ambiente desktop che segue la [Specifica Notifiche Desktop](https://developer.gnome.org/notification-spec/), inclusi Cinnamon, Enlightenment, Unity, GNOME, KDE.
