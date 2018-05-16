# 테두리없는 윈도우

> 툴바, 테두리, 다른 그래픽 "크롬" 없는 윈도우를 엽니다.

A frameless window is a window that has no [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome), the parts of the window, like toolbars, that are not a part of the web page. These are options on the [`BrowserWindow`](browser-window.md) class.

## 테두리 없는 창 만들기

테두리 없는 창을 만들기 위해서는 [BrowserWindow](browser-window.md)의 `옵션` 중에서 `frame`을 `false`로 설정 해야 합니다.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({width: 800, height: 600, frame: false})
win.show()

```

### Alternatives on macOS

macOS 10.9 매버릭스 이상에서는 chromeless 윈도우를 지정하는 다른 방법이 있다. Instead of setting `frame` to `false` which disables both the titlebar and window controls, you may want to have the title bar hidden and your content extend to the full window size, yet still preserve the window controls ("traffic lights") for standard window actions. `titleBarStyle` 옵션을 지정하여 이를 할 수 있습니다:

#### `hidden`

타이블바가 숨겨지고 전체크기의 컨텐츠 윈도우가 표시되지만 여전히 타이틀바는 표준 윈도우 컨트롤인 ("신호등")을 왼쪽 상단에 가지게 됩니다.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hidden'})
win.show()

```

#### `hiddenInset`

타이틀바가 숨겨지고 신호등 버튼이 윈도우 가장자리에 약간 더 끼워진 대체 모습으로 표시됩니다.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'hiddenInset'})
win.show()

```

#### `customButtonsOnHover`

Uses custom drawn close, miniaturize, and fullscreen buttons that display when hovering in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. This option is only applicable for frameless windows.

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({titleBarStyle: 'customButtonsOnHover', frame: false})
win.show()

```

## 투명한 윈도우

`transparent`옵션을 `true`로 설정함으로써 테두리없는 윈도우를 투명하게 만들 수 있습니다:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({transparent: true, frame: false})
win.show()

```

### 제한 사항

* You can not click through the transparent area. We are going to introduce an API to set window shape to solve this, see [our issue](https://github.com/electron/electron/issues/1335) for details.
* Transparent windows are not resizable. Setting `resizable` to `true` may make a transparent window stop working on some platforms.
* The `blur` filter only applies to the web page, so there is no way to apply blur effect to the content below the window (i.e. other applications open on the user's system).
* On Windows operating systems, transparent windows will not work when DWM is disabled.
* On Linux users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
* On Mac the native window shadow will not be shown on a transparent window.

## 클릭을 통과하는 윈도우

To create a click-through window, i.e. making the window ignore all mouse events, you can call the [win.setIgnoreMouseEvents(ignore)](browser-window.md#winsetignoremouseeventsignore) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setIgnoreMouseEvents(true)
```

## 드래그 가능한 영역

By default, the frameless window is non-draggable. Apps need to specify `-webkit-app-region: drag` in CSS to tell Electron which regions are draggable (like the OS's standard titlebar), and apps can also use `-webkit-app-region: no-drag` to exclude the non-draggable area from the draggable region. Note that only rectangular shapes are currently supported.

Note: `-webkit-app-region: drag` is known to have problems while the developer tools are open. See this [GitHub issue](https://github.com/electron/electron/issues/3647) for more information including a workaround.

To make the whole window draggable, you can add `-webkit-app-region: drag` as `body`'s style:

```html
<body style="-webkit-app-region: drag">
</body>
```

And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:

```css
button {
  -webkit-app-region: no-drag;
}
```

If you're setting just a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.

## 텍스트 선택

In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:

```css
.titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}
```

## 컨텍스트 메뉴

On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.