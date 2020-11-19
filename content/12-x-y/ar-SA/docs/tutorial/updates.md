# تحديث التطبيقات

هناك عدة طرق لتحديث تطبيق الإلكترون. The easiest and officially supported one is taking advantage of the built-in [Squirrel](https://github.com/Squirrel) framework and Electron's [autoUpdater](../api/auto-updater.md) module.

## باستخدام `update.electronjs.org`

يحتفظ فريق إلكترون بـ [update.electronjs.org][]، وهي خدمة مجانية ومفتوحة المصدر يمكن أن تستخدمها تطبيقات إلكترون للتحديث الذاتي. تم تصميم الخدمة لتطبيقات إلكترون التي تستوفي المعايير التالية:

- تشغيل التطبيق على macOS أو Windows
- التطبيق لديه مستودع GitHub عام
- يتم نشر المباني إلى إصدارات GitHub
- تم توقيع الشيفرات

أسهل طريقة لاستخدام هذه الخدمة هي تثبيت [update-electron-app][]، وحدة Node.js تم تكوينها مسبقا للاستخدام مع update.electronjs.org.

تثبيت الوحدة:

```sh
npm تثبيت تحديث-إلكترون التطبيق
```

استدعاء التحديث من ملف العملية الرئيسي لتطبيقك:

```js
مطلوبة ('update-electron-app')()
```

بشكل افتراضي، ستتحقق هذه الوحدة من وجود تحديثات عند بدء تشغيل التطبيق، ثم كل عشر دقائق عند العثور على تحديث، سيتم تنزيله تلقائياً في الخلفية. عند اكتمال التنزيل، يتم عرض مربع حوار يسمح للمستخدم بإعادة تشغيل التطبيق.

إذا كنت بحاجة إلى تخصيص الإعدادات الخاصة بك، يمكنك [نقل الخيارات إلى `تحديث-إلكترون - تطبيق`][update-electron-app] أو [استخدام خدمة التحديث مباشرة][update.electronjs.org].

## نشر خادم التحديث

إذا كنت تقوم بتطوير تطبيق إلكترون خاص، أو إذا لم تقم بنشر الإصدارات إلى إصدارات GitHub ، قد يكون من الضروري تشغيل خادم التحديث الخاص بك.

تبعاً لاحتياجاتك، يمكنك الاختيار من بين هذه الاحتياجات:

- [Hazel][hazel] - تحديث الخادم للتطبيقات الخاصة أو المفتوحة المصدر التي يمكن نشرها مجاناً في [الآن][now]. ينسحب من [إصدارات GitHub][gh-releases] ويستفيد من قوة GitHub.
- [Nuts][nuts] - يستخدم أيضا [إصدارات GitHub][gh-releases]، ولكن التطبيق المخبئ تحديثات على القرص ودعم المستودعات الخاصة.
- [electron-release-server][electron-release-server] – يوفر لوحة تحكم لـ مناولة الإصدارات ولا يتطلب الإصدارات للمنشأ في GitHub.
- [نيوكليوس][nucleus] - خادم تحديث كامل لتطبيقات إلكترون التي تحتفظ بها أطلسيان. يدعم تطبيقات وقنوات متعددة؛ يستخدم متجر الملفات الثابت لتقليل تكلفة الخادم.

## تنفيذ التحديثات في تطبيقك

بمجرد نشر خادم التحديث الخاص بك، استمر في استيراد وحدات المطلوبة في الكود الخاص بك. قد تختلف التعليمات البرمجية التالية لبرمجيات الخادم المختلفة ، ولكنها تعمل مثل الموصوفة عند استخدام [Hazel](https://github.com/zeit/hazel).

**هام:** الرجاء التأكد من أن التعليمات البرمجية أدناه سيتم تنفيذها فقط في تطبيق الحزمة الخاص بك، وليس قيد التطوير. يمكنك استخدام [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) للتحقق من البيئة.

```javascript
إختر { app, autoUpdater, dialog } = مطلوبة ('electron')
```

بعد ذلك، أنشئ عنوان URL لخادم التحديث وأخبر [التحديث التلقائي](../api/auto-updater.md) عنه:

```javascript
const server = 'https://your-deployment-url.com'
const url = `${server}/update/${process.platform}${app.getVersion()}`

autoUpdater.setFeedURL({ url })
```

كخطوة نهائية، تحقق من وجود تحديثات. المثال أدناه سوف يفحص كل دقيقة:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

بمجرد أن يتم تعبئة طلبك [](../tutorial/application-distribution.md)، سوف تتلقى تحديثاً لكل إصدار جديد [GitHub](https://help.github.com/articles/creating-releases/) الذي تقوم بنشره .

## تطبيق التحديثات

الآن بعد أن قمت بتكوين آلية التحديث الأساسية لتطبيقك، أنت بحاجة إلى التأكد من أن المستخدم سيتم إعلامه عندما يكون هناك تحديث. يمكن تحقيق هذا باستخدام أحداث API التحديث التلقائي [](../api/auto-updater.md#events):

```javascript
التحديث التلقائي. n('update-downloadaded'، (الحدث، ملاحظات الإصدار، الإصدار الاسم) => {
  حوار الإصدارات = {
    نوع: 'info',
    الأزرار: ['إعادة التشغيل'، 'لاحقا']،
    عنوان: 'تحديث التطبيق'،
    رسالة: العملية. latform === 'win32' ? ملاحظات الإصدار : الإصدار،
    التفاصيل: 'إصدار جديد تم تنزيله. Restart the application to apply the updates.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})
```

تأكد أيضا من أن الأخطاء هي [يتم التعامل معها](../api/auto-updater.md#event-error). إليك مثال لتسجيل الدخول إلى `المستعرض`:

```javascript
AutoUpdater.on('error', message => {
  console.error('كانت هناك مشكلة في تحديث التطبيق')
  console.error(message)
})
```

## التعامل مع التحديثات يدوياً

لأن الطلبات المقدمة من خلال التحديث التلقائي ليست تحت سيطرتك المباشرة، قد تجد حالات يصعب التعامل معها (مثل ما إذا كان الخادم التحديث وراء المصادقة). الحقل `url` يدعم الملفات، مما يعني أنه مع بذل بعض الجهود، يمكنك تجنب جانب الاتصال بالخادم من العملية. [هنا مثال على كيفية عمل هذا](https://github.com/electron/electron/issues/5020#issuecomment-477636990).

[now]: https://zeit.co/now
[hazel]: https://github.com/zeit/hazel
[nuts]: https://github.com/GitbookIO/nuts
[gh-releases]: https://help.github.com/articles/creating-releases/
[electron-release-server]: https://github.com/ArekSredzki/electron-release-server
[nucleus]: https://github.com/atlassian/nucleus
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
