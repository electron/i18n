# สร้างภาพรวมของระบบ

Electron uses [gyp](https://gn.googlesource.com/gn) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gyp` and `.gypi` files.

## Gyp Files

Following `gyp` files contain the main rules for building Electron:

* `Brightray/Brightray.gyp` defines how `Brightray` is built and includes the default configurations for linking with Chromium.
* `สร้าง / args /{debug,release,all}.gn`มีอาร์กิวเมนต์การสร้างเริ่มต้นสําหรับ อาคารอิเล็กตรอน

## Component Build

Since Chromium is quite a large project, the final linking stage can take quite a few minutes, which makes it hard for development. In order to solve this, Chromium introduced the "component build", which builds each component as a separate shared library, making linking very quick but sacrificing file size and performance.

อิเล็กตรอนสืบทอดตัวเลือกการสร้างนี้จากโครเมียม In Electron we took a very similar approach: for `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Tests

**NB** _this section is out of date and contains information that is no longer relevant to the GN-built electron._

ทดสอบการเปลี่ยนแปลงของคุณเป็นไปตามรูปแบบการเขียนโค้ดโครงการโดยใช้:

```sh
$ npm ใช้ผ้าสําลี
```

ทดสอบการทํางานโดยใช้:

```sh
$ npm ทดสอบ
```

เมื่อใดก็ตามที่คุณทําการเปลี่ยนแปลงรหัสแหล่งที่มาอิเลคตรอน, คุณจะต้องเรียกใช้อีกครั้ง สร้างก่อนการทดสอบ:

```sh
$ npm เรียกใช้สร้าง && การทดสอบ npm
```

คุณสามารถทําให้ชุดทดสอบทํางานได้เร็วขึ้นโดยการแยกการทดสอบหรือบล็อกที่เฉพาะเจาะจง คุณกําลังทํางานกับมอคค่าของ [คุณสมบัติการทดสอบพิเศษ](https://mochajs.org/#exclusive-tests) ผนวก `.only`เพื่อ`อธิบาย`ใด ๆ หรือ`ฟังก์ชั่น`เรียก:

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

หรือคุณสามารถใช้ตัวเลือก`grep`ของมอคค่าเพื่อรันการทดสอบที่ตรงกับ รูปแบบการแสดงออกปกติที่ได้รับ:

```sh
$ npm ทดสอบ -- --child_process
```

การทดสอบที่มีโมดูลดั้งเดิม (เช่น`runas)`ไม่สามารถดําเนินการกับ ดีบักบิลด์ (ดู[#2558](https://github.com/electron/electron/issues/2558) รายละเอียด) แต่พวกเขาจะทํางานร่วมกับรุ่นสร้าง

เมื่อต้องการรันการทดสอบด้วยการใช้รุ่นบิลด์:

```sh
$ npm ทดสอบ -- -R
```
