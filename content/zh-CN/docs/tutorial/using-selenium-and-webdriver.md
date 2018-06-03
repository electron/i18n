# 使用 Selenium 和 WebDriver

引自 [ChromeDriver - WebDriver for Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver 是一款开源的支持多浏览器的自动化测试工具。 它提供了操作网页、用户输入、JavaScript 执行等能力。 ChromeDriver 是一个实现了 WebDriver 与 Chromium 联接协议的独立服务。 它也是由开发了 Chromium 和 WebDriver 的团队开发的。

## 配置 Spectron

[Spectron](https://electronjs.org/spectron) 是 Electron 官方支持的 ChromeDriver 测试框架。 它是建立在 [WebdriverIO](http://webdriver.io/) 的顶层，并且 帮助你在测试中访问 Electron API 和绑定 ChromeDriver。

```sh
$ npm install --save-dev spectron
```

```javascript
// 一个简单的测试验证一个带标题的可见的窗口
var Application = require('spectron').Application
var assert = require('assert')

var app = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

app.start().then(function () {
  // 检查浏览器窗口是否可见
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // 验证浏览器窗口是否可见
  assert.equal(isVisible, true)
}).then(function () {
  // 获得浏览器窗口的标题
  return app.client.getTitle()
}).then(function (title) {
  // 验证浏览器窗口的标题
  assert.equal(title, 'My App')
}).catch(function (error) {
  // 记录任何错误
  console.error('Test failed', error.message)
}).then(function () {
  // 停止应用程序
  return app.stop()
})
```

## 通过 WebDriverJs 配置

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) 是一个可以配合 WebDriver 做测试的 node 模块，我们会用它来做个演示。

### 1. 启动 ChromeDriver

首先，你要下载 `chromedriver`，然后运行以下命令：

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

记住 `9515` 这个端口号，我们后面会用到

### 2. 安装 WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. 连接到 ChromeDriver

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

### 1. 启动 ChromeDriver

首先，你要下载 `chromedriver`，然后运行以下命令：

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

记住 `9515` 这个端口号，我们后面会用到

### 2. 安装 WebdriverIO

```sh
$ npm install webdriverio
```

### 3. 连接到 chrome driver

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // 使用 localhost 作为 ChromeDriver 服务器
  port: 9515,        // "9515"是ChromeDriver使用的端口
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Path-to-Your-App/electron', // Electron的路径
      args: [/* cli arguments */]           // 可选参数，类似：'app=' + /path/to/your/app/
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

当然，你也可以在运行 Electron 时传入参数指定你 app 的所在文件夹。这步可以免去你拷贝－粘贴你的 app 到 Electron 的资源目录。