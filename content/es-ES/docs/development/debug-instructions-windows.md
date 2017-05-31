# Depuración en Windows

Si tiene accidentes o problemas en Electron que usted crea que no son causados por la aplicación de JavaScript, pero en cambio por el Electron sí mismo, de depuración puede ser un poco difícil, especialmente para los desarrolladores no se utiliza para depuración nativo c/c ++. Sin embargo, usando Visual Studio, GitHub había alojado el servidor de símbolos de Electron y el código de fuente de electrones, es bastante fácil habilitar paso por depurar con puntos de interrupción en código de fuente del Electron.

## Requisitos

* Versión de depuración de **A de Electron**: la forma más fácil es generalmente compilar usted mismo, utilizando las herramientas y requisitos enumerados en las instrucciones de[build de Windows](build-instructions-windows.md). Mientras que fácilmente puede conectar a y depuración Electron como se puede descargar directamente, usted encontrará que está muy optimizado, dificultando la depuración substancialmente más: el depurador no será capaz de mostrarte el contenido de todas las variables y la ruta de ejecución puede parecer extraña debido a la inclusión, cola de llamadas y otras optimizaciones del compilador.

* **Visual Studio, con C++ Tools**: las ediciones de la comunidad libre de Visual Studio 2013 y 2015 de Studio Visual tanto trabajan. Una vez instalado,[configure Visual Studio para usar símbolo Electron server](setting-up-symbol-server.md) de GitHub. Permitirá a Visual Studio obtener un mejor entendimiento de lo que sucede dentro de Electron, haciéndolo más fácil de presentar las variables en un formato legible.

* **ProcMon**: el tool</a> de SysInternals free le permite inspeccionar un parámetros de procesos, manijas y las operaciones de registro de archivo.</p></li> </ul> 
    
    ## A y depuración Electron
    
    Para iniciar una sesión de depuración, abrir PowerShell/CMD y ejecutar la versión de depuración del Electron, usando la aplicación para abrir como un parámetro.
    
    ```powershell
$./out/D/electron.exe ~/my-electron-app/
```

### Establecer puntos de interrupción

A continuación, abra Visual Studio. Electrón no se construye con Visual Studio y por lo tanto no contiene un archivo de proyecto - sin embargo usted puede abrir los archivos de código fuente "Como archivo", lo que significa que Visual Studio abrirá los por sí mismos. Usted puede todavía establecer puntos de interrupción - Visual Studio automáticamente se imaginará que la fuente de código acerca de los partidos el código que se ejecuta en el proceso de atado y en consecuencia de la rotura.

Archivos de código relevante pueden encontrarse en `./atom/`, así como en Brightray, en `./vendor/brightray/browser` y `./vendor/brightray/common`. Si eres hardcore, también puede depurar cromo directamente, que obviamente se encuentra en `chromium_src`.

### Asociar

Puede adjuntar al depurador de Visual Studio a un proceso en ejecución en un equipo local o remoto. Después de que el proceso se está ejecutando, haga clic en Debug / sujete a proceso (o pulse `CTRL + ALT + P`) para abrir el cuadro de diálogo "Conectar a proceso". Puede utilizar esta capacidad para depurar aplicaciones que se ejecutan en un equipo local o remoto, depurar múltiples procesos simultáneamente.

Si el Electron está ejecutando bajo una cuenta de usuario diferente, seleccione los procesos`Show de todos users` casilla. Tenga en cuenta que dependiendo de cuántas BrowserWindows el app abierto, verá varios procesos. Una típica aplicación de ventana uno resultará en Visual Studio que te presenta con dos entradas de`Electron.exe` - uno de los principales procesos y para el proceso de renderizado. Puesto que la lista sólo le da nombres, actualmente no hay ninguna forma fiable de averiguar cuál es cuál.

### ¿Que procesos debo conectar a?

Código ejecutado dentro del proceso principal (que es código que se encuentra en o eventualmente dirigida por su principal archivo de JavaScript), así como código de llamada usando el control remoto (`require('electron').remote`) se ejecutará dentro del proceso principal, mientras que otro código se ejecutará dentro de su proceso de procesador respectivo.

Usted puede conectarse varios programas cuando se está depurando, pero solamente un programa está activo en el depurador en cualquier momento. Puede configurar el programa activo en la barra de herramientas de Location</code> de `Debug o el window` de Processes.</p>

<h2>Uso de ProcMon para observar un proceso de</h2>

<p>Si bien Visual Studio es fantástico para la inspección de caminos de código específico, fuerza de ProcMon es realmente en la observación de todo lo que su aplicación está haciendo con el sistema operativo - captura archivo, registro, red, proceso y detalles de los procesos de generación de perfiles. Intentos de registrar eventos de <strong>all</strong> que ocurre y puede ser muy abrumador, pero si buscas entender qué y cómo está haciendo la aplicación para el sistema operativo, puede ser un recurso valioso.</p>

<p>Para una introducción a las características de depuración básicas y avanzadas de ProcMon, vaya Echale <a href="https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor">this tutorial</a> video proporcionado por Microsoft.</p>