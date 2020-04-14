# netLog

> Logging network events for a session.

Proseso:[Pangunahi](../glossary.md#main-process)

```javascript
const { netLog } = require('electron')

app.on('ready', async function () {
  netLog.startLogging('/path/to/net-log')
  // After some network events
  const path = await netLog.stopLogging()
  console.log('Net-logs written to', path)
})
```

See [`--log-net-log`](chrome-command-line-switches.md#--log-net-logpath) to log network events throughout the app's lifecycle.

**Note:** Ang lahat ng mga pamamaraan maliban sa mga tinukoy ay maaari lamang gamitin pagkatapos ng paglabas ng event na `ready` ng modyul ng `app`.

## Mga Paraan

### `netLog.startLogging(path)`

* `path` String - File path to record network logs.

Starts recording network events to `path`.

### `netLog.stopLogging([callback])`

* `callback` Function (opsyonal)
  * `path` String - File path to which network logs were recorded.

Stops recording network events. If not called, net logging will automatically end when app quits.

**[Deprecated Soon](modernization/promisification.md)**

### `netLog.stopLogging()`

Returns `Promise<String>` - resolves with a file path to which network logs were recorded.

Stops recording network events. If not called, net logging will automatically end when app quits.

## Mga Katangian

### `netLog.currentlyLogging`

A `Boolean` property that indicates whether network logs are recorded.

### `netLog.currentlyLoggingPath`

A `String` property that returns the path to the current log file.
