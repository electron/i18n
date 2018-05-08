# 使用 Selenium 及 WebDriver

From [ChromeDriver - WebDriver for Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver is an open source tool for automated testing of web apps across many browsers. It provides capabilities for navigating to web pages, user input, JavaScript execution, and more. ChromeDriver is a standalone server which implements WebDriver's wire protocol for Chromium. It is being developed by members of the Chromium and WebDriver teams.

## 設定 Spectron

[Spectron](https://electronjs.org/spectron) is the officially supported ChromeDriver testing framework for Electron. It is built on top of [WebdriverIO](http://webdriver.io/) and has helpers to access Electron APIs in your tests and bundles ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// 簡單的測試案例，驗證指定標題的視窗有正常顯示出來
var Application = require('spectron').Application
var assert = require('assert')

var app = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

app.start().then(function () {
  // 檢查視窗是可視的
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // 驗證視窗是可視的
  assert.equal(isVisible, true)
}).then(function () {
  // 取得視窗標題
  return app.client.getTitle()
}).then(function (title) {
  // 驗證視窗標題
  assert.equal(title, 'My App')
}).catch(function (error) {
  // 將錯誤記錄下來
  console.error('測試失敗', error.message)
}).then(function () {
  // 停止應用程式
  return app.stop()
})
```

## 設定 WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) provides a Node package for testing with web driver, we will use it as an example.

### 1. 啟動 ChromeDriver

First you need to download the `chromedriver` binary, and run it:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Remember the port number `9515`, which will be used later

### 2. 安裝 WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. 連線到 ChromeDriver

The usage of `selenium-webdriver` with Electron is the same with upstream, except that you have to manually specify how to connect chrome driver and where to find Electron's binary:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // "9515" 是 Chrome 驅動程式開的連接埠。
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Electron 執行檔的路徑。
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

## 設定 WebdriverIO

[WebdriverIO](http://webdriver.io/) provides a Node package for testing with web driver.

### 1. 啟動 ChromeDriver

First you need to download the `chromedriver` binary, and run it:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Remember the port number `9515`, which will be used later

### 2. 安裝 WebdriverIO

```sh
$ npm install webdriverio
```

### 3. 連線到 Chrome 驅動程式

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // 使用 localhost 的 Chromes 驅動程式伺服器
  port: 9515,        // "9515" 是由 Chrome 驅動程式開的連接埠。
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Path-to-Your-App/electron', // Electron 執行檔的路徑。
      args: [/* cli arguments */]           // 非必填，可能是 'app=' + /path/to/your/app/
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

## 工作流程

To test your application without rebuilding Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

Alternatively, pass an argument to run with your electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.