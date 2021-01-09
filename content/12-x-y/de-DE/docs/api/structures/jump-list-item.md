# JumpListItem Object

* `type` String (optional) - One of the following:
  * `task` - Task startet eine App mit speziellen Werten.
  * `separator` - kann verwendet werden, um Elemente in der Standardkategorie `Tasks` zu trennen.
  * `file` - Ein file-link wird eine datei öffnen mit der app welche die Jump List erstellt hat, damit dies funktioniert, muss die app als Handler dieses Dateityps registriert sein (muss aber nicht der Standard Handler sein).
* `path` String (optional) - Pfad zur zu öffnenden Datei. Sollte nur gesetzt werden falls `type` `file` ist.
* `program` String (optional) - Pfad des auszuführenden Programms. Üblicherweise sollte `process.execPath` angegeben werden, welches das aktuelle Programm öffnet. Sollte nur gesetzt werden, wenn `type` gleich `task` ist.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - Der absolute Pfad zu einem Icon, welches in einer Jump List angezeigt werden soll, kann auch eine "arbitrary resource" Datei mit einem beinhaltetem Icon sein. (z.B. `.ico`, `.exe`, `.dll`). Man kann normalerweise `process.execPath` angeben um ein Programm Icon zu zeigen.
* `iconIndex` Number (optional) - Der Index des Icons im "resource file". Wenn ein "resource file" mehrere Icons beinhaltet, wird dieser Wert benutzt um den "zero-based" Index des Icons anzugeben, welches für diesen task angezeigt werden soll. Wenn ein "resource file" nur ein icon beinhaltet, sollte dieser Wert auf 0 gesetzt sein.
* `workingDirectory` String (optional) - The working directory. Default is empty.
