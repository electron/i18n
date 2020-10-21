---
title: تحديث تلقائي أسهل للتطبيقات المفتوحة المصدر
author: zeke
date: '2018-05-01'
---

اليوم نحن نطلق مجانا ومفتوح المصدر، استضافت [تحديث خدمة الويب](https://github.com/electron/update.electronjs.org) و المرافق [npm حزمة](https://github.com/electron/update-electron-app) لتمكين التحديثات التلقائية السهلة لتطبيقات إلكترون مفتوحة المصدر. هذه خطوة نحو تمكين مطوري التطبيقات من التفكير بقدر أقل في نشر وأكثر في تطوير تجارب عالية الجودة لمستخدميهم.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="لقطة شاشة التحديث">
    <figcaption>وحدة التحديث الجديدة قيد العمل</figcaption>
  </a>
</figure>

## جعل الحياة أسهل

إلكترون لديه [التحديث التلقائي](https://electronjs.org/docs/tutorial/updates) API الذي يعطي التطبيقات القدرة على استهلاك البيانات الوصفية من نقطة النهاية البعيدة للتحقق من وجود تحديثات، قم بتنزيلها في الخلفية، وتثبيتها تلقائياً.

تمكين هذه التحديثات كان خطوة مرهقة في عملية النشر للعديد من مطوري تطبيقات إلكترون لأنه يتطلب نشر خادم ويب والحفاظ عليه لخدمة البيانات الوصفية لسجل إصدار التطبيقات.

اليوم نحن نعلن عن حل غير مباشر جديد للتحديثات التلقائية للتطبيقات. إذا كان تطبيق إلكترون الخاص بك في مستودع GitHub عام وأنت تستخدم إصدارات GitHub لنشر الإصدارات ، يمكنك استخدام هذه الخدمة لتسليم تحديثات التطبيق المستمرة للمستخدمين الخاص بك.

## استخدام الوحدة الجديدة

للتقليل من التكوين من جانبك، قمنا بإنشاء [update-electron-app](https://github.com/electron/update-electron-app)، وحدة npm التي تتكامل مع

الجديد[ update.electronjs.org](https://github.com/electron/update.electronjs.org) webservice</p> 

تثبيت الوحدة:



```sh
npm تثبيت تحديث-إلكترون التطبيق
```


اتصل بها من أي مكان في [العملية الرئيسية لتطبيقك](https://electronjs.org/docs/glossary#main-process):



```js
مطلوبة ('update-electron-app')()
```


هذا كل شيء! ستتحقق الوحدة من وجود تحديثات عند بدء تشغيل التطبيق، ثم كل عشر دقائق. عند العثور على تحديث، سيتم تنزيله تلقائياً في الخلفية، وسيتم عرض مربع حوار عندما يكون التحديث جاهزاً.



## ترحيل التطبيقات الموجودة

التطبيقات التي تستخدم بالفعل واجهة برمجة التطبيقات الخاصة بـ Electron's التلقائية التحديث يمكنها استخدام هذه الخدمة أيضًا. للقيام بذلك، يمكنك [تخصيص `update-electron-app`](https://github.com/electron/update-electron-app) وحدة أو [دمج مباشرة مع update.electronjs.org](https://github.com/electron/update.electronjs.org).



## البدائل

إذا كنت تستخدم [وحدة الإنشاء الإلكتروني](https://github.com/electron-userland/electron-builder) لحزمة تطبيقك، يمكنك استخدام تحديث مدمج. للحصول على التفاصيل، انظر [electron.build/auto-upd](https://www.electron.build/auto-update).

إذا كان التطبيق الخاص بك، قد تحتاج إلى تشغيل خادم التحديث الخاص بك. هناك عدد من الأدوات مفتوحة المصدر لهذا، بما في ذلك زيت [Hazel](https://github.com/zeit/hazel) و Atlassian [nicleus](https://github.com/atlassian/nucleus). شاهد [نشر خادم التحديث](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) البرنامج التعليمي لمزيد من معلومات.



## شكراً

Thanks to [Julian Gruber](http://juliangruber.com/) for helping design and build this simple and scalable web service. شكرا للأشخاص في [Zeit](https://zeit.co) على خدماتهم مفتوحة المصدر [Hazel](https://github.com/zeit/hazel) التي استلهمت منها التصميم. شكراً ل [صامويل هورد](https://www.samuelattard.com/) ل يراجع الكود البرمجي. شكرا لمجتمع إلكترون لمساعدته في اختبار هذه الخدمة 

🌲 إليك مستقبل أخضر لتطبيقات إلكترون!