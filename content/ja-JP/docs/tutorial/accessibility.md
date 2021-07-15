# アクセシビリティ

アクセシビリティの高いアプリケーションを作ることは重要です。私たちは、開発者がすべてのユーザとってより良いアプリケーションを開発することを手助けする機能として [Devtron][devtron] と [Spectron][spectron] を提供してます。

---

Electron アプリケーションのアクセシビリティに関する懸念は、どちらも最終的に HTML であるため、ウェブサイトと同様です。 しかし、Electron アプリケーションでは、アプリケーションに監査機を指す URL がないため、アクセシビリティ監査にオンラインリソースを使用することはできません。

これらの機能は、監査ツールを Electron アプリに提供します。 Spectron でテストに監査を追加するか、開発者向けツール内で Devtron で監査を使用するかを選択できます。 ツールの概要については、以下を参照してください。

## Spectron

Spectron テストフレームワークで、アプリケーション内の各ウィンドウと `<webview>` タグを監視できます。 以下がその例です。

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

この機能の詳細は [Spectron のドキュメント][spectron-a11y] にて閲覧できます。

## Devtron

In Devtron, there is an accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![devtron スクリーンショット][4]

これらのツールはいずれも、Google for Chrome で作成された [Accessibility Developer Tools][a11y-devtools] ライブラリを使用しています。 このライブラリが使用しているアクセシビリティ監査のルールに関する詳細は、[リポジトリの wiki][a11y-devtools-wiki] に記載されています。

Electron 向けの他の優れたアクセシビリティツールについて知っている場合は、アクセシビリティドキュメントにプルリクエストを加えてください。

## Manually enabling accessibility features

Electron applications will automatically enable accessibility features in the presence of assistive technology (e.g. [JAWS](https://www.freedomscientific.com/products/software/jaws/) on Windows or [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) on macOS). 詳細については、Chrome の [アクセシビリティドキュメント][a11y-docs] を参照してください。

You can also manually toggle these features either within your Electron application or by setting flags in third-party native software.

### Using Electron's API

[`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] API を使うことで、アプリケーション設定で Chrome のアクセシビリティを有効にする機能を手動設置できます。 Note that the user's system assistive utilities have priority over this setting and will override it.

### Within third-party software

#### macOS

On macOS, third-party assistive technology can toggle accessibility features inside Electron applications by setting the `AXManualAccessibility` attribute programmatically:

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
