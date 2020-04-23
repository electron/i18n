# Obiekt IpcMainEvent rozszerzający `Event`

* `frameId` Integer - ID ramki renderowania, która wysłała tę wiadomość
* `returnValue` any -Wartość do zwrócenia w wiadomości synchronicznej
* `sender` WebContents - Zwraca obiekt `WebContents`, który wysłał wiadomość
* `reply` Function - Funkcja, która wyśle wiadomość IPC do ramki renderowania, która wysłała oryginalną wiadomość, która jest aktualnie obsługiwana.  Powinieneś użyć tej metody aby "odpowiedzieć" na wysłaną wiadomość oraz zagwarantować, że odpowiedź przejdzie do prawidłowego procesu i ramki.
  * `...args` any[]
