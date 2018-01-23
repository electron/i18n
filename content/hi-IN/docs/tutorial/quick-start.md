# त्वरित प्रारंम्भ

इलेक्ट्रॉन आपको एक रनटाइम के साथ संपन्न मूल (ऑपरेटिंग सिस्टम) ऐपीआई प्रदान कर के शुद्ध जावास्क्रिप्ट के साथ डेस्कटॉप एप्लीकेशनस निर्मित करने की क्षमता प्रदान करता है | आप इसे नोड.जेएस की एक भिन्न किस्म की तरह देख सकते हैं जो कि वेब सर्वर्स के बजाये डेस्कटॉप एप्लीकेशनस पर केन्द्रित है |

इसका मतलब यह नहीं है कि ग्राफिकल यूजर इंटरफ़ेस (जीयुआई) लाइब्रेरीज के लिए इलेक्ट्रॉन एक जवासक्रिप्त बिन्डिंग है| बल्कि इलेक्ट्रॉन, वेब पेजेज को अपने जीयुआई की तरह इस्तेमाल करता है, तो आप इसे एक न्यूनतम क्रोमियम ब्राउज़र की तरह भी देख सकते हैं, जो कि जावास्क्रिप्ट से नियंत्रित है |

### मुख्य प्रक्रिया

इलेक्ट्रॉन में, `package.json` की `main` स्क्रिप्ट चलाने वाली प्रक्रिया को **मुख्य प्रक्रिया** कहते है | मुख्य प्रक्रिया में चलने वाली स्क्रिप्ट, वेब पेजेज का निर्माण कर जीयुआई को प्रदर्शित कर सकती है |

### रेंदेरेर प्रक्रिया

चूँकि इलेक्ट्रॉन वेब पेजेज को प्रदशित करने के लिए क्रोमियम का इस्तेमाल करता है, इसलिए क्रोमियम के बहु-प्रक्रिया बनावट का भी इस्तेमाल होता है | इलेक्ट्रॉन में हर वेब पेज अपनी खुद की प्रक्रिया में चलता है, जिसे **रेंदेरेर प्रक्रिया** कहा जाता है |

सामान्य ब्राउज़र्स में, वेब पेजेज अक्सर एक सैंडबॉक्स वातावरण में चलते हैं और उन्हें मूल संसाधनों तक पहुँचने की अनुमति नहीं होती | पर इलेक्ट्रॉन उपयोगकर्ताओं के पास वेब पेजेज में नोड.जेएस ऐपीआई का इस्तेमाल करने की शक्ति होती है, जिससे कि वे ऑपरेटिंग सिस्टम के निचले स्तर की इंटरेक्शन कर सकते हैं |

### मुख्य प्रक्रिया और रेंडरर प्रक्रिया के बीच अंतर

मुख्य प्रक्रिया `BrowserWindow` इंस्टेंसेस बना कर वेब पेजेज़ बनाता है । प्रत्येक `BrowserWindow` इंस्टैंस अपनी खुद की रेंदेरेर प्रक्रिया में वेब पेज चलाती है | जब एक `BrowserWindow` इंस्टैंस नष्ट होती है, तो उसके अनुरूप रेंदेरेर प्रक्रिया भी समाप्त हो जाती है |

मुख्य प्रक्रिया सभी वेब पेजेज और उनके अनुरूप रेंदेरेर प्रक्रियाओं का प्रबंधन करती है | हर रेंदेरेर प्रक्रिया अलग-थलक होती है और केवल अपने भीतर चल रहे वेब पेज पर ध्यान देती है |

वेब पेजेज में, मूल जीयुआई सम्बंधित ऐपीआई को बुलाने की इज़ाज़त नहीं होती क्योंकि वेब पेजेज में मूल जीयुआई संसाधनों का प्रबंधन करना बेहद खतरनाक है और इससे संसाधन बड़ी आसानी से लीक हो सकते हैं | अगर आप एक वेब पेज में जीयुआई ऑपरेशनस करना चाहते हैं, तो वेब पेज की रेंदेरेर प्रक्रिया को मुख्य प्रक्रिया से संचार करना होगा और इन ऑपरेशनस को करने का अनुरोध करना होगा |

इलेक्ट्रॉन में, रेंदेरेर प्रक्रिया और मुख्य प्रक्रिया के बीच संचार करने के लिए हमारे पास अनेक मार्ग हैं | जैसे कि सन्देश भेजने के लिए [`ipcRenderer`](../api/ipc-renderer.md) और [`ipcMain`](../api/ipc-main.md) मोडयुल्स, और आरपीसी स्टाइल के संचार के लिए [remote](../api/remote.md) मोड्यूल | अक्सर पूछे जाने वाले सवालों में [वेब पेजेज के बीच डाटा साझा कैसे करें ](../faq.md#how-to-share-data-between-web-pages) की एक प्रविष्टि भी है |

## अपनी पहली इलेक्ट्रॉन एप्प लिखिये

आम तौर पर, एक इलेक्ट्रॉन एप्प की सरंचना कुछ इस तरह से होती है:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

`package.json` का फॉर्मेट बिल्कुल नोड के मोडयुल्स समान है, और `main` फील्ड द्वारा निर्दिष्ट स्क्रिप्ट आपकी एप्प की स्टार्टअप स्क्रिप्ट है, जो कि मुख्य प्रक्रिया को चलायेगी | `package.json` का एक उदाहरण कुछ इस तरह का होता है:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**नोट**: अगर `package.json` में `main` फील्ड मौज़ूद नहीं है, तो इलेक्ट्रॉन एक `index.js` लोड करने की कोशिश करेगा |

`main.js` को विंडोज निर्मित करनी चाहिये और सिस्टम इवेंट्स को संभालना चाहिये, इसका एक आम तौर पर इस्तेमाल होने वाला उदाहरण:

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