# Instalacja

Aby zainstalować wstępnie zbudowane pliki Electron, użyj [`npm`](https://docs.npmjs.com). Preferowaną metodą jest zainstalowanie Electron jako zależności deweloperskiej w twojej aplikacji :

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

Jeśli chcesz użyć proxy HTTP, musisz ustawić zmienną `ELECTRON_GET_USE_PROXY` na dowolną wartość, plus dodatkowe zmienne środowiskowe w zależności od wersji serwera hosta:

* [Węzeł 10 i powyżej](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Przed węzłem 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Custom Mirrors and Caches
podczas instalacji, moduł `electron` zadzwoni do [`@electron/get`](https://github.com/electron/get) aby pobrać wstępnie wbudowane binary Electron dla twojej platformy. Wykona to poprzez skontaktowanie się stroną wydań w domenie GitHub'a (`https://github.com/electron/electron/releases/tag/v$VERSION` gdzie `$VERSION` to dokładna wersja Electron'a).

Jeśli nie masz dostępu do witryny GitHub lub wymagasz niestandardowej kompilacji, możesz to zrobić przez zapewnienie mirror lub istniejącego katalogu pamięci podręcznej.

#### Mirror
Możesz użyć zmiennych środowiskowych do nadpisania bazowego adresu URL, ścieżki, na której szukaj binarów Electron i binarnych nazw plików. Adres URL użyty przez `@electron/get` składa się z następujących elementów:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Przykładowo, aby wykorzystać chińskie lusterko CDN:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

Domyślnie `ELECTRON_CUSTOM_DIR` jest ustawiony na `v$VERSION`. Aby zmienić format, użyj symbolu zastępczego `{{ version }}`. Na przykład, `wersja -{{ version }}` rozwiązuje `wersja 5.0.`, `{{ version }}` rozwiązuje `5.0.`i `v{{ version }}` jest równoważne wartości domyślnej. Jako bardziej konkretny przykład, aby użyć lusterka chińskiego innego niż CDN:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

Powyższa konfiguracja pobierze się z adresów URL takich jak `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Cache
Alternatywnie możesz nadpisać lokalną pamięć podręczną. `@electron/get` będzie pamięci podręcznej pobranych plików binarnych w lokalnym katalogu, aby nie naciskać na twoją sieć. Możesz użyć tego katalogu pamięci podręcznej, aby przekazać niestandardowe kompilacje Electron'a lub uniknąć korzystania z połączenia internetowego.

* Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

W środowiskach, które używały starszych wersji Electrona, możesz znaleźć pamięć podręczną również w `~/.electron`.

Możesz również nadpisać lokalną lokalizację pamięci podręcznej podając zmienną środowiskową `electron_config_cache` .

Pamięć podręczna zawiera oficjalny plik zip wersji oraz sumę kontrolną, zapisaną jako pliku tekstowego. Typowa skrzynka może wyglądać tak:

```sh
<unk> <unk> httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
<unk> <unk> <unk> <unk> electron-v1.7.9-darwin-x64.zip
<unk> <unk> httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
<unk> <unk> <unk> <unk> SHASUMS256.txt
<unk> <unk> httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64. ip
<unk> <unk> <unk> electron-v1.8.1-darwin-x64.zip
<unk> <unk> httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
<unk> <unk> <unk> <unk> SHASUMS256.txt
<unk> <unk> httpsgithub. omelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
Ó electron-v1.8.2-beta.1-darwin-x64.zip
¾ httpsgithub. omelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
<unk> <unk> SHASUMS256.txt
<unk> <unk> httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
Ž<unk> <unk> <unk> electron-v1.8.2-beta.2-darwin-x64.zip
<unk> httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta. SHASUMS256.txt
<unk> <unk> <unk> SHASUMS256.txt
<unk> httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64. ip
<unk> ◆ electron-v1.8.2-beta.3-darwin-x64.zip
<unk> <unk> httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    <unk> <unk> SHASUMS256.txt
```

## Pomiń pobieranie binarne
Podczas instalacji `electron` pakiet NPM automatycznie pobiera plik binarny elektron.

Czasami może to być niepotrzebne, np. w środowisku CI podczas badania innego elementu.

Aby zapobiec pobieraniu plików binarnych podczas instalacji wszystkich zależności npm można ustawić zmienną środowiskową `ELECTRON_SKIP_BINARY_DOWNLOAD`. Np.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm instalacja
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
