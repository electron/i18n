# Erişilebilirlik

Erişilebilir uygulamalar yapmak önemlidir ve geliştiricilere uygulamalarını herkes için daha iyi hale getirme olanağı veren [Devtron](https://electronjs.org/devtron) ve [Spectron](https://electronjs.org/spectron)'e yeni işlevler sunmaktan mutluluk duyuyoruz.

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

Bu özellik hakkında daha fazla bilgi bulabilirsiniz [Spectron's documentation](https://github.com/electron/spectron#accessibility-testing).

## Devtron

Devtron'da, uygulamanızda bir sayfayı kontrol etmenize, sonuçları sıralamanıza ve filtrelemenize imkan tanıyan yeni bir erişilebilirlik sekmesi bulunur.

![devtron Ekran Görüntüsü](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Bu araçların her ikisi de, Google Chrome tarafından oluşturulan [Erişilebilirlik Geliştirici Araçları](https://github.com/GoogleChrome/accessibility-developer-tools) kitaplığını kullanıyor. Bu kütüphanenin erişilebilirlik denetim kuralları hakkında daha fazla bilgi edinebilirsiniz.[repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Elektron için diğer büyük erişilebilirlik araçlarını biliyorsanız, bunları  erişilebilirlik belgeleri </ 0> bir çekme isteği ile ekleyiniz.</p> 

## Erişilebilirliği Etkinleştirmek

Elektron uygulamaları erişilebilirliğini performans nedenleriyle varsayılan olarak devre dışı bırakır fakat etkinleştirmek için birçok yol vardır.

### İç uygulama

[`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) ' i kullanarak, uygulama ayarlarında erişebilirlik anahtarını kullanıcılara gösterebilirsiniz. Kullanıcının sistem yardım araçları, bu ayar üzerinde önceliğe sahiptir ve onu geçersiz kılacaktır.

### Yardımcı teknoloji

Elektron uygulaması, yardımcı teknolojiyi (Windows) veya VoiceOver'ı (Mac Os) algıladığında otomatik olarak erişilebilirlik sağlayacaktır. Daha fazla ayrıntı için Chrome'un  erişilebilirlik belgelerine </ 0> inceleyin.</p> 

MacOS'ta üçüncü parti yardımcı teknolojisi, `AXManualAccessibility` özelliğini programlı olarak ayarlayarak, Electron uygulamaları içindeki erişilebilirliği değiştirebilir:

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