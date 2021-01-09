# アクセシビリティ

アクセスしやすいアプリケーションを作ることは重要であり、 [Devtron](https://electronjs.org/devtron) と [Spectron](https://electronjs.org/spectron) に 機能を提供することで、開発者は誰にとってもアプリをより良いものにすることができます。

---

Electron アプリケーションのアクセシビリティに関する懸念は、どちらも最終的に HTML であるため、ウェブサイトと同様です。 しかし、Electron アプリケーションでは、アプリケーションに監査機を指す URL がないため、アクセシビリティ監査にオンラインリソースを使用することはできません。

これらの機能は、これらの監査ツールを Electron アプリにもたらします。 Spectronでテストに監査を追加するか、Devtronでテストツール 内で監査を使用するかを選択できます。 ツールの概要については、以下を参照してください。

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

Devtronには、アプリ内の ページを監査し、結果を並べ替えてフィルタリングできるアクセシビリティタブがあります。

![devtron スクリーンショット](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

これらのツールはいずれも、Google for Chrome で作成された [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) ライブラリを使用しています。 このライブラリが使用しているアクセシビリティ監査のルールに関する詳細は、[リポジトリの wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules) に記載されています。

Electron 向けの他の優れたアクセシビリティツールについて知っている場合は、アクセシビリティドキュメントにプルリクエストを加えてください。

## アクセシビリティ機能を手動で有効にする

Electron アプリケーションは、 支援技術の存在下で自動的にアクセシビリティ機能を有効にします(e. をクリックします。 [Windows では JAWS](https://www.freedomscientific.com/products/software/jaws/) または macOS では [VoiceOver](https://help.apple.com/voiceover/mac/10.15/))。 詳細は Chrome の [アクセシビリティドキュメント](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) を参照してください。

これらの機能は Electron アプリケーション 内で手動で切り替えることも、サードパーティのネイティブソフトウェアにフラグを設定することもできます。

### Electron の API を使用する

[`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) API を使用すると、アプリケーション環境設定でChromeのアクセシビリティツリーをユーザーに手動で公開できます。 ユーザのシステム支援ユーティリティはこの設定よりも優先され、 はそれを上書きします。

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
