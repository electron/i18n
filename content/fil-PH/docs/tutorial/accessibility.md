# Aksesibilidad

Ang paggawa ng mga naa-acess na mga aplikasyon ay mahalaga, at masaya kaming ipakilala ang bagong mga functionality sa [Devtron](https://electronjs.org/devtron) at [Spectron](https://electronjs.org/spectron) na nagbibigay sa mga tagabuo ng mga oportunidad na gawing mas maganda ang kanilang mga app para sa lahat.

* * *

Ang mga pinag-iisipan sa mga Electron na aplikasyon ay katulad sa mga websayt na iyon dahil sila ay pawang naka-HTML. Gamit ang mga Electron na mga app, datapwat, hindi mo magagamit ang mga online na pinagkukunang-yaman para sa mga aksesibilidad na awdit dahil ang iyong app ay walang isang URL upang ituro ang awditor.

Ang mga katangiang ito ay magdadala ng mga kagamitang pang-awdit sa iyong Electron na app. Maaari mong piliing magdagdag ng mga awdit gamit ang Spectron o gamitin ang mga ito sa loob ng DevTools gamit ang Devtron. Magbasa pa para sa isang buod ng mga kagamitan.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. For example:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Maari kang basahin ng higit pa tungkol sa tampok na ito sa [Spectron's dokumentasyon ](https://github.com/electron/spectron#accessibility-testing).

## DevtronDevtron

In Devtron, there is a new accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![ang screenshot ng devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the accessibility documentation with a pull request.

## Paganahin ang aksesibilidad

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### Loobang aplikasyon

By using [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### Teknolohiyang assistive

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