# Pag-gawa ng iyong unang Electron App

Ang Electron ang nagbibigay-daan para makalikha ng desktop application na gawa sa purong JavaScript sa pamamagitan ng pagbibigay ng runtime na may mayamang lokal na (operating system) APIs. Maari mong makita ang mga ito bilang isang baryante ng Node.js runtime na nakatuon sa desktop applications na sa halip na mga server ng web.

Hindi ito nangangahulugan na ang Electron ay isang JavaScript na may bisa sa graphical user interface (GUI) libraries. Sa halip, ang Electron ay gumagamit ng mga web pages bilang GUI, kaya pwede mong makita ito bilang isang minimal Chromium browser, kontrolado ng JavaScript.

**Tandaan**: Ang halimbawang ito ay isang repository na pwedeng [i-download at subukan kaagad](#trying-this-example).

As far as development is concerned, an Electron application is essentially a Node.js application. Ang panimula ay `package.json` na katulad sa node.js module. A pinaka simpleng Electron app ay merong sumusunod na folder na struktura:

```text
iyong-app/
├── package.json
├── main.js
└── index.html
```

Gumawa ng bagong folder na walang laman para sa iyong Electron Application. Buksan ang iyong command line client at i-sulat ang `npm init` mula sa iyong folder.

```sh
npm init
```

gagabayan ka ni npm mula sa pinaka basic na `package.json` file. Ang script na tinutukoy sa `main` ay isang panimulang script ng iyong app, kung saan umaandar ang pangunahing proseso. Isang halimbawa ng iyong `package.json` ay pwedeng maging katulad nito:

```json
{
  "name": "your-app",
  "version": "0.1.0",
  "main": "main.js"
}
```

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). If this was actually a simple Node application, you would add a `start` script that instructs `node` to execute the current package:

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

## Paginstall ng Electron

At this point, you'll need to install `electron` itself. The recommended way of doing so is to install it as a development dependency in your app, which allows you to work on multiple apps with different Electron versions. To do so, run the following command from your app's directory:

```sh
npm install --save-dev electron
```

Other means for installing Electron exist. Please consult the [installation guide](installation.md) to learn about use with proxies, mirrors, and custom caches.

## Development ng Electron sa Nutshell

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')

function createWindow () {
  // Create the browser window.
  win = bagong BrowserWindow({width: 800, height: 600})

  // i-load ang index.html sa app.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
hayaang manalo

function gumawa ngWindow () {
  // Gumawa ng browser window.
  win = bagong BrowserWindow({width: 800, height: 600})

  // i-load ang index.html sa app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  //Emitted kapag sarado na ang window.
  win.on('sarado', () => {
    // Dereference ang window object, karaniwang itago mo ang windows
   //sa isang array kung ang iyong app ay sumusuporta sa multi windows, ito ay ang oras kung kailan mo dapat burahin ang kaukulang elemento.
    win = null
  })
}

// Ang paraang ito ay tinatawag kapag ang Electron ay tapos na
// Inisyalisasyon at handa na itong gumawa ng browser windows.
Ilang APIs ay maari lamang gamitin matapos ang pangyayaring ito ay nangyayari.
app.on('humanda', lumikhangWindow)
Tumigil kapag sarado na ang lahat ng windows.
app.on('window-lahat-sarado', () => {
  // Sa macOS ito ay karaniwan para sa mga aplikasyon at kanilang menu bar
  //para manatiling aktibo hanggang ang gumagamit ay tahasang huminto sa Cmd+Q
  Kung (proseso.platporm !== 'darwin') {

app.on('activate', () => {
  //Sa macOS ito ay karaniwan upang muling lumikha ng window sa app kapag ang 
  //ang dock icon ay nag-click at wla nang iba pang windows na nakabukas.
  kung (win === null) {
    lumikhangWindow()
  }
})
//Sa file na ito pwede mong isama ang iba mo pang app's specific sa pangunahing code. Maari mo rin ilagay ang mga ito sa magkakahiwalay na mga file at dito nangangailangan sila.
```

Sa huli ang`index.html` ay ang web page na gusto mong ipakita:

```html
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Hello World!&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World!&lt;/h1&gt;
    Kami ay gumagamit ng node&lt;script&gt;document.write(process.versions.node)&lt;/script&gt;,
    Chrome &lt;script&gt;document.write(process.versions.chrome)&lt;/script&gt;,
    and Electron &lt;script&gt;document.write(process.versions.electron)</6.
  &lt;/body&gt;
&lt;/html&gt;
```

## Pagpapaandar ng yong aplikasyon

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Trying this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com).

```sh
# i-clone ang repository
$ git clone https://github.com/electron/electron-madaling-pagsisimula
# Pumunta sa repository
$ cd electron-madaling-pagsisimula
# I-install dependencies
$ npm install
# Patakbuhin ang app
$ npm simula
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).