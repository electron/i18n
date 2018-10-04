# اكتب String (اختياري) - أحد ما يلي: المهام - سيتم وضع العناصر في هذه الفئة في فئة المهام القياسية. يمكن أن يكون هناك فئة واحدة فقط ، وسيتم عرضها دائمًا في أسفل قائمة الانتقال السريع. متكرر - يعرض قائمة من الملفات التي يفتحها التطبيق بشكل متكرر ، يتم تعيين اسم الفئة وعناصرها بواسطة Windows. حديث - يعرض قائمة بالملفات التي تم فتحها مؤخرًا بواسطة التطبيق ، يتم تعيين اسم الفئة وعناصرها بواسطة Windows. يمكن إضافة العناصر إلى هذه الفئة بشكل غير مباشر باستخدام app. addRecentDocument (مسار). custom - لعرض المهام أو روابط الملفات ، يجب أن يتم تعيين الاسم بواسطة التطبيق. اسم السلسلة (اختياري) - يجب تحديده إذا كان النوع مخصصًا ، وإلا يجب حذفه. عناصر JumpListItem [] (اختياري) - صفيف كائنات JumpListItem إذا كان النوع هو مهام أو مخصص ، وإلا يجب حذفه. ملاحظة: إذا كان كائن JumpListCategory لا يحتوي على النوع ولا خاصية الاسم ، فسيتم افتراض أن نوعه هو مهام. إذا تم تعيين خاصية الاسم ولكن تم حذف خاصية الكتابة ، فيتم افتراض أن النوع مخصص

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
iconIndex Number (اختياري) - فهرس الرمز في ملف المورد. إذا كان ملف المورد يحتوي على رموز متعددة ، فيمكن استخدام هذه القيمة لتحديد فهرس يستند إلى الصفر للرمز الذي يجب عرضه لهذه المهمة. إذا كان ملف المورد يحتوي على رمز واحد فقط ، فيجب تعيين هذه الخاصية على صفر.` السلسلة (اختياري) - أحد ما يلي: 
  * `task` - A task will launch an app with specific arguments.
  * `separator` - Can be used to separate items in the standard `Tasks` category.
  * `file` - A file link will open a file using the app that created the Jump List, for this to work the app must be registered as a handler for the file type (though it doesn't have to be the default handler).
* `path` String (optional) - Path of the file to open, should only be set if `type` is `file`.
* `program` String (optional) - Path of the program to execute, usually you should specify `process.execPath` which opens the current program. Should only be set if `type` is `task`.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.