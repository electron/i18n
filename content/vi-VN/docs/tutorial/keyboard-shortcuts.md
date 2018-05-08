# Các phím tắt

> Cấu hình phím tắt tại thư mục và toàn hệ thống

## Các phím tắt tại local

Bạn có thể sử dụng module [Menu](../api/menu.md) để cài đặt các phím tắt, điều đó sẽ kích hoạt các phím tắt khi cửa sổ của app được focus vào. Để làm điều này, chỉ cần cài thêm vô một [`accelerator`] khi tạo [MenuItem](../api/menu-item.md).

```js
const {Menu, MenuItem} = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

You can configure different key combinations based on the user's operating system.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## Các phím tắt Global

Bạn có thể sử dụng module [globalShortcut](../api/global-shortcut.md) để xác định các sự kiện trên bàn phím khi mà app không được focus.

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Các phím tắt trong một BrowserWindow

Nếu bạn muốn bắt các phím tắt cho một [BrowserWindow](../api/browser-window.md), bạn có thể sử dụng sự kiện `keyup` và `keydown` để theo dõi cửa sổ đó từ bên trong quá trình renderer.

```js
window.addEventListener('keyup', doSomething, true)
```

Lưu ý, biến số thứ ba `true` có nghĩa là listener sẽ luôn nhận được giá trị của nút đã nhấn trước khi các listener khác `stopPropagation()` nó.

Sự kiện [`before-input-event`](../api/web-contents.md#event-before-input-event) diễn ra trước khi các sự kiện `keydown` và `keyup` trên trang. Nó có thể được sử dụng để nắm bắt và xử lý các tùy chỉnh phím tắt không được hiển thị trong trình đơn.

Nếu bạn không muốn làm ra một hướng dẫn sử dụng phím tắt mà không có sẳn trong thư viện thì bạn phải làm các phát hiện sự kiện chủ chốt như một [bẫy chuột](https://github.com/ccampbell/mousetrap).

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