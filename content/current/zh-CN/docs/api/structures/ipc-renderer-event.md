# IpcRendererEvent对象继承`Event`

* `sender` IpcRenderer - `IpcRenderer`实例是事件发起的源头
* `senderId`整型 - 发送信息的 `webContents.id`，可以通过调用 `event.sender.sendTo(event.senderId, ...)`来回复此信息，更多信息参考 [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-)。 仅适用于从不同renderer发来的信息。 从主进程直接发来的信息的 `event.senderId`是设置为`0`的。
