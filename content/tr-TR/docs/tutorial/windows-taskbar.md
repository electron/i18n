# Windows Taskbar

Electron has APIs to configure the app's icon in the Windows taskbar. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## Görev Listesi

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the task bar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from MSDN:

> Uygulamalar görevleri program özelliklerine ve önemli şeylere göre tanımlar kullanıcının bunlara göre yapması beklenir. Görevler bağlam içermemeli, uygulamanın çalışması için çalışıyor olması gerekmez. Onlar normal bir kullanıcının yapacağı istatistiksel olarak en yaygın işlemler olmalıdır bir e-posta mesajı oluşturmak veya bir e-posta mesajı oluşturmak gibi bir uygulamada posta programındaki takvim, bir kelime işlemcide yeni bir belge oluşturun, bir uygulamayı belirli bir modda açabilir veya alt komutlarından birini başlatabilirsiniz. Bir uygulamanın, menüyü standart olan gelişmiş özelliklerle karmaşıklaştırmaması gerekir Kullanıcıların kayıt gibi bir kereye mahsus işlem yapmasına gerek yoktur. Yükseltmeler veya özel teklifler gibi promosyon amaçlı ürünler için görevleri kullanmayın.
> 
> Görev listesinin statik olması şiddetle önerilir. Bu durumun veya uygulamanın durumunun ne olursa olsun aynı kalması gerekmektedir. Görev listesini dinamik olarak değiştirebilirsiniz, ancak bazı kullanıcıların beklenmedik görev listesi değişiklikleriyle karıştırılabileceğini düşünmelisiniz.

**Internet Explorer'ın görevi:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

Gerçek bir menü olan macOS'taki dock menüsünün aksine, Windows'daki kullanıcı görevleri kullanıcı bir görevi tıkladığında programın uygulama kısayolları gibi belirtilen argümanlarla yürütülür.

Uygulamanızın kullanıcı görevlerini ayarlamak için şunları kullanabilirsiniz: [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API:

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

To clean your tasks list, call `app.setUserTasks` with an empty array:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

Kullanıcı görevleri, uygulamanız kapandıktan sonra bile gösterilir, bu nedenle simge ve bir görev için belirtilen program yolu, uygulamanız bitene kadar var olmalıdır. kaldırıldı.

## Küçük resim araç çubukları

Windows'ta bir görev çubuğunda belirtilen butonlarla küçük resim araç çubuğu ekleyebilirsiniz bir uygulama penceresinin düzeni. Kullanıcılara, pencereyi geri yüklemeden veya etkinleştirmeden belirli bir pencerenin komutuna erişmenin yolunu sağlar.

MSDN'den örneklendirilmiştir:

> This toolbar is the familiar standard toolbar common control. En fazla yedi buton vardır. Her düğmenin kimliği, görüntüsü, araç ipucu ve durumu, görev çubuğuna konulan bir yapı içinde tanımlanır. Uygulama, mevcut durum gereği küçük resimleri araç çubuğunda gösterebilir, etkinleştirebilir, devre dışı bırakabilir veya gizleyebilir.
> 
> Örneğin, Windows Media Player, play, pause, mute ve stop gibi standart ortam taşıma denetimleri sunabilir.

**Windows Media Player'ın küçük resim araç çubuğu:**

![oynatıcı](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

[BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) Bunu uygulamanız içerisinde küçük resim araç çubuğunu ayarlamak için kullanabilirsiniz:

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

Küçük resim araç çubuğu düğmelerini temizlemek için boş bir diziyle `BrowserWindow.setThumbarButtons` öğesini çağırmanız yeterlidir:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

## Icon Overlays in Taskbar

Windows'ta bir görev çubuğu düğmesi, MSDN'den aktarıldığı gibi uygulama durumunu görüntülemek için küçük bir yer paylaşımında kullanılabilir:

> Simge ve yer paylaşımları durumu bağlamsal bir bildirim olarak hizmet ve kullanıcıya bu bilgileri iletişim kurmak için ayrı bir bildirim durumu simgesi gereksinimini ortadan kaldırmak için tasarlanmıştır. Örneğin, bildirim alanında gösterilen Microsoft Outlook'ta yeni posta durumu artık görev çubuğu düğmesindeki bir kaplama ile gösterilebilir. Tekrardan, hangi metodun uygulamanız iyi olduğuna geliştirme döneminde karar vermeniz gerekmektedir. Yer paylaşımı simgeleri, ağ durumu, mesajlaşma durumu veya yeni posta gibi önemli, uzun süreli durum veya bildirimleri sağlamak için tasarlanmıştır. Kullanıcı sürekli değişen yer paylaşımları veya animasyonlar ile ortaya konmamalıdır.

**Arayüzü görev çubuğuna al:**

![Arayüzü görev çubuğuna al](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

[BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API: Bunu bir pencereye yer paylaşım simgesi ayarlamak için kullanabilirisiniz:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Overlay için açıklama')
```

## Flash Frame

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Genellikle, kullanıcıya pencerenin dikkat gerektirdiğini ancak şu anda klavye odağına sahip olmadığını kullanıcıya belirten bir pencere görünür.

BrowserWindow görev çubuğu düğmesine basmak için, BrowserWindow.flashFrame </ 0> API:</p> 

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Flash'ı devre dışı bırakmak için `false` ile `flashFrame` metodunu çağırmayı unutmayın. Yukarıdaki örnekte, pencere odak noktasına geldiğinde çağrılır, ancak pencreyi devre dışı bırakmak için bir zaman aşımı veya başka bir olay kullanmanız mümkündür.