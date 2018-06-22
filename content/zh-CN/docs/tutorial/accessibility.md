# 辅助功能

为程序制作辅助功能是很重要的。在这里，我们很高兴地向你们介绍[Devtron](https://electronjs.org/devtron)和[Spectron](https://electronjs.org/spectron)。这两个新功能有机会使开发者们让他们的应用程序更加可用。

* * *

Electron 应用中有关辅助功能的开发和网站是相似的，因为两者最终使用的都是HTML. 然而, 对于Electron应用, 你不能使用在线的辅助功能审查者, 因为你的应用没有一个URL可以提供给审查者.

然而这些新功能将这些审查工具带到您的Electron应用中。您可以选择使用 Spectron 将审核添加到您的测试中, 或者在 DevTools 中使用 Devtron。 Read on for a summary of the tools.

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

通过使用 [` app.setAccessibilitySupportEnabled(enabled) `](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), 可以在应用程序首选项中向用户开放辅助功能的开关。 用户的系统的辅助实用程序优先于此设置, 并将覆盖它。

### 辅助功能技术

Electron应用在检测到辅助功能技术(Windows) 或VoiceOver(macOS) 时会自动启用辅助功能 有关详细信息, 请参阅 Chrome 的 [ 辅助功能文档 ](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology)。

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