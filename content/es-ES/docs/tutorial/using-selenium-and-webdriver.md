# Uso de Selenium y WebDriver

Para [ChromeDriver - WebDriver para Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver es una herramienta de código abierto para pruebas automatizadas de aplicaciones web en varios navegadores. Provee la capacidad de navegar por páginas web, sistema de usuarios, ejecución de JavaScript, y más. ChromeDriver es un servidor independiente que implementa el protocolo de cable de WebDriver para Chromium. Ha sido desarrollado por miembros de los equipos de Chromium y WebDriver.

## Configurando Spectron

[Spectron](https://electron.atom.io/spectron) es el sistema de pruebas de Electron, apoyado oficialmente por ChromeDriver. Se construyó sobre [WebdriverIO](http://webdriver.io/) y tiene ayudantes para acceder a la API de Electron en su prueba y paquetes ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// Un test simple para verificar si una ventana está abierta con un título
var Application = require('spectron').Application
var assert = require('assert')

var app = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

app.start().then(function () {
  // Comprueba que la ventana está abierta
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // Verifica que la ventana sea visible
  assert.equal(isVisible, true)
}).then(function () {
  // obtiene el título de la página
  return app.client.getTitle()
}).then(function (title) {
  // Verifica el título de la página
  assert.equal(title, 'My App')
}).catch(function (error) {
  // Registra cualquier falla
  console.error('Test failed', error.message)
}).then(function () {
  // Detiene la aplicación
  return app.stop()
})
```

## Configurar con WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) provides a Node package for testing with web driver, we will use it as an example.

### 1. Start ChromeDriver

First you need to download the `chromedriver` binary, and run it:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Remember the port number `9515`, which will be used later

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Connect to ChromeDriver

The usage of `selenium-webdriver` with Electron is basically the same with upstream, except that you have to manually specify how to connect chrome driver and where to find Electron's binary:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // The "9515" is the port opened by chrome driver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Here is the path to your Electron binary.
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

## Setting up with WebdriverIO

[WebdriverIO](http://webdriver.io/) provides a Node package for testing with web driver.

### 1. Start ChromeDriver

First you need to download the `chromedriver` binary, and run it:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Remember the port number `9515`, which will be used later

### 2. Install WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Connect to chrome driver

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost as chrome driver server
  port: 9515,        // "9515" is the port opened by chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Path-to-Your-App/electron', // Path to your Electron binary.
      args: [/* cli arguments */]           // Optional, perhaps 'app=' + /path/to/your/app/
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

To test your application without rebuilding Electron, simply [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

Alternatively, pass an argument to run with your electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.