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

* [Session の `select-hid-device` イベント](.../api/session.md#event-select-hid-device) は、`navigator.hid.requestDevice` が呼び出された時に HID デバイスを選択するために利用できます。  さらに、Session の [`hid-device-added`](.../api/session.md#event-hid-device-added) および [`hid-device-removed`](.../api/session.md#event-hid-device-removed) イベントは、`navigator.hid.requestDevice` の処理中におけるデバイスの接続や除去の処理に利用できます。
* [`ses.setDevicePermissionHandler(handler)`](.../api/session.md#sessetdevicepermissionhandlerhandler) は、先に `navigator.hid.requestDevice` を介して許可の呼び出しをせずとも、デバイスへのデフォルトの権限を提供するために利用できます。  また、Electron のデフォルトの動作では、付与されたデバイスの権限を対応する WebContents が有効の間だけ保存します。  より長期間の保存が必要な場合、開発者は付与されたデバイスのパーミッションを保存し (`select-hid-device` イベントを処理するときなど)、`setDevicePermissionHandler` でそのストレージから読み出しできます。
* [`ses.setPermissionCheckHandler(handler)`](.../api/session.md#sessetpermissioncheckhandlerhandler) を使うと、特定オリジンの HID アクセスを無効にできます。

### ブロックリスト

デフォルトでは、Electron は Chromium が使用する [ブロックリスト](https://github.com/WICG/webhid/blob/main/blocklist.txt) と同じものを採用しています。  この動作を無効にしたい場合は、以下のように `disable-hid-blocklist` フラグで設定できます。

```javascript
app.commandLine.appendSwitch('disable-hid-blocklist')
```

### サンプル

この例では、[`ses.setDevicePermissionHandler(handler)`](.../api/session.md#sessetdevicepermissionhandlerhandler) を通じて HID デバイスを自動選択する Electron アプリケーションを示しています。`Test WebHID` ボタンがクリックされると、[Session の `select-hid-device`](../api/session.md#event-select-hid-device) イベントを通じて HID デバイスを自動選択します。

```javascript fiddle='docs/fiddles/features/web-hid'

```

## Web シリアル API

[Web シリアル API](https://web.dev/serial/) を使用すると、シリアルポートや USB、Bluetooth で接続されたシリアルデバイスにアクセスできます。  この API を Electron で使用には、開発者がシリアルポートのリクエストに関する [Session の `select-serial-port` イベント](.../api/session.md#event-select-serial-port) をハンドリングする必要があります。

Web シリアル API の利用にあたって更にいくつかの API があります。

* Session の [`serial-port-added`](../api/session.md#event-serial-port-added) と [`serial-port-removed`](../api/session.md#event-serial-port-removed) イベントは、`navigator.serial.requestPort` の処理中におけるデバイスの接続や除去のハンドリングに使用できます。
* [`ses.setPermissionCheckHandler(handler)`](.../api/session.md#sessetpermissioncheckhandlerhandler) を使うと、特定オリジンのシリアルアクセスを無効にできます。

### サンプル

この例で示している Electron アプリケーションは、`Test Web Serial` ボタンがクリックされたときに、[Session の `select-serial-port` イベント](../api/session.md#event-select-serial-port) を通して最初に利用可能な Arduino Uno シリアルデバイスを (接続されている場合は) 自動選択します。

```javascript fiddle='docs/fiddles/features/web-serial'

```
