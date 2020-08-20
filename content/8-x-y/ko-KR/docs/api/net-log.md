# netLog

> Logging network events for a session.

프로세스: [Main](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async () => {
  await netLog.startLogging('/path/to/net-log')
  // 네트워크 이벤트 후
  const path = await netLog.stopLogging()
  console.log('넷 로그가', path, '에 작성되었습니다.')
})
```

See [`--log-net-log`](command-line-switches.md#--log-net-logpath) to log network events throughout the app's lifecycle.

**Note:** All methods unless specified can only be used after the `ready` event of the `app` module gets emitted.

## 메서드

### `netLog.startLogging(path[, options])`

* `path` String - File path to record network logs.
* `options` Object (optional)
  * `captureMode` String (optional) - What kinds of data should be captured. By default, only metadata about requests will be captured. Setting this to `includeSensitive` will include cookies and authentication data. Setting it to `everything` will include all bytes transferred on sockets. Can be `default`, `includeSensitive` or `everything`.
  * `maxFileSize` Number (optional) - When the log grows beyond this size, logging will automatically stop. Defaults to unlimited.

Returns `Promise<void>` - resolves when the net log has begun recording.

Starts recording network events to `path`.

### `netLog.stopLogging()`

Returns `Promise<String>` - resolves with a file path to which network logs were recorded.

Stops recording network events. If not called, net logging will automatically end when app quits.

## 속성

### `netLog.currentlyLogging` _Readonly_

A `Boolean` property that indicates whether network logs are recorded.

### `netLog.currentlyLoggingPath` _Readonly_ _Deprecated_

A `String` property that returns the path to the current log file.
