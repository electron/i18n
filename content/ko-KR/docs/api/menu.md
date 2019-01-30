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

`action`을 어플리케이션의 첫번째 리스폰더(responder) 로 송신합니다. macOS 메뉴의 기본 동작을 에뮬레이트하기 위해 사용됩니다. 일반적으로는 [`MenuItem`](menu-item.md)의 [`role`](menu-item.md#roles)프로퍼티를 사용합니다.

macOS의 네이티브 액션에 대한 더 많은 정보는 [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)에서 볼 수 있습니다.

#### `Menu.buildFromTemplate(template)`

* `template` MenuItemConstructorOptions[]

`Menu`를 반환합니다.

일반적으로, `template`은 [MenuItem](menu-item.md)을 구축하기 위한 `options`의 배열입니다. 사용법은 위의 내용을 참고해주세요.

`template`의 요소에 다른 필드를 추가하는 것도 가능하며, 추가된 구축된 메뉴 아이템의 프로퍼티가 됩니다.

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

`new Menu`로 작성된 오브젝트에서는 다음의 이벤트가 발생합니다.

**참고:** 몇몇 이벤트는 표기된 특정 운영체제에서만 사용할 수 있습니다.

#### 이벤트: 'menu-will-show'

반환:

* `event` Event

`menu.popup()`이 호출될 때 발생합니다.

#### 이벤트: 'menu-will-close'

반환:

* `event` Event

팝업창을 닫거나, `menu.closePopup()`을 호출했을 때 발생합니다.

### Instance Properties (인스턴스 속성)

`menu` 오브젝트는 다음과 같은 속성(property) 도 갖습니다:

#### `menu.items`

menu의 항목을 저장하고 있는 `MenuItem[]` 배열.

각각의 `Menu`는 여러개의 [`MenuItem`](menu-item.md)을 가지며, `MenuItem`은 서브메뉴를 가질 수 있습니다.

### 인스턴스 이벤트

`new Menu`로 작성된 오브젝트 혹은 `Menu.buildFromTemplate`이 반환한 오브젝트는 다음의 이벤트를 발생시킵니다:

## 예시

`Menu` 클래스는 메인 프로세스에서만 사용 가능하지만, [`remote`](remote.md) 모듈을 통해 렌더 프로세스에서도 사용할 수 있습니다.

### 메인 프로세스

간단한 템플릿 API를 사용하여, 메인 프로세스에서 어플리케이션 메뉴를 작성하는 예제:

```javascript
const { app, Menu } = require('electron')

const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'pasteandmatchstyle' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
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
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
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
  })

  // Edit menu
  template[1].submenu.push(
    { type: 'separator' },
    {
      label: 'Speech',
      submenu: [
        { role: 'startspeaking' },
        { role: 'stopspeaking' }
      ]
    }
  )

  // Window menu
  template[3].submenu = [
    { role: 'close' },
    { role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'front' }
  ]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
 
Text
XPath: /pre/code
```

### 렌더 프로세스

아래는 [`remote`](remote.md) 모듈을 사용하여 웹 페이지(렌더 프로세스) 에서 동적으로 메뉴를 작성하는 예제입니다. 이 메뉴는 사용자가 페이지를 우클릭했을 때 보여집니다.

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

macOS는 Window나 Linux와는 완전히 다른 어플리케이션 메뉴 스타일을 가지고 있습니다. 여기서는 여러분이 만든 앱의 메뉴가, 보다 네이티브처럼 보이게 하기 위한 주의사항을 다루고 있습니다.

### 표준 메뉴

macOS에는 `Services`와 `Windows` 메뉴처럼, 다양한 시스템 정의 표준 메뉴(system-defined standard menus) 가 존재합니다. 당신이 만든 메뉴가 일반적인 메뉴처럼 보이게 하기 위해서는, 메뉴의 `role`을 다음의 가이드 중 하나로 설정해야합니다. Electron은 설정을 인식하여, 표준 메뉴로 만들게 됩니다.

* `window`
* `help`
* `services`

### 표준 메뉴 아이템의 액션

macOS는 `About xxx`, `Hide xxx`, `Hide Others`와 같은 몇 가지 메뉴 아이템에 대한 표준 액션을 제공하고 있습니다. 메뉴 아이템의 동작을 표준 동작으로 설정하기 위해서는, 메뉴 아이템의 `role` 속성(attribute) 을 설정해야합니다.

### 메인 메뉴의 이름

macOS에서 어플리케이션 메뉴의 첫번째 아이템의 레이블은 당신이 설정한 레이블과 관계 없이 항상 앱 이름으로 설정됩니다. 첫번째 아이템의 레이블을 변경하기 위해서는, 앱 번들의 `Info.plist` 파일을 수정해야 합니다. 더 자세한 정보는 [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html)를 참조하세요.

## 특정 브라우저 윈도우를 위한 설정 메뉴 (*Linux* *Windows*)

브라우저 윈도우의 [`setMenu` 메서드](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows)는 특정 브라우저 윈도우의 메뉴를 설정할 수 있습니다.

## 메뉴 아이템의 위치

`Menu.buildFromTemplate`을 사용하여 메뉴를 작성할 때 아이템을 위치를 배치하기 위해, `before`, `after`, `beforeGroupContaining`, `afterGroupContaining`, `id`를 사용할 수 있습니다.

* `before` - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `after` - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
* `beforeGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
* `afterGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.

### 예시

템플릿:

```javascript
[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
```

메뉴

```sh
<br />- 1
- 2
- 3
- 4
```

템플릿:

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

메뉴

```sh
<br />- 3
- 4
- ---
- 1
- ---
- 2
```

템플릿:

```javascript
[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
```

메뉴

```sh
<br />- ---
- 3
- 2
- 1
```