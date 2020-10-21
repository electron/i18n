---
title: اصلاح عرض الويب
author: ckerr
date: '2018-03-21'
---

تم اكتشاف ضعف يسمح بإعادة تمكين تكامل Node.js في بعض تطبيقات Electron التي تعطيله. هذا الضعف تم تعيينه معرف CVE [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## التطبيقات المتأثرة

يتأثر التطبيق إذا كان *كل* مما يلي صحيح:

 1. تشغيل على إلكترون 1.7، 1.8، أو 2.0.0-بيتا
 2. السماح بتنفيذ الكود العشوائي عن بعد
 3. تعطيل تكامل Node.js
 4. لا يعلن صراحة `webviewag: خاطئ` في تفضيلات الويب الخاصة به
 5. لا يقوم بتمكين خيار `الأصلي WindowOption`
 6. لا يعترض على أحداث `النافذة الجديدة` ويتجاوز يدويًا `event.newGuest` دون استخدام علامة الخيارات المقدمة

وعلى الرغم من أن هذا يبدو أقلية من تطبيقات إلكترون، فإننا نشجع جميع التطبيقات على أن يتم ترقيتها على سبيل الاحتياط.

## التخفيف

هذا الضعف ثابت في إصدارات اليوم [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13)و [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)و [2.0.0-بيتا.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5)

المطورين الذين لا يستطيعون ترقية نسخة إلكترون للتطبيق يمكنهم التخفيف من حدة الضعف باستخدام التعليمات البرمجية التالية:

```js
app.on('web-contents-created'(الحدث, win) => {
  فوز. لا ('نافذة جديدة', (الحدث, URL الجديد, الإطار, التصرف)
                        خيارات، إضافة الميزات) => {
    إذا (! صفحات. خيارات ebPreferences) s.webPreferences = {}؛
    خياراتs.webPreferences. odeintegration = false;
    خياراتs.webPreferences.nodeIntegrationInWorker = false;
    خيارات. ebPreferences.webviewTag = false؛
    حذف خياراتs.webPreferences. إعادة تحميل؛
  })
})

// و *IF* لا تستخدم وجهات النظر على الإطلاق،
// قد ترغب أيضًا في
تطبيق. لا ('web-contents-created'، (الحدث، الفوز) => {
  الفوز. n('will-attach-webview', (event, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## معلومات إضافية

تم العثور على هذا الضعف والإبلاغ عنه بشكل مسؤول في مشروع إلكترون من قبل Brendan Scarvell من [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

لمعرفة المزيد عن أفضل الممارسات للحفاظ على أمن تطبيقات إلكترون، راجع [درسنا الأمني](https://electronjs.org/docs/tutorial/security).

للإبلاغ عن الضعف في إلكترون، يرجى البريد الإلكتروني security@electronjs.org.

يرجى الانضمام إلى [قائمة البريد الإلكتروني](https://groups.google.com/forum/#!forum/electronjs) لتلقي التحديثات حول الإصدارات وتحديثات الأمان.

