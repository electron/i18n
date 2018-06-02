# 중단될 예정 API (4.0)

다음 목록에는 Electron 4.0에서 제거될 API가 포함되어 있습니다.

이 릴리스가 발생할 시점에 대한 일정은 없지만 사용 중단 경고가 최소 [하나의 메이저 버전](electron-versioning.md#semver)에 사전에 추가될 것입니다.

## `webFrame`

```js
// Deprecated
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Replace with
protocol.registerStandardSchemes(['app'], {secure: true})
```

*Nota Bene:* 이것을 제거하기 전에 모든 관련 사양을 `protocol.registerStandardSchemes(['app'], {secure: true})`에 업데이트해야 합니다.

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

3.0릴리스에 대해 수정해야 하는 사항을 나타내는 코드 설명에는 `FIXME` 문자열이 사용됩니다. https://github.com/electron/electron/search?q=fixme 를 참고하세요.