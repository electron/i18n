# Używanie Selenium oraz WebDriver

From [ChromeDriver - WebDriver for Chrome][chrome-driver]:

> WebDriver jest otwartym narzędziem do automatycznego testowania aplikacji internetowych w wielu przeglądarkach. Dostarcza możliwości nawigowania do stron internetowych, danych wejściowych użytkownika, wykonywania JavaScript i więcej. ChromeDriver jest samodzielnym serwerem, który implementuje protokół przewodowy WebDrivera dla Chromium. Jest on opracowywany przez członków zespołów Chromium i WebDriver.

## Konfigurowanie Spectron

[Spectron][spectron] is the officially supported ChromeDriver testing framework for Electron. Jest zbudowany na [WebdriverIO](http://webdriver.io/) i ma pomocników do dostępu do Electron API w testach i pakietach ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// Prosty test w celu sprawdzenia widocznego okna jest otwarty z tytułem
const Application = require('spectron'). pplication
const assert = require('assert')

const myApp = new Application({
  path: '/Applications/MyApp. pp/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  oczekiwana aplikacja. tart()
  spróbuj {
    // Sprawdź, czy okno jest widoczne
    const isVisible = oczekiwanie aplikacji. rowserWindow. sVisible()
    // Sprawdź, czy okno jest widoczne
    asser. trictEqual(isVisible true)
    // Pobierz tytuł okna
    const title = czekaj na aplikację. lient.getTitle()
    // Zweryfikuj tytuł okna
    . trictEqual(title, 'My App')
  } catch (error) {
    // Log any failed
    consolle. rror('Test nie powiódł się', błąd. essage)
  }
  // Zatrzymaj aplikację
  czekaj na app.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## Konfigurowanie z WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) dostarcza pakiet węzła do testowania z sterownikiem internetowym, użyjemy go jako przykładu.

### 1. Uruchom ChromeDriver

Najpierw musisz pobrać plik binarny `chromedriver` i uruchomić go:

```sh
$ npm zainstaluj electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) na porcie 9515
Dozwolone są tylko połączenia lokalne.
```

Zapamiętaj numer portu `9515`, który zostanie użyty później

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Połącz z ChromeDriver

Używanie sterownika `selnium-weblinks` z Electronem jest takie samo z w górę, z wyjątkiem tego, że musisz ręcznie określić jak podłączyć sterownik chrome i gdzie znaleźć plik binarny Electrona:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // "9515" jest portem otwartym przez chrome driver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Oto ścieżka do Twojego programu binarnego Electron.
      binarne: '/Path-to-Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('electron')
  . uild()

driver.get('http://www.google.com')
driver.findElement(webdriver.By.name('q')).SendKeys('webdriver')
kierowca. indElement(webdriver.By.name('btnG')).Kliknij ()
driver.wait(() => {
  return driver.getTitle(). hen((title) => {
    return title === 'webdriver - Google Search'
  })
}, 1000)

kierowca. uit()
```

## Konfigurowanie z WebdriverIO

[WebdriverIO](http://webdriver.io/) dostarcza pakiet węzła do testowania z sterownikiem internetowym .

### 1. Uruchom ChromeDriver

Najpierw musisz pobrać plik binarny `chromedriver` i uruchomić go:

```sh
$ npm zainstaluj electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Uruchamianie ChromeDriver (v2.10.291558) na porcie 9515
Dozwolone są tylko połączenia lokalne.
```

Zapamiętaj numer portu `9515`, który zostanie użyty później

### 2. Zainstaluj WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Połącz ze sterownikiem chrome

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost as chrome driver server
  port: 9515, // "9515" is the port opened by chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Ścieżka do twojej wersji binarnej.
      args: [/* cli arguments */] // Optional, perhaps 'app=' + /path/to/your/app/
    }
  }
}

const client = webdriverio.remote(options)

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

## Przepływ pracy

Aby przetestować aplikację bez przebudowy Electrona, [umieść](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) źródło aplikacji w katalogu zasobów Electrona.

Alternatywnie, podaj argument do uruchomienia w binarnym Electronie, który wskazuje folderu aplikacji. To eliminuje konieczność kopiowania i wklejania aplikacji do katalogu zasobów Electrona.

[chrome-driver]: https://sites.google.com/a/chromium.org/chromedriver/
[spectron]: https://electronjs.org/spectron
