# Uso de Selenium y WebDriver

Para [ChromeDriver - WebDriver para Chrome][chrome-driver]:

> WebDriver es una herramienta de código abierto para pruebas automatizadas de aplicaciones web en varios navegadores. Provee la capacidad de navegar por páginas web, sistema de usuarios, ejecución de JavaScript, y más. ChromeDriver es un servidor independiente que implementa el protocolo de cable de WebDriver para Chromium. Ha sido desarrollado por miembros de los equipos de Chromium y WebDriver.

## Configurando Spectron

[Spectron][spectron] es el sistema de pruebas de Electron, apoyado oficialmente por ChromeDriver. Se construyó sobre [WebdriverIO](https://webdriver.io/) y tiene ayudantes para acceder a la API de Electron en su prueba y paquetes ChromeDriver.

```sh
$ npm install --save-dev spectron
```

```javascript
// A simple test to verify a visible window is opened with a title
const Application = require('spectron').Application
const assert = require('assert')

const myApp = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

const verifyWindowIsVisibleWithTitle = async (app) => {
  await app.start()
  try {
    // Check if the window is visible
    const isVisible = await app.browserWindow.isVisible()
    // Verify the window is visible
    assert.strictEqual(isVisible, true)
    // Get the window's title
    const title = await app.client.getTitle()
    // Verify the window's title
    assert.strictEqual(title, 'My App')
  } catch (error) {
    // Log any failures
    console.error('Test failed', error.message)
  }
  // Stop the application
  await app.stop()
}

verifyWindowIsVisibleWithTitle(myApp)
```

## Configurar con WebDriverJs

[WebDriverJs](https://www.selenium.dev/selenium/docs/api/javascript/index.html) provee un paquete de nodos para probar con el driver de la web, lo usaremos como ejemplo.

### 1. Iniciar ChromeDriver

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

### 3. Conectar a ChromeDriver

El uso de `selenium-webdriver` con Electron es el mismo con upstream, excepto que usted tiene que especificar manualmente como conectar chrome driver y donde se encuentra el binario de Electron:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // The "9515" is the port opened by chrome driver.
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

## Configurar con WebDriverIO

[WebDriverIO](https://webdriver.io/) provee un paquete de nodos para probar con el driver de la web.

### 1. Iniciar ChromeDriver

Primero usted necesita descargar el `chromedriver` binario, y ejecutarlo:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

Recuerde el puerto número `9515`, que usaremos más adelante

### 2. Instalar WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Conectar al conductor cromo

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost as chrome driver server
  port: 9515, // "9515" is the port opened by chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Path to your Electron binary.
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

## Flujo de trabajo

Para probar su aplicación sin reconstruir Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) el fuente de su aplicación en el directorio de recursos de Electron.

Alternativamente, pase un argumento para ejecutar con su binario Electron que apunta a la carpeta de su aplicación. Esto elimina la necesidad de copiar y pegar tu aplicación en el directorio de recursos de Electron.

[chrome-driver]: https://sites.google.com/a/chromium.org/chromedriver/
[spectron]: https://electronjs.org/spectron
