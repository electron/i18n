# Посібник з Snapcraft (Центр програмного забезпечення Ubuntu & Більше)

Цей посібник надає інформацію про те, як упакувати ваш додаток Electron для будь-якого середовища створення знімків, включаючи Ubuntu Software Center.

## Фон і вимоги

Разом з ширшою спільнотою Linux Канонічні цілі виправити багато з типових проблем інсталяції програмного забезпечення з проектом [`знімком`](https://snapcraft.io/) . Snaps є контейнеразованими програмними пакетами, які включають обов’язкові залежності, автоматичне оновлення та роботу над усіма основними дистрибуціями Linux без зміни системи.

Існує три способи створення `.snap` файлу:

1) Using [`electron-forge`][electron-forge] or [`electron-builder`][electron-builder], both tools that come with `snap` support out of the box. Це найпростіший варіант. 2) Використання `electron-installer-snap`, який приймає `electron-packager`на виході. 3) Використовуючи вже створений пакет `.deb`.

У деяких випадках, вам потрібно буде встановити інструмент `snapcraft`. Інструкції щодо встановлення `знімок` для вашого конкретного розповсюдження доступні [тут](https://snapcraft.io/docs/installing-snapcraft).

## Використання `electron-installer-snap`

The module works like [`electron-winstaller`][electron-winstaller] and similar modules in that its scope is limited to building snap packages. Ви можете встановити це так:

```sh
установка npm - save-dev electron-installer-snap
```

### Крок 1: Пакетуйте вашу програму Electron

Package the application using [electron-packager][electron-packager] (or a similar tool). Переконайтеся, що ви не потребуєте `node_modules` , в останньому застосуванні оскільки жоден з модулів вам насправді не потрібно збільшувати розмір вашого додатка.

Результат повинен виглядати приблизно так:

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

### Крок 2: Запуск `electron-installer-ap`

З терміналу що має `знімок` в своєму `PATH`, виконати `electron-installer-snap` з єдиним обов'язковим параметром `--src`, це розташування вашого упакованого додатка Electron створено на першому кроці.

```sh
npx electron-installer-snap --src=out/myappname-linux-64
```

Якщо у вас наявний збірний конвеєр, ви можете використовувати `electron-installer-snap` програмно. For more information, see the [Snapcraft API docs][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap у ${snapPath}!`))
```

## Using `snapcraft` with `electron-packager`

### Step 1: Create Sample Snapcraft Project

Create your project directory and add add the following to `snap/snapcraft.yaml`:

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

## Використання існуючого пакунку Debian

Snapcraft здатний приймати наявний файл `.deb` і перетворити його на файл `.snap` файл. Створення прив'язки налаштоване за допомогою `знімка. aml` файл який описує джерела, залежності, опис та інші ядро блоки.

### Крок 1: Створити пакет Debian

Якщо у вас ще немає пакета `.deb` , використовуючи `electron-installer-snap` може бути більш простим шляхом для створення пакетів обрізки. Однак, існує декілька рішень для створення Debian пакетів, включаючи [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] або [`electron-installer-debian`][electron-installer-debian].

### Крок 2: Створити snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Let's look at an example:

```yaml
назва: myApp
версія: '2.0.0'
підсумова: невеликий опис для додатка.
опис: |
 Знаєте що? Дивовижний додаток! Це робить усі значення
 для вас. Дехто говорить, що ви доглядаєте молоді, можливо, навіть щасливі.

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
    навколишнє середовище:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$ > /dev/null 2>&1 &
```

Крім того, якщо ви створюєте `прив'язку` з `обмеженням` , ви можете використати команду `на стільниці-запуску`:

```yaml
додатки:
  myApp:
    # Виправляти шлях TMPDIR для Chromium Framework/Electron для забезпечення
    # libappindicator з читабельними ресурсами.
    команда: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
