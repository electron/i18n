---
title: API Zmiany w Electron 1.0
author: zcbenz
date: '2015-11-17'
---

Od początku Electrona, zaczynając od początku, kiedy był nazywany Atom-Shell, eksperymentowaliśmy z dostarczaniem ładnych międzyplatformowych API JavaScript dla modułu zawartości Chromium i natywnych komponentów GUI. API zaczęły się bardzo organizacyjnie i z czasem wprowadziliśmy kilka zmian w celu ulepszenia pierwotnych wzorów.

---

Teraz, gdy Electron przechodzi do wersji 1.0, chcielibyśmy skorzystać z okazji do zmian, kierując się ostatnimi szczegółami interfejsu API. Zmiany opisane poniżej są zawarte w **0,35.**, ze starymi interfejsami API zgłaszającymi ostrzeżenia dotyczące deprekacji, dzięki czemu będziesz mógł być aktualny dla przyszłej wersji 1.0. Electron 1.0 nie będzie gotowy przez kilka miesięcy, więc masz trochę czasu, zanim te zmiany ulegną rozpadowi.

## Ostrzeżenia o deprecjacji

Domyślnie ostrzeżenia pojawią się, jeśli używasz przestarzałych API. Aby je wyłączyć, możesz ustawić `process.noDeprecation` na `true`. Aby śledzić źródła przestarzałych zastosowań API, możesz ustawić `proces. hrowDeprecation` do `true` aby rzucić wyjątki zamiast drukowania ostrzeżeń, lub ustawić `proces. raceDeprecation` do `true` aby wydrukować ślady deprekacji.

## Nowy sposób korzystania z wbudowanych modułów

Wbudowane moduły są teraz grupowane w jeden moduł, zamiast być rozdzielone na niezależne moduły, więc możesz ich używać [bez konfliktów z innymi modułami](https://github.com/electron/electron/issues/387):

```javascript
var app = require('electron').app
var BrowserWindow = require('electron').BrowserWindow
```

Stara droga `require('app')` jest nadal obsługiwana dla kompatybilności wstecznej, ale można również wyłączyć jeśli wyłączono:

```javascript
require('electron').hideInternalModules()
require('app') // rzuca błąd.
```

## Łatwiejszy sposób na używanie modułu `zdalne`

Ze względu na zmianę sposobu korzystania z wbudowanych modułów, ułatwiliśmy korzystanie z modułów głównych procesów w procesie renderowania. Możesz teraz uzyskać dostęp do atrybutów `zdalnego`, aby je użyć:

```javascript
// Nowy sposób.
var app = require('electron').remote.app
var BrowserWindow = require('electron').remote.BrowserWindow
```

Zamiast stosować długi łańcuch wymagający:

```javascript
// Stara droga.
var app = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## Podział modułu `ipc`

Moduł `ipc` istnieje zarówno w głównym procesie jak i procesie renderowania, a interfejs API był różny po każdej stronie, co jest całkiem mylące dla nowych użytkowników. Zmieniliśmy nazwę modułu na `ipcMain` w głównym procesie i `ipcRenderer` w procesie renderem, aby uniknąć dezorientacji:

```javascript
// In main process.
var ipcMain = require('electron').ipcMain
```

```javascript
// W procesie renderowania.
var ipcRenderer = require('electron').ipcRenderer
```

A dla modułu `ipcRenderer` dodano dodatkowy `obiekt` podczas odbierania wiadomości, aby dopasować sposób obsługi wiadomości w modułach `ipcMain`:

```javascript
ipcRenderer.on('message', function (event) {
  console.log(event)
})
```

## Standaryzacja opcji `BrowserWindow`

Opcje `BrowserWindow` mają różne style w oparciu o opcje innych API, i były trochę trudne do użycia w JavaScript z powodu `-` w nazwach. Są one teraz znormalizowane do tradycyjnych nazw JavaScript:

```javascript
new BrowserWindow({ minWidth: 800, minHeight: 600 })
```

## Podążanie za konwencjami DOM-u dla nazw API

Nazwy API w Electron używane do preferowania camelCase dla wszystkich nazw API, jak `URL` do `URL`, ale DOM ma swoje własne konwencje, i wolą `adres URL` od `URL`, podczas używania `Id` zamiast `ID`. Zrobiliśmy następujące nazwy API, aby pasować do stylów DOM:

* `Adres URL` został zmieniony na `adres URL`
* `Csp` zmienia się na `CSP`

Ze względu na te zmiany zauważysz wiele deprekacji podczas używania Electron v0.35.0 dla swojej aplikacji. Łatwym sposobem na ich naprawienie jest zastąpienie wszystkich wystąpień `Url` `URL`.

## Zmiany nazw zdarzeń `w zasobniku`

Styl nazw zdarzeń `Tray` był nieco inny niż inne moduły, więc zmieniono nazwę aby pasowały do innych.

* `kliknięty` zmienia nazwę na `kliknij`
* `kliknięty dwukrotnie` zmienia się na `kliknij dwukrotnie`
* `kliknij prawym przyciskiem myszy` zmienia się na `kliknij prawym przyciskiem myszy`

