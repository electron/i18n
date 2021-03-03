# 使用 Selenium 和 WebDriver

引自 [ChromeDriver - WebDriver for Chrome][chrome-driver]:

> WebDriver 是一款开源的支持多浏览器的自动化测试工具。 它提供了操作网页、用户输入、JavaScript 执行等能力。 ChromeDriver 是一个实现了 WebDriver 与 Chromium 联接协议的独立服务。 它也是由开发了 Chromium 和 WebDriver 的团队开发的。

## 配置 Spectron

[Spectron][spectron] 是 Electron 官方支持的 ChromeDriver 测试框架。 它是建立在 [WebdriverIO](http://webdriver.io/) 的顶层，并且 帮助你在测试中访问 Electron API 和绑定 ChromeDriver。

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

### 3. 连接到 chrome 驱动

```javascript
const webdriverio = require('webdriverio')
const options = format@@
  host: 'localhost', // 使用本地主机作为chrome驱动程序
  端口：9515, // "9515" 是由chrome驱动程序打开的端口。
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Path to your Electron binary.
      args: [/* cli 参数 */] // 可选， 也许'app=' + /path/to/your/app/
    }
  }


const 客户端 = webdriverio。 emote(选项)

客户端
  .init()
  . rl('http://google.com')
  .setValue('#q', 'webdriverio')
  .click('#btnG')
  .getTitle(). hen(title) => @un.org
    console.log('title was: ' + title)
  })
  .end()
```

## 工作流

无需重新编译 Electron，只要把 app 的源码[放到](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) Electron的资源目录 里就可直接开始测试了。

或者，传递一个参数，与您的 Electron 二进制运行，指向您的 个应用文件夹。 这就消除了将您的应用复制粘贴到 Electron 资源目录的必要性。

[chrome-driver]: https://sites.google.com/a/chromium.org/chromedriver/
[spectron]: https://electronjs.org/spectron
