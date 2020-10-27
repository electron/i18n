# شريط مهام ويندوز

## النظرة عامة

إلكترون لديه واجهة برمجة التطبيقات لتهيئة رمز التطبيق في Windows taskbar. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## قائمة القفز

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. قائمة السياق هذه تسمى `قائمة القفز`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks):

> تحدد التطبيقات المهام استناداً إلى ميزات البرنامج والمفتاح الأشياء التي يتوقع أن يقوم بها المستخدم معهم. يجب أن تكون المهام خالية من السياقات، في أن التطبيق لا يحتاج إلى تشغيله للعمل. يجب أن تكون أيضا الإجراءات الأكثر شيوعا إحصائيا التي يقوم بها المستخدم العادي في التطبيق، مثل إنشاء رسالة بريد إلكتروني أو فتح التقويم في برنامج بريد، إنشاء مستند جديد في معالج الكلمات، قم بتشغيل تطبيق في وضع معين، أو اطلاق واحد من الأوامر الفرعية. يجب على تطبيق أن لا يحجب القائمة مع الميزات المتقدمة التي لن يحتاج إليها مستخدمو أو إجراءات لمرة واحدة مثل التسجيل. لا تستخدم المهام لعناصر الترويج مثل الترقيات أو العروض الخاصة.
> 
> ويوصى بشدة بأن تكون قائمة المهام جامدة. يجب أن يبقى نفس بغض النظر عن حالة أو وضع الطلب. بينما يمكن تغيير القائمة بشكل ديناميكي، يجب أن تأخذ في الاعتبار أن هذا يمكن أن يخلط بين المستخدم الذي لا يتوقع ذلك الجزء من قائمة الوجهة و يتغير.

![آي](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API.

#### أمثلة

##### Set user tasks

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { app } = require('electron')

app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

##### Clear tasks list

To clear your tasks list, you need to call `app.setUserTasks` with an empty array in the `main.js` file.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> NOTE: The user tasks will still be displayed even after closing your application, so the icon and program path specified for a task should exist until your application is uninstalled.

### Thumbnail Toolbars

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars):

> شريط الأدوات هذا هو التحكم الموحد المألوف في شريط الأدوات. يحتوي على كحد أقصى سبعة أزرار. يتم تعريف معرف كل زر، والصورة، ونصيحة أدوات، والحالة في هيكل، ثم يتم تمريره إلى شريط المهام. يمكن للتطبيق أن يظهر أو تمكين أو تعطيل أو إخفاء الأزرار من شريط الأدوات المصغرة كما هو مطلوب في حالته الحالية .
> 
> على سبيل المثال، Windows Media Player قد يوفر ضوابط قياسية لنقل الوسائط مثل اللعب، الإيقاف، الكتم، والتوقف.

![لاعب](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows)

#### أمثلة

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = مطلوب('electron')
مسار المسار = مطلوب('path')

فوز الفوز = متصفح جديد ()

الفوز. تلميح etThumbarButtons([
  {
    أداة: 'button1',
    أيقونة : الطريق. oin(__dirname, 'button1.png'),
    انقر على () console. og('button1 click icked'}
  }, {
    tooltip: 'button2',
    أيقونة: path.join(__dirname, 'button2. ng'),
    الأعلام: ['تمكين', 'dismissonclick'],
    انقر فوق () { console. og('button2 ضغط.')
  }
])
```

##### Clear thumbnail toolbar

To clear thumbnail toolbar buttons, you need to call `BrowserWindow.setThumbarButtons` with an empty array in the `main.js` file.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### تراكب الأيقونة في شريط المهام

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays):

> وتشكل طبقات الأيقونات إشعارا بالوضع في سياقه الصحيح، والمقصود منها أن تنفي الحاجة إلى أيقونة حالة إشعارات منفصلة لإرسال تلك المعلومات إلى المستخدم. على سبيل المثال، حالة البريد الإلكتروني الجديدة في Microsoft Outlook، يظهر حاليا في منطقة الإشعار، يمكن الآن الإشارة من خلال تراكب على زر شريط المهام. مرة أخرى، يجب عليك أن تقرر، خلال دورة التطوير الخاصة بك، الطريقة الأفضل لتطبيقك. الرموز الخلفية هي الغرض منها توفير حالة مهمة أو إشعارات قديمة مثل حالة الشبكة، أو حالة السعاة، أو البريد الجديد. لا ينبغي أن يكون المستخدم معروضة مع طبقات أو حركات متحركة متغيرة باستمرار.

![تراكب على زر شريط المهام](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API.

#### مثال

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### إطار الفلاش

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN](https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks):

> عادة ، يتم تفليش النافذة لإبلاغ المستخدم بأن النافذة تتطلب انتباها ولكنها لا تحتوي حاليا على تركيز لوحة المفاتيح.

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API.

#### مثال

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.
