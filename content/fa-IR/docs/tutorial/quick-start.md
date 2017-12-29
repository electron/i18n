# شروع سریع

الکترون شما را قادر می سازد با جاوا اسکریپ خالص و فراهم کردن API های غنی سیستم عامل اصلی، اپلیکیشن دستکتاب بسازید. شما باید این را نوعی از Node.js runtime بدانید که روی ساخت اپلیکیشن دستکتاپ تمرکز کرده به جز بخش وب سرورها.

به این معنی نیست که الکترون یک پوسته جاوااسکریپت از کتابخانه های رابط کاربری گرافیکی است. به جز، استفاده الکترون از صفحات وب که جزی از رابط کاربر گرافیکی هستند، پس شما می توانید آن را جزی از مرورگر Chromium به حساب بیاورید که با جاوا اسکریپت کنترل می شود.

### پردازش اصلی

در الکترون، پروسه ها با صدا کردن اسکریپت اصلی package.json اجرا می شوند. اسکریپتی که هنگام اجرا در پروسه اصلی می تواند رابط کاربری گرافیکی را به وسیله ایجاد صفحات وب نمایش دهد.

### پردازش رندرینگ

از آنجا که الکترون برای نمایش صفحات وب از Chromium استفاده می‌کند، از معماری چند پردازشی هم بهرمند می‌شود. هر صفحه وب در الکترون پروسه خود را برای اجرا دارد، هر کدام پردازش جداگانه دارد.

در مرورگرهای معمولی، صفحات وب اغلب در محیط sandboxed اجرا می‌شوند و اجازه دسترسی به منابع اصلی ندارند. کاربران الکترون، به هر حال، قادرند با استفاده از API های Node.js در صفحات وب دسترسی به لایه های زیرین اجرایی سیستم عامل داشته باشند.

### تفاوت پردازش اصلی و پردازش رندرینگ

پروسه اصلی به وسیله خلق نمونه های BrowserWindow صفحات وب را می‌سازد. هر نمونه از BrowserWindow پروسه رندرینگ خود را اجرا می کند. وقتی که یک نمونه از BrowserWindow نابود می‌شود، پروسه رندرینگ متناظر با آن هم خاتمه می‌یابد.

پروسه اصلی، تمام صفحات وب و پروسه های رندر متناظر آن ها را مدیریت می‌کند. هر پروسه رندر، ایزوله است و مراقب صفحه وبی است که درونش در حال اجراست.

در صفحات وب، دسترسی به API های رابط کاربری گرافیکی نیتیو مجاز نیست به خاطر اینکه مدیریت منابع نیتیو رابط کاربری گرافیکی در صفحات وب خیلی خطرناک است و به راحتی باعث نشتی منابع می‌شود. اگر هم بخواهید عملیات های رابط کاربری گرافیکی در صفحه وب اجرا کنید، پروسه رندر درون صفحه وب باید با ارتباط با پروسه اصلی و درخواست از آن عملیات را انجام دهد.

در الکترون، ما راه های مختلفی برای ارتباط بین پروسه اصلی و پروسه رندر داریم. مثل ماژول های [`ipcRenderer`](../api/ipc-renderer.md) و [`ipcMain`](../api/ipc-main.md) برای ارسال پیام و ماژول [remote](../api/remote.md) برای ارتباطات RPC استایل. همچنین در سوالات متداول بخش "چگونگی اشتراک اطلاعات بین صفحات وب" در دسترس است.

## اولین برنامه الکترون خود را بنویسید

به طور کلی، ساختار یک آپ الکترون به این شکل است:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

فرمت `package.json` دقیقا مشابه ماژول های نود است و اسکریپت ها به وسیله فیلد `main` که شروع کننده اسکریپت آپ شما است، مشخص می‌شوند، که پروسه اصلی را اجرا خواهند کرد. برای مثال در `package.json` احتمالا چیزی شبیه این ببینید:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

نکته: اگر فیلد `main` در پکیج `package.json` نیست، الکترون `index.js` را لود خواهد کرد.

`main.js` پنجره ها را می‌سازد و رویداد های سیستم را مدیریت می‌کند، یک مثال معمول وجود دارد:

```javascript
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```

در نهایت `index.html` است که می‌خواهید نمایش داده شود:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using node <script>document.write(process.versions.node)</script>,
    Chrome <script>document.write(process.versions.chrome)</script>,
    and Electron <script>document.write(process.versions.electron)</script>.
  </body>
</html>
```

## اجرای برنامه

وقتی که شما فایلهای `main.js` ، `index.html` و `package.json` اولیه خود را ایجاد کردید، احتمالا تلاش می‌کنید که آپ خود را به صورت لوکال اجرا و تست کنید و مطمئن شوید که طبق انتظار کار می‌کند.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) یک ماژول `npm` است که شامل نسخه های کامل شده قبلی الکترون هم می‌باشد.

اگر شما `npm` را به صورت global نصب دارید، فقط لازم است که طبق سورس دایرکتوری موجود آپ خود را اجرا کنید.

```sh
electron .
```

اگر به صورت لوکال نصب دارید، آن وقت کد های زیر را اجرا کنید:

#### مک‌اواس / لینوکس

```sh
$ ./node_modules/.bin/electron .
```

#### ویندوز

```sh
$ .\node_modules\.bin\electron .
```

#### نود ورژن 8.2.0 و بالاتر

```sh
$ npx electron .
```

### Manually Downloaded Electron Binary

If you downloaded Electron manually, you can also use the included binary to execute your app directly.

#### مک‌اواس

```sh
$ ./Electron.app/Contents/MacOS/Electron your-app/
```

#### لینوکس

```sh
$ ./electron/electron your-app/
```

#### ویندوز

```sh
$ .\electron\electron.exe your-app\
```

`Electron.app` here is part of the Electron's release package, you can download it from [here](https://github.com/electron/electron/releases).

### Run as a distribution

After you're done writing your app, you can create a distribution by following the [Application Distribution](./application-distribution.md) guide and then executing the packaged app.

### این مثال را امتحان کنید

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which includes [npm](https://npmjs.org)) on your system.

```sh
# Clone the repository
$ git clone https://github.com/electron/electron-quick-start
# Go into the repository
$ cd electron-quick-start
# Install dependencies
$ npm install
# Run the app
$ npm start
```

For more example apps, see the [list of boilerplates](https://electronjs.org/community#boilerplates) created by the awesome electron community.