# remote

> Oluşturucu işlemindeki ana işlem modüllerini kullanın.

Süreç:[Renderer](../glossary.md#renderer-process)

`remote` modülü ana işlem ve oluşturucu işlem (web sayfası) arasında kolay bir süreçler arası iletişim yolu (IPC) sunar.

Electron'da, GUI ile ilgili modüller (` iletişim kutusu `, ` menü ` vb.) Yalnızca ana süreçte kullanılabilir, oluşturucu işlemi içinde değil. Onları oluşturucu işleminde kullanmak için `ipc` modülü ana işleme işlemler arası iletileri göndermek için gereklidir. ` remote ` modülüyle, ana işlem obje metotlarını açıkça süreçler arası mesaj atmadan çağırabilirsiniz. Tıpkı Java'nın [ RMI](http://en.wikipedia.org/wiki/Java_remote_method_invocation)'si gibi. Bir tarayıcı penceresi oluşturmak için bir örnek: Oluşturucu süreci:

```javascript
const {BrowserWindow} = require('electron').remote
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('https://github.com')
```

**Not:**Tersi durumda (işleyiciye ana işlemden erişin),[webContents.executeJavascript](web-contents.md#contentsexecutejavascriptcode-usergesture-callback) kullanabilirsiniz.

## Uzak nesneler

` remote ` modülü tarafından döndürülen her nesne (işlevler dahil), bir ana işlemdeki nesneyi temsil eder. (Bunu uzaktaki nesne veya uzaktaki fonksiyon olarak adlandırırız). Bir uzak nesne metodu çağırarak, bir uzak fonksiyon çağırdığınızda yada uzaktan oluşturucu (fonksiyon) ile yeni bir obje oluşturduğunuzda, aslında senkron süreçler arası mesajlar gönderirsiniz.

Yukarıdaki örnekte, hem ` BrowserWindow ` hem de ` win ` uzak nesnelerdir ve ` new BrowserWindow ` işleyicide ` BrowserWindow ` nesnesi oluşturmaz. Bunun yerine ana süreçte ` BrowserWindow ` nesnesi oluşturdu ve ilgili uzaktaki nesneyi oluşturucu işleminde, diğer bir deyişle ` win` nesnesi.

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
// main process mapNumbers.js
exports.withRendererCallback = (mapper) => {
  return [1, 2, 3].map(mapper)
}

exports.withLocalCallback = () => {
  return [1, 2, 3].map(x => x + 1)
}
```

```javascript
// renderer process
const mapNumbers = require('electron').remote.require('./mapNumbers')
const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
const withLocalCb = mapNumbers.withLocalCallback()

console.log(withRendererCb, withLocalCb)
// [undefined, undefined, undefined], [2, 3, 4]
```

As you can see, the renderer callback's synchronous return value was not as expected, and didn't match the return value of an identical callback that lives in the main process.

Second, the callbacks passed to the main process will persist until the main process garbage-collects them.

For example, the following code seems innocent at first glance. It installs a callback for the `close` event on a remote object:

```javascript
require('electron').remote.getCurrentWindow().on('close', () => {
  // window was closed...
})
```

But remember the callback is referenced by the main process until you explicitly uninstall it. If you do not, each time you reload your window the callback will be installed again, leaking one callback for each restart.

To make things worse, since the context of previously installed callbacks has been released, exceptions will be raised in the main process when the `close` event is emitted.

To avoid this problem, ensure you clean up any references to renderer callbacks passed to the main process. This involves cleaning up event handlers, or ensuring the main process is explicitly told to deference callbacks that came from a renderer process that is exiting.

## Accessing built-in modules in the main process

The built-in modules in the main process are added as getters in the `remote` module, so you can use them directly like the `electron` module.

```javascript
const app = require('electron').remote.app
console.log(app)
```

## Metodlar

The `remote` module has the following methods:

### `remote.require(module)`

* `module` String

Returns `any` - The object returned by `require(module)` in the main process. Modules specified by their relative path will resolve relative to the entrypoint of the main process.

e.g.

    project/
    ├── main
    │   ├── foo.js
    │   └── index.js
    ├── package.json
    └── renderer
        └── index.js
    

```js
// main process: main/index.js
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

Returns [`BrowserWindow`](browser-window.md) - The window to which this web page belongs.

### `remote.getCurrentWebContents()`

Returns [`WebContents`](web-contents.md) - The web contents of this web page.

### `remote.getGlobal(name)`

* `name` String

Returns `any` - The global variable of `name` (e.g. `global[name]`) in the main process.

## Özellikler

### `remote.process`

The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.