# Prévues Breaking Changes API

La liste suivante inclut les API qui seront supprimés en électrons 2.0.

Il n’y a aucun calendrier pour quand cette libération aura lieu mais les avertissements de désapprobation s’ajouteront au moins 90 jours à l’avance.

## `BrowserWindow`

```js
Abondonnée optionsA laisser = {webPreferences : {blinkFeatures: ''}} laisser windowA = nouveau BrowserWindow(optionsA) / / remplacer avec let optionsB = {webPreferences : {enableBlinkFeatures: ''}} laisser windowB = nouveau BrowserWindow(optionsB)
```

## `presse-papier`

```js
Deprecated clipboard.readRtf() / / remplacer par clipboard.readRTF() / / obsolète clipboard.writeRtf() / / remplacer par clipboard.writeRTF() / / obsolète clipboard.readHtml() / / remplacer par clipboard.readHTML() / / obsolète clipboard.writeHtml() / / remplacer par clipboard.writeHTML()
```

## `crashReporter`

```js
Déconseillée crashReporter.start ({companyName : 'Crashly', submitURL : 'https://crash.server.com', autoSubmit : true}) / / remplacer avec crashReporter.start ({companyName : 'Crashly', submitURL : 'https://crash.server.com', uploadToServer : true})
```

## `menu`

```js
Déconseillé de menu.popup (browserWindow, 100, 200, 2) / / remplacer avec menu.popup (browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `nativeImage`

```js
Deprecated nativeImage.toPng() / / remplacer par nativeImage.toPNG() / / obsolète nativeImage.toJpeg() / / remplacer par nativeImage.toJPEG() / / obsolète nativeImage.createFromBuffer (buffer, 1.0) / / remplacer avec nativeImage.createFromBuffer (buffer, {
  scaleFactor: 1.0
})
```

## `processus de`

```js
Déconseillée process.versions [« atome-shell »] / / remplacer par process.versions.electron
```

* `process.versions.electron` et `process.version.chrome` seront propriétés en lecture seule par souci de cohérence avec les autres propriétés de `process.versions` définies par nœud.

## `session`

```js
Obsolète ses.setCertificateVerifyProc (function (nom d’hôte, certificat, rappel) {callback(true)}) / / remplacer avec ses.setCertificateVerifyProc (function (demande, rappel) {callback(0)})
```

## `Barre d’État`

```js
Deprecated tray.setHighlightMode(true) / / remplacer par tray.setHighlightMode('on') / / obsolète tray.setHighlightMode(false) / / remplacer par tray.setHighlightMode('off')
```

## `webContents`

```js
Déconseillée webContents.openDevTools({detach: true}) / / remplacer par webContents.openDevTools({mode: 'detach'})
```

```js
Déconseillé de webContents.setZoomLevelLimits (1, 2) / / remplacer avec webContents.setVisualZoomLevelLimits (1, 2)
```

## `webFrame`

```js
Obsolète webFrame.setZoomLevelLimits (1, 2) / / remplacer avec webFrame.setVisualZoomLevelLimits (1, 2) / / obsolète webFrame.registerURLSchemeAsSecure('app') / / remplacer avec protocol.registerStandardSchemes (["app"], {secure: true}) / / obsolète webFrame.registerURLSchemeAsPrivileged ("app", {secure: true}) / / remplacer avec protocol.registerStandardSchemes (["app"], {secure: true})
```

## `<webview>`

```js
Déconseillé de webview.setZoomLevelLimits (1, 2) / / remplacer avec webview.setVisualZoomLevelLimits (1, 2)
```

## Nœud en-têtes URL

Il s’agit de l’URL spécifiée comme `disturl` dans un fichier `.npmrc` ou le `--dist-url` indicateur de ligne de commande lors de la construction des modules natifs de nœud.

Obsolète : https://atom.io/download/atom-shell

Remplacer par : https://atom.io/download/electron