# Writing Your First Electron App

इलेक्ट्रॉन आपको एक रनटाइम के साथ संपन्न मूल (ऑपरेटिंग सिस्टम) ऐपीआई प्रदान कर के शुद्ध जावास्क्रिप्ट के साथ डेस्कटॉप एप्लीकेशनस निर्मित करने की क्षमता प्रदान करता है | आप इसे नोड.जेएस की एक भिन्न किस्म की तरह देख सकते हैं जो कि वेब सर्वर्स के बजाये डेस्कटॉप एप्लीकेशनस पर केन्द्रित है |

इसका मतलब यह नहीं है कि ग्राफिकल यूजर इंटरफ़ेस (जीयुआई) लाइब्रेरीज के लिए इलेक्ट्रॉन एक जवासक्रिप्त बिन्डिंग है| बल्कि इलेक्ट्रॉन, वेब पेजेज को अपने जीयुआई की तरह इस्तेमाल करता है, तो आप इसे एक न्यूनतम क्रोमियम ब्राउज़र की तरह भी देख सकते हैं, जो कि जावास्क्रिप्ट से नियंत्रित है |

**Note**: This example is also available as a repository you can [download and run immediately](#trying-this-example).

As far as development is concerned, an Electron application is essentially a Node.js application. The starting point is a `package.json` that is identical to that of a Node.js module. A most basic Electron app would have the following folder structure:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

Create a new empty folder for your new Electron application. Open up your command line client and run `npm init` from that very folder.

```sh
npm init
```

npm will guide you through creating a basic `package.json` file. The script specified by the `main` field is the startup script of your app, which will run the main process. An example of your `package.json` might look like this:

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

## Installing Electron

At this point, you'll need to install `electron` itself. The recommended way of doing so is to install it as a development dependency in your app, which allows you to work on multiple apps with different Electron versions. To do so, run the following command from your app's directory:

```sh
npm install --save-dev electron
```

Other means for installing Electron exist. Please consult the [installation guide](installation.md) to learn about use with proxies, mirrors, and custom caches.

## Electron Development in a Nutshell

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // और एप्प का इंडेक्स.एचटीएमएल लोड कीजिये |
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
}

app.on('ready', createWindow)
```

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// विंडो ऑब्जेक्ट का एक वैश्विक रेफरेंस रखिये, अगर आप नहीं रखेंगे, तो विंडोज
// स्वतः ही बंद हो जायेगी जब जावास्क्रिप्ट ऑब्जेक्ट गार्बेज में एकत्र होगा |
let win

function createWindow () {
  // ब्राउज़र विंडो निर्मित कीजिये |
  win = new BrowserWindow({width: 800, height: 600})

  // और एप्प का इंडेक्स.एचटीएमएल लोड कीजिये |
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // डेवटूल्स खोलें |
  win.webContents.openDevTools()

  // विंडो के बंद होने के बाद निकलता है |
  win.on('closed', () => {
    // विंडो ऑब्जेक्ट को डीरेफेरेंस करें, आम तौर पर आप विंडोज को
    // एक ऐरे में स्टोर करेंगे, अगर आपकी एप्प बहु-विंडोज समर्थित करती है, यही वह 
    // समय है जब आपको इसके अनुरूप तत्व को डिलीट कर देना चाहिये |
    win = null
  })
}

// यह मेथड तब बुलाया जायेगा जब इलेक्ट्रॉन ने इनिशियलआइज़ेशन खत्म कर दी हो
// और ब्राउज़र विंडोज का निर्माण करने के लिए तैयार हो |
// कुछ ऐपीआई इस इवेंट के शुरू होने पर ही इस्तेमाल की जा सकती है |
app.on('ready', createWindow)

// सभी विंडोज के बंद होने के बाद छोड़ दें |
app.on('window-all-closed', () => {
  // मैकओएस पर एप्लीकेशनस और उनकी मेन्यु बार के लिए यह सामान्य है कि 
  // जब तक उपयोगकर्ता cmd+q एंटर करके के बंद न कर दें, तब तक सक्रीय रहें |
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // मैकओएस पर एप्प में एक विंडो का पुनर्निर्माण करना आम है, जब डॉक आइकॉन
  // क्लिक किया हो और कोई दूसरी विंडोज न खुली हों |
  if (win === null) {
    createWindow()
  }
})

// इस फाइल में आप अपनी एप्प का बाकी बचा विशिष्ट मुख्य 
// कोड शामिल कर सकते हैं | आप उन्हें अलग-अलग फाइल्स में भी डाल सकते हैं और उन्हें यहाँ आवश्यक कर सकते हैं |
```

अन्त में `index.html` वह वेब पेज है जिसे आप दिखाना चाहते हैं:

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

## Running Your App

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

## Trying this Example

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com).

```sh
# रिपॉजिटरी क्लोन करें
$ git clone https://github.com/electron/electron-quick-start
# रिपॉजिटरी में जायें
$ cd electron-quick-start
# डिपेंडेंसिस इनस्टॉल करें
$ npm install
# एप्प चलायें
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).