# سحب الملف الأصلي & إسقاط

## النظرة عامة

قد تحتاج أنواع معينة من التطبيقات التي تعالج الملفات إلى دعم سحب الملف الأصلي لنظام التشغيل & ميزة الإفلات. Dragging files into web content is common and supported by many websites. يدعم إلكترون بالإضافة إلى ذلك سحب الملفات والمحتوى من محتوى الويب إلى عالم نظام التشغيل .

لتطبيق هذه الميزة في التطبيق الخاص بك، تحتاج إلى الاتصال بـ [`محتويات الويب. تارتنتنغن (تم)`](../api/web-contents.md#contentsstartdragitem) واجهة برمجة التطبيقات استجابة لحدث `اونتنيد`.

## مثال

بدءاً بتطبيق عمل من [دليل البداية السريعة](quick-start.md)، أضف السطور التالية إلى ملف `index.html`:

```html
<a href="#" id="drag">اسحب لي</a>
<script src="renderer.js"></script>
```

وإضافة الأسطر التالية إلى ملف `renderer.js`:

```js
const { ipcRenderer } = require('electron')

document.getElementById('drag').ondragstart = (event) => {
  event.preventDefault()
  ipcRenderer.send('ondragstart', '/مطلق/path/to/the/item')
}
```

التعليمات البرمجية أعلاه توعز إلى عملية العارض للتعامل مع حدث `ondragstart` وإرسال المعلومات إلى العملية الرئيسية.

في العملية الرئيسية (`بشكل رئيسي. s` ملف ، قم بتوسيع الحدث المستلم مع مسار إلى الملف الذي يتم سحبه و أيقونة :

```javascript
const { ipcMain } = require('electron')

ipcMain.on('ondragstart', (case, filePath) => {
  event.sender.startDrag({
    filePath,
    icon: '/path/to/icon.png'
  })
})
```

بعد بدء تطبيق إلكترون، حاول سحب وإسقاط العنصر من نافذة BroswerWindow على سطح مكتبك. في هذا الدليل، العنصر هو ملف Markdown موجود في جذر المشروع:

![سحب وإسقاط](../images/drag-and-drop.gif)
