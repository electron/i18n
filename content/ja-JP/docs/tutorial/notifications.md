# 通知 (Windows、Linux、macOS)

## 概要

3 つのオペレーティングシステムはすべて、アプリケーションがユーザに通知を送信する手段を提供しています。 通知を表示する方法はメインプロセスとレンダラーのプロセスで異なります。

レンダラープロセスでは、現在実行中のオペレーティングシステムのネイティブ通知 API を使用する、[HTML5 通知 API](https://notifications.spec.whatwg.org/) で通知を送信して表示できます。

メインプロセスで通知を表示するには、[Notification](../api/notification.md) モジュールを使用する必要があります。

## サンプル

### レンダラープロセスで通知を表示する

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `index.html` ファイルの `</body>` タグを閉じる手前に以下の行を追加します。

```html
<script src="renderer.js"></script>
```

…そして `renderer.js` ファイルを追加します。

```javascript fiddle='docs/fiddles/features/notifications/renderer'
const NOTIFICATION_TITLE = 'Title'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked'

new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  .onclick = () => console.log(CLICK_MESSAGE)
```

Electron アプリケーションを起動すると、通知が表示されます。

![レンダラープロセスでの通知](../images/notification-renderer.png)

さらに、通知をクリックすると、DOM が更新されて "Notification clicked!" と表示されます。

### メインプロセスで通知を表示する

[クイックスタートガイド](quick-start.md) の作業用アプリケーションから始めることにして、 `main.js` ファイルを以下の行の通りに更新します。

```javascript fiddle='docs/fiddles/features/notifications/main'
const { Notification } = require('electron')

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

Electron アプリケーションを起動すると、以下のようなシステム通知が表示されるでしょう。

![メインプロセスでの通知](../images/notification-main.png)

## 追加情報

オペレーティングシステム間でのコードとユーザエクスペリエンスは似ていますが、微妙な違いがあります。

### Windows

* Windows 10 では、スタート画面に [アプリケーションユーザーモデル ID][app-user-model-id] でアプリへのショートカットをインストールしなければなりません。 これは開発中だとやり過ぎな可能性があるため、スタートメニューに `node_modules\electron\dist\electron.exe` を追加することも一つの手です。 エクスプローラーでそのファイルを開き、右クリックして 'スタート メニューにピン留めする' を選択します。 そして、通知を表示するにはメインプロセスに `app.setAppUserModelId(process.execPath)` の一行を追加する必要があります。
* Windows 8.1 と Windows 8 では、スタート画面に [アプリケーションユーザーモデル ID][app-user-model-id] でアプリへのショートカットをインストールしなければなりません。 注釈: ただし、スタート画面にピン留めする必要はありません。
* Windows 7 では、通知はカスタム実装を介して動作します。これは新しいシステムのネイティブのものと似た見た目になります。

Electronは、アプリケーションユーザーモデル ID の作業を自動化しようとしています。 Electron をインストール&アップデートフレームワーク Squirrel と共に使用すると、[ショートカットが自動的に正しく設定されます][squirrel-events]。 さらに、Electron は Squirrel が使用されたことを検出し、正しい値を指定して自動的に `app.setAppUserModelId()` を呼び出します。 開発中では、[`app.setAppUserModelId()`][set-app-user-model-id] を自身で呼び出す必要があります。

さらに、Windows 8では、通知本体の最大長は250文字で、Windowsチームは通知を200文字にすることを推奨しています。 この制限は Windows 10では削除されており、これは Windows チームは合理的にするために開発者の意見を聞いているということです。 巨大な量のテキスト (数千文字) を API に送信しようとすると、不安定になる可能性があります。

#### 高度な通知

Windows の以降のバージョンでは、カスタムテンプレート、イメージ、その他の柔軟な要素を使用した高度な通知が可能です。 これらの通知を (メインプロセスかレンダラープロセスから) 送信するには、`ToastNotification` と `TileNotification` オブジェクトを送るネイティブ Node アドオンを使用する、[electron-windows-notification](https://github.com/felixrieseberg/electron-windows-notifications) ユーザーランドモジュールを使用します。

ボタンを含む通知は `electron-windows-notifications` で機能しますが、返信を処理するには [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications) を使用する必要があります。これにより、必要な COM コンポーネントを登録し、入力したユーザーデータを使用して Electron アプリを呼び出すことができます。

#### 非通知 / プレゼンテーションモード

通知を送信することが許可されているかどうかを検出するには、ユーザーランドモジュールの [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) を使用します。

これにより、Windows が通知を無音で表示するかどうかを事前に判断することができます。

### macOS

macOS 上での通知は簡単ですが、[通知に関する Apple のヒューマンインタフェースガイドライン][apple-notification-guidelines] を理解しておく必要があります。

通知サイズは256バイトに制限されており、その制限を超えると切り捨てられることに注意してください。

#### おやすみモード / セッションステート

通知を送信することが許可されているかどうかを検出するには、[electron-notification-state][electron-notification-state] ユーザーランドモジュールを使用します。

これにより、通知が表示されるかどうかを事前に検出することができます。

### Linux

通知は、[デスクトップ通知仕様][notification-spec] (Cinnamon、Enlightenment、Unity、GNOME、KDE) に従ってデスクトップ環境の通知を表示できる `libnotify` を使用して送信されます。

[apple-notification-guidelines]: https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/

[electron-notification-state]: https://github.com/felixrieseberg/electron-notification-state

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
