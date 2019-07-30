## 菜单

> 创建原生应用菜单和上下文菜单。

进程：[主进程](../glossary.md#main-process)

### `new Menu()`

创建新菜单。

### 静态方法

menu类有以下静态方法：

#### `Menu.setApplicationMenu(menu)`

* `menu` Menu | null

当在MacOS、Windows、Linux中使用`menu`设置程序菜单时，会设置在各个程序窗体的顶层。

在Windows和Linux中，可以在菜单的顶层标签的某个字母前添加`&`以绑定快捷键。 例如，使用`&File`后可以使用`Alt-F`呼出File的子选项。 被绑定快捷键的字母将会以下划线标出。 `&`并不会在运行时显示

使用`null` 作为参数时将会隐藏默认菜单。在Windows和Linux上还有删除菜单的额外效果。

**Note:** 如果没有在app中设置一个菜单，系统会自动生成一个默认菜单， 默认生成的菜单中包含了一些初始选项，例如 `文件`,`编辑`, `视图`,`窗口`,`帮助`。

#### `Menu.getApplicationMenu()`

返回 `Menu | null` - 如果有设置, 则返回应用程序菜单， 如果没设置，则返回 ` null `。

** 注意: **返回的 ` menu ` 实例不支持动态添加或删除菜单项。 但仍然可以动态修改 [ 实例属性 ](#instance-properties)。

#### `Menu.sendActionToFirstResponder(action)` *macOS*

* `action` String

将 ` action ` 发送到应用程序的第一个响应方。 这用于模拟默认的 macOS 菜单行为。 通常你可以使用[`MenuItem`](menu-item.md#roles)的[`role`](menu-item.md)属性

有关 macOS 的本地操作的详细信息, 请参阅 [ macOS Cocoa Event Handling Guide ](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7)。

#### `Menu.buildFromTemplate(template)`

* `template` (MenuItemConstructorOptions | MenuItem)[]

返回 ` Menu `

一般来说 `template`是一个`options`类型的数组，用于构建一个 [MenuItem](menu-item.md)。使用情况可以在上文提及。

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### 实例方法

` menu ` 对象具有以下实例方法:

#### `menu.popup(options)`

* `options` Object (可选) 
  * `window` [BrowserWindow](browser-window.md) (可选) - 默认为选中窗口.
  * ` x ` 数字 (可选)-默认值是当前鼠标光标的位置。如果声明了 ` y `, 则必须声明。
  * ` y ` 数字 (可选)-默认值是当前鼠标光标的位置。如果声明了 ` x `, 则必须声明。
  * ` positioningItem `数字 (可选) * macOS *-要在指定坐标下的鼠标光标下定位的菜单项的索引。默认值为-1。
  * `callback` Function (optional) - 会在菜单关闭后被调用.

将此菜单作为 browserWindow <a> 中的上下文菜单弹出。</p> 

<h4>
  <code>menu.closePopup([browserWindow])</code>
</h4>

<ul>
  <li>
    <code>browserWindow</code> <a href="browser-window.md">BrowserWindow</a> (可选) - 默认为选中窗口.
  </li>
</ul>

<p>
  关闭 <code> browserWindow </code> 中的上下文菜单。
</p>

<h4>
  <code>menu.append(menuItem)</code>
</h4>

<ul>
  <li>
    <code>menuItem</code> <a href="menu-item.md">菜单项</a>
  </li>
</ul>

<p>
  将 <code> menuItem </code> 追加到菜单。
</p>

<h4>
  <code>menu.getMenuItemById(id)</code>
</h4>

<ul>
  <li>
    <code>id</code> String
  </li>
</ul>

<p>
  返回具有指定<code>id</code>项的<code>MenuItem</code>
</p>

<h4>
  <code>menu.insert(pos, menuItem)</code>
</h4>

<ul>
  <li>
    <code>pos</code> Integer
  </li>
  <li>
    <code>menuItem</code> <a href="menu-item.md">菜单项</a>
  </li>
</ul>

<p>
  将 <code> menuItem </code> 插入菜单的 <code> pos </code> 位置。
</p>

<h3>
  实例事件
</h3>

<p>
  Objects created with <code>new Menu</code> or returned by <code>Menu.buildFromTemplate</code> emit the following events:
</p>

<p>
  <strong> 注意: </strong>某些事件仅在特定的操作系统上可用, 这些方法会被标记出来。
</p>

<h4>
  事件: 'menu-will-show'
</h4>

<p>
  返回:
</p>

<ul>
  <li>
    <code>event</code> Event
  </li>
</ul>

<p>
  调用<code>menu.popup()</code>事件时触发该事件。
</p>

<h4>
  事件: 'menu-will-close'
</h4>

<p>
  返回:
</p>

<ul>
  <li>
    <code>event</code> Event
  </li>
</ul>

<p>
  手动关闭弹出，或使用 <code>menu.closePopup()</code>方法关闭弹出时，触发该事件。
</p>

<h3>
  实例属性
</h3>

<p>
  <code> menu </code> 对象还具有以下属性:
</p>

<h4>
  <code>menu.items</code>
</h4>

<p>
  包含菜单项的 <code> MenuItem [] </code> 数组。
</p>

<p>
  每个 <code> 菜单 </code> 由多个 <a href="menu-item.md"><code> MenuItem </code></a> 组成, 每个 <code> MenuItem </code>可以有子菜单。
</p>

<h2>
  示例
</h2>

<p>
  The <code>Menu</code> class is only available in the main process, but you can also use it in the render process via the <a href="remote.md"><code>remote</code></a> module.
</p>

<h3>
  Main process
</h3>

<p>
  An example of creating the application menu in the main process with the simple template API:
</p>

<pre><code class="javascript">const { app, Menu } = require('electron')

const template = [
  // { role: 'appMenu' }
  ...(process.platform === 'darwin' ? [{
    label: app.getName(),
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
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
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
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
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

<h3>
  Render process
</h3>

<p>
  Below is an example of creating a menu dynamically in a web page (render process) by using the <a href="remote.md"><code>remote</code></a> module, and showing it when the user right clicks the page:
</p>

<pre><code class="html">&lt;!-- index.html --&gt;
&lt;script&gt;
const { remote } = require('electron')
const { Menu, MenuItem } = remote

const menu = new Menu()
menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))

window.addEventListener('contextmenu', (e) =&gt; {
  e.preventDefault()
  menu.popup({ window: remote.getCurrentWindow() })
}, false)
&lt;/script&gt;
</code></pre>

<h2>
  MacOS中应用菜单注意事项
</h2>

<p>
  macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.
</p>

<h3>
  Standard Menus
</h3>

<p>
  On macOS there are many system-defined standard menus, like the <a href="https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc"><code>Services</code></a> and <code>Windows</code> menus. To make your menu a standard menu, you should set your menu's <code>role</code> to one of the following and Electron will recognize them and make them become standard menus:
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

<h3>
  Standard Menu Item Actions
</h3>

<p>
  macOS has provided standard actions for some menu items, like <code>About xxx</code>, <code>Hide xxx</code>, and <code>Hide Others</code>. To set the action of a menu item to a standard action, you should set the <code>role</code> attribute of the menu item.
</p>

<h3>
  Main Menu's Name
</h3>

<p>
  On macOS the label of the application menu's first item is always your app's name, no matter what label you set. To change it, modify your app bundle's <code>Info.plist</code> file. See <a href="https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html">About Information Property List Files</a> for more information.
</p>

<h2>
  设置特定浏览器窗口的菜单 (<em> Linux </em> <em> Windows </em>)
</h2>

<p>
  The <a href="https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows"><code>setMenu</code> method</a> of browser windows can set the menu of certain browser windows.
</p>

<h2>
  菜单项位置
</h2>

<p>
  You can make use of <code>before</code>, <code>after</code>, <code>beforeGroupContaining</code>, <code>afterGroupContaining</code> and <code>id</code> to control how the item will be placed when building a menu with <code>Menu.buildFromTemplate</code>.
</p>

<ul>
  <li>
    <code>before</code> - 在指定的标签之前插入菜单项。 如果引用值不存在，那么该菜单项会插在这个菜单的尾部。 这还意味着，菜单项应该被放置在与引用项相同的组中。
  </li>
  <li>
    <code>after</code> - 在指定的标签之后插入菜单项。 如果引用值不存在，那么该菜单项会插在这个菜单的尾部。 这还意味着，菜单项应该被放置在与引用项相同的组中。
  </li>
  <li>
    <code>beforeGroupContaining</code> - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
  </li>
  <li>
    <code>afterGroupContaining</code> - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.
  </li>
</ul>

<p>
  By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.
</p>

<h3>
  示例
</h3>

<p>
  Template:
</p>

<pre><code class="javascript">[
  { id: '1', label: 'one' },
  { id: '2', label: 'two' },
  { id: '3', label: 'three' },
  { id: '4', label: 'four' }
]
</code></pre>

<p>
  Menu:
</p>

<pre><code class="sh">&lt;br />- 1
- 2
- 3
- 4
</code></pre>

<p>
  Template:
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

<p>
  Menu:
</p>

<pre><code class="sh">&lt;br />- 3
- 4
- ---
- 1
- ---
- 2
</code></pre>

<p>
  Template:
</p>

<pre><code class="javascript">[
  { id: '1', label: 'one', after: ['3'] },
  { id: '2', label: 'two', before: ['1'] },
  { id: '3', label: 'three' }
]
</code></pre>

<p>
  Menu:
</p>

<pre><code class="sh">&lt;br />- ---
- 3
- 2
- 1
</code></pre>