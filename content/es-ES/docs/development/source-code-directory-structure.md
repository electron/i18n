# Estructura del directorio de código fuente

El código fuente del Electron se separa en algunas partes, sobre todo después de cromo en los convenios de separación.

Puede que necesite familiarizarse con architecture</a> múltiples procesos de Chromium para entender el código mejor.</p> 

## Estructura del código fuente

    Átomo ├── de Electron / - código fuente de C++.
    |   ├── aplicación-código de entrada del sistema.
    |   Navegador ├── / - la interfaz incluyendo la ventana principal, interfaz de usuario y todos los |   |   cosas del proceso principal. Esto habla con el renderizador para gestionar páginas web.
    |   |   ├── ui / - aplicación de interfaz de usuario de la materia para diferentes plataformas.
    |   |   |   ├── del cacao / - cacao específica el código fuente.
    |   |   |   Victoria ├── / - específicas de la GUI de Windows de código fuente.
    |   |   |   └── del x-X11 específico código fuente.
    |   |   ├── del api / - proceso de la aplicación de las principales APIs.
    |   |   ├── del net / - código de la red.
    |   |   Mac ├── / - Mac específica Objective-C el código fuente.
    |   |   Recursos └──-iconos, archivos dependientes de plataforma, etcetera.
    |   Procesador ├── / - código que ejecuta en el proceso de renderizado.
    |   |   └── del api / - la aplicación del procesador de proceso de las API.
    |   └── del común / - código utilizado por el principal y el procesador de los procesos, |       incluyendo algunas funciones de utilidad y el código para integrar el mensaje del nodo |       bucle en bucle de mensajes del cromo.
    |       └── del api-la implementación de APIs comunes y bases de |           Módulos incorporados del Electron.
    Chromium_src ├── / - fuente del código que se copia de cromo.
    Default_app ├── / - página de predeterminada para mostrar cuando el Electron se inicia sin |   proporciona una aplicación.
    Docs ├──-documentaciones.
    Lib ├── / - código fuente de JavaScript.
    |   Navegador ├── / - código de inicialización del proceso principal de Javascript.
    |   |   └── del api-implementación de la API de Javascript.
    |   ├── del común / - JavaScript utilizado por el principal y el procesador de procesos |   |   └── del api-implementación de la API de Javascript.
    |   Procesador └── / - código de inicialización del proceso de renderizado de Javascript.
    |       └── del api-implementación de la API de Javascript.
    Especificaciones ├── / - automática de pruebas.
    ├── electron.gyp - normas de construcción del Electron.
    Common.gypi └── - configuración específica del compilador y las reglas de construcción para otros componentes como el 'nodo' y 'breakpad'.
    

## Estructura de directorios de otras

* **script** - secuencias de comandos utilizan para fines de desarrollo como construcción, empaque, pruebas, etcetera.
* **tools** - secuencias de comandos de ayuda utilizan por archivos de gyp, a diferencia de `script`, scripts puesto aquí nunca debe ser invocado por los usuarios directamente.
* **vendor** - código fuente de las dependencias de terceros, no utilice`third_party` como nombre porque confundiría con el mismo directorio en el árbol de código fuente de Chromium.
* **node_modules** - módulos de nodo de terceros utilizados para la construcción.
* **out** - directorio de la salida temporal de `ninja`.
* **dist** - directorio temporal creado por `script/crear-dist.py` secuencia de comandos al crear una distribución.
* **external_binaries** - binarios descargados de entornos de terceros que no admiten la construcción con `gyp`.

## Mantener al día los submódulos de Git

El repositorio Electronico tiene unas dependencias vendored, encontradas en el directorio[/vendor](https://github.com/electron/electron/tree/master/vendor). De vez en cuando podría ver un mensaje como este cuando se ejecuta `git status`:

```sh
$ git status

    modified:   vendor/libchromiumcontent (new commits)
    modified:   vendor/node (new commits)
```

Para actualizar estas dependencias vendored, ejecute el siguiente comando:

```sh
submódulo de Git update--recursive--init
```

Si usted tiene que ejecutar este comando a menudo, puede crear un alias para él en su ` ~ / .gitconfig` archivo:

    su [alias] = submódulo actualización--inicio--recursive