# Using Native Node Modules

وحدات العقدة الأصلية مدعومة من قبل إلكترون، ولكن بما أن إلكترون هو من المحتمل أن يستخدم نسخة V8 مختلفة من Node binary المثبتة على نظام الخاص بك، الوحدات النمطية التي تستخدمها تحتاج إلى إعادة تجميعها للإلكترون. خلافا لهذا كل ما سيحدث عندما تحاول تشغيل تطبيقك هو الخطأ البرمجي التالي:

```sh
خطأ: تم تجميع الوحدة النمطية '/path/to/native/module.node'
مقابل إصدار Node.js مختلف باستخدام
NODE_MODULE_VERSION $XYZ. يتطلب هذا الإصدار من Node.js
NODE_MODULE_VERSION $ABC. الرجاء محاولة إعادة تجميع أو إعادة تثبيت وحدة
(على سبيل المثال، باستخدام `npm rebuild` أو `npm install`).
```

## كيفية تثبيت الوحدات الأصلية

هناك عدة طرق مختلفة لتثبيت الوحدات الأصلية:

### تثبيت وحدات وإعادة بناء لإلكترون

You can install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`][electron-rebuild] package. يمكن لهذه الوحدة النمطية تحديد إصدار إلكترون تلقائياً والتعامل مع الخطوات اليدوية لتنزيل الرؤوس وإعادة بناء الوحدات الأصلية للتطبيق الخاص بك.

على سبيل المثال، لتثبيت `electron-rebuild` ثم إعادة إنشاء وحدات معه عبر سطر الأمر:

```sh
npm تثبيت --save-dev electron-rebuild

# في كل مرة تقوم بتشغيل "npm install"، قم بتشغيل هذا:
/node_modules/. في/electron-rebuild

# على Windows إذا كان لديك مشكلة، حاول:
.\node_modules\.bin\electron-rebuild.cmd
```

للحصول على مزيد من المعلومات عن الاستخدام والتكامل مع الأدوات الأخرى، راجع README.

### استخدام `npm`

عن طريق إعداد بضعة متغيرات بيئية، يمكنك استخدام `npm` لتثبيت وحدات مباشرة.

على سبيل المثال، لتثبيت جميع التبعيات لـ Electron:

```sh
# إصدار إلكترون.
تصدير npm_config_target=1.2.3
# بنية Electron، انظر https://electronjs.org/docs/tutorial/support#supported-platforms
# للهندسة المعمارية المدعومة.
تصدير npm_config_arch=x64
تصدير npm_config_target_arch=x64
# عناوين تحميل للإلكترون.
تصدير npm_config_disturl=https://electronjs.org/headers
# أخبر node-pre-gyp أننا نبني على Electron.
تصدير npm_config_runtime=electron
# أخبر العقدة ما قبل الثانوية لبناء الوحدة من التعليمات البرمجية المصدرة.
تصدير npm_config_build_from_source=true
# تثبيت جميع الإعتمادات، وتخزين ذاكرة التخزين المؤقت إلى ~/.electron-gyp.
تثبيت HOME=~/.electron-gyp npm
```

### بناء يدوي للإلكترون

إذا كنت مطور تطوير وحدة محلية و تريد اختبارها مقابل إلكترون، قد ترغب في إعادة بناء وحدة إلكترون يدويًا. يمكنك استخدام `عقدة` مباشرة لبناء إلكترون:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild--target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` التغييرات حيث تجد رؤوس التطوير.
* `--target=1.2.3` هو إصدار إلكترون.
* `--dist-url=...` يحدد أين يجب تنزيل الرؤوس.
* `--arch=x64` يقول أن الوحدة تم بناؤها لنظام 64-بت.

### بناء يدوي لبناء مخصص من إلكترون

