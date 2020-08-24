# globalShortcut

> Tinutuklas ang mga pangyayari sa keyboard kung ang aplikasyon ay walang tumutuon na keyboard.

Proseso:[Pangunahi](../glossary.md#main-process)

Ang `globalShortcut` modyul ay pwedeng irehistro/hindi-irehistro ang global keyboard shortcut na may operating system para maka customize ang operasyon sa iba-ibang shortcut.

**Tandaan:** Ang shortcut ay global: magagamit ito kahit na ang apps ay walang pagtuon ng keyboard. Hindi mo dapat gamitin ang modyul na ito hanggang ang `handa` pangyayari sa app modyul ay napalabas.

```javascript
onst { app, globalShortcut } = kailangan('electron')

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

## Mga Paraan

Ang `globalShortcut` na modyul ay may mga sumusunod na paraan:

### `globalShortcut.rehistro(aselerador, baliktawag)`

* `aselerador` [Aselerador](accelerator.md)
* `baliktawag` ginagawa

Returns `Boolean` - Whether or not the shortcut was registered successfully.

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

Kung ang aselerador ay nakuha na ng ibang apikasyon, ang tawag na ito ay tahimik na babagsak. Ang gawi na ito nilalayon sa pamamagitan ng sistemang operasyon, dahil hindi nila gusto na ang mga aplikasyon ay maglaban para sa global shortcuts.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

* `accelerators` String[] - an array of [Accelerator](accelerator.md)s.
* `callback` na Function

Registers a global shortcut of all `accelerator` items in `accelerators`. The `callback` is called when any of the registered shortcuts are pressed by the user.

When a given accelerator is already taken by other applications, this call will silently fail. Ang gawi na ito nilalayon sa pamamagitan ng sistemang operasyon, dahil hindi nila gusto na ang mga aplikasyon ay maglaban para sa global shortcuts.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.Rehistrado(aselerador)`

* `aselerador` [Aselerador](accelerator.md)

Nagbabalik `Boolean` - Kung ang aplikasyon na ito ay may nakarehistrong `aselerador`.

Kung ang aselerador ay nakuha na ng ibang aplikasyon, ang tawag na ito ay babalik parin bilang `huwad`. Ang gawi na ito ay nilalayon sa pamamagitan ng sistemang operasyon, dahil hindi nila gustong maglaban ang mga aplikasyon para sa global shortcuts.

### `globalShortcut.hindirehistrado(aselerador)`

* `aselerador` [Aselerador](accelerator.md)

Hindi inirehistro ang global shortcut ng `aselerador`.

### `globalShortcut.hindirehistradoLahat()`

Hindi irehistro lahat ng global shortcuts.
