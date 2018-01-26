# Aksesibilidad

Paggawa ng mga ma-access na applikasyon ay importante at masaya kami na ipakilala ang bagong pag-andar ng [Devtron](https://electronjs.org/devtron) at [Spectron](https://electronjs.org/spectron) nabibigay ito sa mga developer ng opportunidad upang mapabuti ang kanilang app para sa lahat.

* * *

Aksesibilidad ng mga alalahanin sa mga aplikasyon ng Elektron ay medyo kapareho sa mga website dahil pareho silang nasa huli ng HTML. Sa mga app ng elektron, Gayunpaman, hindi mo magagamit ang mga pagkukunan sa online para sa aksesibilidad dahil ang iyong app ay walang URL sa punto ng auditor sa.

Ang mga bagong tampok na ito ay dalhin ang mga tool sa pag-awdit sa iyong Elektron app. Maari kang pumili upang maidagdag ang mga pag-awdit sa iyong pag-subok sa Spectron o gamitin ang mga iyon sa loob ng DevTools sa Devtron. Basahin para sa buod ng mga tools o i-checkout ang aming [ aksesibilidad ng dokumentasyon ](https://electronjs.org/docs/tutorial/accessibility) para s karagdagang impormasyon.

## Spectron

Para sa pag-susubok ng framework spectron, maari kang mag-awdit ngayon sa bawsat window at `<webview>` i-tag in sa iyong aplikasyon. Halimbawa:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Maari kang basahin ng higit pa tungkol sa tampok na ito sa [Spectron's dokumentasyon ](https://github.com/electron/spectron#accessibility-testing).

## Devtron

Sa Devtron, may isang bagong tab ng aksesibilidad kung saan na pinahintulutan kayo na mag-awdit ng pahina sa iyong app, ayusin at salain ang mga resulta.

![ang screen ng devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Parehong sa mga kagamitan na ito ay ginagamit ng [ Mga kagamitan sa Aksesibilidad ng nag-develop](https://github.com/GoogleChrome/accessibility-developer-tools) binuong library sa google para sa chrome. Marami kang matutunan tungkol sa mga panuntunan sa aksesibilidad ng pag audit dito sa silid-aklatan na gumagamit ng [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Kung alam mo ang ibang malakong aksebilidad na mga kagamitan sa Elektron, idagdag ang mga ito sa [dokumentasyon ng aksebilidad](https://electronjs.org/docs/tutorial/accessibility) sa pull request.

## Paganahin ang aksesibilidad

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### Inside Application

By using [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

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