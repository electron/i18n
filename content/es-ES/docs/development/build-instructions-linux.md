# Instrucciones para compilación (Linux)

Follow the guidelines below for building **Electron itself** on Linux, for the purposes of creating custom Electron binaries. For bundling and distributing your app code with the prebuilt Electron binaries, see the [application distribution][application-distribution] guide.

## Prerequisitos

* Al menos 25GB de espacio de disco y 8GB de RAM.
* Python 2.7.x. Some distributions like CentOS 6.x still use Python 2.6.x so you may need to check your Python version with `python -V`.

  Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:

  ```sh
  $ npx @electron/check-python-tls
  ```

  Si el script devuelve que tu configuración utiliza un protocolo de seguridad obsoletos, utilizar gestor de paquetes del sistema para actualizar Python con la última versión de la rama 2.7. Como alternativa, visita https://www.python.org/downloads/ para obtener instrucciones detalladas.

* Node.js. Existen muchas maneras de instalar Node. Puedes descargar el código de fuente de [nodejs.org](https://nodejs.org) y compilarlo. Hacerlo permite instalar Node en el directorio de tu propia casa como un usuario estándar. O intenta repositorios como [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 o luego.
* Intent://details? id=com. brave. browser&inline=true&enifd=AMO2QMb0CSz5COdTlkER7Sp6HHD4DjJgznUKZTpCWY1PNEDyw3f3S18a2BYrh9lnWDGFpdiOLfIdgKAfmW3K4fqsUff6jhTk0RLPCG_dLZaZRIP37xDnMmI&gclid=EAIaIQobChMI-47S7eP46gIVgobACh1iJgX6EAMYASAAEgJPW_D_BwE&gref=EikQAhohChsKEwj7jtLt4_jqAhWChsAKHWImBfoQAxgBIAASAk9b8P8HARioypigAyIIGAUgATABOAc#Intent; scheme=market; package=com. android. vending; end.

En Ubuntu, instala las siguientes librerías:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock openjdk-8-jre
```

En RHEL / CentOS, instala las siguientes librerías:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

En Fedora, instala las siguientes librerías:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

En Arch Linux/Manjaro, instala las siguientes librerías:

```sh
$ sudo pacman -Syu base-devel clang libdbus gtk2 libnotify \
                   libgnome-keyring alsa-lib libcap libcups libxtst \
                   libxss nss gcc-multilib curl gperf bison \
                   python2 python-dbusmock jdk8-openjdk
```

Otras distribuciones pueden ofrecer paquetes similares para la instalación mediante administradores de de paquetes como pacman. O se puede compilar a partir del código fuente.

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
$ gn gen out/Testing --args='import(...) target_cpu="arm"'
```

## Compilando

Ver [Build Instructions: GN](build-instructions-gn.md)

## Problemas

### Error al cargar las bibliotecas compartidas: libtinfo.so.5

El `clang` precompilado intentará crear una liga a `libtinfo.so.5`. Dependiendo de la arquitectura del host, haz symlink a `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tópicos Avanzados

La configuración de construcción predeterminada está destinada a las principales distribuciones de de Linux de escritorio. Para compilar para una distribución o dispositivo específico, la siguiente información puede ayudarte.

### Usando el sistema `clang` en vez del binario descarado `clang`

Por defecto, Electron se compila con archivos binarios [`clang`](https://clang.llvm.org/get_started.html) predefinidas por el proyecto Chromium. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Testing --args='import("//electron/build/args/testing.gn") clang_base_path = "/usr/local/bin"'
```

### Usando otros compiladores además de `clang`

Building Electron with compilers other than `clang` is not supported.

[application-distribution]: ../tutorial/application-distribution.md
