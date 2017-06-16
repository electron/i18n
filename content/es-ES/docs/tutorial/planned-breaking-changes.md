# Planea romper cambios de API

La siguiente lista incluye las API que se suprimirá en Electron 2.0.

No hay ningún calendario para cuando ocurrirá esta versión pero las advertencias de degradación se añadirá al menos 90 días de antelación.

## `BrowserWindow`

```js
OptionsA deje obsoleto = {webPreferences: {blinkFeatures: ''}} que windowA = nuevo BrowserWindow(optionsA) / / reemplazar con optionsB que = {webPreferences: {enableBlinkFeatures: ''}} que windowB = BrowserWindow(optionsB) nuevo
```

## `Portapapeles`

```js
Ya no se utiliza clipboard.readRtf() / / reemplazar con clipboard.readRTF() / / clipboard.writeRtf() en desuso / / reemplazar con clipboard.writeRTF() / / clipboard.readHtml() en desuso / / reemplazar con clipboard.readHTML() / / clipboard.writeHtml() en desuso / / reemplazar con clipboard.writeHTML()
```

## `crashReporter`

```js
Obsoleto crashReporter.start ({companyName: 'Crashly', submitURL: 'https://crash.server.com', autoSubmit: true}) / / reemplazar con crashReporter.start ({nombre de la empresa: 'Crashly', submitURL: 'https://crash.server.com', uploadToServer: true})
```

## `menú`

```js
Obsoleto menu.popup (browserWindow, 100, 200, 2) / / reemplazar con menu.popup (browserWindow, {x: 100, y: 200, positioningItem: 2})
```

## `nativeImage`

```js
Ya no se utiliza nativeImage.toPng() / / reemplazar con nativeImage.toPNG() / / nativeImage.toJpeg() en desuso / / reemplazar con nativeImage.toJPEG() / / nativeImage.createFromBuffer (buffer, 1.0) en desuso / / reemplazar con nativeImage.createFromBuffer (buffer, {
  scaleFactor: 1.0
})
```

## `proceso`

```js
Obsoleto process.versions ['atom-shell'] / / reemplazar con process.versions.electron
```

* `process.Versions.electron` y `process.version.chrome` estarán propiedades de sólo lectura para la consistencia con las propiedades de `process.versions` por nodo.

## `período de sesiones`

```js
Ses.setCertificateVerifyProc en desuso (función (nombre de host, certificado, callback) {callback(true)}) / / reemplazar con ses.setCertificateVerifyProc (función (petición, devolución de llamada) {callback(0)})
```

## `Bandeja`

```js
Ya no se utiliza tray.setHighlightMode(true) / / reemplazar con tray.setHighlightMode('on') / / tray.setHighlightMode(false) en desuso / / reemplazar con tray.setHighlightMode('off')
```

## `webContents`

```js
WebContents.openDevTools({detach: true}) en desuso / / reemplazar con webContents.openDevTools({mode: 'detach'})
```

```js
WebContents.setZoomLevelLimits (1, 2) en desuso / / reemplazar con webContents.setVisualZoomLevelLimits (1, 2)
```

## `webFrame`

```js
WebFrame.setZoomLevelLimits (1, 2) en desuso / / reemplazar con webFrame.setVisualZoomLevelLimits (1, 2) / / webFrame.registerURLSchemeAsSecure('app') en desuso / / reemplazar con protocol.registerStandardSchemes (['app'], {secure: true}) / / webFrame.registerURLSchemeAsPrivileged ('app', {secure: true}) en desuso / / reemplazar con protocol.registerStandardSchemes (['app'], {secure: true})
```

## `<webview>`

```js
Webview.setZoomLevelLimits (1, 2) en desuso / / reemplazar con webview.setVisualZoomLevelLimits (1, 2)
```

## Nodo enlace de cabeceras

Esta es la dirección URL especificada como `disturl` en un archivo `.npmrc` o como ` - dist-url` bandera de línea de comandos al compilar los módulos nativos de nodo.

Obsoleto: https://atom.io/download/atom-shell

Reemplazar con: https://atom.io/download/electron