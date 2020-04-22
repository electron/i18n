# เกี่ยวกับ Electron

[Electron](https://electronjs.org) เป็นโอเพนซอร์ซไลบรารีที่พัฒนาโดย GitHub เอาไว้ใช้สำหรับการพัฒนาเดสก์ท็อป ครอสแพลตฟอร์มแอปพลิเคชัน ด้วยภาษา HTML, CSS, และ JavaScript การทำงานของ Electron เกิดขึ้นจากการผสมผสานระหว่าง [Chromium](https://www.chromium.org/Home) และ [Node.js](https://nodejs.org) เข้าด้วยกัน และตัวแอปสามารถนำไปใช้ได้กับทั้งระบบปฏิบัติการ Mac, Windows, และ Linux

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

อ่านต่อเพื่อเรียนรู้เพิ่มเติมเกี่ยวกับผู้มีส่วนร่วมและปล่อยอิเล็กตรอนหรือเริ่มต้นสร้างด้วยอิเล็กตรอนใน

 คู่มือการเริ่มต้นอย่างรวดเร็ว <0></p> 



## ทีมหลักและผู้สนับสนุน

อิเล็กตรอนได้รับการดูแลโดยทีมงานที่ GitHub รวมถึงกลุ่มของผู้มีส่วนร่วม [ ผู้มีส่วนร่วม ](https://github.com/electron/electron/graphs/contributors) จากชุมชน ผู้ให้ข้อมูลบางคนเป็นบุคคลและทำงานใน บริษัท ขนาดใหญ่ที่กำลังพัฒนาเกี่ยวกับอิเล็กตรอน เรายินดีที่จะเพิ่มผู้มีส่วนร่วมให้กับโครงการในฐานะผู้ดูแล อ่านเพิ่มเติมเกี่ยวกับ [ การมีส่วนร่วมกับอิเล็กตรอน ](https://github.com/electron/electron/blob/master/CONTRIBUTING.md)



## การเผยแพร่

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.



### การอัพเดท

โดยปกติแล้ว Chromium รุ่นของอิเล็กตรอนจะอัปเดตภายในหนึ่งหรือสองสัปดาห์หลังจากรุ่น Chromium ที่เสถียรใหม่ออกวางจำหน่ายทั้งนี้ขึ้นอยู่กับความพยายามที่เกี่ยวข้องในการอัปเกรด

เมื่อมีการปล่อย Node.js เวอร์ชั่นใหม่อิเล็กตรอนมักจะรอประมาณหนึ่งเดือนก่อนที่จะอัปเกรดเพื่อให้มีเวอร์ชั่นที่เสถียรยิ่งขึ้น

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.




### เวอร์ชั่น

ในฐานะที่เป็นรุ่น 2.0 อิเล็กตรอน [ ตามด้วย `semver` ](https://semver.org) สำหรับแอปพลิเคชันส่วนใหญ่และการใช้ npm เวอร์ชันล่าสุดใด ๆ การใช้ `$ npm install electron` จะทำสิ่งที่ถูกต้อง

กระบวนการอัปเดตเวอร์ชันนี้มีรายละเอียดอย่างชัดเจนใน [Versioning Doc](electron-versioning.md).



### LTS

การสนับสนุนระยะยาวของอิเล็กตรอนรุ่นเก่าไม่มีอยู่ในปัจจุบัน หากอิเล็กตรอนรุ่นปัจจุบันของคุณทำงานให้คุณคุณสามารถอยู่กับมันได้นานเท่าที่คุณต้องการ หากคุณต้องการใช้ประโยชน์จากฟีเจอร์ใหม่ ๆ เมื่อเข้ามาคุณควรอัพเกรดเป็นเวอร์ชั่นใหม่

อัปเดตที่สำคัญมาพร้อมกับเวอร์ชัน ` v1.0.0 ` หากคุณยังไม่ได้ใช้เวอร์ชันนี้คุณควร [ อ่านเพิ่มเติมเกี่ยวกับ ` v1.0.0 ` การเปลี่ยนแปลง ](https://electronjs.org/blog/electron-1-0)



## Core Philosophy

เพื่อให้อิเล็กตรอนมีขนาดเล็ก (ขนาดไฟล์) และยั่งยืน (การแพร่กระจายของการพึ่งพาและ API) โครงการ จำกัด ขอบเขตของโครงการหลัก

ตัวอย่างเช่น Electron ใช้ไลบรารีการแสดงผลของ Chromium มากกว่า Chromium ทั้งหมด สิ่งนี้ทำให้การอัปเกรด Chromium ง่ายขึ้น แต่ยังหมายถึงคุณลักษณะบางอย่างของเบราว์เซอร์ที่พบใน Google Chrome ไม่มีอยู่ในอิเล็กตรอน

คุณสมบัติใหม่ที่เพิ่มเข้ากับอิเล็กตรอนควรเป็น API ดั้งเดิม หากคุณสมบัติสามารถเป็นโมดูล Node.js ของตัวเองก็น่าจะเป็น ดู [ เครื่องมืออิเล็กตรอนที่สร้างโดยชุมชน ](https://electronjs.org/community)



## ประวัติ

ด้านล่างเป็นเหตุการณ์สำคัญในประวัติศาสตร์ของอิเล็กตรอน

| :calendar:       | :tada:                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| **เมษายน 2013**  | [ Atom Shell เริ่มต้นขึ้น ](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45) |
| **พฤษภาคม 2014** | [ Atom Shell เปิดแหล่งที่มา ](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html)                       |
| **เมษายน 2015**  | [ Atom Shell ได้รับการตั้งชื่อใหม่ว่าอิเล็กตรอน ](https://github.com/electron/electron/pull/1389)                 |
| **พฤษภาคม 2016** | [ Electron ปล่อย `v1.0.0` ](https://electronjs.org/blog/electron-1-0)                                             |
| **พฤษภาคม 2016** | [ แอปอิเล็กตรอนที่เข้ากันได้กับ Mac App Store ](mac-app-store-submission-guide.md)                                |
| **สิงหาคม 2016** | [ การสนับสนุน Windows Store สำหรับแอป Electron ](windows-store-guide.md)                                          |
