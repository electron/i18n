# 键盘快捷键

## 概览

该功能允许你为 Electron 应用程序配置应用和全局键盘快捷键。

## 示例

### 本地快捷键

应用键盘快捷键仅在应用程序被聚焦时触发。 要配置本地键盘快捷方式，在 [菜单][] 模块中创建 [菜单][] 时，需要指定 [`accelerator`][] 属性。

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/local'
康斯特 { Menu, MenuItem } =需要（"电子"）

const菜单=新菜单（）
菜单。附录（新菜单（+
  标签：'电子'，
  子菜单：[{
    角色：'帮助'，
    加速器：过程。平台=='达尔文'？ "Alt+Cmd+I"："Alt+Shift+I"，
    单击：（）=> {控制台.log（"电子岩石！"） [
  ]]
））

菜单。
```

> 注意：在上面的代码中，您可以看到基于用户的操作系统的 accelerator  差异。 对于MacOS，是 `Alt+Cmd+I`，而对于Linux 和 Windows，则是 `Alt+Shift+I`.

启动 Electron 应用程序后，你应该看到应用程序菜单以及您刚刚定义的本地快捷方式：

![带本地快捷方式的菜单](../images/local-shortcut.png)

如果您单击 `Help` 或按下定义的加速器，然后打开运行电子应用程序的终端 ，您将看到触发 `click` 事件后 生成的消息："电子岩石！

### 全局快捷键

要配置全球键盘快捷方式，您需要使用 [全球短切][] 模块来检测键盘事件，即使应用程序没有 键盘对焦。

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。

```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/global'
康斯特 { app, globalShortcut } =需要（'电子'）

应用程序。当准备好时。然后（）=> =
  全球短切.注册（'Alt+指挥官控制]I'，（）=> {
    控制台.log（'电子爱全球快捷方式！
  [）
}）然后（创建窗口）
```

> 注：在上面的代码中， `CommandOrControl` 组合在 macOS 上使用 `Command` ，在 Windows/Linux 上使用 `Control` 。

启动 Electron 应用程序后，如果您按下定义的键 组合，然后打开运行电子应用程序的终端， 您就会看到 Electron 喜欢全球快捷方式！

### 在浏览器窗口内的快捷方式

#### 使用 web APIs

如果您想在 [浏览器窗口][]内处理键盘快捷方式，您可以 使用 [添加事件列表 （） API][addEventListener-api]来收听 渲染器过程中</a> `keyup` 和 `keydown`DOM 事件。</p> 



```js
window.addEventListener('keyup', doSomething, true)
```


请注意，第三个参数 `true` 表示听者始终在其他听众之前接收 按键，因此他们无法 `stopPropagation()` 呼叫他们。



#### 拦截主进程中的事件

在调度页面中的`keydown`和`keyup`事件之前，会发出[`before-input-event`](../api/web-contents.md#event-before-input-event)事件。 它可以用于捕获和处理在菜单中不可见的自定义快捷方式。



##### 示例

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。



```javascript fiddle='docs/fiddles/features/keyboard-shortcuts/interception-from-main'
康斯特 { app, BrowserWindow } =需要（'电子'）

应用程序。当准备好时。。然后=> {
  const赢=新的浏览器窗口（{宽度：800， 高度： 600， webPrecons： { nodeIntegration: true } [）

  赢. loadfile （'索引.html'）
  赢. web 会议。 （事件，输入）=> {
    如果（输入控制 && 输入.key
.到下一个"i"）{
      控制台.log（"按下控制+I"）
      事件
  
    。
```


启动 Electron 应用程序后，如果您打开 电子应用程序运行的终端，并按下 `Ctrl+I` 键组合，您将 看到此关键组合被成功截获。



#### 使用第三方库

如果您不想进行手动快捷方式解析，有些库会 高级密钥检测，例如 [鼠标陷阱][]。 以下是在渲染进程中 `mousetrap` 的使用示例：



```js
鼠标陷阱. bind （'4'， （） => { 控制台.log （'4'） [）
捕鼠器. bind （'， （） => { 控制台.log （'显示快捷方式！ [）
鼠标陷阱。绑定（"esc"，（）=> {控制台.log（'逃生'）}， "键盘"）

//组合
鼠标陷阱.bind（"命令+shift+k"，（）=> {控制台.log（"命令移位k"）}）

//映射多个组合到相同的回调
鼠标陷阱.bind（[命令+k'，"ctrl+k"， （） => {
  控制台.log （'命令 k 或控制 k'）

  // 返回错误以防止默认行为和阻止事件冒泡
  返回虚假
}）

// gmail 样式序列
Mousetrap.bind （'g i'，（）=> {控制台.log（'转到收件箱'）}）
鼠标陷阱。绑定（'a'，（）=> {控制台.log（'选择所有'）}）

//科纳米代码！
Mousetrap.bind('up up down down left right left right b a enter', () => {
  console.log('konami code')
})
```

[菜单]: ../api/menu.md
[菜单]: ../api/menu-item.md
[全球短切]: ../api/global-shortcut.md
[`accelerator`]: ../api/accelerator.md
[浏览器窗口]: ../api/browser-window.md
[鼠标陷阱]: https://github.com/ccampbell/mousetrap
[addEventListener-api]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
