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

* Windows 10では、通知は "うまく動作します"。
* Windows 8.1と Windows 8では、スタート画面に [アプリケーションユーザーモデル ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) でアプリへのショートカットをインストールしなければなりません。 注釈: ただし、スタート画面にピン留めする必要はありません。
* Windows 7では、通知は新しいシステムのネイティブのものと視覚的に似ているカスタム実装を介して動作します。

さらに、Windows 8では、通知本体の最大長は250文字で、Windowsチームは通知を200文字にすることを推奨しています。 この制限は Windows 10では削除されており、これは Windows チームは合理的にするために開発者の意見を聞いているということです。 巨大な量のテキスト (数千文字) を API に送信しようとすると、不安定になる可能性があります。

### 高度な通知

Windows の以降のバージョンでは、カスタムテンプレート、イメージ、その他の柔軟な要素を使用した高度な通知が可能です。 これらの通知を (メインプロセスかレンダラープロセスから) 送信するには、`ToastNotification` と `TileNotification` オブジェクトを送るネイティブ Node アドオンを使用する、[electron-windows-notification](https://github.com/felixrieseberg/electron-windows-notifications) ユーザーランドモジュールを使用します。

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### 非通知 / プレゼンテーションモード

通知を送信することが許可されているかどうかを検出するには、[electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) ユーザーランドモジュールを使用します。

これにより、Windows が通知を無音で表示するかどうかを事前に判断することができます。

## macOS

macOS 上での通知は簡単ですが、[通知に関する Apple のヒューマンインタフェースガイドライン](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html) を理解しておく必要があります。

通知サイズは256バイトに制限されており、その制限を超えると切り捨てられることに注意してください。

### 高度な通知

macOS の以降のバージョンでは、ユーザがすぐに通知に返信できるように、入力フィールドつきの通知を利用できます。 入力フィールドつきの通知を送信するためには、[node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier) ユーザーランドモジュールを使用します。

### おやすみモード / セッションステート

通知を送信することが許可されているかどうかを検出するには、[electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) ユーザーランドモジュールを使用します。

これにより、通知が表示されるかどうかを事前に検出することができます。

## Linux

通知は、[デスクトップ通知仕様](https://developer.gnome.org/notification-spec/) (Cinnamon、Enlightenment、Unity、GNOME、KDE) に従ってデスクトップ環境の通知を表示できる `libnotify` を使用して送信されます。