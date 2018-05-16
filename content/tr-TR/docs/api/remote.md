# remote

> Oluşturucu işlemindeki ana işlem modüllerini kullanın.

İşlem: [Renderer](../glossary.md#renderer-process)

`remote` modülü ana işlem ve oluşturucu işlem (web sayfası) arasında kolay bir süreçler arası iletişim yolu (IPC) sunar.

Electron'da, GUI ile ilgili modüller (` iletişim kutusu `, ` menü ` vb.) Yalnızca ana süreçte kullanılabilir, oluşturucu işlemi içinde değil. Onları oluşturucu işleminde kullanmak için `ipc` modülü ana işleme işlemler arası iletileri göndermek için gereklidir. With the `remote` module, you can invoke methods of the main process object without explicitly sending inter-process messages, similar to Java's [RMI](https://en.wikipedia.org/wiki/Java_remote_method_invocation). Bir tarayıcı penceresi oluşturmak için bir örnek: Oluşturucu süreci:

```javascript
const {BrowserWindow} = require('electron').remote
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

**Not:**Tersi durumda (işleyiciye ana işlemden erişin),[webContents.executeJavascript](web-contents.md#contentsexecutejavascriptcode-usergesture-callback) kullanabilirsiniz.

## Uzak nesneler

` remote ` modülü tarafından döndürülen her nesne (işlevler dahil), bir ana işlemdeki nesneyi temsil eder. (Bunu uzaktaki nesne veya uzaktaki fonksiyon olarak adlandırırız). Bir uzak nesne metodu çağırarak, bir uzak fonksiyon çağırdığınızda yada uzaktan oluşturucu (fonksiyon) ile yeni bir obje oluşturduğunuzda, aslında senkron süreçler arası mesajlar gönderirsiniz.

In the example above, both [`BrowserWindow`](browser-window.md) and `win` were remote objects and `new BrowserWindow` didn't create a `BrowserWindow` object in the renderer process. Bunun yerine ana süreçte ` BrowserWindow ` nesnesi oluşturdu ve ilgili uzaktaki nesneyi oluşturucu işleminde, diğer bir deyişle ` win` nesnesi.

** Not: ** Yalnızca [ numaralandırılabilir özellikler ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) mevcut Uzak nesneye ilk başvurulduğunda uzaktan erişilebilir.

** Not: ** ` remote ` modülü üzerinden erişildiğinde, Diziler ve Tamponlar IPC üzerinden kopyalanır. Onları oluşturucu işleminde değiştirmek, onları ana işlemde değiştirmez yada tam tersi ana işlemde değiştirmek, oluşturucu işleminde değiştirmez.

## Uzak Nesnelerin Ömrü

Elektron, oluşturucu işlemindeki uzak nesne işlem süresince yaşar (başka bir deyişle, çöp toplanmamıştır), karşılık gelen nesne ana süreçte serbest bırakılmayacaktır. Uzak nesne çöp topladığında, karşılık gelen nesne ana işlemde geri alınacaktır.

Eğer uzak nesne, oluşturucu işleminde sızdırılmışsa (örn. Bir haritada depolanır ancak asla serbest bırakılmaz), ana süreçteki ilgili nesne de sızacaktır, bu nedenle uzak nesneleri sızdırmamaya özen göstermelisiniz.

Birincil değer türleri dizeler ve satırlar gibidir oysa metin halinde gönderilirler.

## Geri dönüşleri ana sürece iletme

Ana süreçteki kod, oluşturucudan geri bildirimleri kabul edebilir - örneğin ` remote ` modülü - ancak bu özelliği kullanırken son derece dikkatli olmalısınız.

İlk olarak, kilitlenmelerden kaçınmak için, ana işleme iletilen geridönüşler eşzamansız olarak çağrılır. Ana süreçten, geçen geridönüşlerin dönüş değerini öğrenmesini bekleyemezsiniz.

Örneğin ana işlemde `Array.map` olarak adlandırılan bir fonksiyonu işlev işleyici işleminde kullanamazsınız:

```javascript
// ana süreç mapNumbers.js
exports.withRendererCallback = (mapper) => {
  return [1, 2, 3].map(mapper)
}

exports.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}
```

```javascript
// oluşturucu işlemi
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [tanımsız, tanımsız, tanımsız], [2, 3, 4]
```

Gördüğünüz gibi, işleyici geri aramanın eş zamanlı dönüş değeri beklendiği gibi değildi ve ana işlemde yaşayan özdeş bir geri dönüş değeri eşleşmedi.

İkinci olarak, ana işleme atanmış geri çağrılar, ana süreç çöp toplayana kadar devam edecektir.

Örneğin aşağıdaki kod ilk başta masum gibi görünüyor. Uzaktan bir nesne üzerinden `close` olayı için bir geri çağırma yükler:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // pencere kapatıldı...
})
```

Ancak, geri aramayı açıkça kaldırana kadar ana süreç tarafından başvuru olarak alındığını unutmayın. Bunu yapmazsanız, pencereniz her seferinde yeniden yüklenildiğinde, her yeniden başlatma için bir sızdıran geri arama yüklenecektir.

İşleri daha da kötüleştirmek için önceden kurulmuş geri çağrılar bağlamı serbest bırakıldığından, `close` olayı gönderildiğinde ana süreçte istisnalar ortaya çıkacaktır.

Bu sorunu önlemek için, ana işleme aktarılan işleyici geri çağırımlarına yapılan tüm başvuruları temizlendiğinden emin olun. This involves cleaning up event handlers, or ensuring the main process is explicitly told to dereference callbacks that came from a renderer process that is exiting.

## Ana işlemde yerleşik modüllere ulaşım

Ana işlemdeki konulmuş modüller `remote` içinde alıcı olarak bulunur, bu sayede sizde direk `electron</0 modülündeki gibi kullanabilirsiniz.</p>

<pre><code class="javascript">const app = require('electron').remote.app
console.log(app)
`</pre> 

## Metodlar

`ağ` modülü aşağıdaki yöntemleri içerir:

### `remote.require(modul)`

* `module` Dizgi

`any` - ana işlemde `require(module)` tarafından çevirilen nesne. Göreceli yollarıyla belirtilen modüller ana işlemin giriş noktasına göreli olarak çözümlenir.

Örnek

```sh
project/
├── main
│   ├── foo.js
│   └── index.js
├── package.json
└── renderer
    └── index.js
```

```js
// ana işlem: main/index.js
const {app} = require('electron')
app.on('ready', () => { /* ... */ })
```

```js
// some relative module: main/foo.js
module.exports = 'bar'
```

```js
// renderer process: renderer/index.js
const foo = require('electron').remote.require('./foo') // bar
```

### `remote.getCurrentWindow()`

[`BrowserWindow`](browser-window.md) - bu web sayfasının ait olduğu pencereyi döndürür.

### `remote.getCurrentWebContents()`

[`WebContents`](web-contents.md) - bu web sayfasının web içeriğini çevirir.

### `remote.getGlobal(name)`

* `name` Dizi

`any` diner - Ana işlemin içindeki `name`'in evrensel değişkeni (örneğin `global[name]`).

## Özellikler

### `remote.process`

Ana süreçteki `process` nesne. Bu,`remote.getGlobal('process')` ile aynıdır, ancak önbelleğe alınmıştır.