# Aksesibilidad

Making accessible applications is important and we're happy to provide functionality to [Devtron](https://electronjs.org/devtron) and [Spectron](https://electronjs.org/spectron) that gives developers the opportunity to make their apps better for everyone.

---

Ang mga pinag-iisipan sa mga Electron na aplikasyon ay katulad sa mga websayt na iyon dahil sila ay pawang naka-HTML. Gamit ang mga Electron na mga app, datapwat, hindi mo magagamit ang mga online na pinagkukunang-yaman para sa mga aksesibilidad na awdit dahil ang iyong app ay walang isang URL upang ituro ang awditor.

These features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Magbasa pa para sa isang buod ng mga kagamitan.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. Halimbawa:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Maari kang basahin ng higit pa tungkol sa tampok na ito sa [Spectron's dokumentasyon ](https://github.com/electron/spectron#accessibility-testing).

## DevtronDevtron

In Devtron, there is an accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![ang screenshot ng devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Pawang sa mga kagamitang ito ay gumagamit ng [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) na library na ginawa ng Google para sa Chrome. Matututo ka pa ng marami tungkol sa aksesibilidad na mga patakarang pang-awdit na ginagamit ng library na ito sa [wiki ng repositoring iyon](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Kung alam mo ang ilang mabuting mga kagamitang pang-aksesibilidad para sa Electron, idagdag ang mga ito sa mga aksesibilidad na dokumentasyon gamit ang isang pull request.

## Manually enabling accessibility features

Electron applications will automatically enable accessibility features in the presence of assistive technology (e.g. [JAWS](https://www.freedomscientific.com/products/software/jaws/) on Windows or [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) on macOS). Tingnan ang chrome na [dokumentasyon ng aksesibilidad](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) para sa mga karagdagang detalye.

You can also manually toggle these features either within your Electron application or by setting flags in third-party native software.

### Using Electron's API

By using the [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) API, you can manually expose Chrome's accessibility tree to users in the application preferences. Note that the user's system assistive utilities have priority over this setting and will override it.

### Within third-party software

#### macOS

On macOS, third-party assistive technology can toggle accessibility features inside Electron applications by setting the `AXManualAccessibility` attribute programmatically:

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
