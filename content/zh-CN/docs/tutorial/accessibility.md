# 辅助功能

创建具有辅助功能的应用程序是很重要的，我们很乐意介绍[Devtron](https://electron.atom.io/devtron)和[Spectron](https://electron.atom.io/spectron)，这两个新功能能让开发者们有机会让它们的应用程序对每个人都更加可用。

* * *

Electron 应用中的辅助功能和网站是相似的因为两者最终都是HTML. 然而, 对于Electron应用, 你不能使用在线资源用于辅助功能性审查, 因为你的应用没有一个URL可指向审查者.

然而这些新功能能将这些工具带到您的Electron应用中。您可以选择使用 Spectron 将审核添加到您的测试中, 或者在 DevTools 中用 Devtron。 继续阅读有关这两个工具的概要或阅读[ 辅助功能文档 ](https://electronjs.org/docs/tutorial/accessibility)获取更加详细的信息。

## Spectron

在Spectron测试框架中，现在你可以测试应用程序中的每个window和webview标签。例如：

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

你可以从这里获取更多信息。[Spectron的文档](https://github.com/electron/spectron#accessibility-testing)

## Devtron

在 Devtron 中, 有一个新的无障碍访问性的选项卡, 允许您审核应用程序中的某个页面, 并对审核结果进行排序和筛选。

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the [accessibility documentation](https://electronjs.org/docs/tutorial/accessibility) with a pull request.

## Enabling Accessibility

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### Inside Application

By using [`app.setAccessibilitySupportEnabled(enabled)`](https://electron.atom.io/docs/api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

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