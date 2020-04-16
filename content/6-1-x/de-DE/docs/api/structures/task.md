# Task Object

* `program` String - Pfad des auszuführenden Programms, normalerweise sollten Sie `process.execPath` nehmen, was das aktuelle Programm öffnet.
* `arguments` String - Kommandozeilenargumente wenn `program` ausgeführt wird.
* `title` String - Text welcher in einer JumpList angezeigt wird.
* `description` String - Beschreibung dieser Aufgabe.
* `iconPath` String - Absolute Pfad zu einem Symbol, welches in einer JumpList angezeigt werden soll. Der Pfad kann zu einer beliebige Resourcendatei führen, solang diese ein Symbol enthält. Man kann normalerweise `process.execPath` angeben um das Symbol des Programms anzuzeigen.
* `iconIndex` Number - Symbol-Index in der Symboldatei. Wenn eine Symboldatei aus zwei oder mehr Symbolen besteht, muss dieser Wert gesetzt werden um das Symbol zu identifizieren. Wenn eine Symboldatei aus einem Symbol besteht ist dieser Wert 0.
* `workingDirectory` String (optional) - The working directory. Default is empty.
