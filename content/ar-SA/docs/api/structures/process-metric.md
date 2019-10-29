# Process الكائن

* `pid` عدد صحيح - معرف العملية في المعالج.
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
iconIndex Number (اختياري) - فهرس الرمز في ملف المورد. إذا كان ملف المورد يحتوي على رموز متعددة ، فيمكن استخدام هذه القيمة لتحديد فهرس يستند إلى الصفر للرمز الذي يجب عرضه لهذه المهمة. إذا كان ملف المورد يحتوي على رمز واحد فقط ، فيجب تعيين هذه الخاصية على صفر.` String - Process type. One of the following values: 
  * `Browser`
  * `التبويب`
  * `Utility`
  * `Zygote`
  * `Sandbox helper`
  * `GPU`
  * `Pepper Plugin`
  * `Pepper Plugin Broker`
  * `Unknown`
* `cpu` [CPUUsage](cpu-usage.md) - استخدام المعالج CPU لهذه العملية.
* `creationTime` Number - Creation time for this process. The time is represented as number of milliseconds since epoch. Since the `pid` can be reused after a process dies, it is useful to use both the `pid` and the `creationTime` to uniquely identify a process.
* `memory` [MemoryInfo](memory-info.md) معلومات الذاكرة لهذه العملية.
* `sandboxed` Boolean (optional) *macOS* *Windows* - Whether the process is sandboxed on OS level.
* `integrityLevel` String (optional) *Windows* - One of the following values: 
  * `untrusted`
  * `low`
  * `medium`
  * `high`
  * `unknown`