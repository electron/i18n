# Task Object

* `program` String - Pfad des auszuführenden Programms, normalerweise sollten Sie `process.execPath` nehmen, was das aktuelle Programm öffnet.
* `arguments` String - Kommandozeilenargumente wenn `program` ausgeführt wird.
* ` Titel ` String-die Zeichenfolge, die in einem jumplist angezeigt werden soll.
* ` Beschreibung ` String-Beschreibung dieser Aufgabe.
* ` iconPath ` String-der absolute Pfad zu einem Symbol, das in einem JumpList, die eine beliebige Ressourcendatei sein kann, die ein Symbol enthält. Sie kann in der Regel angeben ` Prozess. execPath `, um das Symbol des Programms anzuzeigen.
* ` iconIndex ` Number-der Icon-Index in der Icon-Datei. Wenn eine Icon-Datei aus zwei oder mehr Symbolen besteht, legen Sie diesen Wert fest, um das Symbol zu identifizieren. Wenn ein Icon-Datei besteht aus einem Symbol, dieser Wert ist 0.