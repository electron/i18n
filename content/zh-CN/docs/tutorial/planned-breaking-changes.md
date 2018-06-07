# 计划重写的 API (4.0)

以下列表包括将在Electron 4.0中删除的API

There is no timetable for when this release will occur but deprecation warnings will be added at least [one major version](electron-versioning.md#semver) beforehand.

## `webFrame`

```js
// 废弃
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// 替换为
protocol.registerStandardSchemes(['app'], {secure: true})
```

*Nota Bene:* Before we can remove this we need to update all of the relevant specs to `protocol.registerStandardSchemes(['app'], {secure: true})`.

## `app.makeSingleInstance`

```js
// 废弃
app.makeSingleInstance(function (argv, cwd) {

})
// 替换为
app.requestSingleInstanceLock()
app.on('second-instance', function (argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// 废弃
app.releaseSingleInstance()
// 替换为
app.releaseSingleInstanceLock()
```

## `FIXME` 注释

代码注释中`FIXME` 的标记 ，表示 3.0 版本 应该解决的问题. 参考 https://github.com/electron/electron/search?q=fixme