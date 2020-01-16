# Breaking changes (NetworkService) (Draft)

This document describes changes to Electron APIs after migrating network code to NetworkService API.

We don't currently have an estimate of when we will enable `NetworkService` by default in Electron, but as Chromium is already removing non-`NetworkService` code, we might switch before Electron 10.

The content of this document should be moved to `breaking-changes.md` once we have determined when to enable `NetworkService` in Electron.

## 중단될 예정 API

### `protocol.unregisterProtocol`
### `protocol.uninterceptProtocol`

The APIs are now synchronous and the optional callback is no longer needed.

```javascript
// 더이상 사용되지 않음
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// 다음으로 대체됨
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

API는 이제 동기적이며 콜백은 더이상 필요하지 않습니다.

```javascript
// 더이상 사용되지 않음
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// 다음으로 대체됨
protocol.registerFileProtocol(scheme, handler)
```

The registered or intercepted protocol does not have effect on current page until navigation happens.

### `protocol.isProtocolHandled`

This API is deprecated and users should use `protocol.isProtocolRegistered` and `protocol.isProtocolIntercepted` instead.

```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```
