# 키보드 단축키

> 로컬 및 전역 키보드 단축키 설정

## 로컬 단축키

애플리케이션이 포커스 되어 있을 때만 사용되는 키보드 단축키를 설정하려면 [Menu][] 모듈을 사용해야 합니다. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

아래와 같은 방법을 사용하여 유저의 운영체제에 따라 단축키를 다르게 등록할 수 있습니다.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## 전역 단축키

애플리케이션이 키보드 포커스를 갖지 않을 때에도 키보드 이벤트를 감지하는 [globalShortcut][] 모듈을 사용할 수 있습니다.

```js
const { app, globalShortcut } = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## BrowserWindow 간의 단축키

만약 [BrowserWindow][]에 사용될 키보드 단축키를 다루길 원한다면, 렌더러 프로세스 안에 있는 윈도우 오브젝트 상에 `keyup`과 `keydown` 이벤트 리스너를 사용해야 합니다.

```js
window.addEventListener('keyup', doSomething, true)
```

세번째 파라미터 `true`에 유의하세요. 이는 다른 리스너가 키 입력을 수신하기 전에 해당 리스너가 항상 수신하겠다는 의미입니다. 그러므로 다른 리스너는 `stopPropagation()`을 호출할 수 없습니다.

[`before-input-event`](../api/web-contents.md#event-before-input-event) 이벤트는 페이지 안에서 `keydown`과 `keyup` 이벤트를 전달하기 전에 실행됩니다. 이는 메뉴 안에서 보이지 않는 사용자 정의 단축키를 캐치하여 처리할 것입니다.

만약 수동으로 단축키 파싱 하는 것을 원하지 않는다면 [mousetrap][]과 같은 진보된 키 감지 라이브러리들이 존재합니다.

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// combinations
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// map multiple combinations to the same callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // return false to prevent default behavior and stop event from bubbling
  return false
})

// gmail style sequences
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// konami code!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
