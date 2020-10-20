# 最近使った書類 (Windows & macOS)

## 概要

Windows と macOS は、それぞれジャンプリストまたは Dock メニューを介して、アプリケーションによって開かれた最近の書類のリストへのアクセスを提供します。

__ジャンプリスト:__

![ジャンプリストの最近使った書類](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

__アプリケーションの Dock メニュー:__

![macOS の Dock メニュー](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

To add a file to recent documents, you need to use the [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API.

## サンプル

### Add an item to recent documents

Starting with a working application from the [Quick Start Guide](quick-start.md), add the following lines to the `main.js` file:

```javascript
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

### Windows での注意

To use this feature on Windows, your application has to be registered as a handler of the file type of the document, otherwise the file won't appear in JumpList even after you have added it. アプリケーションの登録に関するすべてのことは、[アプリケーションの登録](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx) にあります。

ユーザーがジャンプリストからファイルをクリックすると、アプリケーションの新しいインスタンスが、ファイルのパスがコマンドライン引数として追加されて起動されます。

### macOS での注意

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

最近使った書類メニューからファイルが要求されると、それに対して `app` モジュールの `open-file` イベントが発生します。
