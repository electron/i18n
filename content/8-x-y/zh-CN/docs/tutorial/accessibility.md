# 辅助功能

为程序制作辅助功能是很重要的。在这里，我们很高兴地向你们介绍[Devtron][devtron]和[Spectron][spectron]。这两个新功能有机会使开发者们让他们的应用程序更加可用。

---

Electron 应用中有关辅助功能的开发和网站是相似的，因为两者最终使用的都是HTML. 然而, 对于Electron应用, 你不能使用在线的辅助功能审查者, 因为你的应用没有一个URL可以提供给审查者.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. 详见各工具的文档.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. 例如：

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

你可以从这里[Spectron文档][spectron-a11y]阅读到更多有关于这个功能的信息。

## Devtron

在 Devtron 中, 有一个新的辅助功能选项卡, 允许您对应用程序中的某一个页面进行审核, 并对审核结果进行排序和筛选。

![devtron 截图][4]

这两种工具都使用了Google 为 Chrome 所构建的 [ 辅助功能开发工具 ][a11y-devtools] 库。 您可以在 [ repository's wiki ][a11y-devtools-wiki] 上了解到更加详细的辅助功能审核规则。

如果你知道其他适用于Electron的辅助功能开发工具, 请通过pull request添加到本文档中.

## 启用辅助功能

由于性能原因, Electron应用程序在默认情况下禁用了辅助功能, 不过你可以通过多种方法启用它们。

### 应用程序内部

通过使用 [` app.setAccessibilitySupportEnabled(enabled) `][setAccessibilitySupportEnabled], 可以在应用程序首选项中向用户开放辅助功能的开关。 用户的系统的辅助实用程序优先于此设置, 并将覆盖它。

### 辅助功能技术

Electron应用在检测到辅助功能技术(Windows) 或VoiceOver(macOS) 时会自动启用辅助功能 有关详细信息, 请参阅 Chrome 的 [ 辅助功能文档 ][a11y-docs]。

在 macOS 上, 在Electron应用中，可以通过 ` AXManualAccessibility `来切换第三方的辅助功能：

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
