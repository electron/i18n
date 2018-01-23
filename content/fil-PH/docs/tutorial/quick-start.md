# Madali na pagsisimula

Ang Electron ang nagbibigay-daan para makalikha ng desktop application na may malinis na JavaScript sa pamamagitan ng pagbibigay ng runtime na may rich native (operating system)APIs. Maari mong makita ang mga ito bilang isang variant ng Node.js runtime na nakatuon sa desktop applications na sa halip na mga server ng web.

Hindi ito nangangahulugan na ang Electron ay isang JavaScript na may bisa sa graphical user interface (GUI) libraries. Sa halip, ang Electron ay gumagamit ng mga web pages bilang GUI, kaya pwede mong makita ito bilang isang minimal Chromium browser, kontrolado ng JavaScript.

### Pangunahing Proseso

Sa Electron, ang tawag sa proseso na tumatakbo ay `package.json`'s `main` script **ang mga pangunahing proseso**. Ang iskrip na tumatakbo sa pangunahing proseso ay maaring maipakita ang isang GUI sa pamamagitan ng paggawa ng web pages.

### Proseso ng Tagasalin

Dahil ang Electron ay gumagamit ng Chromium para sa pagpapakita ng web pages, Chromium's multi-process na arkitektura ay ginagamit din. Bawat web page ng Electron ay tumatakbo sa sarili nitong proseso, tinatawag itong **the renderer process**.

Sa normal na mga browsers, ang mga web pages ay karaniwang tumatabko sa sanboxed na kapaligiran at hindi ito pinapayagan na mag access sa native resources. Gayunman , sa mga gumagamit ng Electron ay may kapangyarihan na gamitin ang Node.js APIs sa web pages na nagpapahintulot sa mas mababang antas ng operating system ng interaksyon.

### Ang pagkakaiba ng pangunahing proseso at proseso ng tagasalin

Ang pangunahing proseso and gumagawa ng web pages sa pamamagitan ng `BrowserWindow` instances. Bawat `BrowserWindow` instance ay nagpapatakbo ng web page sa sarili nitong proseso ng tagasalin. Kapag ang `BrowserWindow` instance ay nasira ,ang kaukulang renderer process ay mapuputol din.

Ang pangunahing proceso ay namamahala sa lahat ng web pages at kaukulang mga proseso ng tagasalin. Bawat proseso ng tagasalin ay nakahiwalay at nagmamalasakit lamang sa web page na tumatakbo dito.

Sa web pages, ang pagtawag sa native GUI na may kaugnayan sa APIs ay hindi pinapayagan dahil ang pamamahala ng native GUI resources sa web pages ay lubhang mapanganib at madali itong i leak ang mga resources. Kapag gusto ninyong magsagawa ng GUI operations sa inyung web page, ang proseso ng tagasalin ng web page ay dapat makipag-ugnayan sa pangunahing proseso upang humiling sa pangunahing proseso para magsagawa ng lahat ng operasyon.

Sa Electron, may ilang paraan para makipagusap sa pagitan ng pangunahing proseso at proseso ng tagasalin. Katulad na lng ng [`ipcRenderer`](../api/ipc-renderer.md) at [`ipcMain`](../api/ipc-main.md)modules para sa pagpapadala ng mga mensahe,at sa [remote](../api/remote.md) module para sa RPC style communication. There is also an FAQ entry on [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages).

## Write your First Electron App

Generally, an Electron app is structured like this:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

The format of `package.json` is exactly the same as that of Node's modules, and the script specified by the `main` field is the startup script of your app, which will run the main process. An example of your `package.json` might look like this:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js`.

The `main.js` should create windows and handle system events, a typical example being:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

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
  if (win === null) {
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
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Run your app

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you'll probably want to try running your app locally to test it and make sure it's working as expected.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) is an `npm` module that contains pre-compiled versions of Electron.

If you've installed it globally with `npm`, then you will only need to run the following in your app's source directory:

```sh
electron .
```

If you've installed it locally, then run:

#### macOS / Linux

```sh
$ ./node_modules/.bin/electron .
```

#### Windows

```sh
$ .\node_modules\.bin\electron .
```

#### Node v8.2.0 and later

```sh
$ npx electron .
```

### Manually Downloaded Electron Binary

If you downloaded Electron manually, you can also use the included binary to execute your app directly.

#### macOS

```sh
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```sh
$ ./electron/electron your-app/
```

#### Windows

```sh
$ .\electron\electron.exe your-app\
```

`Electron.app` here is part of the Electron's release package, you can download it from [here](https://github.com/electron/electron/releases).

### Run as a distribution

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### Try this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which includes [npm](https://npmjs.org)) on your system.

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

For more example apps, see the [list of boilerplates](https://electronjs.org/community#boilerplates) created by the awesome electron community.