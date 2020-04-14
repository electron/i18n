# الملف الممثّل في نافذة المستعرض في نظام ماك أو إس

يمكن للنافذة في نظام ماك أو إس أن تعيّن ملفّها الممثَّل represented file، وهكذا يمكن لأيقونة الملف أن تظهر في شريط العنوان وعندما النقر على العنوان بواسطة Command-Click أو Control-Click تظهر نافذة منبثقة تتضمّن مسار الملف.

يمكن كذلك تعيين الحالة المحرَّرة edited state للنافذة وبهذا يمكن لأيقونة الملف أن تعطي إشارة إلى أنّ الملف الموجود في هذه النافذة هو ملفّ يخضع للتعديلات.

__قائمة الملف الممثّل:__

![الملف الممثّل](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

يمكن استخدام الواجهات البرمجية [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) و [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) لإضافة الملف الممثَّل إلى النافذة:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```
