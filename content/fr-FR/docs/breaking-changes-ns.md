# Breaking changes (NetworkService) (Draft)

This document describes changes to Electron APIs after migrating network code to NetworkService API.

We don't currently have an estimate of when we will enable `NetworkService` by default in Electron, but as Chromium is already removing non-`NetworkService` code, we might switch before Electron 10.

The content of this document should be moved to `breaking-changes.md` once we have determined when to enable `NetworkService` in Electron.

## Changements API non rétro-compatible prévus

### `protocol.unregisterProtocol`
### `protocol.uninterceptProtocol`

The APIs are now synchronous and the optional callback is no longer needed.

```javascript
// Déprécié
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Remplacé par
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

The APIs are now synchronous and the optional callback is no longer needed.

```javascript
// Déprécié
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Remplacé par
protocol.registerFileProtocol(scheme, handler)
```

The registered or intercepted protocol does not have effect on current page until navigation happens.

### `protocol.isProtocolHandled`

This API is deprecated and users should use `protocol.isProtocolRegistered` and `protocol.isProtocolIntercepted` instead.

```javascript
// Déprécié
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Remplacé par
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```
