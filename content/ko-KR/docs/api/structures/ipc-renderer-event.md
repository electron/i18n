# `Event`를 상속하는 IpcRendererEvent Object

* `sender` IpcRenderer - 원래 이벤트를 발생시킨 `IpcRenderer` 인스턴스
* `senderId` Integer - 메시지를 보낸 `webContents.id`, `event.sender.sendTo(event.senderId, ...)` 를 사용하여 메시지에 회신할 수 있습니다, 자세한 내용은 [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-)를 참조하세요. This only applies to messages sent from a different renderer. Messages sent directly from the main process set `event.senderId` to `0`.