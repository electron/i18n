# IpcMainEvent Object erweitert `Event`

* `processId` Integer - The internal ID of the renderer process that sent this message
* `frameId` Integer - Die ID des Renderer Frames, der diese Nachricht gesendet hat
* `returnValue` any - Setze dies auf den Wert, der in einer synchronen Nachricht zurückgegeben wird
* `sender` WebContents - Gibt die `webContents` zurück, welche die Nachricht gesendet haben
* `senderFrame` WebFrameMain _Readonly_ - The frame that sent this message
* `ports` MessagePortMain[] - A list of MessagePorts that were transferred with this message
* `reply` Function - Eine Funktion, die eine IPC-Nachricht an den Renderer-Frame sendet, der die ursprüngliche derzeit zu bearbeitende Nachricht gesendet hat.  Diese Methode sollte verwendet werden, um auf die gesendete Nachricht zu antworten, um sicherzustellen, dass die Antwort an den richtigen Prozess und Frame weitergeleitet wird.
  * `channel` String
  * `...args` any[]
