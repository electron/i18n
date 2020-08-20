# คำแนะนำการสร้าง (Windows)

Follow the guidelines below for building Electron on Windows.

## Требования

* Windows 10 / Server 2012 R2 หรือสูงกว่า
* Visual Studio 2017 15.7.2 or higher - [download VS 2019 Community Edition for free](https://www.visualstudio.com/vs/)
  * ดู[เอกสารการสร้างโครเมียม](https://chromium.googlesource.com/chromium/src/+/master/docs/windows_build_instructions.md#visual-studio)สําหรับรายละเอียดเพิ่มเติมเกี่ยวกับ Visual Studio ส่วนประกอบที่จําเป็น
  * ถ้า Visual Studio ของคุณติดตั้งอยู่ในไดเรกทอรีอื่นที่ไม่ใช่ค่าเริ่มต้น คุณจะต้อง ตั้งค่าตัวแปรสภาพแวดล้อมไม่กี่จุด toolchains ไปยังเส้นทางการติดตั้งของคุณ
    * `vs2019_install = DRIVE:\path\to\Microsoft Visual Studio\2019\Community` (replace `2019` and `Community` with your installed versions)
    * `WINDOWSSDKDIR = DRIVE:\path\to\Windows Kits\10`
* [งูหลาม 2.7.10 หรือสูงกว่า](http://www.python.org/download/releases/2.7/)
  * ขัดกับคําแนะนําการติดตั้ง`depot_tools`เชื่อมโยงด้านล่างคุณจะต้อง ที่จะใช้ Python ที่ติดตั้งในประเทศของคุณกับรุ่นอย่างน้อย 2.7.10 (มี สําหรับ TLS 1.2) เมื่อต้องการทําเช่นนั้น ให้ตรวจสอบว่าใน**PATH**ภายในเครื่องของคุณ งูใหญ่ติดตั้งมาก่อนโฟลเดอร์`depot_tools` เดี๋ยวนี้ `depot_tools`ยังคงมาพร้อมกับหลาม 2.7.6 ซึ่งจะทําให้`gclient` คําสั่งล้มเหลว (ดู https://crbug.com/868864)
  * [งูหลามสําหรับ Windows (pywin32) ส่วนขยาย](https://pypi.org/project/pywin32/#files) นอกจากนี้ยังมีความจําเป็นเพื่อเรียกใช้กระบวนการสร้าง
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
  * SDK รุ่นต่างๆสามารถติดตั้งได้แบบเคียงข้างกัน การติดตั้ง SDK เปิดโปรแกรมติดตั้ง Visual Studio เลือก `เปลี่ยน`→`องค์ประกอบส่วนบุคคล`เลื่อนลงและเลือกที่เหมาะสม Windows SDK เพื่อติดตั้ง อีกทางเลือกหนึ่งคือการมองที่ [เก็บถาวรของ Windows SDK และจําลอง](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) และดาวน์โหลด SDK รุ่นสแตนด์อโลนตามลําดับ
  * เครื่องมือการดีบัก SDK ต้องถูกติดตั้ง ถ้ามีการติดตั้ง Windows 10 SDK ผ่านการติดตั้ง Visual Studio แล้วพวกเขาสามารถติดตั้งได้โดยไปที่: `แผงควบคุม`→`โปรแกรม`→`โปรแกรมและคุณสมบัติ`→ เลือก "Windows ชุดพัฒนาซอฟต์แวร์" → `เปลี่ยน`→`เปลี่ยน`→ตรวจสอบ "เครื่องมือแก้จุดบกพร่องสําหรับ Windows" →`เปลี่ยน` หรือ คุณสามารถดาวน์โหลดตัวติดตั้ง SDK แบบสแตนด์อโลน และใช้เพื่อติดตั้งเครื่องมือการดีบัก

หากคุณยังไม่มีการติดตั้ง Windows [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) มีรุ่น timebombed ของ Windows ที่คุณสามารถใช้เพื่อสร้างอิเล็กตรอน

อาคารอิเล็กตรอนจะทําทั้งหมดด้วยสคริปต์บรรทัดคําสั่งและไม่สามารถทํา ด้วยสตูดิโอภาพ คุณสามารถพัฒนาอิเล็กตรอนกับบรรณาธิการใด ๆ แต่การสนับสนุนสําหรับ อาคารที่มี Visual Studio จะมาในอนาคต

**หมายเหตุ: </</c0> แม้ว่า Visual Studio จะไม่ใช้สําหรับอาคาร ก็ยังคง** **ต้อง**เพราะเราต้องการเครื่องมือสร้างมันให้

## สิ่งก่อสร้าง

ดู [ คำแนะนำในการสร้าง: GN ](build-instructions-gn.md)

## สร้าง 32 บิต

ในการสร้างสําหรับเป้าหมาย 32bit คุณต้องผ่าน`target_cpu = "x86"`เป็น GN Arg. คุณสามารถสร้างเป้าหมาย 32bit ควบคู่ไปกับเป้าหมาย 64bit โดยใช้ ไดเรกทอรีผลลัพธ์ที่แตกต่างกันสําหรับ GN เช่นออก`/ ปล่อย x86`กับที่แตกต่างกัน อาร์กิวเมนต์

```powershell
$ gn gen ออก / ปล่อย x86 -- args = "นําเข้า (\"/อิเล็กตรอน / build / args / release.gn \") target_cpu =\"x86\""
```

ขั้นตอนการสร้างอื่น ๆ จะเหมือนกัน

## Visual Studio Code

เมื่อต้องการสร้างโครงการ Visual Studio คุณสามารถส่งผ่านพารามิเตอร์`--ide=vs2017` เพื่อ`gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## วิธีแก้ปัญหาเบื้องต้น

### ไม่พบคําสั่ง xxxx

หากคุณพบข้อผิดพลาดเช่น`คําสั่ง xxxx ไม่พบ`คุณอาจลองใช้ คอนโซล`พร้อมรับคําสั่ง VS2015`เพื่อเรียกใช้สคริปต์การสร้าง

### ข้อผิดพลาดของคอมไพเลอร์ภายในที่ร้ายแรง: C1001

ตรวจสอบให้แน่ใจว่า คุณมีการปรับปรุง Visual Studio ล่าสุดที่ติดตั้ง

### LNK1181: ไม่สามารถเปิดแฟ้มอินพุท 'kernel32.lib'

ลองติดตั้ง 32bit Node.js

### ข้อผิดพลาด: enoent, สถิติ ' C:\ชื่อผู้ใช้\AppData\Rโอเอมิ\nน.

สร้างไดเรกทอรีที่[ควรแก้ไขปัญหา](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~ \ AppData\Rโอเอมิ\nน.
```

### โหนด ไม่ถูกรู้จักเป็นคําสั่งภายในหรือภายนอก

คุณอาจได้รับข้อผิดพลาดนี้ถ้าคุณกําลังใช้ Git Bash สําหรับอาคาร, คุณควรใช้ พร้อมท์คําสั่ง PowerShell หรือ VS2015 แทน

### ไม่สามารถสร้างไดเรกทอรีที่ '...': ชื่อแฟ้มยาวเกินไป

มี[บางชื่อ path ยาวมาก](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish)และโดยค่าเริ่มต้น git บน Windows ไม่จัดการชื่อ pathnames ยาวอย่างถูกต้อง (แม้ว่าหน้าต่างสนับสนุนพวกเขา) นี้ควรจะแก้ไขได้:

```sh
$ การตั้งค่า - core.longpaths ระบบจริง
```

### ข้อผิดพลาด: การใช้ตัวระบุที่ไม่ได้ประกาศ 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### นําเข้าเครื่อง: ไม่มีโมดูลที่ชื่อ win32file

ให้แน่ใจว่าคุณได้ติดตั้ง`pywin32`กับ`การติดตั้ง pip pywin32`

### สร้างสคริปต์แขวนจนกด

ข้อผิดพลาดนี้เป็น "คุณลักษณะ" ของพร้อมท์คําสั่งของ Windows มันเกิดขึ้นเมื่อคลิกภายในหน้าต่างพร้อมต์กับ `เปิดใช้งาน QuickEdit`และมีวัตถุประสงค์เพื่อให้สามารถเลือกและคัดลอกข้อความออกได้อย่างง่ายดาย เนื่องจากแต่ละคลิกตั้งใจจะหยุดกระบวนการสร้าง, คุณอาจต้องการปิดการใช้งานนี้ ในคุณสมบัติพร้อมรับคําสั่ง
