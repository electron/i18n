# À l’aide de sélénium et WebDriver

De [ChromeDriver - WebDriver de Chrome](https://sites.google.com/a/chromium.org/chromedriver/) :

> WebDriver est un outil open source pour les tests automatisés des applications web sur plusieurs navigateurs. Il fournit des fonctions pour naviguer vers les pages web, l’entrée d’utilisateur, l’exécution de JavaScript et plus. ChromeDriver est un serveur autonome qui implémente fil protocole de WebDriver pour le chrome. Il est développé par des membres des équipes chrome et WebDriver.

## Mise en place Spectron

[Spectron](https://electron.atom.io/spectron) est l’infrastructure de test de ChromeDriver bénéficiant d’un soutien pour les électrons. Il est basé sur [WebdriverIO](http://webdriver.io/) et a des aides pour accéder aux API d’électron dans vos épreuves et de faisceaux ChromeDriver.

```bash
NGP $ installer--save-dev spectron
```

```javascript
Un test simple pour vérifier une fenêtre visible est ouvert avec un titre var Application = require('spectron'). Assert var application = require('assert') var app = nouvelle Application ({chemin : ' / Applications/MyApp.app/Contents/MacOS/MyApp'}) app.start () .then(function () {/ / vérifier si la fenêtre est visible return app.browserWindow.isVisible()}) .then(function (isvisible) {/ / vérifier que la fenêtre est visible assert.equal (isVisible, vrai)}) .then(function () {/ / Get app.client.getTitle() retour de titre de la fenêtre}) .then(function (title) {/ / vérifier titre assert.equal la fenêtre (titre, "Mon App")}) .catch(function (error) {/ / Log tout console.error échecs ("Test a échoué" , Error.message)}) .then(function () {/ / stop le app.stop() retour demande})
```

## Mise en place avec WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) fournit un ensemble de nœuds pour tester avec pilote de web, nous l’utiliserons comme exemple.

### 1. Lancez ChromeDriver

Tout d’abord vous devez télécharger le binaire `chromedriver` et exécutez-le :

```bash
NGP $ installer électron-chromedriver $./node_modules/.bin/chromedriver à partir ChromeDriver (v2.10.291558) sur les connexions locales seulement 9515 port sont autorisés.
```

N’oubliez pas du `9515` numéro de port, qui seront utilisés ultérieurement

### 2. installer WebDriverJS

```bash
NGP $ installer sélénium-webdriver
```

### 3. se connecter à ChromeDriver

L’utilisation de `selenium-webdriver` avec l’électron est fondamentalement la même chose avec en amont, sauf que vous devez manuellement spécifier comment connecter le conducteur chrome et où trouver le fichier binaire de l’électron :

```javascript
const webdriver = driver const require('selenium-webdriver') = nouveau webdriver. Builder() / / le « 9515 » est le port ouvert par pilote de chrome.
  .usingServer ('http://localhost:9515 ') .withCapabilities ({chromeOptions : {/ / Voici le chemin d’accès vers votre binaire de l’électron.
      binaire : ' / Path-to-Your-App.app/Contents/MacOS/Electron'}}) .forBrowser('electron') .build() driver.get (« http://www.google.com') driver.findElement (webdriver. By.Name('q')).SendKeys('webdriver') driver.findElement (webdriver. By.Name('btnG')).Click() driver.wait(() => {return driver.getTitle().then((title) = > {retour titre === « webdriver - recherche Google »})}, 1000) driver.quit()
```

## Mise en place avec WebdriverIO

[WebdriverIO](http://webdriver.io/) fournit un ensemble de nœuds pour tester avec le pilote de la web.

### 1. Lancez ChromeDriver

Tout d’abord vous devez télécharger le binaire `chromedriver` et exécutez-le :

```bash
NGP $ installer électron-chromedriver $./node_modules/.bin/chromedriver--base-url = wd/moyeu--port = 9515 à partir ChromeDriver (v2.10.291558) sur le port 9515, seules les connexions locales sont autorisées.
```

N’oubliez pas du `9515` numéro de port, qui seront utilisés ultérieurement

### 2. installer WebdriverIO

```bash
$ NGP install webdriverio
```

### 3. se connecter au pilote de chrome

```javascript
const webdriverio = options const require('webdriverio') = {hôte : « localhost », / / utiliser localhost comme port de serveur pour le pilote chrome : 9515, / / « 9515 » est le port ouvert par pilote de chrome.
  desiredCapabilities : {browserName : « chrome », chromeOptions : {binaire : « / chemin-de-votre-App/electron », / / chemin d’accès vers votre binaire de l’électron.
      args : [/ * arguments cli * /] / / facultatif, peut-être ' app =' + /path/to/your/app /}}} laisser le client = webdriverio.remote(options) client .init() .url ('http://google.com') .setValue ('#q ', 'webdriverio') .click('#btng').getTitle().then((title) => {console.log ("titre était :" + titre)}) .end()
```

## Flux de travail

Pour tester votre application sans reconstruire Electron,[place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) simplement votre source app dans l’annuaire des ressources de l’électron.

Vous pouvez également passer un argument à courir avec votre binaire d’électron qui pointe vers le dossier de votre application. Cela évite d’avoir à copier-coller votre application dans le répertoire des ressources de l’électron.