## Menu 클래스

> 네이티브 애플리케이션 메뉴와 컨텍스트 메뉴를 생성합니다.

프로세스:[Main](../glossary.md#main-process)

### `new Menu()`

새로운 메뉴를 생성합니다.

### 정적 메서드

`menu` 클라스는 다음의 클래스(static) 메서드들을 가집니다.

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu 혹은 null

`menu`를 macOS의 애플리케이션 메뉴로 설정합니다. 윈도우와 리눅스에서는, `menu`를 각 창의 상단 메뉴로 설정 합니다.

인자로 `null` 을 주면 윈도우와 리눅스에서는 메뉴 모음에서 메뉴를 제거 합니다. 하지만 맥 OS 에서는 제거하지 않습니다.

**참고:**이 API는 `app` 모듈의 `ready`이벤트 이후에 호출 할 수 있습니다.

#### `Menu.getApplicationMenu()`

`Menu 혹은 null`을 반환합니다. 애플리케이션 메뉴가 설정되어있다면 애플리케이션 메뉴를, 설정되어있지 않으면 `null`을 반환합니다.

**주석:** 반환된 `Menu` 인스턴스는 동적으로 메뉴 아이템을 추가하거나 삭제하는 것을 지원하지 않습니다. [인스턴스 프로퍼티](#instance-properties)는 동적으로 수정할 수 있습니다.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

Sends the `action` to the first responder of application. This is used for emulating default macOS menu behaviors. Usually you would just use the [`role`](menu-item.md#roles) property of a [`MenuItem`](menu-item.md).

See the [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) for more information on macOS' native actions.

#### `Menu.buildFromTemplate(template)`

* `template` MenuItemConstructorOptions[]

`Menu`를 반환합니다.

Generally, the `template` is just an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### 인스턴스 메서드

`menu` 오브젝트는 다음과 같은 인스턴스 메소드를 가지고 있습니다:

#### `menu.popup(options)`

* `options` Object 
  * `window` [BrowserWindow](browser-window.md) (선택) - 기본 값은 포커스된 윈도우입니다.
  * `x` Number (선택) - 기본 값은 현재 마우스 커서의 위치입니다. `y`가 정의되어있다면 반드시 정의되어야 합니다.
  * `y` Number (선택) - 기본 값은 현재 마우스 커서의 위치입니다. `x`가 정의되어있다면 반드시 정의되어야 합니다.
  * `positioningItem` Number (optional) *macOS* - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
  * `callback` Function (선택) - 메뉴가 닫혔을 때 불립니다.

Pops up this menu as a context menu in the [`BrowserWindow`](browser-window.md).

#### `menu.closePopup([browserWindow])`

* `browserWindow` [BrowserWindow](browser-window.md) (선택) - 기본 값은 포커스된 윈도우 입니다.

`browserWindow`의 컨텍스트 메뉴를 닫습니다.

#### `menu.append(menuItem)`

* `menuItem` [MenuItem](menu-item.md)

메뉴에 `menuItem`을 추가합니다.

#### `menu.getMenuItemById(id)`

* `id` String

특정한 `id`를 가진 `MenuItem`을 반환합니다.

#### `menu.insert(pos, menuItem)`

* `pos` Integer
* `menuItem` [MenuItem](menu-item.md)

메뉴의 `pos`값의 위치에 `menuItem`을 추가합니다.

### 인스턴스 이벤트

Objects created with `new Menu` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### Event: 'menu-will-show'

Returns:

* `event` Event

Emitted when `menu.popup()` is called.

#### Event: 'menu-will-close'

Returns:

* `event` Event

Emitted when a popup is closed either manually or with `menu.closePopup()`.

### Instance Properties (인스턴스 속성)

`menu` objects also have the following properties:

#### `menu.items`

A `MenuItem[]` array containing the menu's items.

Each `Menu` consists of multiple [`MenuItem`](menu-item.md)s and each `MenuItem` can have a submenu.

### 인스턴스 이벤트

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

## 예시

The `Menu` class is only available in the main process, but you can also use it in the render process via the [`remote`](remote.md) module.

### 메인 프로세스

An example of creating the application menu in the main process with the simple template API:

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
        click () { require('electron').shell.openExternal('https://electronjs.org') }
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
```

### 렌더 프로세스

Below is an example of creating a menu dynamically in a web page (render process) by using the [`remote`](remote.md) module, and showing it when the user right clicks the page:

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
  menu.popup({window: remote.getCurrentWindow()})
}, false)
</script>
```

## Notes on macOS Application Menu

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### 표준 메뉴

On macOS there are many system-defined standard menus, like the `Services` and `Windows` menus. To make your menu a standard menu, you should set your menu's `role` to one of the following and Electron will recognize them and make them become standard menus:

* `window`
* `help`
* `services`

### 표준 메뉴 아이템의 액션

macOS는 `About xxx`, `Hide xxx`, `Hide Others`와 같은 몇 가지 메뉴 아이템에 대한 표준 액션을 제공하고 있습니다. To set the action of a menu item to a standard action, you should set the `role` attribute of the menu item.

### 메인 메뉴의 이름

macOS에서 어플리케이션 메뉴의 첫번째 아이템의 레이블은 당신이 설정한 레이블과 관계 없이 항상 앱 이름으로 설정됩니다. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

## 특정 브라우저 윈도우를 위한 설정 메뉴 (*Linux* *Windows*)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

## Menu Item Position

You can make use of `position` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

The `position` attribute of `MenuItem` has the form `[placement]=[id]`, where `placement` is one of `before`, `after`, or `endof` and `id` is the unique ID of an existing item in the menu:

* `before` - Inserts this item before the id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `after` - Inserts this item after id referenced item. If the referenced item doesn't exist the item will be inserted at the end of the menu.
* `endof` - Inserts this item at the end of the logical group containing the id referenced item (groups are created by separator items). If the referenced item doesn't exist, a new separator group is created with the given id and this item is inserted after that separator.

When an item is positioned, all un-positioned items are inserted after it until a new item is positioned. So if you want to position a group of menu items in the same location you only need to specify a position for the first item.

### 예시

템플릿:

```javascript
[
  {label: '4', id: '4'},
  {label: '5', id: '5'},
  {label: '1', id: '1', position: 'before=4'},
  {label: '2', id: '2'},
  {label: '3', id: '3'}
]
```

메뉴

```sh
<br />- 1
- 2
- 3
- 4
- 5
```

템플릿:

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

메뉴

```sh
<br />- ---
- a
- b
- c
- ---
- 1
- 2
- 3
```