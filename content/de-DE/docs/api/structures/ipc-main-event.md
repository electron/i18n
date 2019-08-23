# IpcMainEvent Objekt erweitert `Ereignis`

* `frameId` Integer - Die ID des Renderer Frames, der diese Nachricht gesendet hat
* `returnValue` any - Setze dies auf den Wert, der in einer synchronen Nachricht zurückgegeben wird
* `sender` WebContents - Gibt die `webContents` zurück, welche die Nachricht gesendet haben
* `reply` Funktion - Eine Funktion, die eine IPC-Nachricht an den Renderer-Rahmen sendet, der die ursprüngliche Nachricht, die Sie derzeit bearbeiten, gesendet hat. Sie sollten diese Methode verwenden, um auf die Nachricht zu "antworten" um zu garantieren, dass die Antwort an den richtigen Prozess und Rahmen geht. 
  * `...args` any[] IpcRenderer