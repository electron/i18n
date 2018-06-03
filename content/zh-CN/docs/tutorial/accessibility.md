# 辅助功能

为程序制作辅助功能是很重要的。在这里，我们很高兴地向你们介绍[Devtron](https://electronjs.org/devtron)和[Spectron](https://electronjs.org/spectron)。这两个新功能有机会使开发者们让他们的应用程序更加可用。

* * *

Accessibility concerns in Electron applications are similar to those of websites because they're both ultimately HTML. With Electron apps, however, you can't use the online resources for accessibility audits because your app doesn't have a URL to point the auditor to.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Read on for a summary of the tools.

## Spectron

在测试框架Spectron中，你可以审查应用程序中的每个window和`<webview>`标签。例如：

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

你可以从这里[Spectron文档](https://github.com/electron/spectron#accessibility-testing)阅读到更多有关于这个功能的信息。

## Devtron

在 Devtron 中, 有一个新的辅助功能选项卡, 允许您对应用程序中的某一个页面进行审核, 并对审核结果进行排序和筛选。

![devtron 截图](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

这两种工具都使用了Google 为 Chrome 所构建的 [ 辅助功能开发工具 ](https://github.com/GoogleChrome/accessibility-developer-tools) 库。 您可以在 [ repository's wiki ](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules) 上了解到更加详细的辅助功能审核规则。

If you know of other great accessibility tools for Electron, add them to the accessibility documentation with a pull request.

## 启用辅助功能

由于性能原因, Electron应用程序在默认情况下禁用了辅助功能, 不过你可以通过多种方法启用它们。

### 应用程序内部

By using [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### 辅助功能技术

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