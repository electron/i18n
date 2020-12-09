# كسر تغييرات API

سيتم توثيق كسر التغييرات هنا، مع إضافة تحذيرات الإهمال إلى رمز JS حيثما أمكن. على الأقل [إصدار رئيسي واحد](tutorial/electron-versioning.md#semver) قبل إجراء التغيير.

### أنواع التغييرات المكسورة

وتستخدم هذه الوثيقة الاتفاقية التالية لتصنيف التغييرات المفكّرة:

* **تم تغيير API:** تم تغيير واجهة برمجة التطبيقات بطريقة تضمن أن التعليمات البرمجية التي لم يتم تحديثها ستمنح استثناء.
* **تغير السلوك:** تغير سلوك إلكترون ولكن ليس بطريقة تسمح بالضرورة بإلقاء استثناء.
* **التغيير الافتراضي:** قد يتوقف الكود حسب الإفتراضي القديم، وليس بالضرورة رمي استثناء. يمكن استعادة السلوك القديم من خلال تحديد القيمة صراحة.
* **مهمل:** تم وضع علامة API على أنه مهمل. سوف يستمر تشغيل API، ولكن سوف ينبعث تحذير مهمل، وسيتم إزالته في إصدار مستقبلي.
* **تمت إزالتها:** تم إزالة API أو ميزة لم تعد مدعومة من قبل إلكترون.

## مخطط كسر تغييرات API (13.0)

### API Changed: `session.setPermissionCheckHandler(handler)`

The `handler` methods first parameter was previously always a `webContents`, it can now sometimes be `null`.  You should use the `requestingOrigin`, `embeddingOrigin` and `securityOrigin` properties to respond to the permission check correctly.  As the `webContents` can be `null` it can no longer be relied on.

```js
// Old code
session.setPermissionCheckHandler((webContents, permission) => {
  if (webContents.getURL().startsWith('https://google.com/') && permission === 'notification') {
    return true
  }
  return false
})

// Replace with
session.setPermissionCheckHandler((webContents, permission, requestingOrigin) => {
  if (new URL(requestingOrigin).hostname === 'google.com' && permission === 'notification') {
    return true
  }
  return false
})
```

### أزيل: `shell.moveItemToTrash()`

تم إزالة واجهة برمجة التطبيقات المتزامنة `shell.moveItemToTrash()`. استخدم في نفس الوقت `shell.trashItem()` بدلا من ذلك.

```js
// Removed in Electron 13
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

### Removed: `BrowserWindow` extension APIs

The deprecated extension APIs have been removed:

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Use the session APIs instead:

* `ses.loadExtension(path)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
// Removed in Electron 13
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Replace with
session.defaultSession.loadExtension(path)
```

```js
// Removed in Electron 13
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Replace with
session.defaultSession.removeExtension(extension_id)
```

```js
// Removed in Electron 13
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Replace with
session.defaultSession.getAllExtensions()
```

## Planned Breaking API Changes (12.0)

### حذف: دعم Pepper Flash

لقد أزال الكروم الدعم للفلاش، لذا يجب أن نتبع نفس الشيء. راجع Chromium's [Flash Roadmap](https://www.chromium.org/flash-roadmap) لمزيد من التفاصيل

### التغيير الافتراضي: `سياق العزل` الافتراضي إلى `صحيح`

في إلكترون 12، سيتم تمكين `التنازل الافتراضي`  لاستعادة السلوك السابق، `السياق: خطأ` يجب أن يتم تحديده في تفضيلات ويب.

نحن [نوصي بتمكين التجاوز السياقي](https://github.com/electron/electron/blob/master/docs/tutorial/security.md#3-enable-context-isolation-for-remote-content) لأمن تطبيقك.

لمزيد من التفاصيل انظر: https://github.com/electron/electron/issues/23506.

### Removed: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been removed. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Removed in Electron 12
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Removed: `crashReporter` methods in the renderer process

The following `crashReporter` methods are no longer available in the renderer process:

* `تحطم Reporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

They should be called only from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### التغيير الافتراضي: `crashReporter.start({ compress: true })`

القيمة الافتراضية لخيار `ضغط` إلى `crashReporter.start` تغيرت من `خاطئ` إلى `true`. هذا يعني أن مقالب الأعطال سيتم تحميلها إلى خادم تعطل التنصت مع `ترميز المحتوى: gzip` رأس ، وسيتم الضغط على الجسم .

إذا كان خادم الانهيار الخاص بك لا يدعم الحمولات المضغوطة، يمكنك إيقاف الضغط عن طريق تحديد `{ compress: false }` في خيارات مراسل الأعطال .

### مهمل: `وحدة عن بعد`

وحدة `البعيد` مهملة في إلكترون 12، وسيتم إزالتها في إلكترون 14. تم استبداله بوحدة [`@electron/remote`](https://github.com/electron/remote)

```js
// مهمل في إلكترون 12:
في { BrowserWindow } = مطلوبة ('electron').بعد
```

```js
// استبدل بـ:
const { BrowserWindow } = require('@electron/remote')

/ / في العملية الرئيسية:
require('@electron/remote/main').initialize()
```

### مهمل: `shell.moveItemToTrash()`

تم استبدال المزامنة `shell.moveItemToTrash()` بالجديد asynchronous `shell.trashItem()`.

```js
// Deprecated in Electron 12
shell.moveItemToTrash(path)
// Replace with
shell.trashItem(path).then(/* ... */)
```

## Planned Breaking API Changes (11.0)

### Removed: `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` and `id` property of `BrowserView`

The experimental APIs `BrowserView.{destroy, fromId, fromWebContents, getAllViews}` have now been removed. Additionally, the `id` property of `BrowserView` has also been removed.

For more detailed information, see [#23578](https://github.com/electron/electron/pull/23578).

## مخطط كسر تغييرات API (10.0)

### Deprecated: `companyName` argument to `crashReporter.start()`

The `companyName` argument to `crashReporter.start()`, which was previously required, is now optional, and further, is deprecated. To get the same behavior in a non-deprecated way, you can pass a `companyName` value in `globalExtra`.

```js
// Deprecated in Electron 10
crashReporter.start({ companyName: 'Umbrella Corporation' })
// Replace with
crashReporter.start({ globalExtra: { _companyName: 'Umbrella Corporation' } })
```

### Deprecated: `crashReporter.getCrashesDirectory()`

The `crashReporter.getCrashesDirectory` method has been deprecated. Usage should be replaced by `app.getPath('crashDumps')`.

```js
// Deprecated in Electron 10
crashReporter.getCrashesDirectory()
// Replace with
app.getPath('crashDumps')
```

### Deprecated: `crashReporter` methods in the renderer process

Calling the following `crashReporter` methods from the renderer process is deprecated:

* `تحطم Reporter.start`
* `crashReporter.getLastCrashReport`
* `crashReporter.getUploadedReports`
* `crashReporter.getUploadToServer`
* `crashReporter.setUploadToServer`
* `crashReporter.getCrashesDirectory`

The only non-deprecated methods remaining in the `crashReporter` module in the renderer are `addExtraParameter`, `removeExtraParameter` and `getParameters`.

All above methods remain non-deprecated when called from the main process.

See [#23265](https://github.com/electron/electron/pull/23265) for more details.

### مهمل: `crashReporter.start({ compress: false })`

تم تجاهل إعداد `{ compress: false }` في `crashReporter.start`. تقريبا جميع خوادم تحطم الانترنت تدعم ضغط gzip. سيتم إزالة هذا الخيار في الإصدار المستقبلي من إلكترون.

### حذف: ارتباط نافذة المتصفح

سيتم إزالة خيار `صلة القرابة` عند بناء `نافذة متصفح جديدة` كجزء من خطتنا لزيادة المواءمة مع نموذج عملية كروميوم للأمن، الأداء وإمكانية الصيانة.

للحصول على مزيد من المعلومات التفصيلية، انظر [#18397](https://github.com/electron/electron/issues/18397).

### التغيير الافتراضي: `enableRemoteModule` الافتراضي إلى `خاطئ`

في إلكترون 9، بدأ استخدام الوحدة النمطية عن بعد دون تمكينها صراحة عن طريق `تمكين الوحدة النمطية البعيدة` في إطلاق تحذير. في إلكترون 10، تم الآن تعطيل الوحدة النمطية عن بعد بشكل افتراضي. لاستخدام الوحدة النمطية البعيدة، `تمكين الوحدة: صحيح` يجب أن يتم تحديدها في تفضيلات ويب:

```js
const w = متصفح ويندوز جديد ({
  webPreferences: {
    enableRemoteModule: true
  }
})
```

نحن [نوصي بالتحرك بعيداً عن وحدة البعيدة](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31).

### `protocol.unregisterProtocol`

### `protocol.uninterceptProtocol`

The APIs are now synchronous and the optional callback is no longer needed.

```javascript
// Deprecated
protocol.unregisterProtocol(scheme, () => { /* ... */ })
// Replace with
protocol.unregisterProtocol(scheme)
```

### `protocol.registerFileProtocol`

### `protocol.registerBufferProtocol`

### `protocol.registerStringProtocol`

### `protocol.registerHttpProtocol`

### `protocol.registerStreamProtocol`

### `protocol.interceptFileProtocol`

### `protocol.interceptStringProtocol`

### `protocol.interceptBufferProtocol`

### `protocol.interceptHttpProtocol`

### `protocol.interceptStreamProtocol`

The APIs are now synchronous and the optional callback is no longer needed.

```javascript
// Deprecated
protocol.registerFileProtocol(scheme, handler, () => { /* ... */ })
// Replace with
protocol.registerFileProtocol(scheme, handler)
```

The registered or intercepted protocol does not have effect on current page until navigation happens.

### `protocol.isProtocolHandled`

This API is deprecated and users should use `protocol.isProtocolRegistered` and `protocol.isProtocolIntercepted` instead.

```javascript
// Deprecated
protocol.isProtocolHandled(scheme).then(() => { /* ... */ })
// Replace with
const isRegistered = protocol.isProtocolRegistered(scheme)
const isIntercepted = protocol.isProtocolIntercepted(scheme)
```

## مخطط كسر تغييرات API (9.0)

### التغيير الافتراضي: يتم تعطيل تحميل الوحدات الأصلية غير ذات السياق في عملية العارض بشكل افتراضي

اعتبارا من إلكترون 9 نحن لا نسمح بتحميل وحدات محلية غير واعية بالسياق في عملية العرض.  هذا لتحسين الأمان والأداء وقابلية الصيانة من إلكترون كمشروع.

إذا كان هذا يؤثر عليك، يمكنك مؤقتا تعيين `app.allowRendererProcessreuse` إلى `خاطئ` للعودة إلى السلوك القديم.  هذه العلامة ستكون فقط خيارا حتى إلكترون 11 لذلك يجب عليك التخطيط لتحديث وحداتك الأصلية لتكون على علم بالسياق.

للحصول على مزيد من المعلومات التفصيلية، انظر [#18397](https://github.com/electron/electron/issues/18397).

### Deprecated: `BrowserWindow` extension APIs

The following extension APIs have been deprecated:

* `BrowserWindow.addExtension(path)`
* `BrowserWindow.addDevToolsExtension(path)`
* `BrowserWindow.removeExtension(name)`
* `BrowserWindow.removeDevToolsExtension(name)`
* `BrowserWindow.getExtensions()`
* `BrowserWindow.getDevToolsExtensions()`

Use the session APIs instead:

* `ses.loadExtension(path)`
* `ses.removeExtension(extension_id)`
* `ses.getAllExtensions()`

```js
// Deprecated in Electron 9
BrowserWindow.addExtension(path)
BrowserWindow.addDevToolsExtension(path)
// Replace with
session.defaultSession.loadExtension(path)
```

```js
// Deprecated in Electron 9
BrowserWindow.removeExtension(name)
BrowserWindow.removeDevToolsExtension(name)
// Replace with
session.defaultSession.removeExtension(extension_id)
```

```js
// Deprecated in Electron 9
BrowserWindow.getExtensions()
BrowserWindow.getDevToolsExtensions()
// Replace with
session.defaultSession.getAllExtensions()
```

### حذف: `<webview>.getWebContents()`

تم إزالة هذا API ، الذي تم إهماله في إلكترون 8.0، الآن.

```js
// تمت إزالته في Electron 9.0
webview.getWebContents()
// استبدل بـ
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

### حذف: `webFrame.setLayoutZoomlevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. تم إهمال الدالة في إلكترون 8.x، وتم إزالتها في إلكترون 9.x. تم الآن تثبيت حدود مستوى التكبير عند حد أدنى صفر. 5 بحد أقصى 5.0، كما هو معرّف [هنا](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

### تغيير السلوك: إرسال كائنات غير جاهزة فوق IPC الآن يرمي استثناء

في إلكترون 8.0، تم تغيير IPC لاستخدام خوارزمية الاستنساخ الهيكلية، مع إدخال تحسينات هامة على الأداء. للمساعدة في تيسير الانتقال، تم الحفاظ على خوارزمية التسلسل التسلسلي لـ IPC القديمة واستخدامها لبعض الكائنات التي ليست قابلة للتسلسل مع نسخة منظمة. على وجه الخصوص، كائنات DOM (على سبيل المثال `العنصر`، `الموقع` و `DOMMatrix`)، العقدة. العناصر المدعومة بفئات C++ (على سبيل المثال `عملية. nv`، بعض الأعضاء في `البث`، وعناصر إلكترون المدعومة بفصول C++ (على سبيل المثال `محتويات الويب`، `نافذة المتصفح` و `WebFrame`) ليست متسلسلة مع النسخ الهيكلية. كلما استدعت الخوارزمية القديمة، تم طباعة تحذير مهمل.

في إلكترون 9. ، تمت إزالة خوارزمية التسلسل القديمة، وإرسال مثل هذه الكائنات غير القابلة للتسلسل سوف يرمي الآن خطأ "لا يمكن استنساخ الكائن" .

### تم تغيير API: `shell.openitem` الآن `shell.openPath`

تم استبدال عنصر `shell.openItem` API بـ `shell.openPath` API. يمكنك مشاهدة اقتراح API الأصلي وتفسير [هنا](https://github.com/electron/governance/blob/master/wg-api/spec-documents/shell-openitem.md).

## Planned Breaking API Changes (8.0)

### تغيير السلوك: يتم الآن تسلسل القيم المرسلة عبر IPC مع خوارزمية النسخ المنظمة

The algorithm used to serialize objects sent over IPC (through `ipcRenderer.send`, `ipcRenderer.sendSync`, `WebContents.send` and related methods) has been switched from a custom algorithm to V8's built-in [Structured Clone Algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), the same algorithm used to serialize messages for `postMessage`. This brings about a 2x performance improvement for large messages, but also brings some breaking changes in behavior.

* Sending Functions, Promises, WeakMaps, WeakSets, or objects containing any such values, over IPC will now throw an exception, instead of silently converting the functions to `undefined`.

```js
// Previously:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => results in { value: 3 } arriving in the main process

// From Electron 8:
ipcRenderer.send('channel', { value: 3, someFunction: () => {} })
// => throws Error("() => {} could not be cloned.")
```

* `NaN`, `Infinity` and `-Infinity` will now be correctly serialized, instead of being converted to `null`.
* Objects containing cyclic references will now be correctly serialized, instead of being converted to `null`.
* `Set`, `Map`, `Error` and `RegExp` values will be correctly serialized, instead of being converted to `{}`.
* `BigInt` values will be correctly serialized, instead of being converted to `null`.
* Sparse arrays will be serialized as such, instead of being converted to dense arrays with `null`s.
* `Date` objects will be transferred as `Date` objects, instead of being converted to their ISO string representation.
* Typed Arrays (such as `Uint8Array`, `Uint16Array`, `Uint32Array` and so on) will be transferred as such, instead of being converted to Node.js `Buffer`.
* Node.js `Buffer` objects will be transferred as `Uint8Array`s. You can convert a `Uint8Array` back to a Node.js `Buffer` by wrapping the underlying `ArrayBuffer`:

```js
Buffer.from(value.buffer, value.byteOffset, value.byteLength)
```

Sending any objects that aren't native JS types, such as DOM objects (e.g. `Element`, `Location`, `DOMMatrix`), Node.js objects (e.g. `process.env`, `Stream`), or Electron objects (e.g. `WebContents`, `BrowserWindow`, `WebFrame`) is deprecated. In Electron 8, these objects will be serialized as before with a DeprecationWarning message, but starting in Electron 9, sending these kinds of objects will throw a 'could not be cloned' error.

### مهمل: `<webview>.getWebContents()`

This API is implemented using the `remote` module, which has both performance and security implications. Therefore its usage should be explicit.

```js
// Deprecated
webview.getWebContents()
// Replace with
const { remote } = require('electron')
remote.webContents.fromId(webview.getWebContentsId())
```

However, it is recommended to avoid using the `remote` module altogether.

```js
// الرئيسية
const { ipcMain, webContents } = require('electron')

const getGuestForWebContents = (webContentsId، المحتويات) => {
  مضيف = محتوى الويب. romId(webContentsId)
  إذا (! uest) {
    ارمي خطأ جديد (`محتوى ويب غير صالح: ${webContentsId}`)
  }
  إذا (ضيف). ostWebContents! = المحتويات) {
    ارمي خطأ جديد ('الوصول غير ممنوع لمحتوى الويب')
  }
  ضيف العودة
}

ipcMain. andle('openDevTools', (event, webContentsId) => {
  const ضيف = getGuestForWebContents(webContentsId, event.sender)
  ضيف. PenDevTools()
})

// renderer
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('openDevTools', webview.getWebContentsId())
```

### مهمل: `webFrame.setLayoutZoomlevelLimits()`

Chromium has removed support for changing the layout zoom level limits, and it is beyond Electron's capacity to maintain it. The function will emit a warning in Electron 8.x, and cease to exist in Electron 9.x. The layout zoom level limits are now fixed at a minimum of 0.25 and a maximum of 5.0, as defined [here](https://chromium.googlesource.com/chromium/src/+/938b37a6d2886bf8335fc7db792f1eb46c65b2ae/third_party/blink/common/page/page_zoom.cc#11).

## Planned Breaking API Changes (7.0)

### مهمل: عنوان URL لرؤوس العقدة الذكية

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.  Both will be supported for the foreseeable future but it is recommended that you switch.

Deprecated: https://atom.io/download/electron

Replace with: https://electronjs.org/headers

### تم تغيير API: `session.clearAuthCache()` لم يعد يقبل الخيارات

The `session.clearAuthCache` API no longer accepts options for what to clear, and instead unconditionally clears the whole cache.

```js
// Deprecated
session.clearAuthCache({ type: 'password' })
// Replace with
session.clearAuthCache()
```

### تم تغيير API: `powerMonitor.querySystemIdleState` الآن `powerMonitor.getSystemIdleState`

```js
// تمت إزالته في Electron 7.0
powerMonitor.querySystemIdleState(عتبة، الاستدعاء)
/ / استبدل بـ API المتزامن
const idleState = powerMonitor.getSystemIdleState(عتبة)
```

### تم تغيير API: `powerMonitor.querySystemIdleTime` الآن `powerMonitor.getSystemIdleTime`

```js
// تمت إزالته في Electron 7.0
powerMonitor.querySystemIdleTime(callback)
// استبدل بـ API المتزامن
متجر idleTime = powerMonitor.getSystemIdleTime()
```

### تم تغيير API: `webFrame.setIsolatedWorldInfo` يحل محل طرق منفصلة

```js
// تمت إزالتها في Electron 7.0
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Replace with
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### تمت إزالتها: `تم وضع علامة` في `getBlinkMemoryInfo`

This property was removed in Chromium 77, and as such is no longer available.

### تم تغيير السلوك: `webkitdirectory` سمة `<input type="file"/>` الآن قائمة محتويات الدليل

الـ `webkitdirectory` ￼خاصية في المدخلات ملف HTML تسمح لهم بتحديد المجلدات. Previous versions of Electron had an incorrect implementation where the `event.target.files` of the input returned a `FileList` that returned one `File` corresponding to the selected folder.

ابتداء من إلكترون 7، أن `قائمة الملفات` هي الآن قائمة بجميع الملفات الموجودة في مجلد، مشابهة لـ Chrome, Firefox, and Edge ([رابط إلى مستندات MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)).

وكمثال على ذلك، خذ مجلد بهذا الهيكل:

```console
folder
├── file1
├── file2
└── file3
```

في إلكترون <=6، سيؤدي هذا إلى إعادة `قائمة الملفات` مع `ملف` عنصر عن:

```console
path/to/folder
```

في إلكترون 7، هذا الآن يرجع `قائمة الملفات` مع `ملف` كائن لـ:

```console
/path/to/folder/file3
/path/to/folder/file2
/path/to/folder/file1
```

لاحظ أن `webkitdirectory` لم يعد يعرض المسار للمجلد المحدد. If you require the path to the selected folder rather than the folder contents, see the `dialog.showOpenDialog` API ([link](https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowopendialogbrowserwindow-options)).

## Planned Breaking API Changes (6.0)

### تم تغيير API: `win.setMenu(null)` الآن `win.removeMenu()`

```js
// Deprecated
win.setMenu(null)
// Replace with
win.removeMenu()
```

### تم تغيير API: `contentTracing.getTraceBufferUsage()` هو الآن وعد

```js
// Deprecated
contentTracing.getTraceBufferUsage((percentage, value) => {
  // do something
})
// Replace with
contentTracing.getTraceBufferUsage().then(infoObject => {
  // infoObject has percentage and value fields
})
```

### تم تغيير API: `electron.screen` في عملية العارض يجب الوصول إليها عن طريق `البعيد`

```js
// Deprecated
require('electron').screen
// Replace with
require('electron').remote.screen
```

### تم تغيير API: `يتطلب ()`بناء العقدة في عارضات مربعات الرمل لم تعد تحمّل ضمناً الإصدار `البعيد`

```js
// Deprecated
require('child_process')
// Replace with
require('electron').remote.require('child_process')

// Deprecated
require('fs')
// Replace with
require('electron').remote.require('fs')

// Deprecated
require('os')
// Replace with
require('electron').remote.require('os')

// Deprecated
require('path')
// Replace with
require('electron').remote.require('path')
```

### مهمل: `powerMonitor.querySystemIdleState` استبدل بـ `powerMonitor.getSystemIdleState`

```js
// مهمل
powerMonitor.querySystemIdleState(عتبة، استرداد)
// استبدل بـ API المتزامن
const idleState = powerMonitor.getSystemIdleState(عتبة)
```

### مهمل: `powerMonitor.querySystemIdleTime` استبدل بـ `powerMonitor.getSystemIdleTime`

```js
// مهمل
powerMonitor.querySystemIdleTime(callback)
// استبدل ب API المتزامن
متجر idleTime = powerMonitor.getSystemIdleTime()
```

### مهمل: `app.enableMixedSandbox()` لم تعد هناك حاجة إليه

```js
// Deprecated
app.enableMixedSandbox()
```

Mixed-sandbox mode is now enabled by default.

### مهمل: `Tray.setHighlightMode`

Under macOS Catalina our former Tray implementation breaks. Apple's native substitute doesn't support changing the highlighting behavior.

```js
// Deprecated
tray.setHighlightMode(mode)
// API will be removed in v7.0 without replacement.
```

## Planned Breaking API Changes (5.0)

### التغيير الافتراضي: `عقد التكامل` و `webviewTag` الافتراضي إلى خطأ، `تنازل سياقي` الافتراضي إلى صحيح

The following `webPreferences` option default values are deprecated in favor of the new defaults listed below.

| Property           | Deprecated Default                   | New Default |
| ------------------ | ------------------------------------ | ----------- |
| `contextIsolation` | `false`                              | `true`      |
| `nodeIntegration`  | `true`                               | `false`     |
| `webviewTag`       | `nodeIntegration` if set else `true` | `false`     |

E.g. Re-enabling the webviewTag

```js
const w = new BrowserWindow({
  webPreferences: {
    webviewTag: true
  }
})
```

### تغير السلوك: `العقدة` في النوافذ الفرعية المفتوحة عن طريق `نظام ويندوز مفتوح`

النوافذ الفرعية المفتوحة مع خيار `الأصلي WindowOpen` ستكون دائماً معطلة تكامل Node.js، ما لم يكن `nodeIntegrationInSubFrames` `صحيح`.

### تم تغيير API: يجب أن يتم الآن تسجيل المخططات المميزة قبل أن يكون التطبيق جاهزا

تم إزالة عملية Renderer APIs `webFrame.registerURLSchemeAsPrivileed` و `webFrame.registerURLSchemeAsypassingCSP` فضلا عن عملية المتصفح API `protocol.registerStandardSchemes`. A new API, `protocol.registerSchemesAsPrivileged` has been added and should be used for registering custom schemes with the required privileges. Custom schemes are required to be registered before app ready.

### مهمل: `webFrame.setIsolatedWorld*` استبدل بـ `webFrame.setIsolatedWorldInfo`

```js
// Deprecated
webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)
webFrame.setIsolatedWorldHumanReadableName(worldId, name)
webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)
// Replace with
webFrame.setIsolatedWorldInfo(
  worldId,
  {
    securityOrigin: 'some_origin',
    name: 'human_readable_name',
    csp: 'content_security_policy'
  })
```

### تم تغيير API: `webFrame.setSpellCheckProvder` الآن يأخذ رد اتصال متزامن

The `spellCheck` callback is now asynchronous, and `autoCorrectWord` parameter has been removed.

```js
// Deprecated
webFrame.setSpellCheckProvider('en-US', true, {
  spellCheck: (text) => {
    return !spellchecker.isMisspelled(text)
  }
})
// Replace with
webFrame.setSpellCheckProvider('en-US', {
  spellCheck: (words, callback) => {
    callback(words.filter(text => spellchecker.isMisspelled(text)))
  }
})
```

## Planned Breaking API Changes (4.0)

The following list includes the breaking API changes made in Electron 4.0.

### `app.makeSingleInstance`

```js
// Deprecated
app.makeSingleInstance((argv, cwd) => {
  /* ... */
})
// Replace with
app.requestSingleInstanceLock()
app.on('second-instance', (event, argv, cwd) => {
  /* ... */
})
```

### `app.releaseSingleInstance`

```js
// Deprecated
app.releaseSingleInstance()
// Replace with
app.releaseSingleInstanceLock()
```

### `app.getGPUInfo`

```js
app.getGPUInfo('complete')
// Now behaves the same with `basic` on macOS
app.getGPUInfo('basic')
```

### `win_delay_load_hook`

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules.md) for more.

## Breaking API Changes (3.0)

The following list includes the breaking API changes in Electron 3.0.

### `التطبيقات`

```js
// Deprecated
app.getAppMemoryInfo()
// Replace with
app.getAppMetrics()

// Deprecated
const metrics = app.getAppMetrics()
const { memory } = metrics[0] // Deprecated property
```

### `نافذة المتصفح`

```js
// مهمل
خيارات= { webPreferences: { blinkFeatures: '' } }
const windowA = New BrowserWindow(OptionsA)
// استبدال بـ
const OptionsB = { webPreferences: { enableBlinkFeatures: '' } }
const windowB = New BrowserWindow(OptionsB)

// مهمل
window. n('app-command', (e, cmd) => {
  if (cmd === 'media-play_pause') {
    // قم بشيء
  }
})
// استبدل بـ
window. n('app-command', (e, cmd) => {
  if (cmd === 'media-play-pause') {
    // فعل شيئا
  }
})
```

### `لوحة القُصاصات`

```js
// Deprecated
clipboard.readRtf()
// Replace with
clipboard.readRTF()

// Deprecated
clipboard.writeRtf()
// Replace with
clipboard.writeRTF()

// Deprecated
clipboard.readHtml()
// Replace with
clipboard.readHTML()

// Deprecated
clipboard.writeHtml()
// Replace with
clipboard.writeHTML()
```

### `crashReporter`

```js
// Deprecated
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  autoSubmit: true
})
// Replace with
crashReporter.start({
  companyName: 'Crashly',
  submitURL: 'https://crash.server.com',
  uploadToServer: true
})
```

### `nativeImage`

```js
// Deprecated
nativeImage.createFromBuffer(buffer, 1.0)
// Replace with
nativeImage.createFromBuffer(buffer, {
  scaleFactor: 1.0
})
```

### `process`

```js
// Deprecated
const info = process.getProcessMemoryInfo()
```

### `شاشة`

```js
// Deprecated
screen.getMenuBarHeight()
// Replace with
screen.getPrimaryDisplay().workArea
```

### `session`

```js
// Deprecated
ses.setCertificateVerifyProc((hostname, certificate, callback) => {
  callback(true)
})
// Replace with
ses.setCertificateVerifyProc((request, callback) => {
  callback(0)
})
```

### `Tray`

```js
// Deprecated
tray.setHighlightMode(true)
// Replace with
tray.setHighlightMode('on')

// Deprecated
tray.setHighlightMode(false)
// Replace with
tray.setHighlightMode('off')
```

### `webContents`

```js
// Deprecated
webContents.openDevTools({ detach: true })
// Replace with
webContents.openDevTools({ mode: 'detach' })

// Removed
webContents.setSize(options)
// There is no replacement for this API
```

### `webFrame`

```js
// Deprecated
webFrame.registerURLSchemeAsSecure('app')
// Replace with
protocol.registerStandardSchemes(['app'], { secure: true })

// Deprecated
webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
// Replace with
protocol.registerStandardSchemes(['app'], { secure: true })
```

### `<webview>`

```js
// Removed
webview.setAttribute('disableguestresize', '')
// There is no replacement for this API

// Removed
webview.setAttribute('guestinstance', instanceId)
// There is no replacement for this API

// Keyboard listeners no longer work on webview tag
webview.onkeydown = () => { /* handler */ }
webview.onkeyup = () => { /* handler */ }
```

### Node Headers URL

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.

Deprecated: https://atom.io/download/atom-shell

Replace with: https://atom.io/download/electron

## Breaking API Changes (2.0)

The following list includes the breaking API changes made in Electron 2.0.

### `نافذة المتصفح`

```js
// مهمل
خيارات A = { titleBarStyle: 'hidden-inset' }
نافذة جديدة = متصفح ويندوز جديد
// استبدال بـ
خيارات مستديمة B = { titleBarStyle: 'hiddenInset' }
نافذة جديدة = متصفح ويندوز (خيارات)
```

### `menu (القائمة)`

```js
// Removed
menu.popup(browserWindow, 100, 200, 2)
// Replaced with
menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })
```

### `nativeImage`

```js
// Removed
nativeImage.toPng()
// Replaced with
nativeImage.toPNG()

// Removed
nativeImage.toJpeg()
// Replaced with
nativeImage.toJPEG()
```

### `process`

* `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

### `webContents`

```js
// Removed
webContents.setZoomLevelLimits(1, 2)
// Replaced with
webContents.setVisualZoomLevelLimits(1, 2)
```

### `webFrame`

```js
// Removed
webFrame.setZoomLevelLimits(1, 2)
// Replaced with
webFrame.setVisualZoomLevelLimits(1, 2)
```

### `<webview>`

```js
// Removed
webview.setZoomLevelLimits(1, 2)
// Replaced with
webview.setVisualZoomLevelLimits(1, 2)
```

### Duplicate ARM Assets

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

الملف _دون البادئة_ لا يزال قيد النشر لتجنب قطع أي من الإعدادات التي قد تستهلكه. Starting at 2.0, the unprefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).
