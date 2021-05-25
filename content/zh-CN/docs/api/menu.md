# Menu

## 菜单

> 创建原生应用菜单和上下文菜单。

进程：[主进程](../glossary.md#main-process)

### `new Menu()`

创建新菜单。

### 静态方法

`Menu`类有以下方法:

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

在macOS上将 `menu`设置成应用内菜单 在windows和Linux上，`menu` 将会被设置成窗口顶部菜单

在Windows和Linux中，可以在菜单的顶层标签的某个字母前添加`&`以绑定快捷键。 例如，使用`&File`后可以使用`Alt-F`呼出File的子选项。 The indicated character in the button label then gets an underline, and the `&` character is not displayed on the button label.

In order to escape the `&` character in an item name, add a proceeding `&`. For example, `&&File` would result in `&File` displayed on the button label.

传递 `null` 值可以禁用默认菜单。 在 Windows 和 Linux 上，使用此方法移除窗口上的菜单栏可能会有额外的效果。

**注释:**如果应用没有设置菜单的话，系统会生成一个默认菜单。 默认生成的菜单中包含了一些初始选项，例如 `文件`,`编辑`, `视图`,`窗口`,`帮助`。

#### `Menu.getApplicationMenu()`

返回 `Menu | null` - 如果有设置, 则返回应用程序菜单， 如果没设置，则返回 ` null `。

**注释:**返回的 `Menu`实例不支持动态添加或删除菜单项， 但仍然可以动态修改 [ 实例属性 ](#instance-properties)。

#### `Menu.sendActionToFirstResponder(action)` _macOS_

* `action` String

将 ` action ` 发送到应用程序的第一个响应方。 这用于模拟默认的 macOS 菜单行为。 通常你可以使用[`MenuItem`](menu-item.md#roles)的[`role`](menu-item.md)属性

有关 macOS 的本地操作的详细信息, 请参阅 [ macOS Cocoa Event Handling Guide ](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)。

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

返回 ` Menu `

一般来说， `template`是一个`options`类型的数组，用于构建[MenuItem](menu-item.md)。 使用方法可参考前文。

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### 实例方法

` menu ` 对象具有以下实例方法:

#### `menu.popup([options])`

* `options` Object (可选)
  * `window` [BrowserWindow](browser-window.md) (可选) - 默认为选中窗口.
  * `x` Number (可选) - 默认为当前鼠标的位置。 如果指定了`y`，则该选项必选。
  * `y` Number (可选) - 默认为当前鼠标的位置。 如果指定了`x`，则该选项必选。
  * `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. 默认值为 -1。
  * `callback` Function (optional) - 会在菜单关闭后被调用.

将此菜单作为 browserWindow <a> 中的上下文菜单弹出。</p> 



<h4 spaces-before="0">
  <code>menu.closePopup([browserWindow])</code>
</h4>

<ul>
  <li>
    <code>browserWindow</code> <a href="browser-window.md">BrowserWindow</a> (可选) - 默认为选中窗口.
  </li>
</ul>

<p spaces-before="0">
  关闭 <code> browserWindow </code> 中的上下文菜单。
</p>



<h4 spaces-before="0">
  <code>menu.append(menuItem)</code>
</h4>

<ul>
  <li>
    <code>menuItem</code> <a href="menu-item.md">MenuItem</a>
  </li>
</ul>

<p spaces-before="0">
  将 <code> menuItem </code> 追加到菜单。
</p>



<h4 spaces-before="0">
  <code>menu.getMenuItemById(id)</code>
</h4>

<ul>
  <li>
    <code>id</code> String
  </li>
</ul>

<p spaces-before="0">
  返回具有指定<code>id</code>项的<code>MenuItem | null</code>
</p>



<h4 spaces-before="0">
  <code>menu.insert(pos, menuItem)</code>
</h4>

<ul>
  <li>
    <code>pos</code> Integer
  </li>
  <li>
    <code>menuItem</code> <a href="menu-item.md">MenuItem</a>
  </li>
</ul>

<p spaces-before="0">
  将 <code> menuItem </code> 插入菜单的 <code> pos </code> 位置。
</p>



<h3 spaces-before="0">
  实例事件
</h3>

<p spaces-before="0">
  Objects created with <code>new Menu</code> or returned by <code>Menu.buildFromTemplate</code> emit the following events:
</p>

<p spaces-before="0">
  <strong x-id="1"> 注意: </strong>某些事件仅在特定的操作系统上可用, 这些方法会被标记出来。
</p>



<h4 spaces-before="0">
  事件: 'menu-will-show'
</h4>

<p spaces-before="0">
  返回:
</p>

<ul>
  <li>
    <code>event</code> Event
  </li>
</ul>

<p spaces-before="0">
  调用<code>menu.popup()</code>事件时触发该事件。
</p>



<h4 spaces-before="0">
  事件: 'menu-will-close'
</h4>

<p spaces-before="0">
  返回:
</p>

<ul>
  <li>
    <code>event</code> Event
  </li>
</ul>

<p spaces-before="0">
  手动关闭弹出，或使用 <code>menu.closePopup()</code>方法关闭弹出时，触发该事件。
</p>



<h3 spaces-before="0">
  实例属性
</h3>

<p spaces-before="0">
  <code> menu </code> 对象还具有以下属性:
</p>



<h4 spaces-before="0">
  <code>menu.items</code>
</h4>

<p spaces-before="0">
  包含菜单项的 <code> MenuItem [] </code> 数组。
</p>

<p spaces-before="0">
  每个 <code> 菜单 </code> 由多个 <a href="menu-item.md"><code> MenuItem </code></a>  组成, 每个 <code> MenuItem </code>可以有子菜单。
</p>



<h2 spaces-before="0">
  示例
</h2>

<p spaces-before="0">
  An example of creating the application menu with the simple template API:
</p>

<pre><code class="javascript">const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () =&gt; {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
</code></pre>



<h3 spaces-before="0">
  渲染进程
</h3>

<p spaces-before="0">
  To create menus initiated by the renderer process, send the required information to the main process using IPC and have the main process display the menu on behalf of the renderer.
</p>

<p spaces-before="0">
  Below is an example of showing a menu when the user right clicks the page:
</p>

<pre><code class="js">// renderer
window.addEventListener('contextmenu', (e) =&gt; {
  e.preventDefault()
  ipcRenderer.send('show-context-menu')
})

ipcRenderer.on('context-menu-command', (e, command) =&gt; {
  // ...
})

// main
ipcMain.on('show-context-menu', (event) =&gt; {
  const template = [
    {
      label: 'Menu Item 1',
      click: () =&gt; { event.sender.send('context-menu-command', 'menu-item-1') }
    },
    { type: 'separator' },
    { label: 'Menu Item 2', type: 'checkbox', checked: true }
  ]
  const menu = Menu.buildFromTemplate(template)
  menu.popup(BrowserWindow.fromWebContents(event.sender))
})
</code></pre>



<h2 spaces-before="0">
  MacOS中应用菜单注意事项
</h2>

<p spaces-before="0">
  macOS 相比于 Windows 和 Linux 有着完全不同的应用程序菜单。 以下是一些有关使应用菜单更像原生应用菜单的注意事项。
</p>



<h3 spaces-before="0">
  标准菜单
</h3>

<p spaces-before="0">
  MacOS有一些系统预定义的菜单，像是<a href="https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc"><code>Services</code></a> and <code>Windows</code>。 让你的菜单更像MacOS标准菜单，只需设置菜单<code>role</code>值为如下示之一，Electron便会自动认出并设置成标准菜单，：
</p>

<ul>
  <li>
    <code>window</code>
  </li>
  <li>
    <code>help</code>
  </li>
  <li>
    <code>services</code>
  </li>
</ul>



<h3 spaces-before="0">
  标准菜单项操作
</h3>

<p spaces-before="0">
  macOS 已经为某些菜单项提供了标准操作, 如 <code> about xxx </code>、<code> Hide xxx </code> 和 <code> Hide Others </code>。 若要将菜单项的操作设置为标准操作, 应设置菜单项的 <code>  role</code> 属性。
</p>



<h3 spaces-before="0">
  主菜单的名称
</h3>

<p spaces-before="0">
  在 macOS 中应用程序菜单的第一个项目的标签总是你的应用程序的名字, 无论你设置什么标签。 如要更改它, 请修改应用程序包的 <code> Info. plist </code> 文件。 有关详细信息, 请参阅 <a href="https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html" f-id="AboutInformationPropertyListFiles" lbb="2" fo="1"> About Information Property List Files </a>。
</p>



<h2 spaces-before="0">
  设置特定浏览器窗口的菜单 (<em x-id="3"> Linux </em> <em x-id="3"> Windows </em>)
</h2>

<p spaces-before="0">
  浏览器窗口的 <a href="https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows" f-id="setMenu" fo="2"> <code> setMenu </code> 方法 </a> 可以设置特定浏览器窗口的菜单。
</p>



<h2 spaces-before="0">
  菜单项位置
</h2>

<p spaces-before="0">
  你可以使用 <code>before</code>, <code>after</code>, <code>beforeGroupContaining</code>, <code>afterGroupContaining</code> 和 <code>id</code> 来控制由 <code>Menu.buildFromTemplate</code> 生成的菜单项的位置.
</p>

<ul>
  <li>
    <p spaces-before="0">
      <code>before</code> - 在指定的标签之前插入菜单项。 如果引用值不存在，那么该菜单项会插在这个菜单的尾部。 这还意味着，菜单项应该被放置在与引用项相同的组中。
    </p>
  </li>
  <li>
    <p spaces-before="0">
      <code>after</code> - 在指定的标签之后插入菜单项。 如果引用值不存在，那么该菜单项会插在这个菜单的尾部。 这还意味着，菜单项应该被放置在与引用项相同的组中。
    </p>
  </li>
  <li>
    <p spaces-before="0">
      <code>beforeGroupContaining</code> - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
    </p>
  </li>
  <li>
    <p spaces-before="0">
      <code>afterGroupContaining</code> - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.
    </p>
  </li>
</ul>

<p spaces-before="0">
  默认情况下，除非有位置相关的属性，所有的菜单项会按照模板中的顺序排放。
</p>



<h3 spaces-before="0">
  示例
</h3>

<p spaces-before="0">
  模板：
</p>

<pre><code class="javascript">[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
</code></pre>

<p spaces-before="0">
  菜单:
</p>

<pre><code class="sh">- 1
- 2
- 3
- 4
</code></pre>

<p spaces-before="0">
  模板：
</p>

<pre><code class="javascript">[
  { id: '1', label: 'one' },
  { type: 'separator' },
  { id: '3', label: 'three', beforeGroupContaining: ['1'] },
  { id: '4', label: 'four', afterGroupContaining: ['2'] },
  { type: 'separator' },
  { id: '2', label: 'two' }
]
</code></pre>

<p spaces-before="0">
  菜单:
</p>

<pre><code class="sh">- 3
- 4
- ---
- 1
- ---
- 2
</code></pre>

<p spaces-before="0">
  模板：
</p>

<pre><code class="javascript">[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
</code></pre>

<p spaces-before="0">
  菜单:
</p>

<pre><code class="sh">- ---
- 3
- 2
- 1
</code></pre>
