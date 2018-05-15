# Uso de Selenium y WebDriver

Para [ChromeDriver - WebDriver para Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver es una herramienta de código abierto para pruebas automatizadas de aplicaciones web en varios navegadores. Provee la capacidad de navegar por páginas web, sistema de usuarios, ejecución de JavaScript, y más. ChromeDriver es un servidor independiente que implementa el protocolo de cable de WebDriver para Chromium. Ha sido desarrollado por miembros de los equipos de Chromium y WebDriver.

## Configurando Spectron

[Spectron](https://electronjs.org/spectron) es el sistema de pruebas de Electron, apoyado oficialmente por ChromeDriver. Se construyó sobre [WebdriverIO](http://webdriver.io/) y tiene ayudantes para acceder a la API de Electron en su prueba y paquetes ChromeDriver.

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

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) provee un paquete de nodos para probar con el driver de la web, lo usaremos como ejemplo.

### 1. Inicie ChromeDriver

Primero usted necesita descargar el `chromedriver` binario, y ejecutarlo:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Iniciar ChromeDriver (v2.10.291558) en puerto 9515
Solo conexiones locales permitidas.
```

Recuerde el puerto número `9515`, que usaremos más adelante

### 2. instalar WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Conecte a ChromeDriver

The usage of `selenium-webdriver` with Electron is the same with upstream, except that you have to manually specify how to connect chrome driver and where to find Electron's binary:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // El "9515" es el puerto abierto por chrome driver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Aquí va la dirección de tu Electron binario.
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

## Configurar con WebDriverIO

[WebDriverIO](http://webdriver.io/) provee un paquete de nodos para probar con el driver de la web.

### 1. Inicie ChromeDriver

Primero usted necesita descargar el `chromedriver` binario, y ejecutarlo:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) en puerto 9515
Solo conexiones locales son permitidas.
```

Recuerde el puerto número `9515`, que usaremos más adelante

### 2. instalar WebDriverIO

```sh
$ npm install webdriverio
```

### 3. Conecte al Driver de Chrome

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhot como servidor de drivers de Chrome
  port: 9515,        // "9515" es el puerto abierto por el driver de Chrome.
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/Path-to-Your-App/electron', // Dirección a su electrón binario.
      args: [/* cli arguments */]           // opcional 'app=' + /path/to/your/app/
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

## Flujo de trabajo

To test your application without rebuilding Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

También puede pasar un argumento para ejecutar con su electron binario que lleva a la carpeta de su aplicación. Esto elimina la necesidad de copiar y pegar su aplicación en el directorio de recurso de Electron.