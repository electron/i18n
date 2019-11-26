# IpcMainEvent Object extends `Event`

* `frameId` Integer - 发送该消息的渲染进程框架的ID（可能是iframe）
* `returnValue` any - 将其设置为要在同步消息中返回的值
* `sender` WebContents - Returns the `webContents` that sent the message
* `reply` Function - 将 IPC 消息发送到呈现器帧的函数，该呈现器帧发送当前正在处理的原始消息。 You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame. 
  * `...args` any[]