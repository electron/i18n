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

## Прокси

Если нужны HTTP прокси, то можно [задать переменные окружения](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Пользовательские зеркала и кеши

Во время установки модуль `electron` будет обращаться к [`electron-download`](https://github.com/electron-userland/electron-download), чтобы загрузить скомпилированные бинарники для твоей платформы, если она указана в списке релиза (`https://github.com/electron/electron/releases/tag/v$VERSION`, где `$VERSION` — версия Electron).

Если доступа к GitHub нет или нужна другая сборка, можно задать зеркало или папку кеша.

#### Зеркало

Можно использовать переменную окружения, чтобы переопределить базовый URL, по которому ищутся бинарники или имена файлов. URL для `electron-download` выглядит таким образом:

```txt
url = ссылка + папка + '/' + название файла
```

Например, китайское зеркало:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Кеш

Кроме того, можно заменить локальный кеш. `electron-download` скачивает файлы в кеш, чтобы снизить нагрузку на сеть. Папку с кешем можно использовать для кастомных сборок или, чтобы полностью избежать сетевого трафика.

* Linux: `$XDG_CACHE_HOME` или `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

On environments that have been using older versions of Electron, you might find the cache also in `~/.electron`.

You can also override the local cache location by providing a `ELECTRON_CACHE` environment variable.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

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

## Устранение проблем

При выполнении команды `npm install electron`, некоторые пользователи сталкиваются с проблемами установки.

В большинстве случаев, эти ошибки являются результатом проблем сети и не связаны с npm пакетом `electron`. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. Лучшим решением в данном случае будет попытка подключения к другой сети или просто немного подождите, возможно это временное явление.

Также вы можете попытаться скачать электронов непосредственно из [электронов/электронный/релизы](https://github.com/electron/electron/releases), если установка через `npm` терпит неудачу.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.