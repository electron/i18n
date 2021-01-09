# Online/Offline Event Detection

يمكن تنفيذ الكشف عن الحدث [عبر الإنترنت أو دون اتصال](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) في عملية العارض باستخدام [`ملاح. nسطر`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) خاصية, جزء من HTML5 API القياسي. السمة `navigator.onLline` ترجع `خطأ` إذا كان من المؤكد أن أي طلبات شبكة غير متصل بالشبكة. إنها ترجع `حقيقة` في جميع الحالات الأخرى. بما أن جميع الشروط الأخرى تعود `صحيحة`، يجب أن يكون المرء مدركا للحصول على إيجابيات زائفة، نظرًا لأننا لا نستطيع أن نفترض `حقيقة` القيمة تعني بالضرورة أن إلكترون يمكنه الوصول إلى الإنترنت. Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

مثال:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = BrowserWindow({ width: 0, height: 0, show: false }
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

_online-status.html_

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? 'onlineStatus' : 'offline')
  }

  window.addEventListener('online', alertOnlineStatus)
  window.addEventListener('offline', alertOnlineStatus)

  alertOnlineStatus()
</script>
</body>
</html>
```

قد تكون هناك حالات تريد فيها الرد على هذه الأحداث في العملية الرئيسية أيضًا. غير أن العملية الرئيسية لا تحتوي على كائن `متنقل` وبالتالي لا يمكن الكشف عن هذه الأحداث مباشرة. استخدام إلكترون مرافق الاتصالات المتبادلة يمكن نقل الأحداث إلى العملية الرئيسية والتعامل معها حسب الحاجة، كما هو مبين في المثال التالي.

_main.js_

```javascript
عرض { app, BrowserWindow, ipcMain } = مطلوب('electron')
اسمح لonlineStatusWindow

app.whenReady. hen(() => {
  onlineStatusWindow = BrowserWindow({ width: 0, الطول: 0, 0, اظهر: خطأ، تفضيلات الويب: { nodeIntegration: true } })
  onlineStatusWindow. oadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (case, status) => {
  console.log(status)
})
```

_online-status.html_

```html
<! OCTYPE html>
<html>
<body>
<script>
  const { ipcRenderer } = require('electron')
  const updateOnlineStatus = () => {
    ipcRenderer. end('online-status-changed', navigator.onLine ? 'onlineStatus' : 'offline')
  }

  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)

  updateOnlineStatus()
</script>
</body>
</html>
```
