# Planned Breaking API Changes (4.0)

以下列表包括将在Electron 4.0中删除的API

There is no timetable for when this release will occur but deprecation warnings will be added at least [one major version](electron-versioning.md#semver) beforehand.

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

## `FIXME` 注释

The `FIXME` string is used in code comments to denote things that should be fixed for the 3.0 release. See https://github.com/electron/electron/search?q=fixme