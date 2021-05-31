# 快速入门

本指南将会通过使用Electron创建一个极简的 Hello World 应用一步步的带你了解，该应用与[`electron/electron-quick-start`][quick-start]类似。

通过这个教程，你的app将会打开一个浏览器窗口，来展示包含当前正在运行的 Chromium, Node.js, and Electronweb等版本信息的web界面

## 前提条件

在使用Electron进行开发之前，您需要安装 [Node.js][node-download]。 我们建议您使用最新的LTS版本。

> 请使用为你平台预构建的 Node.js 安装器来进行安装， 否则，您可能会遇到与不同开发工具不兼容的问题。

要检查 Node.js 是否正确安装，请在您的终端输入以下命令：

```sh
node -v
npm -v
```

这两个命令应输出了 Node.js 和 npm 的版本信息。

**注意** 因为 Electron 将 Node.js 嵌入到其二进制文件中，你应用运行时的 Node.js 版本与你系统中运行的 Node.js 版本无关。

## 创建你的应用程序

### 使用脚手架创建

Electron 应用程序遵循与其他 Node.js 项目相同的结构。 首先创建一个文件夹并初始化 npm 包。

```sh npm2yarn
mkdir my-electron-app && cd my-electron-app
npm init
```

`init`初始化命令会提示您在项目初始化配置中设置一些值 为本教程的目的，有几条规则需要遵循：

* `entry point` 应为 `main.js`.
* `author` 与 `description` 可为任意值，但对于[应用打包](#package-and-distribute-your-application)是必填项。

你的 `package.json` 文件应该像这样：

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "author": "Jane Doe",
  "license": "MIT"
}
```

然后，将 `electron` 包安装到应用的开发依赖中。

```sh npm2yarn
$ npm install --save-dev electron
```

> 注意：如果您在安装 Electron 时遇到任何问题，请 参见 [高级安装][advanced-installation] 指南。

最后，您希望能够执行 Electron 如下所示，在您的 [`package.json`][package-scripts]配置文件中的`scripts`字段下增加一条`start`命令：

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

`start`命令能让您在开发模式下打开您的应用

```sh npm2yarn
npm start
```

> 注意：此脚本将告诉 Electron 在您项目根目录运行 此时，您的应用将立即抛出一个错误提示您它无法找到要运行的应用

### 运行主进程

任何 Electron 应用程序的入口都是 `main` 文件。 这个文件控制了**主进程**，它运行在一个完整的Node.js环境中，负责控制您应用的生命周期，显示原生界面，执行特殊操作并管理渲染器进程(稍后详细介绍)。

执行期间，Electron 将依据应用中 `package.json`配置下[`main`][package-json-main]字段中配置的值查找此文件，您应该已在[应用脚手架](#scaffold-the-project)步骤中配置。

要初始化这个`main`文件，需要在您项目的根目录下创建一个名为`main.js`的空文件。

> 注意：如果您此时再次运行`start`命令，您的应用将不再抛出任何错误！ 然而，它不会做任何事因为我们还没有在`main.js`中添加任何代码。

### 创建页面

Before we can create a window for our application, we need to create the content that will be loaded into it. In Electron, each window displays web contents that can be loaded from either from a local HTML file or a remote URL.

For this tutorial, you will be doing the former. Create an `index.html` file in the root folder of your project:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.
  </body>
</html>
```

> Note: Looking at this HTML document, you can observe that the version numbers are missing from the body text. We'll manually insert them later using JavaScript.

### 在窗口中打开您的页面

Now that you have a web page, load it into an application window. To do so, you'll need two Electron modules:

* The [`app`][app] module, which controls your application's event lifecycle.
* The [`BrowserWindow`][browser-window] module, which creates and manages application windows.

Because the main process runs Node.js, you can import these as [CommonJS][commonjs] modules at the top of your file:

```js
const { app, BrowserWindow } = require('electron')
```

Then, add a `createWindow()` function that loads `index.html` into a new `BrowserWindow` instance.

```js
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}
```

Next, call this `createWindow()` function to open your window.

In Electron, browser windows can only be created after the `app` module's [`ready`][app-ready] event is fired. You can wait for this event by using the [`app.whenReady()`][app-when-ready] API. Call `createWindow()` after `whenReady()` resolves its Promise.

```js
app.whenReady().then(() => {
  createWindow()
})
```

> Note: At this point, your Electron application should successfully open a window that displays your web page!

### 管理窗口的生命周期

Although you can now open a browser window, you'll need some additional boilerplate code to make it feel more native to each platform. Application windows behave differently on each OS, and Electron puts the responsibility on developers to implement these conventions in their app.

In general, you can use the `process` global's [`platform`][node-platform] attribute to run code specifically for certain operating systems.

#### Quit the app when all windows are closed (Windows & Linux)

On Windows and Linux, exiting all windows generally quits an application entirely.

To implement this, listen for the `app` module's [`'window-all-closed'`][window-all-closed] event, and call [`app.quit()`][app-quit] if the user is not on macOS (`darwin`).

