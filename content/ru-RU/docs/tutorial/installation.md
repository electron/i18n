# Установка

To install prebuilt Electron binaries, use [`npm`][npm]. Предпочтительным методом является установка Electron в качестве зависимости для разработки в вашем приложении :

```sh
npm install electron --save-dev
```

Смотри [документацию к версиям Electron][versioning], чтобы узнать, как управлять версиями Electron в приложении.

## Running Electron ad-hoc

If you're in a pinch and would prefer to not use `npm install` in your local project, you can also run Electron ad-hoc using the [`npx`][npx] command runner bundled with `npm`:

```sh
npx electron .
```

The above command will run the current working directory with Electron. Note that any dependencies in your app will not be installed.

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

* [Узел 10 и выше][proxy-env-10]
* [До узла 10][proxy-env]

## Пользовательские зеркала и кэши

Во время установки модуль `electron` будет обращаться к [`@electron/get`][electron-get], чтобы загрузить скомпилированные бинарники для твоей платформы, если она указана в списке релиза (`https://github.com/electron/electron/releases/tag/v$VERSION`, где `$VERSION` — версия Electron).

Если доступа к GitHub нет или нужна другая сборка, можно задать зеркало или папку кеша.

#### Зеркало

Можно использовать переменную окружения, чтобы переопределить базовый URL, по которому ищутся бинарники или имена файлов. The URL used by `@electron/get` is composed as follows:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China CDN mirror:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

By default, `ELECTRON_CUSTOM_DIR` is set to `v$VERSION`. To change the format, use the `{{ version }}` placeholder. For example, `version-{{ version }}` resolves to `version-5.0.0`, `{{ version }}` resolves to `5.0.0`, and `v{{ version }}` is equivalent to the default. As a more concrete example, to use the China non-CDN mirror:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

The above configuration will download from URLs such as `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Кеш

Кроме того, можно заменить локальный кеш. `@electron/get` скачивает файлы в кеш, чтобы снизить нагрузку на сеть. Папку с кешем можно использовать для кастомных сборок или, чтобы полностью избежать сетевого трафика.

* Linux: `$XDG_CACHE_HOME` или `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` или `~/AppData/Local/electron/Cache/`

В старом Electron возможно использование папки `~/.electron`.

Также можно переопределить место кеша с помощью переменной окружения `electron_config_cache`.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

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

Under the hood, Electron's JavaScript API binds to a binary that contains its implementations. Because this binary is crucial to the function of any Electron app, it is downloaded by default in the `postinstall` step every time you install `electron` from the npm registry.

However, if you want to install your project's dependencies but don't need to use Electron functionality, you can set the `ELECTRON_SKIP_BINARY_DOWNLOAD` environment variable to prevent the binary from being downloaded. For instance, this feature can be useful in continuous integration environments when running unit tests that mock out the `electron` module.

```sh npm2yarn
ELECTRON_SKIP_BINARY_DESCRIPTION
```

## Устранение проблем

При выполнении команды `npm install electron`, некоторые пользователи сталкиваются с проблемами установки.

В большинстве случаев, эти ошибки являются результатом проблем сети и не связаны с npm пакетом `electron`. Такие ошибки, как `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` и`ETIMEDOUT` возникают в результате проблем с сетью. Лучшее решение - попытаться переключить сеть, или немного подождать, и попытаться установить снова.

Также вы можете попытаться скачать Electron непосредственно из [релизов][releases], если установка через `npm` терпит неудачу.

Если установка завершается с ошибкой `EACCESS`, нужно [поправить права npm][npm-permissions].

Если ошибки не пропадают, можно использовать аргумент [unsafe-perm][unsafe-perm]:

```sh
sudo npm install electron --unsafe-perm=true
```

На слабой сети следует использовать аргумент `--verbose`, чтобы задействовать замедленную загрузку:

```sh
npm install --verbose electron
```

Если нужно перезагрузить файлы без кеша, нужно использовать переменную окружения `force_no_cache` = `true`.

[npm]: https://docs.npmjs.com
[versioning]: ./electron-versioning.md
[npx]: https://docs.npmjs.com/cli/v7/commands/npx
[releases]: https://github.com/electron/electron/releases
[proxy-env-10]: https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
[proxy-env]: https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config
[electron-get]: https://github.com/electron/get
[npm-permissions]: https://docs.npmjs.com/getting-started/fixing-npm-permissions
[unsafe-perm]: https://docs.npmjs.com/misc/config#unsafe-perm
