# Snapcraft Guide (Ubuntu Software Center & Больше)

В этом руководстве содержится информация о том, как установить пакет приложения Electron для любой среды Snapcraft, включая программный центр Ubuntu.

## Предыстория и требования

Вместе с более широким сообществом Linux. Canonical стремится исправить многие из общих проблем с установкой программного обеспечения в проекте [`snapcraft`](https://snapcraft.io/) . Snaps - это пакеты, содержащие необходимые зависимости, автообновление и работу со всеми основными дистрибутивами Linux без системных изменений.

Есть три способа создать файл `.snap`:

1) Использование [`electron-forge`][electron-forge] или [`electron-builder`][electron-builder], оба инструмента, которые `snap` с поддержкой из коробки. Это самый простой вариант. 2) Использование `Электрон-инсталлятор-привязка`, что требует `электро-пакетирования`в выход. 3) Использование уже созданного пакета `.deb`.

В некоторых случаях вам нужно установить инструмент `snapcraft`. Инструкции по установке `snapcraft` для вашего конкретного дистрибутива доступны [здесь](https://snapcraft.io/docs/installing-snapcraft).

## Использование `Электрон-инсталлятор-привязка`

Модуль работает как [`electron-winstaller`][electron-winstaller] и аналогичные модулей в том, что его область охвата ограничивается созданием пакетов оснастки. Вы можете установить его с:

```sh
npm install --save-dev electron-installer-snap
```

### 1 Шаг: Упакуйте ваше приложение

Пакет приложения с использованием [-][electron-packager] (или аналогичного инструмента). Убедитесь, что вы удалите `node_modules` , которые вам не нужны в вашем окончательном приложении, так как ни один из модулей вам не нужен, увеличит размер вашего приложения.

Консольный вывод должен иметь примерный вид:

```plaintext
.
└"dist
    └"приложение-linux-x64
        ├ " LICENSE
        ├" LICENSES.chromium.html
        ├ "content_shell.pak
        ├" приложение  ├
        ├ icudtl.dat
        ├ libgcrypt.so.so.11
        ├ "libnode.so
        ├"
        ├ "ресурсы
        ├" v8_context_snapshot.bin
        └ "версия"
```

### Шаг 2: Запуск `электрон-installer-snap`

С терминала, который имеет `snapcraft` в `PATH`, запустить `electron-installer-snap` с единственным требуемым параметром `--src`, , которое является местоположением вашего упакованного приложения Electron, созданного на первом шаге.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Если у вас есть существующий трубопровод сборки, вы можете использовать `Электрон-installer-snap` программно. Для получения дополнительной информации см. [документы Snapcraft API][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Использование `snapcraft` с `electron-packager`

### Шаг 1: Создать образец Snapcraft проекта

Создайте каталог проектов и добавьте в `snap/snapcraft.yaml`:

```yaml
имя: electron-packager-hello-world
версия: '0.1'
резюме: Hello World Electron приложение
описание: |
  Простое приложение Hello World Electron в качестве примера базы
: core18
confinement: строгий класс
: стабильные приложения

:
  электрон-packager-hello-world:
    command: electron-quick-start/electron-quick-start --no-sandbox
    : [gnome-3-34]
    штепсельные вилки:
    - поддержка браузера
    - сеть
    - сетевое связывание
    окружающей среды:
      - Исправь путь TMPDIR для Chromium Framework/Electron, чтобы обеспечить
      и libappindicator читаемые ресурсы.
      TMPDIR: $XDG_RUNTIME_DIR

части:
  электрон-быстрый старт:
    плагин: ноль
    источник: https://github.com/electron/electron-quick-start.git
    override-build: |
        npm установите электронный электрон-
        npx электрон-packager. --перенапись --платформа-linux --выход-выпуск-сборка --prune-true
        cp -rv ./electron-quick-start-linux-' $SNAPCRAFT_PART_INSTALL/electron-quick-start
    build-snaps:
    - узел/14/стабильный
    сборки пакетов:
    - unzip
    stage-packages:
    - libnss3
    - libnspr4
```

Если вы хотите применить этот пример к существующему проекту:

- Замените `source: https://github.com/electron/electron-quick-start.git` на `source: .`.
- Замените все экземпляры `electron-quick-start` на название проекта.

### Шаг 2: Создайте оснастки

```sh
$ snapcraft

<output snipped>
Snapped электрон-packager-привет-world_0.1'amd64.snap
```

### Шаг 3: Установите оснастки

```sh
sudo оснастки установить электрон-packager-привет-world_0.1'amd64.snap --опасный
```

### Шаг 4: Вы запустите оснастки

```sh
электрон-packager-привет-мир
```

## Использование существующего пакета Debian

Snapcraft способен взять существующий файл `.deb` и превратить его в `.snap` файл. Создание привязки настроено с использованием файла `snapcraft.yaml` , описывая источники, зависимости, описание и другие основные блоков.

### Шаг 1: Создание пакета Debian

Если у вас еще нет пакета `.deb` , то с помощью `electron-installer-snap` может быть проще создать пакеты snap. Тем не менее, существует решений для создания пакетов Debian, включая [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] или [`electron-installer-debian`][electron-installer-debian].

### Шаг 2: Создайте snapcraft.yaml

Для получения дополнительной информации о доступных вариантах конфигурации см. [документации по синтаксису snapcraft][snapcraft-syntax]. Рассмотрим пример:

```yaml
имя:
версия myApp: '2.0.0'
сводка: немного описание приложения.
описание: |
 Вы знаете, что? Это приложение замечательно! Это делает все
 для вас. Некоторые говорят, что держит вас молодой, может даже счастливый.

класс: стабильный
заключение: классические

частей:
  слабину:
    плагин: свалка
    источник: my-deb.deb
    исходный тип: deb
    after:
      - desktop-gtk3
    stage-packages:
      - libasound2sound
      - libnotify 4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  электронный запуск:
    плагин: dump
    источник: файлы /
    подготовьтесь: |
      chmod x bin/electron-launch

apps:
  myApp:
    command: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    desktop: usr/share/applications/myApp.desktop
    - Correct TMPDIR путь для Chromium Framework/Electron для обеспечения
    - libappindicator имеет читаемые ресурсы.
    окружение:
      TMPDIR: $XDG_RUNTIME_DIR
```

Как вы можете видеть, `snapcraft.yaml` инструктирует систему для запуска файла, называется `electron-launch`. В этом примере он передает информацию в приложения:

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
