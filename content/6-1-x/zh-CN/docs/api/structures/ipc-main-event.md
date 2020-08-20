# IpcMainEvent Object extends `Event`

* `frameId` Integer - 发送该消息的渲染进程框架的ID（可能是iframe）
* `returnValue` any - 将该值设置为要在同步消息中返回的值
* `sender<code> WebContents - 返回发送消息的 webContents</li>
<li><code>reply` Function - 将 IPC 消息发送到渲染器框架的函数，该渲染器框架发送当前正在处理的原始消息。  You should use this method to "reply" to the sent message in order to guaruntee the reply will go to the correct process and frame.
  * `...args` any[] IpcRenderer
