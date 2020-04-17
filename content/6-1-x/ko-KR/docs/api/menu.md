## Menu 클래스

> 네이티브 애플리케이션 메뉴와 컨텍스트 메뉴를 생성합니다.

프로세스: [Main](../glossary.md#main-process)

### `new Menu()`

새로운 메뉴를 생성합니다.

### 정적 메서드

`menu` 클라스는 다음의 클래스(static) 메서드들을 가집니다.

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu 혹은 null

Sets `menu` as the application menu on macOS. On Windows and Linux, the `menu` will be set as each window's top menu.

Also on Windows and Linux, you can use a `&` in the top-level item name to indicate which letter should get a generated accelerator. For example, using `&File` for the file menu would result in a generated `Alt-F` accelerator that opens the associated menu. The indicated character in the button label gets an underline. The `&` character is not displayed on the button label.

Passing `null` will suppress the default menu. On Windows and Linux, this has the additional effect of removing the menu bar from the window.

**Note:** The default menu will be created automatically if the app does not set one. It contains standard items such as `File`, `Edit`, `View`, `Window` and `Help`.

#### `Menu.getApplicationMenu()`

`Menu 혹은 null`을 반환합니다. 애플리케이션 메뉴가 설정되어있다면 애플리케이션 메뉴를, 설정되어있지 않으면 `null`을 반환합니다.

**주석:** 반환된 `Menu` 인스턴스는 동적으로 메뉴 아이템을 추가하거나 삭제하는 것을 지원하지 않습니다. [인스턴스 프로퍼티](#instance-properties)는 동적으로 수정할 수 있습니다.

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` String

`action`을 어플리케이션의 첫번째 리스폰더(responder) 로 송신합니다. macOS 메뉴의 기본 동작을 에뮬레이트하기 위해 사용됩니다. 일반적으로는 [`MenuItem`](menu-item.md)의 [`role`](menu-item.md#roles)프로퍼티를 사용합니다.

macOS의 네이티브 액션에 대한 더 많은 정보는 [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)에서 볼 수 있습니다.

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

`Menu`를 반환합니다.

Generally, the `template` is an array of `options` for constructing a [MenuItem](menu-item.md). The usage can be referenced above.

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### 인스턴스 메서드

`menu` 오브젝트는 다음과 같은 인스턴스 메소드를 가지고 있습니다:

#### `menu.popup(options)`

* `options` Object (optional)
  * `window` [BrowserWindow](browser-window.md) (선택) - 기본 값은 포커스된 윈도우입니다.
  * `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
  * `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
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

`new Menu`로 생성되거나 `Menu.buildFromTemplate`의 결과로 반환된 객체들은 다음과 같은 이벤트들을 발생시킵니다

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

`Menu` 클래스는 메인 프로세스에서만 사용 가능하지만, [`remote`](remote.md) 모듈을 통해 렌더 프로세스에서도 사용할 수 있습니다.

### 메인 프로세스

간단한 템플릿 API를 사용하여, 메인 프로세스에서 어플리케이션 메뉴를 작성하는 예제:

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

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### 표준 메뉴

MacOS에는 [`Services`](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) 혹은 `Windows` 와 같은, 시스템에서 정의된 표준 메뉴들이 있습니다. 당신이 만든 메뉴가 일반적인 메뉴처럼 보이게 하기 위해서는, 메뉴의 `role`을 다음의 가이드 중 하나로 설정해야합니다. Electron은 설정을 인식하여, 표준 메뉴로 만들게 됩니다.

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

* `before` - 이 아이템을 특정한 라벨과 함께, 지정한 아이템의 앞에 삽입합니다. 지정한 아이템이 존재하지 않을 경우, 아이템은 메뉴의 마지막에 추가됩니다. 이는 지정한 메뉴 아이템과 같은 "그룹"에 위치되어야 한다는 것을 의미합니다.
* `after` - 이 아이템을 특정한 라벨과 함께, 지정한 아이템의 뒤에 삽입합니다. 지정한 아이템이 존재하지 않을 경우, 아이템은 메뉴의 마지막에 추가됩니다. 이는 지정한 메뉴 아이템과 같은 "그룹"에 위치되어야 한다는 것을 의미합니다.
* `beforeGroupContaining` - 지정된 라벨의 아이템이 속한 그룹의 앞에, 그룹의 위치가 싱글 컨텍스트 메뉴로 선언된다는 의미를 제공합니다.
* `afterGroupContaining` - 지정된 라벨의 아이템이 속한 그룹의 뒤에, 그룹의 위치가 싱글 컨텍스트 메뉴로 선언된다는 의미를 제공합니다.

기본적으로 위치 지정 키워드가 하나도 사용되지 않았을 경우, 템플릿에 저장되어있는 순서대로 삽입됩니다.

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
- 1
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
- 3
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
- ---
- 3
- 2
- 1
```
