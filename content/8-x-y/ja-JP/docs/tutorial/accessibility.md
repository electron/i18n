# アクセシビリティ

アクセシビリティの高いアプリケーションを作ることは重要です。開発者がすべてのユーザとってより良いアプリケーションを開発することを手助けする新機能、[Devtron][devtron] と [Spectron][spectron] をご紹介いたします。

---

Electron アプリケーションのアクセシビリティに関する懸念は、どちらも最終的に HTML であるため、ウェブサイトと同様です。 しかし、Electron アプリケーションでは、アプリケーションに監査機を指す URL がないため、アクセシビリティ監査にオンラインリソースを使用することはできません。

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. ツールの概要については、以下を参照してください。

## Spectron

Spectron テストフレームワークで、アプリケーション内の各ウィンドウと `<webview>` タグを監視できます。 以下に例を示します。

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

この機能の詳細は [Spectron のドキュメント][spectron-a11y] にて閲覧できます。

## Devtron

Devtron には、新しいアクセシビリティタブがあり、アプリ内のページを監査し、結果を並べ替えてフィルタリングすることができます。

![devtron スクリーンショット][4]

これらのツールはいずれも、Google for Chrome で作成された [Accessibility Developer Tools][a11y-devtools] ライブラリを使用しています。 このライブラリが使用しているアクセシビリティ監査のルールに関する詳細は、[リポジトリの wiki][a11y-devtools-wiki] に記載されています。

Electron 向けの他の優れたアクセシビリティツールについて知っている場合は、アクセシビリティドキュメントにプルリクエストを加えてください。

## アクセシビリティの有効化

Electron アプリケーションは、パフォーマンス上の理由によって標準でアクセシビリティが無効になっていますが、有効にする方法は複数あります。

### アプリケーション側で有効にする

[`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] を使って、アプリケーション設定にアクセシビリティの有効化機能を設けられます。 ユーザーのシステムが持つアシスト機能はこの設定より優先され、設定を上書きする可能性があります。

### 支援技術

Electron アプリケーションは、支援技術 (Windows) または VoiceOver (macOS) を検出すると自動的にアクセシビリティを有効にします。 詳細については、Chrome の [アクセシビリティドキュメント][a11y-docs] を参照してください。

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

[4]: https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png

[devtron]: https://electronjs.org/devtron
[spectron]: https://electronjs.org/spectron
[spectron-a11y]: https://github.com/electron/spectron#accessibility-testing
[a11y-docs]: https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology
[a11y-devtools]: https://github.com/GoogleChrome/accessibility-developer-tools
[a11y-devtools-wiki]: https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
[setAccessibilitySupportEnabled]: ../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows
