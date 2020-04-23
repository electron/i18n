# Uso de Selenium y WebDriver

Para [ChromeDriver - WebDriver para Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver es una herramienta de código abierto para pruebas automatizadas de aplicaciones web en varios navegadores. Provee la capacidad de navegar por páginas web, sistema de usuarios, ejecución de JavaScript, y más. ChromeDriver es un servidor independiente que implementa el protocolo de cable de WebDriver para Chromium. Ha sido desarrollado por miembros de los equipos de Chromium y WebDriver.

## Configurando Spectron

[Spectron](https://electronjs.org/spectron) es el sistema de pruebas de Electron, apoyado oficialmente por ChromeDriver. Se construyó sobre [WebdriverIO](http://webdriver.io/) y tiene ayudantes para acceder a la API de Electron en su prueba y paquetes ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// Una prueba simple para verificar una ventana visible es abriendo con un titulo
const Application = require('spectron').Application
const assert = require('assert')

const myApp = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  await app.start()
  try {
    // Revisa si la ventana es visible
    const isVisible = await app.browserWindow.isVisible()
    // Verifica si la ventana esta visible
    assert.strictEqual(isVisible, true)
    // Get the window's title
    const title = await app.client.getTitle()
    // Verify the window's title
    assert.strictEqual(title, 'My App')
  } catch (error) {
    // Registra cualquier fallo
    console.error('Prueba fallida', error.message)
  }
  // Para la aplicación
  await app.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## Configurar con WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) provee un paquete de nodos para probar con el driver de la web, lo usaremos como ejemplo.

### 1. Start ChromeDriver

Primero usted necesita descargar el `chromedriver` binario, y ejecutarlo:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Iniciar ChromeDriver (v2.10.291558) en puerto 9515
Solo conexiones locales permitidas.
```

Recuerde el puerto número `9515`, que usaremos más adelante

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Connect to ChromeDriver

El uso de `selenium-webdriver` con Electron es el mismo con upstream, excepto que usted tiene que especificar manualmente como conectar chrome driver y donde se encuentra el binario de Electron:

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

### 1. Start ChromeDriver

Primero usted necesita descargar el `chromedriver` binario, y ejecutarlo:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) en puerto 9515
Solo conexiones locales son permitidas.
```

Recuerde el puerto número `9515`, que usaremos más adelante

### 2. Install WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Connect to chrome driver

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost como un servidor de chrome driver
  port: 9515, // "9515" es el puerto abierto por chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Path to your Electron binary.
      args: [/* cli arguments */] // Optional, perhaps 'app=' + /path/to/your/app/
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

Para probar su aplicación sin reconstruir Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) el fuente de su aplicación en el directorio de recursos de Electron.

Alternatively, pass an argument to run with your Electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.
