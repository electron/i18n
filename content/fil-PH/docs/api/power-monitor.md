# ang powerMonitor

> I-monitor ang mga pagbabago sa estado ng power.

Proseso:[Pangunahi](../glossary.md#main-process)

Hindi mo kailangan o gamitin ang amg modyul na ito hanggang ang event ng `ready` ng modyul ng `app` ay lumabas.

Halimbawa ng:

```javascript
const electron = kailangan('electron')
const {app} = electron

app.on('ready', () => {
  electron.powerMonitor.on('suspend', () => {
    console.log('The system is going to sleep')
  })
})
```

## Mga event

Ang modyul ng `powerMonitor` ay maglalabas ng mga sumusunod na event:

### Event: 'isuspindi'

Ay lalabas kapag ang sistema ay sususpindihin.

### Event: 'magpatuloy'

Ay lalabas kapag ang sistema ay nagpapatuloy.

### Event: 'on-ac' sa *Windows*

Ay lalabas kapag ang sistema ay nagbago sa AC power.

### Event: 'on-battery' sa *Windows*

Ay lalabas kapag ang sistema ay nagbago sa power ng baterya.

### Event: 'shutdown' *Linux* *macOS*

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.

### Event: 'lock-screen' *macOS* *Windows*

Emitted when the system is about to lock the screen.

### Event: 'unlock-screen' *macOS* *Windows*

Emitted as soon as the systems screen is unlocked.

## Mga Paraan

The `powerMonitor` module has the following methods:

#### `powerMonitor.querySystemIdleState(idleThreshold, callback)`

* `idleThreshold` Integer
* `callback` Punsyon 
  * `idleState` String - Can be `active`, `idle`, `locked` or `unknown`

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `callback` will be called synchronously on some systems and with an `idleState` argument that describes the system's state. `locked` is available on supported systems only.

#### `powerMonitor.querySystemIdleTime(callback)`

* `callback` Punsyon 
  * `idleTime` Integer - Idle time in seconds

Calculate system idle time in seconds.