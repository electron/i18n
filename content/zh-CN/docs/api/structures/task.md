# 任务对象

* `program` 字符串 - 要执行的程序的路径，通常你需要指定 `process.execPath`，也就是打开当前程序的路径
* `arguments` 字符串- 给 `program` 这个程序执行时的命令行参数。
* ` title ` 字符串 - 要在跳转列表中显示的字符串。
* `description` String - Description of this task.
* `iconPath` String - The absolute path to an icon to be displayed in a JumpList, which can be an arbitrary resource file that contains an icon. You can usually specify `process.execPath` to show the icon of the program.
* `iconIndex` Number - The icon index in the icon file. If an icon file consists of two or more icons, set this value to identify the icon. If an icon file consists of one icon, this value is 0.