---
title: Mac App Store و Windows التحديث التلقائي على إلكترون
author: سيد
date: '2015-11-05'
---

أضاف إلكترون مؤخرا ميزتين مثيرتين: بناء متوافق مع متجر تطبيقات Mac ومحدث تلقائي في Windows مدمج.

---

## دعم متجر تطبيقات Mac

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

اعتبارا من `v0.34.0` يتضمن كل إصدار إلكترون بناء متوافق مع متجر تطبيقات Mac سابقاً، تطبيق مبني على إلكترون لن يمتثل لمتطلبات آبل لمتجر تطبيقات ماك. وتتصل معظم هذه المتطلبات باستخدام هذه المعايير الخاصة. ومن أجل وضع اليد على إلكترون بطريقة تفي بالشروط المطلوبة، يلزم إزالة وحدتين هما:

- `مراسل`
- `التحديث التلقائي`

وبالإضافة إلى ذلك، تغيرت بعض السلوكيات فيما يتعلق باكتشاف تغييرات DNS ومميزات التقاط الفيديو وإمكانية الوصول. يمكنك قراءة المزيد عن التغييرات و [إرسال التطبيق الخاص بك إلى متجر تطبيقات Mac](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) في الوثائق. يمكن العثور على التوزيعات في صفحة [إصدارات إلكترون](https://github.com/electron/electron/releases)، مسبقاً مع `كتلة -`.

طلبات السحب ذات الصلة: [electron/electron#3108](https://github.com/electron/electron/pull/3108)، [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## التحديث التلقائي للويندوز

في إلكترون `v0.34.1` تم تحسين `وحدة التحديث التلقائي` من أجل العمل مع [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). هذا يعني أن سفن إلكترون ذات طرق سهلة للتحديث التلقائي للتطبيق الخاص بك على كل من OS X و Windows. يمكنك قراءة المزيد في [إعداد التطبيق الخاص بك للتحديث التلقائي على ويندوز](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) في الوثائق.

طلب سحب ذو صلة: [electron/electron#1984](https://github.com/electron/electron/pull/1984)

