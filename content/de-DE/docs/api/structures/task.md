# Task Objekt

* ` Programm ` String-Pfad des Programms auszuführen, normalerweise sollten Sie Geben Sie ` Process. execPath ` an, das das aktuelle Programm öffnet.
* `-Argumente ` String-die Kommandozeilenargumente, wenn ` Programm ` ist ausgeführt.
* `title` String - The string to be displayed in a JumpList.
* `description` String - Description of this task.
* `iconPath` String - The absolute path to an icon to be displayed in a JumpList, which can be an arbitrary resource file that contains an icon. You can usually specify `process.execPath` to show the icon of the program.
* `iconIndex` Number - The icon index in the icon file. If an icon file consists of two or more icons, set this value to identify the icon. If an icon file consists of one icon, this value is 0.