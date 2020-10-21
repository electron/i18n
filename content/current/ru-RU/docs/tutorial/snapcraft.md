# Snapcraft Guide (Ubuntu Software Center & Больше)

В этом руководстве содержится информация о том, как установить пакет приложения Electron для любой среды Snapcraft, включая программный центр Ubuntu.

## Предыстория и требования

Вместе с более широким сообществом Linux. Canonical стремится исправить многие из общих проблем с установкой программного обеспечения в проекте [`snapcraft`](https://snapcraft.io/) . Snaps - это пакеты, содержащие необходимые зависимости, автообновление и работу со всеми основными дистрибутивами Linux без системных изменений.

Есть три способа создать файл `.snap`:

1) Используя [`Электронная кузница`](https://github.com/electron-userland/electron-forge) или [`Электро-строитель`](https://github.com/electron-userland/electron-builder), оба инструмента, которые поставляются с `привязкой` поддержки из коробки. Это самый простой вариант. 2) Использование `Электрон-инсталлятор-привязка`, что требует `электро-пакетирования`в выход. 3) Использование уже созданного пакета `.deb`.

В некоторых случаях вам нужно установить инструмент `snapcraft`. Инструкции по установке `snapcraft` для вашего конкретного дистрибутива доступны [здесь](https://snapcraft.io/docs/installing-snapcraft).

## Использование `Электрон-инсталлятор-привязка`

Модуль работает как [`Электрон-инсталлятор`](https://github.com/electron/windows-installer) и похожий модули, так как его область действия ограничена построением пакетов Snap. Вы можете установить его с:

```sh
npm install --save-dev electron-installer-snap
```

### 1 Шаг: Упакуйте ваше приложение

Package the application using [electron-packager](https://github.com/electron/electron-packager) (or a similar tool). Удостоверьтесь, что вы удалили `node_modules`, которые не понадобятся вам в финальной версии приложения, так как любой неиспользуемый модуль в конечном счете увеличит размер вашего приложения.

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

С терминала, который имеет `snapcraft` в `PATH`, запустить `electron-installer-snap` с единственным требуемым параметром `--src`, которое является местоположением вашего упакованного приложения Electron, созданного на первом шаге.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Если у вас есть существующий трубопровод сборки, вы можете использовать `Электрон-installer-snap` программно. Для получения дополнительной информации обратитесь к [Snapcraft API](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Использование существующего пакета Debian

Snapcraft способен взять существующий файл `.deb` и превратить его в `.snap` файл. The creation of a snap is configured using a `snapcraft.yaml` file that describes the sources, dependencies, description, and other core building blocks.

### Шаг 1: Создание пакета Debian

Если у вас еще нет пакета `.deb` , то с помощью `electron-installer-snap` может быть проще создать пакеты snap. Тем не менее, существует несколько решений для создания пакетов Debian, включая [`electron-forge`](https://github.com/electron-userland/electron-forge), [`Электрон-строитель`](https://github.com/electron-userland/electron-builder) или [`Электрон-installer-debian`](https://github.com/unindented/electron-installer-debian).

### Шаг 2: Создайте snapcraft.yaml

Дополнительную информацию о доступных параметрах конфигурации см. в документации [по синтаксису snapcraft](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

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
