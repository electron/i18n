# Uso di Selenium e WebDriver

Da [ChromeDriver - WebDriver per Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver è uno strumento open source per testare automaticamente le app web per vari browser. Fornisce funzioni per navigare alle pagine web, per l'input utente, per l'esecuzione degli JavaScript ed altro. ChromeDriver è un server autonomo che migliora il protocollo di WebDriver per Chromium. Esso è stato sviluppato dai membri dei team di Chromium e WebDriver.

## Impostare Spectron

[Spectron](https://electronjs.org/spectron) è il ChromeDriver per testare i framework ufficialmente supportata per Electron. Essa è costruita sulla base di [WebdriverIO](http://webdriver.io/) ed ha degli aiuti per accedere alle API di Electron nei tuoi test e bundle di ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// Un semplice test per verificare se una finestra visibile è aperta con un titolo
var Applicazione = require('spectron').Applicazione
var assert = require('assert')

var app = nuova Applicazione({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

app.start().then(function () {
  // Check if the window is visible
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // Verify the window is visible
  assert.equal(isVisible, true)
}).then(function () {
  // Get the window's title
  return app.client.getTitle()
}).then(function (title) {
  // Verify the window's title
  assert.equal(title, 'My App')
}).catch(function (error) {
  // Log any failures
  console.error('Test failed', error.message)
}).then(function () {
  // Stop the application
  return app.stop()
})
```

## Impostare WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) fornisce un pacchetto Node per testare con il driver web, lo useremo come esempio.

### 1. Avvia ChromeDriver

Prima devi scaricare il binario di `chromedriver` ed eseguirlo:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Avviando ChromeDriver (v2.10.291558) sulla porta 9515
Solo connessioni locali consentite.
```

Ricorda il numero di porta `9515`, che sarà usato più tardi

### 2. Installa WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Connettiti a ChromeDriver

The usage of `selenium-webdriver` with Electron is the same with upstream, except that you have to manually specify how to connect chrome driver and where to find Electron's binary:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // La "9515" è la porta aperta da chrome driver.
  .usareServer('http://localhost:9515')
  .conFunzioni({
    chromeOpzioni: {
      // Qui è il precorso al tuo binario di Electron.
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

## Impostare WebdriverIO

[WebdriverIO](http://webdriver.io/) fornisce un pacchetto Node per testare con il driver web.

### 1. Avvia ChromeDriver

Prima devi scaricare il binario di `chromedriver` ed eseguirlo:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Avviando ChromeDriver (v2.10.291558) sulla porta 9515
Solo connessioni locali consentite.
```

Ricorda il numero di porta `9515`, che sarà usato più tardi

### 2. Installa WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Connettiti a chrome driver

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Usa host locale come server di chrome driver
  port: 9515,        // "9515" è la porta aperta da chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Path-to-Your-App/electron', // Percorso al tuo binario Electron.
      args: [/* cli arguments */]           // Optional, perhaps 'app=' + /path/to/your/app/
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

To test your application without rebuilding Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

In alternativa, passa un argomento all'esecuzione con il tuo binario electron che punta alla tua cartella app. Questo elimina il bisogno di copia-incollare la tua app nella directory delle risorse di Electron.