```js
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

#### Open a window if none are open (macOS)

Whereas Linux and Windows apps quit when they have no windows open, macOS apps generally continue running even without any windows open, and activating the app when no windows are available should open a new one.

To implement this feature, listen for the `app` module's [`activate`][activate] event, and call your existing `createWindow()` method if no browser windows are open.

Because windows cannot be created before the `ready` event, you should only listen for `activate` events after your app is initialized. Do this by attaching your event listener from within your existing `whenReady()` callback.

```js
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```

> Note: At this point, your window controls should be fully functional!

### Access Node.js from the renderer with a preload script

Now, the last thing to do is print out the version numbers for Electron and its dependencies onto your web page.

Accessing this information is trivial to do in the main process through Node's global `process` object. However, you can't just edit the DOM from the main process because it has no access to the renderer's `document` context. They're in entirely different processes!

> Note: If you need a more in-depth look at Electron processes, see the [Process Model][] document.

This is where attaching a **preload** script to your renderer comes in handy. A preload script runs before the renderer process is loaded, and has access to both renderer globals (e.g. `window` and `document`) and a Node.js environment.

Create a new script named `preload.js` as such:

```js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

The above code accesses the Node.js `process.versions` object and runs a basic `replaceText` helper function to insert the version numbers into the HTML document.

To attach this script to your renderer process, pass in the path to your preload script to the `webPreferences.preload` option in your existing `BrowserWindow` constructor.

```js
// 在文件头部引入 Node.js 中的 path 模块
const path = require('path')

// 修改现有的 createWindow() 函数
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}
// ...
```

There are two Node.js concepts that are used here:

* The [`__dirname`][dirname] string points to the path of the currently executing script (in this case, your project's root folder).
* The [`path.join`][path-join] API joins multiple path segments together, creating a combined path string that works across all platforms.

We use a path relative to the currently executing JavaScript file so that your relative path will work in both development and packaged mode.

### Bonus: Add functionality to your web contents

At this point, you might be wondering how to add more functionality to your application.

For any interactions with your web contents, you want to add scripts to your renderer process. Because the renderer runs in a normal web environment, you can add a `<script>` tag right before your `index.html` file's closing `</body>` tag to include any arbitrary scripts you want:

```html
<script src="./renderer.js"></script>
```

The code contained in `renderer.js` can then use the same JavaScript APIs and tooling you use for typical front-end development, such as using [`webpack`][webpack] to bundle and minify your code or [React][react] to manage your user interfaces.

### Recap

After following the above steps, you should have a fully functional Electron application that looks like this:

![最简的 Electron 应用程序](../images/simplest-electron-app.png)

<!--TODO(erickzhao): Remove the individual code blocks for static website -->
The full code is available below:

```js
// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. 也可以拆分成几个文件，然后用 require 导入。
```

```js
// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

```html
<!--index.html-->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.

    <!-- You can also require other files to run in this process -->
    <script src="./renderer.js"></script>
  </body>
</html>
```
```fiddle docs/fiddles/quick-start
```

To summarize all the steps we've done:

* We bootstrapped a Node.js application and added Electron as a dependency.
* We created a `main.js` script that runs our main process, which controls our app
  and runs in a Node.js environment. In this script, we used Electron's `app` and
  `BrowserWindow` modules to create a browser window that displays web content
  in a separate process (the renderer).

* In order to access certain Node.js functionality in the renderer, we attached
  a preload script to our `BrowserWindow` constructor.

## Package and distribute your application

The fastest way to distribute your newly created app is using
[Electron Forge](https://www.electronforge.io).

1. Add Electron Forge as a development dependency of your app, and use its `import` command to set up
Forge's scaffolding:

    ```sh npm2yarn
    npm install --save-dev @electron-forge/cli
    npx electron-forge import

    ✔ Checking your system
    ✔ Initializing Git Repository
    ✔ Writing modified package.json file
    ✔ Installing dependencies
    ✔ Writing modified package.json file
    ✔ Fixing .gitignore

    We have ATTEMPTED to convert your app to be in a format that electron-forge understands.

    Thanks for using "electron-forge"!!!
    ```

1. Create a distributable using Forge's `make` command:

    ```sh npm2yarn
    npm run make

    > my-electron-app@1.0.0 make /my-electron-app
    > electron-forge make

    ✔ Checking your system
    ✔ Resolving Forge Config
    We need to package your application before we can make it
    ✔ Preparing to Package Application for arch: x64
    ✔ Preparing native dependencies
    ✔ Packaging Application
    Making for the following targets: zip
    ✔ Making for target: zip - On platform: darwin - For arch: x64
    ```

    Electron Forge creates the `out` folder where your package will be located:

    ```plain
    // Example for macOS
    out/
    ├── out/make/zip/darwin/x64/my-electron-app-darwin-x64-1.0.0.zip
    ├── ...
    └── out/my-electron-app-darwin-x64/my-electron-app.app/Contents/MacOS/my-electron-app
    ```

[quick-start]: https://github.com/electron/electron-quick-start

[node-download]: https://nodejs.org/en/download/

[advanced-installation]: ./installation.md
[package-scripts]: https://docs.npmjs.com/cli/v7/using-npm/scripts

[package-json-main]: https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main

[app]: ../api/app.md
[browser-window]: ../api/browser-window.md
[commonjs]: https://nodejs.org/docs/latest/api/modules.html#modules_modules_commonjs_modules
[app-ready]: ../api/app.md#event-ready
[app-when-ready]: ../api/app.md#appwhenready

[node-platform]: https://nodejs.org/api/process.html#process_process_platform
[window-all-closed]: ../api/app.md#appquit

[activate]: ../api/app.md#event-activate-macos

[Process Model]: ./process-model.md
[dirname]: https://nodejs.org/api/modules.html#modules_dirname
[path-join]: https://nodejs.org/api/path.html#path_path_join_paths

[webpack]: https://webpack.js.org
[react]: https://reactjs.org
