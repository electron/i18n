# CustomScheme Object เชื่อมต่อ กำหนดสกีมา

* `scheme` String - แบบแผนที่กำหนดเองเพื่อลงทะเบียนพร้อมตัวเลือก
* `privileges` Object (optional) สิทธิพิเศษ 
  * `standard` Boolean (optional) - ค่าเริ่มต้นเป็น false.
  * `secure` Boolean (optional) - ค่าเริ่มต้นเป็น false.
  * `bypassCSP` Boolean (optional) - ค่าเริ่มต้นเป็น false.
  * `allowServiceWorkers` Boolean (optional) - ค่าเริ่มต้นเป็น false.
  * `supportFetchAPI` Boolean (optional) - ค่าเริ่มต้นเป็น false.
  * `corsEnabled` Boolean (optional) - ค่าเริ่มต้นเป็น false.