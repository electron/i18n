# 辅助功能

创建具有辅助功能的应用程序是很重要的，我们很乐意介绍[Devtron](https://electron.atom.io/devtron)和[Spectron](https://electron.atom.io/spectron)，这两个新功能能让开发者们有机会让它们的应用程序对每个人都更加可用。

* * *

Electron 应用中有关辅助功能的开发和网站是相似的因为两者最终使用的都是HTML. 然而, 对于Electron应用, 你不能使用在线的辅助功能审查者, 因为你的应用没有一个URL可以提供给审查者.

然而这些新功能将这些审查工具带到您的Electron应用中。您可以选择使用 Spectron 将审核添加到您的测试中, 或者在 DevTools 中使用 Devtron。 继续阅读可简要了解这两个工具或阅读[ 辅助功能文档 ](https://electronjs.org/docs/tutorial/accessibility)以获取更加详细的信息。

## Spectron

目前在Spectron测试框架中，你可以测试应用程序中的每个window和`<webview>`标签。例如：

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

这两种工具都使用了Google 为 Chrome 所构建的 [ 辅助功能开发工具 ](https://github.com/GoogleChrome/accessibility-developer-tools) 库。 您可以在该 [ repository's wiki ](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules) 上更加详细的了解这个库使用了哪些辅助功能审核规则。

如果您知道其他很好的Electron辅助功能工具, 请创建一个pull request来将它们添加到 [ 辅助功能文档 ](https://electronjs.org/docs/tutorial/accessibility) 中。

## 启用辅助功能

由于性能原因, Electron应用程序在默认情况下禁用了辅助功能, 但有多种方法可以启用它。

### 应用程序内部

通过使用 [` app.setAccessibilitySupportEnabled(enabled) `](https://electron.atom.io/docs/api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), 可以在应用程序首选项中向用户开放辅助功能的开关。 用户的系统的辅助实用程序优先于此设置, 并将覆盖它。

### 辅助功能技术

Electron应用在检测到辅助功能技术(Windows)或VoiceOver(macOS)时会自动启用辅助功能 有关详细信息, 请参阅 Chrome 的 [ 辅助功能文档 ](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology)。

在 macOS 上, 在Electron应用中第三方的辅助技术可以通过以编程的方式设置属性 ` AXManualAccessibility `来切换所使用的辅助功能：

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