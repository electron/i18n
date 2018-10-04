# सेलेनियम और वेबड्राईवर का इस्तेमाल

[क्रोमड्राईवर - क्रोम के लिए वेबड्राईवर](https://sites.google.com/a/chromium.org/chromedriver/) से:

> वेबड्राईवर बहुत से ब्राउज़र्स में स्वतः परिक्षण करने के लिए एक मुक्त स्त्रोत औज़ार है| यह वेब पेजेस तक पहुँचने, उपयोगकर्ता इनपुट, जावास्क्रिप्ट एक्सीक्यूशन, और बहुत सी दूसरी क्षमतायें प्रदान करता है | क्रोमड्राईवर एक सम्पूर्ण सर्वर है जो कि क्रोमियम के लिए वेबड्राईवर की वायर प्रोटोकॉल को लागू करता है | यह क्रोमियम और वेबड्राईवर टीमों के सदस्यों द्वारा विकसित किया जा रहा है |

## स्पेक्ट्रोन को सेट करना

इलेक्ट्रॉन के लिए [स्पेक्ट्रोन](https://electronjs.org/spectron) आधिकारिक रूप से समर्थित क्रोमड्राईवर परिक्षण फ्रेमवर्क है | यह [वेबड्राईवरआईओ](http://webdriver.io/) के ऊपर निर्मित है और इसके पास आपके परीक्षणों में मौज़ूद इलेक्ट्रॉन ऐपीआई तक पहुँचने के लिए सहायक है और यह क्रोमड्राईवर को भी बंडल करता है |

```sh
$ npm install --save-dev spectron
```

```javascript
// A simple test to verify a visible window is opened with a title
var Application = require('spectron').Application
var assert = require('assert')

var app = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

app.start().then(function () {
  // Check if the window is visible
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // Verify the window is visible
  assert.strictEqual(isVisible, true)
}).then(function () {
  // Get the window's title
  return app.client.getTitle()
}).then(function (title) {
  // Verify the window's title
  assert.strictEqual(title, 'My App')
}).catch(function (error) {
  // Log any failures
  console.error('Test failed', error.message)
}).then(function () {
  // Stop the application
  return app.stop()
})
```

## वेबड्राईवर जेएस सेटअप करना

[वेबड्राईवरजेएस](https://code.google.com/p/selenium/wiki/WebDriverJs) वेब ड्राईवर के साथ परिक्षण करने के लिए एक नोड पैकेज प्रदान करता है, हम उसे एक उदाहरण के तौर पर इस्तेमाल करेंगे |

### 1. क्रोमड्राईवर शुरू करें

सबसे पहले `क्रोमड्राईवर` बाइनरी डाउनलोड करें, और फिर उसे चलायें:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
पोर्ट 9515 पर क्रोमड्राईवर (v2.10.291558) शुरू हो रहा है
केवल लोकल कनेक्शनस को अनुमति है |
```

पोर्ट संख्या `9515` को याद रखें, यह बाद में इस्तेमाल होगी

### 2. वेबड्राईवरजेएस इनस्टॉल करें

```sh
$ npm install selenium-webdriver
```

### 3. क्रोमड्राईवर से कनेक्ट करें

The usage of `selenium-webdriver` with Electron is the same with upstream, except that you have to manually specify how to connect chrome driver and where to find Electron's binary:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
// "9515" वह पोर्ट है जो कि क्रोम ड्राईवर द्वारा खोला गया है |
  .usingServer('http://localhost:9515')
   .withCapabilities({
     chromeOptions: {
       // यह आपकी इलेक्ट्रॉन लाइब्रेरी का पथ है |
      binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
     }
   })
   .forBrowser('electron')
   .build()

driver.get('http://www.google.com')
driver.findElement(webdriver.By.name('q')).sendKeys('webdriv
er')
driver.findElement(webdriver.By.name('btnG')).click()
driver.wait(() => {   
  return driver.getTitle().then((title) => {
     return title === 'webdriver - Google Search'
   })
 }, 1000)

driver.quit()
```

## वेबड्राईवरआईओ को सेटअप करना

[वेबड्राईवरआईओ](http://webdriver.io/) वेब ड्राईवर के साथ परिक्षण करने के लिए एक नोड पैकेज प्रदान करता है |

### 1. क्रोमड्राईवर शुरू करें

सबसे पहले `क्रोमड्राईवर` बाइनरी डाउनलोड करें, और फिर उसे चलायें:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
पोर्ट 9515 पर क्रोमड्राईवर (v2.10.291558) शुरू हो रहा है
केवल लोकल कनेक्शनस को अनुमति है |
```

पोर्ट संख्या `9515` को याद रखें, यह बाद में इस्तेमाल होगी

### 2. वेबड्राईवरआईओ इनस्टॉल करें

```sh
$ npm install webdriverio
```

### 3. क्रोम ड्राईवर से जुड़ें

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost as chrome driver server
  port: 9515, // "9515" is the port opened by chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Path-to-Your-App/electron', // आपकी इलेक्ट्रॉन बाइनरी तक पथ |
      args: [/* cli arguments */] // Optional, perhaps 'app=' + /path/to/your/app/
    }
  }
}

let client = webdriverio.remote(options)

client
  .init()
  .url('http://google.com')
  .setValue('#q', 'webdriverio')
  .click('#btnG')
  .getTitle().then((title) => {
    console.log('Title was: ' + title)
  })
  .end()
```

## वर्कफ्लो

To test your application without rebuilding Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

Alternatively, pass an argument to run with your Electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.