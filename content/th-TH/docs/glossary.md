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

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### native modules

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### process

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

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