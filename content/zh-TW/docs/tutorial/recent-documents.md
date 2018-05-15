# 最近的文件 (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

**捷徑清單 (JumpList):**

![捷徑清單最近的檔案](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**應用程式 Dock 選單:**

![macOS Dock 選單](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

要將檔案加到最近的文件清單中，可以使用 [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

你也可以使用 [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API 清空最近的文件清單:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Windows 注意事項

要在 Windows 上使用這項功能，你的應用程式必須註冊為該檔案類型的處理常式 (Handler)。不然就算將檔案加入清單了，也不會出現在捷徑清單中。 你可以在[應用程式註冊](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx)中找到如何註冊應用程式的資訊。

當使用者點了捷徑清單的檔案後，系統會啟動你應用程式的新執行個體，並將該檔案的檔名路徑帶入命令列參數。

## macOS 注意事項

當檔案由最近的文件選單中被點擊，`app` 模組的 `open-file` 事件會被觸發。