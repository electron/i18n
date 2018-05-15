# Depuración en Windows

Si usted tiene bloqueos o problemas en Electron que cree que no son causados ​​por la aplicación de JavaScript, sino por Electron, la depuración puede ser un poco difícil, especialmente para desarrolladores que no están acostumbrados a la depuración nativa/C++. However, using Visual Studio, GitHub's hosted Electron Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

## Requisitos

* **Construir una depuración de Electron**: la forma más fácil es usualmente que usted mismo lo construya, utilizando las herramientas y los requisitos previos enumerados en [instrucciones de compilación para Windows](build-instructions-windows.md). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Visual Studio con herramientas de C++**: las ediciones de la comunidad gratuitas de Visual Studio 2013 y 2015 funcionan. Una vez instalado, [configure Visual Studio para usar el servidor de símbolos de GitHub de Electron](setting-up-symbol-server.md). Le permitirá a Visual Studio obtener una mejor comprensión de lo que sucede dentro de Electron, haciendo que sea más fácil presentar las variables en un formato de lectura.

* **ProcMon**: la [herramienta gratuita SysInternals](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) le permite inspeccionar los parámetros de los procesos, los manejadores de archivos y las operaciones de registro.

## Adjuntado y depuración de Electron

Para iniciar una sesión de depuración, abra PowerShell/CMD y ejecute su versión de depuración de Electron, usando la aplicación para abrir como parámetro.

```powershell
$ ./out/D/electron.exe ~/my-electron-app/
```

### Establecer puntos de interrupción

Luego, abre Visual Studio. Electron no está construido con Visual Studio y, por lo tanto, no contiene un archivo de proyecto - sin embargo, usted puede abrir los archivos de código fuente "Como archivo", lo que significa que Visual Studio los abrirá por sí mismo. Usted puede todavía establecer puntos de interrupción - Visual Studio automáticamente descifrará que el código fuente coincide con el código que se ejecuta en el proceso adjunto y se romperá en consecuencia.

Los archivos de código relevantes se pueden encontrar en `./ atom /`, así como en Brightray, que se encuentra en `./brightray/browser` y `./brightray/common`.

### Adjuntado

Usted puede conectar el depurador de Visual Studio a un proceso en ejecución en una computadora local o remota. Después de que se esté ejecutando el proceso, haga clic en Depurar / Adjuntar al proceso (o presione `CTRL+ALT+P`) para abrir el cuadro de diálogo "Adjuntar al proceso". Usted puede usar esta capacidad para depurar aplicaciones que se ejecutan en una computadora local o remota, depurará múltiples procesos simultáneamente.

Si Electron se ejecuta con una cuenta de usuario diferente, seleccione `mostrar procesos de todos los usuarios` en la casilla. Tenga en cuenta que dependiendo de cuántos BrowserWindows su aplicación tenga abiertos, verá múltiples procesos. Una típica aplicación de una ventana dará como resultado que Visual Studio le presente dos entradas `Electron.exe`: una para el proceso principal y otra para el proceso renderizado. Dado que la lista solo le da nombres, actualmente no hay una forma confiable de descubrir cuál es cuál.

### ¿A qué proceso debo adjuntarme?

Código ejecutado dentro del proceso principal (es decir, código que se encuentra en el archivo JavaScript principal o eventualmente ejecutado), así como código llamado utilizando el control remoto (`require('electron').remote`) se ejecutará dentro del proceso principal, mientras que otro código se ejecutará dentro de su proceso de renderización respectivo.

Puede estar conectado a varios programas cuando se está depurando, pero solamente un programa está activo en el depurador en cualquier momento. Puedes configurar el programa activo en la barra de herramientas `Ubicación de depuración` o en la `ventana de procesos`.

## Usando ProcMon para Observar un Proceso

Mientras que Visual Studio es fantástico para inspeccionar rutas de código específicas, la fortaleza de ProcMon está realmente en observar todo lo que su aplicación está haciendo con el sistema operativo: captura los detalles de archivo, registro, red, proceso y perfil detallado de los procesos. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

Para obtener una introducción a las funciones de depuración básicas y avanzadas de ProcMon, consulte el video proveído por Microsoft [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor).