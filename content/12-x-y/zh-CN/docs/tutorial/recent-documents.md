# 最近文档 (Windows & macOS)

## 概览

Windows 和 macOS 分别通过打开跳转列表和dock菜单使应用程序能够快速的访问最近打开的文档列表。

__JumpList:__

![跳转列表最近的文件][1]

__应用 dock 菜单__

![macOS Dock 菜单][2]

To add a file to recent documents, you need to use the [app.addRecentDocument][addrecentdocument] API.

## 示例

### 将一个项目添加到最近文档

从起 [Quick Start Guide](quick-start.md) 示例的应用程序开始，将以下行添加到 `main.js` 文件：

```javascript
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

启动 Electron 应用程序后，右键点击应用程序图标。 您应该看到您刚刚添加的项目。 在本指南中，项目是位于项目根目录下的 Markdown 文件：

![最近文档](../images/recent-documents.png)

### 清除最近文档列表

To clear the list of recent documents, you need to use [app.clearRecentDocuments][clearrecentdocuments] API in the `main.js` file:

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## 补充资料

### Windows 注意事项

若要在 Windows 上使用此功能，您的应用程序必须注册为这类文件的处理程序。 否则，文件将不会在跳转列表中出现。 你可以在 [Application Registration][app-registration] 里找到所有关于注册事宜的说明。

当用户点击“跳转列表”上的一个文件时，系统会启动一个新的应用程序的实例 ，而文件的路径将作为一个命令行参数被传入这个实例。

### macOS 注意事项

#### 将最近文档列表添加到应用程序菜单

您可以添加菜单项以访问和清除最近的文档，方法是在菜单模板中添加以下代码片段：

```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"recentdocuments",
      "submenu":[
        {
          "label":"Clear Recent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

![macOS 最近文档菜单项][6]

从 "最近文档" 菜单中请求文件时, 将为其发出 ` app ` 模块的 ` open-file ` 事件。

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
