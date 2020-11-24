# Task Object

* `program` String - Path of the program to execute, usually you should specify `process.execPath` which opens the current program.
* `arguments` String - The command line arguments when `program` is executed.
* `title` String - The string to be displayed in a JumpList.
* `description` String - Popis této úlohy.
* `iconPath` String - The absolute path to an icon to be displayed in a JumpList, which can be an arbitrary resource file that contains an icon. Můžete obvykle specifikovat `process.execPath` k zobrazení ikony programu.
* `iconIndex` Number - The icon index in the icon file. If an icon file consists of two or more icons, set this value to identify the icon. If an icon file consists of one icon, this value is 0.
* `workingDirectory` String (optional) - The working directory. Default is empty.
