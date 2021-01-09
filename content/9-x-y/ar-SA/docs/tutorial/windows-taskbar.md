# شريط مهام ويندوز

إلكترون لديه واجهة برمجة التطبيقات لتهيئة رمز التطبيق في Windows taskbar. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## قائمة القفز

يسمح ويندوز للتطبيقات بتحديد قائمة السياق المخصص التي تظهر عند المستخدمين انقر بزر الماوس الأيمن على أيقونة التطبيق في شريط المهام. قائمة السياق هذه تسمى `قائمة القفز`. يمكنك تحديد إجراءات مخصصة في فئة `المهام` من قائمة JumpList، كما هو مقتبس من MSDN:

> تحدد التطبيقات المهام استناداً إلى ميزات البرنامج والمفتاح الأشياء التي يتوقع أن يقوم بها المستخدم معهم. يجب أن تكون المهام خالية من السياقات، في أن التطبيق لا يحتاج إلى تشغيله للعمل. يجب أن تكون أيضا الإجراءات الأكثر شيوعا إحصائيا التي يقوم بها المستخدم العادي في التطبيق، مثل إنشاء رسالة بريد إلكتروني أو فتح التقويم في برنامج بريد، إنشاء مستند جديد في معالج الكلمات، قم بتشغيل تطبيق في وضع معين، أو اطلاق واحد من الأوامر الفرعية. يجب على تطبيق أن لا يحجب القائمة مع الميزات المتقدمة التي لن يحتاج إليها مستخدمو أو إجراءات لمرة واحدة مثل التسجيل. لا تستخدم المهام لعناصر الترويج مثل الترقيات أو العروض الخاصة.
> 
> ويوصى بشدة بأن تكون قائمة المهام جامدة. يجب أن يبقى نفس بغض النظر عن حالة أو وضع الطلب. بينما يمكن تغيير القائمة بشكل ديناميكي، يجب أن تأخذ في الاعتبار أن هذا يمكن أن يخلط بين المستخدم الذي لا يتوقع ذلك الجزء من قائمة الوجهة و يتغير.

__مهام مستكشف الإنترنت:__

![آي](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

خلاف قائمة الإرساء في macOS التي هي قائمة حقيقية، مهام المستخدم في ويندوز تعمل مثل اختصارات التطبيق بحيث عندما ينقر المستخدم على مهمة، سيتم تنفيذ برنامج باستخدام حجج محددة.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API:

```javascript
إختر { app } = مطلوب('electron')
app.setUserTasks([
  {
    البرنامج: العملية. xecPath,
    حجج: '--new-window',
    أيقونة المسار: العملية. xecPath,
    أيقونة المفهرس: 0,
    title: 'Window',
    الوصف: 'إنشاء نافذة جديدة'
  }
])
```

لتنظيف قائمة المهام الخاصة بك، اتصل `app.setUserTasks` مع مصفوفة فارغة:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

The user tasks will still show even after your application closes, so the icon and program path specified for a task should exist until your application is uninstalled.


## Thumbnail Toolbars

في ويندوز، يمكنك إضافة شريط أدوات مصغرة مع أزرار محددة في شريط المهام تخطيط لنافذة التطبيق. يوفر للمستخدمين طريقة للوصول إلى أمر الخاص بالنوافذ دون استعادة أو تنشيط النافذة.

من الـ MSDN، يوضح ما يلي:

> شريط الأدوات هذا هو التحكم الموحد المألوف في شريط الأدوات. يحتوي على كحد أقصى سبعة أزرار. يتم تعريف معرف كل زر، والصورة، ونصيحة أدوات، والحالة في هيكل، ثم يتم تمريره إلى شريط المهام. يمكن للتطبيق أن يظهر أو تمكين أو تعطيل أو إخفاء الأزرار من شريط الأدوات المصغرة كما هو مطلوب في حالته الحالية .
> 
> على سبيل المثال، Windows Media Player قد يوفر ضوابط قياسية لنقل الوسائط مثل اللعب، الإيقاف، الكتم، والتوقف.

__شريط أدوات الصور المصغرة للويندوز ميديا لاعب :__

![لاعب](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons][setthumbarbuttons] to set thumbnail toolbar in your application:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

لتنظيف أزرار شريط الأدوات المصغرة، فقط اتصل بـ `BrowserWindow.setThumbarButtons` مع مصفوفة فارغة:

```javascript
const { BrowserWindow } = مطلوب('electron')

فوز = متصفح ويندوز جديد ()
win.setThumbarButtons([])
```


## تراكب الأيقونة في شريط المهام

على Windows يمكن أن يستخدم زر شريط المهام تراكب صغير لعرض حالة التطبيق كما هو مقتبس من MSDN:

> وتشكل طبقات الأيقونات إشعارا بالوضع في سياقه الصحيح، والمقصود منها أن تنفي الحاجة إلى أيقونة حالة إشعارات منفصلة لإرسال تلك المعلومات إلى المستخدم. على سبيل المثال، حالة البريد الإلكتروني الجديدة في Microsoft Outlook، يظهر حاليا في منطقة الإشعار، يمكن الآن الإشارة من خلال تراكب على زر شريط المهام. مرة أخرى، يجب عليك أن تقرر، خلال دورة التطوير الخاصة بك، الطريقة الأفضل لتطبيقك. الرموز الخلفية هي الغرض منها توفير حالة مهمة أو إشعارات قديمة مثل حالة الشبكة، أو حالة السعاة، أو البريد الجديد. لا ينبغي أن يكون المستخدم معروضة مع طبقات أو حركات متحركة متغيرة باستمرار.

__التداخل على زر شريط المهام:__

![تراكب على زر شريط المهام](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon][setoverlayicon] API:

```javascript
const { BrowserWindow } = مطلوب('electron')
دع الفوز = متصفح ويندوز جديد ()
win.setOverlayIcon('path/to/overlay.png', 'وصف للتجاوز')
```


## إطار الفلاش

على Windows يمكنك تسليط الضوء على زر شريط المهام للحصول على اهتمام المستخدم. هذا شبيه بربط أيقونة الإرساء على macOS. من الوثائق المرجعية لوزارة التنمية المستدامة:

> عادة ، يتم تفليش النافذة لإبلاغ المستخدم بأن النافذة تتطلب انتباها ولكنها لا تحتوي حاليا على تركيز لوحة المفاتيح.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame][flashframe] API:

```javascript
const { BrowserWindow } = مطلوب('electron')
اسمح للفوز = متصفح ويندوز جديد ()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

لا تنسى أن تتصل بطريقة `فلاش` مع `كاذب` لإيقاف تشغيل الفلاش. في المثال الآنف الذكر، يتم استدعاؤه عندما تصبح النافذة في بؤرة التركيز، ولكن قد تستخدم مهلة أو حدث آخر لتعطيلها.

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
