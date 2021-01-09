---
title: أدوات إمكانية الوصول
author: سيد
date: '2016-08-23'
---

إنشاء تطبيقات متاحة مهم ونحن سعداء لإدخال وظائف جديدة إلى [Devtron](https://electronjs.org/devtron) و [Spectron](https://electronjs.org/spectron) التي تعطي للمطورين الفرصة لجعل تطبيقاتهم أفضل للجميع.

---

شواغل إمكانية الوصول في تطبيقات إلكترون مماثلة لشواغل مواقع الويب لأنهما في نهاية المطاف كلتاهما HTML. مع تطبيقات إلكترون ، مع ذلك ، لا يمكنك استخدام الموارد عبر الإنترنت لمراجعات إمكانية الوصول لأن تطبيقك ليس لديه عنوان URL لتوجيه مراجع الحسابات إليه.

هذه الميزات الجديدة تجلب أدوات التدقيق هذه إلى تطبيق إلكترون الخاص بك. يمكنك اختيار إضافة مراجعات إلى اختبارات Spectron الخاصة بك أو استخدامها داخل DevTools باستخدام Devtron. اقرأ على ملخّص للأدوات أو قم بالدفع [مستندات الوصول الخاصة بنا](https://electronjs.org/docs/tutorial/accessibility/) للحصول على مزيد من المعلومات.

### Spectron

في إطار اختبار Spectron، يمكنك الآن مراجعة كل نافذة و `<webview>` علامة في التطبيق الخاص بك. وعلى سبيل المثال:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

يمكنك قراءة المزيد حول هذه الميزة في

 وثائق Spectron </ 0>.</p> 



### Devtron

في Devtron هناك علامة تبويب جديدة للوصول ستسمح لك بمراجعة صفحة في التطبيق الخاص بك وفرز وتصفية النتائج.

![لقطة الشاشة لـdevtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

كلا من هاتين الأداتين تستخدم مكتبة [أدوات تطوير إمكانية الوصول](https://github.com/GoogleChrome/accessibility-developer-tools) التي أنشأتها جوجل لكروم. يمكنك معرفة المزيد عن قواعد التدقيق في إمكانية الوصول التي تستخدمها هذه المكتبة على ويكي [reitory's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

إذا كنت تعرف أدوات أخرى كبيرة للوصول إلى إلكترون، أضفها إلى [وثائق الوصول](https://electronjs.org/docs/tutorial/accessibility/) مع طلب سحب.

