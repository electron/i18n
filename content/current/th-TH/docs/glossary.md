# อภิธานศัพท์

หน้านี้กำหนดคำศัพท์ที่ใช้ทั่วไปในการพัฒนาของ Electron

### ASAR

ASAR หมายถึงรูปแบบ Atom Shell Archive การเก็บถาวร [ asar ](https://github.com/electron/asar) นั้นง่าย ` tar ` รูปแบบเหมือนที่เชื่อมไฟล์เข้าด้วยกันเป็นไฟล์เดียว Electron สามารถอ่านได้ ไฟล์โดยพลการจากมันโดยไม่ต้องแกะไฟล์ทั้งหมด

The ASAR format was created primarily to improve performance on Windows... TODO

### CRT

C Run-time Library (CRT) เป็นส่วนหนึ่งของไลบรารี่มาตรฐาน C++ ที่รวมอยู่ใน ISO C99 standard library. Visual C ++ ไลบรารี่นั้น ใช้การพัฒนารหัสสนับสนุนเนทีฟ CRT และทั้งแบบผสมดั้งเดิมและ รหัสที่ได้รับการจัดการและรหัสที่ได้รับการจัดการบริสุทธิ์สำหรับการพัฒนา. NET

### DMG

Apple Disk Image เป็นรูปแบบบรรจุภัณฑ์ที่ใช้โดย macOS ไฟล์ DMG นั้น ที่ใช้กันทั่วไปสำหรับการกระจายแอพพลิเคชั่น "ตัวติดตั้ง" [electron-builder](https://github.com/electron-userland/electron-builder) รองรับ `dmg` เป็นเป้าหมายบิลด์

### IME

ตัวแก้ไขวิธีการป้อนข้อมูล โปรแกรมที่ให้ผู้ใช้ป้อนตัวอักษรและ ไม่พบสัญลักษณ์บนแป้นพิมพ์ ตัวอย่างเช่นสิ่งนี้ช่วยให้ผู้ใช้ภาษาละติน แป้นพิมพ์เพื่อป้อนอักขระภาษาจีนญี่ปุ่นเกาหลีและตัวบ่งชี้

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

ห้องสมุดสาธารณะที่มี [Chromium Content module](https://www.chromium.org/developers/content-module) และทั้งหมด การอ้างอิง (e.g., Blink, [V8](#v8), etc.). เรียกอีกอย่างว่า "libcc"

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

กระบวนการหลักโดยทั่วไปคือไฟล์ที่ชื่อ ` main.js ` เป็นจุดเริ่มต้นสำหรับทุก ๆ แอปอิเล็กตรอน มันควบคุมชีวิตของแอพตั้งแต่เปิดจนถึงปิด มันยัง จัดการองค์ประกอบพื้นฐานเช่นเมนูแถบเมนู Dock ถาด ฯลฯ กระบวนการหลักรับผิดชอบในการสร้างกระบวนการเรนเดอร์ใหม่ในแต่ละแอพ Node API แบบเต็มถูกสร้างขึ้น

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

ดูเพิ่มเติมที่: [process](#process), [renderer process](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

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

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### process

กระบวนการเป็นตัวอย่างของโปรแกรมคอมพิวเตอร์ที่กำลังดำเนินการ Electron แอปที่ใช้ประโยชน์จาก [main](#main-process) และกระบวนการ [renderer](#renderer-process) อย่างน้อยหนึ่งกระบวนการคือ จริง ๆ แล้วรันหลายโปรแกรมพร้อมกัน

ใน Node.js และ Electron กระบวนการที่ทำงานอยู่แต่ละกระบวนการจะมีวัตถุ ` process ` นี้ object เป็นโกลบอลที่ให้ข้อมูลเกี่ยวกับและควบคุม กระบวนการปัจจุบัน ในฐานะที่เป็นทั่วโลกมักจะมีแอปพลิเคชันที่ไม่มี ใช้ require ()

ดูเพิ่มเติมที่: [process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

ในเบราว์เซอร์ปกติเว็บเพจมักจะทำงานในสภาพแวดล้อมแบบ sandbox และไม่ใช่ อนุญาตให้เข้าถึงทรัพยากรดั้งเดิม อย่างไรก็ตามผู้ใช้อิเล็กตรอนมีอำนาจในการ ใช้ Node.js API ในหน้าเว็บที่ช่วยให้ระบบปฏิบัติการระดับล่าง ปฏิสัมพันธ์

ดูเพิ่มเติมที่: [process](#process), [renderer process](#main-process)

### Squirrel

Squirrel เป็นเฟรมเวิร์กโอเพนซอร์สที่ช่วยให้แอพอิเล็กตรอนสามารถอัปเดตได้ โดยอัตโนมัติเมื่อมีการเปิดตัวเวอร์ชั่นใหม่ ดู [ autoUpdater ](api/auto-updater.md) API สำหรับ ข้อมูลเกี่ยวกับการเริ่มต้นกับ Squirrel

### userland

คำนี้เกิดขึ้นในชุมชน Unix โดยที่ "userland" หรือ "userspace" อ้างถึงโปรแกรมที่ทำงานนอกเคอร์เนลระบบปฏิบัติการ มากกว่า เมื่อเร็ว ๆ นี้คำดังกล่าวได้รับความนิยมในโหนดและชุมชนต่อนาทีถึง แยกความแตกต่างระหว่างฟีเจอร์ที่มีใน "Node core" และแพ็คเกจ เผยแพร่ไปยังรีจิสทรี npm โดยชุมชน "ผู้ใช้" ที่ใหญ่กว่ามาก

เช่นเดียวกับโหนดอิเล็กตรอนมุ่งเน้นไปที่การมี API ขนาดเล็กที่ให้บริการ สิ่งจำเป็นเบื้องต้นสำหรับการพัฒนาแอพพลิเคชั่นเดสก์ท็อปหลายแพลตฟอร์ม ปรัชญาการออกแบบนี้ช่วยให้อิเล็กตรอนยังคงเป็นเครื่องมือที่มีความยืดหยุ่นโดยไม่ต้องถูก กำหนดมากเกินไปเกี่ยวกับวิธีการใช้งาน Userland ช่วยให้ผู้ใช้สามารถ สร้างและแบ่งปันเครื่องมือที่ให้ฟังก์ชันการทำงานเพิ่มเติมนอกเหนือจากที่เป็นอยู่ มีอยู่ใน "แกน"

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 เป็นส่วนหนึ่งของ Chromium แล้วชี้ไปที่โหนด V8 เมื่อใด สร้างมัน

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` ใช้เพื่อฝังเนื้อหา "แขก" (เช่นหน้าเว็บภายนอก) ใน แอปอิเล็กตรอนของคุณ มีความคล้ายคลึงกับ `iframe`แต่แตกต่างกันในแต่ละอัน webview ทำงานในกระบวนการแยกต่างหาก มันไม่เหมือนกัน สิทธิ์เป็นหน้าเว็บของคุณและการโต้ตอบทั้งหมดระหว่างแอปของคุณและ เนื้อหาที่ฝังตัวจะไม่ตรงกัน ทำให้แอปของคุณปลอดภัยจาก เนื้อหาที่ฝัง
