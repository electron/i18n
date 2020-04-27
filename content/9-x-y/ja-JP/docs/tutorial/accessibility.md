# アクセシビリティ

アクセシビリティの高いアプリケーションを作ることは重要です。開発者がすべてのユーザとってより良いアプリケーションを開発することを手助けする新機能、[Devtron](https://electronjs.org/devtron) と [Spectron](https://electronjs.org/spectron) をご紹介いたします。

---

Electron アプリケーションのアクセシビリティに関する懸念は、どちらも最終的に HTML であるため、ウェブサイトと同様です。 しかし、Electron アプリケーションでは、アプリケーションに監査機を指す URL がないため、アクセシビリティ監査にオンラインリソースを使用することはできません。

これらの新機能は、監査ツールを Electron アプリに提供します。 Spectron でテストに監査を追加するか、開発者向けツール内で Devtron で監査を使用するかを選択できます。 ツールの概要については、以下を参照してください。

## Spectron

Spectron テストフレームワークで、アプリケーション内の各ウィンドウと `<webview>` タグを監視できます。 以下に例を示します。

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

この機能の詳細は [Spectron のドキュメント](https://github.com/electron/spectron#accessibility-testing) にて閲覧できます。

## Devtron

Devtron には、新しいアクセシビリティタブがあり、アプリ内のページを監査し、結果を並べ替えてフィルタリングすることができます。

![devtron スクリーンショット](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

これらのツールはいずれも、Google for Chrome で作成された [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) ライブラリを使用しています。 このライブラリが使用しているアクセシビリティ監査のルールに関する詳細は、[リポジトリの wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules) に記載されています。

Electron 向けの他の優れたアクセシビリティツールについて知っている場合は、アクセシビリティドキュメントにプルリクエストを加えてください。

## アクセシビリティの有効化

Electron アプリケーションは、パフォーマンス上の理由によって標準でアクセシビリティが無効になっていますが、有効にする方法は複数あります。

### アプリケーション側で有効にする

[`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) を使って、アプリケーション設定にアクセシビリティの有効化機能を設けられます。 ユーザーのシステムが持つアシスト機能はこの設定より優先され、設定を上書きする可能性があります。

### 支援技術

Electron アプリケーションは、支援技術 (Windows) または VoiceOver (macOS) を検出すると自動的にアクセシビリティを有効にします。 詳細については、Chrome の [アクセシビリティドキュメント](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) を参照してください。

macOS では、サードパーティの支援技術は、`AXManualAccessibility` という属性をプログラムによって設定することで、Electron アプリケーション内のアクセシビリティを切り替えることができます。

```objc
CFStringRef kAXManualAccessibility = CFSTR("AXManualAccessibility");

+ (void)enableAccessibility:(BOOL)enable inElectronApplication:(NSRunningApplication *)app
{
    AXUIElementRef appRef = AXUIElementCreateApplication(app.processIdentifier);
    if (appRef == nil)
        return;

    CFBooleanRef value = enable ? kCFBooleanTrue : kCFBooleanFalse;
    AXUIElementSetAttributeValue(appRef, kAXManualAccessibility, value);
    CFRelease(appRef);
}
```
