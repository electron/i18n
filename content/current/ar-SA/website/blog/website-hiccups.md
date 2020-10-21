---
title: كوب الموقع
author: zeke
date: '2018-02-12'
---

في الأسبوع الماضي كان الموقع [electronjs.org](https://electronjs.org) لديه بضع دقائق من وقت التعطل. إذا كنت قد تأثرت بهذه الانقطاع الوجيز، فإننا نأسف للإزعاج. بعد قليل من التحقيق اليوم، قمنا بتشخيص السبب الجذري ونشرنا [إصلاح](https://github.com/electron/electronjs.org/pull/1076).

---

لمنع هذا النوع من وقت التعطيل في المستقبل، قمنا بتمكين [تنبيهات هيروكو العتبة](https://devcenter.heroku.com/articles/metrics#threshold-alerting) على تطبيقنا. في أي وقت يقوم خادم الويب بتراكم الطلبات الفاشلة أو الإجابات البطيئة بما يتجاوز عتبة معينة، سيتم إعلام فريقنا حتى نتمكن من معالجة المشكلة بسرعة.

## وثائق بدون اتصال في كل لغة

المرة القادمة التي تقوم فيها بتطوير تطبيق إلكترون على متن طائرة أو في مقهى تحت الأرض ، قد ترغب في الحصول على نسخة من المستندات للرجوع إليها دون اتصال. لحسن الحظ، مستندات Electron's متوفرة كملفات Markdown بأكثر من 20 لغة .

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## وثائق بدون اتصال مع واجهة المستخدم

[devdocs. o/electron](https://devdocs.io/electron/) موقع سهل الاستخدام يخزن المستندات لاستخدامها دون اتصال. ليس فقط للإلكترون ولكن العديد من المشاريع الأخرى مثل جافا سكريبت، TypeScript, Node. ، و React، و Angular، و العديد من الآخرين. وبالطبع هناك تطبيق إلكترون لهذا أيضا. شاهد [devdocs-app](https://electronjs.org/apps/devdocs-app) على موقع إلكترون.

[![](https://user-images.githubusercontent.com/8784712/27121730-11676ba8-511b-11e7-8c01-00444ee8501a.png)](https://electronjs.org/apps/devdocs-app)

إذا كنت ترغب في تثبيت التطبيقات دون استخدام الماوس أو المسار الخاص بك، أعطى [إلكترون فورج](https://electronforge.io/) `تثبيت` أمر محاولة:

```sh
npx electron-forge install egoist/devdocs-app
```