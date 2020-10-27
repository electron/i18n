# Windows Taskbar

## Genel Bakış

Electron has APIs to configure the app's icon in the Windows taskbar. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## Görev Listesi

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> Uygulamalar görevleri program özelliklerine ve önemli şeylere göre tanımlar kullanıcının bunlara göre yapması beklenir. Görevler bağlam içermemeli, uygulamanın çalışması için çalışıyor olması gerekmez. Onlar normal bir kullanıcının yapacağı istatistiksel olarak en yaygın işlemler olmalıdır bir e-posta mesajı oluşturmak veya bir e-posta mesajı oluşturmak gibi bir uygulamada posta programındaki takvim, bir kelime işlemcide yeni bir belge oluşturun, bir uygulamayı belirli bir modda açabilir veya alt komutlarından birini başlatabilirsiniz. Bir uygulamanın, menüyü standart olan gelişmiş özelliklerle karmaşıklaştırmaması gerekir Kullanıcıların kayıt gibi bir kereye mahsus işlem yapmasına gerek yoktur. Yükseltmeler veya özel teklifler gibi promosyon amaçlı ürünler için görevleri kullanmayın.
> 
> Görev listesinin statik olması şiddetle önerilir. Bu durumun veya uygulamanın durumunun ne olursa olsun aynı kalması gerekmektedir. Görev listesini dinamik olarak değiştirebilirsiniz, ancak bazı kullanıcıların beklenmedik görev listesi değişiklikleriyle karıştırılabileceğini düşünmelisiniz.

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

Uygulamanızın kullanıcı görevlerini ayarlamak için şunları kullanabilirsiniz: [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API.

#### Örnekler

##### Set user tasks

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { app } = require('electron')

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

##### Clear tasks list

To clear your tasks list, you need to call `app.setUserTasks` with an empty array in the `main.js` file.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> NOTE: The user tasks will still be displayed even after closing your application, so the icon and program path specified for a task should exist until your application is uninstalled.

### Küçük resim araç çubukları

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars):

> This toolbar is the familiar standard toolbar common control. En fazla yedi buton vardır. Her düğmenin kimliği, görüntüsü, araç ipucu ve durumu, görev çubuğuna konulan bir yapı içinde tanımlanır. Uygulama, mevcut durum gereği küçük resimleri araç çubuğunda gösterebilir, etkinleştirebilir, devre dışı bırakabilir veya gizleyebilir.
> 
> Örneğin, Windows Media Player, play, pause, mute ve stop gibi standart ortam taşıma denetimleri sunabilir.

![oynatıcı](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### Örnekler

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

##### Clear thumbnail toolbar

To clear thumbnail toolbar buttons, you need to call `BrowserWindow.setThumbarButtons` with an empty array in the `main.js` file.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### Icon Overlays in Taskbar

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> Simge ve yer paylaşımları durumu bağlamsal bir bildirim olarak hizmet ve kullanıcıya bu bilgileri iletişim kurmak için ayrı bir bildirim durumu simgesi gereksinimini ortadan kaldırmak için tasarlanmıştır. Örneğin, bildirim alanında gösterilen Microsoft Outlook'ta yeni posta durumu artık görev çubuğu düğmesindeki bir kaplama ile gösterilebilir. Tekrardan, hangi metodun uygulamanız iyi olduğuna geliştirme döneminde karar vermeniz gerekmektedir. Yer paylaşımı simgeleri, ağ durumu, mesajlaşma durumu veya yeni posta gibi önemli, uzun süreli durum veya bildirimleri sağlamak için tasarlanmıştır. Kullanıcı sürekli değişen yer paylaşımları veya animasyonlar ile ortaya konmamalıdır.

![Arayüzü görev çubuğuna al](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### Örnek

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Flash Frame

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> Genellikle, kullanıcıya pencerenin dikkat gerektirdiğini ancak şu anda klavye odağına sahip olmadığını kullanıcıya belirten bir pencere görünür.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### Örnek

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.
