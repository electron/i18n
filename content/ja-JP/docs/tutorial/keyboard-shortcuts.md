# キーボード ショート カット

> ローカルおよびグローバルなキーボードショートカットを設定します。

## ローカルショートカット

[Menu](../api/menu.md)モジュールを使用して、アプリケーションにフォーカスがあるときにのみ起動されるキーボードショートカットを設定できます。 これを行うには、[MenuItem](../api/menu-item.md)を作成するときは、[`accelerator`] プロパティを使用します。

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

## グローバル ショートカット

アプリケーションからキーボードのフォーカスが外れている場合でも、 [globalShortcut](../api/global-shortcut.md) モジュールを使用すればキーボード操作を検出できます。

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## BrowserWindow 内のショートカット

[BrowserWindow](../api/browser-window.md)のキーボードショートカットを処理する場合は、レンダラープロセス内のウィンドウオブジェクトで`keyup`および`keydown`イベントリスナーを使用できます。

```js
window.addEventListener('keyup', doSomething, true)
```

3番目のパラメータ`true`に注意してください。これは、リスナーが他のリスナーの前に常にキー押下を受け取り、`stopPropagation()`を呼び出すことができないことを意味します。

[`before-input-event`](../api/web-contents.md#event-before-input-event)イベントは`keydown`イベントと`keyup`イベントをディスパッチする前に出力されます。 メニューに表示されないカスタムショートカットをキャッチして処理するため使用することができます。

実行したくない場合は[mousetrap](https://github.com/ccampbell/mousetrap)などキーを検出高度なマニュアル ショートカット解析を行うライブラリがあります。

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console.log('show shortcuts!') })
Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')

// コンビネーション（複数キーの組み合わせ）
Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })

// 複数のコンビネーションを1つのコールバックに割り当てる
Mousetrap.bind(['command+k', 'ctrl+k'], () => {
  console.log('command k or control k')

  // return false to prevent default behavior and stop event from bubbling
  return false
})

// Gmailスタイルのシーケンス
Mousetrap.bind('g i', () => { console.log('go to inbox') })
Mousetrap.bind('* a', () => { console.log('select all') })

// コナミコマンド
 
Context | Request Context

Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
 
Context | Request Context

```