# Selenium et WebDriver

De [ChromeDriver - WebDriver pour Chrome][chrome-driver] :

> WebDriver est un outil open source pour les tests automatisés d'applications web sur plusieurs navigateurs. Il fournit des fonctions pour naviguer vers les pages web, simuler l'input utilisateur, l’exécution de JavaScript, etc... . ChromeDriver est un serveur autonome qui implémente le protocole de WebDriver (WebDriver's wire protocol) pour Chromium. Il est développé par des membres des équipes chrome et WebDriver.

## Mise en place de Spectron

[Spectron][spectron] est le framework ChromeDriver de test officiel pour Electron. Il est basé sur [WebdriverIO](https://webdriver.io/) et a des helpers pour accéder aux APIS d'Electron dans vos tests et bundles ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// Un test simple pour vérifier si une fenêtre visible est ouverte avec un titre
const Application = require('spectron').Application
const assert = require('assert')

const myApp = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  await app.start()
  try {
    // Vérifie si la fenêtre est visible
    const isVisible = await app.browserWindow.isVisible()
    assert.strictEqual(isVisible, true)
    // Récupère le titre de la fenêtre
    const title = await app.client.getTitle()
    // Vérifie le titre de la fenêtre
    assert.strictEqual(title, 'My App')
  } catch (error) {
    // Note toute erreur rencontrée
    console.error('Test failed', error.message)
  }
  // Arrête l'application
  await app.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## Mise en place avec WebdriverJs

[WebDriverJs](https://www.selenium.dev/selenium/docs/api/javascript/index.html) provides a Node package for testing with web driver, we will use it as an example.

### 1. Start ChromeDriver

Tout d’abord, téléchargez `chromedriver`, puis exécutez-le :

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Démarre ChromeDriver (v2.10.291558) sur le port 9515
Seulement les connexions locales sont autorisées.
```

N'oubliez pas le numéro du port `9515`, qui servira plus tard

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Connect to ChromeDriver

L’utilisation de ` selenium-webdriver` avec Electron est pratiquement la même chose qu'avec upstream, sauf que vous devez spécifier manuellement comment connecter le driver chrome et où trouver le fichier binaire d'Electron :

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // "9515" est le port ouvert par ChromeDriver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    'goog:chromeOptions': {
      // Here is the path to your Electron binary.
      binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
    }
  })
  .forBrowser('chrome') // note: use .forBrowser('electron') for selenium-webdriver <= 3.6.0
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

## Mise en place avec WebdriverIO

[WebdriverIO](https://webdriver.io/) provides a Node package for testing with web driver.

### 1. Start ChromeDriver

Tout d’abord, téléchargez `chromedriver`, puis exécutez-le :

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Demarre ChromeDriver (v2.10.291558) sur le port 9515
Seulement les connexions locales sont autorisées.
```

N'oubliez pas le numéro du port `9515`, qui servira plus tard

### 2. Install WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Connect to chrome driver

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Utilisez localhost comme serveur ChromeDriver
  port: 9515,        // "9515" est le port ouvert par ChromeDriver.
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Path-to-Your-App/electron', // Chemin vers votre binaire Electron.
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

## Workflow

Pour tester votre application sans re-compiler Electron, il suffit de [placer](application-distribution.md) la source de votre app dans le dossier des ressources d'Electron.

Alternatively, pass an argument to run with your Electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.

[chrome-driver]: https://sites.google.com/a/chromium.org/chromedriver/
[spectron]: https://electronjs.org/spectron
