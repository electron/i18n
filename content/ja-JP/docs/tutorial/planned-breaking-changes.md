# Planned Breaking API Changes (4.0)

次のリストには Electron 4.0 で削除される API が記載含まれています。

このリリースのためのタイムテーブルはありませんが、最新の [メジャー バージョン](electron-versioning.md#semver) での廃止警告が追加されます。

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

## `FIXME` comments

The `FIXME` string is used in code comments to denote things that should be fixed for the 3.0 release. See https://github.com/electron/electron/search?q=fixme