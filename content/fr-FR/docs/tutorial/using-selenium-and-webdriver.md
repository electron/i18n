# Utilisation de Selenium et WebDriver

De [ChromeDriver - WebDriver pour Chrome](https://sites.google.com/a/chromium.org/chromedriver/) :

> WebDriver est un outil open source pour les tests automatisés d'applications web sur plusieurs navigateurs. Il fournit des fonctions pour naviguer vers les pages web, simuler l'input utilisateur, l’exécution de JavaScript, etc... . ChromeDriver est un serveur autonome qui implémente le protocole de WebDriver (WebDriver's wire protocol) pour Chromium. Il est développé par des membres des équipes chrome et WebDriver.

## Mise en place de Spectron

[Spectron](https://electronjs.org/spectron) est le framework ChromeDriver de test officiel pour Electron. Il est basé sur [WebdriverIO](http://webdriver.io/) et a des helpers pour accéder aux APIS d'Electron dans vos tests et bundles ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// Un test simple pour verifier si un fenêtre visible s'ouvre avec un titre
var Application = require('spectron').Application
var assert = require('assert')

var app = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

app.start().then(function () {
  // Vérifie si la fenêtre est visible
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // Vérifie que la fenêtre est visible
  assert.equal(isVisible, true)
}).then(function () {
  // Récupère le titre de la fenêtre
  return app.client.getTitle()
}).then(function (title) {
  // Vérifie le titre de la fenêtre
  assert.equal(title, 'My App')
}).catch(function (error) {
  // Affiche toutes les erreurs
  console.error('Test failed', error.message)
}).then(function () {
  // Stoppe l'application
  return app.stop()
})
```

## Mise en place avec WebdriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) fournit un ensemble de package Node pour tester avec des pilotes web, nous l’utiliserons comme exemple.

### 1. Lancez ChromeDriver

Tout d’abord, téléchargez `chromedriver`, puis exécutez-le :

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Démarre ChromeDriver (v2.10.291558) sur le port 9515
Seulement les connexions locales sont autorisées.
```

N'oubliez pas le numéro du port `9515`, qui servira plus tard

### 2. installer WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Se connecter à ChromeDriver

L’utilisation de ` selenium-webdriver` avec Electron est pratiquement la même chose qu'avec upstream, sauf que vous devez spécifier manuellement comment connecter le driver chrome et où trouver le fichier binaire d'Electron :

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // "9515" est le port ouvert par ChromeDriver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Ici : Le chemin d'accès vers votre binaire Electron.
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

## Mise en place avec WebdriverIO

[WebdriverIO](http://webdriver.io/) fournit un package Node pour tester avec le pilote web.

### 1. Lancer ChromeDriver

Tout d’abord, téléchargez `chromedriver`, puis exécutez-le :

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Demarre ChromeDriver (v2.10.291558) sur le port 9515
Seulement les connexions locales sont autorisées.
```

N'oubliez pas le numéro du port `9515`, qui servira plus tard

### 2. Installer WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Se connecter à ChromeDriver

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Utilisez localhost comme serveur ChromeDriver
  port: 9515,        // "9515" est le port ouvert par ChromeDriver.
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Path-to-Your-App/electron', // Chemin vers votre binaire Electron.
      args: [/* cli arguments */]           // Optionnel, peut être 'app=' + /path/to/your/app/
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

Pour tester votre application sans re-compiler Electron, il suffit de [placer](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) la source de votre app dans le dossier des ressources d'Electron.

Vous pouvez également passer un argument, pour exécuter avec votre binaire Electron, qui pointe vers le dossier de votre application. Cela évite d’avoir à copier-coller votre application dans le répertoire des ressources d'Electron.