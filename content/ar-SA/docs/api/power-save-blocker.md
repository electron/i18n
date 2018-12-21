# powerSaveBlocker

> Block the system from entering low-power (sleep) mode.

العملية: [Main](../glossary.md#main-process)

For example:

```javascript
const { powerSaveBlocker } = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep')
console.log(powerSaveBlocker.isStarted(id))

powerSaveBlocker.stop(id)
```

## Methods

The `powerSaveBlocker` module has the following methods:

### `powerSaveBlocker.start(type)`

* `اكتب String (اختياري) - أحد ما يلي:
مهمة - ستطلق المهمة تطبيقًا يحتوي على وسائط محددة.
فاصل - يمكن استخدامه لفصل العناصر في فئة المهام القياسية.
file - سيفتح رابط ملف ملفًا باستخدام التطبيق الذي أنشأ قائمة الانتقال السريع ، لذلك يجب تسجيل التطبيق كمعالج لنوع الملف (على الرغم من أنه لا يلزم أن يكون المعالج الافتراضي).
يجب عدم تعيين مسار المسار (اختياري) - مسار الملف المراد فتحه ، إلا إذا كان الملف هو الملف.
برنامج سلسلة (اختياري) - مسار البرنامج لتنفيذ ، عادة يجب عليك تحديد process.execPath الذي يفتح البرنامج الحالي. يجب أن يتم تعيينها فقط إذا كانت الكتابة مهمة.
args String (اختياري) - وسيطات سطر الأوامر عند تنفيذ البرنامج. يجب أن يتم تعيينها فقط إذا كانت الكتابة مهمة.
title String (اختياري) - النص الذي سيتم عرضه للعنصر في قائمة الانتقال السريع. يجب أن يتم تعيينها فقط إذا كانت الكتابة مهمة.
description string (اختياري) - وصف المهمة (معروضة في تلميح الأدوات). يجب أن يتم تعيينها فقط إذا كانت الكتابة مهمة.
iconPath String (اختياري) - المسار المطلق لأيقونة ليتم عرضها في قائمة الانتقال السريع ، والتي يمكن أن تكون ملف موارد اعتباطي يحتوي على رمز (مثل .ico ، .exe ، .dll). يمكنك عادة تحديد process.execPath لإظهار رمز البرنامج.
iconIndex Number (اختياري) - فهرس الرمز في ملف المورد. إذا كان ملف المورد يحتوي على رموز متعددة ، فيمكن استخدام هذه القيمة لتحديد فهرس يستند إلى الصفر للرمز الذي يجب عرضه لهذه المهمة. إذا كان ملف المورد يحتوي على رمز واحد فقط ، فيجب تعيين هذه الخاصية على صفر.` String - Power save blocker type. 
  * `prevent-app-suspension` - Prevent the application from being suspended. Keeps system active but allows screen to be turned off. Example use cases: downloading a file or playing audio.
  * `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

Returns `Integer` - The blocker ID that is assigned to this power blocker.

Starts preventing the system from entering lower-power mode. Returns an integer identifying the power save blocker.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Only the highest precedence type takes effect. In other words, `prevent-display-sleep` always takes precedence over `prevent-app-suspension`.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### `powerSaveBlocker.stop(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### `powerSaveBlocker.isStarted(id)`

* `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.