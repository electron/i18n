# ShortcutDetails 对象

* ` target `字符串-该快捷方式启动的目标。
* ` cwd `字符串 (可选)-工作目录。默认值为空。
* ` args `字符串 (可选)-当从该快捷方式启动时要应用于 ` target ` 的参数。默认值为空。
* ` description `字符串 (可选)-快捷方式的说明。默认值为空。
* ` icon `字符串 (可选)-图标的路径, 可以是 DLL 或 EXE。` icon ` 和 ` iconIndex ` 必须一起设置。 默认使用该快捷方式指向的target的图标。
* `iconIndex` Number (可选) - 当 `icon` 格式为DLL 或 EXE时的资源ID. 默认值为0
* `appUserModelId` String (可选) - 应用程序用户模型ID. 默认值为空