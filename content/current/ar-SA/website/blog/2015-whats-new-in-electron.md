---
title: ما هو الجديد في إلكترون
author: سيد
date: '2015-10-15'
---

كان هناك بعض التحديثات و المحادثات المثيرة للاهتمام التي قدمت مؤخرا على إلكترون ، إليك خلاصة.

---

## المصدر

إلكترون الآن محدثة مع Chrome 45 في `v0.32.0`. التحديثات الأخرى تشمل...

### وثائق أفضل

![مستندات جديدة](https://cloud.githubusercontent.com/assets/1305617/10520600/d9dc0ae8-731f-11e5-9bd7-c1651639eb2a.png)

وقد قمنا بإعادة هيكلة وتوحيد الوثائق لكي تبدو أفضل وتقرأ على نحو أفضل. وهناك أيضا ترجمات تسهم بها المجتمعات المحلية للوثائق، مثل الترجمات اليابانية والكورية.

طلبات السحب ذات الصلة: [electron/electron#2028](https://github.com/electron/electron/pull/2028)، [electron/electron#2533](https://github.com/electron/electron/pull/2533)، [electron/electron#2557](https://github.com/electron/electron/pull/2557)، [إلكترون/إلكترون#2709](https://github.com/electron/electron/pull/2709)، [إلكترون/إلكترون#2725](https://github.com/electron/electron/pull/2725)، [إلكترون/إلكترون#2698](https://github.com/electron/electron/pull/2698)، [إلكترون/إلكترون#2649](https://github.com/electron/electron/pull/2649)

### Node.js 4.1.0

منذ `v0.33.0` سفن إلكترون مع Node.js 4.1.0.

طلب سحب ذو صلة: [إلكتروني/إلكتروني#2817](https://github.com/electron/electron/pull/2817).

### ما قبل العقدة

يمكن الآن تجميع الوحدات النمطية التي تعتمد على `ما قبل العقدة` مقابل إلكترون عند البناء من المصدر.

طلب سحب ذو صلة: [خرائط / عقدة ما قبل مصر #175](https://github.com/mapbox/node-pre-gyp/pull/175).

### دعم ARM

يوفر إلكترون الآن بنايات لـ Linux على ARMv7. يعمل على منصات شعبية مثل Chromebook و Raspberry Pi 2.

المسائل ذات الصلة: [الذرة/libchromiumcontent#138](https://github.com/atom/libchromiumcontent/pull/138)، [electron/electron#2094](https://github.com/electron/electron/pull/2094)، [electron/tron#366](https://github.com/electron/electron/issues/366).

### نافذة الإطار على نمط يوسمايت

![نافذة بلا إفراغ](https://cloud.githubusercontent.com/assets/184253/9849445/7397d308-5aeb-11e5-896f-08ac7693c8c0.png)

تم دمج تعديل بواسطة [@jaanus](https://github.com/jaanus) ، مثل التطبيقات الأخرى المدمجة في OS X ، يسمح بإنشاء نوافذ بلا إطارات مع أضواء حركة مرور النظام مدمجة على OS X Yosemite وما بعدها.

طلب سحب ذو صلة: [إلكتروني/إلكتروني#2776](https://github.com/electron/electron/pull/2776).

### دعم طباعة صيف البرمجة في جوجل

بعد صيف قوقل من البرمجة قمنا بدمج التصحيحات بواسطة [@hokein](https://github.com/hokein) لتحسين دعم الطباعة، وإضافة القدرة على طباعة الصفحة في ملفات PDF

المسائل ذات الصلة: [إلكترون/إلكترون#2677](https://github.com/electron/electron/pull/2677)، [electron/electron#1935](https://github.com/electron/electron/pull/1935)، [electron/electron#1532](https://github.com/electron/electron/pull/1532)، [إلكترون/إلكترون#805](https://github.com/electron/electron/issues/805)، [إلكترون/إلكترون#1669](https://github.com/electron/electron/pull/1669)، [إلكترون/إلكترون#1835](https://github.com/electron/electron/pull/1835)

## Atom

تم ترقية Atom الآن إلى إلكترون `v0.30.6` قيد تشغيل Chrome 44. تجري الترقية إلى `v0.33.0` في [ذرة/ذرة #8779](https://github.com/atom/atom/pull/8779).

## محادثات

GitHubber [Amy Palamountain](https://github.com/ammeep) قدمت مقدمة رائعة لـ Electron في حديث [Nordic.js](https://nordicjs2015.confetti.events). كما أنشأت مكتبة [تسارع إلكترون-](https://github.com/ammeep/electron-accelerator).

#### بناء التطبيقات الأصلية باستخدام إلكترون من قبل آمي بالومونتين

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/OHOPSvTltPI" frameborder="0" allowfullscreen></iframe></div>

[بن أوجل](https://github.com/benogle)، أيضًا على فريق Atom ، ألقى حديث إلكترون في [YAPC Asia](http://yapcasia.org/2015/):

#### بناء تطبيقات سطح المكتب مع تكنولوجيات الويب من قبل بن أوجل

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/WChjh5zaUdw" frameborder="0" allowfullscreen></iframe></div>

عضو فريق آتوم [كيفن ساويكي](https://github.com/kevinsawicki) وآخرون قدموا محادثات حول إلكترون في [مجموعة مستخدم باي إلكترون](http://www.meetup.com/Bay-Area-Electron-User-Group/) الاجتماع مؤخرًا. تم نشر [فيديوهات](http://www.wagonhq.com/blog/electron-meetup) ، هنا زوجين:

#### تاريخ إلكترون من قبل كيفن ساويكي

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/tP8Yp1boQ9c" frameborder="0" allowfullscreen></iframe></div>

#### جعل تطبيق الويب يشعر بأنه أصلي من قبل بن غوتوو

<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/JIRXVGVPzn8" frameborder="0" allowfullscreen></iframe></div>

