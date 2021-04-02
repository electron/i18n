# IpcMainEvent Object erweitert `Event`

* `processId` Ganzzahl - Die interne ID des Rendererprozesses, der diese Nachricht gesendet hat
* `frameId` Integer - Die ID des Renderer Frames, der diese Nachricht gesendet hat
* `returnValue` any - Setze dies auf den Wert, der in einer synchronen Nachricht zurückgegeben wird
* `sender` WebContents - Gibt die `webContents` zurück, welche die Nachricht gesendet haben
* `senderFrame` WebFrameMain _Readonly_ - Der Frame, der diese Nachricht gesendet hat
* `ports` MessagePortMain[] - Eine Liste der MessagePorts, die mit dieser Nachricht übertragen wurden
* `reply` Function - Eine Funktion, die eine IPC-Nachricht an den Renderer-Frame sendet, der die ursprüngliche derzeit zu bearbeitende Nachricht gesendet hat.  Diese Methode sollte verwendet werden, um auf die gesendete Nachricht zu antworten, um sicherzustellen, dass die Antwort an den richtigen Prozess und Frame weitergeleitet wird.
  * `channel` String
  * `...args` any[]
