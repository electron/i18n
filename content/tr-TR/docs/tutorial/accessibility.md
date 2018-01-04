# Erişilebilirlik

Erişilebilir uygulamalar yapmak önemlidir ve geliştiricilere uygulamalarını herkes için daha iyi hale getirme olanağı veren [Devtron](https://electron.atom.io/devtron) ve [Spectron](https://electron.atom.io/spectron)'e yeni işlevler sunmaktan mutluluk duyuyoruz.

* * *

Elektron uygulamalarında erişilebilirlik endişeleri web sitelerinin erişilebilirliği endişeleri hem sonuçta hem de HTML'dir. Bununla birlikte, Electron uygulamalarıyla çevrimiçi kaynaklar erişilebilirlik denetimleri için kullanılamaz; çünkü uygulamanız denetleyiciyi işaret edecek bir URL'ye sahip değildir.

Bu yeni özellikler, denetim araçlarını electron uygulamanıza getirir. Spectron'la testlerinize denetimler eklemeyi veya Devtron ile DevTools'ta denetimleri kullanmayı seçebilirsiniz. Daha fazla bilgi için araçların bir özetini okuyun veya [accessibility documentation](https://electronjs.org/docs/tutorial/accessibility) kontrol edin.

## Spectron

Spectron test çerçevesinde, uygulamanızda her pencereyi ve `<webview>` etiketini denetleyebilirsiniz. Örneğin:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

You can read more about this feature in [Spectron's documentation](https://github.com/electron/spectron#accessibility-testing).

## Devtron

Devtron'da, uygulamanızda bir sayfayı kontrol etmenize, sonuçları sıralamanıza ve filtrelemenize imkan tanıyan yeni bir erişilebilirlik sekmesi bulunur.

![devtron Ekran Görüntüsü](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the [accessibility documentation](https://electronjs.org/docs/tutorial/accessibility) with a pull request.

## Erişilebilirliği Etkinleştirmek

Elektron uygulamaları erişilebilirliğini performans nedenleriyle varsayılan olarak devre dışı bırakır fakat etkinleştirmek için birçok yol vardır.

### İç uygulama

[`app.setAccessibilitySupportEnabled(enabled)`](https://electron.atom.io/docs/api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) kullanarak kullanıcılarınıza uygulama ayarlarında erişilebilirlik seçeneği sunablilirsiniz. Kullanıcının sistem yardım araçları, bu ayar üzerinde önceliğe sahiptir ve onu geçersiz kılacaktır.

### Yardımcı teknoloji

Elektron uygulaması, yardımcı teknolojiyi (Windows) veya VoiceOver'ı (Mac Os) algıladığında otomatik olarak erişilebilirlik sağlayacaktır. See Chrome's [accessibility documentation](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) for more details.

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