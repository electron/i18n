# Uso de selenio y WebDriver

De [ChromeDriver - WebDriver para Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver es una herramienta open source para pruebas automatizadas de aplicaciones web en varios navegadores. Proporciona capacidades para navegar por páginas web, usuario, ejecución de JavaScript y más. ChromeDriver es un servidor independiente que implementa el protocolo de alambre de WebDriver para cromo. Está siendo desarrollado por los miembros de los equipos de cromo y WebDriver.

## Configuración de Spectron

[Spectron](https://electron.atom.io/spectron) es el marco de pruebas ChromeDriver apoyo oficial para el Electron. Está construido en la parte superior [WebdriverIO](http://webdriver.io/) y tiene ayudantes para acceder a APIs de electrones en sus pruebas y paquetes ChromeDriver.

```bash
$ MNP instalar--save-dev spectron
```

```javascript
Una prueba sencilla para verificar una ventana visible se abre con un título var aplicación = require('spectron'). Assert de aplicación var = require('assert') var app = nueva aplicación ({ruta: ' / Applications/MyApp.app/Contents/MacOS/MyApp'}) app.start () .then(function () {/ / comprobar si la ventana es visible devuelva app.browserWindow.isVisible()}) .then(function (isvisible) {/ / comprobar la ventana es visible assert.equal (isVisible, true)}) .then(function () {/ / obtener el título de retorno app.client.getTitle() de la ventana}) .then(function (title) {/ / verificar assert.equal de título de la ventana (título, 'Mi aplicación')}) .catch(function (error) {/ / Log cualquier fallas console.error ('ensayo error' , error.Message)}) .then(function () {/ / parada de la app.stop() vuelta de aplicación})
```

## Configurar con WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) proporciona un paquete de nodo para probar con el driver de la web, usaremos como ejemplo.

### 1. Inicie ChromeDriver

Primero usted necesitará descargar el binario `chromedriver` y ejecutarlo:

```bash
$ MNP instalar Electron-chromedriver $./node_modules/.bin/chromedriver a partir de ChromeDriver (v2.10.291558) en las conexiones locales sólo 9515 puerto se permite.
```

Recuerde el `9515` número de puerto, que será utilizada más adelante

### 2. instalar WebDriverJS

```bash
instalación selenium-webdriver de $ MNP
```

### 3. Conecte al ChromeDriver

El uso de `selenium-webdriver` con electrones es básicamente el mismo con aguas arriba, excepto que usted debe manualmente especificar cómo conectar controlador de cromo y donde se encuentra el binario del Electron:

```javascript
webdriver const = controlador const require('selenium-webdriver') = webdriver nuevo. Builder() / "9515" es el puerto abierto por conductor de cromo.
  .usingServer ('http://localhost:9515 ') .withCapabilities ({chromeOptions: {/ / aqui va la ruta al binario de su Electron.
      binario: ' / Path-to-Your-App.app/Contents/MacOS/Electron'}}) .forBrowser('electron') .build() driver.get ('http://www.google.com') driver.findElement (webdriver. By.Name('q')).sendKeys('webdriver') driver.findElement (webdriver. By.Name('btnG')).click() driver.wait(() => {volver driver.getTitle().then((title) = > {volver título === 'webdriver - búsqueda en Google'})}, 1000) driver.quit()
```

## Configurar con WebdriverIO

[WebdriverIO](http://webdriver.io/) proporciona un paquete de nodo para probar con el driver de la web.

### 1. Inicie ChromeDriver

Primero usted necesitará descargar el binario `chromedriver` y ejecutarlo:

```bash
$ MNP instalar Electron-chromedriver $./node_modules/.bin/chromedriver--base url = wd/hub--puerto = 9515 a partir de ChromeDriver (v2.10.291558) en el puerto 9515 se permitieron sólo conexiones locales.
```

Recuerde el `9515` número de puerto, que será utilizada más adelante

### 2. instalar WebdriverIO

```bash
$ MNP instalar webdriverio
```

### 3. Conecte el conductor de cromo

```javascript
const webdriverio = opciones const require('webdriverio') = {host: 'localhost', / utilice localhost como puerto de servidor de controlador de cromo: 9515, / / "9515" es el puerto abierto por conductor de cromo.
  desiredCapabilities: {browserName: 'cromo', chromeOptions: {binario: '/ Path-a-su-aplicación/Electron', / / camino a su binario de Electron.
      args: [/ * cli argumentos * /] / / opcional, tal vez ' app =' + /path/to/your/app /}}} que cliente = webdriverio.remote(options) cliente .init() .url ('http://google.com') .setValue ('#q ', 'webdriverio') .click('#btnG').getTitle().then((title) => {console.log (' título era: ' + título)}) .end()
```

## Flujo de trabajo

Para probar la aplicación sin reconstrucción de Electron, simplemente[place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) la fuente de la aplicación en el directorio de recursos del Electron.

También puede pasar un argumento con su Electron binario que apunta a la carpeta de la aplicación. Esto elimina la necesidad de copiar y pegar su aplicación en el directorio de recursos del Electron.