# คำแนะนำการสร้าง (macOS)

ทำตามคำแนะนำด้านล่างเพื่อสร้างอิเล็กตรอนบน macOS

## ข้อกำหนดเบื้องต้น

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (external)
* Python 2.7 with support for TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npm run check-tls
```

หากสคริปต์ส่งคืนว่าการกำหนดค่าของคุณกำลังใช้การรักษาความปลอดภัยที่ล้าสมัย โปรโตคอลคุณสามารถอัปเดต macOS เป็น High Sierra หรือติดตั้งเวอร์ชันใหม่ ของ Python 2.7.x ในการอัพเกรด Python ให้ใช้ [ Homebrew ](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

หากคุณใช้ Python ตามที่ Homebrew จัดหาให้คุณต้องติดตั้งด้วย โมดูล Python ต่อไปนี้:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

คุณสามารถใช้ ` pip ` เพื่อติดตั้ง:

```sh
$ pip install pyobjc
```

## macOS SDK

หากคุณกำลังพัฒนาอิเล็กตรอนและไม่วางแผนที่จะแจกจ่ายต่อ การสร้างอิเล็กตรอนแบบกำหนดเองคุณสามารถข้ามส่วนนี้ได้

งานสร้างอิเล็กตรอนอย่างเป็นทางการนั้นสร้างด้วย [ Xcode 9.4.1 ](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip) และ MacOS 10.13 SDK  การสร้างด้วย SDK ที่ใหม่กว่าก็ใช้งานได้เช่นกัน แต่รุ่นปัจจุบันใช้ 10.13 SDK

## สร้าง Electron

ดู [ คำแนะนำในการสร้าง: GN ](build-instructions-gn.md)
