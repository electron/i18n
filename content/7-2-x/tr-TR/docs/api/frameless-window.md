# Çerçevesiz pencere

> Araç çubukları, kenarlar veya başka görsel "chrome" olmadan bir pencere açın.

Çerçevesiz bir pencere web sayfasının bir parçası olmayan araç çubuğu gibi [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome) olmayan bir penceredir. Bunlar [`BrowserWindow`](browser-window.md) sınıfındaki seçeneklerdir.

## Çerçevesiz bir pencere oluşturun

Çerçevesiz pencere oluşturmak için, `çerçeve`'yi [BrowserWindow](browser-window.md)'un ` seçeneklerinden` `false` olarak ayarlamanız gerekir:


```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ width: 800, height: 600, frame: false })
win.show()
```

### macOs üzerindeki alternatifler

There's an alternative way to specify a chromeless window. Instead of setting `frame` to `false` which disables both the titlebar and window controls, you may want to have the title bar hidden and your content extend to the full window size, yet still preserve the window controls ("traffic lights") for standard window actions. Bunu, `titleBarStyle` seçeneğini belirleyerek yapabilirsiniz:

#### `hidden`

Sonuçlar gizli bir başlık çubuğunda ve tam boyutlu bir içerik penceresindedir, ancak başlık çubuğunun sol üst köşesinde hala standart pencere kontrolleri (“trafik ışıkları”) vardır.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ titleBarStyle: 'hidden' })
win.show()
```

#### `hiddenInset`

Sonuçlar trafik ışığı düğmelerinin pencere kenarından biraz daha yerleştirildiği, alternatif bir görünüme sahip, gizli bir başlık çubuğundadır.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ titleBarStyle: 'hiddenInset' })
win.show()
```

#### `customButtonsOnHover`

Uses custom drawn close, and miniaturize buttons that display when hovering in the top left of the window. The fullscreen button is not available due to restrictions of frameless windows as they interface with Apple's MacOS window masks. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. This option is only applicable for frameless windows.

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false })
win.show()
```

## Pencere şeffaflığı

`şeffaf` seçeneğini `true` olarak ayarlayarak, çerçevesiz şeffaf pencere de yapabilirsiniz:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({ transparent: true, frame: false })
win.show()
```

### Kısıtlamalar

* Şeffaf alan üzerine tıklayamazsınız. Bunu çözmek için pencere şeklini ayarlayan bir API tanıtacağız, ayrıntılar için bkz. [sorunlarımız](https://github.com/electron/electron/issues/1335).
* Transparent windows are not resizable. Setting `resizable` to `true` may make a transparent window stop working on some platforms.
* `Bulanıklaştırma` filtresi yalnızca web sayfası için geçerlidir; bu nedenle pencerenin altındaki içeriğe bulanıklığı efekti uygulamak mümkün değildir (ör. kullanıcının sisteminde açılan diğer uygulamalar).
* Windows işletim sistemlerinde, DWM devre dışıyken şeffaf pencereler çalışmaz.
* On Linux, users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
* On Mac, the native window shadow will not be shown on a transparent window.

## Tıklama penceresi

Bir tıklama penceresi oluşturmak, diğer bir deyişle, pencereyi tüm fare hareketlerinden yok saymak için, [ win.setIgnoreMouseEvents (ignore)](browser-window.md#winsetignoremouseeventsignore-options)'ı çağırabilirsiniz. API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

### Yönlendir

Fare mesajlarını yok saymak, web sayfasını fare hareketi yapmaktan habersiz hale getirir, yani fare hareketi olaylarının yayılamayacağı anlamına gelir. Windows işletim sistemlerinde fare hareket iletilerini web sayfasına iletmek için isteğe bağlı bir parametre `mouseleave` kullanılabilir ve olayların yayımlanmasına izin verilir:

```javascript
let win = require('electron').remote.getCurrentWindow()
let el = document.getElementById('clickThroughElement')
el.addEventListener('mouseenter', () => {
  win.setIgnoreMouseEvents(true, { forward: true })
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

```html
<body style="-webkit-app-region: drag"><body style="-webkit-app-region: drag" mark="crwd-mark">
</body></body>
```

Ve tüm pencereyi sürüklenebilir yapmışsanız, düğmeleri sürüklenemez olarak işaretlemeniz gerektiğini unutmayın, aksi halde kullanıcıların onlara tıklaması imkansız olacaktır:

```css
button {
  -webkit-app-region: no-drag;
}
```

If you're only setting a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.

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
