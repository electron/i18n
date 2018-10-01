# Verwendung von Selenium und WebDriver

Aus [ChromeDriver - WebDriver for Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver ist ein Open-Source-Tool zum automatisierten Testen von Webanwendungen in vielen Browsern. Es bietet Funktionen für die Navigation zu Webseiten, Benutzereingaben, JavaScript-Ausführung und mehr. ChromeDriver ist ein eigenständiger Server, der das Wire-Protokoll vom WebDriver für Chromium implementiert. Es wird von Mitgliedern des Chromium- und WebDriver-Teams entwickelt.

## Spectron einrichten

[Spectron](https://electronjs.org/spectron) ist das offiziell unterstützte ChromeDriver Test Framework für Electron. Es basiert auf [WebdriverIO](http://webdriver.io/) und hat Helfer, um auf die Electron APIs in Ihren Tests zuzugreifen und ChromeDriver zu bündeln.

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

## Einrichten mit WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) stellt ein Node-Paket, für Tests mit Web-Treiber, zur Verfügung, wir verwenden es als Beispiel.

### 1. ChromeDriver starten

Zuerst müssen Sie das `chromedriver`-Binary herunterladen und ausführen:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Merken Sie sich die Portnummer `9515`, die später verwendet wird.

### 2. WebDriverJS installieren

```sh
$ npm install selenium-webdriver
```

### 3. Mit ChromeDriver verbinden

Die Verwendung von `selenium-webdriver` mit Electron ist die gleiche wie bei Upstream, nur dass Sie manuell angeben müssen, wie Sie den Chromtreiber anschließen und wo Sie die Binärdatei von Electron finden:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // The "9515" is the port opened by chrome driver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Here is the path to your Electron binary.
      binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('electron')
  .build()

driver.get('http://www.google.com')
driver.findElement(webdriver.By.name('q')).sendKeys('webdriver')
driver.findElement(webdriver.By.name('btnG')).click()
driver.wait(() => {
  return driver.getTitle().then((title) => {
    return title === 'webdriver - Google Search'
  })
}, 1000)

driver.quit()
```

## Einrichten mit WebdriverIO

[WebdriverIO](http://webdriver.io/) stellt ein Node Paket zum Testen mit WebDriver zur Verfügung.

### 1. ChromeDriver starten

Zuerst müssen Sie das `chromedriver`-Binary herunterladen und ausführen:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Merken Sie sich die Portnummer `9515`, die später verwendet wird.

### 2. WebdriverIO installieren

```sh
$ npm install webdriverio
```

### 3. Mit ChromeDriver verbinden

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost as chrome driver server
  port: 9515, // "9515" is the port opened by chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Path-to-Your-App/electron', // Path to your Electron binary.
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

## Workflow

Um Ihre Anwendung ohne Neuaufbau von Electron zu testen, [platzieren](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) Sie Ihre App-Quelle in das Ressourcenverzeichnis von Electron.

Alternatively, pass an argument to run with your Electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.