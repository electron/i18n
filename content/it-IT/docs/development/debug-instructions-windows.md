# Debugging su Windows

Se si verificano arresti anomali o problemi in Electron che si ritiene non siano causati dall'applicazione JavaScript, ma invece da Electron stesso, il debug può essere un po 'complicato, specialmente per gli sviluppatori non utilizzati per il debug di nativi / C ++. Comunque, usando Visual Studio, GitHub è ospitato dal Server Electron Symbol, e il codice sorgente di Electron, puoi abilitare il debug passo dopo passo con i breakpoint interni al codice sorgente di Electron.

**Vedi anche**: C'è una ricchezza di informazioni sul debug di Chromium, gran parte delle quali si applica anche ad Electron, sul sito degli sviluppatori di Chromium: [Debug Chromium su Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## Requisiti

* **Una build di debug di Electron**: Il modo più semplice è di solito costruirlo da se, usando strumenti e prerequisiti elencati nelle [istruzioni di costruzione per Windows](build-instructions-windows.md). Mentre puoi allegare e fare il debug di Electron come puoi scaricarlo direttamente, potresti trovare che è pesantemente ottimizzato, rendendo il debug sostanzialmente più difficile: Il debugger non potrà mostrarti il contenuto di tutte le variabili ed il percorso di esecuzione può sembrare strano per la messa in linea, le chiamate di coda, ed altre ottimizzazioni del compilatore.

* **Visual Studio con Strumenti C++**: Le edizioni libere della comunità di Visual Studio 2013 e Visual Studio 2015 funzionano entrambe. Una volta installato, [configura Visual Studio per usare il server di GitHub Electron Symbol](setting-up-symbol-server.md). Abiliterà Visual Studio a guadagnare una migliore comprensione di ciò che succede dentro Electron, rendendo più facile presentare variabili in un formato umanamente leggibile.

* **ProcMon**: Lo [strumento gratuito SysInternals](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) ti consente di ispezionare i parametri di processo, le voci file e le operazioni di registro.

## Allegare a e Debug Electron

Per iniziare una sessione di debug, apri PowerShell/CMD ed esegui la tua build di debug di Electron, usando l'applicazione per aprirlo come parametro.

```powershell
$ ./out/Debug/electron.exe ~/my-electron-app/
```

### Setting Breakpoints

Then, open up Visual Studio. Electron is not built with Visual Studio and hence does not contain a project file - you can however open up the source code files "As File", meaning that Visual Studio will open them up by themselves. È ancora possibile impostare i punti di interruzione: Visual Studio rileva automaticamente che il codice sorgente corrisponde al codice in esecuzione nel processo allegato e si interrompe di conseguenza.

Relevant code files can be found in `./atom/`.

### Attaching

È possibile collegare il debugger di Visual Studio a un processo in esecuzione su un computer locale o remoto. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. È possibile utilizzare questa funzionalità per eseguire il debug di app in esecuzione su un computer locale o remoto, eseguire il debug di più processi contemporaneamente.

If Electron is running under a different user account, select the `Show processes from all users` check box. Si noti che, a seconda del numero di BrowserWindows aperti dall'app, verranno visualizzati più processi. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Dal momento che la lista fornisce solo i nomi, al momento non esiste un modo affidabile per capire quale sia.

### Which Process Should I Attach to?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Using ProcMon to Observe a Process

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.