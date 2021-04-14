## 类: TouchBarSpacer

> 在mac os应用中，为touch bar中的相邻项之间留白

进程：[主进程](../glossary.md#main-process)

### `新的触摸栏（选项）`

* `选项` 对象
  * `size` 字符串（可选） - 间隔器的大小，可能的值是：
    * ` small `-项之间的留较小间距。 地图到 `NSTouchBarItemIdentifierFixedSpaceSmall`。 这是默认值。
    * ` large `-项之间的留较大间距。 地图到 `NSTouchBarItemIdentifierFixedSpaceLarge`。
    * ` flexible `-补齐所有可用空间。 地图到 `NSTouchBarItemIdentifierFlexibleSpace`。

### 实例属性

下列属性可在 `TouchBarSpacer`实例中提供：

#### `触摸巴空间器。大小`

代表间隔器大小的 `String` 。  可以 `small`， `large` 或 `flexible`。
