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

以降の Windows バージョンでは、カスタムテンプレート、イメージ、その他の柔軟な要素を使用した高度な通知が可能です。 To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with just `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Quiet Hours / Presentation Mode

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

## macOS

通知は、すぐに気づくことになるけどmacOS下では、[Apple のヒューマンインターフェイスガイドラインに関する通知](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html)を素直に読んだほうがいい でしょう。

通知サイズが 256 バイトに限定されて、その制限を超えると切り捨てられることに注意してください。

### 高度な通知

macOS以降のバージョンは、ユーザーがすぐに通知に返信できるように、入力フィールドに通知できます。 入力フィールドから通知を送信するためには、ユーザランドモジュール [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier) を使用します。

### Do not disturb / Session State

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.