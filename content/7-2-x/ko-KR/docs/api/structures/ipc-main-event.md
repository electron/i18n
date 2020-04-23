# `Event`를 상속한 IpcMainEvent 오브젝트

* `frameId` Integer - 이 메시지를 보낸 렌더러 프레임의 ID
* `returnValue` any - 동기 메시지에 반환될 값으로 설정하십시오.
* `sender` WebContents - 메시지를 보낸 `webContents`를 반환합니다.
* `reply` Function - 현재 처리 중인 원본 메시지를 보낸 렌더러 프레임으로 IPC 메시지를 보내는 함수.  회신이 올바른 프로세스 및 프레임으로 이동하도록 하려면 이 method을 사용하여 전송된 메시지에 "응답"해야 합니다.
  * `...args` any[]
