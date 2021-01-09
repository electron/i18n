# تصحيح أخطاء التطبيق

كلما كان تطبيق إلكترون الخاص بك لا يتصرف بالطريقة التي تريدها، مجموعة من أدوات تصحيح الأخطاء قد تساعدك على العثور على أخطاء في البرمجة، اختناقات الأداء أو فرص التحسين.

## عملية العارض

الأداة الأكثر شمولاً لتصحيح عمليات العرض الفردية هي أداة مطور كروميوم. وهي متاحة لجميع عمليات العرض، بما في ذلك مثيلات `نافذة المتصفح`، `عرض المتصفح`، و `عرض الويب`. يمكنك فتحها برمجياً عن طريق الاتصال بـ `أدوات openDevDevols()` API على `webContents` من المثال:

```javascript
const { BrowserWindow } = require('electron')

اسمح بالفوز = BrowserWindow() الجديدة
win.webContents.openDevTools()
```

Google offers [excellent documentation for their developer tools][devtools]. ننصح بأن تكون على دراية بها - فهي عادة واحدة من أقوى المنافع في أي حزام أدوات مطور إلكترون.

## العملية الرئيسية

تصحيح أخطاء العملية الرئيسية أكثر صعوبة، لأنه لا يمكنك فتح أدوات المطور لهم. The Chromium Developer Tools can [be used to debug Electron's main process][node-inspect] thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation][main-debug].

[node-inspect]: https://nodejs.org/en/docs/inspector/
[devtools]: https://developer.chrome.com/devtools
[main-debug]: ./debugging-main-process.md
