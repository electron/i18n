# Offscreen Rendering

عرض الشاشة خارج الشاشة يتيح لك الحصول على محتوى نافذة المتصفح في الخريطة، حتى يمكن أن تصبح في أي مكان، على سبيل المثال على نسيج في مشهد ثلاثي الأبعاد. يستخدم عرض خارج الشاشة في إلكترون نهجاً مشابهاً لمشروع [كروميوم الإطار المضمن](https://bitbucket.org/chromiumembedded/cef).

يمكن استخدام نوعين من التوريد ويتم تمرير المنطقة القذرة فقط في حدث `'طلاء'` لتكون أكثر كفاءة. يمكن إيقاف التقديم، متابعة ويمكن تعيين معدل الإطار. معدل الإطار المحدد هو قيمة الحد الأعلى، عندما لا يحدث شيء على صفحة ويب، لا يتم إنشاء أي إطار. الحد الأقصى لمعدل الإطار هو 60 ، لأنه فوق أنه ليس هناك فائدة ، فقط خسارة الأداء.

**ملاحظة:** يتم دائماً إنشاء نافذة خارج الشاشة كـ [نافذة بلا إطار](../api/frameless-window.md).

## أنماط التصيير

### مسرع GPU

ويعني الإسراع في تقديم الوحدة العالمية أن الوحدة تستخدم لتكوينها. بسبب أنه يجب نسخ الإطار من الوحدة البريدية العالمية التي تتطلب المزيد من الأداء، وبالتالي فإن هذا الوضع أبطأ قليلاً من الوضع الآخر. The benefit of this mode that WebGL and 3D CSS animations are supported.

### برامج أجهزة الإخراج

يستخدم هذا الوضع جهاز إخراج برنامج للتشغيل في وحدة المعالجة المركزية، لذا فإن إنشاء الإطار أسرع بكثير، وبالتالي فإن هذا الوضع مفضل على GPU المعجّل واحد.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## الإستعمال

``` javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.once('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  win.loadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, image.getBitmap())
  })
  win.webContents.setFrameRate(30)
})
```

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
