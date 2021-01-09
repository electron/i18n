# Verwendung von Selenium und WebDriver

Aus [ChromeDriver - WebDriver for Chrome][chrome-driver]:

> WebDriver ist ein Open-Source-Tool zum automatisierten Testen von Webanwendungen in vielen Browsern. Es bietet Funktionen für die Navigation zu Webseiten, Benutzereingaben, JavaScript-Ausführung und mehr. ChromeDriver ist ein eigenständiger Server, der das Wire-Protokoll vom WebDriver für Chromium implementiert. Es wird von Mitgliedern des Chromium- und WebDriver-Teams entwickelt.

## Spectron einrichten

[Spectron][spectron] ist das offiziell unterstützte ChromeDriver Test Framework für Electron. Es basiert auf [WebdriverIO](http://webdriver.io/) und hat Helfer, um auf die Electron APIs in Ihren Tests zuzugreifen und ChromeDriver zu bündeln.

```sh
$ npm install --save-dev spectron
```

```javascript
// Ein einfacher Test zur Verifizierung eines sichtbaren Fensters wird mit dem Titel
const Application = require('spectron') geöffnet. pplication
const assert = require('assert')

const myApp = new Application({
  path: '/Applications/MyApp. pp/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  warten app. tart()
  try {
    // Prüfen Sie, ob das Fenster sichtbar ist
    const isVisible = wait app. rowserWindow. sVisible()
    // Überprüfen Sie, dass das Fenster sichtbar ist
    assert. trictEqual(isVisible, true)
    // Holen Sie sich den Titel des Fensters
    const title = erwarten App. lient.getTitle()
    // Überprüfen Sie den Titel des Fensters
    assert. trictEqual(title, 'Meine App')
  } catch (error) {
    // Fehler protokollieren
    Konsole. rror('Test fehlgeschlagen, Fehler. essage)
  }
  // Anwendung stoppen
  wartet app.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## Einrichten mit WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) stellt ein Node-Paket, für Tests mit Web-Treiber, zur Verfügung, wir verwenden es als Beispiel.

### 1. ChromeDriver starten

Zuerst müssen Sie das `chromedriver`-Binary herunterladen und ausführen:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Merken Sie sich die Portnummer `9515`, die später verwendet wird.

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Mit ChromeDriver verbinden

Die Verwendung von `selenium-webdriver` mit Electron ist die gleiche wie bei Upstream, nur dass Sie manuell angeben müssen, wie Sie den Chromtreiber anschließen und wo Sie die Binärdatei von Electron finden:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // Der "9515" ist der vom Chromtreiber geöffnete Port.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Hier ist der Pfad zur Electron Binärdatei.
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

## Einrichten mit WebdriverIO

[WebdriverIO](http://webdriver.io/) stellt ein Node Paket zum Testen mit WebDriver zur Verfügung.

### 1. ChromeDriver starten

Zuerst müssen Sie das `chromedriver`-Binary herunterladen und ausführen:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Merken Sie sich die Portnummer `9515`, die später verwendet wird.

### 2. WebdriverIO installieren

```sh
$ npm install webdriverio
```

### 3. Mit Chrom-Treiber verbinden

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Verwenden Sie localhost als Chrom-Treiber-Server
  Port: 9515, // "9515" ist der Port, der vom Chrom-Treiber geöffnet wird.
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Pfad zur Electron binary.
      args: [/* cli Argumente */] // Optional, vielleicht 'app=' + /path/to/your/app/
    }
  }
}

lassen Sie Client = webdriverio. emote(options)

client
  .init()
  . rl('http://google.com')
  .setValue('#q', 'webdriverio')
  .click('#btnG')
  .getTitle(). hen((title) => {
    console.log('Title was: ' + title)
  })
  .end()
```

## Workflow

Um Ihre Anwendung ohne Neuaufbau von Electron zu testen, [platzieren](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) Sie Ihre App-Quelle in das Ressourcenverzeichnis von Electron.

Alternativ können Sie ein Argument übergeben, um mit Ihrem Electron-Programm auszuführen, das auf den Ordner Ihrer App verweist. Dies vermeidet die Notwendigkeit, Ihre App in das Ressourcenverzeichnis zu kopieren.

[chrome-driver]: https://sites.google.com/a/chromium.org/chromedriver/
[spectron]: https://electronjs.org/spectron
