# Planned Breaking API Changes (4.0)

La lista seguente include le API che saranno rimosse in Electron 4.0.

Non c'è una data in cui avverrà questo rilascio ma gli avvisi negativi saranno aggiunti almeno [una versione maggiore](electron-versioning.md#semver) prima.

## `webFrame`

```js
// Deprecated
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Replace with
protocol.registerStandardSchemes(['app'], {secure: true})
```

*Nota Bene:* Before we can remove this we need to update all of the relevant specs to `protocol.registerStandardSchemes(['app'], {secure: true})`.

## `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance(function (argv, cwd) {

})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', function (argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// Deprecated
app.releaseSingleInstance()
// Replace with
app.releaseSingleInstanceLock()
```

## Commenti `FIXAMI`

La stringa `FIXAMI` è utilizzata nei commenti del codice per denotare cose che potrebbero essere fixate per il rilascio 3.0. Vedi https://github.com/electron/electron/search?q=fixme