# 주요 변경 사항 (NetworkService) (초안)

이 문서는 네트워크 코드를 NetworkService API로 마이그레이션 한 후의 Electron API의 변경 사항에 대해 설명합니다.

현재 Electron에서 `NetworkService`를 활성화 할지 알 수 없지만 Chromium이 이미 ` NetworkService` 코드를 제거하고 있으므로 Electron 10 이전으로 전환할 수 있습니다.

Electron에서 `NetworkService`를 활성화 할 시기를 결정한 후에는이 문서의 내용을 `breaking-changes.md`로 이동해야 합니다.

## 중단될 예정 API

### `protocol.unregisterProtocol`
### `protocol.uninterceptProtocol`

API는 이제 동기적이며 콜백은 더이상 필요하지 않습니다.

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

등록되거나 인터셉트된 프로토콜은 탐색이 발생할 때까지 현재 페이지에 영향을 미치지 않습니다.

### `protocol.isProtocolHandled`

이 API는 더이상 사용되지 않고 사용자는 `protocol.isProtocolRegistered`와 `protocol.isProtocolIntercepted`를 대신 사용해야 합니다.

```javascript
// 더이상 사용되지 않음
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// 다음으로 대체됨
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```
