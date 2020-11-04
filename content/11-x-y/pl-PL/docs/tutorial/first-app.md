# Napisz swoją Pierwszą Aplikację Używając Electron

Electron umożliwia ci tworzenie aplikacji komputerowych przy użyciu czystego JavaScriptu poprzez zapewnienie środowiska wykonawczego z bogatymi natywnymi interfejsami API (systemu operacyjnego). Możesz to sobie wyobrazić jako odmianę środowiska wykonawczego Node.js, która jest skupiona na programach komputerowych zamiast na serwerach sieci web.

To nie znaczy, że Electron jest powiązaniem JavaScript z bibliotekami graficznego interfejsu użytkownika (GUI). Zamiast tego Electron używa stron internetowych jako GUI, więc można to postrzegać jak minimalną przeglądarkę Chromium, sterowaną za pomocą JavaScript.

**Uwaga**: Ten przykład jest dostępny także jako repozytorium przez co możesz [go pobrać i uruchomić od razu](#trying-this-example).

Jeśli chodzi o rozwój, aplikacja Electron jest zasadniczo aplikacją Node.js. Punktem wyjścia jest `package.json`, który jest identyczny z modułem Node.js. Najbardziej podstawowa aplikacja napisana za pomocą Electron`a ma następującą strukturę folderów:

```plaintext
twoja-aplikacja
├── package.json
├── main.js
└── index.html
```

Stwórz nowy pusty folder dla twojej nowej aplikacji napisanej w Electron`ie. Otwórz twój wiersz poleceń i wpisz `npm init` ( ta operacja może być wykonana z każdego folderu).

```sh
npm init
```

npm poprowadzi Cię przez proces tworzenia podstawowego pliku `package.json`. Skrypt określony przez pole `main` jest skryptem początkowym aplikacji, który uruchomi jej główny proces. Przykładowy plik `package.json` może wyglądać tak:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Note__: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does).

By default, `npm start` would run the main script with Node.js. in order to make it run with Electron, you can add a `start` script:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Instalowanie Electrona

Teraz musisz zainstalować sam `electron`. Zalecany sposób to zainstalowanie go jako zależności deweloperskiej w Twojej aplikacji, który pozwala na pracę w wielu aplikacjach z różnymi wersjami Electrona. Aby to zrobić, uruchom następujące polecenie z katalogu aplikacji:

```sh
npm install --save-dev electron
```

Istnieją inne sposoby na instalację Electrona. Zapoznaj się z [instrukcją instalacji](installation.md) , aby dowiedzieć się o użytkowaniu z proxy, lustrami, i niestandardowymi skrytkami.

## Rozwój Electrona w pigułce

Aplikacje Electron są rozwijane w JavaScript przy użyciu tych samych zasad i metod znajdujących się w rozwoju Node.js. Wszystkie API i funkcje znalezione w Electronie są dostępne za pośrednictwem modułu `electron` co może być wymagane jak każdy inny Node. s moduł:

```javascript
const electron = require('electron')
```

Moduł `electron` wyświetla funkcje w przestrzeni nazw. Jako przykłady, cykl życia aplikacji jest zarządzany przez `elektron. pp`, okna mogą być tworzone za pomocą klasy `electron.BrowserWindow`. Prosty plik `main.js` może czekać aż aplikacja będzie gotowa i otworzy okno:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Stwórz okno przeglądarki.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // i załaduj index.html aplikacji.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

`main.js` powinien tworzyć okna i obsługiwać wszystkie zdarzenia systemowe jakie może napotkać aplikacja . Bardziej kompletna wersja powyższego przykładu może otworzyć narzędzia deweloperskie, obsłużyć zamknięte okno, lub ponownie utwórz okna na macOS, jeśli użytkownik kliknie ikonę aplikacji w doku.

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Stwórz okno przeglądarki.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // i załaduj index.html aplikacji.
  win.loadFile('index.html')

  // Otwórz Narzędzia Deweloperskie.
  win.webContents.openDevTools()
}

// Ta metoda zostanie wywołana po zakończeniu
// inicjalizacji i jest gotowa do tworzenia okien przeglądarki.
// Niektóre API mogą być używane tylko po wystąpieniu tego zdarzenia.
app.whenReady().then(createWindow)

// Zakończ, gdy wszystkie okna są zamknięte, z wyjątkiem macOS. W tym miejscu jest często
// dla aplikacji i ich paska menu aby pozostać aktywny, dopóki użytkownik nie opuści
// wyraźnie z Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app. aplikacja()
  }
})

n('aktywuj', () => {
  // Na macOS często tworzy się okno w aplikacji, gdy ikona
  // dock jest kliknięta i nie ma żadnych innych okien otwartych.
  jeżeli (BrowserWindow.getAllWindows(). ength === 0) {
    createWindow()

})

// W tym pliku możesz dołączyć pozostałą część głównego procesu aplikacji
// kod. Możesz również umieścić je w osobnych plikach i wymagać ich tutaj.
```

Na koniec `index.html` jest stroną internetową, którą chcesz wyświetlić:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
    <!-- https://electronjs.org/docs/tutorial/security#csp-meta-tag -->
    <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Uruchamianie Twojej aplikacji

Po utworzeniu pakietu początkowego `main.js`, `index.html`i `. syn` plików, możesz wypróbować aplikację uruchamiając `npm start` z katalogu aplikacji.

## Spróbuj wykonać ten przykład

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`][quick-start] repository.

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

```sh
# Sklonuj repozytorium
$ klon git https://github. om/electron/electron-quick-start
# Przejdź do repozytorium
$ cd electron-quick-start
# Zainstaluj zależności
$ npm install
# Uruchom aplikację
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation][boilerplates].

[quick-start]: https://github.com/electron/electron-quick-start
[boilerplates]: ./boilerplates-and-clis.md
