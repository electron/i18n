# SeleniumとWebDriverを使用する

[ChromeDriver - クローム向けのWebDriver](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriverは、ブラウザを横断的なテストの自動化を実現するためのオープンソースツールです。 このドライバはウェブページの遷移、インプット項目への入力、JavaScriptの実行などの機能を提供します。 ChromeDriverはChromium向けWebDriverのワイヤープロトコルを実装した、スタンドアローンサーバです。 このドライバは、ChromiumとWebDriverチームによって開発されています。

## Spectronを設定する

[Spectron](https://electronjs.org/spectron)はオフィシャルにサポートされているElectron向けChromeDriverテストフレームワークです。 これは[WebdriverIO](http://webdriver.io/)上に構築されており、テストプログラム内でElectron APIにアクセスする為のヘルパーとChromeDriverを内包しています。

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

## WebDriverJs の設定

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) は、Web Driver でテストするための Node パッケージを提供します。ここでは例として使用します。

### 1. ChromeDriver の開始

最初に、`chromedriver` バイナリをダウンロードして実行する必要があります。

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

後で使用されるポート番号 `9515` を覚えておいてください。

### 2. WebDriverJS のインストール

```sh
$ npm install selenium-webdriver
```

### 3. ChromeDriver へ接続

Electron での `selenium-webdriver` の使用方法は、手動で chrome driver の接続方法と Electron のバイナリの検索場所を指定する必要があることを除いて、upstream と同じです。

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

## WebdriverIO で設定する

[WebdriverIO](http://webdriver.io/) は、Web Driver でテストするための Node パッケージを提供します。

### 1. ChromeDriver の開始

最初に、`chromedriver` バイナリをダウンロードして実行する必要があります。

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

後で使用されるポート番号 `9515` を覚えておいてください。

### 2. WebdriverIO のインストール

```sh
$ npm install webdriverio
```

### 3. ChromeDriver へ接続

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

## ワークフロー

Electron を再構築せずにアプリケーションをテストするには、アプリケーションソースを Electron のリソースディレクトリに[配置します](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md)。

Electron バイナリに引数を渡すことでも、実行するアプリのフォルダを指定できます。 こうすれば、アプリを Electron のリソースディレクトリにコピーペーストする必要はありません。
