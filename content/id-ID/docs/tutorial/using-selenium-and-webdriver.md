# Menggunakan Selenium dan WebDriver

Dari [ChromeDriver - WebDriver untuk Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver adalah alat open source untuk pengujian otomatis aplikasi web di banyak server    browser. Ini menyediakan kemampuan untuk navigasi ke halaman web, input pengguna,    Eksekusi JavaScript, dan banyak lagi. ChromeDriver adalah server standalone yang mana    menerapkan protokol kawat WebDriver untuk Chromium. Ini sedang dikembangkan oleh    anggota tim Chromium dan WebDriver.

## Menyiapkan Spectron

[Spectron](https://electronjs.org/spectron) adalah kerangka pengujian ChromeDriver yang didukung secara resmi untuk Elektron. Ini dibangun di atas [WebdriverIO](http://webdriver.io/) dan memiliki pembantu untuk mengakses API Elektron dalam pengujian dan kumpulan ChromeDriver Anda.

```sh
$ npm install --save-dev spectron
```

```javascript
// A simple test to verify a visible window is opened with a title
var Application = require('spectron').Application
var assert = require('assert')

var app = new Application({
  path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

app.start().then(function () {
  // Check if the window is visible
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // Verify the window is visible
  assert.strictEqual(isVisible, true)
}).then(function () {
  // Get the window's title
  return app.client.getTitle()
}).then(function (title) {
  // Verify the window's title
  assert.strictEqual(title, 'My App')
}).catch(function (error) {
  // Log any failures
  console.error('Test failed', error.message)
}).then(function () {
  // Stop the application
  return app.stop()
})
```

## Menyiapkan dengan WebDriverJs

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) menyediakan Paket Node untuk pengujian dengan driver web, kami akan menggunakannya sebagai contoh.

### 1. Mulai ChromeDriver

Pertama, Anda perlu mendownload `chromedriver` biner, dan jalankan:

```sh
$ npm memasang chromedriver elektron
$ ./node_modules/.bin/chromedriver
Mulai ChromeDriver (v2.10.291558) di port 9515
Hanya koneksi lokal yang diizinkan.
```

Ingat nomor port `9515`, yang akan digunakan nanti

### 2. Instal WebDriverJS

```sh
$ npm pasang selenium-webdriver
```

### 3. Sambungkan ke ChromeDriver

The usage of `selenium-webdriver` with Electron is the same with upstream, except that you have to manually specify how to connect chrome driver and where to find Electron's binary:

```javascript
const webdriver = require ('selenium-webdriver')

const driver = new webdriver.Builder ()
   // "9515" adalah port yang dibuka oleh pengemudi krom.
  .usingServer ('http: // localhost: 9515')
   .withCapabilities ({
     chromeOptions: {
       // Ini jalan ke biner Elektron Anda.
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
 
Context | Request Context
```

## Menyiapkan dengan WebdriverIO

[WebdriverIO](http://webdriver.io/) menyediakan paket Node untuk pengujian dengan web sopir.

### 1. Mulai ChromeDriver

Pertama, Anda perlu mendownload `chromedriver` biner, dan jalankan:

```sh
$ npm memasang chromedriver elektron
$ ./node_modules/.bin/chromedriver --url-base = wd / hub --port = 9515
Mulai ChromeDriver (v2.10.291558) di port 9515
Hanya koneksi lokal yang diizinkan.
```

Ingat nomor port `9515`, yang akan digunakan nanti

### 2. Instal Webdriverio

```sh
$ npm pasang webdriverio
```

### 3. Sambungkan ke driver krom

```javascript
const webdriverio = require('webdriverio')
const options = {
  host: 'localhost', // Use localhost as chrome driver server
  port: 9515, // "9515" is the port opened by chrome driver.
  yang dikehendakiKetentuan: {
     browserName: 'chrome',
     chromeOptions: {
       biner: '/ Path-to-Your-App / elektron', // Path ke biner Elektron Anda.
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

## Alur kerja

To test your application without rebuilding Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

Alternatively, pass an argument to run with your Electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.