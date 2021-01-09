## 类: TouchBarSpacer

> 在mac os应用中，为touch bar中的相邻项之间留白

进程：[主进程](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new BrowserView(可选)` _实验功能_

* `选项` 对象
  * `size` String (optional) - Size of spacer, possible values are:
    * ` small `-项之间的留较小间距。 Maps to `NSTouchBarItemIdentifierFixedSpaceSmall`. This is the default.
    * ` large `-项之间的留较大间距。 Maps to `NSTouchBarItemIdentifierFixedSpaceLarge`.
    * ` flexible `-补齐所有可用空间。 Maps to `NSTouchBarItemIdentifierFlexibleSpace`.
