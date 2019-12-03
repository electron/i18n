# Установка

Чтобы установить скомпилированный Electron, используй [`npm`](https://docs.npmjs.com). Предпочитаемый метод установки как зависимости в приложении:

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

## Полномочия

If you need to use an HTTP proxy, you need to set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Node 10 and above](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Before Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Пользовательские зеркала и кэши

During installation, the `electron` module will call out to [`@electron/get`](https://github.com/electron/get) to download prebuilt binaries of Electron for your platform. если она указана в списке релиза (`https://github.com/electron/electron/releases/tag/v$VERSION`, где `$VERSION` — версия Electron).

Если доступа к GitHub нет или нужна другая сборка, можно задать зеркало или папку кеша.

#### Зеркало

Можно использовать переменную окружения, чтобы переопределить базовый URL, по которому ищутся бинарники или имена файлов. URL для `electron-download` выглядит таким образом:

```plaintext
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

На примере с зеркалом Китая:

```plaintext
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

#### Кеш

Кроме того, можно заменить локальный кеш. `electron-download` скачивает файлы в кеш, чтобы снизить нагрузку на сеть. Папку с кешем можно использовать для кастомных сборок или, чтобы полностью избежать сетевого трафика.

* Linux: `$XDG_CACHE_HOME` или `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` или `~/AppData/Local/electron/Cache/`

В старом Electron возможно использование папки `~/.electron`.

You can also override the local cache location by providing a `electron_config_cache` environment variable.

Кеш состоит из файлов zip для каждой версии с файлами контрольных сумм в текстовом формате. Например:

```sh
├── electron-v1.7.9-darwin-x64.zip
├── electron-v1.8.1-darwin-x64.zip
├── electron-v1.8.2-beta.1-darwin-x64.zip
├── electron-v1.8.2-beta.2-darwin-x64.zip
├── electron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## Skip binary download

When installing the `electron` NPM package, it automatically downloads the electron binary.

This can sometimes be unnecessary, e.g. in a CI environment, when testing another component.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. E.g.:

```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## Устранение проблем

При выполнении команды `npm install electron`, некоторые пользователи сталкиваются с проблемами установки.

В большинстве случаев, эти ошибки являются результатом проблем сети и не связаны с npm пакетом `electron`. Такие ошибки, как `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` и`ETIMEDOUT` возникают в результате проблем с сетью. Лучшее решение - попытаться переключить сеть, или немного подождать, и попытаться установить снова.

Также вы можете попытаться скачать Electron непосредственно из [релизов](https://github.com/electron/electron/releases), если установка через `npm` терпит неудачу.

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