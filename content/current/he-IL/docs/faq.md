# Electron שאלות נפוצות

## מדוע אני נתקבל בבעיות בעת התקנת Electron?

בהרצת `npm install electron`, חווים חלק מהמשתמשים תקלות בהתקנה.

ברוב בהמקרים תקלות אלו הן תוצאה של בעיות בתקשורת האינטרנט ולא בחבילת ה-npm של `electron`. תקלות כמו `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, ו-`ETIMEDOUT` הן כולן סימן לתקלות תקשורת. לרוב, הפתרון הוא לנסות לחליף רשת או לנסות להתקין שוב במועד מאוחר יותר.

ניתן גם לנסות להתקין Electron ישירות מ-[electron/electron/releases](https://github.com/electron/electron/releases) אם ההתקנה דרך `npm` נכשלת.

## מתי תעודכן Electron לגרסה האחרונה של Chrome?

גרסת ה-Chrome של Electron בדרך כלל מופצת שבוע או שבועיים לאחר שמופצת גרסה חדשה ויציבה של Chrome. הערכה זו אינה קבועה ותלויה בכמות העבודה שמצריך העדכון.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

למידע נוסף פתח [security introduction](tutorial/security.md).

## מתי תעודכן Electron לגרסה האחרונה של Node.js?

כאשר יוצאת גרסה חדשה של Node.js, אנחנו בדרך כלל מחכים חודש לפני שמשדרגים את הגרסה עבור Electron. ובכך אנו יכולים להימנע מהשפעות של באגים כתוצאה משדרוג הגרסה של Node.js, דבר שקורה לעיתים קרובות.

מאפיינים חדשים של Node.js בדרך כלל מובאים על ידי שדרוגים של V8, משום שElectorn נעזר בV8 בתוך דפדפן Chrome, המאפיינים החדשים והמעניינים של Node.js בדרך כלל כבר קיימים בElectron.

## כיצד לשתף מידע בין דפי אינטרנט?

על מנת לשתף מידע בין דפי אינטרנט (ובין תהליכי הגשה) הדרך הפשוטה ביותר היא להשתמש בממשקים של HTML5 שכבר קיימים בדפדפנים. מועמדים טובים לכך הם [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), וכן [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Alternatively, you can use the IPC primitives that are provided by Electron. To share data between the main and renderer processes, you can use the [`ipcMain`](api/ipc-main.md) and [`ipcRenderer`](api/ipc-renderer.md) modules. To communicate directly between web pages, you can send a [`MessagePort`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) from one to the other, possibly via the main process using [`ipcRenderer.postMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Subsequent communication over message ports is direct and does not detour through the main process.

## מגש האפליקציה שלי נעלם אחרי כמה שניות.

זה קורה כאשר המשתנה שבו משתמשים על מנת לאחסן את המגש עובר Garbage collection.

אם הינך נתקל בבעיה, המאמרים הבאים עשויים לסייע:

* [ניהול זיכרון](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [תחומי משתנים](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

על מנת לבצע תיקון מהיר, ניתן להפוך את המשתנים לגלובליים על ידי שינוי הקוד מצורה כזו:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

לצורה כזאת:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

בגלל האינטגרציה של Electorn עם Node.js, יש מספר סמלים שנוספו לDOM כדוגמת `module`, `exports`, `require`. זה גורם לבעיות בקרב מספר בפריות משום שהן צריכות להשתמש בסמלים אלה, והם בעלי אותו שם.

על מנת לפתור זאת, ניתן לבטל את האינטגרציה של Electorn עם Node,js:

```javascript
// In the main process.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

אבל אם ברצונך לשמר את היכולות של השימוש בNode.js יחד עם הממשקים של Electorn, יש לשנות את שמם של הסמלים בדף לפני שכוללים את הספריות השונות:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` הוא undefined.

כאשר משתמשים ברכיב הבנוי בתוך Electron עלולים לפגוש שגיאה כגון:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

סביר להניח שנעשה שימוש ברכיב בתהליך השגוי. לדוגמה, `electron.app` יכול להיות בשימוש אך ורק בתהליך הראשי, בעוד `electron.webFrame` נגיש רק בתהליכים המגישים.

## הפונטים נראים מטושטשים, מה זה ומה ניתן לעשות?

If [sub-pixel anti-aliasing](https://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. דוגמה:

![subpixel rendering example](images/subpixel-rendering-screenshot.gif)

Sub-pixel anti-aliasing דורש רקע לע שקוף לשכבת הרקע של תווי הפונט. (צפה [בבעיה הזאת](https://github.com/electron/electron/issues/6344#issuecomment-420371918) למידע נוסף).

על מנת להשיג מטרה זו, הגדר את הרקע בבנאי עבור [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

יש לשים לב כי רק להגדיר את הרקע באמצעות CSS לא יעניק את ההשפעה הרצויה.
