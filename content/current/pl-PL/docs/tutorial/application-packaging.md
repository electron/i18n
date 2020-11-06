# Pakowanie Aplikacji

To mitigate [issues](https://github.com/joyent/node/issues/6960) around long path names on Windows, slightly speed up `require` and conceal your source code from cursory inspection, you can choose to package your app into an [asar](https://github.com/electron/asar) archive with little changes to your source code.

Większość użytkowników otrzyma tę funkcję za darmo, ponieważ jest obsługiwany z pola przez [`electron-packer`](https://github.com/electron/electron-packager), [`electron-forge`](https://github.com/electron-userland/electron-forge), i [`electron-builder`](https://github.com/electron-userland/electron-builder) Jeśli nie używasz żadnego z tych narzędzi, przeczytaj dalej.

## Generowanie `asar` Archiwum

Archiwum [asar](https://github.com/electron/asar) jest prostym formatem typu smo-like łączącym pliki z pojedynczym plikiem. Electron może odczytać z niego dowolne pliki bez rozpakowywania całego pliku.

Krok do spakowania aplikacji do archiwum `asar`:

### 1. Zainstaluj narzędzie asar

```sh
$ npm install -g asar
```

### 2. Pakiet z `asar pack`

```sh
$ asar pack your-app app.asar
```

## Używanie `asar` Archiwów

W Electron istnieją dwa zestawy API: API węzłów dostarczane przez Node.js i Web API dostarczone przez Chromium. Oba API obsługują czytanie plików z archiwów `asar`.

### API Node

Z specjalnymi plastrami w Electronie, Node API jak `fs. eadFile` i `wymagają` traktują archiwa `asar` jako katalogi wirtualne, i pliki w nim jako normalne pliki w systemie plików.

Na przykład, przypuść że mamy archiwum `przykład.asar` pod `/path/to`:

```sh
$ asar list /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

Odczytaj plik w archiwum `asar`:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

Lista wszystkich plików w katalogu głównym archiwum:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

Użyj modułu z archiwum:

```javascript
require('./path/to/example.asar/dir/module.js')
```

Możesz również wyświetlić stronę internetową w archiwum `asar` z `BrowserWindow`:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

Na stronie internetowej można poprosić o pliki w archiwum z plikiem `:` protokół. Podobnie jak Node API, `asar` archiwa są traktowane jako katalogi.

Na przykład, aby pobrać plik z `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### Trakuje archiwum `asar` jako plik normalny

W niektórych przypadkach, takich jak weryfikacja sumy kontrolnej archiwum `asar` , musimy przeczytać zawartość archiwum `asar` jako plik. W tym celu możesz użyć wbudowanego modułu `oryginalno-fs` który dostarcza oryginalne `fs` API bez wsparcia `asar`:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

Możesz również ustawić `proces. oAsar` to `true` aby wyłączyć wsparcie dla `asar` w moduł `fs`:

```javascript
const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
```

## Ograniczenia Node API

Mimo że ciężko próbowaliśmy zrobić archiwa `asar` w Node API działały jak katalogów w miarę możliwości, nadal istnieją ograniczenia ze względu na niski poziom interfejsu API węzłów.

### Archiwa są tylko do odczytu

Archiwum nie może być modyfikowane, więc wszystkie API węzłów, które mogą modyfikować pliki, nie będą działać z archiwami `asar` asar.

### Katalog roboczy nie może być ustawiony na katalogi w archiwum

Chociaż archiwa `asar` są traktowane jako katalogi, w systemie plików nie ma katalogów, więc nigdy nie możesz ustawić katalogu roboczego na katalogi w `asar` archiw. Przekazywanie ich jako opcji `cwd` niektórych API spowoduje również błędy.

### Dodatkowe rozpakowywanie na niektóre API

Większość `fs` API może odczytać plik lub uzyskać informacje o pliku z `asar` archiwum bez rozpakowywania, ale dla niektórych API, które opierają się na przekazaniu prawdziwej ścieżki plików do podstawowych wywołań systemowych, Electron rozpakuje wymagany plik do pliku tymczasowego i przekaże ścieżkę pliku tymczasowego do interfejsu API, aby działały . Dodaje to trochę przewagi dla tych API.

API, które wymagają dodatkowego rozpakowywania to:

* `Plik potomny`
* `potomny_proces.execFileSync`
* `fs.open`
* `fs.openSync`
* `process.dlopen` - Używany przez `wymaga` w natywnych modułach

### Fałszywe informacje o statystyce `fs.stat`

`Statystyki` zwrócone przez `fs. tat` i jego znajomi w plikach `asar` archiwa są generowane przez zgadywanie, ponieważ te pliki nie istnieją w systemie plików . Więc nie powinieneś ufać obiektowi `Statystyki` poza uzyskaniem rozmiaru pliku i sprawdzaniem typu pliku.

### Wykonywanie plików binarnych wewnątrz `asar` Archiwum

Istnieją Node API, które mogą wykonywać pliki binarne takie jak `child_process.exec`, `child_process.spawn` i `child_process. xecFile`, ale tylko `execFile` jest obsługiwany do wykonania binarów wewnątrz `archiwum asar`.

Dzieje się tak, ponieważ `exec` i `spawn` zaakceptuj `polecenie` zamiast `pliku` jako wejście, i `polecenie`s jest wykonywane pod powłoką. There is no reliable way to determine whether a command uses a file in asar archive, and even if we do, we can not be sure whether we can replace the path in command without side effects.

## Dodawanie rozpakowanych plików do `asar` archiwów

Jak stwierdzono powyżej, niektóre API węzłów rozpakują plik do systemu plików po wywołaniu . Oprócz problemów z wydajnością, różne skanery antywirusowe mogą być wywołane przez to zachowanie.

Jako dzieło możesz pozostawić różne pliki rozpakowane przy użyciu opcji `--unpack`. In the following example, shared libraries of native Node.js modules will not be packed:

```sh
$ asar pack app app.asar --unpack *.node
```

Po uruchomieniu polecenia zauważysz, że folder o nazwie `app.asar.unpacked` został utworzony razem z plikiem `app.asar`. Zawiera rozpakowane pliki i powinny być dostarczane razem z archiwum `app.asar`.
