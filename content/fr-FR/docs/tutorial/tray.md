---
title: Tray
description: Ce guide vous guidera tout au long du processus de création
0: une icône de la barre d’état avec son propre menu contextuel dans la zone de notification du système.
slug: tray
hide_title: true
---

# Tray

## Vue d'ensemble

<!-- ✍ Update this section if you want to provide more details -->

Ce guide vous guidera tout au long du processus de création d’une icône de la barre d’état [](https://www.electronjs.org/docs/api/tray)avec son propre menu contextuel dans la zone de notification du système.

Sur MacOS et Ubuntu, la zone de notification sera située dans le coin supérieur droit de l'écran, à coté des icônes batterie et wifi. Sous Windows, la barre d'états se trouve généralement dans le coin inférieur droit.

## Exemple

### main.js

First we must import `app`, `Tray`, `Menu`, `nativeImage` from `electron`.

```js
const { app, Tray, Menu, nativeImage } = require('electron')
```

Next we will create our Tray. To do this, we will use a [`NativeImage`](https://www.electronjs.org/docs/api/native-image) icon, which can be created through any one of these [methods](https://www.electronjs.org/docs/api/native-image#methods). Note that we wrap our Tray creation code within an [`app.whenReady`](https://www.electronjs.org/docs/api/app#appwhenready) as we will need to wait for our electron app to finish initializing.

```js title='main.js'
let tray

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('path/to/asset.png')
  tray = new Tray(icon)

  // note: your contextMenu, Tooltip and Title code will go here!
})
```

Great! Now we can start attaching a context menu to our Tray, like so:

```js
const contextMenu = Menu.buildFromTemplate([
  { label: 'Item1', type: 'radio' },
  { label: 'Item2', type: 'radio' },
  { label: 'Item3', type: 'radio', checked: true },
  { label: 'Item4', type: 'radio' }
])

tray.setContextMenu(contextMenu)
```

Le code ci-dessus créera 4 éléments distincts de type radio dans le menu contextuel. Pour en savoir plus sur la création de menus natifs, cliquez sur ce lien [ici](https://www.electronjs.org/docs/api/menu#menubuildfromtemplatetemplate).

Enfin, donnons à notre barre d’états une infobulle et un titre.

```js
tray.setToolTip('This is my application')
tray.setTitle('This is my title')
```

## Conclusion

After you start your electron app, you should see the Tray residing in either the top or bottom right of your screen, depending on your operating system.
`fiddle docs/fiddles/native-ui/tray`
