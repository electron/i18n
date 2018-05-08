# คำถามที่พบบ่อยของ Electron

## ฉันมีปัญหาในการติดตั้ง Electron

เมื่อเรียกคำสั่ง `npm install electron` ผู้ใช้งานบางคนอาจจะพบปัญหาในการติดตั้งเป็นบางครั้ง

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or wait a bit and try installing again.

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

## เมื่อไหร่ Electron จะอัพเกรดเป็น Chrome ตัวล่าสุด?

เวอร์ชั่นของ Chrome ใน Electron นั้นจะถูกอัพเกรดภายในหนึ่งถึงสองสัปดาห์หลังจากที่มีการปล่อย Chrome รุ่นที่เสถียรออกมา การประเมินที่เป็นแค่การคาดเดาและขึ้นอยู่กับจำนวนของงานที่เกี่ยวข้องในการอัพเดรด

เฉพาะช่องที่เสถียรของ Chrome ทีจะถูกใช้ หากมีการแก้ไขที่สำคัญที่ช่องเบต้าหรือช่องพัฒนา เราจะนำมันเข้ามาในเวอร์ชั่นที่ใช้อยู่

สำหรับข้อมูลเพิ่มเติม โปรดดู[บทนำความปลอดภัย](tutorial/security.md)

## เมื่อไหร่ Electron จะอัพเกรดเป็น Node.js ตัวล่าสุด?

เมื่อมีเวอร์ชั่นใหม่ของ Node.js ออกมา เราจะรอประมาณหนึ่งเดือนก่อนที่จะอัพเกรดมันใน Electron เพื่อที่ว่าเราจะได้หลีกเลี่ยงผลกระทบจากจุดบกพร่องต่างๆใน Node.js เวอร์ชั่นใหม่ซึ่งเกิดขึ้นอยู่บ่อยครั้ง

คุณลักษณะใหม่ของ Node.js นั้นมักจะมาโดยการอัพเกรด V8 เนื่องจาก Electron นั้นใช้ V8 ที่มาพร้อมกับเบราว์เซอร์ Chrome คุณลักษณะใหม่ของ Node.js เวอร์ชั่นใหม่นั้นโดยส่วนมากจะมีอยู่ใน Electron แล้ว

## วิธีการแชร์ข้อมูลระหว่างหน้าเว็บ?

วิธีที่จะแชร์ข้อมูลระหว่างเพจ (ในกระบวนการเรนเดอร์) อย่างง่ายที่สุดคือการใช้ API ของ HTML5 ซึ่งมีอยู่แล้วในเบราว์เซอร์ ตัวอย่างที่ดีคือ [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) และ [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

หรือคุณสามารถใช้ระบบ IPC ซึ่งมีเฉพาะ Electron เท่านั้น ในการจัดเก็บวัตถุในกระบวนการหลักเป็นตัวแปรส่วนกลาง และจะเข้าถึงพวกมันจากตัวเรนเดอร์ผ่านคุณสมบัติ `remote` ของ `electron` โมดูล:

```javascript
// ในกระบวนการหลัก
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// ในหน้า 1
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// ในหน้า 2
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## My app's window/tray disappeared after a few minutes.

This happens when the variable which is used to store the window/tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

* [การจัดาการหน่วยความจำ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Variable Scope](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

If you want a quick fix, you can make the variables global by changing your code from this:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

เป็นดังต่อไปนี้:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

ในการแก้ไขปัญหานี้ คุณสามารถปิดการทำงานร่วมกันของ node ใน Electron

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

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

## `require('electron').xxx` is undefined.

When using Electron's built-in module you might encounter an error like this:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```sh
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.