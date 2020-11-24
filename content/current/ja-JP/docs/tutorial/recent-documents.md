# 最近使った書類 (Windows & macOS)

## 概要

Windows と macOS は、それぞれジャンプリストまたは Dock メニューを介して、アプリケーションによって開かれた最近の書類のリストへのアクセスを提供します。

__ジャンプリスト:__

![ジャンプリストの最近使った書類](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

__アプリケーションの Dock メニュー:__

![macOS の Dock メニュー](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

最近のドキュメントにファイルを追加するには、 [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API を使用する必要があります。

## サンプル

### 最近使ったドキュメントに項目を追加

[クイックスタートガイド](quick-start.md)の作業アプリケーションから始めて、次の行を `main.js` ファイルに追加します。

```javascript
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

Electron アプリケーションを起動した後、アプリケーションアイコンを右クリックします。 追加したばかりのアイテムが表示されます。 このガイドでは、項目はプロジェクトのルートにある Markdown ファイルです:

![最近使った書類](../images/recent-documents.png)

### 最近使ったドキュメントのリストをクリアする

最近のドキュメントのリストをクリアするには、 main.js[ファイルの](../api/app.md#appclearrecentdocuments-macos-windows) `app.clearRecentDocuments` API を使用する必要があります。

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## 追加情報

### Windows での注意

Windows でこの機能を使用する際にアプリケーションが書類のファイルタイプのハンドラとして登録されていない場合、ファイルを追加してもジャンプリストに表示されません。 アプリケーションの登録に関するすべてのことは、[アプリケーションの登録](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx) にあります。

ユーザーがジャンプリストからファイルをクリックすると、アプリケーションの新しいインスタンスが、ファイルのパスがコマンドライン引数として追加されて起動されます。

### macOS での注意

#### アプリメニューに「最近使用したドキュメント」リストを追加

メニューテンプレートに 以下のコードスニペットを追加することで、メニューアイテムにアクセスし、最近のドキュメントを消去することができます。

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

![macOS 最近使ったドキュメントメニュー項目](https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png)

最近使った書類メニューからファイルが要求されると、それに対して `app` モジュールの `open-file` イベントが発生します。
