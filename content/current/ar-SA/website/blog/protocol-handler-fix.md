---
title: إصلاح ضعف معالج البروتوكول
author: zeke
date: '2018-01-22'
---

تم اكتشاف ضعف تنفيذ التعليمات البرمجية عن بعد يؤثر على تطبيقات إلكترون التي تستخدم أجهزة معالجة بروتوكول مخصص. تم تعيين معرف CVE [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## المنصات المتأثرة

تطبيقات إلكترون المصممة للتشغيل على ويندوز التي تسجل نفسها كمعالج افتراضي لبروتوكول، مثل `myapp://`، ضعيفة.

يمكن أن تتأثر هذه التطبيقات بغض النظر عن كيفية تسجيل البروتوكول، مثل باستخدام الكود الأصلي، سجل ويندوز، أو Electron's [app.setAsDefaultprotocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API.

macOS و Linux هما **ليستا عرضة** لهذه المشكلة.

## التخفيف

لقد نشرنا إصدارات جديدة من إلكترون تتضمن إصلاحات ل هذا الضعف: [`1.8.2-بيتا.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5) [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12)و و [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17) ونحث جميع مطوري إلكترون على تحديث تطبيقاتهم إلى أحدث إصدار مستقر على الفور.

إذا لم يكن بإمكانك ترقية الإلكترون الخاص بك لسبب ما، يمكنك إلحاق `--` كآخر حجة عند استدعاء [التطبيق. etAsDefaultprotocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), الذي يمنع Chromium من تحليل خيارات أخرى. الوسم المزدوج `--` يعني نهاية خيارات الأوامر، التي يتم بعدها قبول فقط المعلمات الموقعية.

```js
app.setAsDefaultProtocolClient(protocol, process.execPath, [
  '--your-switches-here',
  '--'
])
```

راجع [app.setAsDefaultprotocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API لمزيد من التفاصيل.

لمعرفة المزيد عن أفضل الممارسات للحفاظ على أمن تطبيقات إلكترون، راجع [درسنا الأمني](https://electronjs.org/docs/tutorial/security).

إذا كنت ترغب في الإبلاغ عن الضعف في Electron، البريد الإلكتروني security@electronjs.org.
