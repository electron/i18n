# سحب الملفات الأصلية & Drop&

قد تحتاج أنواع معينة من التطبيقات التي تعالج الملفات إلى دعم سحب الملف الأصلي لنظام التشغيل & ميزة الإفلات. Dragging files into web content is common and supported by many websites. يدعم إلكترون بالإضافة إلى ذلك سحب الملفات والمحتوى من محتوى الويب إلى عالم نظام التشغيل .

لتطبيق هذه الميزة في التطبيق الخاص بك، تحتاج إلى استدعاء `webContents.startDrag(item)` API استجابة للحدث `ondragstart`.

في عملية العارض الخاص بك، تعامل مع حدث `ondragstart` وقم بإعادة إرسال معلومات إلى العملية الرئيسية الخاصة بك.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

ثم ، في العملية الرئيسية ، قم بزيادة الحدث مع مسار إلى الملف الذي هو يتم سحبه و أيقونة.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (case, filePath) => {
  event.sender.startDrag({
    filePath,
    icon: '/path/to/icon.png'
  })
})
```
