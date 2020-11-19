# Utilizarea Selenium și WebDriver

From [ChromeDriver - WebDriver for Chrome][chrome-driver]:

> WebDriver este un instrument open source pentru testarea automată a aplicațiilor web în multe browsere. Acesta oferă capabilități pentru navigarea la pagini web, intrări ale utilizatorului, execuție JavaScript și multe altele. ChromeDriver este un server de sine stătător, care implementează protocolul de fir al WebDriver pentru Chromium. Acesta este dezvoltat de membrii echipelor de crom şi WebDriver.

## Configurarea Spectron

[Spectron][spectron] is the officially supported ChromeDriver testing framework for Electron. It is built on top of [WebdriverIO](https://webdriver.io/) and has helpers to access Electron APIs in your tests and bundles ChromeDriver.

```sh
$ npm instalare --save-dev spectron
```

```javascript
// Un test simplu pentru a verifica dacă o fereastră vizibilă este deschisă cu un titlu
const Application = require('spectron'). pplication
const assert = require('assert')

const myApp = new Application({
  : '/Applications/MyApp. pp/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  așteaptă aplicația. tart()
  încercaţi {
    // Verificaţi dacă fereastra este vizibilă
    const isVisible = await app. rowserWindow. sVizibil()
    // Verificați dacă fereastra este vizibilă
    . trictEqual(isVisible, true)
    // Obține titlul ferestrei
    const titlu = așteaptă app. lient.getTitle()
    // Verificați titlul ferestrei
    . trictEqual(title, 'My App')
  } captura (eroare) {
    // Jurnal orice eșec
    consolă. rror('Test esuat', eroare. essage)
  }
  // Opriți aplicația
  așteaptă app.stop()
}

verifyWindowIsbleWithTitle(myApp)
```

## Configurarea cu WebDriverJ

[WebDriverJs](https://www.selenium.dev/selenium/docs/api/javascript/index.html) provides a Node package for testing with web driver, we will use it as an example.

### 1. Pornește ChromeDriver

În primul rând trebuie să descarci binarul `chromedriver` și să-l rulezi:

```sh
$ npm instalează electron-chromedriver
$ ./node_modules/.bin/chromedriver
Pornind ChromeDriver (v2.10.291558) pe portul 9515
Sunt permise numai conexiuni locale.
```

Amintiţi-vă numărul portului `9515`, care va fi folosit mai târziu

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Conectează-te la ChromeDriver

Utilizarea `selenium-webdriver` cu Electron este identică cu în amonte, exceptând faptul că trebuie să specifici manual cum să conectezi chrome driver și unde să găsești binarul Electronului:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // Portul deschis de către șoferul chrome.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Aici este calea către binarul dvs. Electron.
      binar: '/Path-to-Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('electron')
  . uild()

driver.get('http://www.google.com')
driver.findElement(webdriver.By.name('q')).sendKeys('webdriver')
driver. indElement(webdriver.By.name('btnG')).click()
driver.wait(() => {
  return driver.getTitle(). hen(title) => {
    return title === 'webdriver - Google Search'
  })
}, 1000)

șofer. ()
```

## Configurarea cu WebdriverIO

[WebdriverIO](https://webdriver.io/) provides a Node package for testing with web driver.

### 1. Pornește ChromeDriver

În primul rând trebuie să descarci binarul `chromedriver` și să-l rulezi:

```sh
$ npm instalează electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Pornind ChromeDriver (v2.10.291558) în portul 9515
Doar conexiunile locale sunt permise.
```

Amintiţi-vă numărul portului `9515`, care va fi folosit mai târziu

### 2. Instalează WebdriverIO

```sh
$ npm instalați webdriverio
```

### 3. Conectează-te la chrome driver

```javascript
const webdriverio = require('webdriverio')
opțiunile de const = {
  host: 'localhost', // Folosiți localhost ca server de șofer partener de chrom
  port: 9515, // "9515" este portul deschis de șoferul chrome.
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Calea către binarul dvs. Electron
      args: [/* argumente cli */] // Opționale, Poate 'app=' + /path/to/your/app/
    }
  }
}

const client = webdriverio. emote(opțiuni)

client
  .init()
  . rl('http://google.com')
  .setValue('#q', 'webdriverio')
  .click('#btnG')
  .getTitle(). hen(title) => {
    console.log('Titlu a fost: ' + title)
  })
  .end()
```

## Flux

Pentru a testa aplicația ta fără a reconstrui Electron, [plasează](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) sursa aplicației tale în directorul de resurse Electron.

Alternativ, transmiteți un argument pentru a rula cu binarul dvs. Electron care indică către directorul aplicației dvs. Acest lucru elimină necesitatea de a copia aplicația dvs. în Directorul de resurse al Electron.

[chrome-driver]: https://sites.google.com/a/chromium.org/chromedriver/
[spectron]: https://electronjs.org/spectron
