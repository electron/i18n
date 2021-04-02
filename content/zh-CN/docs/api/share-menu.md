## 类： 共享梅努

> 在 macOS 上创建共享菜单。

进程：[主进程](../glossary.md#main-process)

`ShareMenu` 类在 macOS 上创建 [共享菜单][share-menu] ，可用于 共享从当前上下文到应用、社交媒体 帐户和其他服务的信息。

有关将共享菜单作为其他菜单的子菜单，请使用 [`MenuItem`](menu-item.md)的 `shareMenu` 角色。

### `新共享梅努（共享网站）`

* `sharingItem` 共享网站 - 要共享的项目。

创建新的共享菜单。

### 实例方法

`shareMenu` 对象具有以下实例方法：

#### `分享梅努. 弹出窗口 （[options]）`

* `options` 弹出选项（可选）
  * `browserWindow` [BrowserWindow](browser-window.md) (可选) - 默认为选中窗口.
  * `x` Number (可选) - 默认为当前鼠标的位置。 如果指定了`y`，则该选项必选。
  * `y` Number (可选) - 默认为当前鼠标的位置。 如果指定了`x`，则该选项必选。
  * `positioningItem` 编号（可选） _macOS_ - 要 的菜单项索引位于指定坐标的鼠标光标下。 默认值为 -1。
  * `callback` Function (optional) - 会在菜单关闭后被调用.

将此菜单作为 browserWindow <a> 中的上下文菜单弹出。</p> 



<h4 spaces-before="0">
  <code>分享梅努. 特写 （[browserWindow]）</code>
</h4>

<ul>
  <li>
    <code>browserWindow</code> <a href="browser-window.md">BrowserWindow</a> (可选) - 默认为选中窗口.
  </li>
</ul>

<p spaces-before="0">
  关闭 <code> browserWindow </code> 中的上下文菜单。
</p>

[share-menu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
