# Instrucciones para compilación (Linux)

Siga las indicaciones a continuación para construir Electron en Linux.

## Pre-requisitos

* Al menos 25GB de espacio de disco y 8GB de RAM.
* Python 2.7.x. Algunas distribuciones como CentOS 6.x. aún usan Python 2.6.x, así que quizá necesitarás revisar tu versión de Python con `python -V`.
    
    Por favor, verifica que tu sistema y la versión de Python soportan al menos TLS 1.2. Para una prueba rápida, haz correr el siguiente script:
    
    ```sh
    $ npm run check-tls
    ```
    
    Si el script devuelve que tu configuración utiliza un protocolo de seguridad obsoletos, utilizar gestor de paquetes del sistema para actualizar Python con la última versión de la rama 2.7. Como alternativa, visita https://www.python.org/downloads/ para obtener instrucciones detalladas.

* Node.js. Existen muchas maneras de instalar Node. Puedes descargar el código de fuente de [nodejs.org](https://nodejs.org) y compilarlo. Hacerlo permite instalar Node en el directorio de tu propia casa como un usuario estándar. O intenta repositorios como [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [clang](https://clang.llvm.org/get_started.html) 3.4 o luego.
* Jefes de desarrollo de GTK+ y libnotify.

En Ubuntu, instala las siguientes librerías: 

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock
```

En RHEL / CentOS, instala las siguientes librerías:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

En Fedora, instala las siguientes librerías:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Otras distribuciones pueden ofrecer paquetes similares para instalación a través de gestores de paquetes como pacman. O uno puede compilar desde el código fuente.

### Compilación cruzada

Si quiere compilar para la arquitectura `arm` debe instalar también las siguientes dependencias:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Del mismo modo para `arm64`, instale los siguientes:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Compilando

See [Build Instructions: GN](build-instructions-gn.md)

## Problemas

### Error al cargar las bibliotecas compartidas: libtinfo.so.5

El precompilado `clang` tratará enlazar a `libtinfo.so.5`. Dependiendo de la arquitectura centrar, habrá un enlace simbólico apropiado a `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tópicos Avanzados

La configuración por defecto de la compilación es dirigida a las principales distribuidoras de linux de escritorio. Para compilar una distribución en específico o dispositivo, la siguiente información puede ayudarte.

### Usando el sistema `clang` en vez del binario descarado `clang`

Por defecto, Electron se compila con archivos binarios [`clang`](https://clang.llvm.org/get_started.html) predefinidas por el proyecto Chromium. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### Usando otros compiladores además de `clang`

Building Electron with compilers other than `clang` is not supported.