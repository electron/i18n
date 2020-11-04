# الملف الممثّل في نافذة المستعرض في نظام ماك أو إس

يمكن للنافذة في نظام ماك أو إس أن تعيّن ملفّها الممثَّل represented file، وهكذا يمكن لأيقونة الملف أن تظهر في شريط العنوان وعندما النقر على العنوان بواسطة Command-Click أو Control-Click تظهر نافذة منبثقة تتضمّن مسار الملف.

يمكن كذلك تعيين الحالة المحرَّرة edited state للنافذة وبهذا يمكن لأيقونة الملف أن تعطي إشارة إلى أنّ الملف الموجود في هذه النافذة هو ملفّ يخضع للتعديلات.

__قائمة الملف الممثّل:__

![الملف الممثّل][1]

يمكن استخدام الواجهات البرمجية [BrowserWindow.setRepresentedFilename][setrepresentedfilename] و [BrowserWindow.setDocumentEdited][setdocumentedited] لإضافة الملف الممثَّل إلى النافذة:

```javascript
{ BrowserWindow } = مطلوبة ('electron')

الفوز = متصفح ويندوز جديد ()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

[1]: https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png
[setrepresentedfilename]: ../api/browser-window.md#winsetrepresentedfilenamefilename-macos
[setdocumentedited]: ../api/browser-window.md#winsetdocumenteditededited-macos
