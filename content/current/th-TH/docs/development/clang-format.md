# การใช้รูปแบบ clang ในโค้ด C++

[`รูปแบบ clang`](http://clang.llvm.org/docs/ClangFormat.html)เป็นเครื่องมือในการ โดยอัตโนมัติจัดรูปแบบ C / C ++ / รหัสวัตถุประสงค์ C เพื่อให้นักพัฒนาไม่จําเป็นต้อง กังวลเกี่ยวกับปัญหาสไตล์ในระหว่างการแสดงความคิดเห็นรหัส

ขอแนะนําให้ใช้รหัส C++ ที่เปลี่ยนแปลงก่อนเปิดการดึง ซึ่งจะช่วยให้คุณและเวลาของผู้ตรวจทาน

คุณสามารถติดตั้ง`รูปแบบ clang`และ`git clang รูปแบบ`ผ่าน `npmติดตั้ง- กรัม clang- รูปแบบ`ของ

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

เวิร์กโฟลว์เพื่อจัดรูปแบบโค้ดที่เปลี่ยนแปลงของคุณ:

1. ทําการเปลี่ยนแปลงรหัสในที่เก็บอิเล็กตรอน
2. เรียกใช้`git เพิ่ม your_changed_file.cc`
3. เรียกใช้`git -clang รูปแบบ`และคุณอาจจะเห็นการปรับเปลี่ยนใน `your_changed_file.cc`การแก้ไขเหล่านี้ถูกสร้างขึ้นจาก`รูปแบบ clang`
4. เรียกใช้`git เพิ่ม your_changed_file.cc`และยอมรับการเปลี่ยนแปลงของคุณ
5. ตอนนี้สาขาพร้อมที่จะเปิดเป็นคําขอดึง

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

## บูรณาการบรรณาธิการ

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

  * [อะตอม (Automatic Translation)](https://atom.io/packages/clang-format)
  * [วิม & เอเมคส์](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
  * [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)
