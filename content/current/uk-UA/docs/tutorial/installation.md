# Встановлення

Щоб встановити попередньо побудовані Electron binaries, використовуйте [`npm`](https://docs.npmjs.com). Рекомендований метод - встановити Electron як залежність від розробки в вашому додатку:

```sh
npm install electron --save-dev
```

Дивіться [Electron versioning doc](./electron-versioning.md) для отримання інформації про те, як керувати версіями Electron у ваших програмах.

## Глобальне встановлення

Ви також можете встановити комадну `electron` глобально в `$PATH`:

```sh
npm install electron -g
```

## Кастомізація

Якщо ви хочете змінити архітектуру, що завантажується (наприклад, `ia32` на машині `x64` ), ви можете використовувати прапор `--arch` з встановленим npm або встановити `npm_config_arch` змінною середовища:

```shell
npm install --arch=ia32 electron
```

На додаток до зміни архітектури, ви можете також вказати платформу (наприклад, `win32`, `linux`, і т.п.) використовуючи прапор `--platform`:

```shell
npm install --platform=win32 electron
```

## Проксі

Якщо вам потрібно використовувати HTTP-проксі, вам потрібно встановити `змінну ELECTRON_GET_USE_PROXY` будь-якому значенні плюс додаткові змінні оточення в залежності від версії вузла системи хоста:

* [Вузол 10 і вище](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [До вузла 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Користувацькі Дзеркала та Кеш
Під час установки, модуль `електрон` викличе на [`@electron/get`](https://github.com/electron/get) , щоб завантажити попередньо збудовані файли Electron для вашої платформи. Це буде так, звернувшись до сторінки завантаження релізів GitHub, (`https://github. om/electron/electron/releases/tag/v$VERSION` , де `$VERSION` - це точна версія Electron).

Якщо ви не можете отримати доступ до GitHub, або ви повинні надати користувацьку збірку, ви можете зробити це або шляхом надання дзеркала, або існуючої папки кешу.

#### Дзеркало
Ви можете використовувати змінні середовища для перевизначення базової URL-адреси, шляху, за яким шукати двійкові файли Electron та бінарне ім'я файлу. URL-адреса, яка використовується `@electron/get` складається наступним чином:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Наприклад, щоб використовувати Китайське дзеркало CDN:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

За замовчуванням `ELECTRON_CUSTOM_DIR` встановлено на `v$VERSION`. Щоб змінити формат, використовуйте поле `{{ version }}` наповнювача. Наприклад, `версія -{{ version }}` вирішує `version-5.0.`, `{{ version }}` вирішено до `5.0.`, та `в{{ version }}` є еквівалентним до значення за замовчуванням. Як більш конкретний приклад, щоб використовувати китайське не дзеркало без CDN:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}
```

Наведені вище налаштування завантажаться з таких URL-адрес, як `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Кеш
Крім того, можна перевизначити локальний кеш. `@electron/get` кешуватиме завантажені файли в локальному каталозі, щоб не підкреслити вашу мережу. Ви можете використовувати цю кеш-папку для надання користувальницьких збірок Electron або щоб уникнути створення контакту з мережею взагалі.

* Linux: `$XDG_CACHE_HOME` або `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

На середовищах, які використовують старіші версії Electron, ви можете також знайти кеш `~/.electron`.

Ви також можете змінити локальне кешування, забезпечивши `electron_config_cache` змінну середовища.

Кеш містить офіційний zip-файл версії та контрольну суму, що зберігається як текстовий файл. Типовий кеш може виглядати наступним чином:

```sh
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
│   └── electron-v1.7.9-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64.zip
│   └── electron-v1.8.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
│   └── electron-v1.8.2-beta.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
│   └── electron-v1.8.2-beta.2-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64.zip
│   └── electron-v1.8.2-beta.3-darwin-x64.zip
└── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    └── SHASUMS256.txt
```

## Пропустити двійкове завантаження
Під час встановлення `електронного пакету` NPM він автоматично завантажує електронний двійковий.

Іноді це може бути необов'язково, наприклад, в середовищі CI, при тестуванні іншого компонента.

Щоб після завантаження бінарного файлу ви можете встановити всі параметри npm, ви можете встановити змінну середовища `ELECTRON_SKIP_BINARY_DOWNLOAD`. Наприклад:
```sh
Освітлення пропускної здатності при встановленні npm
```

## Виправлення Неполадок

Під час роботи `npm install electron`, деякі користувачі іноді стикаються з помилками встановлення.

У майже всіх випадках, ці помилки є результатом проблем з мережею, а не з npm пакетом `electron`. Такі помилки як `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` і `ETIMEDOUT` є показниками проблем з мережею. Найкраще рішення — спробувати змінити мережу або ж просто зачекати та спробувати встановити ще раз.

Ви також можете спробувати завантажити Electron прямо з [electron/electron/releases](https://github.com/electron/electron/releases) якщо не вдасться встановити через `npm`.

Якщо встановлення не вдалася з помилкою `EACCESS` , можливо, вам знадобиться [виправте ваші npm дозволи](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Якщо помилка зберігається в [небезпеці](https://docs.npmjs.com/misc/config#unsafe-perm) прапорець, можливо, має бути вірний:

```sh
sudo npm install electron --unsafe-perm=true
```

Щоб використовувати позначку `--verbose` для відображення прогресу завантаження:

```sh
npm install --verbose electron
```

Якщо вам потрібно примусово завантажити актив і файл SHASUM встановити `force_no_cache` змінну оточення на `true`.
