---
title: "موقع الكتروني جديد"
author: zeke
date: '2017-11-13'
---

إلكترون لديه موقع جديد في [electronjs.org](https://electronjs.org)! لقد استبدلنا موقعنا الثابت للجيكل بعقدة. s سيرفر الويب، مما يعطينا المرونة لتدويل الموقع وتمهيد الطريق لمزيد من الميزات الجديدة المثيرة للاهتمام.

---

## ترجمة 🌍

We've begun the process of internationalizing the website with the goal of making Electron app development accessible to a global audience of developers. نحن نستخدم منصة توطين تسمى [كراودين](https://crowdin.com/project/electron) التي تدمج مع GitHub، فتح طلبات السحب وتحديثها تلقائياً كما يترجم المحتوى إلى لغات مختلفة.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="إلكترون ناف باللغة الصينية المبسطة">
    <figcaption>إلكترونا نايف باللغة الصينية المبسطة</figcaption>
  </a>
</figure>

بالرغم من أننا كنا نعمل بهدوء على هذا الجهد حتى الآن، اكتشف أكثر من 75 من أعضاء مجتمع إلكترون بالفعل المشروع بشكل عضوي وانضموا إلى الجهد المبذول لتدويل الموقع وترجمة مستندات إلكترون إلى أكثر من 20 لغة. نحن نشهد [مساهمات يومية ](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) من الناس في جميع أنحاء العالم، مع ترجمة لغات مثل الفرنسية والفيتنامية والاندونيسية والصينية في طليعة الطريق.

لاختيار لغتك ومشاهدة تقدم الترجمة، قم بزيارة [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="اللغات المستهدفة الحالية على كراودِن">
    <figcaption>الترجمات جارية على كراودِن</figcaption>
  </a>
</figure>

إذا كنت متعدد اللغات و مهتما بالمساعدة في ترجمة مستندات Electron's و موقع الويب، قم بزيارة مستودع [electron-i18n](https://github.com/electron/electron-i18n#readme) أو القفز لليمين إلى ترجمة على [كراودين](https://crowdin.com/project/electron)، حيث يمكنك تسجيل الدخول باستخدام حساب GitHub الخاص بك.

يوجد حاليا 21 لغة مفعلة لمشروع إلكترون على كراودن. إضافة دعم لمزيد من اللغات أمر سهل ، إذا كنت مهتما بالمساعدة في الترجمة، ولكنك لا ترى لغتك مدرجة في القائمة، [دعونا نعرف](https://github.com/electron/electronjs.org/issues/new) و سنقوم بتمكينه.

## المستندات الخام المترجمة

إذا كنت تفضل قراءة الوثائق في الملفات الخام، يمكنك الآن القيام بذلك بأي لغة:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## صفحات التطبيق

اعتبارا من اليوم، يمكن لأي تطبيق إلكترون بسهولة أن تكون له صفحته الخاصة على موقع إلكترون . لبعض الأمثلة، تحقق من [Etcher](https://electronjs.org/apps/etcher)، [1الحافظة](https://electronjs.org/apps/1clipboard)، أو [GraphQL Playground](https://electronjs.org/apps/graphql-playground)، صورة هنا على النسخة اليابانية من الموقع:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL Playground">
  </a>
</figure>

هناك بعض تطبيقات إلكترون المذهلة هناك، لكنها ليست دائما سهلة للعثور عليها، وليس كل مطور لديه الوقت أو الموارد لبناء موقع ويب صحيح للتسويق وتوزيع تطبيقاته.

استخدام فقط [ملف رمز PNG وكمية صغيرة من البيانات الوصفية للتطبيق](https://github.com/electron/electron-apps/blob/master/contributing.md)، نحن قادرون على جمع الكثير من المعلومات حول تطبيق معين. باستخدام البيانات المجمعة من GitHub، يمكن الآن لصفحات التطبيق عرض لقطات الشاشة، تحميل الروابط، الإصدارات ، ملاحظات الإصدار ، و READMEs لكل تطبيق يحتوي على مستودع عام. استخدام لوحة الألوان المستخرجة من أيقونة كل تطبيق، يمكننا إنتاج [ألوان جريئة وسهلة المنال](https://github.com/zeke/pick-a-good-color) لإعطاء كل صفحة تطبيق بعض التمييز البصري.

صفحة فهرس التطبيقات [](https://electronjs.org/apps) تحتوي الآن أيضا على فئات وفلتر الكلمات الرئيسية للعثور على تطبيقات مثيرة للاهتمام مثل [GraphQL GUIs](https://electronjs.org/apps?q=graphql) و [أدوات p2p](https://electronjs.org/apps?q=graphql).

إذا كان لديك تطبيق إلكترون الذي تريده في الموقع، قم بفتح طلب سحب على [مستودع إلكتروني/إلكترون - التطبيقات](https://github.com/electron/electron-apps).

## تثبيت خط واحد مع Homebrew

مدير الحزمة [Homebrew](https://brew.sh) لـ macOS لديه أمر فرعي يسمى [cask](https://caskroom.github.io) يجعل من السهل تثبيت تطبيقات سطح المكتب باستخدام أمر واحد في جهازك ، مثل `تثبيت كاسك الخبز الذرة`.

لقد بدأنا في جمع أسماء قلعة الـ Homebrew لتطبيقات إلكترون الشهيرة ونحن الآن نعرض أمر التثبيت (لزوار macOS) في كل صفحة تطبيق تحتوي على كاز:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>خيارات التثبيت المصممة خصيصا للمنصة الخاصة بك: macOS, Windows, Linux</figcaption>
  </a>
</figure>

لعرض جميع التطبيقات التي تحمل أسماء الكاسك للهوبريو، قم بزيارة [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). إذا كنت تعرف تطبيقات أخرى مع كاسك لم يتم فهرستها بعد، [الرجاء إضافتها!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 حقل جديد

لقد قمنا بنقل الموقع من electron.atom.io إلى مجال جديد: [electronjs.org](https://electronjs.org).

وُلد مشروع إلكترون داخل [Atom](https://atom.io)، محرر النصوص مفتوح المصدر لـ GitHub مبني على تقنيات الويب. إلكترون كان يسمى أصلاً `قذيفة ذرية`. Atom كان أول تطبيق يستخدمه، ولكن لم يستغرق الأمر وقتاً طويلاً لكي يدرك الناس أن فترة تشغيل كروموم السحرية + العقدة يمكن استخدامها لجميع أنواع التطبيقات المختلفة. عندما بدأت شركات مثل مايكروسوفت وساك في استخدام `قذيفة ذرية`، وأصبح من الواضح أن المشروع يحتاج إلى اسم جديد.

وهكذا ولدت "إلكترون". في أوائل عام 2016، قام GitHub بتجميع فريق جديد للتركيز على بالتحديد على تطوير وصيانة إلكترون، بغض النظر عن الذرة. في وقت منذئذ، تم اعتماد إلكترون من قبل الآلاف من مطوري التطبيقات، وهي الآن تعتمد عليها العديد من الشركات الكبيرة، وكثير منها لديها فرق إلكترون مؤلفة من خاصة بها.

دعم مشاريع إلكترون GitHub، مثل Atom و [GitHub سطح المكتب](https://desktop.github.com) لا يزال أولوية لفريقنا، ولكن بالانتقال إلى نطاق جديد نأمل أن نساعد على توضيح التمييز التقني بين Atom و Electron.

## 🐢🚀 Node.js Everywhere

The previous Electron website was built with [Jekyll](https://jekyllrb.com), the popular Ruby-based static site generator. جيكل هو أداة رائعة لبناء مواقع ثابتة على شبكة الإنترنت، ولكن بدأ الموقع في التفوق عليه. أردنا المزيد من القدرات الديناميكية مثل إعادة التوجيه السليمة وتقديم المحتوى الديناميكي، لذا فإن خادم [Node.js](https://nodejs.org) كان الخيار الواضح.

يتضمن نظام إلكترون البيئي مشاريع مع مكونات مكتوبة في العديد من لغات البرمجة المختلفة، من بايثون إلى C++ إلى Bash. لكن جافا سكريبت هي أساس الإلكترون، وهي اللغة الأكثر استخداما في مجتمعنا.

من خلال نقل الموقع من روبي إلى Node.js، نحن نهدف إلى تقليل الحاجز إلى إدخال الأشخاص الراغبين في المساهمة في الموقع.

## ⚡ مشاركة أسهل في المصادر المفتوحة

إذا كان لديك [عقدة. s](https://nodejs.org) (8 أو أعلى) و [git](https://git-scm.org) مثبت على النظام الخاص بك، يمكنك بسهولة الحصول على موقع يعمل محليا:

```sh
git نسخة https://github.com/electronjs.org
cd electronjs.org
npm تثبيت
npm تشغيل dev
```

يتم استضافة الموقع الجديد على هيروكو. نحن نستخدم خطوط أنابيب النشر وخاصية [مراجعة التطبيقات](https://devcenter.heroku.com/articles/github-integration-review-apps) ، الذي ينشئ تلقائياً نسخة قيد التشغيل من التطبيق لكل طلب سحب . وهذا يجعل من السهل على المراجعين عرض التأثيرات الفعلية لطلب سحب على نسخة حية من الموقع.

## 🙏 شكرا للمساهمين

نود أن نوجه شكرا خاصا لجميع الناس حول العالم الذين ساهموا بوقتهم وطاقتهم للمساعدة في تحسين إلكترون. شغف مجتمع المصادر المفتوحة ساعد بشكل لا حد له في جعل إلكترون ناجحة. شكرا لك!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>