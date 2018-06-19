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
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.