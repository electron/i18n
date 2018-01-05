# Depuración en Windows

Si usted tiene bloqueos o problemas en Electron que cree que no son causados ​​por la aplicación de JavaScript, sino por Electron, la depuración puede ser un poco difícil, especialmente para desarrolladores que no están acostumbrados a la depuración nativa/C++. Sin embargo, al usar Visual Studio, el servidor de símbolo de Electron hospedado en GitHub y el código fuente de Electron, es bastante fácil habilitar la depuración paso a paso con puntos de interrupción dentro del código fuente de Electron.

## Requisitos

* **Construir una depuración de Electron**: la forma más fácil es usualmente que usted mismo lo construya, utilizando las herramientas y los requisitos previos enumerados en [instrucciones de compilación para Windows](build-instructions-windows.md). Mientras usted puede fácilmente adjuntar y depurar a Electron, ya que puede descargarlo directamente, encontrará que está muy optimizado, lo que hace que la depuración sea mucho más difícil: el depurador no será capaz de mostrarle el contenido de todas las variables y la ruta de ejecución puede aparecer extraña debido a las llamadas entrantes, a la cola y otras optimizaciones del compilador.

* **Visual Studio con herramientas de C++**: las ediciones de la comunidad gratuitas de Visual Studio 2013 y 2015 funcionan. Una vez instalado, [configure Visual Studio para usar el servidor de símbolos de GitHub de Electron](setting-up-symbol-server.md). Le permitirá a Visual Studio obtener una mejor comprensión de lo que sucede dentro de Electron, haciendo que sea más fácil presentar las variables en un formato de lectura.

* **ProcMon**: la [herramienta gratuita SysInternals](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) le permite inspeccionar los parámetros de los procesos, los manejadores de archivos y las operaciones de registro.

## Adjuntado y depuración de Electron

Para iniciar una sesión de depuración, abra PowerShell/CMD y ejecute su versión de depuración de Electron, usando la aplicación para abrir como parámetro.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Establecer puntos de interrupción

Luego, abre Visual Studio. Electron no está construido con Visual Studio y, por lo tanto, no contiene un archivo de proyecto - sin embargo, usted puede abrir los archivos de código fuente "Como archivo", lo que significa que Visual Studio los abrirá por sí mismo. You can still set breakpoints - Visual Studio will automatically figure out that the source code matches the code running in the attached process and break accordingly.

Relevant code files can be found in `./atom/` as well as in Brightray, found in `./brightray/browser` and `./brightray/common`. If you're hardcore, you can also debug Chromium directly, which is obviously found in `chromium_src`.

### Attaching

You can attach the Visual Studio debugger to a running process on a local or remote computer. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. You can use this capability to debug apps that are running on a local or remote computer, debug multiple processes simultaneously.

If Electron is running under a different user account, select the `Show processes from all users` check box. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### Which Process Should I Attach to?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Using ProcMon to Observe a Process

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.