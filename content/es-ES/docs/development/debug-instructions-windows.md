# Depuración en Windows

Si usted tiene bloqueos o problemas en Electron que cree que no son causados ​​por la aplicación de JavaScript, sino por Electron, la depuración puede ser un poco difícil, especialmente para desarrolladores que no están acostumbrados a la depuración nativa/C++. Sin embargo, usando Visual Studio, el servidor de símbolos de Electron y el código fuente de Electron, puede habilitar la depuración paso a paso con puntos de ruptura dentro de código fuente de Electron.

**Vea también**: hay una gran cantidad de información sobre la depuración de Chromium, mucha de la cual también se aplica a Electron, en el sitio de desarrolladores de Chromium: [Debugging Chromium on Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## Requisitos

* **Construir una depuración de Electron**: la forma más fácil es usualmente que usted mismo lo construya, utilizando las herramientas y los requisitos previos enumerados en [instrucciones de compilación para Windows](build-instructions-windows.md). Aunque puede adjuntar y depurar Electrón a medida que lo descarga directamente, encontrará que está muy optimizado, lo que dificulta considerablemente la depuración: el depurador no podrá mostrarle el contenido de todas las variables y la ruta de ejecución puede parecer extraña debido a las llamadas en línea, las llamadas de cola y otras optimizaciones del compilador.

* **Visual Studio con herramientas de C++**: las ediciones de la comunidad gratuitas de Visual Studio 2013 y 2015 funcionan. Una vez instalado, [configure Visual Studio to use Electron's Symbol server](setting-up-symbol-server.md). Le permitirá a Visual Studio obtener una mejor comprensión de lo que sucede dentro de Electron, haciendo que sea más fácil presentar las variables en un formato de lectura.

* **ProcMon**: la [herramienta gratuita SysInternals][sys-internals] le permite inspeccionar los parámetros de los procesos, los manejadores de archivos y las operaciones de registro.

## Adjuntado y depuración de Electron

Para iniciar una sesión de depuración, abra PowerShell/CMD y ejecute su versión de depuración de Electron, usando la aplicación para abrir como parámetro.

```powershell
$ ./out/Testing/electron.exe ~/my-electron-app/
```

### Establecer puntos de interrupción

Luego, abre Visual Studio. Electron no está construido con Visual Studio y, por lo tanto, no contiene un archivo de proyecto - sin embargo, usted puede abrir los archivos de código fuente "Como archivo", lo que significa que Visual Studio los abrirá por sí mismo. Usted puede todavía establecer puntos de interrupción - Visual Studio automáticamente descifrará que el código fuente coincide con el código que se ejecuta en el proceso adjunto y se romperá en consecuencia.

Relevant code files can be found in `./shell/`.

### Adjuntado

Usted puede conectar el depurador de Visual Studio a un proceso en ejecución en una computadora local o remota. Después de que se esté ejecutando el proceso, haga clic en Depurar / Adjuntar al proceso (o presione `CTRL+ALT+P`) para abrir el cuadro de diálogo "Adjuntar al proceso". Usted puede usar esta capacidad para depurar aplicaciones que se ejecutan en una computadora local o remota, depurará múltiples procesos simultáneamente.

Si Electron se ejecuta con una cuenta de usuario diferente, seleccione `mostrar procesos de todos los usuarios` en la casilla. Tenga en cuenta que dependiendo de cuántos BrowserWindows su aplicación tenga abiertos, verá múltiples procesos. Una típica aplicación de una ventana dará como resultado que Visual Studio le presente dos entradas `Electron.exe`: una para el proceso principal y otra para el proceso renderizado. Dado que la lista solo le da nombres, actualmente no hay una forma confiable de descubrir cuál es cuál.

### ¿A qué proceso debo adjuntarme?

Código ejecutado dentro del proceso principal (es decir, código encontrado en o eventualmente ejecutado por su archivo JavaScript principal) se ejecutara dentro del proceso principal, mientras que otro código se ejecutara dentro de su respectivo proceso renderer.

Puede estar conectado a varios programas cuando se está depurando, pero solamente un programa está activo en el depurador en cualquier momento. Puedes configurar el programa activo en la barra de herramientas `Ubicación de depuración` o en la `ventana de procesos`.

## Usando ProcMon para Observar un Proceso

Mientras que Visual Studio es fantástico para inspeccionar rutas de código específicas, la fortaleza de ProcMon está realmente en observar todo lo que su aplicación está haciendo con el sistema operativo: captura los detalles de archivo, registro, red, proceso y perfil detallado de los procesos. Intenta registrar **todos** los eventos que se producen y puede ser bastante abrumador, pero si intenta comprender qué y cómo está trabajando su aplicación en el sistema operativo, puede ser un recurso valioso.

Para obtener una introducción a las funciones de depuración básicas y avanzadas de ProcMon, consulte el video proveído por Microsoft [this video tutorial][procmon-instructions].

[sys-internals]: https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx
[procmon-instructions]: https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor
