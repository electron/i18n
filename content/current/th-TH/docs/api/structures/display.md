# Display Object เชื่อมต่อ Display

* `id` Number - ตัวระบุที่ไม่ซ้ำที่เชื่อมโยงกับจอแสดงผล
* `rotation` Number - สามารถเป็น 0, 90, 180, 270, หมายถึงการหมุนหน้าจอ องศานาฬิกาที่ชาญฉลาด
* `scaleFactor` Number - ปัจจัยการปรับขนาดพิกเซลของอุปกรณ์ส่งออก
* `touchSupport` String - สามารถ  `available`, `unavailable`, `unknown` ใช้ได้,ไม่มี,ไม่ทราบ
* `monochrome` Boolean - Whether or not the display is a monochrome display.
* `accelerometerSupport` String - Can be `available`, `unavailable`, `unknown`.
* `colorSpace` String -  represent a color space (three-dimensional object which contains all realizable color combinations) for the purpose of color conversions
* `colorDepth` Number - The number of bits per pixel.
* `depthPerComponent` Number - The number of bits per color component.
* `bounds` [Rectangle](rectangle.md) สี่เหลี่ยมผืนผ้า
* `size` [Size](size.md) ขนาด
* `workArea` [Rectangle](rectangle.md) สี่เหลี่ยมผืนผ้า
* `workAreaSize` [Size](size.md) ขนาด
* `internal` Boolean - `true` for an internal display and `false` for an external display

The `Display` แสดงถึงการแสดงผลทางกายภาพที่เชื่อมต่อกับระบบ ปลอม `Display` อาจมีอยู่ในระบบที่ไม่มีส่วนหัวหรือ `Display` อาจสอดคล้องกับ จอแสดงผลระยะไกลเสมือนจริง
