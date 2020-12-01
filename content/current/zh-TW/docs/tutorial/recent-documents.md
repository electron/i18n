# 最近的文件 (Windows & macOS)

## 概述

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

__捷徑清單 (JumpList):__

![捷徑清單最近的檔案](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

__應用程式 Dock 選單:__

![macOS Dock 選單](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

To add a file to recent documents, you need to use the [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API.

## 範例

### Add an item to recent documents

Starting with a working application from the [Quick Start Guide](quick-start.md), add the following lines to the `main.js` file:

```javascript fiddle='docs/fiddles/features/recent-documents'
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

After launching the Electron application, right click the application icon. You should see the item you just added. In this guide, the item is a Markdown file located in the root of the project:

![Recent document](../images/recent-documents.png)

### Clear the list of recent documents

To clear the list of recent documents, you need to use [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API in the `main.js` file:

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## Additional information

### Windows 注意事項

To use this feature on Windows, your application has to be registered as a handler of the file type of the document, otherwise the file won't appear in JumpList even after you have added it. 你可以在[應用程式註冊](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx)中找到如何註冊應用程式的資訊。

當使用者點了捷徑清單的檔案後，系統會啟動你應用程式的新執行個體，並將該檔案的檔名路徑帶入命令列參數。

### macOS 注意事項

#### Add the Recent Documents list to the application menu

You can add menu items to access and clear recent documents by adding the following code snippet to your menu template:

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

![macOS Recent Documents menu item](https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png)

當檔案由最近的文件選單中被點擊，`app` 模組的 `open-file` 事件會被觸發。
