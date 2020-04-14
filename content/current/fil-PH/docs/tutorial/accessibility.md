# Aksesibilidad

Ang paggawa ng mga naa-acess na mga aplikasyon ay mahalaga, at masaya kaming ipakilala ang bagong mga functionality sa [Devtron](https://electronjs.org/devtron) at [Spectron](https://electronjs.org/spectron) na nagbibigay sa mga tagabuo ng mga oportunidad na gawing mas maganda ang kanilang mga app para sa lahat.

---

Ang mga pinag-iisipan sa mga Electron na aplikasyon ay katulad sa mga websayt na iyon dahil sila ay pawang naka-HTML. Gamit ang mga Electron na mga app, datapwat, hindi mo magagamit ang mga online na pinagkukunang-yaman para sa mga aksesibilidad na awdit dahil ang iyong app ay walang isang URL upang ituro ang awditor.

Ang mga katangiang ito ay magdadala ng mga kagamitang pang-awdit sa iyong Electron na app. Maaari mong piliing magdagdag ng mga awdit gamit ang Spectron o gamitin ang mga ito sa loob ng DevTools gamit ang Devtron. Magbasa pa para sa isang buod ng mga kagamitan.

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

Sa Devtron, may isang bagong aksesibilidad na tab na nagpapa-awdit sa iyong ng isang pahina sa iyong app, ayusin at linisin ang mga resulta.

![ang screenshot ng devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Pawang sa mga kagamitang ito ay gumagamit ng [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) na library na ginawa ng Google para sa Chrome. Matututo ka pa ng marami tungkol sa aksesibilidad na mga patakarang pang-awdit na ginagamit ng library na ito sa [wiki ng repositoring iyon](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Kung alam mo ang ilang mabuting mga kagamitang pang-aksesibilidad para sa Electron, idagdag ang mga ito sa mga aksesibilidad na dokumentasyon gamit ang isang pull request.

## Paganahin ang aksesibilidad

Ang mga Electron na aplikasyon ay nagpapanatili sa aksesibilidad na nakahindto sa default para sa pagganap na mga dahilan, pero may maraming mga paraan para paganahin ito.

### Loobang aplikasyon

Sa paggamit ng [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), maipapalabas mo ang switch ng aksesibilidad sa mga tagagamit sa mga kagustuhan ng aplikasyon. Ang mga kagamitang tumutulong ng sistema para sa tagagamit ay may prayoridad sa setting na ito at lalagpasan ito.

### Teknolohiyang assistive

Ang Electron na aplikasyon ay awtomatikong magpapagana sa aksesibilidad kapag napansin nito ang asistibong teknolohiya (Windows) o VoiceOver (macOS). Tingnan ang [dokumentasyon sa aksesibilidad](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) ng Chrome para sa karagdagang detalye.

Sa macOS, ang pangatlong partidong asistibong teknolohiya ay makakabago sa aksesibilidad sa loob ng ma Electron na aplikasyon sa pamamagitan ng pagtiyak sa katangiang `AXManualAccessibility` sa programatikong paraan:

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
