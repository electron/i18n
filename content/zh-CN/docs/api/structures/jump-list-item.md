# JumpListItem 对象

* `type` 字符串 (可选)-以下之一: 
  * ` task `-任务将启动具有特定参数的应用程序。
  * ` separator`-可用于分隔标准 ` Tasks ` 类别中的项目。
  * ` file `-一个文件的链接将使用创建跳转列表的应用程序打开文件, 为此, 应用程序必须注册为该文件类型的默认程序 (尽管它并不需要成为默认程序)。
* ` path `String (可选)-要打开的文件的路径, 只应在 ` type ` 为 ` file ` 时设置。
* ` program `String (可选)-要执行的程序的路径, 通常应该指定打开当前程序的 ` process.execPath `。 只应在 ` type ` 是 ` task ` 时设置。
* `args` 字符串 (可选) - 程序执行时的命令行参数。只应在 ` type ` 为 ` task ` 时设置。
* ` title `String (可选)-要为跳转列表中的项显示的文本。只应在 ` type ` 为 ` task ` 时设置。
* `description` String (optional) - 任务描述 (会以浮动提示的方式显示). 只应在`type` 为 `task`时设置.
* `图标路径` 字符串 (可选项) - 在跳转列表中会显示一个使用绝对路径的图标，它可以是一个包含图标的任意资源文件 (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.