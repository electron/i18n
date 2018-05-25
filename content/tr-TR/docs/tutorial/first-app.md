# İlk Electron Uygulamanızı Yazın

Electron zengin yerel (işletim sistemi) API'ler ile bir çalışma zamanı sağlayarak, saf JavaScript ile masaüstü uygulamalar oluşturmanıza olanak sağlar. Bunu, web sunucuları yerine masaüstü uygulamalarına odaklanan Node.js çalışma sürecinin bir çeşiti olarak görebilirsiniz.

Bu, Electron'un (GUI) kütüphaneleri grafiksel kullanıcı arayüzüne JavaScript bağladığı anlamına gelmez. Bunun yerine, Electron GUI'sini web sayfaları olarak kullanır, böylece bunu JavaScript tarafından kontrol edilen minimal bir Chromium tarayıcı olarak görüyorsunuz.

**Not**: Bu örnek aynı zamanda bir havuz (repository) olarak [indirip hemen çalıştırabilirsiniz](#trying-this-example).

Geliştirme göz önünde bulundurulduğunda, bir Electron uygulaması aslında bir Node.js uygulamasıdır. Başlangıç noktası her Node.js uygulamasına özel olan `package.json` dır. En temel bir elektron uygulaması aşağıdaki klasör yapısındadır:

```text
uygulamanın-adı/
├── package.json
├── main.js
└── index.html
```

Electron uygulamanız için yeni bir dosya oluşturun. Komut satırı istemcinizi açın ve o dosyanın içindem `npm init` komutunu çalıştırın.

```sh
npm init
```

npm sizi basit bir `package.json` dosyası oluşturacaktır. `main` bölümünün belirttiği program uygulamanızın ana işlemde çalışacak başlangıç programıdır. `package.json` dosyanızın bir örneği aşağıdaki gibidir:

```json
{
  "name": "uygulamanın-adı",
  "version": "0.1.0",
  "main": "main.js"
}
```

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). If this was actually a simple Node application, you would add a `start` script that instructs `node` to execute the current package:

```json
{
  "name": "uygulamanın-adı",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "node ."
  }
}
```

Turning this Node application into an Electron application is quite simple - we merely replace the `node` runtime with the `electron` runtime.

```json
{
  "name": "uygulamanın-adı",
  "version": "0.1.0",
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  }
}
```

## Electron'u Yükleme

At this point, you'll need to install `electron` itself. The recommended way of doing so is to install it as a development dependency in your app, which allows you to work on multiple apps with different Electron versions. To do so, run the following command from your app's directory:

```sh
npm install --save-dev electron
```

Other means for installing Electron exist. Please consult the [installation guide](installation.md) to learn about use with proxies, mirrors, and custom caches.

## Özetçe Elektron için Geliştirme

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

```javascript
const electron = require('electron')
```

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

```javascript
const {app, BrowserWindow} = require('electron')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // ve uygulamanın index.html'sini yükle.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

`main.js` pencereleri oluşturmalı ve uygulamanızın karşılaşabileceği bütün sistem olaylarını işlemelidir. Üstteki örneğin daha tamamlanmış hali geliştirici araçlarını açabilmeli, pencerenin kapanmasını işleyebilmeli veya macOS'de eğer kullanıcı araç çubuğunda uygulamanın ikonuna basarsa pencereyi tekrardan oluşturabilmelidir.

```javascript
const {app, BrowserWindow} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Tarayıcı penceresini oluştur.
  win = new BrowserWindow({width: 800, height: 600})

  // ve uygulamanın index.html'sini yükle.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Pencere kapatıldığında ortaya çıkar.
  win.on('closed', () => {
  //Pencere nesnesini referans dışı bırakın,
  // uygulamanız çoklu pencereleri destekliyorsa genellikle pencereleri
  // bir dizide saklarsınız, bu, ilgili öğeyi silmeniz gereken zamandır.
    win = null
  })
}
// Bu yöntem, Electron başlatmayı tamamladığında
// ve tarayıcı pencereleri oluşturmaya hazır olduğunda çağrılır.
// Bazı API'ler sadece bu olayın gerçekleşmesinin ardından kullanılabilir.
app.on('ready', createWindow)

// Bütün pencereler kapatıldığında çıkış yap.
app.on('window-all-closed', () => {
  // MacOS'de kullanıcı CMD + Q ile çıkana dek uygulamaların ve menü barlarının
  // aktif kalmaya devam etmesi normaldir.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // MacOS'de dock'a tıklandıktan sonra eğer başka pencere yoksa
  // yeni pencere açılması normaldir.
  if (win === null) {
    createWindow()
  }
})
// Bu dosyada, uygulamanızın özel ana işleminin geri kalan bölümünü ekleyebilirsiniz
// Kod. Ayrıca bunları ayrı dosyalara koyabilir ve buradan isteyebilirsiniz.
```

Kesin olarak göstermek istediğiniz web sayfası `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
Kullandığınız Node'un sürümü: <script>document.write(process.versions.node)</script>,
    Kullandığınız Chrome'un sürümü:
 <script>document.write(process.versions.chrome)</script>,
    ve Kullandığınız Electron'un sürümü: 
 <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Uygulamanızı Çalıştırma

`main.js`, `index.html`, ve `package.json` dosyalarını oluşturduktan sonra, Uygulamayı dizinindeyken `npm start` komutunu çalıştırarak deneyebilirsiniz.

## Bu Örneği Deneme

Klonlayın ve bu eğitimdeki kodu [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) deposunu (repository) kullanarak çalıştırın.

**Not**: Bunu çalıştırmak [Git](https://git-scm.com)'i gerektirir.

```sh
# Depoyı klonla
$ git clone https://github.com/electron/electron-quick-start 
# Depoya git
$ cd electron-quick-start 
# Gereklilikleri yükle
$ npm install
# Aplikasyonu başlat
$ npm start
```

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](./boilerplates-and-clis.md).