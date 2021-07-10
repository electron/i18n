# Snapcraft Guide (Ubuntu Software Center & Больше)

В этом руководстве содержится информация о том, как установить пакет приложения Electron для любой среды Snapcraft, включая программный центр Ubuntu.

## Предыстория и требования

Вместе с более широким сообществом Linux. Canonical стремится исправить многие из общих проблем с установкой программного обеспечения в проекте [`snapcraft`](https://snapcraft.io/) . Snaps - это пакеты, содержащие необходимые зависимости, автообновление и работу со всеми основными дистрибутивами Linux без системных изменений.

Есть три способа создать файл `.snap`:

1) Using [`electron-forge`][electron-forge] or [`electron-builder`][electron-builder], both tools that come with `snap` support out of the box. Это самый простой вариант. 2) Использование `Электрон-инсталлятор-привязка`, что требует `электро-пакетирования`в выход. 3) Использование уже созданного пакета `.deb`.

В некоторых случаях вам нужно установить инструмент `snapcraft`. Инструкции по установке `snapcraft` для вашего конкретного дистрибутива доступны [здесь](https://snapcraft.io/docs/installing-snapcraft).

## Использование `electron-installer-snap`

The module works like [`electron-winstaller`][electron-winstaller] and similar modules in that its scope is limited to building snap packages. Вы можете установить его с:

```sh
npm install --save-dev electron-installer-snap
```

### 1 Шаг: Упакуйте ваше приложение

Package the application using [electron-packager][electron-packager] (or a similar tool). Убедитесь, что вы удалите `node_modules` , которые вам не нужны в вашем окончательном приложении, так как ни один из модулей вам не нужен, увеличит размер вашего приложения.

Консольный вывод должен иметь примерный вид:

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

### Шаг 2: Запуск `электрон-installer-snap`

С терминала, который имеет `snapcraft` в `PATH`, запустить `electron-installer-snap` с единственным требуемым параметром `--src`, , которое является местоположением вашего упакованного приложения Electron, созданного на первом шаге.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Если у вас есть существующий трубопровод сборки, вы можете использовать `Электрон-installer-snap` программно. For more information, see the [Snapcraft API docs][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Using `snapcraft` with `electron-packager`

### Step 1: Create Sample Snapcraft Project

Create your project directory and add the following to `snap/snapcraft.yaml`:

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

If you want to apply this example to an existing project:

- Replace `source: https://github.com/electron/electron-quick-start.git` with `source: .`.
- Replace all instances of `electron-quick-start` with your project's name.

### Step 2: Build the snap

```sh
$ snapcraft

<output snipped>
Snapped electron-packager-hello-world_0.1_amd64.snap
```

### Step 3: Install the snap

```sh
sudo snap install electron-packager-hello-world_0.1_amd64.snap --dangerous
```

### Step 4: Run the snap

```sh
electron-packager-hello-world
```

## Использование существующего пакета Debian

Snapcraft способен взять существующий файл `.deb` и превратить его в `.snap` файл. The creation of a snap is configured using a `snapcraft.yaml` file that describes the sources, dependencies, description, and other core building blocks.

### Шаг 1: Создание пакета Debian

Если у вас еще нет пакета `.deb` , то с помощью `electron-installer-snap` может быть проще создать пакеты snap. However, multiple solutions for creating Debian packages exist, including [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] or [`electron-installer-debian`][electron-installer-debian].

### Шаг 2: Создайте snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Let's look at an example:

```yaml
имя:
версия myApp: '2.0.0'
сводка: немного описание приложения.
описание: |
 Вы знаете, что? Это приложение замечательно! Это делает все
 для вас. Некоторые говорят, что держит вас молодой, может даже счастливый.

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
    окружение:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Альтернативно, если вы построите `snap` с `строгим ограничением` , вы можете использовать `рабочий стол запуск` команда:

```yaml
apps:
  myApp:
    # Исправляйте TMPDIR путь для Chromium Framework/Electron, чтобы убедиться, что
    # libappindicator имеет доступные для чтения ресурсы.
    команда: ruv TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
