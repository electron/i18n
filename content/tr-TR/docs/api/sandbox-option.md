# `sandbox` Seçeneği

> Chromium OS sanal alanında çalışabilen oluşturucuya sahip bir tarayıcı penceresi oluşturun. Bu seçenek etkinleştirmesi ile, oluşturucunun API nodullerine erişim için IPC yoluyla ana yöntemle iletişim kurması gerekir. Ayrıca, Chromium OS sanal alanını etkinleştirmek için, elektronun `--enable-sandbox` komuta satır argümanıyla çalıştırılması gerekir.

Chromium'un en önemli güvenlik özelliklerinden biri, parlayan tüm JavaScript kod/oluşturmanın bir sanal alan içerisinde gerçekleşmesidir. Bu sanal alan, oluşturma işlemi sırasındaki kullanmaların sisteme zarar vermediklerinden emin olmak için OS'e özgü özellikler kullanır.

Başka bir deyişle, sanal alan etkin olduğunda, oluşturucular yalnızca değişiklik yapabilir görevlere IPC vasıtasıyla ana süreci devrederek sisteme bildirir. Sandbox hakkında daha fazla bilgi [burada](https://www.chromium.org/developers/design-documents/sandbox).

Electron'da önemli bir özellik, oluşturma sürecinde node.js 'i çalıştırma yeterliliği olduğundan (web teknolojileri kullanarak masaüstü uygulamaları geliştirmeyi kolaylaştırır), sandbox electron tarafından engellenir. Bunun nedeni, çoğu node.js API'sinin sistem erişimi gerektirmesidir. Örneğin `require()`, bir Sandbox 'lanmış ortamda mevcut olmamakla beraber dosya sistem izinleri olmadan mümkün değil.

Genellikle masaüstü uygulamaları için sorun teşkil etmez, çünkü kod her zaman güvenilir, ancak güvenilmeyen web içeriğini görüntülemek için elektronları kromdan daha az güvenli hale getirir. Daha fazla güvenliğe ihtiyaç duyan uygulamalar için `sandbox` bayrağı electron'u, sanal alanla uyumlu klasik bir Chromium oluşturucu meydana getirmeye zorlar.

Sanal alana yerleştirilmiş bir oluşturucunun,çalışan bir node.js ortamı yoktur ve alıcı koduna node.js API'larını göstermez. Tek istisna, electron API oluşturucularının alt kümesine erişimi olan, önceden yüklenmiş komut dosyasıdır.

Diğer bir fark da sanal alandaki oluşturucuların, varsayılan herhangi bir JavaScript API'sini değiştirmemesidir. Consequently, some APIs such as `window.open` will work as they do in chromium (i.e. they do not return a [`BrowserWindowProxy`](browser-window-proxy.md)).

## Örnek

Sandbox' lanmış bir pencere oluşturmak için, basitçe `sandbox: true` 'dan `webPreferences` 'a geçin:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true
    }
  })
  win.loadURL('http://google.com')
})
```

In the above code the [`BrowserWindow`](browser-window.md) that was created has node.js disabled and can communicate only via IPC. Bu seçeneğin kullanılması, elektronun renderer' da bir node.js çalışma zamanı oluşturmasını durdurur. Also, within this new window `window.open` follows the native behaviour (by default electron creates a [`BrowserWindow`](browser-window.md) and returns a proxy to this via `window.open`).

Bu seçeneğin tek başına OS'ın zorladığı sandbox'a izin vermeyeceğini akılda tutmak önemlidir. Bu özelliğe izin vermek için, tüm `BrowserWindow` örnekleri için `sandbox: true` 'yu zorlayan `--enable-sandbox` komuta dizisi argümanı electron'a aktarılmalıdır.

`BrowserWindow`'da OS tarafından uygulanan sandbox'ı veya `sandbox:true` ile `webview` süreci etkinleştirmek için, tüm uygulamanın sanbox da olmasına neden olmadan, `--enable-mixed-sandbox` komut dizisi argümanı electron'a aktarılmalıdır. Bu seçenek şu an yalnızca macOS ve Windows'ta desteklenmektedir.

```js
let win
app.on('ready', () => {
  // no need to pass `sandbox: true` since `--enable-sandbox` was enabled.
  win = new BrowserWindow()
  win.loadURL('http://google.com')
})
```

`app.commandLine.appendSwitch('--enable-sandbox')` 'yı aramanın yeterli olmadığını unutmayın, electron/node başlangıç kodlarını,chromium sandbox ayarlarında değişiklik yapmak mümkün olduktan sonra çalıştırır. Değiştirme komuta dizisi üzerinden electron'a aktarılmalı:

```sh
electron --enable-sandbox app.js
```

OS sandbox 'ı sadece bazı oluşturucular için aktifleştirmek mümkün değildir, eğer `--enable-sandbox` etkinse normal elektron pencereleri oluşturulamaz.

Eğer sandbox 'lanmış ve sandbox 'lanmamış oluşturucuları bir uygulamada karıştırmanız gerekiyorsa, sadece `--enable-sandbox` argümanını atlayın. Bu argüman olmadan, `sandbox: true` ile oluşturulmuş pencereler inaktif node.js barındıracak ve sadece güvenlik POV 'undan edinilmiş IPC üzerinden bağlantı kuracaklar.

## Önyükleme

Bir uygulama sandbox 'lanmış oluşturucuları, önyükleme komut dosyası kullanarak özelleştirme yapabilir. Örnek olarak:

```js
let win
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      sandbox: true,
      preload: 'preload.js'
    }
  })
  win.loadURL('http://google.com')
})
```

ve preload.js:

```js
Bu dosya, bir javascript içeriği oluşturulduğunda yüklenir. Elektron oluşturucu API'larının bir alt kümesine erişebilen // özel bir kapsamda çalışır. Küresel çapta herhangi bir nesnenin sızmamasına dikkat etmeliyiz!
const fs = require('fs')
const {ipcRenderer} = require('electron')

