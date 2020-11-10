# การตั้งค่าเซิร์ฟเวอร์ในตัวดีบักเกอร์

Debug symbols allow you to have better debugging sessions. They have information about the functions contained in executables and dynamic libraries and provide you with information to get clean call stacks. A Symbol Server allows the debugger to load the correct symbols, binaries and sources automatically without forcing users to download large debugging files. The server functions like [Microsoft's symbol server](https://support.microsoft.com/kb/311503) so the documentation there can be useful.

Note that because released Electron builds are heavily optimized, debugging is not always easy. The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations. The only workaround is to build an unoptimized local build.

The official symbol server URL for Electron is https://symbols.electronjs.org. คุณไม่สามารถเยี่ยมชม URL นี้โดยตรง เครื่องมือตรวจแก้จุดบกพร่อง ในตัวอย่างด้านล่างไดเร็กทอรีแคชโลคัลถูกใช้เพื่อหลีกเลี่ยง ซ้ํา ๆ เรียก PDB จากเซิร์ฟเวอร์ แทนที่`c:\code\สัญลักษณ์`ด้วย แคชไดเรกทอรีที่เหมาะสมในเครื่องของคุณ

## การใช้เซิร์ฟเวอร์สัญลักษณ์ใน Windbg

เส้นทางสัญลักษณ์ Windbg ถูกกําหนดค่าด้วยค่าสตริงที่คั่นด้วยเครื่องหมายดอกจัน อักขระ เมื่อต้องการใช้เฉพาะเซิร์ฟเวอร์สัญลักษณ์อิเล็กตรอน ให้เพิ่มรายการต่อไปนี้ลงใน เส้นทางสัญลักษณ์ของคุณ (**หมายเหตุ:**คุณสามารถแทนที่`สัญลักษณ์ c:\code`ด้วยการเขียนใดๆ ก็ได้ หากคุณต้องการตําแหน่งอื่นสําหรับดาวน์โหลด สัญลักษณ์):

```powershell
SRV*c:\code\symbols\*https://symbols.electronjs.org
```

ตั้งค่าสตริงนี้เป็น`_NT_SYMBOL_PATH`ในสภาพแวดล้อมโดยใช้เมนู Windbg, หรือ โดยการพิมพ์คําสั่ง`.sympath` หากคุณต้องการรับสัญลักษณ์จาก เซิร์ฟเวอร์สัญลักษณ์ของ Microsoft เช่นกันคุณควรแสดงรายการที่แรก:

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://symbols.electronjs.org
```

## การใช้เซิร์ฟเวอร์สัญลักษณ์ใน Visual Studio

![Tools -> Options](https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg) ![Symbols Settings](https://mdn.mozillademos.org/files/2497/2005_options.gif)

## การแก้ไขปัญหา: สัญลักษณ์จะไม่โหลด

พิมพ์คําสั่งต่อไปนี้ใน Windbg เพื่อพิมพ์ทําไมสัญลักษณ์จะไม่โหลด:

```powershell
> !sym มีเสียงดัง
> โหลด . / f อิเล็กตรอน.exe
```
