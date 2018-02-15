# Instalacja

> Porady odnośnie instalowania Electrona

W celu zainstalowania prekompilowanych plików Electrona, użyj [`npm`](https://docs.npmjs.com/). Preferowaną metodą instalacji Electrona jest zainstalowanie go jako zależność deweloperską twojej aplikacji:

```sh
npm install electron --save-dev
```

Zobacz [dokumentacje wersjonowania Eletronc'a](electron-versioning.md), aby dowiedzieć więcej o zarządzaniu wersjami Electron'a w twoich aplikacjach.

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

During installation, the `electron` module will call out to [`electron-download`](https://github.com/electron-userland/electron-download) to download prebuilt binaries of Electron for your platform. It will do so by contacting GitHub's release download page (`https://github.com/electron/electron/releases/tag/v$VERSION`, where `$VERSION` is the exact version of Electron).

If you are unable to access GitHub or you need to provide a custom build, you can do so by either providing a mirror or an existing cache directory.

#### Mirror

You can use environment variables to override the base URL, the path at which to look for Electron binaries, and the binary filename. The url used by `electron-download` is composed as follows:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China mirror:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache

Alternatively, you can override the local cache. `electron-download` will cache downloaded binaries in a local directory to not stress your network. You can use that cache folder to provide custom builds of Electron or to avoid making contact with the network at all.

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

## Rozwiązywanie problemów

Uruchomiając komendę `npm install electron`, niewielka część użytkowników czasami napotyka na błędy instalacji.

W większości przypadków, błędy te są wynikiem problemów z połączeniem internetowym, a nie błędami pakietu `electron`. Błędy typu `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` są objawami tego typu błędów z połączeniem. Najlepszym rozwiązaniem jest podjęcie próby zmiany sieci, bądź odczekanie chwili i ponowna próba instalacji.

Możesz także spróbować pobrać Electrona bezpośrednio z [electron/electron/releases](https://github.com/electron/electron/releases), jeśli instalacja poprzez `npm` zawodzi.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Jeżeli powyższe błędy nie ustępują, flaga [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm), może wymagać ustawienia wartości "true":

```sh
sudo npm install electron --unsafe-perm=true
```

W przypadku wolnego połączenia z internetem, zalecane jest użycie flagi `--verbose`, celem podglądu postępu pobierania:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.