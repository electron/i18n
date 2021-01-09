# Obiekt IpcMainInvokeEvent rozszerzający `Event`

* `processId` Integer - The internal ID of the renderer process that sent this message
* `frameId` Integer - ID ramki renderowania, która wysłała tę wiadomość
* `sender` WebContents - Zwraca obiekt `WebContents`, który wysłał wiadomość
