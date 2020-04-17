# 접근성

애플리케이션의 접근성을 용이하게 만드는 것은 중요한 일입니다. 저희는 개발자들이 멋진 애플리케이션을 만들 수 있도록 [Devtron](https://electronjs.org/devtron)과 [Spectron](https://electronjs.org/spectron)을 개발 도구로 제공하고 있습니다.

---

Electron 애플리케이션과 웹사이트 모두 궁극적으로는 HTML을 사용하기 때문에 Electron 애플리케이션의 접근성 문제는 웹사이트의 접근성 문제와 유사합니다. 하지만 Electron 앱의 경우, 검증 도구(auditor)가 접근할 수 있는 URL을 가지고 있지 않기 때문에 접근성 검증에 온라인 자원을 사용할 수 없습니다.

Devtron과 Spectron 기능을 통해 Electron 앱에서 검증 도구를 사용할 수 있습니다. Spectron을 통해 여러분이 작성한 테스트를 검증하거나 개발 도구(DevTools)안에서 Devtron을 이용해 검증 도구를 사용할 수 있습니다. 도구의 요약을 읽어보세요.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. 예시:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

이 기능에 대한 자세한 내용은 [Spectron](https://github.com/electron/spectron#accessibility-testing)문서를 참고하세요.

## Devtron

Devtron에서는 신규 추가된 accessibility 탭을 통해 앱의 페이지를 검증하고, 결과를 정렬하거나 필터링할 수 있습니다.

![devtron 스크린샷](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Chrome을 위해 구글이 개발한 [접근성 개발자 도구](https://github.com/GoogleChrome/accessibility-developer-tools) 라이브러리를 통해 이들 도구를 사용할 수 있습니다. 이 라이브러리가 사용하는 접근성 검증 규칙에 관해 자세히 알고 싶다면, [저장소 wiki 페이지](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules)를 참고하시길 바랍니다.

Electron에서 활용할 수 있는 괜찮은 접근성 도구를 알고 있다면 pull request를 이용해 접근성 문서에 해당 도구를 추가해주시길 바랍니다.

## 접근성 활성화

Electron 애플리케이션은 성능을 위해 접근성을 기본적으로 비활성 상태로 설정했지만 다양한 방법으로 다시 활성화할 수 있습니다.

### 애플리케이션 내부

[`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows)을 이용해 애플리케이션 설정에서 사용자에게 접근성 스위치를 노출할 수 있습니다.. 사용자의 시스템에서 있는 손쉬운 사용 도구(assistive utilities)는 이 설정보다 우선권을 가지고 있기 때문에 애플리케이션 설정이 무시될 수 있습니다.

### 보조(assistive) 기술

Electron 애플리케이션은 보조 기술(Windows) 또는 VoiceOver (macOS)가 감지되면 자동으로 접근성을 활성화합니다. 보다 자세한 사항은 Chrome의 [접근성 문서](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology)를 참고하시길 바랍니다.

macOS에서 써드파티가 제공하는 보조 기술은 Electron 애플리케이션 내부에서 `AXManualAccessibility` 속성 코드를 설정하면 접근성을 변경할 수 있습니다:

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
