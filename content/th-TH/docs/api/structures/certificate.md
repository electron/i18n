# Certificate Object เชื่อมต่อ วัตถุรับรอง

* `data` String - ข้อมูลที่เข้ารหัส PEM
* `subject` [CertificatePrincipal](certificate-principal.md) - หัวเรื่องหลัก
* `subjectName` String - ชื่อของหัวเรื่อง
* `issuerCert` Certificate - ใบรับรองของผู้ออกใบรับรอง (หากไม่ใช่แบบลงชื่อด้วยตนเอง)
* `subject` [CertificatePrincipal](certificate-principal.md) - หัวเรื่องหลัก
* `subjectName` String - ชื่อของหัวเรื่อง
* `serialNumber` String - ค่า Hex เป็นตัวแทนสตริง
* `validStart` Number - วันที่เริ่มต้นของใบรับรองที่ถูกต้องในไม่กี่วินาที
* `validExpiry` Number - วันที่สิ้นสุดของใบรับรองที่ถูกต้องในไม่กี่วินาที
* `fingerprint` String - ลายนิ้วมือของใบรับรอง