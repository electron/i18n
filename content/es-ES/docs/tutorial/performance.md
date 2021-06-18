# Rendimiento

Los desarrolladores preguntan frecuentemente sobre estrategias para optimizar el rendimiento de aplicaciones de Electron. Los ingenieros de software, los consumidores y los desarrolladores de framework no siempre están de acuerdo en una sola definición de lo que significa "rendimiento". Este documento describe algunas de las formas favoritas de los mantenedores de Electron para reducir la cantidad de memoria, CPU, y recursos de disco que se están utilizando asegurando que tu aplicación responde a la entrada del usuario y completa las operaciones lo antes posible posible. Además, queremos que todas las estrategias de rendimiento mantengan un alto estándar para la seguridad de tu aplicación.

La sabiduría y la información sobre cómo construir sitios web con rendimiento con JavaScript generalmente también se aplica a las aplicaciones Electron. Hasta cierto punto, los recursos discuten cómo construir Nodo performante. s aplicaciones también aplican, pero tenga cuidado de entender que el término "rendimiento" significa cosas diferentes para un Nodo. s backend de lo que hace para una aplicación ejecutándose en un cliente.

This list is provided for your convenience – and is, much like our [security checklist][security] – not meant to exhaustive. Probablemente sea posible construir una aplicación Electron lenta que siga todos los pasos descritos a continuación. Electron es una potente plataforma de desarrollo que te permite, al desarrollador, hacer más o menos lo que quieras. Toda esa libertad significa que el rendimiento es en gran medida tu responsabilidad.

## Medida, Medida, Medida

La siguiente lista contiene una serie de pasos que son bastante directos y fáciles de implementar. Sin embargo, construir la versión más eficiente de su aplicación requerirá que vaya más allá de una serie de pasos. En su lugar, tendrás que examinar de cerca todo el código que se ejecuta en tu aplicación perfilando cuidadosamente y comprimiendo. ¿Dónde están los cuellos de botella? Cuando el usuario hace clic en un botón, ¿qué las operaciones ocupan la peor parte del tiempo? Mientras que la aplicación simplemente está recolectando, ¿cuáles objetos ocupan más memoria?

Una y otra vez, hemos visto que la estrategia más exitosa para construir una aplicación de Electron con rendimiento es perfilar el código en ejecución, encuentra la pieza más hambrienta de recursos, y para optimizarla. Repetir este proceso aparentemente laborable una y otra vez incrementará espectacularmente el rendimiento de tu aplicación . Experiencia de trabajar con aplicaciones importantes como Visual Studio Code o Slack ha demostrado que esta práctica es, de lejos, la estrategia más confiable para mejorar el rendimiento.

