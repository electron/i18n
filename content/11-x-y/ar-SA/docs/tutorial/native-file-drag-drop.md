# سحب الملف الأصلي & إسقاط

قد تحتاج أنواع معينة من التطبيقات التي تعالج الملفات إلى دعم سحب الملف الأصلي لنظام التشغيل & ميزة الإفلات. Dragging files into web content is common and supported by many websites. Electron additionally supports dragging files and content out from web content into the operating system's world.

لتطبيق هذه الميزة في التطبيق الخاص بك، تحتاج إلى استدعاء `webContents.startDrag(item)` API استجابة للحدث `ondragstart`.

In your renderer process, handle the `ondragstart` event and forward the information to your main process.

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

Then, in the main process, augment the event with a path to the file that is being dragged and an icon.

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```
