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

Also on Windows and Linux, you can use a `&` in the top-level item name to indicate which letter should get a generated accelerator. For example, using `&File` for the file menu would result in a generated `Alt-F` accelerator that opens the associated menu. The indicated character in the button label gets an underline. The `&` character is not displayed on the button label.

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Note:** The default menu will be created automatically if the app does not set one. It contains standard items such as `File`, `Edit`, `View`, `Window` and `Help`.

#### `Menu.getApplicationMenu()`

`Menu 혹은 null`을 반환합니다. 애플리케이션 메뉴가 설정되어있다면 애플리케이션 메뉴를, 설정되어있지 않으면 `null`을 반환합니다.

**주석:** 반환된 `Menu` 인스턴스는 동적으로 메뉴 아이템을 추가하거나 삭제하는 것을 지원하지 않습니다. [인스턴스 프로퍼티](#instance-properties)는 동적으로 수정할 수 있습니다.

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

`action`을 어플리케이션의 첫번째 리스폰더(responder) 로 송신합니다. macOS 메뉴의 기본 동작을 에뮬레이트하기 위해 사용됩니다. 일반적으로는 [`MenuItem`](menu-item.md)의 [`role`](menu-item.md#roles)프로퍼티를 사용합니다.

macOS의 네이티브 액션에 대한 더 많은 정보는 [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)에서 볼 수 있습니다.

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

`Menu`를 반환합니다.

일반적으로, `template`은 [MenuItem](menu-item.md)을 구축하기 위한 `options`의 배열입니다. 사용법은 위의 내용을 참고해주세요.

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### 인스턴스 메서드

`menu` 오브젝트는 다음과 같은 인스턴스 메소드를 가지고 있습니다:

#### `menu.popup(options)`

* `options` Object (선택) 
  * `window` [BrowserWindow](browser-window.md) (선택) - 기본 값은 포커스된 윈도우입니다.
  * `x` Number (선택) - 기본 값은 현재 마우스 커서의 위치입니다. `y`가 정의되어있다면 반드시 정의되어야 합니다.
  * `y` Number (선택) - 기본 값은 현재 마우스 커서의 위치입니다. `x`가 정의되어있다면 반드시 정의되어야 합니다.
  * `positioningItem` Number (옵션) *macOS* - 마우스 커서의 위치에 배치한 메뉴 아이템의 인덱스. 기본값은 -1입니다.
  * `callback` Function (선택) - 메뉴가 닫혔을 때 불립니다.

이 메뉴는 [`BrowserWindow`](browser-window.md)에서 컨텍스트 메뉴로 팝업됩니다.

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

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

**참고:** 몇몇 이벤트는 표기된 특정 운영체제에서만 사용할 수 있습니다.

#### 이벤트: 'menu-will-show'

Returns:

* `event` Event

`menu.popup()`이 호출될 때 발생합니다.

#### 이벤트: 'menu-will-close'

Returns:

* `event` Event

팝업창을 닫거나, `menu.closePopup()`을 호출했을 때 발생합니다.

### Instance Properties (인스턴스 속성)

`menu` 오브젝트는 다음과 같은 속성(property) 도 갖습니다:

#### `menu.items`

menu의 항목을 저장하고 있는 `MenuItem[]` 배열.

각각의 `Menu`는 여러개의 [`MenuItem`](menu-item.md)을 가지며, `MenuItem`은 서브메뉴를 가질 수 있습니다.

## 예시

The `Menu` class is only available in the main process, but you can also use it in the render process via the [`remote`](remote.md) module.

### Main process

An example of creating the application menu in the main process with the simple template API:

```javascript
const { app, Menu } = require('electron')

const template = [
  // { role: 'appMenu' }
  ...(process.platform === 'darwin' ? [{
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

### Render process

Below is an example of creating a menu dynamically in a web page (render process) by using the [`remote`](remote.md) module, and showing it when the user right clicks the page:

```html
<!-- index.html -->
<script>
const { remote } = require('electron')
const { Menu, MenuItem } = remote

const menu = new Menu()
menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup({ window: remote.getCurrentWindow() })
}, false)
</script>
```

## macOS 어플리케이션 메뉴에 대하여

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### Standard Menus

On macOS there are many system-defined standard menus, like the [`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) and `Windows` menus. To make your menu a standard menu, you should set your menu's `role` to one of the following and Electron will recognize them and make them become standard menus:

* `window`
* `help`
* `services`

### Standard Menu Item Actions

macOS has provided standard actions for some menu items, like `About xxx`, `Hide xxx`, and `Hide Others`. To set the action of a menu item to a standard action, you should set the `role` attribute of the menu item.

### Main Menu's Name

On macOS the label of the application menu's first item is always your app's name, no matter what label you set. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

## 특정 브라우저 윈도우를 위한 설정 메뉴 (*Linux* *Windows*)

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

## 메뉴 아이템의 위치

You can make use of `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

* `before` - 이 아이템을 특정한 라벨과 함께, 지정한 아이템의 앞에 삽입합니다. 지정한 아이템이 존재하지 않을 경우, 아이템은 메뉴의 마지막에 추가됩니다. 이는 지정한 메뉴 아이템과 같은 "그룹"에 위치되어야 한다는 것을 의미합니다.
* `after` - 이 아이템을 특정한 라벨과 함께, 지정한 아이템의 뒤에 삽입합니다. 지정한 아이템이 존재하지 않을 경우, 아이템은 메뉴의 마지막에 추가됩니다. 이는 지정한 메뉴 아이템과 같은 "그룹"에 위치되어야 한다는 것을 의미합니다.
* `beforeGroupContaining` - 지정된 라벨의 아이템이 속한 그룹의 앞에, 그룹의 위치가 싱글 컨텍스트 메뉴로 선언된다는 의미를 제공합니다.
* `afterGroupContaining` - 지정된 라벨의 아이템이 속한 그룹의 뒤에, 그룹의 위치가 싱글 컨텍스트 메뉴로 선언된다는 의미를 제공합니다.

By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.

### 예시

Template:

```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```

Menu:

```sh
<br />- 1
- 2
- 3
- 4
```

Template:

```javascript
[
  { id: '1', label: 'one' },
  { type: 'separator' },
  { id: '3', label: 'three', beforeGroupContaining: ['1'] },
  { id: '4', label: 'four', afterGroupContaining: ['2'] },
  { type: 'separator' },
  { id: '2', label: 'two' }
]
```

Menu:

```sh
<br />- 3
- 4
- ---
- 1
- ---
- 2
```

Template:

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

Menu:

```sh
<br />- ---
- 3
- 2
- 1
```