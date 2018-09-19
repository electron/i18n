# Çerçevesiz pencere

> Araç çubukları, kenarlar veya başka görsel "chrome" olmadan bir pencere açın.

Çerçevesiz bir pencere web sayfasının bir parçası olmayan araç çubuğu gibi [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome) olmayan bir penceredir. Bunlar [`BrowserWindow`](browser-window.md) sınıfındaki seçeneklerdir.

## Çerçevesiz bir pencere oluşturun

Çerçevesiz pencere oluşturmak için, `çerçeve`'yi [BrowserWindow](browser-window.md)'un ` seçeneklerinden` `false` olarak ayarlamanız gerekir:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600, frame: false})
win.show()
```

### macOs üzerindeki alternatifler

MacoS 10.9 Mavericks ve üst versiyonlarda bir chromeless pencere belirlemenin alternatif bir yolu vardır. Başlık çubuğunu ve pencere denetimlerini devre dışı bırakan `frame` ‘yi `false` olarak ayarlamak yerine, başlık çubuğunu gizli tutmak isteyebilirsiniz ve içeriğiniz tam pencere boyutuna kadar uzatılabilir, ancak standart pencere işlemleri için pencere kontrollerini ("trafik ışıkları") hala koruyabilirsiniz. Bunu, `titleBarStyle` seçeneğini belirleyerek yapabilirsiniz:

#### `hidden`

Sonuçlar gizli bir başlık çubuğunda ve tam boyutlu bir içerik penceresindedir, ancak başlık çubuğunun sol üst köşesinde hala standart pencere kontrolleri (“trafik ışıkları”) vardır.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hidden'})
win.show()
```

#### `hiddenInset`

Sonuçlar trafik ışığı düğmelerinin pencere kenarından biraz daha yerleştirildiği, alternatif bir görünüme sahip, gizli bir başlık çubuğundadır.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hiddenInset'})
win.show()
```

#### `customButtonsOnHover`

Pencerenin sol üst köşesinde gezinirken, görüntülenen özel çekilmiş yakın, minyatür ve tam ekran düğmelerini kullanır. Bu özel düğmeler standart pencere araç çubuğu düğmeleriyle ortaya çıkan fare hareketi sorunlarını önler. Bu seçenek yalnızca çerçevesiz pencereler için geçerlidir.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'customButtonsOnHover', frame: false})
win.show()
```

## Pencere şeffaflığı

`şeffaf` seçeneğini `true` olarak ayarlayarak, çerçevesiz şeffaf pencere de yapabilirsiniz:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()
```

### Kısıtlamalar

* Şeffaf alan üzerine tıklayamazsınız. Bunu çözmek için pencere şeklini ayarlayan bir API tanıtacağız, ayrıntılar için bkz. [sorunlarımız](https://github.com/electron/electron/issues/1335).
* Şeffaf pencereler yeniden boyutlandırılamaz. `yeniden boyutlandırılabilir` ayarını `true` olarak ayarlamak, şeffaf pencerenin bazı platformlarda çalışmanın durmasına sebep olacaktır.
* `Bulanıklaştırma` filtresi yalnızca web sayfası için geçerlidir; bu nedenle pencerenin altındaki içeriğe bulanıklığı efekti uygulamak mümkün değildir (ör. kullanıcının sisteminde açılan diğer uygulamalar).
* Windows işletim sistemlerinde, DWM devre dışıyken şeffaf pencereler çalışmaz.
* On Linux, users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
* On Mac, the native window shadow will not be shown on a transparent window.

## Tıklama penceresi

Bir tıklama penceresi oluşturmak, diğer bir deyişle, pencereyi tüm fare hareketlerinden yok saymak için, [ win.setIgnoreMouseEvents (ignore)](browser-window.md#winsetignoremouseeventsignore)'ı çağırabilirsiniz. API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Yönlendir

Fare mesajlarını yok saymak, web sayfasını fare hareketi yapmaktan habersiz hale getirir, yani fare hareketi olaylarının yayılamayacağı anlamına gelir. Windows işletim sistemlerinde fare hareket iletilerini web sayfasına iletmek için isteğe bağlı bir parametre `mouseleave` kullanılabilir ve olayların yayımlanmasına izin verilir:

```javascript
let win = require('electron').remote.getCurrentWindow()
let el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  win.setIgnoreMouseEvents(true, {forward: true})
})
el.addEventListener('mouseleave', () => {
  win.setIgnoreMouseEvents(false)
})
```

Bu, web sayfasını `el` üzerinde tıklandığında aktifleşir ve bunun dışında olursa normal duruma döner.

## Sürüklenebilir bölge

Varsayılan olarak, çerçevesiz pencere sürüklenemez. Uygulamalar hangi bölgelerin sürüklenebilir olduğunu (OS'nin standart başlık çubuğu gibi) Elektron'a bildirmek için CSS'de `-webkit-app-region: drag` belirtmelidir ve uygulamalar da `-webkit-app-region: no-drag` sürüklenemez alanı sürüklenebilir bölgeden çıkarmak için kullanabilir. Şu anda yalnızca dikdörtgen şekiller desteklenmektedir.

Not: `-webkit-app-region: drag`'ın geliştirici araçları açıkken sorun yaşadığı bilinmektedir. Geçici bir çözüm de dahil olmak üzere daha fazla bilgi için [GitHub sorun](https://github.com/electron/electron/issues/3647) kısmına bakın.

Tüm pencereyi sürüklenebilir yapmak için, `-webkit-app-region: drag`'i `body` tarzında ekleyebilirsiniz:

<pre><code class="html">&lt;body style="-webkit-app-region: drag"&gt;<body style="-webkit-app-region: drag">
</body>&lt;/body&gt;
</code></pre>

Ve tüm pencereyi sürüklenebilir yapmışsanız, düğmeleri sürüklenemez olarak işaretlemeniz gerektiğini unutmayın, aksi halde kullanıcıların onlara tıklaması imkansız olacaktır:

```css
button {
  -webkit-app-region: no-drag;
}
```

Yalnızca özel bir başlık çubuğunu sürüklenebilir olarak ayarlıyorsanız, başlık çubuğundaki tüm düğmeleri sürüklenemez yapmanız gerekiyor.

## Metin seçimi

Çerçevesiz pencerede sürükleme hareketi, metin seçimi ile çakışabilir. Örneğin, başlık çubuğunu sürüklediğinizde, yanlışlıkla başlık çubuğu üstündeki metni seçebilirsiniz. Bunu önlemek için, sürüklenebilir alandaki metin seçimini bu şekilde devre dışı bırakmanız gerekiyor:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Kaynak menüsü

Bazı platformlarda, sürüklenebilir alan, istemci olmayan bir çerçeve olarak değerlendirilir; bu nedenle sağ tıkladığınızda bir sistem menüsü açılır. Tüm platformlarda doğru davranan bir bağlam menüsü yapmak için sürüklenebilir alanlarda hiçbir şekilde bir özel bağlam menüsü kullanmamalısınız.