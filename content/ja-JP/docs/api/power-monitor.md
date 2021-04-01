# powerMonitor

> 電源の状態の変化をモニターします。

プロセス: [Main](../glossary.md#main-process)

## イベント

`powerMonitor` モジュールでは以下のイベントが発生します。

### イベント: 'suspend' _macOS_ _Windows_

システムがサスペンドするときに発生します。

### イベント: 'resume' _macOS_ _Windows_

システムが再開するときに発生します。

### イベント: 'on-ac' _macOS_ _Windows_

システムが AC 電源に切り替わったときに発生します。

### イベント: 'on-battery' _macOS_  _Windows_

システムがバッテリー電源に切り替わったときに発生します。

### イベント: 'shutdown' _Linux_ _macOS_

システムが再起動またはシャットダウンしようとしているときに発生します。 イベントハンドラが `e.preventDefault()` を呼び出した場合、Electron は正常にアプリを終了するためにシステムのシャットダウンの遅延を試みます。 `e.preventDefault()` が呼ばれた場合、出来る限り `app.quit()` のようなものを呼ぶのと同じようにアプリを終了します。

### イベント: 'lock-screen' _macOS_ _Windows_

システムがスクリーンをロックしようとしているときに発生します。

### イベント: 'unlock-screen' _macOS_ _Windows_

システムスクリーンがアンロックされたときに発行されます。

### イベント: 'user-did-become-active' _macOS_

ログインセッションがアクティブになったときに発生します。 詳細は [ドキュメント](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidbecomeactivenotification?language=objc) をご参照ください。

### イベント: 'user-did-resign-active' _macOS_

ログインセッションが非アクティブになったときに発生します。 詳細は [ドキュメント](https://developer.apple.com/documentation/appkit/nsworkspacesessiondidresignactivenotification?language=objc) をご参照ください。

## メソッド

`powerMonitor` モジュールには以下のメソッドがあります。

### `powerMonitor.getSystemIdleState(idleThreshold)`

* `idleThreshold` Integer

戻り値 `String` - 現在のシステムの状態。 `active` 、 `idle` 、 `locked` 、 `unknown` のいずれか。

システムのアイドル状態を計算します。 `idleThreshold` は、アイドルとみなされるまでの時間 (秒) です。  `locked` はサポートされたシステムでのみ利用可能です。

### `powerMonitor.getSystemIdleTime()`

戻り値 `Integer` - アイドル状態の秒数

システムのアイドル時間を計算します。

### `powerMonitor.isOnBatteryPower()`

戻り値 `Boolean` - システムがバッテリー電源状態かどうか。

このプロパティの変更を監視するには、`on-battery` および `on-ac` イベントを使用します。

## プロパティ

### `powerMonitor.onBatteryPower`

`Boolean` 型のプロパティです。 システムがバッテリー電源状態ならば true です。

[`powerMonitor.isOnBatteryPower()`](#powermonitorisonbatterypower) をご参照ください。
