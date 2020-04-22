# Guía de Snapcraft (Ubuntu Software Center & Más)

Esta guía provee información sobre cómo empacar you aplicación en Electron para cualquier ambiente en Snapcraft, incluyendo el Centro de Software de Ubuntu.

## Antecedentes y Requerimientos

Juntos con las amplia comunidad de Linux, Canonical busca arreglar algunos de los problemas comúnes de instalación de software con [`snapcraft`](https://snapcraft.io/). Snaps son paquetes contenerizados de software que incluyen dependencias requeridas, auto-actualizaciones, y funcionan en las mayores distribuciones de Linux sin modificaciones del sistema.

Hay tres maneras de crear un archivo `.snap`:

1) Usando [`electron-forge`](https://github.com/electron-userland/electron-forge) o  [`electron-builder`](https://github.com/electron-userland/electron-builder), ambas herramientas que vienen con soporte para `snap` incluido. Esta es la opción más fácil. 2) Usando `electron-installer-snap`, que toma el resultado de `electron-packager`. 3) Usando un paquete `.deb` ya creado.

In all cases, you will need to have the `snapcraft` tool installed. We recommend building on Ubuntu 16.04 (or the current LTS).

```sh
snap install snapcraft --classic
```

Mientras que _is possible_ instalar `snapcraft` en macOS usando Homebrew, no es posible construir paquetes `snap` y esta enfocado en administrar paquetes de la tienda.

## Usando `electron-installer-snap`

El módulo trabaja como [`electron-winstaller`](https://github.com/electron/windows-installer) y módulos similares en este ámbito está limitado para construir paquetes snap. Puede instalarlo con:

```sh
npm install --save-dev electron-installer-snap
```

### Paso 1: Empaqueta tu aplicación Electron

Empaquetar la aplicación usando [electron-packager](https://github.com/electron/electron-packager) (o una herramienta similar). Asegúrese de eliminar los `node_modules` que no necesita en su aplicación final, ya que cualquier módulo que actualmente no necesite aumentará el tamaño de su aplicación.

La salida debería verse más o menos de esta forma:

```plaintext
.
└── dist
    └── app-linux-x64
        ├── LICENSE
        ├── LICENSES.chromium.html
        ├── content_shell.pak
        ├── app
        ├── icudtl.dat
        ├── libgcrypt.so.11
        ├── libnode.so
        ├── locales
        ├── resources
        ├── v8_context_snapshot.bin
        └── version
```

### Paso 2: Ejecutando `electron-installer-snap`

Desde una terminal que tenga `snapcraft` en su `PATH`, ejecute `electron-installer-snap` solo con el parámetro requerido `--src`, el cual es la ubicación de su aplicación empaquetada Electron que se creo en el primer paso.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Si tiene un pipeline de construcción existente, puede usar `electron-installer-snap` programáticamente. Para más información, ver el [Snapcraft API docs](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Usando un paquete de Debian existente

Snapcraft es capaz de tomar un archivo `.deb` existente y convertirlo en un archivo `.snap`. La creación de un a snap es configurado usando un archivo `snapcraft.yaml` que describe las fuentes, dependencias, descripción y otros bloques de construcción.

### Paso 1: Crear un paquete Debian

Si aún no tienes listo un paquete `.deb`, usando `electron-installer-snap` podría ser una forma más fácil para crear el paquete instantáneo. Sin embargo, existen múltiples soluciones para la creación de paquetes de Debian, incluyendo [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) o [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### Paso 2: Creando un snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

```yaml
name: myApp
version: '2.0.0'
summary: Una pequeña descripción de su aplicación.
description: |
 ¿Sábes qué? ¡Esta aplicación es asombrosa! Hace todas las cosas
 por vos. Algunos dicen que te mantiene joven, tal vez incluso feliz.

grade: stable
confinement: classic

parts:
  slack:
    plugin: dump
    source: my-deb.deb
    source-type: deb
    after:
      - desktop-gtk3
    stage-packages:
      - libasound2
      - libnotify4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  electron-launch:
    plugin: dump
    source: files/
    prepare: |
      chmod +x bin/electron-launch

apps:
  myApp:
    command: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    desktop: usr/share/applications/myApp.desktop
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Alternativamente, si esta construyendo su `snap` con aislamiento `strict`, puede usar el comando `desktop-launch`:

```yaml
apps:
  myApp:
    # Corrija la ruta de TMPDIR para que Chromium Framework/Electron se asegure que 
    # libappindicator puede leer los recursos.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```
