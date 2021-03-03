# Raccourcis clavier

> Configurer des raccourcis clavier locaux et globaux

## Raccourcis Locaux

Vous pouvez utiliser le module [Menu][] pour configurer les raccourcis clavier qui se déclencheront uniquement lorsque l’application est au premier plan. To do so, specify an [`accelerator`][] property when creating a [MenuItem][].

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

Vous pouvez configurer différentes combinaisons de touches basées sur le système d’exploitation de l’utilisateur.

```js
{
  accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Maj+I'
}
```

## Raccourcis globaux

Vous pouvez utiliser le module [globalShortcut][] pour détecter les événements de clavier, même lorsque l'application n’a pas le focus clavier.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X est presséd')
  })
})
```

## Raccourcis dans un BrowserWindow

Si vous souhaitez gérer les raccourcis clavier pour un [BrowserWindow][], vous pouvez utiliser les écouteurs d'événements `keyup` et `keydown` sur l'objet window dans le processus de rendu.

```js
window.addEventListener('keyup', doSomething, true)
```

Notez que le troisième paramètre `true` qui signifie que l'écouteur recevra toujours les pressions de touches avant les autres écouteurs d'événement, ainsi ils ne peuvent pas appeler eux-même `stopPropagation()`.

L’événement [`before-input-event`](../api/web-contents.md#event-before-input-event) est émis avant d’envoyer les événements `keydown` et `keyup` dans la page. Il peut être utilisé pour intercepter et gérer des raccourcis personnalisés qui ne sont pas visibles dans le menu.

Si vous ne voulez pas analyser manuellement les raccourcis, il existe des bibliothèque qui font de la détection avancée comme par exemple [mousetrap][].

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
