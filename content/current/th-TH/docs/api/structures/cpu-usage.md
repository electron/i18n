# CPUUsage Object เชื่อมต่อ การใช้งาน CPU

* `percentCPUUsage` ตัวเลข - เปอร์เซ็นต์ของ CPU ที่ใช้ตั้งแต่การเรียกไปยัง getCPUUsage ครั้งล่าสุด การโทรครั้งแรกส่งคืน 0
* `idleWakeupsPerSecond` Number - The number of average idle CPU wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.