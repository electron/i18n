# 辅助功能

为程序制作辅助功能是很重要的。在这里，我们很高兴地向你们介绍[Devtron][devtron]和[Spectron][spectron]。这两个新功能有机会使开发者们让他们的应用程序更加可用。

---

Electron 应用中有关辅助功能的开发和网站是相似的，因为两者最终使用的都是HTML. 然而, 对于Electron应用, 你不能使用在线的辅助功能审查者, 因为你的应用没有一个URL可以提供给审查者.

这些功能将会提供一些审查工具给你的Electron 应用。 您可以选择使用 Spectron 将审查添加到你的测试环境中，或在开发者工具（DevTools）中使用Devtron。 详见各工具的文档.

## Spectron

在 Spectron 测试框架中，您现在可以审核每个窗口， `<webview>` 标签在您的应用程序中。 例如：

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

你可以从这里[Spectron文档][spectron-a11y]阅读到更多有关于这个功能的信息。

## Devtron

在Devtron，有一个辅助选项卡，您可以在您的应用中审核一个 页面，并排序和过滤结果。

![devtron 截图][4]

这两种工具都使用了Google 为 Chrome 所构建的 [ 辅助功能开发工具 ][a11y-devtools] 库。 您可以在 [ repository's wiki ][a11y-devtools-wiki] 上了解到更加详细的辅助功能审核规则。

如果你知道其他适用于Electron的辅助功能开发工具, 请通过pull request添加到本文档中.

## 手动启用辅助功能

当辅助技术存在时，Electron 应用程序将自动启用辅助功能（例如 Windows 上的 [JAWS](https://www.freedomscientific.com/products/software/jaws/) 或 macOS 上的 [VoiceOver](https://help.apple.com/voiceover/mac/10.15/)）。 有关详细信息, 请参阅 Chrome 的 [ 辅助功能文档 ][a11y-docs]。

您也可以在您的 Electron 应用程序 中手动切换这些功能，或者在第三方本机软件中设置标记。

### 使用 Electron 的 API

By using the [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] API, you can manually expose Chrome's accessibility tree to users in the application preferences. 请注意，用户的系统辅助工具优先于此设置并将覆盖它。

### 在第三方软件内

#### macOS

在 macOS 上，第三方辅助技术可以通过设置 `AXManualAccessibility` 属性来切换在 Electron 应用程序中的辅助功能 程序设计：

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
