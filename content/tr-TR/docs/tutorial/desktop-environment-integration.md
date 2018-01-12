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

To add a file to recent documents, you can use the [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API:

```javascript
const {app} = require('electron')
app.addRecentDocument('/kullanıcı/kullanıcıadı/Masaüstü/iş.tipi')
```

And you can use [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API to empty the recent documents list:

```javascript
const {app} = require('electron')
app.clearRecentDocuments()
```

### Windows notları

Bu özelliği Windows'ta kullanabilmek için uygulamanızın belgenin dosya türünü bir işleyici olarak kaydetmesi gerekir, aksi halde dosya ekledikten sonra bile Görev listesi'nde görünmeyecektir. You can find everything on registering your application in [Application Registration](https://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx).

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
  {label: 'Yeni Pencere', click () { console.log('Yeni Pencere') }},
  {label: 'Ayarlar ile Yeni Pencere',
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
> Görev listesinin statik olması şiddetle önerilir. Bu durumun veya uygulamanın durumunun ne olursa olsun aynı kalması gerekmektedir. Görev listesini dinamik olarak değiştirebilirsiniz, ancak bazı kullanıcıların beklenmedik görev listesi değişiklikleriyle karıştırılabileceğini düşünmelisiniz.

**Internet Explorer'ın görevi:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

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

Windows'ta bir görev çubuğunda belirtilen butonlarla küçük resim araç çubuğu ekleyebilirsiniz bir uygulama penceresinin düzeni. Kullanıcılara, pencereyi geri yüklemeden veya etkinleştirmeden belirli bir pencerenin komutuna erişmenin yolunu sağlar.

MSDN'den örneklendirilmiştir:

> Bu araç sadece tanıdık Standart araç ortak kontrolüdür. En fazla yedi buton vardır. Her düğmenin kimliği, görüntüsü, araç ipucu ve durumu, görev çubuğuna konulan bir yapı içinde tanımlanır. Uygulama, mevcut durum gereği küçük resimleri araç çubuğunda gösterebilir, etkinleştirebilir, devre dışı bırakabilir veya gizleyebilir.
> 
> Örneğin, Windows Media Player, play, pause, mute ve stop gibi standart ortam taşıma denetimleri sunabilir.

**Windows Media Player'ın küçük resim araç çubuğu:**

![oynatıcı](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) to set thumbnail toolbar in your application:

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

Küçük resim araç çubuğu düğmelerini temizlemek için boş bir diziyle `BrowserWindow.setThumbarButtons` öğesini çağırmanız yeterlidir:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setThumbarButtons([])
```

## Unity İstemci Kısayolları (Linux)

Unity'de, `.desktop` dosyasını değiştirerek, başlatıcısına özel girişler ekleyebilirsiniz, bkz. [Bir Başlatıcıya Kısayol Ekleme](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher).

**Audacious'un başlatıcı kısayolları:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## Görev çubuğunda ilerleme çubuğu (Windows, macOS, Unity)

Windows'ta bir görev çubuğu düğmesi bir ilerleme çubuğu görüntülemede kullanılabilir. Bu, bir pencere için kendiliğinden geçiş yapmak zorunda kalmadan kullanıcıya ilerleme bilgileri sağlar.

MacOS üzerinde ilerleme çubuğu dock simgesinin bir parçası olarak görüntülenir.

Unity DE aynı zamanda başlatıcıda ki ilerleme çubuğunu belirlemenizi sağlayan benzer bir özelliğe sahiptir.

**ilerleme çubuğu düğmesindeki görev çubuğu düğmesi:**

![Görev çubuğu ilerleme çubuğu](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

Bir pencerenin ilerleme çubuğunu ayarlamak için [BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) kullanablirsiniz:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## Görev çubuğundaki yer paylaşım simgesi (windows)

Windows'ta bir görev çubuğu düğmesi, MSDN'den aktarıldığı gibi uygulama durumunu görüntülemek için küçük bir yer paylaşımında kullanılabilir:

> Simge ve yer paylaşımları durumu bağlamsal bir bildirim olarak hizmet ve kullanıcıya bu bilgileri iletişim kurmak için ayrı bir bildirim durumu simgesi gereksinimini ortadan kaldırmak için tasarlanmıştır. Örneğin, bildirim alanında gösterilen Microsoft Outlook'ta yeni posta durumu artık görev çubuğu düğmesindeki bir kaplama ile gösterilebilir. Tekrardan, hangi metodun uygulamanız iyi olduğuna geliştirme döneminde karar vermeniz gerekmektedir. Yer paylaşımı simgeleri, ağ durumu, mesajlaşma durumu veya yeni posta gibi önemli, uzun süreli durum veya bildirimleri sağlamak için tasarlanmıştır. Kullanıcı sürekli değişen yer paylaşımları veya animasyonlar ile ortaya konmamalıdır.

**Arayüzü görev çubuğuna al:**

![Arayüzü görev çubuğuna al](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Overlay için açıklama')
```

## Flash çerçeve (Windows)

Windows'ta, kullanıcının dikkatini çekmek amaçlı görev çubuğu düğmesini vurgulayabilirsiniz. Bu, macOS'taki yuvanın hareketliliğine benzer. MSDN başvuru belgelerinden:

> Genellikle, kullanıcıya pencerenin dikkat gerektirdiğini ancak şu anda klavye odağına sahip olmadığını kullanıcıya belirten bir pencere görünür.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Flash'ı devre dışı bırakmak için `false` ile `flashFrame` metodunu çağırmayı unutmayın. Yukarıdaki örnekte, pencere odak noktasına geldiğinde çağrılır, ancak pencreyi devre dışı bırakmak için bir zaman aşımı veya başka bir olay kullanmanız mümkündür.

## Pencerenin temsili dosyası (macOS)

MacOS'taki bir pencere temsil edilen dosyasını ayarlayabilir, böylelikle dosyanın simgesi başlık çubuğunda gösterilebilir ve kullanıcılar Komut Tuşu'na veya Kontrol Tuşu'na tıkladığında açılır.

Bir pencerenin düzenlenmiş durumunu ayarlayabilirsiniz, böylece dosya simgesi bu penceredeki belgenin değiştirilmiş olup olmadığını gösterebilir.

**Temsil dosya açılan menüsü:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) and [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) APIs:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

## Dosyaları pencereden dışarı sürükleme

Dosyalar üzerinde işlem yapan bazı türdeki uygulamalar için, dosyaları Electron'dan diğer uygulamalara taşıyabilmek önemlidir. Bu özelliği uygulamanıza uygulamak için `webContents.startDrag (öğe)` API'sini `ondragstart` etkinliğinde aramanız gerekir.

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
    icon: '/ikon/yolu.png'
  })
})
```