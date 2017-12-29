# Masaüstü Ortam Entegrasyonu

Farklı işletim sistemlerini masaüstünü entegre etmek için farklı özellikler sunar uygulamaları masaüstü ortamlarına dönüştürür. Örneğin, Windows'ta, uygulama kısayollarını görev çubuğunun görev listesine koyabilir ve Mac'te uygulamaları, dock menüsüne özel bir menüye yerleştirebilir.

Bu bölüm, uygulamanızı masaüstü ortamınıza entegre etmek için Electron API'lerinin nasıl kullanılacağını açıklayacaktır.

## Bildirimler

Bakınız [Notifications](notifications.md)

## Şuan ki Dökümanlar (Windows & macOS)

Windows ve MacOS, tarafından açılan son belgelerin bir listesine kolay erişim sağlar. sırasıyla görev listesi veya dock menüsü aracılığıyla uygulama.

**Görev Listesi:**

![Görev listesi Son Dosyalar listesi](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Uygulama kesinti menüsü:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

Yeni belgelere dosya eklemek için, [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-os-x-windows) API:

```javascript
const {app} = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Ve boşaltmak için [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-os-x-windows) API'sını kullanabilirsiniz son belgeler listesi:

```javascript
const {app} = require('electron')
app.clearRecentDocuments()
```

### Windows notları

Bu özelliği Windows'ta kullanabilmek için uygulamanızın belgenin dosya türünü bir işleyici olarak kaydetmesi gerekir, aksi halde dosya ekledikten sonra bile Görev listesi'nde görünmeyecektir. Her şeyi bulabilirsiniz Başvurunuzun tescili hakkında [Application Registration](http://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx).

Bir kullanıcı Görev Listesi'nden bir dosyayı tıkladığında, uygulamanızın yeni bir örneği komut satırı argümanı olarak eklenen dosyanın yolu ile başlatılacaktır.

### macOS Notları

Son belgeler menüsünden bir dosya istediğinde, `open-file` event of `app` modülü yayınlanacaktır.

## Özel Dock Menüsü (macOS)

macOS, geliştiricilerin dock için özel bir menü belirlemelerini sağlar; bu genellikle uygulamanızın yaygın olarak kullanılan özellikleri için kısayollar içerir:

**Dock menü Terminal.app:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

Özel dock menüyü kurmak için sadece macOS üzerinde kullanılabilen `app.dock.setMenu` API ' yi kullanabilirsin:

```javascript
const {app, Menu} = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {label: 'New Window', click () { console.log('New Window') }},
  {label: 'New Window with Settings',
    submenu: [
      {label: 'Basic'},
      {label: 'Pro'}
    ]
  },
  {label: 'New Command...'}
])
app.dock.setMenu(dockMenu)
```

## Kullanıcı görevleri (windows)

Windows'ta, Görev listesi'nin `Tasks` kategorisinde özel eylemler belirtebilirsiniz, MSDN'den aktarılan gibi:

> Uygulamalar görevleri program özelliklerine ve önemli şeylere göre tanımlar kullanıcının bunlara göre yapması beklenir. Görevler bağlam içermemeli, uygulamanın çalışması için çalışıyor olması gerekmez. Onlar normal bir kullanıcının yapacağı istatistiksel olarak en yaygın işlemler olmalıdır bir e-posta mesajı oluşturmak veya bir e-posta mesajı oluşturmak gibi bir uygulamada posta programındaki takvim, bir kelime işlemcide yeni bir belge oluşturun, bir uygulamayı belirli bir modda açabilir veya alt komutlarından birini başlatabilirsiniz. Bir uygulamanın, menüyü standart olan gelişmiş özelliklerle karmaşıklaştırmaması gerekir Kullanıcıların kayıt gibi bir kereye mahsus işlem yapmasına gerek yoktur. Yükseltmeler veya özel teklifler gibi promosyon amaçlı ürünler için görevleri kullanmayın.
> 
> Görev listesinin statik olması şiddetle önerilir. It should remain the same regardless of the state or status of the application. Görev listesini dinamik olarak değiştirebilirsiniz, ancak bazı kullanıcıların beklenmedik görev listesi değişiklikleriyle karıştırılabileceğini düşünmelisiniz.

**Internet Explorer'ın görevi:**

![IE](https://msdn.microsoft.com/dynimg/IC420539.png)

Gerçek bir menü olan macOS'taki dock menüsünün aksine, Windows'daki kullanıcı görevleri kullanıcı bir görevi tıkladığında programın uygulama kısayolları gibi belirtilen argümanlarla yürütülür.

Uygulamanızın kullanıcı görevlerini ayarlamak için şunları kullanabilirsiniz: [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API:

```javascript
const {app} = require('electron')
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

