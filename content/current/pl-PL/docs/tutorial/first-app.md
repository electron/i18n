# Napisz swoją Pierwszą Aplikację Używając Electron

Electron umożliwia tworzenie aplikacji komputerowych przy użyciu czystego JavaScriptu poprzez zapewnienie środowiska wykonawczego z bogatymi natywnymi interfejsami API (systemu operacyjnego). Możesz sobie je wyobrazić jako odmianę środowiska wykonawczego Node.js, która jest skupiona na programach komputerowych zamiast na serwerach sieci web.

To nie znaczy, że Electron jest powiązaniem JavaScript z bibliotekami graficznego interfejsu użytkownika (GUI). Zamiast tego Electron używa stron internetowych jako GUI, więc można to postrzegać jak minimalną przeglądarkę Chromium, sterowaną za pomocą JavaScript.

**Uwaga**: Ten przykład jest dostępny także jako repozytorium przez co możesz [go pobrać i uruchomić od razu](#trying-this-example).

As far as development is concerned, an Electron application is essentially a Node.js application. Punktem wyjścia jest `package.json`, który jest identyczny z modułem Node.js. Najbardziej podstawowa aplikacja napisana za pomocą Electron`a ma następującą strukturę folderów:

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

__Note__: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). If this was actually a simple Node application, you would add a `start` script that instructs `node` to execute the current package:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Turning this Node application into an Electron application is quite simple - we merely replace the `node` runtime with the `electron` runtime.

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

Teraz musisz zainstalować sam `electron`. The recommended way of doing so is to install it as a development dependency in your app, which allows you to work on multiple apps with different Electron versions. To do so, run the following command from your app's directory:

```sh
npm install --save-dev electron
```

Istnieją inne sposoby na instalację Electrona. Please consult the [installation guide](installation.md) to learn about use with proxies, mirrors, and custom caches.

## Rozwój Electrona w pigułce

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Stwórz okno przeglądarki.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

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

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Otwórz Narzędzia Deweloperskie.
  win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

Finally the `index.html` is the web page you want to show:

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

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Spróbuj wykonać ten przykład

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

```sh
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).
