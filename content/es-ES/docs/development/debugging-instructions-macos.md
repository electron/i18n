# Depuración en macOS

Si tiene accidentes o problemas en Electron que usted crea que no son causados por la aplicación de JavaScript, pero en cambio por el Electron sí mismo, de depuración puede ser un poco difícil, especialmente para los desarrolladores no se utiliza para depuración nativo c/c ++. Sin embargo, al usar lldb, y el código de fuente de Electron, es bastante fácil habilitar la depuración paso a paso con los puntos de quiebre dentro del código de fuente de Electron.

## Requisitos

* **Construcción de una depuración de Electron**: La manera más fácil usualmente es construirlo usted mismo, usando las herramientas y prerrequisitos especificados en el [Instrucciones de construcción para macOS](build-instructions-osx.md). Mientras que fácilmente puede conectar a y depuración Electron como se puede descargar directamente, usted encontrará que está muy optimizado, dificultando la depuración substancialmente más: el depurador no será capaz de mostrarte el contenido de todas las variables y la ruta de ejecución puede parecer extraña debido a la inclusión, cola de llamadas y otras optimizaciones del compilador.

* **Código X**: adicional al código X, también instala las herramientas del comando de linea de este. Estos incluye LLDB, el depurador por defecto en el código X para Mac OS X. Este soporta depuración en C, C objetivo y C++ en el escritorio y en dispositivos iOS y sus simuladores.

## A y depuración Electron

Para empezar una sesión de depuración, abra el terminal e inicie `lldb`, pasando al constructo de depuración de Electron como un parámetro.

```sh
$ lldb ./out/D/Electron.app
(lldb) target create "./out/D/Electron.app"
Current executable set to './out/D/Electron.app' (x86_64).
```

### Establecer puntos de interrupción

LLDB es una herramienta poderosa y soporta múltiples estrategias para la inspección de código. Para esta instrucción básica, asumamos que está llamando un comando para JavaScript que no se está comportando correctamente - así que a usted le gustaría separarlo en la contraparte de esos comandos en C++ dentro de la fuente Electron.

Los archivos de código relevantes se pueden encontrar en `./ atom /`, así como en Brightray, que se encuentra en `./brightray/browser` y `./brightray/common`. Si eres experto, también puedes depurar Chromium directamente, que obviamente se encuentra en `chromium_src`.

Asumamos que quiere depurar `app.setName()`, el cual está definido en `browser.cc` como `Browser::SetName()`. Configure un punto de separación usando el comando `breakpoint`, especificando el archivo y la linea que quiere separar:

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Luego, inicie Electron:

```sh
(lldb) run
```

La aplicación será pausada inmediatamente, mientras Electron configura el nombre de esta en el lanzador:

```sh
(lldb) run
Process 25244 launched: '/Users/fr/Code/electron/out/D/Electron.app/Contents/MacOS/Electron' (x86_64)
Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
    frame #0: 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118
   115  }
   116
   117  void Browser::SetName(const std::string& name) {
-> 118    name_override_ = name;
   119  }
   120
   121  int Browser::GetBadgeCount() {
(lldb)
```

Para mostrar los argumentos y las variables locales para la estructura actual, corra `variable de estructura` (o `fr v`), que le mostrará que la aplicación está siendo configurada con el nombre de "Electron".

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

Para hacer un solo paso en el nivel de la fuente en el hilo seleccionado, ejecute `paso` (o `s`). Esto lo llevará dentro de `name_override_.empty()`. Para proceder y dar otro paso, corra `siguiente` (o `n`).

```sh
(lldb) step
Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119, queue = 'com.apple.main-thread', stop reason = step in
    frame #0: 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119
   116
   117  void Browser::SetName(const std::string& name) {
   118    name_override_ = name;
-> 119  }
   120
   121  int Browser::GetBadgeCount() {
   122    return badge_count_;
```

To finish debugging at this point, run `process continue`. You can also continue until a certain line is hit in this thread (`thread until 100`). This command will run the thread in the current frame till it reaches line 100 in this frame or stops if it leaves the current frame.

Now, if you open up Electron's developer tools and call `setName`, you will once again hit the breakpoint.

### Further Reading

LLDB is a powerful tool with a great documentation. To learn more about it, consider Apple's debugging documentation, for instance the [LLDB Command Structure Reference](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) or the introduction to [Using LLDB as a Standalone Debugger](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

You can also check out LLDB's fantastic [manual and tutorial](http://lldb.llvm.org/tutorial.html), which will explain more complex debugging scenarios.