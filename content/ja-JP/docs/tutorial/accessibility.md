# アクセシビリティ

アクセシビリティの高いアプリケーションを作ることは重要です。開発者がすべてのユーザとってより良いアプリケーションを開発することを手助けする新機能、[Devtron](https://electronjs.org/devtron) と [Spectron](https://electronjs.org/spectron) をご紹介いたします。

* * *

Electron アプリケーションのアクセシビリティに関する懸念は、どちらも最終的に HTML であるため、ウェブサイトと同様です。 しかし、Electron アプリケーションでは、アプリケーションに監査機を指す URL がないため、アクセシビリティ監査にオンラインリソースを使用することはできません。

これらの新機能は、監査ツールを Electron アプリに提供します。 Spectron でテストに監査を追加するか、開発者向けツール内で Devtron で監査を使用するかを選択できます。 ツールの概要については、以下を参照してください。

## Spectron

Spectron テストフレームワークで、アプリケーション内の各ウィンドウおよび `<webview>` タグを監査できます。以下に例を示します。

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

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

これらのツールはいずれも、Google for Chrome で作成された [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) ライブラリを使用しています。 このライブラリが使用しているアクセシビリティ監査のルールに関する詳細は、[リポジトリの wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules) に記載されています。

If you know of other great accessibility tools for Electron, add them to the accessibility documentation with a pull request.

## アクセスビリティの有効化

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### アプリケーション側で有効にする

By using [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### Assistive Technology

Electron application will enable accessibility automatically when it detects assistive technology (Windows) or VoiceOver (macOS). See Chrome's [accessibility documentation](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) for more details.

On macOS, third-party assistive technology can switch accessibility inside Electron applications by setting the attribute `AXManualAccessibility` programmatically:

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