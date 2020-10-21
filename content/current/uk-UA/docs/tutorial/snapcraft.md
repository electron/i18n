# Посібник з Snapcraft (Центр програмного забезпечення Ubuntu & Більше)

Цей посібник надає інформацію про те, як упакувати ваш додаток Electron для будь-якого середовища створення знімків, включаючи Ubuntu Software Center.

## Фон і вимоги

Разом з ширшою спільнотою Linux Канонічні цілі виправити багато з типових проблем інсталяції програмного забезпечення з проектом [`знімком`](https://snapcraft.io/) . Snaps є контейнеразованими програмними пакетами, які включають обов’язкові залежності, автоматичне оновлення та роботу над усіма основними дистрибуціями Linux без зміни системи.

Існує три способи створення `.snap` файлу:

1) Використання [`electron-forge`](https://github.com/electron-userland/electron-forge) або [`electron-builder`](https://github.com/electron-userland/electron-builder), обидва інструменти, які приходять за допомогою `прив'язки` підтримує зі сторони коробки. Це найпростіший варіант. 2) Використання `electron-installer-snap`, який приймає `electron-packager`на виході. 3) Використовуючи вже створений пакет `.deb`.

У деяких випадках, вам потрібно буде встановити інструмент `snapcraft`. Інструкції щодо встановлення `знімок` для вашого конкретного розповсюдження доступні [тут](https://snapcraft.io/docs/installing-snapcraft).

## Використання `electron-installer-snap`

Модуль працює як [`electron-winstaller`](https://github.com/electron/windows-installer) і аналогічні модулі, які об'єм використовуються. Ви можете встановити це так:

```sh
установка npm - save-dev electron-installer-snap
```

### Крок 1: Пакетуйте вашу програму Electron

Пакетуйте програму за допомогою [electron-packager](https://github.com/electron/electron-packager) (або подібного інструменту). Переконайтеся, що ви не потребуєте `node_modules` , в останньому застосуванні оскільки жоден з модулів вам насправді не потрібно збільшувати розмір вашого додатка.

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

Якщо у вас наявний збірний конвеєр, ви можете використовувати `electron-installer-snap` програмно. Для отримання додаткової інформації дивіться документацію [Знімка API](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap у ${snapPath}!`))
```

## Використання існуючого пакунку Debian

Snapcraft здатний приймати наявний файл `.deb` і перетворити його на файл `.snap` файл. Створення прив'язки налаштоване за допомогою `знімка. aml` файл який описує джерела, залежності, опис та інші ядро блоки.

### Крок 1: Створити пакет Debian

Якщо у вас ще немає пакета `.deb` , використовуючи `electron-installer-snap` може бути більш простим шляхом для створення пакетів обрізки. Однак, існує декілька рішень для створення Debian пакетів, включаючи [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) або [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### Крок 2: Створити snapcraft.yaml

Для отримання додаткової інформації про доступні опції конфігурації, дивіться документацію[на синтаксисі snapcraft](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

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
