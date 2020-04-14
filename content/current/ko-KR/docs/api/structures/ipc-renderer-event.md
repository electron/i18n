# `Event`를 상속하는 IpcRendererEvent Object

* `sender` IpcRenderer - 원래 이벤트를 발생시킨 `IpcRenderer` 인스턴스
* `senderId` Integer - 메시지를 보낸 `webContents.id`, `event.sender.sendTo(event.senderId, ...)` 를 사용하여 메시지에 회신할 수 있습니다, 자세한 내용은 [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-)를 참조하세요. 이는 다른 렌더러에서 보낸 메시지에만 해당합니다. main 프로세스에서 직접 보낸 메시지는 `event.senderId`가 `0`으로 설정됩니다.
