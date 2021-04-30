# ShortcutDetails 对象

* ` target `字符串-该快捷方式启动的目标。
* `workingDirectory` String(可选) - 当前工作目录。 默认值为空。
* `args` String (optional) - 从此快捷方式启动时，该参数将被赋予`target` 默认值为空。
* ` description `String (optional)-快捷方式的说明. 默认为空值。
* `icon` String(optional) - 设置快捷方式的图标的路径 `icon` 和`iconIndex` 必须一起设置。 默认是空的，使用的是target属性的图标。
* `iconIndex` Number (可选) - 当 `icon` 格式为DLL 或 EXE时图标的资源ID。 默认值为 0。
* `appUserModelId` String (optional) - 使用者模式ID 默认为空值。
* `toastActivatorClsid` String (可选) - 应用程序 Toast Activator CLSID。 需要加入 Action Center。