// `fs` modulünü kullanarak bir yapılandırma dosyası okur
const buf = fs.readFileSync('allowed-popup-urls.json')
const allowedUrls = JSON.parse(buf.toString('utf8'))

const defaultWindowOpen = window.open

function customWindowOpen (url, ...args) {
  if (allowedUrls.indexOf(url) === -1) {
    ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
    return null
  }
  return defaultWindowOpen(url, ...args)
}
```

Önceden yüklenen komut dosyasında dikkat edilmesi gereken önemli şeyler:

- Sandbox'lanmış oluşturucular da node.js 'yi çalışıyor olmasa bile, hala sınırlı bir node benzeri ortama erişimi mümkündür: `Buffer`, `process`, `setImmediate` ve `require` mevcut.
- Önyükleme dosyası ana süreçteki tüm API'lere `remote` ve `ipcRenderer` modüllerinden dolaylı olarak erişebilir. Diğer modüller ve `fs` (yukarıda kullanıldı) bu şekilde uygulanır: Bunlar ana süreç içerisinde ki benzerler için proxy'lerdir.
- Önceden yüklenen komut dosyası tek bir komut dosyası içine yüklenmelidir, ancak aşağıdaki açıklamada tarayıcı gibi bir araç kullanarak birden çok modül ile derlenmiş karmaşık bir önyükleme kodunun olması mümkündür. Aslında, browserify zaten electron tarafından önyükleme komut dosyasına node benzeri bir ortam sağlamak için kullanılıyor.

Bir tarayıcı paketini oluşturmak ve bir ön yükleme komut dosyası olarak kullanmak için aşağıdakine benzer bir şey kullanılmalıdır:

```sh
  browserify preload/index.js \
    -x electron \
    -x fs \
    --insert-global-vars=__filename,__dirname -o preload.js
```

`-X` bayrağı, halihazırda önyükleme alanında bulunan gerekli tüm modüllerle birlikte kullanılmalıdır, ve bunun için browserify 'a kapsayıcı `require` fonksiyonunu kullanmasını söyler. `--insert-global-vars`; `process`, `Buffer` ve `setImmediate` 'nin kapsamlı alandan alındıklarından da emin olur ( normalde browserify bunun için kod yerleştirir).

Şu anda, önyükleme aşamasından sağlanan `require` fonksiyonu aşağıdaki modülleri göstermektedir:

- `child_process`
- `electron` 
  - `crashReporter`
  - `remote`
  - `ipcRenderer`
  - `webFrame`
- `fs`
- `os`
- `timers`
- `url`

Sandbox 'da daha çok elektron API 'sı oluşturmak gerekirse daha fazlası eklenebilir, ayrıca ana süreçteki herhangi bir modül `electron.remote.require` üzerinden zaten kullanılabilir.

## Durum

Hala deneme aşamasında bir özellik olduğu için, lütfen `sandbox` seçeneğini dikkatli kullanın. Hala önyükleme dosyasına bazı elektron oluşturucu API'lerin eklenmesinin güvenlik etkilerini bilmiyoruz, ve burada güvenilmeyen içerik oluşturmadan önce düşünülmesi gereken bazı şeyler var:

- A preload script can accidentally leak privileged APIs to untrusted code.
- V8 makinesindeki bazı yazılım hataları kötü amaçlı kodların oluşturucu önyükleme API 'lerine erişimlerine izin verebilir, etkili bir şekilde `remote` modülünden sisteme tam erişimi onaylayabilir.

Elektronda güvenilmeyen içeriğin görüntülenmesi hâlâ bilinmeyen bir alan olduğu için, sanal ön koşul komut dosyasına maruz kalan API'lerin diğer elektron API' lerinden daha dengesiz olduğu düşünülmelidir ve düzeltmek için güvenlik sorunları gibiönemli değişiklikler olabilir.

Güvenliği büyük ölçüde arttırması planlanan bir geliştirme, ana işlemin işleyiciye gönderilmesine izin verilen bir dizi iletiyi açıkça tanımasına izin vermek üzere, sanal göndericilere ait IPC iletilerini varsayılan olarak engellemektedir.