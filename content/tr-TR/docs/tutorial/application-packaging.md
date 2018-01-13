# Uygulama Paketleme

Windows'ta uzun yol adları etrafındaki [issues](https://github.com/joyent/node/issues/6960) azaltmak için `require`’ı biraz hızlandırın ve kaynak kodunuzu muayene işleminden gizleyin, uygulamanızı, kaynak kodunuzda ufak değişiklikler yaparak bir [asar](https://github.com/electron/asar) arşivine paketlemeyi seçebilirsiniz.

## `asar` Arşivi Oluşturuluyor

Bir [asar](https://github.com/electron/asar) arşivi, dosyaları birleştiren basit bir tar benzeri formatta tek bir dosyaya dönüştürür. Electron, bütün dosyaları paketten çıkarmadan rastgele dosyaları okuyabilir.

Uygulamanızı bir `asar` arşivine paketlemeye ilişkin adımlar:

### 1. Asar Yardımcı Programını Kurun

```sh
$ npm kurma -g asar
```

### 2. Paket `asar pack`

```sh
$ asar pack your-app app.asar
```

## Arşivleri `asar` kullanma

Electron'da iki API seti vardır: Node.js ve Web tarafından sağlanan buton API'leri Chromium tarafından sağlanan API'ler. Her iki API, `asar` arşivlerinden dosyaları okumayı desteklemektedir.

### Node API

Electron'da özel yamalarla, `fs.readFile` ve `require` gerektirir. ` asar` arşivlerini sanal dizinler olarak ve içindeki dosyalar normal Dosya sistemindeki dosyalardır.

Örneğin, bir `example.asar` archive under `/path/to`:

```sh
$ asar listesi /path/to/example.asar
/app.js
/file.txt
/dir/module.js
/static/index.html
/static/main.css
/static/jquery.min.js
```

`asar` Arşivindeki bir dosyayı okuyun:

```javascript
const fs = require('fs')
fs.readFileSync('/path/to/example.asar/file.txt')
```

Arşivin kök dizinindeki tüm dosyaları listeleyin:

```javascript
const fs = require('fs')
fs.readdirSync('/path/to/example.asar')
```

Arşivdeki bir modülü kullanın:

```javascript
gerektirir('/path/to/example.asar/dir/module.js')
```

`BrowserWindow` ile `asar` arşivinde bir web sayfası da gösterebilirsiniz:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600})
win.loadURL('file:///path/to/example.asar/static/index.html')
```

### Web API

Bir web sayfasında, arşivdeki dosyalar `file:` protokolü ile istenebilir. Buton API'sı gibi, `asar` arşivleri de dizin olarak değerlendirilir.

Örneğin, bir dosyayı almak için `$.get`:

```html
<script>
let $ = require('./jquery.min.js')
$.get('file:///path/to/example.asar/file.txt', (data) => {
  console.log(data)
})
</script>
```

### `asar` Arşivini Normal Dosya Olarak İşleme

Bazı durumlarda, `asar` arşivinin doğrulanması gibi, `asar ` arşivinin bir dosya olarak içeriğini okumamız lazım. Bu amaçla `original-fs` module which provides original `fs` APIs without `asar` dahili desteği kullanabilirsiniz:

```javascript
const originalFs = require('original-fs')
originalFs.readFileSync('/path/to/example.asar')
```

Ayrıca ` process.noAsar </ 0> 'ı <code> true </ 0> olarak ayarlayarak da <code> asar </ 0> desteğini devre dışı bırakabilirsiniz.
<code> fs </ 0> modülü:</p>

<pre><code class="javascript">const fs = require('fs')
process.noAsar = true
fs.readFileSync('/path/to/example.asar')
`</pre> 

## Node API'nin Limitleri

`asar` arşivlerini mümkün olduğunca Node API'sindeki dizinler gibi çalıştırmak için çok uğraşmış olsak da, Node API'sının düşük düzeyli doğasından dolayı hala sınırlamalar bulunmaktadır.

### Arşiv salt okunur

Arşivler değiştirilemez, bu nedenle dosyaları değiştirebilen tüm Buton API'leri `asar` arşivleriyle çalışın.

### Çalışma dizini arşivdeki dizinlere ayarlanamıyor

`asar` arşivleri dizin olarak değerlendirilse de, gerçek dizinleri, çalışma dizini olarak asla ayarlayamazsınız dizinler `asar` arşivlerinde. Bazı API'ların `cwd` seçeneği olarak geçirilmesi hatalara neden olur.

### Bazı API'lerde Ekstra Paketten Çıkarma

Çoğu `fs` API'si bir dosyayı okuyabilir veya paketten çıkarmadan bir dosya bilgisini `asar` arşivlerinden alabilir ancak gerçek dosya yolunu temel alınan sistem çağrılarına geçirmeye dayanan bazı API'ler için, Electron gerekli dosyayı geçici bir dosyaya çıkaracaktır ve geçici dosyanın yolunu API'lara çalışması için iletirler. Bu, bu API'ler için biraz yük getirir.

Ek paketten çıkarmayı gerektiren API'ler şunlardır:

* `child_process.execFile`
* `child_process.execFileSync`
* `fs.open`
* `fs.openSync`
* ` process.dlopen </ 0> - Yerel modüller için <code> require </ 0> tarafından kullanılır</li>
</ul>

<h3>Sahte Stat Bilgileri <code>fs.stat`</h3> 
    ` fs.stat </ 0> tarafından gönderilen <code>Stats </ 0> nesnesi ve arkadaşları <code> asar </ 0> arşivler tahmin ederek oluşturulur, çünkü bu dosyalar dosya sisteminde bulunmuyor. Bu nedenle, dosya alma haricinde<code>Stats` nesnesine güvenmemelisiniz boyutunu ve dosya türünü denetle.
    
    ### `asar` Arşivinde İkili Yürütme
    
    `child_process.exec` gibi ikili dosyaları çalıştırabilen düğüm API'leri var, `child_process.spawn` ve `child_process.execFile `, ancak yalnızca `execFile` `asar` arşivindeki ikili dosyaları çalıştırmak için desteklenmektedir.
    
    Bunun nedeni, giriş olarak ` file <code> exec </ 0> ve <code> spawn </ 0> <code> komutunu </ 0> kabul etmesi, ve <code> command </ 0> 'ların kabuk altında yürütülmesi. Belirlemek için güvenilir bir yol yok.
bir komutun asar arşivinde bir dosya kullanıp kullanmadığı belirlemek için güvenilir bir yol yoktur, yan etkileri olmadan komuta yolunu değiştirip değiştiremeyeceğimizden emin olamayız.</p>

<h2>Paketlenmemiş Dosyaları <code>asar` Arşivine Ekleme</h2> 
    
    Yukarıda belirtildiği gibi, bazı düğüm API'leri, dosyayı dosya sistemine açmak için performans sorunlarının yanı sıra virüs tarayıcılarında yanlış uyarılara da yol açabilir.
    
    Bu sorunu çözmek için, arşiv oluşturma özelliğini kullanarak bazı dosyaları açabilirsiniz. `--unpack ` seçeneği, yerel modüllerin paylaşılan kitaplıklarını hariç tutmanın geçerli bir örneğidir:
    
    ```sh
$ asar pack app app.asar --unpack *.node
```

Komutu çalıştırdıktan sonra, `app.asar` haricinde, açılmış dosyaları içeren bir `app.asar.unpacked` klasörü de var, bunu kullanıcılara gönderirken `app.asar` ile birlikte kopyalamalısınız.