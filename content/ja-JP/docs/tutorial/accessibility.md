# アクセシビリティ

アクセシビリティの高いアプリケーションを作ることは重要です。開発者がすべてのユーザとってより良いアプリケーションを開発することを手助けする新機能「[Devtron](https://electronjs.org/devtron)」および「[Spectron](https://electronjs.org/spectron)」をご紹介いたします。

* * *

Accessibility concerns in Electron applications are similar to those of websites because they're both ultimately HTML. With Electron apps, however, you can't use the online resources for accessibility audits because your app doesn't have a URL to point the auditor to.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Read on for a summary of the tools or checkout our [accessibility documentation](https://electronjs.org/docs/tutorial/accessibility) for more information.

## Spectron

Spectron テストフレームワークで、アプリケーション内の各ウィンドウおよび`<webview>`タグを監視できます。以下に例を示します。

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

この機能の詳細は[Spectronのドキュメント](https://github.com/electron/spectron#accessibility-testing)にて閲覧できます。

## Devtron

Devtronでは新機能のアクセシビリティタブが利用できます。このタブでは、アプリケーション内の監視結果をソートしたり、フィルタによって絞り込んだりできます。

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

いずれのツールも Google が Chrome 向けに開発した [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) ライブラリを利用しています。 このライブラリが使用しているアクセシビリティ監視のルールに関する詳細は、[リポジトリのwiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules) に記載されています。

これ以外の Electron 向けに使用可能な素晴らしいアクセシビリティツールをご存じの方は、 ぜひ[アクセシビリティに関するドキュメント](https://electronjs.org/docs/tutorial/accessibility) に追加してプルリクエストをお送りください。

## アクセスビリティの有効化

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### Inside Application

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