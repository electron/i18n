# Electron FAQ

## لماذا أواجه مشكلة في تثبيت إلكترون؟

Wywołując polecenie `npm install electron`, niektórzy użytkownicy napotykają okazjonalne błędy instalacji.

في جميع الحالات تقريبا، هذه الأخطاء هي نتيجة لمشاكل الشبكة وليس القضايا الفعلية مع حزمة `npm الإلكترون.` أخطاء مثل `ELIFECYCLE`، `EAI_AGAIN`، `ECONNRESET`، `وETIMEDOUT` كلها مؤشرات على مثل هذه مشاكل الشبكة. أفضل دقة هي محاولة تبديل الشبكات، أو الانتظار قليلا وحاول تثبيت مرة أخرى.

يمكنك أيضا محاولة لتحميل الإلكترون مباشرة من [الإلكترون / الإلكترون / الإصدارات](https://github.com/electron/electron/releases) إذا كان التثبيت عبر `npm` يفشل.

## متى ستتم ترقية الإلكترون إلى Chrome الأحدث؟

عادة ما يتم صدم نسخة كروم من الإلكترون في غضون أسبوع أو أسبوعين بعد يتم إصدار إصدار Chrome مستقر جديد. هذا التقدير غير مضمون و يعتمد على مقدار العمل المعني بالترقية.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

لمزيد من المعلومات، يرجى الاطلاع على [مقدمة الأمان.](tutorial/security.md).

## متى سيتم ترقية إلكترون إلى آخر Node.j؟

عند صدور نسخه جديده من Node. Js، نحن عادة ننتظر حوالي الشهر، قبل تحديث ماهو موجود في الالكترون (Electron)  لهذا يمكننا تجنب حدوث خلل جديد في Node. Js النسخه الجديده ، التي تحدث في الكثير من الأحيان

New features of Node.js are usually brought by V8 upgrades, since Electron is using the V8 shipped by Chrome browser, the shiny new JavaScript feature of a new Node.js version is usually already in Electron.

## How to share data between web pages?

To share data between web pages (the renderer processes) the simplest way is to use HTML5 APIs which are already available in browsers. Good candidates are [Storage API][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage], and [IndexedDB][indexed-db].

Alternatively, you can use the IPC primitives that are provided by Electron. To share data between the main and renderer processes, you can use the [`ipcMain`](api/ipc-main.md) and [`ipcRenderer`](api/ipc-renderer.md) modules. To communicate directly between web pages, you can send a [`MessagePort`][message-port] from one to the other, possibly via the main process using [`ipcRenderer.postMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Subsequent communication over message ports is direct and does not detour through the main process.

## My app's tray disappeared after a few minutes.

This happens when the variable which is used to store the tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

* [Memory Management][memory-management]
* [Variable Scope][variable-scope]

If you want a quick fix, you can make the variables global by changing your code from this:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

to this:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

```javascript
// In the main process.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
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

It is very likely you are using the module in the wrong process. يمكن استخدام ` electron.app </ 0> فقط في العملية الرئيسية ، بينما <>> electron.webFrame </ 0>
متاح فقط في renderer processes.</p>

<h2 spaces-before="0">The font looks blurry, what is this and what can I do?</h2>

<p spaces-before="0">If <a href="http://alienryderflex.com/sub_pixel/">sub-pixel anti-aliasing</a> is deactivated, then fonts on LCD screens can look blurry. مثال:</p>

<p spaces-before="0">!<a href="images/subpixel-rendering-screenshot.gif" fo="10">subpixel rendering example</a></p>

<p spaces-before="0">Sub-pixel anti-aliasing needs a non-transparent background of the layer containing the font glyphs. (See <a href="https://github.com/electron/electron/issues/6344#issuecomment-420371918">this issue</a> for more info).</p>

<p spaces-before="0">To achieve this goal, set the background in the constructor for <a href="api/browser-window.md" f-id="browser-window" fo="9">BrowserWindow</a>:</p>

<pre><code class="javascript">const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
`</pre>

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Notice that just setting the background in the CSS does not have the desired effect.

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[message-port]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
