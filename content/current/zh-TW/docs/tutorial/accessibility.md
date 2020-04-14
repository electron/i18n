# 協助工具

應用程式的易用性很重要，所以我們在 [Devtron](https://electronjs.org/devtron) 及 [Spectron](https://electronjs.org/spectron) 中加入了新功能，讓開發人員更容易打造出適用每個人的應用程式。

---

Electron 應用程式中的易用性考量與網站類似，畢竟兩者都是 HTML。 然而，你不能用線上的資源來稽查 Electron 應用程式的易用性，畢竟應用程式根本沒有網址可以給稽查程式用。

這些新功能讓你能稽查 Electron 應用程式。你可以用 Spectron 將稽查項目放進測試案例裡，或是透過 Devtron 直接在 DevTools 中使用。 Read on for a summary of the tools.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. For example:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

你可以在 [Spectron 說明文件](https://github.com/electron/spectron#accessibility-testing)中看到這個功能的更多資訊。

## Devtron

Devtron 中有新的「協助工具」頁籤，讓你能稽查應用程式中的頁面，並能排序或篩選結果。

![devtron 擷圖](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

上述兩組工具都是用 Google 為了 Chrome 打造的 [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) 程式庫。 你可以在這個函式庫的[儲存庫 Wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules) 中找到易用性稽查規則的詳細資訊。

If you know of other great accessibility tools for Electron, add them to the accessibility documentation with a pull request.

## 啟用協助工具

基於效能考量，Electron 預設是停用協助工具的，但提供了多種方式來啟用。

### 在應用程式中

透過 [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows)，你可以把協助工具的開關放在應用程式喜好設定中，讓使用者自行決定。 使用者系統上的輔助工具優先權更高，會蓋過這項設定值。

### 輔具

Electron 應用程式偵測到輔助技術 (Windows) 或 VoiceOver (macOS) 時，會自動開啟協助工具。 細節可參考 Chrome 的 [協助工具文件](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology)。

在 macOS 裡，第三方輔具可以程式化設定 `AXManualAccessibility` 屬性來開啟或關閉 Electron 應用程式中的協助工具:

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
