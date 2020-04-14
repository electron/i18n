# Debugging su Windows

Se si verificano arresti anomali o problemi in Electron che si ritiene non siano causati dall'applicazione JavaScript, ma invece da Electron stesso, il debug può essere un po 'complicato, specialmente per gli sviluppatori non utilizzati per il debug di nativi / C ++. Comunque, usando Visual Studio, GitHub è ospitato dal Server Electron Symbol, e il codice sorgente di Electron, puoi abilitare il debug passo dopo passo con i breakpoint interni al codice sorgente di Electron.

**See also**: There's a wealth of information on debugging Chromium, much of which also applies to Electron, on the Chromium developers site: [Debugging Chromium on Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## Requisiti

* **A debug build of Electron**: The easiest way is usually building it yourself, using the tools and prerequisites listed in the [build instructions for Windows](build-instructions-windows.md). Mentre puoi allegare e fare il debug di Electron come puoi scaricarlo direttamente, potresti trovare che è pesantemente ottimizzato, rendendo il debug sostanzialmente più difficile: Il debugger non potrà mostrarti il contenuto di tutte le variabili ed il percorso di esecuzione può sembrare strano per la messa in linea, le chiamate di coda, ed altre ottimizzazioni del compilatore.

* **Visual Studio with C++ Tools**: The free community editions of Visual Studio 2013 and Visual Studio 2015 both work. Una volta installato, [configura Visual Studio per usare il server di GitHub Electron Symbol](setting-up-symbol-server.md). Abiliterà Visual Studio a guadagnare una migliore comprensione di ciò che succede dentro Electron, rendendo più facile presentare variabili in un formato umanamente leggibile.

* **ProcMon**: The [free SysInternals tool](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) allows you to inspect a processes parameters, file handles, and registry operations.

## Allegare a e Debug Electron

Per iniziare una sessione di debug, apri PowerShell/CMD ed esegui la tua build di debug di Electron, usando l'applicazione per aprirlo come parametro.

```powershell
$ ./out/Testing/electron.exe ~/my-electron-app/
```

### Impostare Breakpoint

Poi, apri Visual Studio. Electron non è costruito con Visual Studio e non contiene un file di progetto - puoi comunque aprire il file di codice sorgente "Come File", il che vuol dire che Visual Studio li aprirà da loro stessi. È ancora possibile impostare i punti di interruzione: Visual Studio rileva automaticamente che il codice sorgente corrisponde al codice in esecuzione nel processo allegato e si interrompe di conseguenza.

Relevant code files can be found in `./shell/`.

### Allegare

È possibile collegare il debugger di Visual Studio a un processo in esecuzione su un computer locale o remoto. Dopo che il processo è in esecuzione, clicca Debug / Allega a Processo (o premi `CTRL+ALT+P`) per aprire la casella di dialogo "Allega a Processo". È possibile utilizzare questa funzionalità per eseguire il debug di app in esecuzione su un computer locale o remoto, eseguire il debug di più processi contemporaneamente.

Se Electron è in esecuzione sotto un diverso profilo utente, seleziona la casella di spunta `Mostra processi da tutti gli utenti`. Si noti che, a seconda del numero di BrowserWindows aperti dall'app, verranno visualizzati più processi. Un'app tipica ad una finestra risulterà in Visual Studio, presentandoti con due voci `Electron.exe` - una per il processo principale ed una per il processo di render. Dal momento che la lista fornisce solo i nomi, al momento non esiste un modo affidabile per capire quale sia.

### A Quale Processo Dovrei Allegarlo?

Il codice eseguito entro il processo principale (che è, trovato nel codice o in un file JavaScript principale eventualmente eseguito) così come il codice richiamato usando il remoto (`require('electron').remote`) sarà eseguito all'interno del processo principale, mentre altro codice sarà eseguito all'interno dei suoi processi di render rispettivi.

Puoi essere allegato a programmi multipli quando stai facendo il debug, ma solo un programma è attivo nel debugger in ogni momento. Puoi impostare il programma attivo nella barra degli strumenti `Posizione di Debug` o nella `finestra Processi`.

## Usare ProcMon per Osservare un Processo

Mentre Visual Studio è fantastico per ispezionare percorsi di codice specifici, la forza di ProcMon è realmente nell'osservare tutto ciò che le tue applicazioni stanno facendo con il sistema operativo - cattura File, Registri, Rete, Processi e dettagli di Profilazione dei processi. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

Per un'introduzione alle basi di ProcMon ed alle sue funzionalità di debug, vai a vedere [questo video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) fornito da Microsoft.
