# 鍵盤快速鍵

> 設定局域及全域鍵盤快速鍵

## 局域快速鍵

你可以使用 [Menu](../api/menu.md) 模組來設定鍵盤快速鍵，這些快速鍵只有在你的應用程式被 focus 到時才會觸發。 要這麼做，請在建立 [MenuItem](../api/menu-item.md) 時指定 [`accelerator`] 屬性。

```js
const {Menu, MenuItem} = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: '列印',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('是時候印點東西了') }
}))
```

You can configure different key combinations based on the user's operating system.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## 全域快速鍵

你可以使用 [globalShortcut](../api/global-shortcut.md) 模組來偵測鍵盤事件，就算目 focus 並不在你的應用程式中也能作用。

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('按了 CommandOrControl+X')
  })
})
```

## BrowserWindow 內的快速鍵

如果你想要處理 [BrowserWindow](../api/browser-window.md) 裡的鍵盤快速鍵，可以在畫面轉譯處理序中的 windows 物件上監聽 `keyup` 及 `keydown` 事件。

```js
window.addEventListener('keyup', doSomething, true)
```

注意，第三個參數 `true` 代表這個監聽器會比其他監聽器先收到按鍵事件，因此別人不能先呼叫 `stopPropagation()`。

網頁中的 `keydown` 及 `keyup` 事件觸發前，會先送出 [`before-input-event`](../api/web-contents.md#event-before-input-event) 事件。 可用來攔截、處理沒出現在選單上的自訂快捷鍵。

如果你不想要自己解析快速鍵，已經有程式庫能做進階按鍵偵測，例如 [mousetrap](https://github.com/ccampbell/mousetrap)。

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('顥示快速鍵!') })
Mousetrap.bind('esc', () => { console.log('離開') }, 'keyup')

// 組合鍵
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// 將不同的組合鍵對應到同一個 callback
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // 回傳 false 防止預設行為被觸發，並避免事件向外傳遞
  return false
})

// gmail 風格的按鍵組合
Mousetrap.bind('g i', () => { console.log('回收件匣') })
Mousetrap.bind('* a', () => { console.log('全選') })

// konami 秘技!
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami 秘技')
})
```