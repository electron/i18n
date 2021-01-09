# Критические изменения (NetworkService) (Черновик)

Этот документ описывает изменения в Electron API после миграции сетевого кода в NetworkService API.

В настоящее время у нас нет оценки того, когда мы включим ` NetworkService ` по умолчанию в Electron, но поскольку Chromium уже удаляет код, отличный от ` NetworkService `, мы могли бы переключиться до Electron 10.

Содержимое этого документа должно быть перемещено в `breaking-changes.md`, как только мы определим когда включить `NetworkService` в Electron.

## Запланированные критические изменения API

### `protocol.unregisterProtocol`
### `protocol.uninterceptProtocol`

API теперь синхронизируются, и необязательный обратный вызов больше не требуется.

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

API теперь синхронизируются, и необязательный обратный вызов больше не требуется.

```javascript
// Deprecated
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Replace with
protocol.registerFileProtocol(scheme, handler)
```

Зарегистрированный или перехваченный протокол не влияет на текущую страницу до тех пор, пока не произойдет навигация.

### `protocol.isProtocolHandled`

Этот API является устаревшим, пользователи должны использовать `protocol.isProtocolRegistered` и `protocol.isProtocolIntercepted`.

```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```
