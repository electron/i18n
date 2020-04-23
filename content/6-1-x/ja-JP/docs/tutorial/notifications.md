# 通知 (Windows、Linux、macOS)

3つのオペレーティングシステムはすべて、アプリケーションがユーザに通知を送信する手段を提供します。 Electron は、 通知を表示するために、現在実行中のオペレーティングシステムのネイティブの通知 API を用いて、[HTML5 通知 API](https://notifications.spec.whatwg.org/) で開発者が便利に通知を送れるようにします。

**注釈:** これは HTML5 API であるため、レンダラープロセスでのみ利用可能です。 メインプロセスで通知を表示したい場合は、[Notification](../api/notification.md) モジュールを参照してください。

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

オペレーティングシステム間でのコードとユーザエクスペリエンスは似ていますが、微妙な違いがあります。

## Windows
* Windows 10 では、スタート画面に [アプリケーションユーザーモデル ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) でアプリへのショートカットをインストールしなければなりません。 これは開発中だとやり過ぎな可能性があるため、スタートメニューに `node_modules\electron\dist\electron.exe` を追加することも一つの手です。 エクスプローラーでそのファイルを開き、右クリックして 'スタート メニューにピン留めする' を選択します。 そして、通知を表示するにはメインプロセスに `app.setAppUserModelId(process.execPath)` の一行を追加する必要があります。
* Windows 8.1 と Windows 8 では、スタート画面に [アプリケーションユーザーモデル ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) でアプリへのショートカットをインストールしなければなりません。 注釈: ただし、スタート画面にピン留めする必要はありません。
* Windows 7 では、通知はカスタム実装を介して動作します。これは新しいシステムのネイティブのものと似た見た目になります。

Electronは、アプリケーションユーザーモデル ID の作業を自動化しようとしています。 Electron をインストール&アップデートフレームワーク Squirrel と共に使用すると、[ショートカットが自動的に正しく設定されます](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events)。 さらに、Electron は Squirrel が使用されたことを検出し、正しい値を指定して自動的に `app.setAppUserModelId()` を呼び出します。 開発中では、[`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) を自身で呼び出す必要があります。

さらに、Windows 8では、通知本体の最大長は250文字で、Windowsチームは通知を200文字にすることを推奨しています。 この制限は Windows 10では削除されており、これは Windows チームは合理的にするために開発者の意見を聞いているということです。 巨大な量のテキスト (数千文字) を API に送信しようとすると、不安定になる可能性があります。

### 高度な通知

最近のバージョンの Windows では、カスタムテンプレート、イメージ、その他の柔軟な要素を使用した高度な通知が可能です。 これらの通知を (メインプロセスやレンダラープロセスから) 送信するには、[electron-windows-notification](https://github.com/felixrieseberg/electron-windows-notifications) ユーザーランドモジュールを使用します。これは、`ToastNotification` と `TileNotification` オブジェクトを送るネイティブ Node アドオンです。

ボタンを含む通知は `electron-windows-notifications` で機能しますが、返信を処理するには [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications) を使用する必要があります。これにより、必要な COM コンポーネントを登録し、入力したユーザーデータを使用して Electron アプリを呼び出すことができます。

### 非通知 / プレゼンテーションモード

通知を送信することが許可されているかどうかを検出するには、[electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) ユーザーランドモジュールを使用します。

これにより、Windows が通知を無音で表示するかどうかを事前に判断することができます。

## macOS

macOS 上での通知は簡単ですが、[通知に関する Apple のヒューマンインタフェースガイドライン](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/) を理解しておく必要があります。

通知サイズは256バイトに制限されており、その制限を超えると切り捨てられることに注意してください。

### 高度な通知

macOS の以降のバージョンでは、ユーザがすぐに通知に返信できるように、入力フィールドつきの通知を利用できます。 入力フィールドつきの通知を送信するためには、[node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier) ユーザーランドモジュールを使用します。

### おやすみモード / セッションステート

通知を送信することが許可されているかどうかを検出するには、[electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) ユーザーランドモジュールを使用します。

これにより、通知が表示されるかどうかを事前に検出することができます。

## Linux

通知は、[デスクトップ通知仕様](https://developer.gnome.org/notification-spec/) (Cinnamon、Enlightenment、Unity、GNOME、KDE) に従ってデスクトップ環境の通知を表示できる `libnotify` を使用して送信されます。
