# Keyboard Shortcuts

> تكوين اختصارات لوحة المفاتيح المحلية والعالمية

## اختصارات محلية

You can use the [Menu][] module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

يمكنك تكوين مجموعات مفاتيح مختلفة استناداً إلى نظام تشغيل المستخدم.

```js
{
  معجل: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## الاختصارات العامة

You can use the [globalShortcut][] module to detect keyboard events even when the application does not have keyboard focus.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('commandOrControl+X', () => {
    console.log('commandOrControl+X مضغوط')
  })
})
```

## الإختصارات صمن الـBrowserWindow

If you want to handle keyboard shortcuts for a [BrowserWindow][], you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

لاحظ المعلمة الثالثة `true` مما يعني أن المستمع سيستقبل دوما ضغوطات المفاتيح قبل المستمعين الآخرين بحيث لا يمكنهم `إيقاف النشر ()` الاتصال بهم.

حدث [`قبل إدخال`](../api/web-contents.md#event-before-input-event) الحدث ينبعث قبل إرسال `مفاتيح` و `مفاتيح` أحداث في الصفحة. يمكن استخدام لالتقاط ومعالجة الاختصارات المخصصة غير المرئية في القائمة.

If you don't want to do manual shortcut parsing there are libraries that do advanced key detection such as [mousetrap][].

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
Mousetrap.bind('صعودا لأسفل اليسار إلى اليسار اليسرى ب إدخال', () => {
  console.log('konami code')
})
```

[Menu]: ../api/menu.md
[MenuItem]: ../api/menu-item.md
[globalShortcut]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[BrowserWindow]: ../api/browser-window.md
[mousetrap]: https://github.com/ccampbell/mousetrap
