# Selenium 과 WebDriver 사용하기

From [ChromeDriver - WebDriver for Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver는 많은 브라우저에서 웹 응용 프로그램을 자동으로 테스트 할 수있는 오픈 소스 도구입니다. 웹 페이지, 사용자 입력, JavaScript 실행 등을 탐색 할 수있는 기능을 제공합니다. ChromeDriver는 Chromium 용 WebDriver의 와이어 프로토콜을 구현하는 독립 실행 형 서버입니다. Chromium 및 WebDriver 팀 구성원이 개발 중입니다.

## Spectron 설정

[Spectron](https://electronjs.org/spectron)은 공식적으로 지원되는 Electron의 ChromeDriver 테스트 프레임 워크입니다. [WebdriverIO](http://webdriver.io/) 위에 구축되어 ChromeDriver 테스트 및 번들에서 Electron API에 액세스 할 수있는 도우미가 있습니다.

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

## WebDriverJs로 설정하기

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs)는 웹 드라이버 테스트를위한 Node 패키지를 제공하며 다음 예제처럼 사용합니다.

### 1. 크롬 드라이버 시작

먼저, `chromedriver`바이너리를 다운로드 받고 실행합니다:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

포트 `9515`는 나중에 사용하므로 기억해 놓습니다.

### 2. WebDriverJS 설치

```sh
$ npm install selenium-webdriver
```

### 3. 크롬 드라이버에 연결

`selenium-webdriver` 를 Electron과 같이 사용하는 방법은 기본적으로 upstream과 같습니다. 한가지 다른점이 있다면 수동으로 크롬 드라이버 연결에 대해 설정하고 Electron 실행파일의 위치를 전달합니다:

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

## WebdriverIO 설정하기

[WebdriverIO](http://webdriver.io/)는 웹 드라이버와 함께 테스트를 위해 제공되는 node 패키지입니다.

### 1. 크롬 드라이버 시작

먼저, `chromedriver`바이너리를 다운로드 받고 실행합니다:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

포트 `9515`는 나중에 사용하므로 기억해 놓습니다.

### 2. WebDriverIO 설치

```sh
$ npm install webdriverio
```

### 3. 크롬 드라이버에 연결

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

## 워크플로우

따로 Electron을 다시 빌드하지 않는 경우 간단히 애플리케이션을 Electron의 리소스 디렉터리에 [배치](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md)하여 바로 테스트 할 수 있습니다.

Alternatively, pass an argument to run with your Electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.