# autoUpdater

> Abilita le app ad aggiornarsi automaticamente.

Processo: [Main](../glossary.md#main-process)

Il modulo `autoAggiornatore` fornisce un'un'interfaccia per il framework [Squirrel](https://github.com/Squirrel).

Puoi brevemente lanciare un rilascio su più piattaforme del server per distribuire la tua app usando uno dei seguenti progetti:

* [nut](https://github.com/GitbookIO/nuts): *Un software release intelligente per le tue app, usando GitHub come sfondo. Auto-aggiornamenti con Squirrel (Mac & Windows)*
* [electron-rilascio-server](https://github.com/ArekSredzki/electron-release-server): *Un totalmente accessoriato auto-ospitato rilascio server per le app electron, compatibile con l'auto-aggiornatore*
* [squirrel-aggiornamenti-server](https://github.com/Aluxian/squirrel-updates-server): *Un semplice server node.js per Squirrel.Mac e Squirrel.Windows che usa i rilasci GitHub*
* [squirrel-rilascio-server](https://github.com/Arcath/squirrel-release-server): *Una semplice applicazione PHP per Squirrel.Windows che legge gli aggiornamenti da una cartella. Supporta aggiornamenti delta.*

## Avvisi di piattaforma

`autoAggiornatore` fornisce una API uniforme per varie piattaforme, ci sono alcune differenze sottili su ogni piattaforma.

### macOS

Su macOS, il modulo `autoAggiornatore` costruito su [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), non è necessario nessun avvio speciale per farlo lavorare. Per requisiti lato-server puoi leggere il [Supporto Server](https://github.com/Squirrel/Squirrel.Mac#server-support). Nota che l'[App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) acconsente a tutti i requisiti fatti come parte del processo di aggiornamento. App che necessitano di disabilitare ATS possono aggiungere la chiave `NSPermettiCaricamentiArbitrari` alla loro plist dell'app.

**Nota:** La tua app deve essere firmata per gli aggiornamenti automatici su MacOS. Questo è un requisiti di `Squirrel.Mac`.

### Windows

Su Windows si deve installare la propria app in una macchina utente prima di poter usare l'`autoAggiornatore</o>, quindi si raccomanda di usare <a href="https://github.com/electron/windows-installer">electron-winstaller</a>, <a href="https://github.com/electron-userland/electron-forge">electron-forge</a> o <a href="https://github.com/electron/grunt-electron-installer">grunt-electron-installatore</a> pacchetti per generare un installatore Windows.</p>

<p>Quando si usa <a href="https://github.com/electron/windows-installer">electron-winstaller</a> o <a href="https://github.com/electron-userland/electron-forge">electron-forge</a> assicurarsi di non provare ad aggiornare la propria app <a href="https://github.com/electron/windows-installer#handling-squirrel-events">alla prima esecuzione</a> (Vedi anche <a href="https://github.com/electron/electron/issues/7155">questo problema per altre informazioni</a>). È anche raccomandato usare <a href="https://github.com/mongodb-js/electron-squirrel-startup">electron-squirrel-avvio</a> per ottenere scorciatoie del desktop per la tua app.</p>

<p>L'installatore generato con Squirrel creerà un'icona scorciatoia con un <a href="https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx">ID Modello Applicazione Utente</a> nel formato di<code>com.squirrel.PACCHETTO_ID.TUO_EXE_SENZA_DOT_EXE` esempi sono `com.squirrel.allenta.Allenta` e `com.squirrel.codice.Codice`. Devi usare lo stesso ID per la tua app con la API `app.impostaModelloIdAppUtente`, altrimenti Windows non potrà pinnare la tua app propriamente nella task bar.

Diversamente da Squirrel.Mac, Windows può ospitare aggiornamenti si S3 o alcuni altri file ospiti statici. Puoi leggere i documenti do [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) per ottenere ulteriori dettagli su come lavora Squirrel.Windows.

### Linux

Non esiste un supporto incorporato per l'auto-Aggiornatore, si raccomanda l'uso del pacchetto gestionale di distribuzione all'aggiornamento della propria app.

## Eventi

L'oggetto `autoAggiornatore` emette i seguenti eventi:

### Evento: 'errore'

Restituisce:

* `errore` Errore

Emesso quando avviene un errore in aggiornamento.

### Evento: 'controllando_per_aggiornamenti'

Emesso quando controlla se si è avviato un aggiornamento.

### Evemto: 'aggiornamento-disponibile'

Emesso quando c'è un aggiornamento disponibile. L'aggiornamento è automaticamente scaricato.

### Evento: 'aggiornamento-non-disponibile'

Emesso quando non ci sono aggiornamenti disponibili.

### Evento: 'aggiornamento-scaricato'

Restituisce:

* `event` Evento
* `NoteRilascio` Stringa
* `Nomerilascio` Stringa
* `Datarilascio` Data
* `aggiornaURL` Stringa

Emesso quando un aggiornamento è stato scaricato.

Solo su Windows `rilascioNome` è disponibile.

## Metodi

L'oggetto `autoAggiornatore` ha i seguenti metodi:

### `autoAggiornatore.impostaFeedURL(url[, richiediTestate])`

* `url` Stringa
* `richiestaTestate` Oggetto *macOS* (opzionale) - HTTP richiesta testate.

Imposta l'`url` e inizializza l'auto aggiornatore.

### `autoAggiornatore.ottieniFeedURL()`

Restituisci `Stringa` 'L'attuale feed URL di aggiornamento.

### `autoAggiornatore.controllaPerAggiornamenti()`

Chiedi il server se c'è un aggiornamento. Devi chiamare `impostaFeedURL` prima di usare questa API.

### `autoaAggiornatore.esciEInstalla()`

Riavvia l'app ed installa l'aggiornamento dopo che è stato scaricato. Potrebbe solo essere chiamato dopo l'emissione di `aggiornamento-scaricato.</p>

<p><strong>Nota:</strong> <code>autoAggiornatore.esciEInstalla()` chiuderà tutte le finestre dell'app prima ed emetterà l'evento `prima-esci` dell'`app` dopo questo. Questo è diverso dalla normale sequenza di eventi di uscita.