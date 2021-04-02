# IpcMainEvent Object erweitert `Event`

* `processId` Ganzzahl - Die interne ID des Rendererprozesses, der diese Nachricht gesendet hat
* `frameId` Integer - Die ID des Renderer Frames, der diese Nachricht gesendet hat
* `sender` WebContents - Gibt die `webContents` zurück, welche die Nachricht gesendet haben
* `senderFrame` WebFrameMain _Readonly_ - Der Frame, der diese Nachricht gesendet hat
