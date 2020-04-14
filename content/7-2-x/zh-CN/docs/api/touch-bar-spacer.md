## 类: TouchBarSpacer

> 在mac os应用中，为touch bar中的相邻项之间留白

Process: [Main](../tutorial/application-architecture.md#main-and-renderer-processes)

### `new TouchBarSpacer(options)` _Experimental_

* `options` Object
  * `size` String (optional) - Size of spacer, possible values are:
    * `small` - Small space between items.
    * `large` - Large space between items.
    * `flexible` - Take up all available space.
