# Het gebruik maken van Selenium en WebDriver

From [ChromeDriver - WebDriver for Chrome][chrome-driver]:

> WebDriver is een open source tool voor het automatisch testen van webapps in vele browsers. Het biedt mogelijkheden om te navigeren naar webpagina's, gebruikersinput, JavaScript executie en meer. ChromeDriver is een standalone server die het wire-protocol van WebDriver voor Chrome implementeert. Het wordt ontwikkeld door leden van het Chromium en WebDriver teams.

## Spectron instellen

[Spectron][spectron] is the officially supported ChromeDriver testing framework for Electron. Het is gebouwd bovenop [WebdriverIO](http://webdriver.io/) en heeft helpers voor toegang tot Electron API's in je tests en bundels ChromeDriver.

```sh
$ npm installeren --save-dev spectron
```

```javascript
// Een eenvoudige test om te controleren of een zichtbaar venster wordt geopend met een titel
const Applicatie = require('spectron'). pplication
const assert = require('assert')

const myApp = new Application({
  pad: '/Applications/MyApp. pp/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  wacht op de app. tart()
  probeer {
    // Controleer of het venster zichtbaar is
    const isVisible = wacht app. rowserRaam. sVisible()
    // Controleer of het venster zichtbaar is
    assert. trictEqual(isVisible, true)
    // Krijg de venstertitel
    const title = wacht de app. lient.getTitle()
    // Controleer de venstertitel
    assert. trictEqual(titel, 'My App')
  } catch (error) {
    // Log eventuele fouten
    console. rror('Test is mislukt', fout. essage)
  }
  // Stop de toepassing
  wacht app.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## Instellen met WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) biedt een Node pakket voor testen met web driver, we zullen het als voorbeeld gebruiken.

### 1. ChromeDriver starten

Eerst moet je de `chromedrivier` binary downloaden en het uitvoeren:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Onthoud het poortnummer `9515`, dat later zal worden gebruikt

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Verbinden met ChromeDriver

Het gebruik van `selenium-webdriver` met Electron is hetzelfde met upstream, behalve dat je handmatig moet aangeven hoe je chrome driver moet verbinden en waar je Electron's binary kunt vinden:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // De "9515" is de poort geopend door chrome driver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Hier is het pad naar je Electron binary.
      binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('electron')
  . uild()

driver.get('http://www.google.com')
driver.findElement(webdriver.By.name('q').sendKeys('webdriver')
driver. indElement(webdriver.By.name('btnG')).click()
driver.wait(() => {
  retourneer driver.getTitle(). hen((titel) => {
    retourtitel === 'webdriver - Google Search'
  })
}, 1000)

stuurprogramma. uit()
```

## Instellen met WebdriverIO

[WebdriverIO](http://webdriver.io/) biedt een Node pakket voor testen met web driver.

### 1. ChromeDriver starten

Eerst moet je de `chromedrivier` binary downloaden en het uitvoeren:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Onthoud het poortnummer `9515`, dat later zal worden gebruikt

### 2. WebdriverIO installeren

```sh
$ npm install webdriverio
```

### 3. Verbinden met chrome driver

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost as chrome driver server
  port: 9515, // "9515" is the port opened by chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Pad naar je Electron binary.
      args: [/* cli argumenten */] // Optioneel, misschien 'app=' + /path/to/your/app/
    }
  }
}

const client = webdriverio. emote(options)

klant
  .init()
  . rl('http://google.com')
  .setValue('#q', 'webdriverio')
  .click('#btnG')
  .getTitle(). hen((titel) => {
    console.log('Titel was: ' + titel)
  })
  .end()
```

## Workflow

Om je applicatie te testen zonder Electron te herbouwen, plaats [](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) je app bron in de resource map van Electron.

Als alternatief geef je een argument door om uit te voeren met je Electron binary die wijst naar de map van je app. Dit voorkomt de noodzaak om je app te kopiëren en plakken in Electron's resource directory.

[chrome-driver]: https://sites.google.com/a/chromium.org/chromedriver/
[spectron]: https://electronjs.org/spectron
