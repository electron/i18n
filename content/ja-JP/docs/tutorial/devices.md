# デバイスアクセス

Chromium ベースのブラウザのように、Electron はウェブ API を介してデバイスハードウェアへのアクセスを提供します。  ほとんどの場合これらの API はブラウザと同じように動作しますが、いくつかの違いを考慮しなければなりません。  Electronとブラウザの主な違いは、デバイスアクセスが要求されたときに起きることです。  ブラウザでは、ユーザーにポップアップが表示され、ユーザーは個々のデバイスにアクセスを許可できます。  Electron API では、デバイスを自動選択したり開発者が作成したインターフェースを介してユーザーにデバイス選択を促したりするために、開発者が利用できる API を提供しています。

## ウェブ Bluetooth API

[ウェブ Bluetooth API](https://web.dev/bluetooth/) は、Bluetooth デバイスとの通信に利用できます。 この API を Electron で使用するには、開発者がデバイスリクエストに関連する[webContents の `select-bluetooth-device` イベント](.../api/web-contents.md#event-select-bluetooth-device) をハンドリングする必要があります。

### サンプル

この例では、`Test Bluetooth` ボタンがクリックされたときに最初に利用可能な Bluetooth デバイスを自動的に選択する、Electron のアプリケーションを示しています。

```javascript fiddle='docs/fiddles/features/web-bluetooth'

```

## WebHID API

[WebHID API](https://web.dev/hid/) は、キーボードやゲームパッドなどの HID デバイスのアクセスに利用できます。  Electron は、WebHID API と連携するためにいくつかの API を提供しています。

* [Session の `select-hid-device` イベント](.../api/session.md#event-select-hid-device) は、`navigator.hid.requestDevice` が呼び出された時に HID デバイスを選択するために利用できます。  Additionally the [`hid-device-added`](../api/session.md#event-hid-device-added) and [`hid-device-removed`](../api/session.md#event-hid-device-removed) events on the Session can be used to handle devices being plugged in or unplugged during the `navigator.hid.requestDevice` process.
* [`ses.setDevicePermissionHandler(handler)`](../api/session.md#sessetdevicepermissionhandlerhandler) can be used to provide default permissioning to devices without first calling for permission to devices via `navigator.hid.requestDevice`.  Additionally, the default behavior of Electron is to store granted device permision through the lifetime of the corresponding WebContents.  If longer term storage is needed, a developer can store granted device permissions (eg when handling the `select-hid-device` event) and then read from that storage with `setDevicePermissionHandler`.
* [`ses.setPermissionCheckHandler(handler)`](../api/session.md#sessetpermissioncheckhandlerhandler) can be used to disable HID access for specific origins.

### Blocklist

By default Electron employs the same [blocklist](https://github.com/WICG/webhid/blob/main/blocklist.txt) used by Chromium.  If you wish to override this behavior, you can do so by setting the `disable-hid-blocklist` flag:

```javascript
app.commandLine.appendSwitch('disable-hid-blocklist')
```

### サンプル

This example demonstrates an Electron application that automatically selects HID devices through [`ses.setDevicePermissionHandler(handler)`](../api/session.md#sessetdevicepermissionhandlerhandler) and through [`select-hid-device` event on the Session](../api/session.md#event-select-hid-device) when the `Test WebHID` button is clicked.

```javascript fiddle='docs/fiddles/features/web-hid'

```

## Web Serial API

The [Web Serial API](https://web.dev/serial/) can be used to access serial devices that are connected via serial port, USB, or Bluetooth.  In order to use this API in Electron, developers will need to handle the [`select-serial-port` event on the Session](../api/session.md#event-select-serial-port) associated with the serial port request.

There are several additional APIs for working with the Web Serial API:

* The [`serial-port-added`](../api/session.md#event-serial-port-added) and [`serial-port-removed`](../api/session.md#event-serial-port-removed) events on the Session can be used to handle devices being plugged in or unplugged during the `navigator.serial.requestPort` process.
* [`ses.setPermissionCheckHandler(handler)`](../api/session.md#sessetpermissioncheckhandlerhandler) can be used to disable serial access for specific origins.

### サンプル

This example demonstrates an Electron application that automatically selects the first available Arduino Uno serial device (if connected) through [`select-serial-port` event on the Session](../api/session.md#event-select-serial-port) when the `Test Web Serial` button is clicked.

```javascript fiddle='docs/fiddles/features/web-serial'

```
