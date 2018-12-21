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

### `globalShortcut.Rehistrado(aselerador)`

* `aselerador` [Aselerador](accelerator.md) 

Nagbabalik `Boolean` - Kung ang aplikasyon na ito ay may nakarehistrong `aselerador`.

Kung ang aselerador ay nakuha na ng ibang aplikasyon, ang tawag na ito ay babalik parin bilang `huwad`. Ang gawi na ito ay nilalayon sa pamamagitan ng sistemang operasyon, dahil hindi nila gustong maglaban ang mga aplikasyon para sa global shortcuts.

### `globalShortcut.hindirehistrado(aselerador)`

* `aselerador` [Aselerador](accelerator.md) 

Hindi inirehistro ang global shortcut ng `aselerador`.

### `globalShortcut.hindirehistradoLahat()`

Hindi irehistro lahat ng global shortcuts.