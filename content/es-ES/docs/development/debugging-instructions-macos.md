# Depuración en macOS

Si tiene accidentes o problemas en Electron que usted crea que no son causados por la aplicación de JavaScript, pero en cambio por el Electron sí mismo, de depuración puede ser un poco difícil, especialmente para los desarrolladores no se utiliza para depuración nativo c/c ++. Sin embargo, usando lldb y el código de fuente de electrones, es bastante fácil habilitar paso por depurar con puntos de interrupción en código de fuente del Electron.

## Requisitos

* Versión de depuración de **A de Electron**: la forma más fácil es generalmente compilar usted mismo, utilizando las herramientas y requisitos enumerados en las instrucciones de[build de macOS](build-instructions-osx.md). Mientras que fácilmente puede conectar a y depuración Electron como se puede descargar directamente, usted encontrará que está muy optimizado, dificultando la depuración substancialmente más: el depurador no será capaz de mostrarte el contenido de todas las variables y la ruta de ejecución puede parecer extraña debido a la inclusión, cola de llamadas y otras optimizaciones del compilador.

* **Xcode**: además de Xcode, también instalar las herramientas de línea de comandos de Xcode. Incluyen LLDB, el depurador predeterminado en Xcode en Mac OS X. Soporta depuración C, Objective-C y C++ en los dispositivos iOS y escritorio y simulador.

## A y depuración Electron

Para iniciar una sesión de depuración, abra Terminal y empezar a `lldb`, pasando de una versión de depuración del Electron como un parámetro.

```bash
objetivo de./out/D/Electron.app (lldb) $ lldb crear ". / out/D/Electron.app" ejecutable actual a '. / out/D/Electron.app' (x86_64).
```

### Establecer puntos de interrupción

LLDB es una poderosa herramienta y soporta múltiples estrategias para inspección de código. Para esta introducción básica, vamos a suponer que usted está llamando un comando de JavaScript que no es comportarse correctamente - por lo que gustaría romper en contrapartida de ese comando C++ dentro de la fuente de electrones.

Archivos de código relevante pueden encontrarse en `./atom/`, así como en Brightray, en `./vendor/brightray/browser` y `./vendor/brightray/common`. Si eres hardcore, también puede depurar cromo directamente, que obviamente se encuentra en `chromium_src`.

Supongamos que desea depurar `app.setName ()`, que se define en `browser.cc` como `Browser::SetName () `. Establecer el punto de interrupción utilizando el comando `breakpoint`, especificando el archivo y la línea para romper en:

```bash
establece punto de interrupción (lldb)--browser.cc--línea 117 de archivo punto 1: donde = 20 en browser.cc:118, dirección Electron Framework'atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) = 0x000000000015fdb4
```

Entonces, comienzo del Electron:

```bash
run (lldb)
```

La aplicación inmediatamente se pausará, puesto que el Electron establece el nombre de la aplicación en lanzamiento:

```bash
(lldb) ejecución proceso 25244 lanzó: ' / Users/fr/Code/electron/out/D/Electron.app/Contents/MacOS/Electron' (x86_64) proceso 25244 parado * #1 del hilo de rosca: tid = 0x839a4c, 0x0000000100162db4 Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 en browser.cc:118, cola = ' com.apple.main-hilo de rosca ', dejar razón = punto 1.1 marco #0: 0x0000000100162db4 Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 en browser.cc:118 115} 116 117 anular navegador :: SetName(const std::string& name) {-> 118 name_override_ = nombre;
   119} 120 121 int navegador:: GetBadgeCount() {(lldb)
```

Para mostrar los argumentos y variables locales para el marco actual, `frame ejecución variable` (o `fr v`), que serán para mostrar que la aplicación está actualmente poniendo el nombre de "Electrón".

```bash
variable de marco (lldb) (atom::Browser *) esto = 0x0000000108b14f20 (const string &) nombre = "Electrón": {[...]}
```

Para hacer un fuente nivel solo paso en el hilo seleccionado, ejecutar `step` (o `s`). Esto le llevará en `name_override_.empty ()`. Para continuar y hacer un paso, ejecute `next` (o `n`).

```bash
(lldb) paso 25244 proceso detenido * #1 del hilo de rosca: tid = 0x839a4c, 0x0000000100162dcc Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 de browser.cc:119, cola = ' com.apple.main-hilo ', detener motivo = paso en marco #0: 0x0000000100162dcc Electron Framework'atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 en browser.cc:119 116 117 void Browser::SetName (const std::string& nombre) {118 name_override_ = nombre; -> 119} int 120 121 navegador :: GetBadgeCount() {122 badge_count_ retorno;
```

Para finalizar la depuración en este punto, ejecutar continue</code> de `process. También puede continuar hasta una cierta línea es en este hilo (<code>thread hasta 100`). Este comando ejecutará el hilo en el fotograma actual hasta que alcanza la línea 100 en este marco o se detiene si deja el cuadro actual.

Ahora, si abre las herramientas para desarrolladores y llamada `setName` del Electron, una vez más alcanzará el punto de interrupción.

### Más lectura

LLDB es una potente herramienta con una gran documentación. Para obtener más información, considerar documentación depuración de Apple, por ejemplo el comando [LLDB estructura Reference](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) o la introducción de LLDB [Using como un Standalone Debugger](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

Usted también puede ver [manual fantástico de LLDB y tutorial](http://lldb.llvm.org/tutorial.html), que explicará a los más complejos escenarios de depuración.