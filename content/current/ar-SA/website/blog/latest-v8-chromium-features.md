---
title: استخدام ميزات V8 و Chromium في إلكترون
author: سيد
date: '2016-01-07'
---

بناء تطبيق إلكترون يعني أنك تحتاج فقط إلى إنشاء رمز واحد وتصميم لمتصفح واحد، وهو أمر مفيد جداً. لكن لأن إلكترون يبقى على اطلاع مع [عقدة. s](http://nodejs.org) و [Chromium](https://www.chromium.org) بينما ينشر، تحصل أيضًا على استخدام الميزات العظيمة التي يشحنها بها. في بعض الحالات يزيل هذا التبعية التي قد تحتاج سابقا لإدراجها في تطبيق الويب.

---

There are many features and we'll cover some here as examples, but if you're interested in learning about all features you can keep an eye on the [Google Chromium blog](http://blog.chromium.org) and [Node.js changelogs](https://nodejs.org/en/download/releases). يمكنك أن ترى إصدارات Node.js, Chromium and V8 Electron التي تستخدمها في [electronjs.org/#electron-versions](https://electronjs.org/#electron-versions).

## ES6 الدعم من V8

يجمع إلكترون بين مكتبة عرض Chromium's و Node.js. يشارك الاثنان نفس محرك جافا سكريبت ، [V8](https://developers.google.com/v8). العديد من ميزات ECMAScript 2015 (ES6) مدمجة بالفعل في V8 مما يعني أنه يمكنك استخدامها في تطبيق إلكترون الخاص بك بدون أي مترجم.

فيما يلي بعض الأمثلة ولكن يمكنك أيضًا الحصول على صفوف (في الوضع الدقيق)، تحديد الكتلة، الوعود، المصفوفات المكتوبة والمزيد. تحقق من [هذه القائمة](https://nodejs.org/en/docs/es6/) لمزيد من المعلومات عن ميزات ES6 في V8.

**وظائف السهم**

```js
العثور على الوقت () => {
  console.log(تاريخ جديد ())
}
```
**اقتران السلسلة**

```js
var octocat = "Mona Lisa";
console.log(`اسم octocat's هو ${octocat}`)؛
```

**New Target**

```js
Octocat() => {
  إذا (!new.target) رمي "لست جديد";
  وحدة التحكم. og("Octocat");
}

// رماة
Octocat();
// سجلات
Octocat(); جديدة؛
```

**يشمل الصفيف**

```js
 // إرجاع true
[1, 2].includes(2)؛
```

**راحة المعلمات**

```js
// تمثيل عدد غير محدد من الحجج كمصفوفة
(o, c, ...args) => {
  console.log(args.length)
}
```

## ميزات الكروم

بفضل كل العمل الشاق الذي قامت به جوجل والمساهمون في كروميوم، عند بناء تطبيقات إلكترون يمكنك أيضًا استخدام أشياء رائعة مثل (ولكن لا تقتصر على):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [جلب بث API](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

تابع جنبا إلى جنب مع [مدونة Google Chromium](http://blog.chromium.org) لمعرفة الميزات كسفينة إصدارات جديدة ومرة أخرى. يمكنك التحقق من إصدار Chromium الذي يستخدمه إلكترون [هنا](https://electronjs.org/#electron-versions).

## ماذا أنت متحمس له؟

تغريدنا [@ElectronJS](https://twitter.com/electronjs) مع الميزات المفضلة لديك في V8 أو Chromium.