Para aprender más sobre cómo perfilar el código de tu aplicación, familiarizate con las Herramientas para desarrolladores de Chrome. Para un análisis avanzado de múltiples procesos a la vez, considere la herramienta [de seguimiento de cromo](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

### Lectura Recomendada

* [Comience con el análisis del rendimiento del tiempo de ejecución][chrome-devtools-tutorial]
* [Talk: "Visual Studio Code - El Primer Segundo"][vscode-first-second]

## Lista de verificación

Es probable que tu aplicación pueda ser un poco más lenta, más rápida y por lo general menos de recursos hambrientos si intentas estos pasos.

1. [Descuidada incluyendo módulos](#1-carelessly-including-modules)
2. [Cargando y ejecutando código demasiado pronto](#2-loading-and-running-code-too-soon)
3. [Bloqueo del proceso principal](#3-blocking-the-main-process)
4. [Bloqueo del proceso renderer](#4-blocking-the-renderer-process)
5. [Polifiltros innecesarios](#5-unnecessary-polyfills)
6. [Solicitudes de red innecesarias o de bloqueo](#6-unnecessary-or-blocking-network-requests)
7. [Empaquete su código](#7-bundle-your-code)

## 1) Incluir módulos con cuidado

Antes de agregar un módulo Node.js a su aplicación, examine dicho módulo. ¿Cuántas dependencias ese módulo incluye? ¿Qué tipo de recursos necesita para simplemente ejecutar la sentencia `require()`? Podría encontrar que el módulo con más descargas en el registro de paquetes NPM o la mayoría de estrellas en GitHub no es de hecho el más simple o el más pequeño disponible.

### ¿Por qué?

El razonamiento detrás de esta recomendación es mejor ilustrado con un ejemplo de mundo real. Durante los primeros días del Electron, la detección fiable de la conectividad de la red fue un problema, resultando en que muchas aplicaciones usaran un módulo que expone un simple método `isOnline()`.

Ese módulo detectaba la conectividad de su red al intentar comunicarse con un número de endpoints conocidos. Para la lista de esos endpoints, dependía de un módulo diferente, que también contenía un lista conocida de puertos. Esta dependencia se basaba en un módulo que contenía información sobre los puertos, que venía en forma de un archivo JSON con más de 100.000 líneas de contenido. Siempre que el modulo era cargado (usualmente en una sentencia `require('module')`) este debía cargar todas sus dependencias y eventualmente parsear este archivo JSON. El análisis de miles de líneas JSON es una operación muy costosa. En una máquina lenta esto puede tomar segundos enteros de tiempo.

En muchos contextos de servidor, el tiempo de inicio es prácticamente irrelevante. Un servidor Node.js que requiere información sobre todos los puertos es probable que sea "más eficiente" si carga toda la memoria requerida en la memoria cada vez que el servidor inicia con la ventaja de servir peticiones mas rápido. El módulo discutido en este ejemplo no es un "mal" módulo. Sin embargo, las aplicaciones de Electron no deben cargar, analizar y almacenar en información de memoria que no necesita.

En resumen, un módulo aparentemente excelente escrito principalmente para servidores Node.js ejecutando Linux podría ser una mala noticia para el rendimiento de su aplicación. En este ejemplo en particular, la solución correcta era no usar ningún módulo, y en su lugar usar comprobaciones de conectividad incluidas en versiones posteriores de Chromium.

### ¿Cómo?

Al considerar un módulo, le recomendamos que verifique:

1. el tamaño de las dependencias incluidas
2. los recursos requeridos para cargarlo (`require()`)
3. los recursos necesarios para realizar la acción en la que estás interesado

Generar un perfil de CPU y un perfil de memoria acumulada para cargar un módulo puede hacerse con un solo comando en la línea de comandos. En el ejemplo de abajo, estamos mirando la popular solicitud de módulo ``.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

Ejecutar este comando resulta en un archivo `.cpuprofile` y un archivo `.heapprofile` en el directorio en el que lo ejecutó. Ambos archivos pueden ser analizados usando las Herramientas para desarrolladores de Chrome, usando las pestañas `Rendimiento` y `Memoria` respectivamente.

![Perfil de rendimiento de la CPU][4]

![Performance Heap Memory Profile][5]

En este ejemplo, en la máquina del autor, vimos que la carga de `solicitud` tomó medio segundo, mientras que `node-fetch` tomó dramáticamente menos memoria y menos de 50ms.

## 2) Cargando y ejecutando código demasiado pronto

Si tiene operaciones de instalación costosas, considere aplazarlas. Inspectar a todos el trabajo que se está ejecutando justo después de que la aplicación comience. En lugar de disparar todas las operaciones de inmediato, considere aturderlas en una secuencia más alineada estrechamente con el viaje del usuario.

En el desarrollo tradicional de Node.js, estamos usando para poner todas nuestras sentencias `require()` en la parte superior. Si actualmente estás escribiendo tu aplicación Electron usando la misma estrategia _y_ están usando módulos considerables que no inmediatamente necesitas. aplicar la misma estrategia y diferir la carga a más tiempo de oportunidad.

### ¿Por qué?

La carga de módulos es una operación sorprendentemente costosa, especialmente en Windows. Cuando tu aplicación se inicia, no debería hacer que los usuarios esperen a que las operaciones no sean necesarias actualmente.

Esto podría parecer obvio, pero muchas aplicaciones tienden a hacer una gran cantidad de trabajo inmediatamente después de que la aplicación haya iniciado - como comprobar actualizaciones, descargar contenido usado en un flujo posterior, o realizar operaciones pesadas de E/S en disco.

Vamos a considerar Visual Studio Code como un ejemplo. Cuando abra un archivo, inmediatamente le mostrará el archivo sin ningún resaltado de código, priorizando tu habilidad para interactuar con el texto. Una vez que haya hecho ese trabajo, pasará al resaltado de código.

### ¿Cómo?

Consideremos un ejemplo y asumamos que tu aplicación está analizando archivos en el formato ficticio `.foo`. Para hacer eso, se basa en el módulo igualmente ficticio `foo-parser`. En el desarrollo tradicional de Node.js, puede escribir código que cargue con entusiasmo las dependencias:

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this.files = fs.readdirSync('.')
  }

  getParsedFiles () {
    return fooParser.parse(this.files)
  }
}

const parser = new Parser()

module.exports = { parser }
```

En el ejemplo anterior, estamos haciendo un montón de trabajo que se está ejecutando tan pronto como se carga el archivo. ¿Necesitamos obtener archivos analizados de inmediato? ¿Podríamos hacer este trabajo un poco más tarde, cuando `getParsedFiles()` es realmente llamado?

```js
// "fs" is likely already being loaded, so the `require()` call is cheap
const fs = require('fs')

class Parser {
  async getFiles () {
    // Touch the disk as soon as `getFiles` is called, not sooner.
    // Also, ensure that we're not blocking other operations by using
    // the asynchronous version.
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // Our fictitious foo-parser is a big and expensive module to load, so
    // defer that work until we actually need to parse files.
    // Since `require()` comes with a module cache, the `require()` call
    // will only be expensive once - subsequent calls of `getParsedFiles()`
    // will be faster.
    const fooParser = require('foo-parser')
    const files = await this.getFiles()

    return fooParser.parse(files)
  }
}

// This operation is now a lot cheaper than in our previous example
const parser = new Parser()

module.exports = { parser }
```

En resumen, asigna recursos "justo a tiempo" en lugar de asignarlos todos cuando tu aplicación inicie.

## 3) Bloquear el proceso principal

El proceso principal de Electron (a veces llamado "proceso del navegador") es especial: es el proceso padre de todos los demás procesos de tu aplicación y el proceso principal con el que interactúa el sistema operativo. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

Bajo ninguna circunstancia debe bloquear este proceso y el hilo de interfaz con operaciones de larga ejecución. Bloquear el hilo de interfaz de usuario significa que toda tu aplicación se congelará hasta que el proceso principal esté listo para continuar procesando.

### ¿Por qué?

The main process and its UI thread are essentially the control tower for major operations inside your app. When the operating system tells your app about a mouse click, it'll go through the main process before it reaches your window. Si la ventana está renderizando una animación suavizada, tendrá que hablar con el proceso GPU sobre eso, una vez más pasando por el proceso principal.

Electron y Chromium tienen cuidado de poner operaciones pesadas de E/S y de CPU en nuevos hilos para evitar bloquear el hilo de la interfaz. Deberían hacer lo mismo.

### ¿Cómo?

La poderosa arquitectura multiproceso de Electron está lista para ayudarte con tus tareas largas, pero también incluye un pequeño número de trampas de rendimiento.

1) For long running CPU-heavy tasks, make use of [worker threads][worker-threads], consider moving them to the BrowserWindow, or (as a last resort) spawn a dedicated process.

2) Evitar usar el IPC sincrónico y el módulo `remoto` tanto como sea posible. Aunque hay casos de uso legítimos, es demasiado fácil bloquear sin saberlo el hilo de interfaz de usuario usando el módulo `remoto`.

3) Evitar el uso de bloquear operaciones de E/S en el proceso principal. En resumen, siempre que nodos centrales. Los módulos s (como `fs` o `child_process`) ofrecen una versión sincrónica o una asincrónica, prefiere la variante asíncrona y no bloqueadora.

## 4) Bloquear el proceso de procesamiento

Dado que Electron se envía con una versión actual de Chrome, puede hacer uso de las últimas y mejores funciones que ofrece la plataforma web para aplazar o descargar operaciones pesadas de una manera que mantenga su aplicación fluida y receptiva.

### ¿Por qué?

Probablemente tu aplicación tenga un montón de JavaScript para ejecutar en el proceso de renderizado. El truco es ejecutar operaciones lo antes posible sin quitar recursos necesarios para seguir desplazándose, responder a la entrada del usuario o animaciones a 60fps.

Orquestar el flujo de operaciones en el código de tu renderizador es particularmente útil si los usuarios se quejan de tu aplicación a veces "aterrizando".

### ¿Cómo?

Generalmente, todos los consejos para construir aplicaciones web con rendimiento para navegadores modernos también se aplican a los renderizadores de Electron. Las dos herramientas principales a su disposición actualmente son  `requestIdleCallback()` para pequeñas operaciones y `Web Workers` para operaciones de ejecución prolongada.

*`requestIdleCallback()`* permite a los desarrolladores hacer cola una función ejecutada tan pronto como el proceso esté entrando en un período inactivo. Le permite realizar trabajos de baja prioridad o en segundo plano sin afectar a la experiencia del usuario. Para más información sobre como usarlo, [revise su documentación en MDN][request-idle-callback].

*Web Workers* son una herramienta poderosa para correr código en un hilo separado. Hay algunas advertencias a considerar - consulte la [documentación de multihilos][multithreading] y la [documentación de MDN para trabajadores Web][web-workers] de Electron. Son una solución ideal para cualquier operación que requiera mucha potencia de CPU durante un período extendido de tiempo.

## 5) Polyfills innecesarios

Uno de los grandes beneficios de Electron es que sabes exactamente qué motor analizará su JavaScript, HTML y CSS. Si estás re-propósito de código que fue escrito para la web en general, asegúrate de no rellenar características incluidas en Electron.

### ¿Por qué?

Al construir una aplicación web para la Internet de hoy, los entornos más antiguos dictan qué características puede y no puede utilizar. A pesar de que Electron soporta filtros y animaciones CSS de buen rendimiento, un navegador antiguo podría no. Donde usted podría usar WebGL, sus desarrolladores pueden haber elegido una solución más hambrienta de recursos para soportar teléfonos antiguos.

Cuando se trata de JavaScript, puede haber incluido librerías de toolkit como jQuery para selectores DOM o polirelleno como `regenerator-runtime` para soportar `async/await`.

Es raro que un polirelleno basado en JavaScript sea más rápido que la función nativa equivalente en Electron. No ralentice su aplicación Electron enviando su versión de características estándar de plataforma web.

### ¿Cómo?

Operar bajo la suposición de que los polirellenos en las versiones actuales de Electron son innecesarios. Si tienes dudas, revisa [caniuse. om](https://caniuse.com/) and check if the [version of Chromium used in your Electron version](../api/process.md#processversionschrome-readonly) supports the feature you desire.

Además, examine cuidadosamente las bibliotecas que utiliza. ¿Son realmente necesarias? `jQuery`, for example, was such a success that many of its features are now part of the [standard JavaScript feature set available][jquery-need].

Si está utilizando un transpilador/compilador como TypeScript, examine su configuración y asegúrese de que está dirigiendo a la última versión de ECMAScript soportada por Electron.

## 6) Solicitudes de red innecesarias o bloqueadas

Evita obtener raramente cambios de recursos de Internet si podrían fácilmente empaquetarse con tu aplicación.

### ¿Por qué?

Muchos usuarios de Electron empiezan con una aplicación completamente basada en la web que están convirtiendo en una aplicación de escritorio. Como desarrolladores web, estamos usando para cargar recursos de una variedad de redes de entrega de contenido. Ahora que está enviando una aplicación de escritorio apropiada. intenta "cortar el cordón" donde sea posible y evita que tus usuarios esperen recursos que nunca cambien y podrían ser fácilmente incluidos en tu aplicación.

Un ejemplo típico es Google Fonts. Muchos desarrolladores hacen uso de la impresionante colección de fuentes gratuitas de Google, que viene con una red de entrega de contenido . El tono es directo: Incluye algunas líneas de CSS y Google se encargará del resto.

Cuando construyes una aplicación Electron tus usuarios serán mejor servidos si descargas las fuentes e incluirlas en el paquete de tu aplicación.

### ¿Cómo?

En un mundo ideal, tu aplicación no necesitaría la red para operar en absoluto. Para llegar allí, debes entender qué recursos está descargando tu aplicación \- y cuán grandes son esos recursos.

Para ello, abre las herramientas de desarrollo. Vaya a la pestaña `Red` y compruebe la opción `Desactivar caché`. Luego, vuelva a cargar su renderizador. A menos que tu aplicación prohíba estas recargas, generalmente puedes activar una recarga pulsando `Cmd + R` o `Ctrl + R` con las herramientas de desarrollo en enfoque.

Las herramientas ahora registrarán meticulosamente todas las peticiones de red. En un primer paso, haga inventario de todos los recursos que se están descargando, centrándose en los archivos más grandes primero. ¿Alguno de ellos son imágenes, fuentes o archivos multimedia que no cambian y podrían incluirse en tu paquete? En caso afirmativo, incluirlas.

Como siguiente paso, habilita `lanzamiento de red`. Encuentra el menú desplegable que actualmente lee `Online` y selecciona una velocidad más lenta como `Fast 3G`. Recarga tu renderizador y mira si hay recursos que tu aplicación está innecesariamente esperando. En muchos casos, una aplicación esperará a que se complete una solicitud de red a pesar de no necesitar realmente el recurso involucrado.

Como consejo, cargar recursos de Internet que tal vez quieras cambiar sin enviar una actualización de la aplicación es una estrategia poderosa. Para un control avanzado sobre como los recursos se cargan, considere invertir en [Service Workers][service-workers].

## 7) Conjunto de tu código

Como ya se indicó en "[Cargar y ejecutar código demasiado pronto](#2-loading-and-running-code-too-soon)", llamar `require()` es una operación costosa. Si es capaz de hacerlo, agrega el código de su aplicación en un solo archivo.

### ¿Por qué?

El desarrollo moderno de JavaScript generalmente involucra muchos archivos y módulos. Mientras que está perfectamente bien desarrollar con Electron, recomendamos encarecidamente que empaquetes todo tu código en un solo archivo para asegurar que la sobrecarga incluida en la llamada `require()` solo se paga una vez que la aplicación carga.

### ¿Cómo?

Hay numerosos bundlers de JavaScript ahí fuera y sabemos mejor que enfurecer a la comunidad recomendando una herramienta sobre otra. Sin embargo, recomendamos que utilice un bundler que sea capaz de manejar el entorno único de Electron que necesita manejar ambos nodos. y entornos de navegador.

As of writing this article, the popular choices include [Webpack][webpack], [Parcel][parcel], and [rollup.js][rollup].

[4]: ../images/performance-cpu-prof.png
[5]: ../images/performance-heap-prof.png

[security]: ./security.md
[chrome-devtools-tutorial]: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/
[worker-threads]: https://nodejs.org/api/worker_threads.html
[web-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[request-idle-callback]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[multithreading]: ./multithreading.md
[jquery-need]: http://youmightnotneedjquery.com/
[service-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[rollup]: https://rollupjs.org/
[vscode-first-second]: https://www.youtube.com/watch?v=r0OeHRUCCb4
