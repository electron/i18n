# Obiekt IpcMainEvent rozszerzający `Event`

* `frameId` Integer - ID ramki renderowania, która wysłała tę wiadomość
* `returnValue` any - Set this to the value to be returned in a syncronous message
* `sender` WebContents - Zwraca obiekt `WebContents`, który wysłał wiadomość
* `reply` Function - Funkcja, która wyśle wiadomość IPC do ramki renderowania, która wysłała oryginalną wiadomość, która jest aktualnie obsługiwana.  You should use this method to "reply" to the sent message in order to guaruntee the reply will go to the correct process and frame.
  * `...args` any[] IpcRenderer
