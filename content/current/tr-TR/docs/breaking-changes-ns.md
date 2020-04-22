# Breaking changes (NetworkService) (Draft)

Bu belge ağ kodunu NetworkService API'ye taşıdıktan sonraki Electron API değişikliklerini tanımlar.

We don't currently have an estimate of when we will enable `NetworkService` by default in Electron, but as Chromium is already removing non-`NetworkService` code, we might switch before Electron 10.

The content of this document should be moved to `breaking-changes.md` once we have determined when to enable `NetworkService` in Electron.

## Planlanmış API Değişimleri

### `protocol.unregisterProtocol`
### `protocol.uninterceptProtocol`

API'ler artık eşzamanlılar ve seçime bağlı geriçağrı artık gerekmiyor.

```javascript
// Deprecated
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Replace with
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
// Deprecated
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Replace with
protocol.registerFileProtocol(scheme, handler)
```

Kaydedilmiş veya kesilmiş protokolün gezinme gerçekleşene dek varolan sayfa üzerinde etkisi yoktur.

### `protocol.isProtocolHandled`

This API is deprecated and users should use `protocol.isProtocolRegistered` and `protocol.isProtocolIntercepted` instead.

```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```
