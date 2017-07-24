# Débogage sur Windows

Si vous rencontrez des crash ou des problèmes dans Electron et que vous croyez qu'il ne viennent pas de votre app JavaScript, mais plutôt d'Electron lui-même, alors le déboggage peut être un peu difficile, surtout pour les développeurs peu expérimentés pour le déboggage natif/C++. Toutefois, en utilisant Visual Studio, le GitHub hébergé sur le serveur symbolique d'Electron et le code source d'Electron, il est assez facile d'activer le déboggage avec des points d'arrêt dans le code source d'Electron.

## Spécifications requises

* **Un debug build d'Electron** : le moyen le plus simple est généralement de le compiler vous-même, en utilisant les outils et prérequis énumérées dans les [instructions de compilation pour Windows](build-instructions-windows.md). Alors que vous pouvez facilement débogguer Electron puisque vous pouvez le télécharger directement, vous trouverez qu’il est fortement optimisé, ce qui rend le déboggage sensiblement plus difficile : le déboggueur ne sera pas en mesure de vous montrer le contenu de toutes les variables et le chemin d’exécution peut sembler étrange à cause de l’inlining, liste d’appels et autres optimisations du compilateur.

* **Outils Visual Studio C++** : les éditions de la communauté gratuite de Visual Studio 2013 et Visual Studio 2015 fonctionnent tous les deux. Une fois installé, [configurer Visual Studio pour utiliser le serveur GitHub symbolique d'Electron](setting-up-symbol-server.md). It will enable Visual Studio to gain a better understanding of what happens inside Electron, making it easier to present variables in a human-readable format.

* **ProcMon**: The [free SysInternals tool](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) allows you to inspect a processes parameters, file handles, and registry operations.

## Attaching to and Debugging Electron

To start a debugging session, open up PowerShell/CMD and execute your debug build of Electron, using the application to open as a parameter.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Setting Breakpoints

Then, open up Visual Studio. Electron is not built with Visual Studio and hence does not contain a project file - you can however open up the source code files "As File", meaning that Visual Studio will open them up by themselves. You can still set breakpoints - Visual Studio will automatically figure out that the source code matches the code running in the attached process and break accordingly.

Relevant code files can be found in `./atom/` as well as in Brightray, found in `./vendor/brightray/browser` and `./vendor/brightray/common`. If you're hardcore, you can also debug Chromium directly, which is obviously found in `chromium_src`.

### Attaching

You can attach the Visual Studio debugger to a running process on a local or remote computer. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. You can use this capability to debug apps that are running on a local or remote computer, debug multiple processes simultaneously.

If Electron is running under a different user account, select the `Show processes from all users` check box. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### Which Process Should I Attach to?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Using ProcMon to Observe a Process

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.