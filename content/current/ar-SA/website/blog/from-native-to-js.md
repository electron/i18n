---
title: من الأم إلى جافا سكريبت في إلكترون
author: codebytere
date: '2019-03-19'
---

كيف يمكن لمميزات Electron's المكتوبة في C++ أو Objective-C الوصول إلى JavaScript حتى تكون متاحة للمستخدم النهائي؟

---

## الخلفية

[إلكترون](https://electronjs.org) هو منصة جافا سكريبت والغرض الأساسي منها هو تقليل الحاجز للدخول للمطورين لبناء تطبيقات قوية على سطح المكتب دون القلق بشأن التطبيقات الخاصة بالمنصة. غير أن إلكترون نفسه، في جوهره، لا يزال يحتاج إلى وظيفة خاصة بالمنصة لكي يكتب بلغة معينة من لغات النظام.

في الواقع، يتعامل إلكترون مع الكود الأصلي لك حتى تتمكن من التركيز على واجهة برمجة تطبيقات جافا سكريبت واحدة.

كيف يعمل ذلك؟ كيف يمكن لمميزات Electron's المكتوبة في C++ أو Objective-C الوصول إلى JavaScript حتى تكون متاحة للمستخدم النهائي؟

لتعقب هذا المسار، دعونا نبدأ بوحدة التطبيق [``](https://electronjs.org/docs/api/app).

بفتح ملف [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) داخل دليل `lib/` الخاص بنا، ستجد السطر التالي من التعليمات البرمجية باتجاه الأعلى:

```js
ربط الربط = process.electronBinding('app')
```

يشير هذا السطر مباشرة إلى آلية Electron's لربط وحدات C++/Objective-C بجافا سكريبت لاستخدامها من قبل المطورين. هذه الوظيفة تم إنشاؤها من قبل رأس و [ملف التنفيذ](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) لفصل `ElectronBindings`.

## `العملية.electronBbinding`

هذه الملفات تضيف دالة `process.electronBbinding` ، التي تتصرف مثل Node.js' `process.binding`. `process.binding` هو تنفيذ أدنى مستوى من العقدة. [`أسلوب المتطلب ()`](https://nodejs.org/api/modules.html#modules_require_id) ، باستثناء أنه يسمح للمستخدمين `أن يطلبوا` الكود الأصلي بدلاً من الكود المكتوب في JS. هذه الدالة `process.electronBund` المخصصة تمنح القدرة على تحميل الرمز الأصلي من Electron.

عندما تتطلب وحدة جافا سكريبت عالية المستوى (مثل تطبيق ``) هذه التعليمات البرمجية الأصلية، كيف يتم تحديد وضبط حالة تلك التعليمات البرمجية الأصلية؟ أين الطرق معرضة لجافا سكريب؟ ماذا عن الخاصيات؟

## `الأصل_المتزوج`

في الوقت الحاضر يمكن العثور على إجابات على هذا السؤال في `native_mate`: شوكة من مكتبة Chromium's [`هامش`](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) التي تجعل من الأسهل حشد أنواع بين C++ و JavaScript.

في داخل `الأصلي _mate/native_mate` هناك رأس وملف تنفيذ لـ `object_template_buildder`. هذا ما يسمح لنا بتكوين وحدات في التعليمات البرمجية الأصلية التي يتوافق شكلها مع ما يتوقعه مطورو جافا سكريبت.

### `زميل:ObjectTemplateBuilding`

إذا نظرنا إلى كل وحدة إلكترون ككائن ``، من الأسهل أن نرى لماذا نريد استخدام `object_template_buildder` لبنائها. هذا الصف مبني على رأس صف يفتحه V8، والذي هو محرك جافا سكريبت مفتوح المصدر لجوجل و WebAssembl، المكتوب في C+++. V8 ينفذ مواصفات جافا سكريبت (ECMAScript)، بحيث يمكن ربط تطبيقات وظائفها الأصلية مباشرة بالتطبيقات في جافا سكريبت. على سبيل المثال، [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) يعطينا كائنات جافا سكريبت بدون وظيفة بناء ونموذج أولي مخصص. إنه يستخدم `كائن[.prototype]`، وفي جافا سكريبت سيكون مكافئ [`object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

لمشاهدة هذا في العمل، إبحث عن ملف التنفيذ لوحدة التطبيق، [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). وفيما يلي في الأسفل:

```cpp
mate:ObjectTemplateBuilder(عازل، ابتدائي ->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App::GetGPUInfo)
```

في السطر الأعلى، `.SetMethod` مطلوب في `زميل:ObjectTemplateBuilder`. `. etMethod` يمكن استدعاءه في أي مثيل من فئة `ObjectTemplateBuilder` لتعيين طرق على [نموذج الكائن المبدئي](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) في جافا سكريبت، مع الجملة التالية:

```cpp
.SetMethod("method_name", &function_to_bind)
```

هذا هو مكافئ جافا سكريبت من:

```js
وظيفة تطبيق{}
App.prototype.getGPUInfo = function () {
  // التنفيذ هنا
}
```

يحتوي هذا الصف أيضًا على دوال لتعيين الخصائص على الوحدة:

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

أو

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

هذه بدورها ستكون تطبيقات جافا سكريبت لـ [object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
وظيفة التطبيق {}
object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

و

```js
وظيفة التطبيق {}
object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
  set(newPropertyValue) {
    _myProperty = newPropertyValue
  }
})
```

من الممكن إنشاء كائنات جافا سكريبت التي تكونت مع النماذج والخصائص الأولية كما يتوقعها المطورون، ولسبب أكثر وضوحا عن الوظائف والممتلكات المنفذة على مستوى النظام الأدنى هذا!

القرار حول مكان تنفيذ أي طريقة وحدة نمطية معينة هو في حد ذاته قرار معقد وغير حتمي في كثير من الأحيان، والذي سنستوعبه في وظيفة في المستقبل.
