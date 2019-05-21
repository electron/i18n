# process

> Extensions to process object.

العملية:  الرئيسية </ 0> ،  العارض </ 1></p> 

Electron's `process` object is extended from the [Node.js `process` object](https://nodejs.org/api/process.html). It adds the following events, properties, and methods:

## Sandbox

In sandboxed renderers the `process` object contains only a subset of the APIs:

* `crash()`
* `hang()`
* `getCreationTime()`
* `getHeapStatistics()`
* `getProcessMemoryInfo()`
* `getSystemMemoryInfo()`
* `getCPUUsage()`
* `getIOCounters()`
* `argv`
* `execPath`
* `env`
* `pid`
* `arch`
* `platform`
* `sandboxed`
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
iconIndex Number (اختياري) - فهرس الرمز في ملف المورد. إذا كان ملف المورد يحتوي على رموز متعددة ، فيمكن استخدام هذه القيمة لتحديد فهرس يستند إلى الصفر للرمز الذي يجب عرضه لهذه المهمة. إذا كان ملف المورد يحتوي على رمز واحد فقط ، فيجب تعيين هذه الخاصية على صفر.`
* `version`
* `versions`
* `mas`
* `windowsStore`

## Events

### الحدث: "تحميل"

Emitted when Electron has loaded its internal initialization script and is beginning to load the web page or the main script.

It can be used by the preload script to add removed Node global symbols back to the global scope when node integration is turned off:

```javascript
// preload.js
const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
  global.setImmediate = _setImmediate
  global.clearImmediate = _clearImmediate
})
```

## Properties

### `process.defaultApp`

A `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### `process.isMainFrame`

A `Boolean`, `true` when the current renderer context is the "main" renderer frame. If you want the ID of the current frame you should use `webFrame.routingId`.

### `process.mas`

A `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### `process.noAsar`

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### `process.noDeprecation`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. This property is used instead of the `--no-deprecation` command line flag.

### `process.enablePromiseAPIs`

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr` when formerly callback-based APIs converted to Promises are invoked using callbacks. Setting this to `true` will enable deprecation warnings.

### `process.resourcesPath`

A `String` representing the path to the resources directory.

### `process.sandboxed`

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### `process.throwDeprecation`

A `Boolean` that controls whether or not deprecation warnings will be thrown as exceptions. Setting this to `true` will throw errors for deprecations. This property is used instead of the `--throw-deprecation` command line flag.

### `process.traceDeprecation`

A `Boolean` that controls whether or not deprecations printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for deprecations. This property is instead of the `--trace-deprecation` command line flag.

### `process.traceProcessWarnings`

A `Boolean` that controls whether or not process warnings printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### `process.type`

A `String` representing the current process's type, can be `"browser"` (i.e. main process), `"renderer"`, or `"worker"` (i.e. web worker).

### `process.versions.chrome`

A `String` representing Chrome's version string.

### `process.versions.electron`

A `String` representing Electron's version string.

### `process.windowsStore`

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

## Methods

الطرق

### `process.crash()`

Causes the main thread of the current process crash.

### `process.getCreationTime()`

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

### `process.getCPUUsage()`

Returns [`CPUUsage`](structures/cpu-usage.md)

### `process.getIOCounters()` *Windows* *Linux*

Returns [`IOCounters`](structures/io-counters.md)

### `process.getHeapStatistics()`

Returns `Object`:

* `totalHeapSize` Integer
* `totalHeapSizeExecutable` Integer
* `totalPhysicalSize` Integer
* `totalAvailableSize` Integer
* `usedHeapSize` Integer
* `heapSizeLimit` Integer
* `mallocedMemory` Integer
* `peakMallocedMemory` Integer
* `doesZapGarbage` Boolean

Returns an object with V8 heap statistics. Note that all statistics are reported in Kilobytes.

### `process.getProcessMemoryInfo()`

Returns `Object`:

* `residentSet` Integer *Linux* and *Windows* - The amount of memory currently pinned to actual physical RAM in Kilobytes.
* `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
* `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### `process.getSystemMemoryInfo()`

Returns `Object`:

* `total` Integer - The total amount of physical memory in Kilobytes available to the system.
* `free` Integer - The total amount of memory not being used by applications or disk cache.
* `swapTotal` Integer *Windows* *Linux* - The total amount of swap memory in Kilobytes available to the system.
* `swapFree` Integer *Windows* *Linux* - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### `process.takeHeapSnapshot(filePath)`

* `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### `process.hang()`

Causes the main thread of the current process hang.

### ماك أوس لينكس

* `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.