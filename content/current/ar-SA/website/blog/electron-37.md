---
title: ما هو الجديد في إلكترون 0.37
author: zeke
date: '2016-03-25'
---

إلكترون `0. 7` تم إصدارها مؤخرا [](https://github.com/electron/electron/releases) وشملت ترقية كبيرة من Chrome 47 إلى Chrome 49 وكذلك العديد من واجهات API الأساسية الجديدة. هذا الإصدار الأخير يجلب في جميع الميزات الجديدة التي تم شحنها في [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) و [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html). يتضمن هذا الخصائص المخصصة لـ CSS، وزيادة دعم [ES6](http://www.ecma-international.org/ecma-262/6.0/) ، `تحسين حدث المفاتيح` ، `التحسينات الواعدة` ، والعديد من الميزات الجديدة الأخرى المتاحة الآن في تطبيق إلكترون الخاص بك.

---

## ما الجديد

### CSS Custom Properties

إذا كنت قد استخدمت لغات معالجة مسبقة مثل Sass and Less، فمن المحتمل أن تكون على دراية بمتغيرات **، التي تسمح لك بتحديد القيم القابلة لإعادة الاستخدام لأشياء مثل مخططات الألوان والتخطيطات. المتغيرات تساعد على الحفاظ على أوراق الأنماط الخاصة بك وأكثر قابلية للصيانة.

خصائص CSS المخصصة مماثلة للمتغيرات المعالجة مسبقاً من حيث أنها قابلة لإعادة الاستخدام. ولكن لديهم أيضا ميزة فريدة تجعلهم أكثر قوة ومرونة: **يمكن التلاعب بهم باستخدام جافا سكريبت**. هذه الميزة الدقيقة ولكن القوية تسمح بتغييرات ديناميكية في الواجهات البصرية بينما لا تزال تستفيد من [تسارع أجهزة CSS](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions)، وقللت من ازدواجية التعليمات البرمجية بين الواجهه الأمامي وورقات الأسلوب.

لمزيد من المعلومات على خصائص CSS المخصصة، راجع [MDN مقالة](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) و [Google Chrome التجريبي](https://googlechrome.github.io/samples/css-custom-properties/).

#### متغيرات CSS قيد العمل

دعونا نمشي عبر مثال متغير بسيط يمكن إضعافه مباشرة في التطبيق الخاص بك.

```css
:root {
  --awesome-color: #A5ECFA;
}

body {
  background-color: var(--awesome-color);
}
```

القيمة المتغيرة يمكن استرجاعها وتغييرها مباشرة في JavaScript:

```js
// احصل على قيمة المتغير ' #A5ECFA'
اترك اللون = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// عيّن قيمة المتغير إلى 'البرتقالي'
document.body.styProperty('--awesome-color', 'orange')
```

يمكن أيضا تعديل القيم المتغيرة من **الأنماط** قسم أدوات التطوير للحصول على ردود الفعل السريعة والتغييرات:

![خصائص CSS في تبويب الأنماط](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `KeyboardEvent.code` الخاصية

أضاف Chrome 48 خاصية `كود` الجديدة المتاحة في `حدث مفاتيح` الأحداث التي ستكون المفتاح المادي المضغوط بشكل مستقل عن تخطيط لوحة مفاتيح نظام التشغيل.

وهذا من شأنه أن يجعل تنفيذ اختصارات لوحة المفاتيح المخصصة في تطبيق إلكترون الخاص بك أكثر دقة واتساقا عبر الآلات والتهيئات.

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} تم الضغط عليها.`)
})
```

شاهد [هذا المثال](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) لرؤيته في العمل.

### أحداث رفض الوعد

أضاف Chrome 49 اثنين من الأحداث `النافذة` الجديدة التي تسمح لك بأن يتم إعلامك عندما يتم عدم التعامل مع [الوعد](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) المرفوض.

```js
window.addEventListener('unhandledrefreftion', function (event) {
  console.log('لم يتم التعامل مع الوعد المرفوض', event.promise, event.reason)
})

window. ddEventListener('reftionhandled', function (event) {
  console.log('تم التعامل مع وعد مرفوض', event.promise, event.reason)
})
```

شاهد [هذا المثال](https://googlechrome.github.io/samples/promise-rejection-events/index.html) لرؤيته في العمل.

### تحديثات ES2015 في V8

الإصدار من V8 الآن في إلكترون يتضمن [91% من ES2015](https://kangax.github.io/compat-table/es6/#chrome49). فيما يلي بعض الإضافات المثيرة للاهتمام التي يمكنك استخدامها خارج المربع - بدون أعلام أو مترجمين مسبقين:

#### المعلمات الافتراضية

```js
الدالة مضاعفة(x, y = 1) {
  العودة x * y
}

مضاعف(5) // 5
```

#### Destructuring assignment

أضاف Chrome 49 [مهمة التدمير](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) لجعل تعيين المتغيرات ومعلمات الوظيفة أسهل بكثير.

هذا يجعل إلكترون بحاجة إلى أنظف وأكثر توافقاً لتعيين الآن:

##### تتطلب عملية المتصفح

```js
إختر {app, BrowserWindow, Menu} = مطلوبة ('electron')
```

##### عملية العارض تتطلب

```js
إختر {dialog, Tray} = مطلوبة ('electron').بعد
```

##### أمثلة أخرى

```js
// تدمير مصفوفة وتخطي العنصر الثاني
في [أول، ، ، اخير] = العثور على All()

// هدم الدالة
دالة الذي({displayName: displayname, fullname: {firstName: name}}){
  console. og(`${displayName} هو ${name}`)
}

دع المستخدم = {
  عرض الاسم: "jdoe"
  الاسم الكامل: {
      الاسم الأول: "جون"،
      الاسم الأخير: "Doe"
  }
}
whois(user) // "jdoe is John"

/// Destructuring a objec
le {name, avatar} = getUser()
```

## تطبيقات إلكترون جديدة

عدد قليل من تطبيقات إلكترون الجديدة أدناه ، يمكنك رؤية كل واجهة برمجة التطبيقات الجديدة في ملاحظات الإصدار [إصدارات إلكترون](https://github.com/electron/electron/releases).

#### `إظهار` و `إخفاء` الأحداث على `نافذة المتصفح`

وتنبعث هذه الأحداث عندما تكون النافذة إما معروضة أو مخفية.

```js
const {BrowserWindow} = مطلوب('electron')

دع نافذة = نافذة متصفح جديدة({width: 500, height: 500}
n('show', function () { console.log('عرض النوافذ') })
window.on('hide', function () { console.log('تم إخفاء النوافذ') })
```

#### `تم تغيير المنصة` على `تطبيق` لـ `OS X`

ينبعث هذا الحدث عندما يتم تبديل موضوع [الوضع المظلم](https://discussions.apple.com/thread/6661740) للنظام.

```js
const {app} = مطلوب('electron')

app.on('platform-theme-changed', function () {
  console.log('المنصة تغيرت. في الوضع المظلم؟ ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` لـ `OS X`

هذه الطريقة ترجع `حقيقة` إذا كان النظام في وضع الظلام، و `كاذب` خلاف ذلك.

#### `تمرير اللمس` و `تمرير اللمس - نهاية` أحداث إلى متصفح نافذة `OS X`

وتنطلق هذه الأحداث عندما تبدأ أو تنتهي مرحلة حدث عجلة التمرير.

```js
const {BrowserWindow} = require('electron')

دع النافذة = BrowserWindow({width: 500, height: 500}
window.on('scroll-touch-star', function () { console. og('لمس التمرير بدأت') })
window.on('scroll-touch-end', function () { console.log('لمس إنتهى) })
```

