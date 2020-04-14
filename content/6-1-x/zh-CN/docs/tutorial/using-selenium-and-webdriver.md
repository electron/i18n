# 使用 Selenium 和 WebDriver

引自 [ChromeDriver - WebDriver for Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver 是一款开源的支持多浏览器的自动化测试工具。 它提供了操作网页、用户输入、JavaScript 执行等能力。 ChromeDriver 是一个实现了 WebDriver 与 Chromium 联接协议的独立服务。 它也是由开发了 Chromium 和 WebDriver 的团队开发的。

## 配置 Spectron

[Spectron](https://electronjs.org/spectron) 是 Electron 官方支持的 ChromeDriver 测试框架。 它是建立在 [WebdriverIO](http://webdriver.io/) 的顶层，并且 帮助你在测试中访问 Electron API 和绑定 ChromeDriver。

```sh
$ npm install --save-dev spectron
```

```javascript
// 一个简单的验证测试和一个带标题的可视窗口
const Application = require('spectron').Application
const assert = require('assert')

const myApp = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  await app.start()
  try {
    // 检查窗口是否可见
    const isVisible = await app.browserWindow.isVisible()
    // 验证窗口是否可见
    assert.strictEqual(isVisible, true)
    // 获取窗口标题
    const title = await app.client.getTitle()
    // 验证窗口标题
    assert.strictEqual(title, 'My App')
  } catch (error) {
    // 记录任何故障
    console.error('Test failed', error.message)
  }
  // 停止应用
  await app.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## 通过 WebDriverJs 配置

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) 是一个可以配合 WebDriver 做测试的 node 模块，我们会用它来做个演示。

### 1. Start ChromeDriver

首先，你要下载 `chromedriver`，然后运行以下命令：

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

记住 `9515` 这个端口号，我们后面会用到

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Connect to ChromeDriver

在 Electron 下使用 `selenium-webdriver` 和其平时的用法并没有大的差异，只是你需要手动设置连接 ChromeDriver，以及 Electron 的路径：

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // "9515" 是ChromeDriver使用的端口
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // 这里设置Electron的路径
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

## 通过 WebdriverIO 配置

[WebdriverIO](http://webdriver.io/) 也是一个配合 WebDriver 用来测试的 node 模块.

### 1. Start ChromeDriver

首先，你要下载 `chromedriver`，然后运行以下命令：

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

记住 `9515` 这个端口号，我们后面会用到

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
      binary: '/Path-to-Your-App/electron', // Electron的路径
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

## 工作流

无需重新编译 Electron，只要把 app 的源码[放到](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) Electron的资源目录 里就可直接开始测试了。

Alternatively, pass an argument to run with your Electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.
