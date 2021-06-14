# 最近使った書類 (Windows & macOS)

## 概要

Windows と macOS は、それぞれジャンプリストまたは Dock メニューを介して、アプリケーションによって開かれた最近の書類のリストへのアクセスを提供します。

__ジャンプリスト:__

![ジャンプリストの最近使った書類][1]

__アプリケーションの Dock メニュー:__

![macOS の Dock メニュー][2]

## サンプル

### 最近開いた書類の管理

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

#### 最近開いた書類の追加

最近開いた書類にファイルを追加するには、[app.addRecentDocument][addrecentdocument] API を使用します。

Electron アプリケーションを起動した後、アプリケーションアイコンを右クリックします。 このガイドでは、そのアイテムはプロジェクトのルートにある Markdown ファイルとなっています。 最近開いたファイルのリストに `recently-used.md` が追加されているはずです。

![最近使った書類](../images/recent-documents.png)

#### 最近開いた書類の消去

最近開いた書類のリストを消去するには、[app.clearRecentDocuments][clearrecentdocuments] API を使用します。 このガイドでは、すべてのウインドウを閉じた時点でその書類のリストは消去されます。

## 追加情報

### Windows での注意

Windows でこの機能を使用する際にアプリケーションが書類のファイルタイプのハンドラとして登録されていない場合、ファイルを追加してもジャンプリストに表示されません。 アプリケーションの登録については、[Application Registration][app-registration] にすべて記載されています。

ユーザーがジャンプリストからファイルをクリックすると、アプリケーションの新しいインスタンスが、ファイルのパスがコマンドライン引数として追加されて起動されます。

### macOS での注意

#### アプリケーションメニューに最近開いた書類を追加する

以下のコードスニペットをメニューテンプレートに追加することで、最近開いた書類にアクセスしたり消去したりするメニュー項目を追加できます。

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
