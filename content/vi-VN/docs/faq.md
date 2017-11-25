# Electron FAQ (các câu hỏi thường gặp)

## Why am I having trouble installing Electron?

Khi chạy ` npm install electron </ 0> , một số người dùng đôi khi gặp phải  
lỗi cài đặt.</p>

<p>Trong hầu hết các trường hợp, các lỗi này là kết quả của các vấn đề về mạng và không phải là  
vấn đề thực tế với gói điện tử < 0> electron </ 0>  npm . Errors like <code>ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. Độ phân giải tốt nhất là thử chuyển mạng, hoặc chỉ cần đợi một chút và thử cài đặt lại.

You can also try to download the electronic telephone from  electronic-electronics </ 0> if not install o ` npm </ 1> is not. </p>

<h2>Khi nào Electron sẽ nâng cấp lên Chrome mới nhất ?</h2>

<p>The Chrome version of Electron is usually bumped within one or two weeks after
a new stable Chrome version gets released. Ước tính này không được bảo đảm và phụ thuộc vào số lượng công việc liên quan đến nâng cấp.</p>

<p>Only the stable channel of Chrome is used. If an important fix is in beta or dev
channel, we will back-port it.</p>

<p>For more information, please see the <a href="tutorial/security.md">security introduction</a>.</p>

<h2>When will Electron upgrade to latest Node.js?</h2>

<p>When a new version of Node.js gets released, we usually wait for about a month
before upgrading the one in Electron. Vì vậy, chúng ta có thể tránh bị ảnh hưởng bởi lỗi được giới thiệu trong các phiên bản Node.js mới , điều này xảy ra rất thường xuyên.</p>

<p>New features of Node.js are usually brought by V8 upgrades, since Electron is
using the V8 shipped by Chrome browser, the shiny new JavaScript feature of a
new Node.js version is usually already in Electron.</p>

<h2>How to share data between web pages?</h2>

<p>To share data between web pages (the renderer processes) the simplest way is to
use HTML5 APIs which are already available in browsers. Ứng viên tốt là
 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Storage"> Lưu trữ API </ 0> , <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"><code> lưu trữ cục bộ </ 1> ,
 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage"><code> sessionStorage </ 2> và <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"> IndexedDB </ 3> .</p>

<p>Or you can use the IPC system, which is specific to Electron, to store objects
in the main process as a global variable, and then to access them from the
renderers through the <code>remote` property of `electron` module:</p> 

```javascript
// Trong main process.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// Trong trang 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// Trong trang 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Cửa sổ / khay của ứng dụng tôi biến mất sau vài phút.

This happens when the variable which is used to store the window/tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

* [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Variable Scope](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

If you want a quick fix, you can make the variables global by changing your code from this:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

đến điều này:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Do Node.js được tích hợp trong Electron, có một ký hiệu bổ sung được chèn vào DOM như module </ 0>, ` xuất khẩu </ 0>, <code> yêu cầu </ 0>. Điều này gây ra vấn đề cho một số thư viện khi họ muốn chèn các ký hiệu cùng với một tên.</p>

<p>To solve this, you can turn off node integration in Electron:</p>

<pre><code class="javascript">// Trong main process.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
`</pre> 

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

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

## `require('electron').xxx` bị undefined.

Khi sử dụng các mô đun được xây dựng sẵn trong Electron, bạn có thể gặp lỗi như sau:

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
    

This has been occurred because you have a different modules of ` electron </ 1> </ 0> <if> <input> installed in the current directory or on global, it was ghi đè vào các module built in built in Electron.</p>

<p>To verify whether you are using the correct built-in module, you can print the
path of the <code>electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```bash
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.