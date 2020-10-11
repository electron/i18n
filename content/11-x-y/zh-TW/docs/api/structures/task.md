# Task Object

* `程式` 字串 - 要執行的程式的路徑，通常 指定 `.execPath` 打開目前程式。
* `arguments` String - The command line arguments when `program` is executed.
* `title` String - The string to be displayed in a JumpList.
* `description` String - Description of this task.
* `iconPath` String - The absolute path to an icon to be displayed in a JumpList, which can be an arbitrary resource file that contains an icon. You can usually specify `process.execPath` to show the icon of the program.
* `iconIndex` Number - The icon index in the icon file. If an icon file consists of two or more icons, set this value to identify the icon. If an icon file consists of one icon, this value is 0.
* `workingDirectory` String (optional) - The working directory. Default is empty.
