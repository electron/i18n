# `Event`를 상속한 IpcMainEvent 오브젝트

* `frameId` Integer - 이 메시지를 보낸 렌더러 프레임의 ID
* `returnValue` any - Set this to the value to be returned in a syncronous message
* `sender` WebContents - 메시지를 보낸 `webContents`를 반환합니다.
* `reply` Function - 현재 처리 중인 원본 메시지를 보낸 렌더러 프레임으로 IPC 메시지를 보내는 함수.  You should use this method to "reply" to the sent message in order to guaruntee the reply will go to the correct process and frame.
  * `...args` any[] IpcRenderer
