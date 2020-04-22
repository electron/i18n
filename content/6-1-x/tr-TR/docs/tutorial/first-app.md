# İlk Electron Uygulamanızı Yazın

Electron zengin yerel (işletim sistemi) API'ler ile bir çalışma zamanı sağlayarak, saf JavaScript ile masaüstü uygulamalar oluşturmanıza olanak sağlar. Bunu, web sunucuları yerine masaüstü uygulamalarına odaklanan Node.js çalışma sürecinin bir çeşiti olarak görebilirsiniz.

Bu, Electron'un (GUI) kütüphaneleri grafiksel kullanıcı arayüzüne JavaScript bağladığı anlamına gelmez. Bunun yerine, Electron GUI'sini web sayfaları olarak kullanır, böylece bunu JavaScript tarafından kontrol edilen minimal bir Chromium tarayıcı olarak görüyorsunuz.

**Not**: Bu örneği aynı zamanda bir havuz (repository) olarak [indirip hemen çalıştırabilirsiniz](#trying-this-example).

Geliştirme göz önünde bulundurulduğunda, bir Electron uygulaması aslında bir Node.js uygulamasıdır. Başlangıç noktası her Node.js uygulamasına özel olan `package.json` dır. En temel Elektron uygulaması aşağıdaki klasör yapısına sahip olacaktır:

```text
uygulamanın-adı/
├── package.json
├── main.js
└── index.html
```

Electron uygulamanız için yeni bir dosya oluşturun. Komut satırı istemcinizi açın ve o klasörün içinde `npm init` komutunu çalıştırın.

```sh
npm init
```

npm size basit bir `package.json` dosyası oluşturacaktır. `main` bölümünün belirttiği program uygulamanızın ana işlemde çalışacak başlangıç programıdır. `package.json` dosyanızın bir örneği aşağıdaki gibidir:

```json
{
  "name": "uygulamanın-adı",
  "version": "0.1.0",
  "main": "main.js"
}
```

__Not__: Eğer `main` alanı `package.json` dosyası içinde mevcut değilse, Electron bir `index.js` yüklemeye çalışacaktır (Node.js'de olduğu gibi). Bu aslında basit bir Node uylamasıysa, `node`'a geçerli paketi yürütmesini bildiren bir `start` komut dosyası eklersiniz:

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

Bir Node uygulamasını Electron uygulamasına dönüştürmek oldukça basittir. Yalnızca `node` çalışma zamanını `electron` çalışma zamanı ile değiştiriyoruz.

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

## Electron'u Yükleyin

Bu noktada `electron`'un kendisini kurmanız gerekir. Bunu yapmanın önerilen yolu, uygulamanızda farklı Electron sürümlerine sahip birden fazla uygulama üzerinde çalışmanıza izin veren bir geliştirme bağımlılığı olarak yüklemektir. Bunu yapmak için uygulamanızın dizininden aşağıdaki komutu çalıştırın:

```sh
npm install --save-dev electron
```

Electron kurmak için başka araçlar da mevcuttur. Proxy, ayna ve özel önbelleklerle kullanım hakkında bilgi edinmek için lütfen [kurulum kılavuzu](installation.md)na bakın.

## Kısaca Elektron Geliştirme

Elektron uygulamaları JavaScript'te Node.js ile geliştirmede bulunan aynı ilke ve yöntemler kullanılarak geliştirilmiştir. Electron'da bulunan tüm API'lara ve özelliklere, gerekli olabilecek diğer Node.js modülleri gibi `electron` modülü üzerinden erişilebilir:

```javascript
const electron = require('electron')
```

`electron` modülü, ad alanlarındaki özellikleri ortaya çıkarır. Örnek olarak, uygulamanın yaşam döngüsü `electron.app` aracılığıyla yönetilir, pencereler `electron.BrowserWindow` sınıfı kullanılarak oluşturulabilir. Basit bir `main.js` dosyası uygulamanın hazır olmasını bekleyebilir ve bir pencere açabilir:

```javascript
const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Tarayıcı penceresini oluştur.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // ve uygulamanın index.html dosyasını yükle.
  win.loadFile('index.html')
}

app.on('ready', createWindow)
```

`main.js` pencereleri oluşturmalı ve uygulamanızın karşılaşabileceği bütün sistem olaylarını işlemelidir. Üstteki örneğin daha tamamlanmış hali geliştirici araçlarını açabilmeli, pencerenin kapanmasını işleyebilmeli veya macOS'de eğer kullanıcı araç çubuğunda uygulamanın ikonuna basarsa pencereyi tekrardan oluşturabilmelidir.

```javascript
const { app, BrowserWindow } = require('electron')

// Pencere nesnesinin genel bir referansını koruyun, 
// yoksa JavaScript nesnesi çöpleri topladığında pencere otomatik olarak kapatılır.
let win

function createWindow () {
  // Tarayıcı penceresini oluştur.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // ve uygulamanın index.html dosyasını yükle.
  win.loadFile('index.html')

  // DevTools'u aç.
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
Düğümü kullanıyoruz <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    ve elektron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Uygulamanızı Çalıştırın

`main.js`, `index.html`, ve `package.json` dosyalarını oluşturduktan sonra, Uygulamayı dizinindeyken `npm start` komutunu çalıştırarak deneyebilirsiniz.

## Bu Örneği Deneyin

[`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) deposunu (repository) klonlayın ve bu eğitimdeki kodu kullanarak çalıştırın.

**Not**: Bunu çalıştırmak [Git](https://git-scm.com) ve [npm](https://www.npmjs.com/) gerektirir.

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

Geliştirme sürecinizi başlatmak için kullanıcı belgelerinin ve araçların bir listesi için [BoilerPlates ve CLI belgeleri](./boilerplates-and-clis.md)ne bakın.
