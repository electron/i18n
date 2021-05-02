# Guía de Snapcraft (Ubuntu Software Center & Más)

Esta guía provee información sobre cómo empacar you aplicación en Electron para cualquier ambiente en Snapcraft, incluyendo el Centro de Software de Ubuntu.

## Antecedentes y Requerimientos

Juntos con las amplia comunidad de Linux, Canonical busca arreglar algunos de los problemas comúnes de instalación de software con [`snapcraft`](https://snapcraft.io/). Snaps son paquetes contenerizados de software que incluyen dependencias requeridas, auto-actualizaciones, y funcionan en las mayores distribuciones de Linux sin modificaciones del sistema.

Hay tres maneras de crear un archivo `.snap`:

1) Usando [`electron-forge`][electron-forge] o  [`electron-builder`][electron-builder], ambas herramientas que vienen con soporte para `snap` incluido. Esta es la opción más fácil. 2) Usando `electron-installer-snap`, que toma el resultado de `electron-packager`. 3) Usando un paquete `.deb` ya creado.

En algunos casos, deberás tener instalada la herramienta `Snapcraft`. Las instrucciones para instalar `snapcraft` para tu distribución particular están disponibles [aquí](https://snapcraft.io/docs/installing-snapcraft).

## Usando `electron-installer-snap`

El módulo trabaja como [`electron-winstaller`][electron-winstaller] y módulos similares en este ámbito está limitado para construir paquetes snap. Puede instalarlo con:

```sh
npm install --save-dev electron-installer-snap
```

### Paso 1: Empaqueta tu aplicación Electron

Empaquetar la aplicación usando [electron-packager][electron-packager] (o una herramienta similar). Asegúrese de eliminar los `node_modules` que no necesita en su aplicación final, ya que cualquier módulo que actualmente no necesite aumentará el tamaño de su aplicación.

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

Si tiene un pipeline de construcción existente, puede usar `electron-installer-snap` programáticamente. Para más información, ver el [Snapcraft API docs][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Usar `snapcraft` con `electron-packager`

### Paso 1: Crear proyecto de Snapcraft de Ejemplo

Crea el directorio de tu proyecto y agrega lo siguiente al `snap/snapcraft.yaml`:

```yaml
name: electron-packager-hello-world
version: '0.1'
summary: Hello World Electron app
description: |
  Simple Hello World Electron app as an example
base: core18
confinement: strict
grade: stable

apps:
  electron-packager-hello-world:
    command: electron-quick-start/electron-quick-start --no-sandbox
    extensions: [gnome-3-34]
    plugs:
    - browser-support
    - network
    - network-bind
    environment:
      # Correct the TMPDIR path for Chromium Framework/Electron to ensure
      # libappindicator has readable resources.
      TMPDIR: $XDG_RUNTIME_DIR

parts:
  electron-quick-start:
    plugin: nil
    source: https://github.com/electron/electron-quick-start.git
    override-build: |
        npm install electron electron-packager
        npx electron-packager . --overwrite --platform=linux --output=release-build --prune=true
        cp -rv ./electron-quick-start-linux-* $SNAPCRAFT_PART_INSTALL/electron-quick-start
    build-snaps:
    - node/14/stable
    build-packages:
    - unzip
    stage-packages:
    - libnss3
    - libnspr4
```

Si quiere aplicar este ejemplo a un proyecto existente:

- Reemplace `source: https://github.com/electron/electron-quick-start.git` con `source: .`.
- Reemplace todas las instancias de `electron-quick-start` con el nombre de su proyecto.

### Paso 2: Construye el snap

```sh
$ snapcraft

<output snipped>
Snapped electron-packager-hello-world_0.1_amd64.snap
```

### Paso 3: Instalar el snap

```sh
sudo snap install electron-packager-hello-world_0.1_amd64.snap --dangerous
```

### Paso 4: Ejecutar el snap

```sh
electron-packager-hello-world
```

## Usando un paquete de Debian existente

Snapcraft es capaz de tomar un archivo `.deb` existente y convertirlo en un archivo `.snap`. La creación de un a snap es configurado usando un archivo `snapcraft.yaml` que describe las fuentes, dependencias, descripción y otros bloques de construcción.

### Paso 1: Crear un paquete Debian

Si aún no tienes listo un paquete `.deb`, usando `electron-installer-snap` podría ser una forma más fácil para crear el paquete instantáneo. Sin embargo, existen múltiples soluciones para la creación de paquetes de Debian, incluyendo [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] o [`electron-installer-debian`][electron-installer-debian].

### Paso 2: Creando un snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Veamos un ejemplo:

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
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
