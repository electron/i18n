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

Jeżeli używasz serwera HTTP Proxy, możesz [użyć tych zmiennych środowiskowych](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Custom Mirrors and Caches
Podczas instalacji modułu `electron` zawoła [`electron-download`](https://github.com/electron-userland/electron-download), aby pobrać wstępnie zbudowane pliki binarne Electron'a dla Twojej platformy. Wykona to poprzez skontaktowanie się stroną wydań w domenie GitHub'a (`https://github.com/electron/electron/releases/tag/v$VERSION` gdzie `$VERSION` to dokładna wersja Electron'a).

Jeśli nie masz dostępu do witryny GitHub lub wymagasz niestandardowej kompilacji, możesz to zrobić przez zapewnienie mirror lub istniejącego katalogu pamięci podręcznej.

#### Mirror
You can use environment variables to override the base URL, the path at which to look for Electron binaries, and the binary filename. Adres url używany przez `electron-download` składa się w następujący sposób:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Na przykład aby użyć China mirror:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache
Alternatywnie możesz nadpisać lokalną pamięć podręczną. `electron-download` zapiszę w pamięci podręcznej pobrane pliki birnarne w lokalnym katalogu, aby nie przeciążać Twojego połączenia. Możesz użyć tego katalogu pamięci podręcznej, aby przekazać niestandardowe kompilacje Electron'a lub uniknąć korzystania z połączenia internetowego.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
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
