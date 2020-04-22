# Selenyum ve WebDriver Kullanma

[ChromeDriver - Chrome için WebDriver](https://sites.google.com/a/chromium.org/chromedriver/)'dan:

> WebDriver farklı tarayıcılar üzerinde web uygulamaları test etmek için açık kaynak bir araçtır. Web sayfalarını gezinme, kullanıcı girdisi, Javascript çalıştırma ve daha fazlasını yapabilir. ChromeDriver, Chrome için WebDriver'ın ağ protokolünü gerçekleyen, kendi başına çalışan bir sunucudur. Chromium ve Webdriver takımları tarafından geliştirilir.

## Spectron'u Ayarlama

[Spectron](https://electronjs.org/spectron), Electron için resmi olarak desteklenen test çatısıdır. [WebdriverIO](http://webdriver.io/) üzerinde yapılmıştır, testlerinizde Electron API'lerine erişim için yardımcı olur ve içinde ChromeDriver'ı barındırır.

```sh
$ npm install --save-dev spectron
```

```javascript
// A simple test to verify a visible window is opened with a title
const Application = require('spectron').Application
const assert = require('assert')

const myApp = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  await app.start()
  try {
    // Check if the window is visible
    const isVisible = await app.browserWindow.isVisible()
    // Verify the window is visible
    assert.strictEqual(isVisible, true)
    // Get the window's title
    const title = await app.client.getTitle()
    // Verify the window's title
    assert.strictEqual(title, 'My App')
  } catch (error) {
    // Log any failures
    console.error('Test failed', error.message)
  }
  // Stop the application
  await app.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## WebDriverjs'yi Ayarlama

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) Web driver kullanarak test yapmanıza yarayan bir Node paketidir, biz de örnek olarak kullanacağız.

### 1. Start ChromeDriver

Öncelikle `chromedriver`'ı indirin ve başlatın:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

`9515` port numarasını unutmayın, daha sonra kullanacağız

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Connect to ChromeDriver

The usage of `selenium-webdriver` with Electron is the same with upstream, except that you have to manually specify how to connect chrome driver and where to find Electron's binary:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  //  "9515" chrome tarafından açılan port numarası.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Electron binary dosyasına giden dizin.
      binary: '/UygulamaDizini/Contents/MacOS/Electron'
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
 
Context | Request Context
```

## WebdriverIO'yu Ayarlama

[WebdriverIO](http://webdriver.io/), web sürücüsü ile test etmek için bir Node paketi sağlar.

### 1. Start ChromeDriver

Öncelikle `chromedriver`'ı indirin ve başlatın:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

`9515` port numarasını unutmayın, daha sonra kullanacağız

### 2. Install WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Connect to chrome driver

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost as chrome driver server
  port: 9515, // "9515" is the port opened by chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/UygulamaDizini/electron', // Electron binary dosyasına giden dizin.
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

## İş Akışı

To test your application without rebuilding Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

Alternatively, pass an argument to run with your Electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.
