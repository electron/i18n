## Bölüm: Menü

> Yerel uygulama menüleri ve bağlam menüleri oluşturun.

Süreç: [Ana](../glossary.md#main-process)

### `yeni Menü()`

Yeni bir menü oluşturun.

### Statik Yöntemler

`Menu` sınıfı aşağıdaki statik yöntemlere sahiptir:

#### `Menü.ayarlaUygulamaMenüsü(menü)`

* `menu` Menü

MacOS'ta uygulama `menüsünü` ayarlar. Windows ve Linux'ta `menu`, her pencerenin üst menüsü olarak ayarlanır.

`boş` bırakılması, Windows ve Linux'ta menü çubuğunu kaldırır, ancak macOS üzerinde hiçbir etkisi yoktur.

**Not:** Bu API `app` modülü `ready` olduktan sonra çağrılmalıdır.

#### `Menu.getApplicationMenu()`

`Menu` Döndürülür - Uygulama menüsü, ayarlanmışsa veya `null` ise, ayarlanmamışsa.

**Not:** Döndürülen `Menu` örneği dinamik eklemeyi veya menü öğelerinin kaldırılmasını desteklemez. [Instance properties](#instance-properties) hala kullanılabilir dinamik olarak değiştirilebilir.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` Dizisi

`action` ilk yanıtın sahibine gönderir. Bu, varsayılan macOS menü davranışlarını taklit etmek için kullanılır. Genellikle sadece [`MenuItem`](menu-item.md) [`role`](menu-item.md#roles) özelliğini kullanırsınız.

MacOS'un yerel eylemleri hakkında daha fazla bilgi için macOS [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) bakın.

#### `Menu.buildFromTemplate(şablon)`

* `template` MenüÖğesiOluşturucuSeçenekleri[]

`Menüye` Dön

Genellikle `şablon` yalnızca bir [MenüÖğesi](menu-item.md) oluşturmak için bir dizi `seçenektir`. Kullanım, yukarıdaki referanslar olabilir.

Ayrıca, `şablonun` elementlerine başka alanlar da ekleyebilirsiniz ve bunlar oluşturulan menü öğelerinin özellikleri olacaktır.

### Örnek Yöntemleri

`Menü` nesnesi aşağıdaki örnek yöntemlerine sahiptir:

#### `menu.popup([tarayıcıPenceresi, seçenekler])`

* `tarayıcıPenceresi` TarayıcıPenceresi (isteğe bağlı) - Varsayılan odaklanmış pencere.
* `seçenekler` Hedef (isteğe bağlı) 
  * `x` Sayı (isteğe bağlı) - Varsayılan, geçerli fare imleci konumudur. Eğer `y` bildirilmişse, bildirilmelidir.
  * `y` Sayı (isteğe bağlı) Varsayılan geçerli fare imleci konumudur. Eğer `x` bildirilmişse, bildirilmelidir.
  * `async` Boolean (isteğe bağlı) - Bu yöntemin hemen çağrılmasını sağlamak için `doğru`, menü seçildikten veya kapatıldıktan sonra geri dönmek için `yanlış` olarak ayarlayın. Varsayılan değer `yanlış`.
  * `konumlandırmaÖğesi` Sayı (isteğe bağlı) *macOS* - Belirtilen koordinattaki fare imlecinin altına konumlandırılacak menü öğesinin dizini. Varsayılan değer -1'dir.

Bu menüyü `tarayıcıPenceresi` 'nde bir bağlam menüsü olarak açar.

#### `menü.kapatAçılanpencereyi([browserWindow])`

* `tarayıcıPenceresi` TarayıcıPenceresi (isteğe bağlı) - Varsayılan odaklanmış pencere.

`tarayıcıPenceresi` 'nde bağlam menüsünü kapatır.

#### `menü.ekle(menüÖğesi)`

* `menüÖğesi` MenüÖğesi

Menüye `menüÖğesi` ekler.

#### `menü.ekleme(pos, menüÖğesi)`

* `pos` Tamsayı
* `menüÖğesi` MenüÖğesi

`menüÖğesini` menünün `pos` konumuna yerleştirir.

### Örnek Özellikleri

`menü` nesneleri aşağıdaki özelliklere de sahiptir:

#### `menü.öğeleri`

`menünÖğeleri[]` Menünün Öğelerini içeren bir dizidir.

Her `Menü` birden fazla [`MenüÖğesin`](menu-item.md) den oluşur ve her `MenüÖğesi` bir alt menüye sahip olabilir.

## Örnekler

`Menü` sınıfı yalnızca ana işlemde kullanılabilir, ancak [`uzak`](remote.md) modül vasıtasıyla oluşturma işleminde de kullanabilirsiniz.

### Ana süreç

Ana süreçte uygulama menüsünü basit şablon API'si ile oluşturmak için bir örnek:

```javascript
const {app, Menu} = require('electron')

const template = [
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'pasteandmatchstyle'},
      {role: 'delete'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'forcereload'},
      {role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'services', submenu: []},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })

  // Edit menu
  template[1].submenu.push(
    {type: 'separator'},
    {
      label: 'Speech',
      submenu: [
        {role: 'startspeaking'},
        {role: 'stopspeaking'}
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    {role: 'close'},
    {role: 'minimize'},
    {role: 'zoom'},
    {type: 'separator'},
    {role: 'front'}
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
 
Context | Request Context
```

### İşleme süreci

Aşağıda, [`uzak`](remote.md) modülü kullanarak bir web sayfasında (işleme süreci) dinamik olarak bir menü oluşturmak ve kullanıcı sayfayı sağ tıklattığında oluşturmak için bir örnek görünmektedir:

```html
<!-- index.html -->
<script>
const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)
</script>
```

## MacOS Uygulama Menüleri Hakkında Notlar

macOS, Windows ve Linux'dan tamamen farklı bir uygulama menüsü stiline sahiptir. İşte, uygulamanızın menüsünü daha yerli yapmaya ilişkin bazı notlar.

### Standart Menüler

MacOS'da, `Servisler` ve `Windows` menüleri gibi birçok sistem tanımlı standart menü vardır. Menünüzü standart bir menü yapmak için menünüzün `rolünü` aşağıdakilerden birine ayarlamanız gerekir ve Electron bunları tanır ve onları standart menüler haline getirir:

* `pencere`
* `yardım`
* `hizmetler`

### Standart Menü Öğesi İşlemleri

macOS, `Hakkında xxx`, `Gizle xxx` ve `Diğerlerini Gizle` gibi bazı menü öğeleri için standart eylemler önermiştir. Bir menü öğesinin eylemini standart bir eylem olarak ayarlamak için, menü öğesinin `rol` özniteliğini ayarlamanız gerekir.

### Ana Menünün Adı

On macOS the label of the application menu's first item is always your app's name, no matter what label you set. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

## Setting Menu for Specific Browser Window (*Linux* *Windows*)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

## Menu Item Position

You can make use of `position` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

The `position` attribute of `MenuItem` has the form `[placement]=[id]`, where `placement` is one of `before`, `after`, or `endof` and `id` is the unique ID of an existing item in the menu:

* `before` - Inserts this item before the id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `after` - Inserts this item after id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `endof` - Inserts this item at the end of the logical group containing the id referenced item (groups are created by separator items). If the referenced item doesn't exist, a new separator group is created with the given id and this item is inserted after that separator.

When an item is positioned, all un-positioned items are inserted after it until a new item is positioned. So if you want to position a group of menu items in the same location you only need to specify a position for the first item.

### Örnekler

Template:

```javascript
[
  {label: '4', id: '4'},
  {label: '5', id: '5'},
  {label: '1', id: '1', position: 'before=4'},
  {label: '2', id: '2'},
  {label: '3', id: '3'}
]
```

Menu:

    <br />- 1
    - 2
    - 3
    - 4
    - 5
    

Template:

```javascript
[
  {label: 'a', position: 'endof=letters'},
  {label: '1', position: 'endof=numbers'},
  {label: 'b', position: 'endof=letters'},
  {label: '2', position: 'endof=numbers'},
  {label: 'c', position: 'endof=letters'},
  {label: '3', position: 'endof=numbers'}
]
```

Menu:

    <br />- ---
    - a
    - b
    - c
    - ---
    - 1
    - 2
    - 3