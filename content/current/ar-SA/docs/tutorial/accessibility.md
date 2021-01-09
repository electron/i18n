# إمكانية الوصول

إنشاء تطبيقات متاحة مهم ونحن سعداء بتوفير وظيفة لـ [Devtron](https://electronjs.org/devtron) و [Spectron](https://electronjs.org/spectron) الذي يعطي مطوري التطبيقات فرصة لجعل تطبيقاتهم أفضل للجميع.

---

شواغل إمكانية الوصول في تطبيقات إلكترون مماثلة لشواغل مواقع الويب لأنها في نهاية المطاف كلتاهما HTML. مع تطبيقات إلكترون مع ذلك لا يمكنك استخدام الموارد عبر الإنترنت لمراجعة إمكانية الوصول لأن تطبيقك ليس لديه عنوان URL لتوجيه مراجع الحسابات إليه.

هذه الميزات تجلب أدوات التدقيق هذه إلى تطبيق إلكترون الخاص بك. يمكنك اختيار إضافة مراجعات إلى اختبارات Spectron أو استخدامها داخل DevTools مع Devtron. تابع القراءة لملخص الأدوات.

## سبيكترون

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

![لقطة الشاشة لـdevtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

كلا من هاتين الأداتين تستخدم [أدوات تطوير إمكانية الوصول](https://github.com/GoogleChrome/accessibility-developer-tools) مكتبة بنيتها جوجل لـ Chrome. يمكنك معرفة المزيد حول إمكانية الوصول إلى قواعد مراجعة الحسابات التي تستخدمها هذه المكتبة على [ويكي الخاص بالمستودع](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

إذا كنت تعرف أدوات أخرى كبيرة للوصول إلى إلكترون، أضفها إلى وثائق الوصول مع طلب سحب.



## تمكين ميزات الوصول يدوياً

ستمكن تطبيقات إلكترون تلقائيًا ميزات الوصول في وجود التكنولوجيا المساعدة (هـ). . [JAWS](https://www.freedomscientific.com/products/software/jaws/) على Windows أو [Voiceover](https://help.apple.com/voiceover/mac/10.15/) على macOS). راجع [وثائق الوصول لـ Chrome](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) لمزيد من التفاصيل.

يمكنك أيضًا تبديل هذه الميزات يدويًا إما داخل تطبيق إلكترون الخاص بك أو عن طريق وضع أعلام في البرنامج الأصلي الخاص بالطرف الثالث.



### استخدام واجهة برمجة تطبيقات Electron's

باستخدام [`app.setAccessibilitySupportEnabled(تمكين)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) واجهة برمجة التطبيقات، يمكنك عرض شجرة الوصول إلى Chrome يدويًا للمستخدمين في تفضيلات التطبيق. لاحظ أن المرافق المساعدة لنظام المستخدم لها الأولوية على هذا الإعداد و سوف يتجاوزها.



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
