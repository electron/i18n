# Guía de Snapcraft (Ubuntu Software Center & Más)

Esta guía provee información sobre cómo empacar you aplicación en Electron para cualquier ambiente en Snapcraft, incluyendo el Centro de Software de Ubuntu.

## Antecedentes y Requerimientos

Juntos con las amplia comunidad de Linux, Canonical busca arreglar algunos de los problemas comúnes de instalación de software con [`snapcraft`](https://snapcraft.io/). Snaps son paquetes contenerizados de software que incluyen dependencias requeridas, auto-actualizaciones, y funcionan en las mayores distribuciones de Linux sin modificaciones del sistema.

Hay tres maneras de crear un archivo `.snap`:

1) Usando [`electron-forge`](https://github.com/electron-userland/electron-forge) o [`electron-builder`](https://github.com/electron-userland/electron-builder), ambas herramientas que vienen con soporte para `snap` incluido. Esta es la opción más fácil. 2) Usando `electron-installer-snap`, que toma el resultado de `electron-packager`. 3) Usando un paquete `.deb` ya creado.

En todos los casos. deberás de tener la herramienta `snapcraft` instalada. Te recomendamos desarrollar en Ubuntu 16.04 (o el actual LTS).

```sh
snap install snapcraft --classic
```

While it *is possible* to install `snapcraft` on macOS using Homebrew, it is not able to build `snap` packages and is focused on managing packages in the store.

## Using `electron-installer-snap`

The module works like [`electron-winstaller`](https://github.com/electron/windows-installer) and similar modules in that its scope is limited to building snap packages. You can install it with:

```sh
npm install --save-dev electron-installer-snap
```

### Paso 1: Empaqueta tu aplicación Electron

Package the application using [electron-packager](https://github.com/electron-userland/electron-packager) (or a similar tool). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

La salida debería verse más o menos de esta forma:

```text
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
        ├── natives_blob.bin
        ├── resources
        ├── snapshot_blob.bin
        └── version
```

### Step 2: Running `electron-installer-snap`

From a terminal that has `snapcraft` in its `PATH`, run `electron-installer-snap` with the only required parameter `--src`, which is the location of your packaged Electron application created in the first step.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

If you have an existing build pipeline, you can use `electron-installer-snap` programmatically. For more information, see the [Snapcraft API docs](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Usando un paquete de Debian existente

Snapcraft is capable of taking an existing `.deb` file and turning it into a `.snap` file. The creation of a snap is configured using a `snapcraft.yaml` file that describes the sources, dependencies, description, and other core building blocks.

### Paso 1: Crear un paquete Debian

Si aún no tienes listo un paquete `.deb`, usando `electron-installer-snap` podría ser una forma más fácil para crear el paquete instantáneo. Sin embargo, existen múltiples soluciones para la creación de paquetes de Debian, incluyendo [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) o [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### Paso 2: Creando un snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

```yaml
name: myApp
version: '2.0.0'
summary: A little description for the app.
description: |
 You know what? This app is amazing! It does all the things
 for you. Some say it keeps you young, maybe even happy.

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
      - libgconf2-4
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

Alternatively, if you're building your `snap` with `strict` confinement, you can use the `desktop-launch` command:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```