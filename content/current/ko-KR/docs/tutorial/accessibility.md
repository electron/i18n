# 접근성

Making accessible applications is important and we're happy to provide functionality to [Devtron](https://electronjs.org/devtron) and [Spectron](https://electronjs.org/spectron) that gives developers the opportunity to make their apps better for everyone.

---

Electron 애플리케이션과 웹사이트 모두 궁극적으로는 HTML을 사용하기 때문에 Electron 애플리케이션의 접근성 문제는 웹사이트의 접근성 문제와 유사합니다. 하지만 Electron 앱의 경우, 검증 도구(auditor)가 접근할 수 있는 URL을 가지고 있지 않기 때문에 접근성 검증에 온라인 자원을 사용할 수 없습니다.

These features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. 도구의 요약을 읽어보세요.

## Spectron

테스팅 프레임워크인 Spectron에서는 애플리케이션 안에 있는 각각의 window와 `<webview>` 태그를 검증할 수 있습니다. 예시:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

이 기능에 대한 자세한 내용은 [Spectron](https://github.com/electron/spectron#accessibility-testing)문서를 참고하세요.

## Devtron

In Devtron, there is an accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![devtron 스크린샷](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Chrome을 위해 구글이 개발한 [접근성 개발자 도구](https://github.com/GoogleChrome/accessibility-developer-tools) 라이브러리를 통해 이들 도구를 사용할 수 있습니다. 이 라이브러리가 사용하는 접근성 검증 규칙에 관해 자세히 알고 싶다면, [저장소 wiki 페이지](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules)를 참고하시길 바랍니다.

Electron에서 활용할 수 있는 괜찮은 접근성 도구를 알고 있다면 pull request를 이용해 접근성 문서에 해당 도구를 추가해주시길 바랍니다.

## Manually enabling accessibility features

Electron applications will automatically enable accessibility features in the presence of assistive technology (e.g. [JAWS](https://www.freedomscientific.com/products/software/jaws/) on Windows or [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) on macOS). 더 자세한 내용은 Chrome 의 [접근성 문서](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology)를 참고해주세요.

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
