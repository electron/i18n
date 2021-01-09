---
title: تصفح عرض window.open() إصلاح الضعف
author: ckerr
date: '2019-02-03'
---

تم اكتشاف ضعف رمز يسمح بإعادة تمكين العقدة في النوافذ الفرعية.

---

فتح عرض المتصفح مع `sandbox: true` أو `nativeWindowOpen: true` and `nodeIntegration: false` يؤدي إلى محتوى ويب حيث `نافذة. يمكن استدعاء القلم` وستكون نافذة الأطفال المفتوحة حديثا `عقد الدمج` ممكنة. هذا الضعف يؤثر على جميع الإصدارات المدعومة من إلكترون.

## التخفيف

لقد نشرنا إصدارات جديدة من إلكترون تتضمن إصلاحات لهذا الضعف: [`. .17`](https://github.com/electron/electron/releases/tag/v2.0.17)، [`3.0. 5`](https://github.com/electron/electron/releases/tag/v3.0.15)، [`3.1.3`،](https://github.com/electron/electron/releases/tag/v3.1.3)، [`4. .4`](https://github.com/electron/electron/releases/tag/v4.0.4)و [` 5.0.0-بيتا.2`](https://github.com/electron/electron/releases/tag/v5.0.0-beta.2) نحن نشجع جميع مطوري إلكترون على تحديث تطبيقاتهم إلى أحدث إصدار مستقر على الفور.

إذا كنت غير قادر لسبب ما على ترقية الإلكترون الخاص بك، فيمكنك التخفيف من حدة هذه المشكلة عن طريق تعطيل جميع محتويات الويب الفرعية:

```javascript
view.webContents.on('-add-new-contents', e => e.preventDefault())؛
```

## معلومات إضافية

تم العثور على هذا الضعف وتم الإبلاغ عنه بشكل مسؤول في مشروع إلكترون بواسطة [PalmerAL](https://github.com/PalmerAL).

لمعرفة المزيد عن أفضل الممارسات للحفاظ على أمن تطبيقات إلكترون، راجع [درسنا الأمني](https://electronjs.org/docs/tutorial/security).

إذا كنت ترغب في الإبلاغ عن ضعف في إلكترون، البريد الإلكتروني security@electronjs.org.
