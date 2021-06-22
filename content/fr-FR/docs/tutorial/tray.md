---
title: Tray
description: Ce guide vous guidera tout au long du processus de création d’une icône de la barre d’état avec son propre menu contextuel dans la zone de notification du système.
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

Nous devons d’abord importer `app`, `Tray`, `Menu`, `nativeImage` depuis `electron`.

```js
const { app, Tray, Menu, nativeImage } = require('electron')
```

Ensuite, nous allons créer notre Tray. Pour ce faire, nous utiliserons une icône [`NativeImage`](https://www.electronjs.org/docs/api/native-image) , qui peut être créée via l’une de ces [méthodes](https://www.electronjs.org/docs/api/native-image#methods). Notez que nous encapsulons notre code de création du Tray dans un [`app.whenReady`](https://www.electronjs.org/docs/api/app#appwhenready) car nous devrons attendre que notre application electron termine de s'initialiser.

```js title='main.js'
let tray

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('path/to/asset.png')
  tray = new Tray(icon)

  // note: votre code contextMenu, Tooltip and Title ira ici!
})
```

Génial! Maintenant nous pouvons commencer à attacher un menu contextuel à notre Tray, comme ceci:

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
tray.setToolTip('Ceci est mon application')
tray.setTitle('Ceci est mon titre')
```

## Conclusion

Après avoir démarré votre application electron, vous devriez voir le Tray placé en soit haut soit en bas à droite de votre écran, selon votre système d'exploitation.
`fiddle docs/fiddles/native-ui/tray`
