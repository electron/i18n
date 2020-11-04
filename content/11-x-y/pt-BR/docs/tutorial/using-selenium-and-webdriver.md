# Usando Selenium e WebDriver

From [ChromeDriver - WebDriver for Chrome][chrome-driver]:

> WebDriver é uma ferramenta de código aberto para testes automatizados de aplicativos web em muitos navegadores. Ele fornece recursos para navegar até páginas da web, entrada do usuário, execução de JavaScript e muito mais. ChromeDriver é um servidor autônomo que implementa o protocolo de arame do WebDriver para Chromium. It is being developed by members of the Chromium and WebDriver teams.

## Configurando Spectron

[Spectron][spectron] is the officially supported ChromeDriver testing framework for Electron. É construído por cima do [WebdriverIO](http://webdriver.io/) e tem auxiliares para acessar as APIs do Electron em seus testes e pacotes do ChromeDriver.

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

## Configurando com WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) fornece um pacote de Node para testar o driver web, nós o usaremos como exemplo.

### 1. Iniciar ChromeDriver

Primeiro você precisa baixar o binário `chromedriver` e executá-lo:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Começando ChromeDriver (v2.10.291558) na porta 9515
Somente conexão local é permitido.
```

Lembre-se do número da porta `9515`, que será usado mais tarde

### 2. Install WebDriverJS

```sh
$ npm install selenium-webdriver
```

### 3. Conectar-se ao ChromeDriver

O uso de `selenium-webdriver` com Electron é o mesmo com a montante, exceto que você precisa especificar manualmente como conectar o driver chrome e onde encontrar o binário do Electron:

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

## Configurando com WebdriverIO

[WebdriverIO](http://webdriver.io/) fornece um pacote Node para testar com web driver.

### 1. Iniciar ChromeDriver

Primeiro você precisa baixar o binário `chromedriver` e executá-lo:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Começando ChromeDriver (v2.10.291558) na porta 9515
Somente conexão local é permitido.
```

Lembre-se do número da porta `9515`, que será usado mais tarde

### 2. Instalar WebdriverIO

```sh
$ npm install webdriverio
```

### 3. Conectar-se ao driver chrome

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost as chrome driver server
  port: 9515, // "9515" is the port opened by chrome driver.
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: '/Path-to-Your-App/electron', // Caminho para seu binário Electron.
      args: [/* cli arguments */] // Opcional, talvez 'app=' + /path/to/your/app/
    }
  }
}

const client = webdriverio. emote(opcions)

cliente
  .init()
  . rl('http://google.com')
  .setValue('#q', 'webdriverio')
  .click('#btnG')
  .getTitle(). hen((title) => {
    console.log('Título foi: ' + title)
  })
  .end()
```

## Fluxo de trabalho

Para testar sua aplicação sem reconstruir o Electron, [lugar](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) seu aplicativo fonte no diretório de recursos do Electron.

Alternativamente, passe um argumento para ser executado com seu binário Electron que aponta para a pasta de seus aplicativos. Isso elimina a necessidade de copiar e colar seu aplicativo no diretório de recursos do Electron.

[chrome-driver]: https://sites.google.com/a/chromium.org/chromedriver/
[spectron]: https://electronjs.org/spectron
