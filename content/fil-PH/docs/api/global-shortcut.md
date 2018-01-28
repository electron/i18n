# globalShortcut

> Tinutuklas ang mga pangyayari sa keyboard kung ang aplikasyon ay walang tumutuon na keyboard.

Ang proseso: [Pangunahin](../glossary.md#main-process)

Ang `globalShortcut` modyul ay pwedeng irehistro/hindi-irehistro ang global keyboard shortcut na may operating system para maka customize ang operasyon sa iba-ibang shortcut.

**Tandaan:** Ang shortcut ay global: magagamit ito kahit na ang apps ay walang keyboard focus. Hindi mo dapat gamitin ang modyul na ito hanggang ang `handa` pangyayari sa app modyul ay napalabas.

```javascript
onst {app, globalShortcut} = kailangan('electron')

app.on('ready', () => {
  // Magrehistro ng a 'CommandOrControl+X' shortcut tagapakinig.


  const ret = globalShortcut.irehistro('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('bigong pagparehistro')
  }

  //I-tsek kung ang shortcut ay rehistrado.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // Unregister a shortcut.
  globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
```

## Pamamaraan

The `globalShortcut` module has the following methods:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

When the accelerator is already taken by other applications, this call will silently fail. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Returns `Boolean` - Whether this application has registered `accelerator`.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Unregisters the global shortcut of `accelerator`.

### `globalShortcut.unregisterAll()`

Unregisters all of the global shortcuts.