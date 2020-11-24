# SpellChecker

يدعم إلكترون المدقق الإملائي لكروميوم منذ إلكترون 8.  على Windows و Linux يتم تشغيل هذا بواسطة قواميس Hunspel، وعلى نظام macOS فإنه يستخدم API المدقق الإملائي الأصلي.

## كيف يمكن تمكين المدقق الإملائي؟

للإلكترون 9 وما فوقه يتم تمكين المدقق الإملائي بشكل افتراضي.  لإلكترون 8 تحتاج إلى تمكينه في `webPreferences`.

```js
تجسيد myWindow = متصفح جديد ({
  تفضيلات الويب {
    spellcheck: true
  }
})
```

## كيفية تعيين اللغات التي يستخدمها المدقق الإملائي؟

على macOS ونحن نستخدم واجهات برمجة التطبيقات الأصلية لا توجد طريقة لتعيين اللغة التي يستخدمها المدقق الإملائي. بشكل افتراضي على macOS سيقوم المدقق الإملائي الأصلي تلقائيا باكتشاف اللغة المستخدمة لك.

بالنسبة للويندوز و لينكس هناك عدد قليل من تطبيقات إلكترون يجب عليك استخدامها لتعيين اللغات لمدقق الإملاء.

```js
// يعين المدقق الإملائي للتحقق من الإنجليزية الأمريكية والفرنسية
myWindow.الجلسة. etSpellCheckerLanguages(['en-US', 'fr'])

// مجموعة من جميع رموز اللغة المتاحة
إمكانية اللغات = myWindow.session.availableSpellCheckerLanguages
```

بشكل افتراضي سوف يقوم المدقق الإملائي بتمكين اللغة المطابقة لقلة نظام التشغيل الحالي.

## كيف أضع نتائج المدقق الإملائي في قائمة سياقي؟

يتم توفير جميع المعلومات المطلوبة لإنشاء قائمة السياق في حدث [`السياق`](../api/web-contents.md#event-context-menu) على كل مثيل `webContents`.  مثال صغير لكيفية إنشاء قائمة السياق مع هذه المعلومات هو أدناه.

```js
إختر { Menu, MenuItem } = مطلوبة ('electron')

myWindow.webContts. n('سياق-menu', (حدث, params) => {
  القائمة = القائمة الجديدة()

  // أضف كل اقتراح تهجئة
  (اقتراحًا من الشركات. اقتراحات) {
    قائمة. ppend(قائمة جديدة ({
      تسمية: اقتراح,
      انقر :() => mainWindow.webContts. eplaceMisignelling(الاقتراح)
    }))


  // اسمح للمستخدمين بإضافة الكلمة المغلوطة إلى القاموس
  إذا (params. isspelledWord) {
    قائمة. ppend(
      قائمة جديدة ({
        : 'إضافة إلى القاموس',
        نقطة: () => mainWindow. محتويات الويب. ession.addWordToSpellCheckerDictionary(params.misspelledWord)
      })

  }

  menu.popup()
})
```

## هل يستخدم المدقق الإملائي أي خدمات جوجل؟

على الرغم من أن المدقق الإملائي نفسه لا يرسل أي طابعة، الكلمات أو إدخال المستخدم إلى خدمات Google يتم تحميل ملفات القاموس الإملائي من Google CDN بشكل افتراضي.  إذا كنت ترغب في تجنب هذا يمكنك توفير عنوان URL بديل لتنزيل القواميس منه.

```js
myWindow.session.setSpellCheckerDictionDownloadURL('https://example.com/dictionaries/')
```

Check out the docs for [`session.setSpellCheckerDictionaryDownloadURL`](../api/session.md#sessetspellcheckerdictionarydownloadurlurl) for more information on where to get the dictionary files from and how you need to host them.
