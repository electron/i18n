# autoUpdater

> Abilita le app ad aggiornarsi automaticamente.

Processo: [Main](../glossary.md#main-process)

**Puoi trovare una guida dettagliata su come impementare gli aggiornamenti nella tua applicazione [qui](../tutorial/updates.md).**

## Avvisi Piattaforma

Attualmente, solo macOS e Windows sono supportati. Non c'è un supporto incorporato per l'aggiornamento automatico su Linux, quindi si raccomanda di usare il pacchetto di distribuzione gestionale per aggiornare la tua app.

In aggiunta, ci sono alcune sottili differenze su ogni piattaforma:

### macOS

Su macOS, il modulo `autoAggiornatore` costruito su [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), non è necessario nessun avvio speciale per farlo lavorare. Per requisiti lato-server puoi leggere il [Supporto Server](https://github.com/Squirrel/Squirrel.Mac#server-support). Nota che l'[App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) acconsente a tutti i requisiti fatti come parte del processo di aggiornamento. App che necessitano di disabilitare ATS possono aggiungere la chiave `NSPermettiCaricamentiArbitrari` alla loro plist dell'app.

**Nota:** La tua app deve essere firmata per gli aggiornamenti automatici su MacOS. Questo è un requisiti di `Squirrel.Mac`.

### Windows

Su Windows si deve installare la propria app in una macchina utente prima di poter usare l'`autoAggiornatore</o>, quindi si raccomanda di usare <a href="https://github.com/electron/windows-installer">electron-winstaller</a>, <a href="https://github.com/electron-userland/electron-forge">electron-forge</a> o <a href="https://github.com/electron/grunt-electron-installer">grunt-electron-installatore</a> pacchetti per generare un installatore Windows.</p>

<p>Quando si usa <a href="https://github.com/electron/windows-installer">electron-winstaller</a> o <a href="https://github.com/electron-userland/electron-forge">electron-forge</a> assicurarsi di non provare ad aggiornare la propria app <a href="https://github.com/electron/windows-installer#handling-squirrel-events">alla prima esecuzione</a> (Vedi anche <a href="https://github.com/electron/electron/issues/7155">questo problema per altre informazioni</a>). È anche raccomandato usare <a href="https://github.com/mongodb-js/electron-squirrel-startup">electron-squirrel-avvio</a> per ottenere scorciatoie del desktop per la tua app.</p>

<p>L'installatore generato con Squirrel creerà un'icona scorciatoia con un <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx">ID Modello Applicazione Utente</a> nel formato di<code>com.squirrel.PACCHETTO_ID.TUO_EXE_SENZA_DOT_EXE` esempi sono `com.squirrel.allenta.Allenta` e `com.squirrel.codice.Codice`. Devi usare lo stesso ID per la tua app con la API `app.impostaModelloIdAppUtente`, altrimenti Windows non potrà pinnare la tua app propriamente nella task bar.

Diversamente da Squirrel.Mac, Windows può ospitare aggiornamenti si S3 o alcuni altri file ospiti statici. Puoi leggere i documenti do [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) per ottenere ulteriori dettagli su come lavora Squirrel.Windows.

## Eventi

L'oggetto `autoAggiornatore` emette i seguenti eventi:

### Evento: 'errore'

Restituisce:

* `error` Error

Emesso quando avviene un errore in aggiornamento.

### Evento: 'controllando_per_aggiornamenti'

Emesso quando controlla se si è avviato un aggiornamento.

### Evemto: 'aggiornamento-disponibile'

Emesso quando c'è un aggiornamento disponibile. L'aggiornamento è automaticamente scaricato.

### Evento: 'aggiornamento-non-disponibile'

Emesso quando non ci sono aggiornamenti disponibili.

### Evento: 'aggiornamento-scaricato'

Restituisce:

* `event` Event
* `NoteRilascio` Stringa
* `Nomerilascio` Stringa
* `Datarilascio` Data
* `aggiornaURL` Stringa

Emesso quando un aggiornamento è stato scaricato.

Solo su Windows `rilascioNome` è disponibile.

## Metodi

L'oggetto `autoAggiornatore` ha i seguenti metodi:

### `autoUpdater.setFeedURL(options)`

* `opzioni` Oggetto 
  * `url` Stringa
  * `headers` Object (optional) *macOS* - HTTP request headers.
  * `serverType` String (optional) *macOS* - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

Imposta l'`url` e inizializza l'auto aggiornatore.

### `autoAggiornatore.ottieniFeedURL()`

Restituisci `Stringa` 'L'attuale feed URL di aggiornamento.

### `autoAggiornatore.controllaPerAggiornamenti()`

Chiedi il server se c'è un aggiornamento. Devi chiamare `impostaFeedURL` prima di usare questa API.

### `autoaAggiornatore.esciEInstalla()`

Riavvia l'app ed installa l'aggiornamento dopo che è stato scaricato. Potrebbe solo essere chiamato dopo l'emissione di `aggiornamento-scaricato.</p>

<p>Under the hood calling <code>autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** If the application is quit without calling this API after the `update-downloaded` event has been emitted, the application will still be replaced by the updated one on the next run.