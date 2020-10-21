---
title: إصلاح ضعف تفضيلات WebPreferences
author: ckerr
date: '2018-08-22'
---

تم اكتشاف ضعف تنفيذ التعليمات البرمجية عن بعد يؤثر على التطبيقات مع القدرة على فتح نوافذ الأطفال المتداخلة على إصدارات إلكترون (3. (0-beta.6, 2.0.7, 1.8.7, and 1.7-15). هذا الضعف تم تعيينه معرف CVE [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685).

---

## المنصات المتأثرة

أنت متأثر إذا:

1. قمت بتضمين _أي_ محتوى مستخدم بعيد ، حتى في صندوق الرمل
2. أنت تقبل إدخال المستخدم مع أي نقاط ضعف XSS

_التفاصيل_

أنت متأثر إذا كان أي رمز مستخدم يعمل داخل `iframe` / يمكنه إنشاء `iframe`. وبالنظر إلى احتمال تعرض معظم التطبيقات للتأثر بهذه الحالة، يمكن الافتراض بأن معظم التطبيقات معرضة لهذه الحالة.

أنت أيضا متأثرة إذا قمت بفتح أي من النوافذ الخاصة بك باستخدام `NativeWindowOpen: true` أو `sandbox: true` الخيار.  على الرغم من أن هذا الضعف يتطلب أيضا ضعف XSS لوجود في التطبيق الخاص بك، لا يزال عليك تطبيق أحد التخفيفات أدناه إذا كنت تستخدم أي من هذين الخيارين.

## التخفيف

لقد نشرنا إصدارات جديدة من إلكترون تتضمن إصلاحات لهذا الضعف: [`. .0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7)، [`2. 8`](https://github.com/electron/electron/releases/tag/v2.0.8)، [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8)، و [` 1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). ونحث جميع مطوري إلكترون على تحديث تطبيقاتهم إلى أحدث إصدار مستقر على الفور.

إذا كنت غير قادر لسبب ما على ترقية إصدار إلكترون الخاص بك، يمكنك حماية التطبيق الخاص بك عن طريق الاتصال بالبطاطة `حدث. 1980tDefault()` على حدث `نافذة جديدة` للجميع  `webContents`'. إذا كنت لا تستخدم `window.open` أو أي نوافذ فرعية على الإطلاق، فهذا أيضًا هو تخفيف صالح للتطبيق الخاص بك.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

إذا كنت تعتمد على قدرة نوافذ طفلك لصنع نوافذ الأحفاد، ثم استراتيجية التخفيف الثالثة هي استخدام التعليمات البرمجية التالية على أعلى مستوى في النافذة:

```javascript
Const EnforInheritation = (topWebcontents) => {
  const Hand= (webcontents) => {
    webcontts. n('new-window', (الحدث, url, framee, disposition, Options) => {
      إذا (!اختيار). تفضيلات) {
        خيارات. تفضيلات ebPreferences = {}
      }
      كائن. ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (options.webContents) {
        handle(خيارات). محتويات)

    })

  Handle(topWebcontents)
}

إنفاذ الإرث (mainWindow. محتويات)
```

سيؤدي هذا الكود يدويًا إلى تطبيق نوافذ المستوى الأعلى `تفضيلات الويب` يدويًا على جميع النوافذ الفرعية العميقة إلى ما لا نهاية.

## معلومات إضافية

تم العثور على هذا الضعف وتم الإبلاغ عنه بشكل مسؤول في مشروع إلكترون بواسطة [Matt Austin](https://twitter.com/mattaustin) من [Parast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

لمعرفة المزيد عن أفضل الممارسات للحفاظ على أمن تطبيقات إلكترون، راجع [درسنا الأمني](https://electronjs.org/docs/tutorial/security).

إذا كنت ترغب في الإبلاغ عن ضعف في إلكترون، البريد الإلكتروني security@electronjs.org.
