# Selenyum ve WebDriver Kullanma

[ChromeDriver - Chrome için WebDriver](https://sites.google.com/a/chromium.org/chromedriver/)'dan:

> WebDriver farklı tarayıcılar üzerinde web uygulamaları test etmek için açık kaynak bir araçtır. Web sayfalarını gezinme, kullanıcı girdisi, Javascript çalıştırma ve daha fazlasını yapabilir. ChromeDriver, Chrome için WebDriver'ın ağ protokolünü gerçekleyen, kendi başına çalışan bir sunucudur. Chromium ve Webdriver takımları tarafından geliştirilir.

## Spectron'u Ayarlama

[Spectron](https://electronjs.org/spectron), Electron için resmi olarak desteklenen test çatısıdır. [WebdriverIO](http://webdriver.io/) üzerinde yapılmıştır, testlerinizde Electron API'lerine erişim için yardımcı olur ve içinde ChromeDriver'ı barındırır.

```sh
$ npm install --save-dev spectron
```

```javascript
// Açılan pencerenin başlığını kontrol eden ufak bir uyglama
var Application = require('spectron').Application
var assert = require('assert')

var app = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

app.start().then(function () {
  // Pencerenin görünürlüğünü kontrol et
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // Pencere görünür durumda mı, doğrula.
  assert.equal(isVisible, true)
}).then(function () {
  // Pencere başlığını al
  return app.client.getTitle()
}).then(function (title) {
  // Pencere başlığını doğrula
  assert.equal(title, 'My App')
}).catch(function (error) {
  // Hataları kayıt et
  console.error('Test failed', error.message)
}).then(function () {
  // Uygulamayı durdur
  return app.stop()
})
 
Context | Request Context
```

## WebDriverjs'yi Ayarlama

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) Web driver kullanarak test yapmanıza yarayan bir Node paketidir, biz de örnek olarak kullanacağız.

### 1. ChromeDriver'ı başlatın

Öncelikle `chromedriver`'ı indirin ve başlatın:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

`9515` port numarasını unutmayın, daha sonra kullanacağız

### 2. WebDriverJS'yi kurun

```sh
$ npm install selenium-webdriver
```

### 3. ChromeDriver'a bağlanma

The usage of `selenium-webdriver` with Electron is the same with upstream, except that you have to manually specify how to connect chrome driver and where to find Electron's binary:

```javascript
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  //  "9515" chrome tarafından açılan port numarası.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Electron binary dosyasına giden dizin.
      binary: '/UygulamaDizini/Contents/MacOS/Electron'
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
 
Context | Request Context
```

## WebdriverIO'yu Ayarlama

[WebdriverIO](http://webdriver.io/), web sürücüsü ile test etmek için bir Node paketi sağlar.

### 1. ChromeDriver'ı başlatın

Öncelikle `chromedriver`'ı indirin ve başlatın:

```sh
$ npm install electron-chromedriver
$ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
Starting ChromeDriver (v2.10.291558) on port 9515
Only local connections are allowed.
```

`9515` port numarasını unutmayın, daha sonra kullanacağız

### 2. WebdriverIO'yu kurun

```sh
$ npm install webdriverio
```

### 3. Chrome driver'a bağlanın

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // chrome driver sunucusu olarak localhost kullan
  port: 9515,        // "9515" chrome driver tarafından açılan port numarası.
  desiredCapabilities: {
    browserName: 'chrome',
    chromeOptions: {
      binary: '/UygulamaDizini/electron', // Electron binary dosyasına giden dizin.
      args: [/* cli arguments */]           // Opsiyonel.  şöyle de olabilir: 'app=' + /path/to/your/app/
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

## İş Akışı

To test your application without rebuilding Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

Alternatif olarak, argüman yollayarak kendi electron'unuz üzerinden uygulamayı çalıştırabilirsiniz. Böylece Electron'un kaynak dizinine kopyala/yapıştır yapmanıza gerek kalmaz.