# Hızlı Başlangıç

Electron zengin yerli (işletim sistemi) API'ler ile bir çalışma zamanı sağlayarak, saf JavaScript ile masaüstü uygulamalar oluşturmanıza olanak sağlar. Bunu, web sunucuları yerine masaüstü uygulamalarına odaklanan Node.js çalışma sürecinin bir varyantı olarak görebilirsiniz.

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

// In this file you can include the rest of your app's specific main process
// code. Ayrıca bunları ayrı dosyalara koyabilir ve buradan isteyebilirsiniz.
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
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## Uygulamanı çalıştır

Başlangıç dosyanızı oluşturmadan önce `main.js`, `index.html`, ve `package.json`büyük ihtimalle denemek ve beklendiği gibi yürütüldüğünden emin olmak için uygulamanızı yerel olarak çalıştırmayı denemek isteyeceksiniz.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) is an `npm` Bu modül önceden derlenmiş Electron versiyonlarının içeriğini inceler.

`npm`,'ni ayrıntılı olarak yüklediyseniz. devamında uygulamanızın kaynak dizinini çalıştırmanız yeterlidir:

```sh
electron .
```

Bölgesel olarak yükleme yaptıysanız, şunu çalıştırın:

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

Eğer Electron'u manuel olarak indirdiyseniz, uygulamanızı doğrudan çalıştırmak için birlikte verilen ikili de kullanabilirsiniz.

#### macOS

```sh
$ ./Electron.app/Contents/MacOS/Electron uygulaman/
```

#### Linux

```sh
$ ./electron/electron uygulaman/
```

#### Windows

```sh
$ .\electron\electron.exe uygulaman\

```

`Elektron.app` burada elektron yayın paketinin bir parçası, buradan indirebilirsiniz [Buradan](https://github.com/electron/electron/releases).

### Bir dağıtım çalıştırmak

Uygulamanızı yazmayı bitirdikten sonra, [Application Distribution](./application-distribution.md) kılavuzunu izleyerek bir dağıtım oluşturabilirsiniz ve daha sonra paketlenmiş uygulamayı çalıştırın.

### Bu örneği deneyin

Bu eiğitimdeki kodu kullanarak depoyu çalıştırın ve çoğaltın [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start).

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

Daha fazla örnek uygulama için, muhteşem elektron topluluğu tarafından oluşturulan [list of boilerplates](https://electronjs.org/community#boilerplates)'e bakın.