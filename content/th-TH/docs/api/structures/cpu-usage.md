# CPUUsage Object เชื่อมต่อ การใช้งาน CPU

* `percentCPUUsage` Number - เปอร์เซ็นต์ของ CPU ที่ใช้ตั้งแต่การเรียกไปยัง getCPUUsage ครั้งล่าสุด การโทรครั้งแรกส่งคืน 0
* `idleWakeupsPerSecond` Number - จำนวนการปลุก cpu ที่ไม่ทำงานเฉลี่ยต่อวินาที ตั้งแต่การเรียกครั้งสุดท้ายเพื่อรับ CPUUsage การโทรครั้งแรกส่งคืน 0 จะส่งคืน 0 เสมอ ของ windows