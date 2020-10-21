---
title: "الإعلان عن دعم TypeScript في إلكترون"
author: zeke
date: '2017-06-01'
---

الآن تتضمن حزمة `electron` npm ملف تعريف TypeScript الذي يوفر شروحا مفصلة لكامل واجهة برمجة تطبيقات Electron. هذه الشروح يمكن أن تحسن تجربة تطوير إلكترون **حتى لو كنت تكتب الفانيليا جافا سكريبت**. فقط `npm قم بتثبيت إلكترون` للحصول على طباعة إلكترون محدثة في مشروعك.

---

TypeScript هي لغة برمجة مفتوحة المصدر أنشأتها مايكروسوفت. إنها مجموعة متميزة من جافا سكريبت التي توسع اللغة عن طريق إضافة دعم لـ أنواع ثابتة. مجتمع TypeScript قد نما بسرعة في السنوات الأخيرة، و TypeScript تم تصنيفه بين [أكثر لغات البرمجة حب](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) في استقصاء أحدث لمطوّر "Stack Overflow".  يوصف TypeScript بـ "JavaScript التي تقسيم"، و الفرق في [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/)، [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d)، و [مايكروسوفت](https://github.com/Microsoft/vscode) كلها تستخدمه لكتابة تطبيقات إلكترون القابلة للتطوير والتي يستخدمها الملايين من الناس .

TypeScript supports many of the newer language features in JavaScript like classes, object destructuring, and async/await, but its real differentiating feature is **type annotations**. الإعلان عن أنواع البيانات المدخلة والمخرجات المتوقعة من البرنامج الخاص بك يمكن [تقليل الأخطاء](https://slack.engineering/typescript-at-slack-a81307fa288d) ب لمساعدتك على العثور على الأخطاء في وقت التجميع. ويمكن أن تستخدم الشروح أيضاً كإعلان رسمي عن [كيفية عمل برنامجك](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

عندما تكتب المكتبات في جافاسكريبت الفانيليا، غالبا ما تكون الأنواع غامضة كفكرة لاحقة عند كتابة الوثائق. غالبا ما يمكن قبول أنواع أكثر مما تم توثيقه، أو الدالة يمكن أن تحتوي على قيود غير مرئية غير موثقة والتي يمكن أن تؤدي إلى أخطاء في وقت التشغيل.

TypeScript يحل هذه المشكلة مع **ملفات التعريف**. يصف ملف تعريف TypeScript جميع وظائف المكتبة و أنواع الإدخال و الإخراج المتوقعة. عندما يجمع مؤلفو المكتبة ملف تعريف TypeScript مع مكتبتهم المنشورة، يمكن للمستهلكين في هذه المكتبة [استكشاف API داخل محررهم](https://code.visualstudio.com/docs/editor/intellisense) والبدء في استخدامها على الفور، غالباً ما لا يحتاج الأمر إلى الاطلاع على وثائق المكتبة.

العديد من المشاريع الشعبية مثل [الزاوية](https://angularjs.org/)، [Vue. s](http://vuejs.org/), [عقدة - ثوب](https://github.com/mikedeboer/node-github) (والآن إلكترون! قم بتجميع ملف التعريف الخاص بهم وحزمه مع حزمة npm المنشورة. بالنسبة للمشاريع التي لا تجمع ملف التعريف الخاص بها، هناك [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)، نظام إيكولوجي لأطراف ثالثة من ملفات التعريف التي يحافظ عليها المجتمع.

## التثبيت

Starting at version 1.6.10, every release of Electron includes its own TypeScript definition file. عند تثبيت حزمة `electron` من npm، ملف `electron.d.ts` يتم حزمة تلقائياً مع الحزمة المثبتة.

[أكثر الطرق أمانًا](https://electronjs.org/docs/tutorial/electron-versioning/) لتثبيت إلكترون هو استخدام رقم الإصدار بالضبط:

```sh
npm تثبيت Electron --save-dev --وفر بالضبط
```

أو إذا كنت تستخدم [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
yarn إضافة إلكترون --dev --بالضبط
```

إذا كنت تستخدم بالفعل تعاريف طرف ثالث مثل `@types/electron` و `@types/node`، يجب عليك إزالتها من مشروع إلكترون الخاص بك لمنع أي تصادم.

ملف التعريف مستمد من [وثائق API المنظمة](https://electronjs.org/blog/2016/09/27/api-docs-json-schema)، لذلك سيكون دائما متسقا مع [وثائق واجهة برمجة تطبيقات إلكترون](https://electronjs.org/docs/api/). فقط قم بتثبيت `إلكترون` وستحصل دائما على تعاريف TypeScript محدثة مع إصدار إلكترون الذي تستخدمه.

## الإستعمال

للحصول على ملخص لكيفية تثبيت واستخدام شروح TypeScript الجديدة لـ Electron، شاهد هذه الشاشة التجريبية القصيرة: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

إذا كنت تستخدم [Visual Studio Code](https://code.visualstudio.com/)، فأنت لديك بالفعل دعم TypeScript مدمج. هناك أيضًا الإضافات التي يديرها المجتمع لـ [Atom](https://atom.io/packages/atom-typescript)، [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin)، [نعم](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim)و و [محررين آخرين](https://www.typescriptlang.org/index.html#download-links).

بمجرد تكوين المحرر الخاص بك لTypeScript، ستبدأ في مشاهدة المزيد من السلوكيات المراعية للسياق مثل اقتراحات الإكمال التلقائي، مرجع الطريقة المضمنة، التحقق من الوسيطة، وأكثر من ذلك.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="الاستكمال التلقائي للطريقة">
  <figcaption>طريقة الاستكمال التلقائي</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="مرجع الطريقة">
  <figcaption>مرجع الطريقة المضمنة</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="التحقق من الحجة">
  <figcaption>التحقق من الحجة</figcaption>
</figure>

## البدء مع TypeScript

إذا كنت جديداً على TypeScript وتريد أن تتعلم المزيد، هذا [فيديو تمهيدي من مايكروسوفت](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) يوفر نظرة عامة جميلة عن سبب إنشاء اللغة، كيف تعمل ، كيفية استخدامها ، وأين يتم ترؤسها.

هناك أيضًا دليل

[](https://www.typescriptlang.org/docs/handbook/basic-types.html) و [ملعب](https://www.typescriptlang.org/play/index.html) على موقع TypeScript الرسمي.</p> 

لأن TypeScript مجموعة متميزة من JavaScript، رمز JavaScript الخاص بك هو بالفعل TypeScript. هذا يعني أنه يمكنك تدريجيا تحويل مشروع جافا سكريبت الحالي إلى TypeScript، ورش في ميزات لغة جديدة حسب الحاجة.



## شكراً

ما كان لهذا المشروع أن يكون ممكنا لولا مساعدة مجتمع إلكلترون من مشرفي مفتوح المصدر. Thanks to [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Milan Burda](https://github.com/miniak), [Brendan Forster](https://github.com/shiftkey), and many others for their bug fixes, documentation improvements, and technical guidance.



## الدعم

إذا واجهت أي مشاكل باستخدام ملفات تعريف TypeScript الجديدة لـ Electron، الرجاء تقديم مشكلة في [تعريف electron-typescript-Depositor](https://github.com/electron/electron-typescript-definitions/issues).

نوع سكريبت سعيد!