To compile native Node modules against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm إعادة البناء --nodedir=/path/to/electron/vendor/node
```

## اكتشاف الأخطاء وإصلاحها

إذا قمت بتثبيت وحدة نمطية أصلية ووجدت أنها لا تعمل، تحتاج إلى التحقق من الأشياء التالية:

* عند الشك، قم بتشغيل `إلكترون - إعادة البناء` أولاً.
* تأكد من أن الوحدة الأصلية متوافقة مع المنصة المستهدفة و الهندسة المعمارية لتطبيق إلكترون الخاص بك.
* تأكد من أن `win_delay_load_hook` لم يتم تعيينه إلى `خاطئ` في الوحدة `binding.gyp`.
* بعد ترقية الإلكترون، تحتاج عادة إلى إعادة بناء الوحدات.

### ملاحظة حول `win_delay_load_hook`

على Windows، بشكل افتراضي، تربط `node-gyp` الوحدات الأصلية مقابل `node.dll`. ومع ذلك، في إلكترون 4.x وما فوق، فإن الرموز التي تحتاجها الوحدات الأصلية هي تصدر بواسطة `إلكترون. xe`، ولا يوجد `عقد.dll`. من أجل تحميل وحدات الأصلية على ويندوز، `العقدة` تثبيت [تأخير التحميل الرابط](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) الذي يشغل عندما يتم تحميل الوحدة الأصلية، وإعادة توجيه العقدة `. س` إشارة إلى استخدام قابلة للتنفيذ للتحميل بدلاً من البحث عن `عقدة. سوف` في مسار البحث في المكتبة (والذي لن يجلب شيئا). لذلك، على إلكترون 4.x وما فوق، `'win_delay_load_hook': 'true'` مطلوب لتحميل الوحدات الأصلية.

إذا حصلت على خطأ مثل `الوحدة لم تقم بالتسجيل الذاتي`، أو `لم يتم العثور على الإجراء المحدد
`، قد يعني أن الوحدة التي تحاول استخدامها لم تتضمن بشكل صحيح رابط التأخير في التحميل.  إذا تم بناء الوحدة باستخدام عقدة - مصر, تأكد من تعيين متغير `win_delay_load_hook` إلى `true` في ربط `. yp` ملف ولا يتم تجاوزه في أي مكان.  إذا تم بناء الوحدة النمطية مع نظام آخر، ستحتاج إلى التأكد من أنك تبني مع رابط تأخير التحميل المثبت في الرئيسية `. ملف مود` `link.exe` التذرع يجب أن يبدو هكذا:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

على وجه الخصوص، من المهم أن:

- قمت بالربط ضد `node.lib` من _Electron_ وليس العقدة. إذا قمت بالربط ضد الخطأ `node.lib` ستحصل على أخطاء وقت التحميل عندما تحتاج إلى وحدة في Electron.
- قمت بإدراج العلم `/DELAYLOAD:node.exe`. إذا كانت العقدة `xe` الرابط ليس تأخير، ثم لن يحصل رابط التأخير على فرصة لإطلاق النار ولن يتم حل رموز العقدة بشكل صحيح.
- `win_delay_load_hook.obj` مرتبط مباشرة بـ DLL النهائية. إذا تم إعداد الرابط في DLL تابع، فلن يطلق في الوقت المناسب.

راجع [`عقدة`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) للحصول على مثال على رابط تأخير التحميل إذا كنت تنفذ حسابك.

## الوحدات التي تعتمد على `مرحلة التجهيز`

[`البناء المسبق`](https://github.com/prebuild/prebuild) يوفر طريقة لنشر وحدات العقدة الأصلية مع ثنائيات تم بناؤها مسبقاً لإصدارات متعددة من العقدة والإلكترون.

إذا كانت الوحدات توفر ثنائيات للاستخدام في إلكترون، تأكد من حذف `--build-from-source` و `npm_config_build_from_source` Environment من أجل الاستفادة الكاملة من البينوكيات التي تم بناؤها مسبقاً.

## الوحدات التي تعتمد على `ما قبل العقدة`

The [`node-pre-gyp` tool][node-pre-gyp] provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

عادة ما تعمل هذه الوحدات بشكل جيد تحت إلكترون، ولكن في بعض الأحيان عندما يستخدم إلكترون نسخة أحدث من V8 من العقدة و/أو هناك تغييرات ABI، قد تحدث أشياء سيئة . لذا بشكل عام، من المستحسن دائمًا بناء وحدات محلية من كود المصدر. `إلكترون - إعادة البناء` يتعامل مع هذا لك تلقائياً.

إذا كنت تتبع طريقة `npm` لتثبيت الوحدات، فيتم ذلك بشكل افتراضي، إن لم يكن ذلك، يجب عليك تمرير `--build-from -source` إلى `npm`، أو تعيين `npm_config_build_from_source` متغير البيئة.

[electron-rebuild]: https://github.com/electron/electron-rebuild
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
