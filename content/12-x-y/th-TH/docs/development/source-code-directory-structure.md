# โครงสร้างของไดเรกทอรี่ของรหัสต้นฉบับ

รหัสแหล่งที่มาของอิเล็กตรอนจะถูกแยกออกเป็นบางส่วนส่วนใหญ่ ต่อไปนี้โครเมียมในอนุสัญญาแยก

คุณอาจจะต้องคุ้นเคยกับกระบวนการ[หลายโครเมียม สถาปัตยกรรม](https://dev.chromium.org/developers/design-documents/multi-process-architecture) เพื่อทําความเข้าใจซอร์สโค้ดได้ดีขึ้น

## โครงสร้างของรหัสแหล่งที่มา

```diff
อิเล็กตรอน
├── สร้าง / - สร้างไฟล์การกําหนดค่าที่จําเป็นในการสร้างด้วย GN
├── buildflags/ - กําหนดชุดของคุณลักษณะที่สามารถสร้างขึ้นตามเงื่อนไข
├── chromium_src/ - รหัสต้นฉบับที่คัดลอกมาจากโครเมียมที่ไม่ได้เป็นส่วนหนึ่งของเลเยอร์เนื้อหา
├── default_app / - app เริ่มต้นทํางานเมื่ออิเล็กตรอนเริ่มต้นโดยไม่ต้อง
|                  ให้แอปสําหรับผู้บริโภค
├──เอกสาร / - เอกสารของอิเล็กตรอน
|   ├── api/ - เอกสารสําหรับโมดูลและ API ภายนอกของอิเลคตรอน
|   ├── พัฒนา / - เอกสารเพื่อช่วยในการพัฒนาและกับอิเล็กตรอน
|   ├── fiddles / - ชุดของโค้ดโค้ดที่หนึ่งสามารถทํางานในอิเล็กตรอน Fiddle
|   ├── ภาพ / - ภาพที่ใช้ในเอกสาร
|   └── กวดวิชา / - เอกสารการสอนสําหรับแง่มุมต่างๆของอิเล็กตรอน
├── lib / - JavaScript / TypeScript รหัสแหล่งที่มา
|   ├──เบราว์เซอร์ / - รหัสเริ่มต้นกระบวนการหลัก
|   |   ├── api/ - API สําหรับโมดูลกระบวนการหลัก
|   |   └── ระยะไกล / - รหัสที่เกี่ยวข้องกับโมดูลระยะไกลตามที่เป็น
|   |                 ที่ใช้ในกระบวนการหลัก
|   ├── ทั่วไป / - ที่เกี่ยวข้องกับตรรกะที่จําเป็นโดยกระบวนการหลักและกระบวนการแสดงภาพ
|   |   └── api/ - API สําหรับโมดูลที่สามารถใช้ใน
|   |              กระบวนการทั้งหลักและกระบวนการแสดงภาพ
|   ├── isolated_renderer / - จัดการการสร้างกระบวนการแสดงภาพที่แยกเมื่อ
|   |                        บริบทเปิดใช้งาน
|   ├──renderer/ - รหัสเริ่มต้นกระบวนการ Renderer
|   |   ├── api/ - API สําหรับโมดูลกระบวนการแสดงผล
|   |   ├── ส่วนขยาย / - รหัสที่เกี่ยวข้องกับการใช้ส่วนขยายของ Chrome
|   |   |                ในกระบวนการแสดงอิเล็กตรอน
|   |   ├── remote/ - Logic that handles use of the remote module in
|   |   |             the main process.
|   |   └──เว็บวิว / - ตรรกะที่จัดการการใช้ webviews ใน
|   |                   กระบวนการแสดงภาพ
|   ├── sandboxed_renderer/ - ตรรกะที่จัดการการสร้างตัวแสดงผลแบบ Sandbox
|   |   |                     กระบวน
|   |   └── api/ - API สําหรับกระบวนการแสดงแบบ Sandbox
|   └── ผู้ปฏิบัติงาน/ - ตรรกะที่จัดการฟังก์ชันการทํางานของ Node.js ที่เหมาะสม
|                 ในสภาพแวดล้อมในผู้ปฏิบัติงานบนเว็บ
├──แพทช์ / - แพทช์ที่ใช้อยู่ด้านบนของการอ้างอิงหลักของอิเลคตรอน
|   |          เพื่อจัดการกับความแตกต่างระหว่างกรณีการใช้งานของเราและ
|   |          ฟังก์ชันเริ่มต้น
|   ├──น่าเบื่อ / - แพทช์นําไปใช้กับส้อมของ Google OpenSSL, BoringSSL
|   ├── โครเมียม / - แพทช์นําไปใช้กับโครเมียม
|   ├──โหนด / - แพทช์ที่ใช้อยู่ด้านบนของ Node.js
|   └── v8/ - แพทช์ที่ใช้อยู่ด้านบนของเครื่องยนต์ V8 ของ Google
├── เชลล์/ - รหัสต้นฉบับ C++
|   ├── app / - รหัสรายการระบบ
|   ├──เบราว์เซอร์ / -- ส่วนหน้ารวมทั้งหน้าต่างหลัก UI และทั้งหมดของ
|   |   |          กระบวนการหลัก นี้พูดถึง renderer ในการจัดการเว็บ
|   |   |          หน้า
|   |   ├── ui/ - Implementation of UI stuff for different platforms.
|   |   |   ├── cocoa/ - Cocoa specific source code.
|   |   |   ├── win/ - Windows GUI specific source code.
|   |   |   └── x/ - X11 specific source code.
|   |   ├── api/ - The implementation of the main process APIs.
|   |   ├── net/ - Network related code.
|   |   ├── mac/ - Mac specific Objective-C source code.
|   |   └── resources/ - Icons, platform-dependent files, etc.
|   ├── renderer/ - Code that runs in renderer process.
|   |   └── api/ - The implementation of renderer process APIs.
|   └── common/ - Code that used by both the main and renderer processes,
|       |         including some utility functions and code to integrate node's
|       |         message loop into Chromium's message loop.
|       └── api/ - The implementation of common APIs, and foundations of
|                  Electron's built-in modules.
├── spec/ - Components of Electron's test suite run in the renderer process.
├── spec-main/ - Components of Electron's test suite run in the main process.
└── BUILD.gn - Building rules of Electron.
```

## Structure of Other Directories

* **.circleci** - Config file for CI with CircleCI.
* **.github** - GitHub-specific config files including issues templates and CODEOWNERS.
* **dist** - Temporary directory created by `script/create-dist.py` script when creating a distribution.
* **external_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.
* **node_modules** - Third party node modules used for building.
* **npm** - Logic for installation of Electron via npm.
* **out** - Temporary output directory of `ninja`.
* **script** - Scripts used for development purpose like building, packaging, testing, etc.

```diff
script/ - The set of all scripts Electron runs for a variety of purposes.
├── codesign/ - Fakes codesigning for Electron apps; used for testing.
├── lib/ - Miscellaneous python utility scripts.
└── release/ - Scripts run during Electron's release process.
    ├── notes/ - Generates release notes for new Electron versions.
    └── uploaders/ - Uploads various release-related files during release.
```

* **tools** - Helper scripts used by GN files.
  * Scripts put here should never be invoked by users directly, unlike those in `script`.
* **typings** - TypeScript typings for Electron's internal code.
* **vendor** - Source code for some third party dependencies.
