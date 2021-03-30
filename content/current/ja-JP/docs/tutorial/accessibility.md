# アクセシビリティ

アクセシビリティの高いアプリケーションを作ることは重要です。私たちは、開発者がすべてのユーザとってより良いアプリケーションを開発することを手助けする機能として [Devtron][devtron] と [Spectron][spectron] を提供してます。

---

Electron アプリケーションのアクセシビリティに関する懸念は、どちらも最終的に HTML であるため、ウェブサイトと同様です。 しかし、Electron アプリケーションでは、アプリケーションに監査機を指す URL がないため、アクセシビリティ監査にオンラインリソースを使用することはできません。

これらの機能は、監査ツールを Electron アプリに提供します。 Spectron でテストに監査を追加するか、開発者向けツール内で Devtron で監査を使用するかを選択できます。 ツールの概要については、以下を参照してください。

## Spectron

Spectron テストフレームワークで、アプリケーション内の各ウィンドウと `<webview>` タグを監視できます。 例:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

この機能の詳細は [Spectron のドキュメント][spectron-a11y] にて閲覧できます。

## Devtron

Devtronには、アプリ内の ページを監査し、結果を並べ替えてフィルタリングできるアクセシビリティタブがあります。

![devtron screenshot][4]

これらのツールはいずれも、Google for Chrome で作成された [Accessibility Developer Tools][a11y-devtools] ライブラリを使用しています。 このライブラリが使用しているアクセシビリティ監査のルールに関する詳細は、[リポジトリの wiki][a11y-devtools-wiki] に記載されています。

Electron 向けの他の優れたアクセシビリティツールについて知っている場合は、アクセシビリティドキュメントにプルリクエストを加えてください。

## アクセシビリティ機能を手動で有効にする

Electron アプリケーションは、 支援技術の存在下で自動的にアクセシビリティ機能を有効にします(e. をクリックします。 [Windows では JAWS](https://www.freedomscientific.com/products/software/jaws/) または macOS では [VoiceOver](https://help.apple.com/voiceover/mac/10.15/))。 詳細については、Chrome の [アクセシビリティドキュメント][a11y-docs] を参照してください。

これらの機能は Electron アプリケーション 内で手動で切り替えることも、サードパーティのネイティブソフトウェアにフラグを設定することもできます。

### Electron の API を使用する

[`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] API を使うことで、アプリケーション設定で Chrome のアクセシビリティを有効にする機能を手動設置できます。 ユーザのシステム支援ユーティリティはこの設定よりも優先され、 はそれを上書きします。

### サードパーティ製ソフトウェア内

#### macOS

macOS では、サードパーティーの支援技術は Electron アプリケーション内で、 `AXManualAccessibility` 属性 をプログラム的に設定することでアクセシビリティ機能を切り替えることができます。

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