Görevler listesini temizlemek için `app.setUserTasks` öğesini boş bir diziyle çağırmanız yeterlidir:

```javascript
const {app} = require('electron')
app.setUserTasks([])
```

Kullanıcı görevleri, uygulamanız kapandıktan sonra bile gösterilir, bu nedenle simge ve bir görev için belirtilen program yolu, uygulamanız bitene kadar var olmalıdır. kaldırıldı.

## Küçük resim araç çubukları

Windows'ta bir görev çubuğunda belirtilen butonlarla küçük resim araç çubuğu ekleyebilirsiniz bir uygulama penceresinin düzeni. It provides users a way to access to a particular window's command without restoring or activating the window.

From MSDN, it's illustrated:

> Bu araç sadece tanıdık Standart araç ortak kontrolüdür. En fazla yedi buton vardır. Each button's ID, image, tooltip, and state are defined in a structure, which is then passed to the taskbar. The application can show, enable, disable, or hide buttons from the thumbnail toolbar as required by its current state.
> 
> For example, Windows Media Player might offer standard media transport controls such as play, pause, mute, and stop.

**Thumbnail toolbar of Windows Media Player:**

![oynatıcı](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows-7) to set thumbnail toolbar in your application:

```javascript
const {BrowserWindow} = require('electron')
const path = require('path')

let win = new BrowserWindow({
  width: 800,
  height: 600
})

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  },
  {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

To clean thumbnail toolbar buttons, just call `BrowserWindow.setThumbarButtons` with an empty array:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setThumbarButtons([])
```

## Unity Launcher Shortcuts (Linux)

In Unity, you can add custom entries to its launcher via modifying the `.desktop` file, see [Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher).

**Launcher shortcuts of Audacious:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## Görev çubuğunda ilerleme çubuğu (Windows, macOS, Unity)

On Windows a taskbar button can be used to display a progress bar. This enables a window to provide progress information to the user without the user having to switch to the window itself.

MacOS üzerinde ilerleme çubuğu dock simgesinin bir parçası olarak görüntülenir.

Unity DE aynı zamanda başlatıcıda ki ilerleme çubuğunu belirlemenizi sağlayan benzer bir özelliğe sahiptir.

**ilerleme çubuğu düğmesindeki görev çubuğu düğmesi:**

![Görev çubuğu ilerleme çubuğu](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

To set the progress bar for a Window, you can use the [BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## Icon Overlays in Taskbar (Windows)

On Windows a taskbar button can use a small overlay to display application status, as quoted from MSDN:

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

**Overlay on taskbar button:**

![Overlay on taskbar button](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows-7) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash çerçeve (Windows)

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Don't forget to call the `flashFrame` method with `false` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

## Pencerenin temsili dosyası (macOS)

On macOS a window can set its represented file, so the file's icon can show in the title bar and when users Command-Click or Control-Click on the title a path popup will show.

You can also set the edited state of a window so that the file icon can indicate whether the document in this window has been modified.

**Temsil dosya açılan menüsü:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-os-x) and [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-os-x) APIs:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

## Dragging files out of the window

For certain kinds of apps that manipulate on files, it is important to be able to drag files from Electron to other apps. To implement this feature in your app, you need to call `webContents.startDrag(item)` API on `ondragstart` event.

Web sayfasında:

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Ana işlem içinde:

```javascript
const {ipcMain} = require('electron')
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```