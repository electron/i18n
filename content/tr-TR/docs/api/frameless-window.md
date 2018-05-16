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

### Forwarding

Ignoring mouse messages makes the web page oblivious to mouse movement, meaning that mouse movement events will not be emitted. On Windows operating systems an optional parameter can be used to forward mouse move messages to the web page, allowing events such as `mouseleave` to be emitted:

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

This makes the web page click-through when over `el`, and returns to normal outside it.

## Sürüklenebilir bölge

By default, the frameless window is non-draggable. Apps need to specify `-webkit-app-region: drag` in CSS to tell Electron which regions are draggable (like the OS's standard titlebar), and apps can also use `-webkit-app-region: no-drag` to exclude the non-draggable area from the draggable region. Note that only rectangular shapes are currently supported.

Note: `-webkit-app-region: drag` is known to have problems while the developer tools are open. See this [GitHub issue](https://github.com/electron/electron/issues/3647) for more information including a workaround.

To make the whole window draggable, you can add `-webkit-app-region: drag` as `body`'s style:

```html
<body style="-webkit-app-region: drag">
</body>
```

And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:

```css
button {
  -webkit-app-region: no-drag;
}
```

If you're setting just a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.

## Metin seçimi

In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## Kaynak menüsü

On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.