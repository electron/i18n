---
title: دعم شريط اللمس
author: kevinsawicki
date: '2017-03-08'
---

الإلكترون [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) الإصدار التجريبي يحتوي على دعم أولي لـ macOS [شريط اللمس](https://developer.apple.com/macos/touch-bar).

---

يسمح لك شريط اللمس الجديد API بإضافة الأزرار والعلامات والنوافذ المنبثقة و منتقي الألوان وشريط التمرير والمسافات. يمكن تحديث هذه العناصر بشكل ديناميكي و ينبعث أيضا الأحداث عندما يتم التفاعل معها.

هذه هي الإصدار الأول من واجهة برمجة التطبيقات هذه لذلك سوف تتطور خلال إصدارات إلكترون القليلة القادمة. الرجاء التحقق من ملاحظات الإصدار لمزيد من التحديثات وفتح [مشكلات](https://github.com/electron/electron/issues) لأي مشكلة أو وظائف مفقودة.

يمكنك تثبيت هذا الإصدار عن طريق `npm تثبيت electron@beta` وتعلم المزيد عنه في [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) و [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) مستندات إلكترون.

شكراً جزيلاً ل [@MarshallOfSound](https://github.com/MarshallOfSound) لمساهمته في إلكترون. :tada:

## مثال شريط اللمس

![المس بار الغازي](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

فيما يلي مثال على إنشاء لعبة آلة فتحة بسيطة في شريط اللمس. يوضح كيفية إنشاء شريط لمس، نمط العناصر، ربطه مع نافذة ، التعامل مع أحداث الزر، وتحديث التسميات ديناميكية.

```js
المؤخرة {app, BrowserWindow, TouchBar} = مطلوبة ('electron')

 {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

السماح بالدوران = خاطئ

// Reel
Reel1 = TouchBarLabel() جديدة
Reel2 = TouchBarLabel() جديدة
rest reel3 = TouchBarLabel() جديدة

// / Din نتيجة متزامنة = TouchBarLabel() جديدة
نتيجة متزامنة = TouchBarLabel()

// / تجوب
const roin = TouchBarButton({
  عنوان: '🎰 Spin',
  الخلفية: '#7851A9',
  نقطة: () => {
    /// تجاهل النقرات إذا كانت تدور بالفعل
    إذا (تأجير) {
      return
    }

    تدوير = صحيح
    النتيجة. abel = ''

    ترك المهلة = 10
    const spinLong = 4 * 1000 // 4 ثانية
    const startTime = التاريخ. ow()

    const spinReels = () => {
      updateReels()

      if ((Date. ow() - startTime) >= spinLength) {
        finishSpin()
      } أخري {
        // أبطأ قليلاً على كل تدوير
        مهلة *= 1.
        setTimeout(spinReels)، المهلة)
      }


    spinReels()
  }
})

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', ':4_leaf_clover:']
  قيمة العائد[الرياضيات. loor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = New Set([reel1. بايل، وسمة2.ملصقة، رينيل3.التسمية]). الحجم
  إذا كانت (الفريدة من نوعها من القيم == 1) {
    // جميع القيم 3 هي نفس النتيجة
    . abel = '💰 جاكبوت!'
    النتيجة. extColor = '#FDFF00'
  } أخرى إذا (uniqueValues === 2) {
    // 2 هي نفس النتيجة
    . abel = '😍 الفائز!'
    النتيجة. extColor = '#FDFF00'
  } أخرى {
    // لا توجد قيم هي نفس النتيجة
    . abel = '🙁 تجور مرة أخرى'
    نتيجة. extColor = null
  }
  تدوير = false
}

Const touchBar = TouchBar([
  تدوير
  TouchBarSpacer({size: 'large'}),
  reel1,
  New TouchBarSpacer({size: 'small'}),
  رايل2,
  جديدة TouchBarSpacer({size: 'small'}),
  reel3,
  TouchBarSpacer({size: 'large'}),
  نتيجة
])

اترك نافذة

التطبيق. nce('جاهز', () => {
  النافذة = المتصفح الجديد ({
    إطار: خاطئ،
    titleBarStyle: 'hidden-inset',
    العرض: 200،
    الطول: 200،
    خلفية Color: '#000'
  })
  النافذة. oadURL('about:blank')
  window.setTouchBar(touchBar)
})
```

