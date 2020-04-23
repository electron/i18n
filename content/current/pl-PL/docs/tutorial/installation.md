# Instalacja

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com). The preferred method is to install Electron as a development dependency in your app:

```sh
npm install electron --save-dev
```

Zobacz [dokumentacje wersjonowania Electron'a](./electron-versioning.md), aby dowiedzieć więcej o zarządzaniu wersjami Electron'a w twoich aplikacjach.

## Instalacja globalna

Możesz także zainstalować komendę `electron` globalnie w twojej zmiennej `$PATH`:

```sh
npm install electron -g
```

## Dostosowywanie

Jeśli chcesz zmienić architekturę pobieranych pakietów (np. `ia32` na maszynie `x64`), możesz użyć flagi `--arch` w komendzie npm, albo ustawić zmienną środowiskową `npm_config_arch`:

```shell
npm install --arch=ia32 electron
```

Dodatkowo, możesz także określić platformę (np. `win32`, `linux`, itd.), używając flagi `--platform`:

```shell
npm install --platform=win32 electron
```

## Proxy

If you need to use an HTTP proxy, you need to set the `ELECTRON_GET_USE_PROXY` variable to any value, plus additional environment variables depending on your host system's Node version:

* [Node 10 and above](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Before Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Custom Mirrors and Caches
During installation, the `electron` module will call out to [`@electron/get`](https://github.com/electron/get) to download prebuilt binaries of Electron for your platform. Wykona to poprzez skontaktowanie się stroną wydań w domenie GitHub'a (`https://github.com/electron/electron/releases/tag/v$VERSION` gdzie `$VERSION` to dokładna wersja Electron'a).

Jeśli nie masz dostępu do witryny GitHub lub wymagasz niestandardowej kompilacji, możesz to zrobić przez zapewnienie mirror lub istniejącego katalogu pamięci podręcznej.

#### Mirror
You can use environment variables to override the base URL, the path at which to look for Electron binaries, and the binary filename. The URL used by `@electron/get` is composed as follows:

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

#### Cache
Alternatywnie możesz nadpisać lokalną pamięć podręczną. `@electron/get` will cache downloaded binaries in a local directory to not stress your network. Możesz użyć tego katalogu pamięci podręcznej, aby przekazać niestandardowe kompilacje Electron'a lub uniknąć korzystania z połączenia internetowego.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

On environments that have been using older versions of Electron, you might find the cache also in `~/.electron`.

You can also override the local cache location by providing a `electron_config_cache` environment variable.

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

## Skip binary download
When installing the `electron` NPM package, it automatically downloads the electron binary.

This can sometimes be unnecessary, e.g. in a CI environment, when testing another component.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. Np.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## Rozwiązywanie problemów

Wywołując polecenie `npm install electron`, niektórzy użytkownicy napotykają okazjonalne błędy instalacji.

W więkoszości przypadków, błędy są efektem problemów z połączeniem internetowym, a nie błędami pakietu `electron`. Błędy typu `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, i`ETIMEDOUT` są efeketem problemów z połączeniem internetowym. Najlepszym rozwiązaniem jest próba zmiany sieci lub odczekanie chwili i ponowienie próby instalacji.

Możesz także spróbować pobrać Electrona bezpośrednio z [electron/electron/releases](https://github.com/electron/electron/releases), jeśli instalacja poprzez `npm` zawodzi.

Jeśli instalacja powoduje błąd `EACCESS`, być może musisz naprawić [uprawnienia npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Jeżeli powyższe błędy nie ustępują, flaga [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm), może wymagać ustawienia wartości "true":

```sh
sudo npm install electron --unsafe-perm=true
```

W przypadku wolnego połączenia z internetem, zalecane jest użycie flagi `--verbose`, celem podglądu postępu pobierania:

```sh
npm install --verbose electron
```

W przypadku, gdy musisz wymusić ponowne pobranie sumy kontrolnej oraz danych, ustaw zmienną środowiskową `force_no_cache` na wartość `true`.
