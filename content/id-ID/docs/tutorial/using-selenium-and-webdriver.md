# Menggunakan Selenium dan WebDriver

Dari [ChromeDriver - WebDriver untuk Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver adalah alat open source untuk pengujian otomatis aplikasi web di banyak server    browser. Ini menyediakan kemampuan untuk navigasi ke halaman web, input pengguna,    Eksekusi JavaScript, dan banyak lagi. ChromeDriver adalah server standalone yang mana    menerapkan protokol kawat WebDriver untuk Chromium. Ini sedang dikembangkan oleh    anggota tim Chromium dan WebDriver.

## Menyiapkan Spectron

[Spectron](https://electronjs.org/spectron) adalah kerangka pengujian ChromeDriver yang didukung secara resmi untuk Elektron. Ini dibangun di atas [WebdriverIO](http://webdriver.io/) dan memiliki pembantu untuk mengakses API Elektron dalam pengujian dan kumpulan ChromeDriver Anda.

```sh
$ npm install --save-dev spectron
```

```javascript
// Tes sederhana untuk memverifikasi jendela yang terlihat dibuka dengan judul
var Application = require ('spectron') Aplikasi
var assert = require ('assert')

aplikasi var = aplikasi baru ({
   path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
})

app.start () lalu (function () {
   // Periksa apakah jendela terlihat
   kembali app.browserWindow.isVisible ()
}) kemudian (function (isVisible) {
   // Verifikasi jendela yang terlihat
   assert.equal (isVisible, true)
}) lalu (function () {
   // Dapatkan judul jendela
   kembalikan app.client.getTitle ()
}) lalu (fungsi (judul) {
   // Verifikasi judul jendela
   assert.equal (judul, 'App saya')
}) catch (fungsi (error) {
   // Masuki kegagalan
   console.error ('Test failed', error.message)
}) lalu (function () {
   // hentikan aplikasi
   kembali app.stop ()
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
const webdriverio = require ('webdriverio')
pilihan const = {
   host: 'localhost', // Gunakan localhost sebagai server driver chrome
   port: 9515, // "9515" adalah port yang dibuka oleh pengemudi krom.
  yang dikehendakiKetentuan: {
     browserName: 'chrome',
     chromeOptions: {
       biner: '/ Path-to-Your-App / elektron', // Path ke biner Elektron Anda.
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
 
Context | Request Context
```

## Alur kerja

To test your application without rebuilding Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

Sebagai alternatif, berikan argumen untuk dijalankan dengan biner elektron Anda yang ditunjukkan folder aplikasi Anda Ini menghilangkan kebutuhan untuk menyalin-tempel aplikasi Anda Direktori sumber elektron.