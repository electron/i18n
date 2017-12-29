# Hızlı Başlangıç

Electron zengin yerli (işletim sistemi) API'ler ile bir çalışma zamanı sağlayarak, saf JavaScript ile masaüstü uygulamalar oluşturmanıza olanak sağlar. You could see it as a variant of the Node.js runtime that is focused on desktop applications instead of web servers.

Bu, Electron'un (GUI) kütüphaneleri grafiksel kullanıcı arayüzüne JavaScript bağladığı anlamına gelmez. Bunun yerine, Electron GUI'sini web sayfaları olarak kullanır, böylece bunu JavaScript tarafından kontrol edilen minimal bir Chromium tarayıcı olarak görüyorsunuz.

### Ana Süreç

Electron'da `package.json` 'ın `ana` komut dosyasını çalıştıran süreç **ana süreç** olarak adlandırılır. Ana süreçte çalışan komut dosyası web sayfaları oluşturarak bir GUI görüntüleyebilir.

### Oluşturucu işlemi

Electron, web sayfalarını görüntülemek için Chromium kullandığından Chromium'un çoklu işlem mimarisi de kullanılır. Electron'daki her web sayfası **oluşturucu işlemi** olarak adlandırılan kendi işlemini çalıştırır.

Normal tarayıcılarda, web sayfaları genellikle korumalı bir ortamda çalışır ve yerel kaynaklara erişilmesine izin vermez. Bununla birlikte, Electron kullanıcıları, daha düşük seviyedeki işletim sistemi etkileşimlerine izin veren web sayfalarında Node.js API'lerini kullanma gücüne sahiptir.

### Ana İşlem ve Oluşturucu İşlem Arasındaki Farklar

Ana işlem `TarayıcıPenceresi` örnekleri oluşturarak web sayfaları oluşturur. Her ` TarayıcıPenceresi ` örneği, web sayfasını kendi oluşturucu işleminde çalıştırır. `TarayıcıPenceresi` örneği yok edildiğinde, ilgili oluşturucu işlemi de sonlandırılır.

Ana süreç, tüm web sayfalarını ve bunlara karşılık gelen oluşturucuyu yönetir. Her oluşturucu işlemi izoledir ve yalnızca içinde çalışan web sayfasıyla ilgilenir.

Web sayfalarında yerel GUI kaynaklarını web sayfalarındaki yönetmek çok tehlikeli ve kaynakların sızdırılması kolay olduğu için yerel GUI ile ilgili API'lerin çağrılmasına izin verilmez. Bir web sayfasında GUI işlemlerini gerçekleştirmek isterseniz, oluşturucu ana işlemin bu işlemleri gerçekleştirmesini istemek için web sayfasının süreci ana süreçle iletişim kurmalıdır.

Electron'da, ana süreç ve oluşturucu işlemleri arasında iletişim kurmanın birkaç yolu var. Tıpkı mesaj göndermek için [`ipcRenderer`](../api/ipc-renderer.md) ve [`ipcMain`](../api/ipc-main.md) modülleri ve RPC stili iletişim için [remote](../api/remote.md) modülü gibi. Aynı zamanda [web sayfaları arasında nasıl veri paylaşılır](../faq.md#how-to-share-data-between-web-pages)'da bir SSS girdisi vardır.

## İlk Electron Uygulamanı Yaz

Genellikle, bir Electron uygulaması şöyle yapılandırılır:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

`package.json` biçimi Düğüm modüllerinin biçimiyle tamamen aynıdır ve ana süreci başlatacak `ana` alanıyla belirtilen komut dosyası uygulamanızın başlangıç ​​komut dosyasıdır. `package.json` öğesinin bir örneği şu şekilde görünebilir:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Not**: `Ana` alan `package.json`'da yoksa, Electron bir `index.js` yüklemeye çalışacaktır.

`Main.js` pencereleri oluşturmalı ve sistem olaylarını işlemelidir, tipik bir örnek:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

 //Pencere nesnesinin genel bir referansını tutun, aksi takdirde pencere
 //JavaScript nesnesi çöp topladığında otomatik olarak kapatılacaktır.
let win

function createWindow () {
  // Tarayıcı penceresini oluştur.
  win = new BrowserWindow({width: 800, height: 600})

  // ve uygulamanın index.html'sini yükle.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // DevToos'u aç.
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
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

Finally the `index.html` is the web page you want to show:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Run your app

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you'll probably want to try running your app locally to test it and make sure it's working as expected.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) is an `npm` module that contains pre-compiled versions of Electron.

If you've installed it globally with `npm`, then you will only need to run the following in your app's source directory:

```sh
electron .
```

If you've installed it locally, then run:

#### macOS / Linux

```sh
$ ./node_modules/.bin/electron .
```

#### Windows

```sh
$ .\node_modules\.bin\electron .
```

#### Node v8.2.0 and later

```sh
$ npx electron.
```

### Manually Downloaded Electron Binary

If you downloaded Electron manually, you can also use the included binary to execute your app directly.

#### macOS

```sh
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### Linux

```sh
$ ./electron/electron your-app/
```

#### Windows

```sh
$ .\electron\electron.exe your-app\
```

`Electron.app` here is part of the Electron's release package, you can download it from [here](https://github.com/electron/electron/releases).

### Bir dağıtım çalıştırmak

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### Bu örneği deneyin

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which includes [npm](https://npmjs.org)) on your system.

```sh
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

For more example apps, see the [list of boilerplates](https://electronjs.org/community#boilerplates) created by the awesome electron community.