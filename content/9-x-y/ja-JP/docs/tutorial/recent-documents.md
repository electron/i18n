# 最近使った書類 (Windows & macOS)

Windows と macOS は、それぞれジャンプリストまたは Dock メニューを介して、アプリケーションによって開かれた最近の書類のリストへのアクセスを提供します。

__ジャンプリスト:__

![ジャンプリストの最近使った書類](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

__アプリケーションの Dock メニュー:__

![macOS の Dock メニュー](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

最近の使った書類にファイルを追加するには、[app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API を使用します。

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

また、[app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API を使用して最近使った書類リストを空にすることもできます。

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## Windows での注意

Windows でこの機能を使用できるようにするには、アプリケーションをそのドキュメントファイル種別のハンドラとして登録する必要があります。でないと、ファイルを追加してもファイルがジャンプリストに表示されません。 アプリケーションの登録に関するすべてのことは、[アプリケーションの登録](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx) にあります。

ユーザーがジャンプリストからファイルをクリックすると、アプリケーションの新しいインスタンスが、ファイルのパスがコマンドライン引数として追加されて起動されます。

## macOS での注意

最近使った書類メニューからファイルが要求されると、それに対して `app` モジュールの `open-file` イベントが発生します。
