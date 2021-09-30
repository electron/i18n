# Accès au périphérique

Comme les navigateurs basés sur Chromium, Electron fournit un accès au matériel du périphérique via des API Web.  Ces API fonctionnent pour la plupart, comme dans un navigateur, mais il y a quelques différences qui doivent être prises en compte.  La principale différence entre Electron et les navigateurs est ce qui se passe lorsque l'accès à l'appareil est demandé .  Dans un navigateur, les utilisateurs se voient présenter une popup où ils peuvent accorder l' accès à un appareil individuel.  Dans Electron des APIsont fournies pouvant être utilisées par un développeur pour choisir automatiquement un périphérique ou demander aux utilisateurs de choisir un périphérique via une interface créée par un développeur.

## API Web Bluetooth

L’API [Web Bluetooth](https://web.dev/bluetooth/) peut être utilisée pour communiquer avec des périphériques Bluetooth. Afin d'utiliser cette API dans Electron, les développeurs devront gérer l'événement [`select-bluetooth-device` sur le webContents](../api/web-contents.md#event-select-bluetooth-device) associé à la demande de périphérique.

### Example

Cet exemple montre une application Electron qui sélectionne automatiquement le premier périphérique Bluetooth disponible lorsque le bouton `Test Bluetooth` est cliqué.

```javascript fiddle='docs/fiddles/features/web-bluetooth'

```

## WebHID API

The [WebHID API](https://web.dev/hid/) can be used to access HID devices such as keyboards and gamepads.  Electron provides several APIs for working with the WebHID API:

* The [`select-hid-device` event on the Session](../api/session.md#event-select-hid-device) can be used to select a HID device when a call to `navigator.hid.requestDevice` is made.  Additionally the [`hid-device-added`](../api/session.md#event-hid-device-added) and [`hid-device-removed`](../api/session.md#event-hid-device-removed) events on the Session can be used to handle devices being plugged in or unplugged during the `navigator.hid.requestDevice` process.
* [`ses.setDevicePermissionHandler(handler)`](../api/session.md#sessetdevicepermissionhandlerhandler) can be used to provide default permissioning to devices without first calling for permission to devices via `navigator.hid.requestDevice`.  Additionally, the default behavior of Electron is to store granted device permision through the lifetime of the corresponding WebContents.  If longer term storage is needed, a developer can store granted device permissions (eg when handling the `select-hid-device` event) and then read from that storage with `setDevicePermissionHandler`.
* [`ses.setPermissionCheckHandler(handler)`](../api/session.md#sessetpermissioncheckhandlerhandler) can be used to disable HID access for specific origins.

### Blocklist

By default Electron employs the same [blocklist](https://github.com/WICG/webhid/blob/main/blocklist.txt) used by Chromium.  If you wish to override this behavior, you can do so by setting the `disable-hid-blocklist` flag:

```javascript
app.commandLine.appendSwitch('disable-hid-blocklist')
```

### Example

This example demonstrates an Electron application that automatically selects HID devices through [`ses.setDevicePermissionHandler(handler)`](../api/session.md#sessetdevicepermissionhandlerhandler) and through [`select-hid-device` event on the Session](../api/session.md#event-select-hid-device) when the `Test WebHID` button is clicked.

```javascript fiddle='docs/fiddles/features/web-hid'

```

## Web Serial API

The [Web Serial API](https://web.dev/serial/) can be used to access serial devices that are connected via serial port, USB, or Bluetooth.  In order to use this API in Electron, developers will need to handle the [`select-serial-port` event on the Session](../api/session.md#event-select-serial-port) associated with the serial port request.

There are several additional APIs for working with the Web Serial API:

* The [`serial-port-added`](../api/session.md#event-serial-port-added) and [`serial-port-removed`](../api/session.md#event-serial-port-removed) events on the Session can be used to handle devices being plugged in or unplugged during the `navigator.serial.requestPort` process.
* [`ses.setPermissionCheckHandler(handler)`](../api/session.md#sessetpermissioncheckhandlerhandler) can be used to disable serial access for specific origins.

### Example

This example demonstrates an Electron application that automatically selects the first available Arduino Uno serial device (if connected) through [`select-serial-port` event on the Session](../api/session.md#event-select-serial-port) when the `Test Web Serial` button is clicked.

```javascript fiddle='docs/fiddles/features/web-serial'

```
