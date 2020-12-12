# `Event`를 확장한 IpcMainInvokeEvent 객체

* `processId` Integer - The internal ID of the renderer process that sent this message
* `frameId` Integer - 이 메시지를 보낸 렌더러 프레임의 ID
* `sender` WebContents - 메시지를 보낸 `webContents`를 반환합니다.
