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

Luego, abre Visual Studio. Electron no está construido con Visual Studio y, por lo tanto, no contiene un archivo de proyecto - sin embargo, usted puede abrir los archivos de código fuente "Como archivo", lo que significa que Visual Studio los abrirá por sí mismo. Usted puede todavía establecer puntos de interrupción - Visual Studio automáticamente descifrará que el código fuente coincide con el código que se ejecuta en el proceso adjunto y se romperá en consecuencia.

Los archivos de código relevantes se pueden encontrar en `./ atom /`, así como en Brightray, que se encuentra en `./brightray/browser` y `./brightray/common`. Si eres experto, también puedes depurar Chromium directamente, que obviamente se encuentra en `chromium_src`.

### Adjuntado

Usted puede conectar el depurador de Visual Studio a un proceso en ejecución en una computadora local o remota. Después de que se esté ejecutando el proceso, haga clic en Depurar / Adjuntar al proceso (o presione `CTRL+ALT+P`) para abrir el cuadro de diálogo "Adjuntar al proceso". Usted puede usar esta capacidad para depurar aplicaciones que se ejecutan en una computadora local o remota, depurará múltiples procesos simultáneamente.

Si Electron se ejecuta con una cuenta de usuario diferente, seleccione `mostrar procesos de todos los usuarios` en la casilla. Tenga en cuenta que dependiendo de cuántos BrowserWindows su aplicación tenga abiertos, verá múltiples procesos. Una típica aplicación de una ventana dará como resultado que Visual Studio le presente dos entradas `Electron.exe`: una para el proceso principal y otra para el proceso renderizado. Dado que la lista solo le da nombres, actualmente no hay una forma confiable de descubrir cuál es cuál.

### ¿A qué proceso debo adjuntarme?

Código ejecutado dentro del proceso principal (es decir, código que se encuentra en el archivo JavaScript principal o eventualmente ejecutado), así como código llamado utilizando el control remoto (`require('electron').remote`) se ejecutará dentro del proceso principal, mientras que otro código se ejecutará dentro de su proceso de renderización respectivo.

Puede estar conectado a varios programas cuando se está depurando, pero solamente un programa está activo en el depurador en cualquier momento. Puedes configurar el programa activo en la barra de herramientas `Ubicación de depuración` o en la `ventana de procesos`.

## Using ProcMon to Observe a Process

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.