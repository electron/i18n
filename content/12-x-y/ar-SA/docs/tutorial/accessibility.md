# إمكانية الوصول

Making accessible applications is important and we're happy to provide functionality to [Devtron][devtron] and [Spectron][spectron] that gives developers the opportunity to make their apps better for everyone.

---

شواغل إمكانية الوصول في تطبيقات إلكترون مماثلة لشواغل مواقع الويب لأنها في نهاية المطاف كلتاهما HTML. مع تطبيقات إلكترون مع ذلك لا يمكنك استخدام الموارد عبر الإنترنت لمراجعة إمكانية الوصول لأن تطبيقك ليس لديه عنوان URL لتوجيه مراجع الحسابات إليه.

These features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. تابع القراءة لملخص الأدوات.

## Spectron

في إطار اختبار Spectron، يمكنك الآن مراجعة كل نافذة و `<webview>` علامة في التطبيق الخاص بك. وعلى سبيل المثال:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

يمكنك قراءة المزيد حول هذه الميزة في وثائق Spectron </ 0>.</p> 



## Devtron

في Devtron، هناك علامة تبويب إمكانية الوصول التي ستسمح لك بمراجعة صفحة في التطبيق الخاص بك وترتيب وتصفية النتائج.

![لقطة الشاشة لـdevtron][3]

Both of these tools are using the [Accessibility Developer Tools][a11y-devtools] library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki][a11y-devtools-wiki].

إذا كنت تعرف أدوات أخرى كبيرة للوصول إلى إلكترون، أضفها إلى وثائق الوصول مع طلب سحب.



## تمكين ميزات الوصول يدوياً

ستمكن تطبيقات إلكترون تلقائيًا ميزات الوصول في وجود التكنولوجيا المساعدة (هـ). . [JAWS](https://www.freedomscientific.com/products/software/jaws/) على Windows أو [Voiceover](https://help.apple.com/voiceover/mac/10.15/) على macOS). See Chrome's [accessibility documentation][a11y-docs] for more details.

يمكنك أيضًا تبديل هذه الميزات يدويًا إما داخل تطبيق إلكترون الخاص بك أو عن طريق وضع أعلام في البرنامج الأصلي الخاص بالطرف الثالث.



### استخدام واجهة برمجة تطبيقات Electron's

By using the [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] API, you can manually expose Chrome's accessibility tree to users in the application preferences. لاحظ أن المرافق المساعدة لنظام المستخدم لها الأولوية على هذا الإعداد و سوف يتجاوزها.



### داخل برمجيات طرف ثالث



#### نظام macOS

في macOS، يمكن للتكنولوجيا المساعدة من طرف ثالث تبديل ميزات الوصول داخل تطبيقات إلكترون عن طريق تعيين `خاصية AXManualAccess` برمجياً:



```objc
CFStringRef kAXManualaccescessibility = CFSTR("AXManualAccessibility")؛

+ (void)enablecessibility:(BOL)تمكين inElectronApplication:(NSRunningApplication *)app
{
    AXUIElementRef appRef = AXUIElementCreateApplication(التطبيق. معرف القرود)؛
    إذا (appRef =nil)
        العودة؛

    قيمة CFBooleanRef = تمكين ? kCFBooleanTrue : kCFBooleanFalse;
    AXUIElementSetAttributeValue(appRef, kAXManualaccessibility, value);
    CFRelease(appRef);
}
```

[3]: https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png

[devtron]: https://electronjs.org/devtron
[spectron]: https://electronjs.org/spectron
[a11y-docs]: https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology
[a11y-devtools]: https://github.com/GoogleChrome/accessibility-developer-tools
[a11y-devtools-wiki]: https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
[setAccessibilitySupportEnabled]: ../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows
