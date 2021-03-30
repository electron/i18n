# Использование Selenium и WebDriver

От [ChromeDriver - WebDriver для Chrome][chrome-driver]:

> WebDriver — это инструмент с открытым исходным кодом для автоматизации тестирования веб-приложений во многих браузерах. Он предоставляет возможности для навигации на веб-страницы, ввода пользователя, - выполнение JavaScript и многое другое. ChromeDriver - это автономный сервер, который использует протокол провода WebDriver для Chromium. Он разрабатывается членами команд Chromium и WebDriver.

## Настройка Spectron

[Spectron][spectron] - официально поддерживаемая среда тестирования ChromeDriver для Electron. Он построен на основе [WebdriverIO](http://webdriver.io/) и имеет помощников для доступа к API Electron в ваших тестах и в комплекте с ChromeDriver.

```sh
$ npm установить --save-dev спектр
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

### 1. Запустить ChromeDriver

Сначала вам нужно скачать бинарный файл `chromedriver` и запустить его:

```sh
$ npm установить electron-chromedriver
$ ./node_modules/.bin/chromedriver
Начиная ChromeDriver (v2.10.291558) по порту 9515
Разрешены только локальные подключения.
```

Запомните номер порта `9515`, который будет использоваться позже

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Подключиться к ChromeDriver

Использование `selenium-webdriver` с Electron совпадает с исходным кодом, за исключением того, что вам нужно вручную указать как подключить chrome драйвер и где найти двоичный файл Electron:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // "9515" - это порт, открытый chrome драйвером.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Вот путь к вашему двоичному файлу Electron.
      binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('electron')
  . uild()

driver.get('http://www.google.com')
driver.findElement(webdriver.By.name('q').sendKeys('webdriver')
драйвер. indElement(webdriver.By.name('btnG')).click()
driver.wait(() => {
  return driver.getTitle(). hen((title) => {
    return title === 'webdriver - Google Search'
  })
}, 1000)

водителя. uit()
```

## Настройка с WebdriverIO

[WebdriverIO](http://webdriver.io/) предоставляет пакет узлов для тестирования с драйвером в сети.

### 1. Запустить ChromeDriver

Сначала вам нужно скачать бинарный файл `chromedriver` и запустить его:

```sh
$ npm установить electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Начиная ChromeDriver (v2.10.291558) по порту 9515
Разрешены только локальные подключения.
```

Запомните номер порта `9515`, который будет использоваться позже

### 2. Установить WebdriverIO

```sh
$ npm установить webdriverio
```

### 3. Подключиться к chrome водителю

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Использование localhost как chrome driver server
  port: 9515, // "9515" - порт, открытый chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Путь к исполняемому файлу Electron.
      args: [/* cli аргументы */] // Необязательно, возможно, 'app=' + /path/to/your/app/
    }
  }
}

const client = webdriverio. emote(options)

client
  .init()
  . rl('http://google.com')
  .setValue('#q', 'webdriverio')
  .click('#btnG')
  .getTitle(). hen(title) => {
    console.log('Название было: ' + title)
  })
  .end()
```

## Рабочий процесс

Чтобы протестировать ваше приложение без пересборки Electron, [поместите](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) источник приложения в каталог ресурсов Electron.

В качестве альтернативы, передайте аргумент для запуска в бинарном файле Electron, который указывает на папку вашего приложения. Это устраняет необходимость копирования вашего приложения в каталог ресурсов Electron.

[chrome-driver]: https://sites.google.com/a/chromium.org/chromedriver/
[spectron]: https://electronjs.org/spectron
