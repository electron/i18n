---
title: إصلاح الضعف SQLite
author: ckerr
date: '2018-12-18'
---

تم اكتشاف ضعف تنفيذ الكود البرمجي البعيد"[ماجيلان](https://blade.tencent.com/magellan/index_en.html)،" يؤثر على البرامج القائمة على SQLite أو Chromium، بما في ذلك جميع إصدارات إلكترون.

---

## النطاق

تطبيقات إلكترون باستخدام SQL ويب تتأثر .


## التخفيف

يجب أن تتوقف التطبيقات المتأثرة عن استخدام SQL أو الترقية إلى إصدار مصحح من إلكترون.

لقد نشرنا إصدارات جديدة من إلكترون تتضمن إصلاحات لهذا الضعف:
  * [4.0.0-beta.11](https://github.com/electron/electron/releases/tag/v4.0.0-beta.11)
  * [3-1-0-بيتا(4).](https://github.com/electron/electron/releases/tag/v3.1.0-beta.4)
  * [3.0.13](https://github.com/electron/electron/releases/tag/v3.0.13)
  * [2.0.16](https://github.com/electron/electron/releases/tag/v2.0.16)

ولا توجد أي تقارير عن ذلك في البرية، غير أن الطلبات المتأثرة مدعوة إلى التخفيف من حدتها.

## معلومات إضافية

هذا الضعف اكتشفه فريق Tencent Blade ، الذي نشر [منشور مدونة يناقش الضعف](https://blade.tencent.com/magellan/index_en.html).

لمعرفة المزيد عن أفضل الممارسات للحفاظ على أمن تطبيقات إلكترون، راجع [درسنا الأمني](https://electronjs.org/docs/tutorial/security).

إذا كنت ترغب في الإبلاغ عن ضعف في إلكترون، البريد الإلكتروني security@electronjs.org.
