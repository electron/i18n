# putulin ng maikli ang global

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
* `callback` na Function

Nag-rehistro ng global shortcut ng `aselerador`. Ang `baliktawag` ay tatawagan kung ang narehistrong shortcut ay pinindot ng tagagamit.

Kung ang aselerador ay nakuha na ng ibang apikasyon, ang tawag na ito ay tahimik na babagsak. Ang gawi na ito nilalayon sa pamamagitan ng sistemang operasyon, dahil hindi nila gusto na ang mga aplikasyon ay maglaban para sa global shortcuts.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.Rehistrado(aselerador)`

* `aselerador` [Aselerador](accelerator.md) 

Returns `Boolean` - Whether this application has registered `accelerator`.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### `globalShortcut.hindirehistrado(aselerador)`

* `aselerador` [Aselerador](accelerator.md) 

Unregisters the global shortcut of `accelerator`.

### `globalShortcut.hindirehistradoLahat()`

Unregisters all of the global shortcuts.