# Paghanap at Pag-aayos ng Problema sa Windows (Debugging)

Kung ikaw ay nakararanas ng mga pag-crash o may nagaganap na di tama sa Electron at naniniwala ka na ito'y hindi sanhi ng iyong JavaScript na aplikasyon, sa halip ang problema ay nasa Electron mismo, ang pagde-debug ay posibleng maging medyo nakakalito, lalo na sa mga tagabuo na hindi gumagamit ng native/C++ na pagde-debug. However, using Visual Studio, GitHub's hosted Electron Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

**See also**: There's a wealth of information on debugging Chromium, much of which also applies to Electron, on the Chromium developers site: [Debugging Chromium on Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## Mga Kinakailangan

* **Ang debug na gawa ng Electron**: Kadalasan, ang pinakamadaling paraan ay buuin ito mag-isa sa pamamagitan ng mga gamit at mga pangunahing kailangan na nasa [build instructions para sa Windows](build-instructions-windows.md). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Ang Visual Studio gamit ang C++ Tools**: Ang free community editions ng Visual Studio 2013 at Visual studio 2015 ay parehong gumagana. Kapag in-install ang [configure Visual Studio to use GitHub's Electron Symbol server](setting-up-symbol-server.md). Ito ay hahayaang gumana ang Visual studio upang maunawaang mabuti kung ano ang nangyayari sa loob ng Electron at mas mapapadali nito ang pagpapakita ng mga variable sa paraan na mas mauunawaan ng mga tao.

* **ProcMon**: Ang [free SysInternals tool](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) ay hinayaan na siyasatin ang processes parameters, file handles at registry operations.

## Pagkakabit at Pagde-debug sa Electron

To start a debugging session, open up PowerShell/CMD and execute your debug build of Electron, using the application to open as a parameter.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Pagtatakda ng mga Breakpoint

Then, open up Visual Studio. Electron is not built with Visual Studio and hence does not contain a project file - you can however open up the source code files "As File", meaning that Visual Studio will open them up by themselves. You can still set breakpoints - Visual Studio will automatically figure out that the source code matches the code running in the attached process and break accordingly.

Ang mga may kaugnayang mga code file ay matatagpuan sa `./atom/` pati na rin sa Brightray na matatagpuan sa `./brightray/browser` at `./brightray/common`.

### Pagkakabit (Attaching)

You can attach the Visual Studio debugger to a running process on a local or remote computer. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. You can use this capability to debug apps that are running on a local or remote computer, debug multiple processes simultaneously.

If Electron is running under a different user account, select the `Show processes from all users` check box. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### Alin sa mga proseso ang dapat ikabit?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Pagmasdan ang Proseso Gamit ang ProcMon

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.