## MenuItem 클래스

> 네이티브 애플리케이션 메뉴와 컨텍스트 메뉴에 아이템을 추가합니다.

프로세스:[Main](../glossary.md#main-process)

[`Menu`](menu.md)에서 예제를 볼 수 있습니다.

### `new MenuItem(options)`

* `options` Object 
  * `click` Function (optional) - Will be called with `click(menuItem, browserWindow, event)` when the menu item is clicked. 
    * `menuItem` MenuItem
    * `browserWindow` [BrowserWindow](browser-window.md)
    * `event` Event
  * `role` String (optional) - Define the action of the menu item, when specified the `click` property will be ignored. See [roles](#roles).
  * `type` String (optional) - Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `accelerator` [Accelerator](accelerator.md) (optional)
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `enabled` Boolean (optional) - If false, the menu item will be greyed out and unclickable.
  * `visible` Boolean (optional) - If false, the menu item will be entirely hidden.
  * `checked` Boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](menu.md) then it will be automatically converted to one using `Menu.buildFromTemplate`.
  * `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
  * `position` String (optional) - This field allows fine-grained definition of the specific location within a given menu.

### Roles

Roles allow menu items to have predefined behaviors.

It is best to specify `role` for any menu item that matches a standard role, rather than trying to manually implement the behavior in a `click` function. The built-in `role` behavior will give the best native experience.

The `label` and `accelerator` values are optional when using a `role` and will default to appropriate values for each platform.

`role` 속성은 다음의 값을 가질 수 있습니다:

* `undo`
* `redo`
* `cut`
* `copy`
* `paste`
* `pasteAndMatchStyle`
* `selectAll`
* `delete`
* `minimize` - 현재 윈도우를 최소화합니다.
* `close` - 현재 윈도우를 닫습니다.
* `quit`- 애플리케이션을 종료합니다.
* `reload` - 현재 윈도우를 재로드합니다.
* `forceReload` - 캐시를 무시하고 현재 윈도우를 재로드합니다.
* `toggleDevTools` - 현재 윈도우에 개발자 도구를 토글합니다.
* `toggleFullScreen`- 현재 윈도우의 풀스크린 모드를 토글합니다.
* `resetZoom` - 포커스된 페이지의 줌을 기본 사이즈로 리셋합니다.
* `zoomIn` - 포커스된 페이지를 10% 확대합니다.
* `zoomOut` - 포커스된 페이지를 10% 축소합니다.
* `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.).
* `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.).

다음의 부가 role은 *macOS*에서 유효합니다:

* `about` - Map to the `orderFrontStandardAboutPanel` action.
* `hide` - Map to the `hide` action.
* `hideOthers` - Map to the `hideOtherApplications` action.
* `unhide` - Map to the `unhideAllApplications` action.
* `startSpeaking` - Map to the `startSpeaking` action.
* `stopSpeaking` - Map to the `stopSpeaking` action.
* `front` - Map to the `arrangeInFront` action.
* `zoom` - Map to the `performZoom` action.
* `toggleTabBar` - Map to the `toggleTabBar` action.
* `selectNextTab` - Map to the `selectNextTab` action.
* `selectPreviousTab` - Map to the `selectPreviousTab` action.
* `mergeAllWindows` - Map to the `mergeAllWindows` action.
* `moveTabToNewWindow` - Map to the `moveTabToNewWindow` action.
* `window` - The submenu is a "Window" menu.
* `help` - The submenu is a "Help" menu.
* `services` - The submenu is a "Services" menu.
* `recentDocuments` - The submenu is an "Open Recent" menu.
* `clearRecentDocuments` - Map to the `clearRecentDocuments` action.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

### Instance Properties (인스턴스 속성)

다음의 속성은 `MenuItem`의 인스턴스에서 유효합니다:

#### `menuItem.enabled`

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### `menuItem.visible`

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### `menuItem.checked`

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### `menuItem.label`

A `String` representing the menu items visible label.

#### `menuItem.click`

A `Function` that is fired when the MenuItem receives a click event.