# Ang Paggamit ng Selenium at WebDriver

Nagmula sa [ChromeDriver - WebDriver para sa Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver ay isang bukas na kagamitan na mapagkukunan para sa automatikong pagsusuri ng web apps sa kabuuan ng maraming mga browsers. Ito ay nagbibigay nang capabilidad para sa pag-navigate sa mga pahina nang web, input ng gumagamit, pagpapatupad ng JavaScript at marami pang iba. ChromeDriver ay isang standalone server kung saan nagpapatupad ng wire protokol ang WebDriver para sa Chromium. Ito ay kasalukuyang pinapaunlad ng mga myembro ng mga grupo ng Chromium at WebDriver.

## Inaayos ang Spectron

[Spectron](https://electronjs.org/spectron) ay ang opisyal na sinusuportahan ng ChromeDriver sa pagsusuri ng balangkas para sa Electron. Ito ay itinayo sa itaas ng [WebdriverIO](http://webdriver.io/) at may mga katulong upang ma-access ang Electron API sa iyong mga pagsubok at mga bundle na ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// Ang isang simpleng pagsubok upang i-verify ang isang nakikitang window ay binuksan gamit ang isang pamagat
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

## Pagse-set up sa WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) ay nagbibigay isang pakete ng Node para sa pagsubok sa web driver, gagamitin namin ito bilang isang halimbawa.

### 1. Simulan ang ChromeDriver

First you need to download the `chromedriver` binary, and run it:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Remember the port number `9515`, which will be used later

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Connect to ChromeDriver

The usage of `selenium-webdriver` with Electron is the same with upstream, except that you have to manually specify how to connect chrome driver and where to find Electron's binary:

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

## Setting up with WebdriverIO

[WebdriverIO](http://webdriver.io/) provides a Node package for testing with web driver.

### 1. Simulan ang ChromeDriver

First you need to download the `chromedriver` binary, and run it:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Remember the port number `9515`, which will be used later

### 2. Install WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Connect to chrome driver

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost as chrome driver server
  port: 9515,        // "9515" is the port opened by chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Path-to-Your-App/electron', // Path to your Electron binary.
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

Alternatively, pass an argument to run with your electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.