# JumpListCategory 对象

* `type` 字符串 (可选)-以下之一: 
  * ` tasks `-此类别中的项目将放在标准 ` tasks ` 类别中。 只能有一个这样的类别, 它将始终显示在跳转列表的底部。
  * ` frequent `-显示应用程序经常打开的文件列表, 该类别的名称及其项由 Windows 设置。
  * ` recent `-显示应用程序最近打开的文件列表, 该类别的名称及其项由 Windows 设置。 可以使用 ` app. addRecentDocument (路径) ` 间接地将项目添加到此类别。
  * ` custom `-显示任务或文件链接, ` 名称 ` 必须由应用程序设置。
* ` name `字符串（可选的）--如果 `type` 是 `custom` 则必须设置, 否则应省略它。
* ` items`JumpListItem [] (可选)-如果 ` type ` 是 ` tasks ` 或 ` custom `, 则 [` JumpListItem `](jump-list-item.md) 对象的数组, 否则应省略它。

**注意:** 如果 `JumpListCategory` 对象没有设置 `type` 和 `name` 属性， name `type`默认为 `tasks`。 如果设置了 `name` 属性，省略了 `type` 属性，那么 `type` 默认为 `custom`.