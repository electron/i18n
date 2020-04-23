## 类: TouchBarSpacer

> 在mac os应用中，为touch bar中的相邻项之间留白

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new BrowserView(可选)` _实验功能_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * ` small `-项之间的留较小间距。
    * ` large `-项之间的留较大间距。
    * ` flexible `-补齐所有可用空间。
