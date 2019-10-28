# IpcMainEvent Object extends `Event`

* `frameId` Integer - 发送该消息的渲染进程框架的ID（可能是iframe）
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - Returns the `webContents` that sent the message
* `reply` Function - A function that will send an IPC message to the renderer frame that sent the original message that you are currently handling. You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame. 
  * `...args` any[]