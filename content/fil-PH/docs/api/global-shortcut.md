# globalShortcut

> Tinutuklas ang mga pangyayari sa keyboard kung ang aplikasyon ay walang tumutuon na keyboard.

Ang proseso: [Pangunahin](../glossary.md#main-process)

Ang `globalShortcut` modyul ay pwedeng irehistro/hindi-irehistro ang global keyboard shortcut na may operating system para maka customize ang operasyon sa iba-ibang shortcut.

**Tandaan:** Ang shortcut ay global: magagamit ito kahit na ang apps ay walang pagtuon ng keyboard. Hindi mo dapat gamitin ang modyul na ito hanggang ang `handa` pangyayari sa app modyul ay napalabas.

```javascript
onst {app, globalShortcut} = kailangan('electron')

app.on('ready', () => {
  // Magrehistro ng a 'CommandOrControl+X' shortcut na tagapakinig.


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
  // Hindi irehistro ang shortcut.

  globalShortcut.hindirehistrado('CommandoControl+X')

//Wag irehistro lahat ng shortcuts.

  globalShortcut.wagirehistroLahat()
})
 
```

## Pamamaraan

Ang `globalShortcut` na modyul ay may mga sumusunod na paraan:

### `globalShortcut.rehistro(aselerador, baliktawag)`

* `accelerator` [Accelerator](accelerator.md) 
* `baliktawag` ginagawa

Nag-rehistro ng global shortcut ng `aselerador` Ang `baliktawag` ay tatawagan kung ang narehistrong shortcut ay pinindot ng tagagamit.

Kung ang aselerador ay nakuha na ng ibang apikasyon, ang tawag na ito ay tahimik na babagsak. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md) 

Returns `Boolean` - Whether this application has registered `accelerator`.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md) 

Unregisters the global shortcut of `accelerator`.

### `globalShortcut.unregisterAll()`

Unregisters all of the global shortcuts.