# Использование Selenium и WebDriver

От [ChromeDriver - WebDriver для Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver — это инструмент с открытым исходным кодом для автоматизации тестирования веб-приложений во многих браузерах. Он предоставляет возможности для навигации на веб-страницы, ввода пользователя, - выполнение JavaScript и многое другое. ChromeDriver - это автономный сервер, который использует протокол провода WebDriver для Chromium. Он разрабатывается членами команд Chromium и WebDriver.

## Настройка Spectron

[Spectron](https://electronjs.org/spectron) - официально поддерживаемая среда тестирования ChromeDriver для Electron. Он построен на основе [WebdriverIO](http://webdriver.io/) и имеет помощников для доступа к API Electron в ваших тестах и в комплекте с ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// Простой тест для проверки того, что видимое окно открывается с заголовком
const Application = require('spectron').Application
const assert = require('assert')

const myApp = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  await app.start()
  try {
    // Проверить, видно ли окно
    const isVisible = await app.browserWindow.isVisible()
    // Убедиться что окно видимое
    assert.strictEqual(isVisible, true)
    // Получить заголовок окна
    const title = await app.client.getTitle()
    // Проверить заголовок окна
    assert.strictEqual(title, 'Мое Приложение')
  } catch (error) {
    // Журналировать любые сбои
    console.error('Тест не пройден', error.message)
  }
  // Остановить приложение
  await app.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## Настройка с помощью WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) предоставляет пакет узлов для тестирования с веб-драйвером, мы будем использовать его в качестве примера.

### 1. Start ChromeDriver

Сначала вам нужно скачать бинарный файл `chromedriver` и запустить его:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Запомните номер порта `9515`, который будет использоваться позже

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

### 1. Start ChromeDriver

Сначала вам нужно скачать бинарный файл `chromedriver` и запустить его:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Запомните номер порта `9515`, который будет использоваться позже

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

To test your application without rebuilding Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

Alternatively, pass an argument to run with your Electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.
