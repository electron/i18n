# Obiekt IpcMainEvent rozszerzający `Event`

* `processId` Integer - The internal ID of the renderer process that sent this message
* `frameId` Integer - ID ramki renderowania, która wysłała tę wiadomość
* `returnValue` any -Wartość do zwrócenia w wiadomości synchronicznej
* `sender` WebContents - Zwraca obiekt `WebContents`, który wysłał wiadomość
* `senderFrame` WebFrameMain _Readonly_ - The frame that sent this message
* `ports` MessagePortMain[] - A list of MessagePorts that were transferred with this message
* `reply` Function - Funkcja, która wyśle wiadomość IPC do ramki renderowania, która wysłała oryginalną wiadomość, która jest aktualnie obsługiwana.  Powinieneś użyć tej metody aby "odpowiedzieć" na wysłaną wiadomość oraz zagwarantować, że odpowiedź przejdzie do prawidłowego procesu i ramki.
  * `channel` String
  * `...args` any[]
