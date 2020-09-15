# แก้จุดบกพร่อง บน Windows

หากคุณพบปัญหาหรือปัญหาในอิเล็กตรอนที่คุณเชื่อว่าไม่ได้เกิดขึ้น โดยโปรแกรม JavaScript ของคุณ แต่โดยอิเล็กตรอนตัวเอง, การแก้จุดบกพร่องสามารถ จะยุ่งยากเล็กน้อย, โดยเฉพาะอย่างยิ่งสําหรับนักพัฒนาไม่ได้ใช้พื้นเมือง / C ++ ตรวจ แก้ จุด บกพร่อง However, using Visual Studio, Electron's hosted Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

**ดูเพิ่มเติม**: มีความมั่งคั่งของข้อมูลเกี่ยวกับการแก้จุดบกพร่องโครเมียม, มากซึ่งยังใช้กับอิเล็กตรอน, บนเว็บไซต์ของนักพัฒนาโครเมี่ยม:[การแก้จุดบกพร่องโครเมี่ยมใน Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## ข้อกําหนด

* **สร้างการแก้ปัญหาของอิเล็กตรอน**: วิธีที่ง่ายที่สุดคือมักจะสร้างมัน โดยใช้เครื่องมือและข้อกําหนดเบื้องต้นที่ระบุไว้ใน [คําแนะนําในการสร้างสําหรับ Windows](build-instructions-windows.md) ในขณะที่คุณสามารถ แนบและแก้ปัญหาอิเล็กตรอนที่คุณสามารถดาวน์โหลดได้โดยตรงคุณจะ พบว่ามันเป็นอย่างมากเพิ่มประสิทธิภาพการแก้จุดบกพร่องมากขึ้น ยาก: ดีบักเกอร์จะไม่สามารถแสดงเนื้อหาของทุก ตัวแปรและเส้นทางการดําเนินการอาจดูแปลกเพราะ inlining, หางโทรและเพิ่มประสิทธิภาพคอมไพเลอร์อื่น ๆ

* **Visual Studio ด้วย C ++ เครื่องมือ**: ชุมชนรุ่นฟรีของ Visual สตูดิโอ 2013 และ 2015 Studio แสดงผลทั้งสองงาน Once installed, [configure Visual Studio to use Electron's Symbol server](setting-up-symbol-server.md). มันจะเปิดใช้งาน Visual Studio ที่จะได้รับความเข้าใจที่ดีขึ้นของสิ่งที่เกิดขึ้น ภายในอิเล็กตรอนทําให้ง่ายต่อการนําเสนอตัวแปรในมนุษย์อ่าน รูป แบบ

* **ProcMon**:[เครื่องมือ SysInternals ฟรี][sys-internals]ช่วยให้คุณสามารถตรวจสอบ พารามิเตอร์กระบวนการ การจัดการไฟล์ และการดําเนินการรีจิสทรี

## การแนบและการแก้จุดบกพร่องอิเล็กตรอน

เมื่อต้องการเริ่มเซสชันการตรวจแก้จุดบกพร่อง ให้เปิด PowerShell/CMD และดําเนินการตรวจแก้จุดบกพร่องของคุณ สร้างอิเล็กตรอนโดยใช้โปรแกรมเพื่อเปิดเป็นพารามิเตอร์

```powershell
$ ./ออก / ทดสอบ / อิเล็กตรอน exe ~/my-อิเล็กตรอน app/
```

### การตั้งค่าจุดสั่งหยุด

เปิด Visual Studio แล้ว อิเล็กตรอนไม่ได้สร้างขึ้นด้วย Visual Studio และด้วยเหตุนี้ ไม่มีแฟ้มโครงการ -- แต่คุณสามารถเปิดไฟล์รหัสที่มา "เป็นแฟ้ม" หมายความว่า Visual Studio จะเปิดขึ้นด้วยตัวเอง คุณสามารถ ยังคงตั้งจุดหยุด -- Visual Studio จะคิดออกโดยอัตโนมัติว่า รหัสต้นฉบับตรงกับรหัสที่ทํางานในกระบวนการที่แนบมาและแบ่ง ตาม

ไฟล์รหัสที่เกี่ยวข้องสามารถพบได้ใน`./เชลล์/`

### ไฟล์แนบ

คุณสามารถแนบดีบักเกอร์ Visual Studio กับกระบวนการที่กําลังทํางานอยู่บนโลคัล หรือ คอมพิวเตอร์ระยะไกล หลังจากกระบวนการทํางานแล้ว ให้คลิก Debug / แนบกับกระบวนการ (หรือกด`CTRL+ ALT + P`) เพื่อเปิดกล่องโต้ตอบ "แนบกับกระบวนการ" คุณสามารถใช้ ความสามารถนี้เพื่อดีบักแอปที่กําลังทํางานบนคอมพิวเตอร์เฉพาะที่หรือระยะไกล ดีบักหลายกระบวนการพร้อมกัน

หากอิเล็กตรอนทํางานภายใต้บัญชีผู้ใช้อื่น ให้เลือก `แสดงกระบวนการจากผู้ใช้ทั้งหมด` สังเกตว่าขึ้นอยู่กับจํานวน เบราว์เซอร์Windows app ของคุณเปิดคุณจะเห็นหลายกระบวนการ โดยทั่วไป โปรแกรมประยุกต์แบบหนึ่งหน้าต่างจะส่งผลให้ Visual Studio นําเสนอคุณสอง รายการ`อิเล็กตรอน.exe` - หนึ่งสําหรับกระบวนการหลักและหนึ่งสําหรับการแสดงผล ประมวล ผล เนื่องจากรายชื่อจะให้ชื่อคุณเท่านั้น, ขณะนี้ไม่มีความน่าเชื่อถือ วิธีการหาที่ซึ่ง

### กระบวนการใดที่ฉันควรแนบไป?

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## Using ProcMon to Observe a Process

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial][procmon-instructions] provided by Microsoft.

[sys-internals]: https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx
[procmon-instructions]: https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor
