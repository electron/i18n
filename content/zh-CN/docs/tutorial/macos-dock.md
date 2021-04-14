# macOS Dock

## 概览

Electron有API来配置macOS Dock中的应用程序图标。 仅 macOS API 存在以创建自定义基座菜单，但 Electron 也使用应用基座 图标作为跨平台功能的入口点，例如最近 [文档][recent-documents] 和</a>

应用进度。</p> 

一个自定义的Dock项也普遍用于为那些用户不愿意为之打开整个应用窗口的任务添加快捷方式。

__Terminal.app 的 Dock 菜单:__

![基座菜单][2]

要设置您的自定义 dock 菜单，您需要使用 [`app.dock.setmenu`](../api/dock.md#docksetmenumenu-macos) API，它仅在 macOS 上可用。



## 示例

从 [Quick Start Guide](quick-start.md) 中的应用开始，将以下内容更新到 `main.js`。



```javascript fiddle='docs/fiddles/features/macos-dock-menu'
康斯特 { app, Menu } = 要求 （"电子"）

续码头梅努 = 菜单。 构建从十月板 （[
  ]
    标签： "新窗口"，
    单击（）{控制台.log（"新窗口"）=
  }，{
    标签："新窗口与设置"，
    子月：[
      { label: 'Basic' }，
      { label: 'Pro' }
    ]
  }，
  {标签："新命令..." [
]）

应用程序。当准备好时。然后）=> {
  应用程序。dock.set梅努（码头梅努）
}）
```


启动 Electron 应用程序后，右键点击应用程序图标。 您应该可以看到您刚刚设置的自定义菜单：

![macOS dock 菜单](../images/macos-dock-menu.png)

[2]: https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png
[recent-documents]: ./recent-documents.md
