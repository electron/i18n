# Instrucciones para compilación (Linux)

Siga las indicaciones a continuación para construir Electron en Linux.

## Pre-requisitos

* Al menos 25GB de espacio de disco y 8GB de RAM.
* Python 2.7.x. Algunas distribuciones como CentOS 6.x. aún usan Python 2.6.x, así que quizá necesitarás revisar tu versión de Python con `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ python ./script/check-tls.py
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. Alternatively, visit https://www.python.org/downloads/ for detailed instructions.

* Node.js. Existen muchas maneras de instalar Node. Puedes descargar el código de fuente de [nodejs.org](https://nodejs.org) y compilarlo. Hacerlo permite instalar Node en el directorio de tu propia casa como un usuario estándar. O intenta repositorios como [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [clang](https://clang.llvm.org/get_started.html) 3.4 o luego.
* Jefes de desarrollo de GTK+ y libnotify.

En Ubuntu, instala las siguientes librerías: 

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

En RHEL / CentOS, instala las siguientes librerías:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

En Fedora, instala las siguientes librerías:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Otras distribuciones pueden ofrecer paquetes similares para instalación a través de gestores de paquetes como pacman. O uno puede compilar desde el código fuente.

## Obteniendo el código

```sh
$ git clone https://github.com/electron/electron
```

## Inicialización

El script bootstrap descargará todas las dependencias de compilacion necesarias y creará la estructura de archivos del proyecto. Debe tener Python 2.7.x para que el comando funcione. Descargar ciertos archivos puede tomar mucho tiempo. Aviso que estamos usando `ninja` para compilar Electron no hay `Makefile` generado.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

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

Y para compilar cruzadamente para objetivos `arm` o `ia32`, debe pasar el parámetro `--target_arch` al comando `bootstrap.py`:

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## Compilando

Si desea compilar metas `Release` y `Debug`:

```sh
$ ./script/build.py
```

Este script hará que un Electron muy grande ejecutable en el directorio `out/R`. El tamaño del archivo es 1.3 gigabytes en exceso. Esto pasa debido a que el objetivo de lanzamiento binario contiene símbolos de depuración. Para reducir el tamaño del archivo, ejecute el comando `create-dist.py`:

```sh
$ ./script/create-dist.py
```

Esto pondrá una distribución de trabajo con archivos muchos más pequeños en el directorio `dist`. Después de ejecutar el comando `create-dist.py`, puede que desee remover el binario de 1.3+ gigabytes que todavía está en `out/R`.

También puede construir solo el objetivo de `Depucación`:

```sh
$ ./script/build.py -c D
```

Después que la construcción está lista, también puede encontrar depurado binario `electron` con el nombre de `out/D`.

## Limpieza

Para limpiar los archivos de compilación:

```sh
$ npm run clean
```

Para limpiar solo los directorios `fuera` y `dist`:

```sh
$ npm run clean-build
```

**Nota:** Ambos comandos limpios requieren un `arranque` de nuevo después de ser compilados.

## Problemas

### Error al cargar las bibliotecas compartidas: libtinfo.so.5

El precompilado `clang` tratará enlazar a `libtinfo.so.5`. Dependiendo de la arquitectura centrar, habrá un enlace simbólico apropiado a `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Verificación

Ver Resumen de sistema de [Build: Tests](build-system-overview.md#tests)

## Tópicos Avanzados

La configuración por defecto de la compilación es dirigida a las principales distribuidoras de linux de escritorio. Para compilar una distribución en específico o dispositivo, la siguiente información puede ayudarte.

### Compilar localmente `libchromiumcontent`

Para evitar usar un precompilado binario de `libchromiumcontent`, puede compilar localmente `libchromiumcontent` para hacer eso siga los siguientes pasos:

1. Instale [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
2. Instale [dependencias adicionales de compilación](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies)
3. Buscar los submodulos de git:

```sh
$ git submodule update --init --recursive
```

1. Pase del comando `--build_release_libcc` a `bootstrap.py`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc
```

Tenga en cuenta que por defecto no se construye la configuración de `shared_library`, por lo que sólo se puede compilar `Release` versión del Electron Si utilizas este modo:

```sh
$ ./script/build.py -c R
```

### Usando el sistema `clang` en vez del binario descarado `clang`

Por defecto, Electron se compila con archivos binarios [`clang`](https://clang.llvm.org/get_started.html) predefinidas por el proyecto Chromium. Si por alguna razón quiere compilar con el `clang` instalado en su sistema, puede llamar `bootstrap.py` con el `--clang_dir=<path>` cambiado. Al pasarlo el comando de compilación asumirá que el binario del `clang` reside en `<path>/bin/`.

Por ejemplo si usted instaló `clang` en `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### Usando otros compiladores además de `clang`

Compilar Electron con compiladores como `g ++`, primera necesidad para desactivar el `clang` con ` - disable_clang` interruptor primero y luego establecer variables de entorno `CC` y `CXX` a los que desee.

Por ejemplo compilar con la cadena de herramientas GCC:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### Variables de entorno

Además de `CC` y `CXX`, usted también puede configurar las siguientes variables de entorno para personalizar las configuración de compilación:

* `CPPFLAGS`
* `CPPFLAGS_host`
* `CFLAGS`
* `CFLAGS_host`
* `CXXFLAGS`
* `CXXFLAGS_host`
* `AR`
* `AR_host`
* `CC`
* `CC_host`
* `CXX`
* `CXX_host`
* `LDFLAGS`

Las variables de entorno tienen que ser configuradas cuando se esté ejecutando el comando `bootstrap.py` no funcionarán en el comando `build.py`.