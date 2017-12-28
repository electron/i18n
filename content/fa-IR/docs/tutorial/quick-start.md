# شروع سریع

الکترون شما را قادر می سازد با جاوا اسکریپ خالص و فراهم کردن API های غنی سیستم عامل اصلی، اپلیکیشن دستکتاب بسازید. شما باید این رو نوعی از Node.js runtime بدانید که روی ساخت اپلیکیشن دستکتاپ تمرکز کرده به جز بخش وب سرورها.

این به این معنی نیست که الکترون یک پوسته جاوااسکریپت از کتابخانه های رابط کاربری گرافیکی است. به جز، استفاده الکترون از صفحات وب که جزی از رابط کاربر گرافیکی هستند، پس شما می توانید آن را جزی از مرورگر Chromium به حساب بیاورید که با جاوا اسکریپت کنترل می شود.

### پردازش اصلی

در الکترون، پروسه ها با صدا کردن اسکریپت اصلی package.json اجرا می شوند. اسکریپتی که هنگام اجرا در پروسه اصلی می تواند رابط کاربری گرافیکی را به وسیله ایجاد صفحات وب نمایش دهد.

### پردازش رندرینگ

از آنجا که الکترون برای نمایش صفحات وب از Chromium استفاده می‌کند، از معماری چند پردازشی هم بهرمند می‌شود. هر صفحه وب در الکترون پروسه خود را برای اجرا دارد، هر کدام پردازش جداگانه دارد.

در مرورگرهای معمولی، صفحات وب اغلب در محیط sandboxed اجرا می‌شوند و اجازه دسترسی به منابع اصلی ندارند. کاربران الکترون، به هر حال، قادرند با استفاده از API های Node.js در صفحات وب دسترسی به لایه های زیرین اجرایی سیستم عامل داشته باشند.

### تفاوت پردازش اصلی و پردازش رندرینگ

پروسه اصلی به وسیله خلق نمونه های BrowserWindow صفحات وب را می‌سازد. هر نمونه از BrowserWindow پروسه رندرینگ خود را اجرا می کند. وقتی که یک نمونه از BrowserWindow نابود می‌شود، پروسه رندرینگ متناظر با آن هم خاتمه می‌یابد.

پروسه اصلی، تمام صفحات وب و پروسه های رندر متناظر آن ها را مدیریت می‌کند. هر پروسه رندر، ایزوله است و مراقب صفحه وبی است که درونش در حال اجراست.

In web pages, calling native GUI related APIs is not allowed because managing native GUI resources in web pages is very dangerous and it is easy to leak resources. If you want to perform GUI operations in a web page, the renderer process of the web page must communicate with the main process to request that the main process perform those operations.

In Electron, we have several ways to communicate between the main process and renderer processes. Like [`ipcRenderer`](../api/ipc-renderer.md) and [`ipcMain`](../api/ipc-main.md) modules for sending messages, and the [remote](../api/remote.md) module for RPC style communication. There is also an FAQ entry on [how to share data between web pages](../faq.md#how-to-share-data-between-web-pages).

## اولین برنامه الکترون خود را بنویسید

به طور کلی، یک برنامه الکترون به این شکل است:

```text
your-app/
├── package.json
├── main.js
└── index.html
```

The format of `package.json` is exactly the same as that of Node's modules, and the script specified by the `main` field is the startup script of your app, which will run the main process. An example of your `package.json` might look like this:

```json
{
  "name"    : "your-app",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js`.

The `main.js` should create windows and handle system events, a typical example being:

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

Finally the `index.html` is the web page you want to show:

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

## اجرای برنامه خود

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you'll probably want to try running your app locally to test it and make sure it's working as expected.

### `electron`

[`electron`](https://github.com/electron-userland/electron-prebuilt) is an `npm` module that contains pre-compiled versions of Electron.

If you've installed it globally with `npm`, then you will only need to run the following in your app's source directory:

```sh
الکترون .
```

If you've installed it locally, then run:

#### مک‌اواس / لینوکس

```sh
$ ./node_modules/.bin/electron .
```

#### ویندوز

```sh
$ .\node_modules\.bin\electron .
```

#### Node v8.2.0 and later

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