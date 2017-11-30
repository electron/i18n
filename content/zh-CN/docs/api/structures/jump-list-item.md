# JumpListItem 对象

* `type` 字符串 (可选)-以下之一: 
  * ` task `-任务将启动具有特定参数的应用程序。
  * `separator` - Can be used to separate items in the standard `Tasks` category.
  * ` file `-一个文件的链接将使用创建跳转列表的应用程序打开文件, 为此, 应用程序必须注册为该文件类型的默认程序 (尽管它并不需要成为默认程序)。
* ` path `String (可选)-要打开的文件的路径, 只应在 ` type ` 为 ` file ` 时设置。
* `program` String (optional) - Path of the program to execute, usually you should specify `process.execPath` which opens the current program. Should only be set if `type` is `task`.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* ` title `String (可选)-要为跳转列表中的项显示的文本。只应在 ` type ` 为 ` task ` 时设置。
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.