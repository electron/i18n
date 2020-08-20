# Windows のタスクバー

Electron には Windows のタスクバー中のアプリアイコンを設定するための API があります。 Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## ジャンプ リスト

Windows では、ユーザがタスクバーのアプリのアイコンを右クリックしたときに表示されるカスタムコンテキストメニューを定義できます。 このコンテキストメニューは `ジャンプ リスト` と呼ばれます。 以下の MSDN からの引用のとおり、ジャンプリストの `タスク` カテゴリでカスタムアクションを指定します。

> アプリケーションは、プログラムの機能と、ユーザがそれらを使用することが期待されるべきことの両方に基づいてタスクを定義します。 タスクを実行するためにアプリケーションを実行する必要がないという点で、タスクはコンテキストフリーである必要があります。 それらは、電子メールのメッセージを作成したり、メールプログラムでカレンダーを開いたり、ワープロで新しい文書を作成したり、特定のモードでアプリケーションを起動したりするなど、通常のユーザーがアプリケーションで実行する統計的に最も一般的なアクション、またはそのサブコマンドの1つでもあります。 アプリケーションは、標準ユーザが必要としない高度な機能や、登録などの1回限りの操作でメニューを乱雑にするべきではありません。 アップグレードや特別オファーなどのプロモーションの道具にタスクを使用しないでください。
> 
> タスクリストは静的にすることを強く推奨します。 これはアプリケーションの状態や状態に関係なく、同じままにするべきです。 リストを動的に変更することは可能ですが、宛先リストのその部分が変更されることを期待していないユーザを混乱させる可能性があることを考慮する必要があります。

__Internet Explorer のタスク:__

![Internet Explorer](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

実際のメニューである macOS のドックメニューとは異なり、Windows のユーザータスクはアプリケーションショートカットのように機能し、ユーザーがタスクをクリックするとプログラムが指定された引数で実行されます。

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API:

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

タスクリストをきれいにするには、以下のように `app.setUserTasks` を空の配列で呼び出してください。

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

ユーザのタスクはアプリケーションを閉じた後も表示されるので、タスクに指定されたアイコンとプログラムパスはアプリケーションがアンインストールされるまで存在するはずです。


## サムネイルツールバー

Windows では、アプリケーションウィンドウのタスクバーレイアウトに、指定されたボタンを含むサムネイルツールバーを追加できます。 ウィンドウを復元したりアクティブにしたりすることなく、特定のウィンドウのコマンドにアクセスする方法をユーザーに提供します。

MSDN から、以下の図解を引用します。

> このツールバーは、おなじみの標準ツールバー共通コントロールです。 最大で7つのボタンを持てます。 各ボタンのID、画像、ツールチップ、および状態は構造体で定義され、その構造体はタスクバーに渡されます。 アプリケーションは、現在の状態に応じてサムネイルツールバーからボタンを表示、有効化、無効化、または非表示にさせることができます。
> 
> たとえば、Windows Media Player では、再生、一時停止、ミュート、停止などの標準のメディア送りコントロールを提供できます。

__Windows Media Player のサムネイルツールバー:__

![Windows Media Player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons][setthumbarbuttons] to set thumbnail toolbar in your application:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

サムネイルツールバーをきれいにするには、以下のように `app.setUserTasks` を空の配列で呼び出してください。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```


## タスクバー内のアイコンオーバーレイ

Windowsでは、タスクバーボタンは小さなオーバーレイを使用してアプリケーションのステータスを表示できます。 以下は MSDN からの引用です。

> アイコンオーバーレイは状況のコンテキスト通知として機能し、その情報をユーザーに伝達するための別の通知領域ステータスアイコンの必要性を否定することを目的としています。 たとえば、現在通知領域に表示されている Microsoft Outlook の新着メールステータスは、タスクバーボタンの上にオーバーレイ表示されるようになりました。 繰り返しますが、開発サイクルの中でどの方法があなたのアプリケーションに最適であるかを決める必要があります。 オーバーレイアイコンは、ネットワークステータス、メッセンジャーステータス、新着メールなど、重要な長期にわたるステータスや通知を提供することを目的としています。 ユーザには、絶えず変化するオーバーレイやアニメーションを表示してはいけません。

__タスクバーボタン上のオーバーレイ:__

![タスクバーボタン上のオーバーレイ](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon][setoverlayicon] API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```


## 枠の点滅

Windows では、タスクバーボタンをハイライトしてユーザの注意を引くことができます。 これは macOS で Dock アイコンがバウンスするのに似ています。 以下は MSDN リファレンスドキュメントの引用です。

> 通常、ウィンドウは注意が必要でも現在キーボードフォーカスがないことをユーザーに知らせるために点滅します。

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame][flashframe] API:

```javascript
const { BrowserWindow } = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

`flashFrame` メソッドを `false` で呼び出して点滅を切ることを忘れないでください。 上記の例では、ウィンドウがフォーカスされたときに呼び出されますが、タイムアウトなどのイベントを使用して無効にすることができます。

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
