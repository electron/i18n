# 破壊的変更 (NetworkService) (草案)

このドキュメントでは、ネットワークコードを NetworkService API に移行した後の Electron API の変更について説明します。

現時点では、Electron でデフォルトで `NetworkService` を有効にする時期は推定されていませんが、Chromium は既に `NetworkService` 以外のコードを削除しているため、Electron 10 より前に切り替わる可能性があります。

Electron で `NetworkService` を有効にするタイミングが決定されれば、このドキュメントの内容を `breaking-changes.md` に移動しなければなりません。

## 予定されている API の破壊的変更

### `protocol.unregisterProtocol`
### `protocol.uninterceptProtocol`

API は同期になり、任意のコールバックは不要になりました。

```javascript
// 非推奨
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// こちらに置換
protocol.unregisterProtocol(scheme)
```

### `protocol.registerFileProtocol`
### `protocol.registerBufferProtocol`
### `protocol.registerStringProtocol`
### `protocol.registerHttpProtocol`
### `protocol.registerStreamProtocol`
### `protocol.interceptFileProtocol`
### `protocol.interceptStringProtocol`
### `protocol.interceptBufferProtocol`
### `protocol.interceptHttpProtocol`
### `protocol.interceptStreamProtocol`

API は同期になり、任意のコールバックは不要になりました。

```javascript
// 非推奨
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// こちらに置換
protocol.registerFileProtocol(scheme, handler)
```

登録または干渉されたプロトコルは、ナビゲーションが発生するまで現在のページに影響しません。

### `protocol.isProtocolHandled`

この API は非推奨です。ユーザーは、代わりに `protocol.isProtocolRegistered` および `protocol.isProtocolIntercepted` を使用する必要があります。

```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```
