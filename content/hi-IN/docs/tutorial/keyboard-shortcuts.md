# कीबोर्ड शोर्टकट्स

> स्थानीय और वैश्विक कीबोर्ड शॉर्टकट्स कॉन्फ़िगर करें

## स्थानीय शॉर्टकट्स

आप [मेन्यु](../api/menu.md) मोड्यूल का इस्तेमाल कर कीबोर्ड शोर्टकट्स को कॉन्फ़िगर कर सकते हैं जो तभी शुरू होंगी जब एप्प केन्द्रित होगी | ऐसा करने के लिए, एक [`accelerator`] प्रॉपर्टी निर्दिष्ट करें जब आप एक [MenuItem](../api/menu-item.md) का निर्माण कर रहे हों |

```js
const {Menu, MenuItem} = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

उपयोगकर्ता के ऑपरेटिंग सिस्टम के आधार पर विभिन्न कुंजी संयोजनों को कॉन्फ़िगर करना बेहद आसान है |

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## वैश्विक शोर्टकट्स

You can use the [globalShortcut](../api/global-shortcut.md) module to detect keyboard events even when the application does not have keyboard focus.

```js
const {app, globalShortcut} = require('electron')

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })
})
```

## Shortcuts within a BrowserWindow

If you want to handle keyboard shortcuts for a [BrowserWindow](../api/browser-window.md), you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

```js
window.addEventListener('keyup', doSomething, true)
```

Note the third parameter `true` which means the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

The [`before-input-event`](../api/web-contents.md#event-before-input-event) event is emitted before dispatching `keydown` and `keyup` events in the page. It can be used to catch and handle custom shortcuts that are not visible in the menu.

If you don't want to do manual shortcut parsing there are libraries that do advanced key detection such as [mousetrap](https://github.com/ccampbell/mousetrap).

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