---
title: إصلاح ضعف قارئ الكروم
author: صوتي
date: '2019-03-07'
---

واكتشف ضعف شديد في كروم يؤثر على جميع البرمجيات القائمة على الكروميوم، بما في ذلك الإلكترون.

تم تعيين هذا الضعف `CVE-2019-5786`.  يمكنك قراءة المزيد عن ذلك في [مشاركة مدونة كروم](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

يرجى ملاحظة أن كروم لديه تقارير عن هذا الضعف الذي يستخدم في البرية لذلك يوصى بشدة بترقية إلكترون ASAP.

---

## النطاق

يؤثر هذا على أي تطبيق إلكترون قد يقوم بتشغيل طرف ثالث أو جافا سكريبت غير موثوق.

## التخفيف

يجب أن تقوم التطبيقات المتأثرة بالترقية إلى إصدار مصحح من إلكترون.

لقد نشرنا إصدارات جديدة من إلكترون تتضمن إصلاحات لهذا الضعف:
  * [4.0.8](https://github.com/electron/electron/releases/tag/v4.0.8)
  * [3.1.6](https://github.com/electron/electron/releases/tag/v3.1.6)
  * [3.0.16](https://github.com/electron/electron/releases/tag/v3.0.16)
  * [2.0.18](https://github.com/electron/electron/releases/tag/v2.0.18)

وكانت آخر بيتا إلكترون 5 تتبع الكروميوم 73 وبالتالي فقد تم ترقيمه بالفعل:
  * [5.0.0-بيتا(5)](https://github.com/electron/electron/releases/tag/v5.0.0-beta.5)

## معلومات إضافية

اكتشف فريق تحليل التهديدات التابع لجوجل كليمنت ليجين هذا الضعف وقدم تقاريره إلى فريق كروم.  يمكن العثور على مشاركة مدونة كروم [هنا](https://chromereleases.googleblog.com/2019/03/stable-channel-update-for-desktop.html).

لمعرفة المزيد عن أفضل الممارسات للحفاظ على أمن تطبيقات إلكترون، راجع [درسنا الأمني](https://electronjs.org/docs/tutorial/security).

إذا كنت ترغب في الإبلاغ عن ضعف في إلكترون، البريد الإلكتروني security@electronjs.org.
