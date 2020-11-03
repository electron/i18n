# Využití Selenium a WebDriver

Od [ChromeDriver – WebDriver pro Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver je open source nástroj pro automatické testování webových aplikací v mnoha prohlížečích. Umožňuje navigaci na webové stránky, uživatelský vstup, spuštění JavaScriptu a další. ChromeDriver je samostatný server, který implementuje WebDriver drát pro Chromium. Vyvíjí ji členové týmů Chromium a WebDriver

## Nastavuji Spectron

[Spectron](https://electronjs.org/spectron) je oficiálně podporovaný systém testování ChromeDriver pro Electron. It is built on top of [WebdriverIO](https://webdriver.io/) and has helpers to access Electron APIs in your tests and bundles ChromeDriver.

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

## Nastavení pomocí WebDriverJs

[WebDriverJs](https://www.selenium.dev/selenium/docs/api/javascript/index.html) provides a Node package for testing with web driver, we will use it as an example.

### 1. Spustit ChromeDriver

Nejprve si musíte stáhnout binární soubor `chromedriver` a spustit jej:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Pouze lokální připojení jsou povolena.
```

Pamatovat si číslo portu `9515`, který bude použit později

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Připojit k ChromeDriver

Používání `selenium-webdriver` s Electron je stejné s předcházejícím streamem, kromě toho, že musíte ručně určit, jak se připojit chrome ovladač a kde najít binární soubor Electron:

```javascript
const webdriver = require('selenium-webdriver')

const driver = nový webdriver.Builder()
  // "9515" je port otevřený chrome driver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Zde je cesta k vašemu Electron binárnímu binaru.
      binary: '/Cesta k Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('electron')
  . uild()

driver.get('http://www.google.com')
driver.findElement(webdriver.By.name('q')).sendKeys('webdriver')
driver. indElement(webdriver.By.name('btnG')).klikni ()
driver.wait() => {
  return driver.getTitle(). hen(((title) => {
    return title === 'webdriver - Google Search'
  })
}, 1000)

řidiče. uit()
```

## Nastavení pomocí WebdriverIO

[WebdriverIO](https://webdriver.io/) provides a Node package for testing with web driver.

### 1. Spustit ChromeDriver

Nejprve si musíte stáhnout binární soubor `chromedriver` a spustit jej:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Pouze lokální připojení jsou povolena.
```

Pamatovat si číslo portu `9515`, který bude použit později

### 2. Nainstalovat WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Připojit k chrome ovladači

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Použijte localhost jako server ovladače chrome
  port: 9515, // "9515" je port otevřený ovladačem chrome.
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Cesta k vašemu Electron binary.
      náklady: [/* cli argumenty */] // Nepovinné, Možná 'app=' + /path/to/your/app/
    }
  }
}

const client = webdriverio. emote(volitelně)

klient
  .init()
  . rl('http://google.com')
  .setValue('#q', 'webdriverio')
  .click('#btnG')
  .getTitle(). hen(((title) => {
    console.log('Nadpis: ' + title)
  })
  .end()
```

## Pracovní postup

Chcete-li vyzkoušet vaši aplikaci bez přestavby Electronu, [umístěte](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) váš zdroj aplikace do adresáře zdrojů Electronu.

Případně předejte argument, který běží s vaším Electron binárním souborem, který odkazuje na složku vaší aplikace. Tím se eliminuje potřeba kopírovat aplikaci do adresáře zdrojů Electronu.
