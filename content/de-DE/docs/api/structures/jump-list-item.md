# JumpListItem Object

* `type` String (optional) - Eine der folgenden Möglichkeiten: 
  * `task` - Task startet eine App mit speziellen Werten.
  * `separator` - kann verwendet werden, um Elemente in der Standardkategorie `Tasks` zu trennen.
  * `file` - Ein file-link wird eine datei öffnen mit der app welche die Jump List erstellt hat, damit dies funktioniert, muss die app als Handler dieses Dateityps registriert sein (muss aber nicht der Standard Handler sein).
* `path` String (optional) - Pfad zur zu öffnenden Datei. Sollte nur gesetzt werden falls `type` `file` ist.
* `program` String (optional) - Pfad des auszuführenden Programms. Üblicherweise sollte `process.execPath` angegeben werden, welches das aktuelle Programm öffnet. Sollte nur gesetzt werden, wenn `type` gleich `task` ist.
* `args` String (optional) - Die Befehlszeilenargumente, wenn `program` ausgeführt wird. Sollte nur gesetzt werden, wenn `type` gleich `task` ist.
* `title` String (optional) - Der Text, welcher für diese Einheit in der Jump List angezeigt wird. Sollte nur gesetzt werden, wenn `type` gleich `task` ist.
* `description` String (optional) - Beschreibung der Aufgabe (angezeigt in einem Tooltip). Sollte nur gesetzt werden, wenn `type` gleich `task` ist.
* `iconPath` String (optional) - Der absolute Pfad zu einem Icon, welches in einer Jump List angezeigt werden soll, kann auch eine "arbitrary resource" Datei mit einem beinhaltetem Icon sein. (z.B. `.ico`, `.exe`, `.dll`). Man kann normalerweise `process.execPath` angeben um ein Programm Icon zu zeigen.
* `iconIndex` Number (optional) - Der Index des Icons im "resource file". Wenn ein "resource file" mehrere Icons beinhaltet, wird dieser Wert benutzt um den "zero-based" Index des Icons anzugeben, welches für diesen task angezeigt werden soll. Wenn ein "resource file" nur ein icon beinhaltet, sollte dieser Wert auf 0 gesetzt sein.