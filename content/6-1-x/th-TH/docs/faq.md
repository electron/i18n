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

วิธีที่จะแชร์ข้อมูลระหว่างเพจ (ในกระบวนการเรนเดอร์) อย่างง่ายที่สุดคือการใช้ API ของ HTML5 ซึ่งมีอยู่แล้วในเบราว์เซอร์ ตัวอย่างที่ดีคือ [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) และ [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

หรือคุณสามารถใช้ระบบ IPC ซึ่งมีเฉพาะ Electron เท่านั้น ในการจัดเก็บวัตถุในกระบวนการหลักเป็นตัวแปรส่วนกลาง และจะเข้าถึงพวกมันจากตัวเรนเดอร์ผ่านคุณสมบัติ `remote` ของ `electron` โมดูล:

```javascript
// In the main process.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// In page 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// In page 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## หน้าต่าง / ถาดแอปของฉันหายไปหลังจากไม่กี่นาที

สิ่งนี้เกิดขึ้นเมื่อตัวแปรที่ใช้จัดเก็บหน้าต่าง / ถาดได้รับ เก็บขยะ

หากคุณพบปัญหานี้บทความต่อไปนี้อาจพิสูจน์ได้ว่ามีประโยชน์:

* [การจัดาการหน่วยความจำ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [ขอบเขตตัวแปร](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

หากคุณต้องการการแก้ไขอย่างรวดเร็วคุณสามารถทำให้ตัวแปรเป็นโลกโดยการเปลี่ยนของคุณ รหัสจากนี้

```javascript
const { app, Tray } = require('electron')
app.on('ready', () => {
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
let win = new BrowserWindow({
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

นี่เป็นเพราะคุณได้ติดตั้ง [npm `electron` module](https://www.npmjs.com/package/electron) ไม่ว่าจะเป็นในประเทศหรือทั่วโลกซึ่งจะแทนที่โมดูลในตัวของอิเล็กตรอน

หากต้องการตรวจสอบว่าคุณกำลังใช้โมดูลในตัวที่ถูกต้องคุณสามารถพิมพ์ เส้นทางของโมดูล `electron` module:

```javascript
console.log(require.resolve('electron'))
```

จากนั้นตรวจสอบว่าอยู่ในรูปแบบต่อไปนี้หรือไม่:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

หากเป็นเช่น `node_modules/electron/index.js`, คุณต้องทำ อาจลบโมดูล npm `electron` หรือเปลี่ยนชื่อ

```sh
npm uninstall electron
npm uninstall -g electron
```

อย่างไรก็ตามหากคุณกำลังใช้โมดูลในตัว แต่ยังคงได้รับข้อผิดพลาดนี้อยู่ มีโอกาสมากที่คุณกำลังใช้โมดูลในกระบวนการที่ไม่ถูกต้อง ตัวอย่างเช่น `electron.app` สามารถใช้ได้ในกระบวนการหลักเท่านั้นในขณะที่ </code> ใช้ได้เฉพาะในกระบวนการตัวแสดงภาพเท่านั้น
