# اختصارات لوحة المفاتيح

> تكوين اختصارات لوحة المفاتيح المحلية والعالمية

## اختصارات محلية

يمكنك استخدام وحدة [قائمة](../api/menu.md) لتكوين اختصارات لوحة المفاتيح التي سيتم تشغيلها فقط عند تركيز التطبيق. للقيام بذلك، حدد خاصية [`مسرع`] عند إنشاء [عنصر القائمة](../api/menu-item.md).

```js
const { Menu, MenuItem } = require('electron')
const menu = new Menu()

menu.append(new MenuItem({
  label: 'Print',
  accelerator: 'CmdOrCtrl+P',
  click: () => { console.log('time to print stuff') }
}))
```

يمكنك تكوين مجموعات مفاتيح مختلفة استناداً إلى نظام تشغيل المستخدم.

```js
{
  معجل: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
}
```

## الاختصارات العامة

يمكنك استخدام وحدة [globalShortcut](../api/global-shortcut.md) للكشف عن أحداث لوحة المفاتيح حتى عندما لا يحتوي التطبيق على تركيز لوحة المفاتيح.

```js
const { app, globalShortcut } = require('electron')

app.whenReady().then(() => {
  globalShortcut.register('commandOrControl+X', () => {
    console.log('commandOrControl+X مضغوط')
  })
})
```

## الإختصارات صمن الـBrowserWindow

إذا كنت ترغب في التعامل مع اختصارات لوحة المفاتيح لنافذة [المتصفح](../api/browser-window.md)، يمكنك استخدام `مفاتيح` و `مفاتيح` مستمع الحدث على عنصر النافذة داخل عملية العرض.

```js
window.addEventListener('keyup', doSomething, true)
```

لاحظ المعلمة الثالثة `true` مما يعني أن المستمع سيستقبل دوما ضغوطات المفاتيح قبل المستمعين الآخرين بحيث لا يمكنهم `إيقاف النشر ()` الاتصال بهم.

حدث [`قبل إدخال`](../api/web-contents.md#event-before-input-event) الحدث ينبعث قبل إرسال `مفاتيح` و `مفاتيح` أحداث في الصفحة. يمكن استخدام لالتقاط ومعالجة الاختصارات المخصصة غير المرئية في القائمة.

إذا كنت لا تريد إجراء تحليل اختصار يدوي هناك مكتبات تقوم باكتشاف مفاتيح متقدمة مثل [الفأرة](https://github.com/ccampbell/mousetrap).

```js
Mousetrap.bind('4', () => { console.log('4') })
Mousetrap.bind('?', () => { console. og('إظهار الاختصار!') })
Mousetrap.bind('esc', () => { console. og('escape') }, 'keyup')

// تركيبات
Mousetrap.bind('command+shift+k', () => { console. og('order shift k') })

// خريطة مجموعات متعددة لنفس الاتصال
فخ الفأر. ind(['command+k', 'ctrl+k'], () => {
  . og('الأمر k أو التحكّم k')

  // العودة خاطئة لمنع السلوك الافتراضي ووقف الحدث من فقاعة
  العودة الخاطئة
})

// gmail تسلسل
فخ الفأر. ind('g i', () => { console.log('go to inbox') })
Mousetrap. ind('* a', () => { console.log('selecall') })

// konami code!
Mousetrap.bind('صعودا لأسفل اليسار إلى اليسار اليسرى ب إدخال', () => {
  console.log('konami code')
})
```
