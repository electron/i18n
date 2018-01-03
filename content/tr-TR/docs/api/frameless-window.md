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

Sonuçlar trafik ışığı düğmelerinin pencere kenarından biraz daha yerleştirildiği alternatif bir görünüme sahip gizli bir başlık çubuğundadır.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hiddenInset'})
win.show()
```

#### `customButtonsOnHover`

Uses custom drawn close, miniaturize, and fullscreen buttons that display when hovering in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. This option is only applicable for frameless windows.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'customButtonsOnHover', frame: false})
win.show()
```

## Pencere şeffaflığı

By setting the `transparent` option to `true`, you can also make the frameless window transparent:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()
```

### Kısıtlamalar

* You can not click through the transparent area. We are going to introduce an API to set window shape to solve this, see [our issue](https://github.com/electron/electron/issues/1335) for details.
* Transparent windows are not resizable. Setting `resizable` to `true` may make a transparent window stop working on some platforms.
* The `blur` filter only applies to the web page, so there is no way to apply blur effect to the content below the window (i.e. other applications open on the user's system).
* On Windows operating systems, transparent windows will not work when DWM is disabled.
* GPU'yu devre dışı bırakmak ve ARGB'ın şeffaf pencere açmasına izin vermek için Linux kullanıcıları komut satırına `--enable-transparent-visuals --disable-gpu ` değerini koymalıdırlar; bunun nedeni bir akış hatası olan [Alfa kanalı, Linux'daki bazı NVidia sürücüleri üzerinde çalışmaz](https://code.google.com/p/chromium/issues/detail?id=369209).
* On Mac the native window shadow will not be shown on a transparent window.

## Tıklama penceresi

To create a click-through window, i.e. making the window ignore all mouse events, you can call the [win.setIgnoreMouseEvents(ignore)](browser-window.md#winsetignoremouseeventsignore) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

## Sürüklenebilir bölge

By default, the frameless window is non-draggable. Uygulamalar hangi bölgelerin sürüklenebilir olduğunu (OS'nin standart başlık çubuğu gibi) Elektron'a bildirmek için CSS'de `-webkit-app-region: drag` belirtmelidir ve uygulamalar da `-webkit-app-region: no-drag` sürüklenemez alanı sürüklenebilir bölgeden çıkarmak için kullanabilir. Note that only rectangular shapes are currently supported.

Note: `-webkit-app-region: drag` is known to have problems while the developer tools are open. See this [GitHub issue](https://github.com/electron/electron/issues/3647) for more information including a workaround.

Tüm pencereyi sürüklenebilir yapmak için, `-webkit-app-region: drag`'i `body` tarzında ekleyebilirsiniz:

<pre><code class="html">&lt;body style="-webkit-app-region: drag"&gt;<body style="-webkit-app-region: drag">
</body>&lt;/body&gt;
</code></pre>

And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:

```css
button {
  -webkit-app-region: no-drag;
}
```

Yalnızca özel bir başlık çubuğunu sürüklenebilir olarak ayarlıyorsanız, başlık çubuğundaki tüm düğmeleri sürüklenemez yapmanız gerekiyor.

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