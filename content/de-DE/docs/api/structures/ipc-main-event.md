# IpcMainEvent Objekt erweitert `Ereignis`

* `frameId` Integer - Die ID des Renderer Frames, der diese Nachricht gesendet hat
* `returnValue` any - Set this to the value to be returned in a synchronous message
* `sender` WebContents - Gibt die `webContents` zurück, welche die Nachricht gesendet haben
* `reply` Funktion - Eine Funktion, die eine IPC-Nachricht an den Renderer-Rahmen sendet, der die ursprüngliche Nachricht, die Sie derzeit bearbeiten, gesendet hat. You should use this method to "reply" to the sent message in order to guarantee the reply will go to the correct process and frame. 
  * `...args` any[]