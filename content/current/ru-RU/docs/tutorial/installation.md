# Установка

Для установки предварительных бинарных файлов Electron используйте [`npm`](https://docs.npmjs.com). Предпочтительным методом является установка Electron в качестве зависимости для разработки в вашем приложении :

```sh
npm install electron --save-dev
```

Смотри [документацию к версиям Electron](./electron-versioning.md), чтобы узнать, как управлять версиями Electron в приложении.

## Глобальная установка

Ты можешь установить команду `electron` в переменной окружения `$PATH`:

```sh
npm install electron -g
```

## Настройка

Если хочешь изменить архитектуру загружаемого контента (например, `i32` на компьютере с `x64`), можно использовать аргумент `--arch` при установке или использовать переменную окружения `npm_config_arch`:

```shell
npm install --arch=ia32 electron
```

Так же можно менять платформу приложения (например, `win32` или `linux`) при помощи аргумента `--platform`:

```shell
npm install --platform=win32 electron
```

## Прокси

Если вам нужно использовать HTTP-прокси, необходимо установить переменную `ELECTRON_GET_USE_PROXY` в любое значение , плюс дополнительные переменные окружения в зависимости от версии узла вашей системы:

* [Узел 10 и выше](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [До узла 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Пользовательские зеркала и кэши
Во время установки, модуль `Электрон` вызовет [`@electron/get`](https://github.com/electron/get) для загрузки готовых бинарных файлов Electron для вашей платформы. если она указана в списке релиза (`https://github.com/electron/electron/releases/tag/v$VERSION`, где `$VERSION` — версия Electron).

Если доступа к GitHub нет или нужна другая сборка, можно задать зеркало или папку кеша.

#### Зеркало
Можно использовать переменную окружения, чтобы переопределить базовый URL, по которому ищутся бинарники или имена файлов. URL-адрес, используемый `@electron/get` составлен следующим образом:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Например, использовать зеркало CDN в Китае:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

По умолчанию, `ELECTRON_CUSTOM_DIR` установлен в `v$VERSION` Чтобы изменить формат, используйте плейсхолдер `{{ version }}`. Например, `версия -{{ version }}` преобразуется в `версию-5.0.`, `{{ version }}` решит `5.0.`и `v{{ version }}` эквивалентны по умолчанию. В качестве более конкретного примера использовать не-CDN в Китае зеркало:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

Вышеприведенная конфигурация будет загружена с URL-адресов, таких как `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Кеш
Кроме того, можно заменить локальный кеш. `@electron/get` кэширует загруженных бинарных файлов в локальном каталоге, чтобы не стрессовать по сети. Папку с кешем можно использовать для кастомных сборок или, чтобы полностью избежать сетевого трафика.

* Linux: `$XDG_CACHE_HOME` или `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` или `~/AppData/Local/electron/Cache/`

В старом Electron возможно использование папки `~/.electron`.

Вы также можете переопределить местоположение локального кэша, указав переменную окружения `electron_config_cache` .

Кэш содержит официальный zip-файл версии и контрольную сумму, хранящуюся как текстовый файл. Типичный кэш может выглядеть следующим образом:

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

## Пропустить загрузку бинарных файлов
При установке `Электрона` пакета NPM автоматически загружается двоичный файл электрона.

Иногда это может быть ненужным, например, в среде CI при тестировании другого компонента.

Чтобы предотвратить загрузку бинарного файла при установке всех зависимостей npm, вы можете установить переменную окружения `ELECTRON_SKIP_BINARY_DOWNLOAD`. Например:
```sh
ELECTRON_SKIP_BINARY_DESCRIPTION
```

## Устранение проблем

При выполнении команды `npm install electron`, некоторые пользователи сталкиваются с проблемами установки.

В большинстве случаев, эти ошибки являются результатом проблем сети и не связаны с npm пакетом `electron`. Такие ошибки, как `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` и`ETIMEDOUT` возникают в результате проблем с сетью. Лучшее решение - попытаться переключить сеть, или немного подождать, и попытаться установить снова.

Также вы можете попытаться скачать Electron непосредственно из [electron/electron/releases](https://github.com/electron/electron/releases), если установка через `npm` терпит неудачу.

Если установка завершается с ошибкой `EACCESS`, нужно [поправить права npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Если ошибки не пропадают, можно использовать аргумент [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm):

```sh
sudo npm install electron --unsafe-perm=true
```

На слабой сети следует использовать аргумент `--verbose`, чтобы задействовать замедленную загрузку:

```sh
npm install --verbose electron
```

Если нужно перезагрузить файлы без кеша, нужно использовать переменную окружения `force_no_cache` = `true`.
