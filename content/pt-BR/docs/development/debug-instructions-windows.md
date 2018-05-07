# Depuração no Windows

Se experimentar falhas ou problemas no Electron que acredita que não são causados pelo seu aplicativo de JavaScript, mas devido ao próprio Electron, a depuração pode ser um pouco complicada, especialmente para os desenvolvedores que não usam a depuração nativa/C++. However, using Visual Studio, GitHub's hosted Electron Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

## Requisitos

* **Depurar uma compilação de Electron**: A maneira mais fácil é normalmente construí-lo você mesmo, usando as ferramentas e os pré-requisitos listados na [construir instruções para Windows](build-instructions-windows.md). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Visual Studio com ferramentas C++**: As edições de comunidade livre de Visual Studio de 2013 e Visual Studio 2015, ambos trabalham. Uma vez instalado, [configure o Visual Studio para usar servidor do Electron Symbol do GitHub](setting-up-symbol-server.md). Permitirá que o Visual Studio obtenha uma melhor compreensão do que acontece dentro de Electron, tornando mais fácil para apresentar as variáveis num formato legível.

* **ProcMon**: The [free SysInternals tool](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) allows you to inspect a processes parameters, file handles, and registry operations.

## Anexar e depurar o Electron

Para iniciar uma sessão de depuração, abrá CMD/PowerShell e execute a sua compilação para depuração do Electron, usando o aplicativo para abrir como um parâmetro.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Definir pontos de interrupção

Em seguida, abra o Visual Studio. Electron is not built with Visual Studio and hence does not contain a project file - you can however open up the source code files "As File", meaning that Visual Studio will open them up by themselves. You can still set breakpoints - Visual Studio will automatically figure out that the source code matches the code running in the attached process and break accordingly.

Relevant code files can be found in `./atom/` as well as in Brightray, found in `./brightray/browser` and `./brightray/common`.

### Attaching

You can attach the Visual Studio debugger to a running process on a local or remote computer. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. You can use this capability to debug apps that are running on a local or remote computer, debug multiple processes simultaneously.

If Electron is running under a different user account, select the `Show processes from all users` check box. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### Which Process Should I Attach to?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Using ProcMon to Observe a Process

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.