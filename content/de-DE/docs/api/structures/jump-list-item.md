# JumpListItem Object

* `type` String (optional) - One of the following:
  * `task` - Task startet eine App mit speziellen Werten.
  * `separator` - kann verwendet werden, um Elemente in der Standardkategorie `Tasks` zu trennen.
  * `file` - Ein file-link wird eine datei öffnen mit der app welche die Jump List erstellt hat, damit dies funktioniert, muss die app als Handler dieses Dateityps registriert sein (muss aber nicht der Standard Handler sein).
* `path` String (optional) - Pfad zur zu öffnenden Datei. Sollte nur gesetzt werden falls `type` `file` ist.
* `program` String (optional) - Pfad des auszuführenden Programms. Üblicherweise sollte `process.execPath` angegeben werden, welches das aktuelle Programm öffnet. Sollte nur gesetzt werden, wenn `type` gleich `task` ist.
* `args`String (optional)- Die Befehllinie Argumenten wenn `das Program` ist ausgefuehrt worden.  Soll nur eingestellt werden wenn ` der Typ`Task </code>ist.
* `title`String (optional)-Der Text der zum Objekt in der Jump List angezeigt werden muss. Soll nur eingestellt werden wenn`Typ`Arbeit </code>ist.
* `description`String (optional)-Die Beschreibung von Task (in einem Tooltip angezeigt wird). Soll nur eingestellt werden wenn`Typ`Arbeit </code>ist. Maximum length 260 characters.
* `iconPath` String (optional) - Der absolute Pfad zu einem Icon, welches in einer Jump List angezeigt werden soll, kann auch eine "arbitrary resource" Datei mit einem beinhaltetem Icon sein. (z.B. `.ico`, `.exe`, `.dll`). Man kann normalerweise `process.execPath` angeben um ein Programm Icon zu zeigen.
* `iconIndex` Number (optional) - Der Index des Icons im "resource file". Wenn ein "resource file" mehrere Icons beinhaltet, wird dieser Wert benutzt um den "zero-based" Index des Icons anzugeben, welches für diesen task angezeigt werden soll. Wenn ein "resource file" nur ein icon beinhaltet, sollte dieser Wert auf 0 gesetzt sein.
* `workingDirectory` String (optional)-Die Telefonliste von Arbeit. Default ist leer.
