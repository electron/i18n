# `Event`를 상속한 IpcMainEvent 오브젝트

* `frameId` Integer - 이 메시지를 보낸 렌더러 프레임의 ID
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - Returns the `webContents` that sent the message
* `reply` Function - A function that will send an IPC message to the renderer frame that sent the original message that you are currently handling. You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame. 
  * `...args` any[]