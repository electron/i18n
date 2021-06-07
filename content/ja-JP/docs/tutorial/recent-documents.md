# 最近使った書類 (Windows & macOS)

## 概要

Windows と macOS は、それぞれジャンプリストまたは Dock メニューを介して、アプリケーションによって開かれた最近の書類のリストへのアクセスを提供します。

__ジャンプリスト:__

![ジャンプリストの最近使った書類][1]

__アプリケーションの Dock メニュー:__

![macOS の Dock メニュー][2]

## サンプル

### Managing recent documents

```javascript fiddle='docs/fiddles/features/recent-documents'
const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

const fileName = 'recently-used.md'
fs.writeFile(fileName, 'Lorem Ipsum', () => {
  app.addRecentDocument(path.join(__dirname, fileName))
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.clearRecentDocuments()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

#### Adding a recent document

To add a file to recent documents, use the [app.addRecentDocument][addrecentdocument] API.

Electron アプリケーションを起動した後、アプリケーションアイコンを右クリックします。 In this guide, the item is a Markdown file located in the root of the project. You should see `recently-used.md` added to the list of recent files:

![最近使った書類](../images/recent-documents.png)

#### Clearing the list of recent documents

To clear the list of recent documents, use the [app.clearRecentDocuments][clearrecentdocuments] API. In this guide, the list of documents is cleared once all windows have been closed.

## 追加情報

### Windows での注意

Windows でこの機能を使用する際にアプリケーションが書類のファイルタイプのハンドラとして登録されていない場合、ファイルを追加してもジャンプリストに表示されません。 You can find everything on registering your application in [Application Registration][app-registration].

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

以下のようにアプリケーションメニューを [`'ready'`](../api/app.md#event-ready) イベントより後に追加し、それより前では追加しないようにしてください。さもなくばメニューアイテムは無効になります。

```javascript
const { app, Menu } = require('electron')

const template = [
  // メニューテンプレートをこちらに
]
const menu = Menu.buildFromTemplate(template)

app.whenReady().then(() => {
  Menu.setApplicationMenu(menu)
})
```

![macOS 最近使った書類のメニューアイテム][6]

最近使った書類メニューからファイルが要求されると、それに対して `app` モジュールの `open-file` イベントが発生します。

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
