# Task 对象

* `program` 字符串 - 要执行的程序的路径，通常你需要指定 `process.execPath`，也就是打开当前程序的路径
* `arguments` 字符串- 给 `program` 这个程序执行时的命令行参数。
* ` title ` 字符串 - 要在跳转列表中显示的字符串。
* `description` String - 任务描述.
* `iconPath` String - 在JumpList对象中显示的图标的绝对路径，JumpList对象可以是包含图标的任意资源文件。 通常可以指定`process.execPath`属性显示程序的图标.
* `iconIndex` Number - 图标文件中的索引. 如果一个图标文件包含多个图标，设置此属性指定是哪个图标. 如果图标文件只包含一个图标，此属性值为0.
* `workingDirectory` String (optional) - The working directory. Default is empty.
