# IpcRendererEvent对象继承`Event`

* `processId` Integer - 发送该消息的渲染进程内部的ID
* `frameId` Integer - 发送该消息的渲染进程框架的ID（可能是iframe）
* `sender<code> WebContents - 返回发送消息的 webContents</li>
<li><code>senderFrame` WebFrameMain _只读_ - 发送此消息的框架
