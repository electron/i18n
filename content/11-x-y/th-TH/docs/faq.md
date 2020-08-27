# คำถามที่พบบ่อยของ Electron

## ฉันมีปัญหาในการติดตั้ง Electron

เมื่อเรียกคำสั่ง `npm install electron` ผู้ใช้งานบางคนอาจจะพบปัญหาในการติดตั้งเป็นบางครั้ง

ในเกือบทุกกรณีข้อผิดพลาดเหล่านี้เป็นผลมาจากปัญหาเครือข่ายและไม่ ปัญหาจริงกับแพ็คเกจ `electron` npm package. ข้อผิดพลาดเช่น `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, และ `ETIMEDOUT` เป็นสิ่งบ่งชี้ทั้งหมดของ ปัญหาเครือข่าย ความละเอียดที่ดีที่สุดคือลองเปลี่ยนเครือข่ายหรือ รอสักครู่แล้วลองติดตั้งอีกครั้ง

คุณยังสามารถลองดาวน์โหลด Electron ได้โดยตรงจาก [electron/electron/releases](https://github.com/electron/electron/releases) ถ้าการติดตั้งด้วย `npm` มีความผิดพลาด

## เมื่อไหร่ Electron จะอัพเกรดเป็น Chrome ตัวล่าสุด?

เวอร์ชั่นของ Chrome ใน Electron นั้นจะถูกอัพเกรดภายในหนึ่งถึงสองสัปดาห์หลังจากที่มีการปล่อย Chrome รุ่นที่เสถียรออกมา การประเมินที่เป็นแค่การคาดเดาและขึ้นอยู่กับจำนวนของงานที่เกี่ยวข้องในการอัพเดรด

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

สำหรับข้อมูลเพิ่มเติม โปรดดู[บทนำความปลอดภัย](tutorial/security.md)

## เมื่อไหร่ Electron จะอัพเกรดเป็น Node.js ตัวล่าสุด?

เมื่อมีเวอร์ชั่นใหม่ของ Node.js ออกมา เราจะรอประมาณหนึ่งเดือนก่อนที่จะอัพเกรดมันใน Electron เพื่อที่ว่าเราจะได้หลีกเลี่ยงผลกระทบจากจุดบกพร่องต่างๆใน Node.js เวอร์ชั่นใหม่ซึ่งเกิดขึ้นอยู่บ่อยครั้ง

คุณลักษณะใหม่ของ Node.js นั้นมักจะมาโดยการอัพเกรด V8 เนื่องจาก Electron นั้นใช้ V8 ที่มาพร้อมกับเบราว์เซอร์ Chrome คุณลักษณะใหม่ของ Node.js เวอร์ชั่นใหม่นั้นโดยส่วนมากจะมีอยู่ใน Electron แล้ว

## วิธีการแชร์ข้อมูลระหว่างหน้าเว็บ?

วิธีที่จะแชร์ข้อมูลระหว่างเพจ (ในกระบวนการเรนเดอร์) อย่างง่ายที่สุดคือการใช้ API ของ HTML5 ซึ่งมีอยู่แล้วในเบราว์เซอร์ Good candidates are [Storage API][storage], [`localStorage`][local-storage], [`sessionStorage`][session-storage], and [IndexedDB][indexed-db].

Alternatively, you can use the IPC primitives that are provided by Electron. To share data between the main and renderer processes, you can use the [`ipcMain`](api/ipc-main.md) and [`ipcRenderer`](api/ipc-renderer.md) modules. To communicate directly between web pages, you can send a [`MessagePort`][message-port] from one to the other, possibly via the main process using [`ipcRenderer.postMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Subsequent communication over message ports is direct and does not detour through the main process.

## ถาดของแอปหายไปหลังจากผ่านไปไม่กี่นาที

This happens when the variable which is used to store the tray gets garbage collected.

หากคุณพบปัญหานี้บทความต่อไปนี้อาจพิสูจน์ได้ว่ามีประโยชน์:

* [การจัดาการหน่วยความจำ][memory-management]
* [ขอบเขตตัวแปร][variable-scope]

หากคุณต้องการการแก้ไขอย่างรวดเร็วคุณสามารถทำให้ตัวแปรเป็นโลกโดยการเปลี่ยนของคุณ รหัสจากนี้

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

เป็นดังต่อไปนี้:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## ฉันไม่สามารถใช้ jQuery / RequireJS / Meteor / AngularJS ใน Electron

เนื่องจากการรวม Node.js ของอิเล็กตรอนจึงมีสัญลักษณ์พิเศษบางอย่าง แทรกลงใน DOM เช่น `module`, `exports`, `require`. สิ่งนี้ทำให้เกิดปัญหา สำหรับบางไลบรารีเนื่องจากต้องการแทรกสัญลักษณ์ด้วยชื่อเดียวกัน

ในการแก้ไขปัญหานี้ คุณสามารถปิดการทำงานร่วมกันของ node ใน Electron

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

แต่ถ้าคุณต้องการรักษาความสามารถในการใช้ Node.js และ Electron API คุณล่ะ ต้องเปลี่ยนชื่อสัญลักษณ์ในหน้าก่อนที่จะรวมห้องสมุดอื่น ๆ :

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

เมื่อใช้โมดูลในตัวของอิเล็กตรอนคุณอาจพบข้อผิดพลาดดังนี้:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

It is very likely you are using the module in the wrong process. ตัวอย่างเช่น `electron.app` สามารถใช้ได้ในกระบวนการหลักเท่านั้นในขณะที่ </code> ใช้ได้เฉพาะในกระบวนการตัวแสดงภาพเท่านั้น

## The font looks blurry, what is this and what can I do?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. Example:

![subpixel rendering example][]

การลบรอยหยักย่อยพิกเซลต้องการพื้นหลังที่ไม่โปร่งใสของเลเยอร์ที่ประกอบด้วยสัญลักษณ์ตัวอักษร (ดู [ ปัญหานี้ ](https://github.com/electron/electron/issues/6344#issuecomment-420371918) สำหรับข้อมูลเพิ่มเติม)

To achieve this goal, set the background in the constructor for [BrowserWindow][browser-window]:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

ขอให้สังเกตว่าเพียงแค่การตั้งค่าพื้นหลังใน CSS ไม่มีผลที่ต้องการ

[memory-management]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
[variable-scope]: https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx
[storage]: https://developer.mozilla.org/en-US/docs/Web/API/Storage
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[session-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
[indexed-db]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[message-port]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[browser-window]: api/browser-window.md
[subpixel rendering example]: images/subpixel-rendering-screenshot.gif
