# Debugging on Windows

Se si verificano arresti anomali o problemi in Electron che si ritiene non siano causati dall'applicazione JavaScript, ma invece da Electron stesso, il debug può essere un po 'complicato, specialmente per gli sviluppatori non utilizzati per il debug di nativi / C ++. Tuttavia, usando Visual Studio, l'Electron Symbol Server ospitato da GitHub e il codice sorgente di Electron, è abbastanza facile abilitare il debug passo-passo con i breakpoint all'interno del codice sorgente di Electron.

## Requirements

* **A debug build of Electron**: The easiest way is usually building it yourself, using the tools and prerequisites listed in the [build instructions for Windows](build-instructions-windows.md). Mentre puoi facilmente collegare ed eseguire il debug di Electron, dato che puoi scaricarlo direttamente, troverai che è fortemente ottimizzato, rendendo il debugging sostanzialmente più difficile: il debugger non sarà in grado di mostrarti il contenuto di tutte le variabili e il percorso di esecuzione può sembra strano a causa di inlining, chiamate tail e altre ottimizzazioni del compilatore.

* **Visual Studio with C++ Tools**: The free community editions of Visual Studio 2013 and Visual Studio 2015 both work. Once installed, [configure Visual Studio to use GitHub's Electron Symbol server](setting-up-symbol-server.md). It will enable Visual Studio to gain a better understanding of what happens inside Electron, making it easier to present variables in a human-readable format.

* **ProcMon**: The [free SysInternals tool](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) allows you to inspect a processes parameters, file handles, and registry operations.

## Attaching to and Debugging Electron

To start a debugging session, open up PowerShell/CMD and execute your debug build of Electron, using the application to open as a parameter.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Setting Breakpoints

Then, open up Visual Studio. Electron is not built with Visual Studio and hence does not contain a project file - you can however open up the source code files "As File", meaning that Visual Studio will open them up by themselves. È ancora possibile impostare i punti di interruzione: Visual Studio rileva automaticamente che il codice sorgente corrisponde al codice in esecuzione nel processo allegato e si interrompe di conseguenza.

Relevant code files can be found in `./atom/` as well as in Brightray, found in `./brightray/browser` and `./brightray/common`. If you're hardcore, you can also debug Chromium directly, which is obviously found in `chromium_src`.

### Attaching

È possibile collegare il debugger di Visual Studio a un processo in esecuzione su un computer locale o remoto. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. You can use this capability to debug apps that are running on a local or remote computer, debug multiple processes simultaneously.

If Electron is running under a different user account, select the `Show processes from all users` check box. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### Which Process Should I Attach to?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Using ProcMon to Observe a Process

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.