# Instrucciones para compilación (Linux)

Siga las pautas a continuación para la construcción de Electron en Linux.

## Requisitos previos

* Al menos 25GB disco espacio y 8GB de RAM.
* Python 2.7. Algunas distribuciones como CentOS 6.x aún uso Python 2.6. x que tal vez necesite comprobar su versión de Python con `python-V`.
* Node.js. Hay varias formas de instalar el nodo. Puede descargar el código fuente de [Node.js](http://nodejs.org) y compilación de fuente. Hacerlo permite instalar nodo en su propio directorio como usuario estándar. O repositorios como [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* Clang 3,4 o más adelante.
* Jefes de desarrollo de GTK + y libnotify.

En Ubuntu, instalar las siguientes librerías:

```bash
$ sudo apt-get instalar build-essential clang libdbus-1-dev libgtk2.0-dev \ libnotify-dev libgnome-llavero-dev libgconf2-dev \ libcups2-dev de libcap-dev libasound2-dev libxtst-dev \ libxss1 libnss3-dev gcc-multilib g ++-enrollamiento multilib \ gperf bisonte
```

En RHEL / CentOS, instalar las siguientes librerías:

```bash
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \ libgnome-llavero-devel xorg-x11-servidor-utils libcap-devel \ tazas-devel libXtst-devel alsa-lib-devel libXrandr-devel \ GConf2-devel nss-devel
```

En Fedora, instalar las siguientes librerías:

```bash
$ sudo dnf instalar clang dbus-devel gtk2-devel libnotify-devel \ libgnome-llavero-devel xorg-x11-servidor-utils libcap-devel \ tazas-devel libXtst-devel alsa-lib-devel libXrandr-devel \ GConf2-devel nss-devel
```

Otras distribuciones pueden ofrecer paquetes similares para instalación a través de gestores de paquetes como pacman. O uno puede compilar desde el código fuente.

## Obtener el código de

```bash
$ git clone https://github.com/electron/electron.git
```

## De arranque

El script bootstrap descargará todas las dependencias es necesario compilar y crear la estructura de archivos de proyecto. Debe tener Python 2.7 para la escritura tener éxito. Descargar ciertos archivos puede tomar mucho tiempo. Aviso que estamos usando`ninja` para compilar Electron no hay `Makefile` generado.

```bash
$ cd Electronico $./script/bootstrap.py - v
```

### Cruz de compilación

Si usted quiere compilar para un objetivo de `arm` también debe instalar las siguientes dependencias:

```bash
$ sudo apt-get instala libc6-dev-armhf-cross linux-libc-dev-armhf-Cruz \ g ++-arm-linux-gnueabihf
```

Y para cruzar la compilación para objetivos `arm` o `ia32`, debe pasar el `--target_arch` parámetro al script `bootstrap.py`:

```bash
$./script/bootstrap.py - v--target_arch = brazo
```

## Edificio

Si desea compilar metas `Release` y `Debug`:

```bash
$./script/build.py
```

Este script hará que un Electron muy grande ejecutable en el directorio `out/R`. El tamaño del archivo es superior a 1,3 gigabytes. Esto sucede porque el objetivo de lanzamiento binario contiene símbolos de depuración. Para reducir el tamaño del archivo, ejecute el script `create-dist.py`:

```bash
$./script/create-dist.py
```

Esto pondrá una distribución del trabajo con mucho menor tamaño de archivo en el directorio `dist`. Después de ejecutar el script de crear dist.py, puede que desee quitar el 1.3 + gigabyte binario que todavía está en `out/R`.

También puede crear el objetivo de `Debug` solamente:

```bash
$./script/build.py - c D
```

Después de edificio, usted puede encontrar la depuración `electron` binario bajo `out/D`.

## Limpieza

Para limpiar los archivos de la compilación:

```bash
$ MNP correr limpio
```

Limpiar sólo los directorios `out` y `dist`:

```bash
$ MNP ejecutar limpieza y construcción
```

**Note:** que ambos comandos limpiamos requieren corriente `bootstrap` antes de edificio.

## Problemas

### Error al cargar Shared bibliotecas: libtinfo.so.5

Prebulit `clang` a intentar vincular a `libtinfo.so.5`. Dependiendo de la arquitectura del host, enlace simbólico a `libncurses` adecuados:

```bash
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Pruebas de

Ver Resumen de sistema de [Build: Tests](build-system-overview.md#tests)

## Temas avanzados

El valor predeterminado configuración de construcción destinado a principales distribuciones de Linux desktop, para una distribución específica o dispositivo, la siguiente información puede ayudarle.

### Edificio `libchromiumcontent` local

Para evitar el uso de los binarios pre-compilados de la `libchromiumcontent`, puede pasar el `--build_libchromiumcontent` interruptor `bootstrap.py` script:

```bash
$./script/bootstrap.py - v--build_libchromiumcontent
```

Tenga en cuenta que por defecto no se construye la configuración de `shared_library`, por lo que sólo se puede compilar `Release` versión del Electron Si utilizas este modo:

```bash
$./script/build.py - c R
```

### Uso de sistema `clang` en lugar de binarios descargado `clang`

Por defecto el Electron está construido con binarios precompilados `clang` proporcionados de cromo. Si por alguna razón quiere compilar con el `clang` instalado en su sistema, puede llamar al `bootstrap.py` con ` - clang_dir = interruptor de<path>`. Aprobando el build script asumirá que los binarios de `clang` residen en `<path>/bin/`.

Por ejemplo Si instalaste `clang` en `/usuario/local/bin/clang`:

```bash
$./script/bootstrap.py - v--build_libchromiumcontent--clang_dir/usr/local $./script/build.py - c R
```

### Usar otros compiladores que no sean `clang`

Compilar Electron con compiladores como `g ++`, primera necesidad para desactivar el `clang` con ` - disable_clang` interruptor primero y luego establecer variables de entorno `CC` y `CXX` a los que desee.

Edificio por ejemplo con cadena de herramientas GCC:

```bash
env $ CC = gcc CXX = g ++./script/bootstrap.py - v--build_libchromiumcontent--disable_clang $./script/build.py - c R
```

### Variables de entorno

Aparte de `CC` y `CXX`, también puede establecer siguiendo las variables de entorno a la aduana las configuraciones del edificio:

* `CPPFLAGS`
* `CPPFLAGS_host`
* `CFLAGS`
* `CFLAGS_host`
* `CXXFLAGS`
* `CXXFLAGS_host`
* `Ar`
* `AR_host`
* `CC`
* `CC_host`
* `CXX`
* `CXX_host`
* `LDFLAGS`

Las variables de entorno es necesario cuando se ejecuta el script de `bootstrap.py`, no funciona en el script de `build.py`.