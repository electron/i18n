# Використання Selenium і WebDriver

From [ChromeDriver - WebDriver for Chrome][chrome-driver]:

> WebDriver - це інструмент з відкритим кодом для автоматизації тестування веб-додатків через багато браузерів. Він надає можливості для навігації по веб-сторінках, введення користувачем, виконання JavaScript і багато іншого. ChromeDriver - це автономний сервер, який реалізує протокол дроту WebDriver, для Chromium. Розробляється членами команди Chromium та WebDriver.

## Налаштування Spectron

[Spectron][spectron] is the officially supported ChromeDriver testing framework for Electron. Він побудований на вершині [WebdriverIO](http://webdriver.io/) і має помічників для доступу до Electron API у ваших тестах та вузлах ChromeDriver.

```sh
$ npm встановити - save-dev спектр
```

```javascript
// Простий тест для перевірки видимого вікна відкривається з заголовком
const Application = require('spectron').Application
const assert = require('assert')

const myApp = new Application({
  шлях: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  await app.start()
  спробуйте {
    // Перевірити, чи вікно видиме
    const isVisible = await app.browserWindow.isVisible()
    // Переконатися, що вікно видиме
    assert.strictEqual(isVisible, true)
    // Отримати заголовок вікна
    const title = await app.client.getTitle()
    // Перевірити заголовок вікна
    assert.strictEqual(title, 'My App')
  } catch (error) {
    // Записати будь-які збої
    console.error('Тест не пройдено', error.message)
  }
  // Зупинити додаток
  await app.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## Налаштування з WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) надає пакет Node для тестування з веб-драйвером, ми будемо використовувати його як приклад.

### 1. Запустити ChromeDriver

Спочатку потрібно завантажити двійковий файл `chromedrik` і запустити його:

```sh
$ npm встановити electron-chromedriver
$ ./node_modules/.bin/chromedriver
Починаючи ChromeDriver (v2.10.291558) на порт 9515
дозволено лише локальні підключення.
```

Запам'ятайте номер порту `9515`, який буде використовуватись пізніше

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Підключення до ChromeDriver

Використання `selenium-webdriver` з Electron однакове з upstream, за винятком випадків, коли потрібно вручну вказати як підключити chrome драйвер та де знайти двійковий код Electron:

```javascript
const webdriver = require('selenium-driver')

const driver = new webdriver.Builder()
  // "9515" - порт, відкритий драйвером chrome.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Ось шлях до двійкового файлу Electron.
      binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('electron')
  . uild()

driver.get('http://www.google.com')
driver.findElement(webdriver.By.name('q').sendKeys('webdriver')
. indElement(webdriver.By.name('btnG').click()
driver.wait(() => {
  return driver.getTitle(). hen((title) => {
    return === 'webdriver - Google Search'
  })
}, 1000)

водія. uit()
```

## Налаштування за допомогою WebdriverIO

[WebdriverIO](http://webdriver.io/) забезпечує пакет вузла для тестування з веб драйвером.

### 1. Запустити ChromeDriver

Спочатку потрібно завантажити двійковий файл `chromedrik` і запустити його:

```sh
$ npm встановити electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Починаючи ChromeDriver (v2.10.291558) на порт 9515
Дозволені тільки місцеві з’єднання.
```

Запам'ятайте номер порту `9515`, який буде використовуватись пізніше

### 2. Встановити WebdriverIO

```sh
$ npm встановити webdriverio
```

### 3. Підключитися до драйвера chrome

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Використовувати localhost як сервер драйвера chrome
  порт: 9515, // "9515" - порт, відкритий драйвером chrome.
  бажані можливості: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Шлях до вашого виконуваного Electron binary.
      args: [/* cli аргументи */] // Необов'язковий, можливо 'app=' + /path/to/your/app/
    }
  }


const client = webdriverio. емоції (необов'язково)

клієнт
  .init()
  . rl('http://google.com')
  .setValue('#q', 'webdriverio')
  .click('#btnG')
  .getTitle(). hen((title) => {
    console.log('Title було: ' + title)
  })
  .end()
```

## Робочий процес

Щоб перевірити вашу програму без перебудови Electron, [розмістіть](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) джерело додатків у каталог ресурсів Electron.

Крім того, пройдіть аргумент для запуску з вашим двійковим кодом Electron що вказує на папку вашого застосунку. Це усуває необхідність копіювання вашого додатку на ресурсний каталог Electron.

[chrome-driver]: https://sites.google.com/a/chromium.org/chromedriver/
[spectron]: https://electronjs.org/spectron
