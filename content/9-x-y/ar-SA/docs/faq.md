# Electron FAQ

## لماذا أواجه مشكلة في تثبيت إلكترون؟

Wywołując polecenie `npm install electron`, niektórzy użytkownicy napotykają okazjonalne błędy instalacji.

في جميع الحالات تقريبا، هذه الأخطاء هي نتيجة لمشاكل الشبكة وليس القضايا الفعلية مع حزمة `npm الإلكترون.` أخطاء مثل `ELIFECYCLE`، `EAI_AGAIN`، `ECONNRESET`، `وETIMEDOUT` كلها مؤشرات على مثل هذه مشاكل الشبكة. أفضل دقة هي محاولة تبديل الشبكات، أو الانتظار قليلا وحاول تثبيت مرة أخرى.

يمكنك أيضا محاولة لتحميل الإلكترون مباشرة من [الإلكترون / الإلكترون / الإصدارات](https://github.com/electron/electron/releases) إذا كان التثبيت عبر `npm` يفشل.

## متى ستتم ترقية الإلكترون إلى Chrome الأحدث؟

عادة ما يتم صدم نسخة كروم من الإلكترون في غضون أسبوع أو أسبوعين بعد يتم إصدار إصدار Chrome مستقر جديد. هذا التقدير غير مضمون و يعتمد على مقدار العمل المعني بالترقية.

يتم استخدام قناة كروم المستقرة فقط. إذا كان إصلاح مهم في قناة بيتا أو ديف ، سنقوم بعودة المنبور.

لمزيد من المعلومات، يرجى الاطلاع على [مقدمة الأمان.](tutorial/security.md).

## متى سيتم ترقية إلكترون إلى آخر Node.j؟

عند صدور نسخه جديده من Node. Js، نحن عادة ننتظر حوالي الشهر، قبل تحديث ماهو موجود في الالكترون (Electron)  لهذا يمكننا تجنب حدوث خلل جديد في Node. Js النسخه الجديده ، التي تحدث في الكثير من الأحيان

New features of Node.js are usually brought by V8 upgrades, since Electron is using the V8 shipped by Chrome browser, the shiny new JavaScript feature of a new Node.js version is usually already in Electron.

## How to share data between web pages?

To share data between web pages (the renderer processes) the simplest way is to use HTML5 APIs which are already available in browsers. Good candidates are [Storage API][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage], and [IndexedDB][indexed-db].

Or you can use the IPC system, which is specific to Electron, to store objects in the main process as a global variable, and then to access them from the renderers through the `remote` property of `electron` module:

```javascript
// In the main process.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## اختفت صالة تطبيقي بعد بضع دقائق.

يحدث هذا عندما يتم جمع المتغير الذي يستخدم لتخزين العلامة القمامة.

If you encounter this problem, the following articles may prove helpful:

* [Memory Management][memory-management]
* [Variable Scope][variable-scope]

If you want a quick fix, you can make the variables global by changing your code from this:

```javascript
const { app, Tray } = require('electron')
app.whenReady{()) => {
  علبة const = علبة جديدة('/path/to/icon.png')
  tray.setTitle ('مرحبا العالم')
})
```

to this:

```javascript
const { app, Tray } = مطلوب('electron')
اسمح باللعبة = null
app.whenReady().then(() => {
  tray = Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

```javascript
// In the main process.
const { BrowserWindow } = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` is undefined.

When using Electron's built-in module you might encounter an error like this:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

This is because you have the [npm `electron` module][electron-module] installed either locally or globally, which overrides Electron's built-in module.

للتحقق مما إذا كنت تستخدم الوحدة النمطية المضمنة الصحيحة ، يمكنك طباعة مسار وحدة </> الكترون </ 0>:

```javascript
console.log(require.resolve('electron'))
```

ثم تحقق مما إذا كان في النموذج التالي:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

إذا كان الأمر يشبه ` node_modules / electron / index.js </ 0> ، فيجب عليك
إما إزالة وحدة npm <code> electron </ 0> أو إعادة تسميتها.</p>

<pre><code class="sh">npm uninstall electron
npm uninstall -g electron
`</pre>

ومع ذلك ، إذا كنت تستخدم الوحدة المضمنة ولكنك لا تزال تحصل على هذا الخطأ من المحتمل جدًا أنك تستخدم الوحدة في العملية الخاطئة. يمكن استخدام ` electron.app </ 0> فقط في العملية الرئيسية ، بينما <>> electron.webFrame </ 0>
متاح فقط في renderer processes.</p>

<h2 spaces-before="0">يبدو الخط غير واضح، ما هو هذا وماذا يمكنني أن أفعل؟</h2>

<p spaces-before="0">إذا تم إلغاء تنشيط <a href="http://alienryderflex.com/sub_pixel/">منع الاستيفاء من الباطن بالبكسل</a> ، يمكن أن تبدو الخطوط على شاشات LCD غير واضحة. مثال:</p>

<p spaces-before="0">!<a href="images/subpixel-rendering-screenshot.gif" fo="9">subpixel rendering example</a></p>

<p spaces-before="0">وتحتاج مكافحة التحرر من الباطن إلى خلفية غير شفافة للطبقة التي تحتوي على غليفات الخط. (انظر <a href="https://github.com/electron/electron/issues/6344#issuecomment-420371918">هذه المشكلة</a> لمزيد من المعلومات).</p>

<p spaces-before="0">To achieve this goal, set the background in the constructor for <a href="api/browser-window.md" f-id="browser-window" fo="8">BrowserWindow</a>:</p>

<pre><code class="javascript">متجر { BrowserWindow } = مطلوبة ('electron')
اسمح للفوز = متصفح جديد ({
  backgroundColor: '#fff'
})
`</pre>

The effect is visible only on (some?) LCD screens. حتى لو كنت لا ترى فرقا، قد يرى بعض المستخدمين الخاص بك. ومن الأفضل أن نضع دائماً الخلفية بهذه الطريقة، ما لم تكن لديك أسباب لعدم القيام بذلك.

لاحظ أن إعداد الخلفية فقط في CSS ليس له التأثير المطلوب.

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[electron-module]: https://www.npmjs.com/package/electron
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
