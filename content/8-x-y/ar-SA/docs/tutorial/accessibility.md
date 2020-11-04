# إمكانية الوصول

من المهم جعل التطبيقات سهلة الوصول ويسعدنا تقديم طلبات جديدة وظائف ل Devtron </ 0> و  Spectron </ 1> التي تعطي مطوري الفرصة لجعل تطبيقاتهم أفضل للجميع.</p> 



---

شواغل إمكانية الوصول في تطبيقات إلكترون مماثلة لشواغل مواقع الويب لأنها في نهاية المطاف كلتاهما HTML. مع تطبيقات إلكترون مع ذلك لا يمكنك استخدام الموارد عبر الإنترنت لمراجعة إمكانية الوصول لأن تطبيقك ليس لديه عنوان URL لتوجيه مراجع الحسابات إليه.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. تابع القراءة لملخص الأدوات.



## سبيكترون

في إطار اختبار Spectron، يمكنك الآن مراجعة كل نافذة و `<webview>` علامة في التطبيق الخاص بك. وعلى سبيل المثال:



```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```


يمكنك قراءة المزيد حول هذه الميزة في  وثائق Spectron </ 0>.</p> 



## Devtron

في Devtron، هناك علامة تبويب جديدة للوصول ستسمح لك بمراجعة صفحة في التطبيق الخاص بك وفرز وتصفية النتائج.

![لقطة الشاشة لـdevtron][1]

Both of these tools are using the [Accessibility Developer Tools][a11y-devtools] library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki][a11y-devtools-wiki].

إذا كنت تعرف أدوات أخرى كبيرة للوصول إلى إلكترون، أضفها إلى وثائق الوصول مع طلب سحب.



## تمكين الوصول

تطبيقات إلكترون تبقي إمكانية الوصول معطلة بشكل افتراضي لأسباب الأداء ولكن هناك طرق متعددة لتفعيلها.



### داخل التطبيق

By using [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled], you can expose accessibility switch to users in the application preferences. تتمتع المرافق المساعدة في نظام المستخدم بالأولوية على هذا الإعداد وسيقوم بتجاوزه.



### التكنولوجيات المساعدة

سيمكن تطبيق إلكترون الوصول تلقائياً عندما يكتشف التكنولوجيا المساعدة (Windows) أو VoiceOver (macOS). أنظر Chrome[إمكانية الوصول للوثائق][a11y-docs]للمزيد من التفاصيل.

على macOS، يمكن للتكنولوجيا المساعدة من طرف ثالث تبديل إمكانية الوصول داخل تطبيقات إلكترون عن طريق تعيين السمة `AXManualAccess` برمجياً:



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

[1]: https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png
[a11y-docs]: https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology
[a11y-devtools]: https://github.com/GoogleChrome/accessibility-developer-tools
[a11y-devtools-wiki]: https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
[setAccessibilitySupportEnabled]: ../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows
