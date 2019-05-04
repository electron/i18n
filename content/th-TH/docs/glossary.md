# อภิธานศัพท์

หน้านี้กำหนดคำศัพท์ที่ใช้ทั่วไปในการพัฒนาของ Electron

### ASAR

ASAR หมายถึงรูปแบบ Atom Shell Archive การเก็บถาวร [ asar ](https://github.com/electron/asar) นั้นง่าย ` tar ` รูปแบบเหมือนที่เชื่อมไฟล์เข้าด้วยกันเป็นไฟล์เดียว Electron สามารถอ่านได้ ไฟล์โดยพลการจากมันโดยไม่ต้องแกะไฟล์ทั้งหมด

รูปแบบ ASAR ถูกสร้างขึ้นเพื่อเพิ่มประสิทธิภาพการทำงานบน Windows ... TODO เป็นหลัก

### CRT

C Run-time Library (CRT) เป็นส่วนหนึ่งของไลบรารี่มาตรฐาน C++ ที่รวมอยู่ใน ISO C99 standard library. Visual C ++ ไลบรารี่นั้น ใช้การพัฒนารหัสสนับสนุนเนทีฟ CRT และทั้งแบบผสมดั้งเดิมและ รหัสที่ได้รับการจัดการและรหัสที่ได้รับการจัดการบริสุทธิ์สำหรับการพัฒนา. NET

### DMG

Apple Disk Image เป็นรูปแบบบรรจุภัณฑ์ที่ใช้โดย macOS ไฟล์ DMG นั้น ที่ใช้กันทั่วไปสำหรับการกระจายแอพพลิเคชั่น "ตัวติดตั้ง" [electron-builder](https://github.com/electron-userland/electron-builder) รองรับ `dmg` เป็นเป้าหมายบิลด์

### IME

ตัวแก้ไขวิธีการป้อนข้อมูล โปรแกรมที่ให้ผู้ใช้ป้อนตัวอักษรและ ไม่พบสัญลักษณ์บนแป้นพิมพ์ ตัวอย่างเช่นสิ่งนี้ช่วยให้ผู้ใช้ภาษาละติน แป้นพิมพ์เพื่อป้อนอักขระภาษาจีนญี่ปุ่นเกาหลีและตัวบ่งชี้

### IDL

ภาษาคำอธิบายส่วนต่อประสาน เขียนฟังก์ชั่นลายเซ็นและประเภทข้อมูลในรูปแบบที่สามารถใช้ในการสร้างส่วนต่อประสานใน Java, C ++, JavaScript และอื่น ๆ

### IPC

IPC ย่อมาจาก Inter-Process Communication อิเล็กตรอนใช้ IPC ในการส่ง ข้อความ JSON ที่ทำให้เป็นอนุกรมระหว่างกระบวนการ [ หลัก ](#main-process) และ [ ตัวสร้างภาพ ](#renderer-process)

### libchromiumcontent

ห้องสมุดสาธารณะที่มี [Chromium Content module](https://www.chromium.org/developers/content-module) และทั้งหมด การอ้างอิง (e.g., Blink, [V8](#v8), etc.). เรียกอีกอย่างว่า "libcc"

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

กระบวนการหลักโดยทั่วไปคือไฟล์ที่ชื่อ ` main.js ` เป็นจุดเริ่มต้นสำหรับทุก ๆ แอปอิเล็กตรอน มันควบคุมชีวิตของแอพตั้งแต่เปิดจนถึงปิด มันยัง จัดการองค์ประกอบพื้นฐานเช่นเมนูแถบเมนู Dock ถาด ฯลฯ กระบวนการหลักรับผิดชอบในการสร้างกระบวนการเรนเดอร์ใหม่ในแต่ละแอพ Node API แบบเต็มถูกสร้างขึ้น

ไฟล์กระบวนการหลักของทุกแอประบุไว้ในคุณสมบัติ `main` property in `package.json`. นี่คือวิธีที่ `electron .` รู้ว่าต้องใช้ไฟล์ใดเมื่อเริ่มต้น

ใน Chromium กระบวนการนี้เรียกว่า "กระบวนการเบราว์เซอร์" มันคือ เปลี่ยนชื่อในอิเล็กตรอนเพื่อหลีกเลี่ยงความสับสนกับกระบวนการ renderer

ดูเพิ่มเติมที่: [process](#process), [renderer process](#renderer-process)

### MAS

ตัวย่อสำหรับ Mac App Store ของ Apple สำหรับรายละเอียดเกี่ยวกับการส่งแอพของคุณไปที่ [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

ระบบ IPC สำหรับการสื่อสารภายในหรือระหว่างกระบวนการและที่สำคัญเพราะ Chrome มีความกระตือรือร้นในการแยกงานออกเป็นกระบวนการที่แยกต่างหากหรือไม่ขึ้นอยู่กับแรงกดดันของหน่วยความจำเป็นต้น

ดู https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### native modules

โมดูลเนทิฟ (also called [addons](https://nodejs.org/api/addons.html) in Node.js) ป็นโมดูลที่เขียนใน C หรือ C ++ ที่สามารถโหลดลงใน Node.js หรือ Electron ที่ใช้ฟังก์ชั่น require () และใช้ราวกับเป็น โมดูล Node.js สามัญ พวกเขาจะใช้เป็นหลักในการให้อินเตอร์เฟซ ระหว่าง JavaScript ที่ทำงานใน Node.js และไลบรารี C / C ++

โมดูล Native Node ได้รับการสนับสนุนโดย Electron แต่เนื่องจาก Electron นั้นดีมาก มีแนวโน้มที่จะใช้ V8 รุ่นอื่นจาก Node binary ที่ติดตั้งในของคุณ ระบบคุณจะต้องระบุตำแหน่งของส่วนหัวของอิเล็กตรอนด้วยตนเองเมื่อใด การสร้างโมดูลเนทิฟ

ดูเพิ่มเติม [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

ระบบการติดตั้ง Nullsoft Scriptable เป็นตัวติดตั้งสคริปต์ เครื่องมือการเขียนสำหรับ Microsoft Windows มันถูกปล่อยออกมาภายใต้การรวมกันของ ซอฟต์แวร์ลิขสิทธิ์ฟรีและเป็นทางเลือกที่ใช้กันอย่างแพร่หลายในเชิงพาณิชย์ ผลิตภัณฑ์ที่เป็นกรรมสิทธิ์เช่น InstallShield [electron-builder](https://github.com/electron-userland/electron-builder) รองรับ NSIS เป็นเป้าหมายการสร้าง

### OSR

OSR (การเรนเดอร์แบบหน้าจอ) สามารถใช้สำหรับการโหลดเพจขนาดใหญ่ใน พื้นหลังแล้วแสดงหลังจาก (มันจะเร็วขึ้นมาก) ช่วยให้คุณสามารถแสดงหน้าโดยไม่แสดงบนหน้าจอ

### process

กระบวนการเป็นตัวอย่างของโปรแกรมคอมพิวเตอร์ที่กำลังดำเนินการ Electron แอปที่ใช้ประโยชน์จาก [main](#main-process) และกระบวนการ [renderer](#renderer-process) อย่างน้อยหนึ่งกระบวนการคือ จริง ๆ แล้วรันหลายโปรแกรมพร้อมกัน

ใน Node.js และ Electron กระบวนการที่ทำงานอยู่แต่ละกระบวนการจะมีวัตถุ ` process ` นี้ object เป็นโกลบอลที่ให้ข้อมูลเกี่ยวกับและควบคุม กระบวนการปัจจุบัน ในฐานะที่เป็นทั่วโลกมักจะมีแอปพลิเคชันที่ไม่มี ใช้ require ()

ดูเพิ่มเติมที่: [process](#main-process), [renderer process](#renderer-process)

### renderer process

กระบวนการตัวแสดงผลเป็นหน้าต่างเบราว์เซอร์ในแอปของคุณ ไม่เหมือนกระบวนการหลัก อาจมีหลายรายการและแต่ละรายการจะทำงานในกระบวนการแยกต่างหาก พวกเขายังสามารถซ่อน

ในเบราว์เซอร์ปกติเว็บเพจมักจะทำงานในสภาพแวดล้อมแบบ sandbox และไม่ใช่ อนุญาตให้เข้าถึงทรัพยากรดั้งเดิม อย่างไรก็ตามผู้ใช้อิเล็กตรอนมีอำนาจในการ ใช้ Node.js API ในหน้าเว็บที่ช่วยให้ระบบปฏิบัติการระดับล่าง ปฏิสัมพันธ์

ดูเพิ่มเติมที่: [process](#process), [renderer process](#main-process)

### Squirrel

Squirrel เป็นเฟรมเวิร์กโอเพนซอร์สที่ช่วยให้แอพอิเล็กตรอนสามารถอัปเดตได้ โดยอัตโนมัติเมื่อมีการเปิดตัวเวอร์ชั่นใหม่ ดู [ autoUpdater ](api/auto-updater.md) API สำหรับ ข้อมูลเกี่ยวกับการเริ่มต้นกับ Squirrel

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.