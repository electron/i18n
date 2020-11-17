# Electron  - الاسئلة الشائعة

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

## كيف تشارك البيانات بين صفحات الويب؟

لمشاركة البيانات بين صفحات الويب (عملية الرندر) أسهل طريقة هي استخدام HTML5 API, s وهي متاحة سابقاً في المتصفحات. Good candidates are [Storage API][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage], and [IndexedDB][indexed-db].

أو يمكنك استخدام نظام IPC، وهو خاص إلكترون، لتخزين الكائنات في العملية الرئيسية كمتغير عالمي، ومن ثم الوصول إليها من العارضين من خلال خاصية</code> ` <code>وحدة` الإلكترونات:

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

إذا واجهت هذه المشكلة، قد تكون المقالات التالية مفيدة:

* [إدارة الذاكرة][memory-management]
* [نطاق المتغير][variable-scope]

إذا كنت تريد حل سريع، يمكنك جعل المتغيرات عمومية عن طريق تغيير التعليمات البرمجية من هذا:

```javascript
const { app, Tray } = require('electron')
app.whenReady{()) => {
  علبة const = علبة جديدة('/path/to/icon.png')
  tray.setTitle ('مرحبا العالم')
})
```

إلى هذا:

```javascript
const { app, Tray } = مطلوب('electron')
اسمح باللعبة = null
app.whenReady().then(() => {
  tray = Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## لا يمكنني استخدام jQuery/RequireJS/Meteor/AngularJS في إلكترون.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. هذا يسبب مشاكل لبعض المكتبات لأنها تريد إدراج الرموز بنفس الأسماء.

لحل هذه المشكلة، يمكنك إيقاف دمج العقدة في Electron:

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

لكن إذا كنت ترغب في الحفاظ على قدرات استخدام العقدة. s و إلكترون API، يجب عليك إعادة تسمية الرموز في الصفحة قبل تضمين المكتبات الأخرى:

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

## `الشرط ('electron').xxx` غير محدد.

عند استخدام وحدة Electron's المدمجة قد تواجه خطأ مثل هذا:

```sh
> مطلوب('electron').webFrame.setZoomFactor(1.0)
لم يتم القبض على TypeError: لا يمكن قراءة الخاصية 'setZoomlevel' من غير معرف
```

من المحتمل جدا أنك تستخدم الوحدة في العملية الخاطئة. يمكن استخدام ` electron.app </ 0> فقط في العملية الرئيسية ، بينما <>> electron.webFrame </ 0>
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
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
