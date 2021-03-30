# Windows のタスクバー

## 概要

Electron には Windows のタスクバー中のアプリアイコンを設定するための API があります。 このAPIは、[`ジャンプリスト` の作成](#jumplist)、[カスタムサムネイルやツールバー](#thumbnail-toolbars) などの Windows 専用機能と、[アイコンオーバーレイ](#icon-overlays-in-taskbar)、いわゆる ["枠点滅" 効果](#flash-frame)、[最近開いたドキュメント][recent-documents]、[アプリケーションの進捗状況][progress-bar] などのクロスプラットフォーム機能があります。

## ジャンプ リスト

Windows では、ユーザがタスクバーのアプリのアイコンを右クリックしたときに表示されるカスタムコンテキストメニューを定義できます。 このコンテキストメニューは `ジャンプ リスト` と呼ばれます。 ジャンプリストの `タスク` カテゴリのカスタムアクションを指定します。以下は [MSDN][msdn-jumplist] からの引用です。

> アプリケーションは、プログラムの機能と、ユーザがそれらを使用することが期待されるべきことの両方に基づいてタスクを定義します。 タスクを実行するためにアプリケーションを実行する必要がないという点で、タスクはコンテキストフリーである必要があります。 それらは、電子メールのメッセージを作成したり、メールプログラムでカレンダーを開いたり、ワープロで新しい文書を作成したり、特定のモードでアプリケーションを起動したりするなど、通常のユーザーがアプリケーションで実行する統計的に最も一般的なアクション、またはそのサブコマンドの1つでもあります。 アプリケーションは、標準ユーザが必要としない高度な機能や、登録などの1回限りの操作でメニューを乱雑にするべきではありません。 アップグレードや特別オファーなどのプロモーションの道具にタスクを使用しないでください。
> 
> タスクリストは静的にすることを強く推奨します。 これはアプリケーションの状態や状態に関係なく、同じままにするべきです。 リストを動的に変更することは可能ですが、宛先リストのその部分が変更されることを期待していないユーザを混乱させる可能性があることを考慮する必要があります。

![Internet Explorer](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> 注意: 上のスクリーンショットは、Internet Explorer の一般的なタスクの例です。

実際のメニューである macOS のドックメニューとは異なり、Windows のユーザータスクはアプリケーションショートカットのように機能します。 例えば、ユーザーがタスクをクリックするとプログラムを指定の引数で実行します。

アプリケーションにユーザタスクを設定するには、以下のように [app.setUserTasks][setusertaskstasks] API を使用します。

#### サンプル

##### ユーザータスクをセットする

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

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

##### タスクリストを消去する

タスクリストを消去するには、`main.js` ファイルで `app.setUserTasks` に空の配列を渡して呼び出す必要があります。

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> 注意: ユーザータスクはアプリケーションを閉じた後も表示されるので、タスクに指定したアイコンとプログラムのパスは、アプリケーションがアンインストールされるまで存在するべきです。

### サムネイルツールバー

Windows では、アプリケーションウィンドウのタスクバーレイアウトに、指定されたボタンを含むサムネイルツールバーを追加できます。 ウィンドウを復元したりアクティブにしたりすることなく、特定のウィンドウのコマンドにアクセスする方法をユーザーに提供します。

以下は [MSDN][msdn-thumbnail] からの引用です。

> このツールバーは、おなじみの標準ツールバー共通コントロールです。 最大で7つのボタンを持てます。 各ボタンのID、画像、ツールチップ、および状態は構造体で定義され、その構造体はタスクバーに渡されます。 アプリケーションは、現在の状態に応じてサムネイルツールバーからボタンを表示、有効化、無効化、または非表示にさせることができます。
> 
> たとえば、Windows Media Player では、再生、一時停止、ミュート、停止などの標準のメディア送りコントロールを提供できます。

![Windows Media Player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> 注意: 上のスクリーンショットは、Windows メディアプレイヤーのサムネイルツールバーの例です。

アプリケーションにサムネイルツールバーを設定するには、[BrowserWindow.setThumbarButtons][setthumbarbuttons] を使用する必要があります。

#### サンプル

##### サムネイルツールバーをセットする

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

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

##### サムネイルツールバーを消去する

サムネイルツールバーをきれいにするには、`main.js` で以下のように `BrowserWindow.setThumbarButtons` を空の配列で呼び出してください。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### タスクバー内のアイコンオーバーレイ

Windows では、タスクバーボタンで小さなオーバーレイを使用してアプリケーションのステータスを表示できます。

以下は [MSDN][msdn-icon-overlay] からの引用です。

> アイコンオーバーレイは状況のコンテキスト通知として機能し、その情報をユーザーに伝達するための別の通知領域ステータスアイコンの必要性を否定することを目的としています。 たとえば、現在通知領域に表示されている Microsoft Outlook の新着メールステータスは、タスクバーボタンの上にオーバーレイ表示されるようになりました。 繰り返しますが、開発サイクルの中でどの方法があなたのアプリケーションに最適であるかを決める必要があります。 オーバーレイアイコンは、ネットワークステータス、メッセンジャーステータス、新着メールなど、重要な長期にわたるステータスや通知を提供することを目的としています。 ユーザには、絶えず変化するオーバーレイやアニメーションを表示してはいけません。

![タスクバーボタン上のオーバーレイ](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> 注意: 上のスクリーンショットは、タスクバーボタンのオーバーレイの例です。

ウインドウのオーバーレイアイコンを設定するには、[BrowserWindow.setOverlayIcon][setoverlayicon] API を使用する必要があります。

#### サンプル

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### 枠の点滅

Windows では、タスクバーボタンをハイライトしてユーザの注意を引くことができます。 これは macOS で Dock アイコンがバウンスするのに似ています。

以下は [MSDN][msdn-flash-frame] からの引用です。

> 通常、ウィンドウは注意が必要でも現在キーボードフォーカスがないことをユーザーに知らせるために点滅します。

BrowserWindow のタスクバーボタンを点滅させるには、[BrowserWindow.flashFrame][flashframe] API を使用する必要があります。

#### サンプル

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> 注意: `win.flashFrame(false)` を呼び出して点滅を切ることを、忘れないようにしてください。 上記の例ではウインドウがフォーカスされたときに呼び出されますが、タイムアウトなどのイベントを使用して無効にすることもできます。

[msdn-jumplist]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks

[msdn-thumbnail]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars

[msdn-icon-overlay]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays

[msdn-flash-frame]: https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
