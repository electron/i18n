# Certificate 物件

* `data` String - PEM 編碼後的資料
* `issuer` [CertificatePrincipal](certificate-principal.md) - 簽發者主體
* `issuerName` String - 簽發者通用名稱
* `issuerCert` Certificate - 簽發者憑證 (如果不是自我簽署的)
* `subject` [CertificatePrincipal](certificate-principal.md) -主要項目
* `subjectName` 字符串- 項目的通用名稱
* `serialNumber` 字符串- 十六進制表示字符串
* `validStart` 數字-證書有效的開始日期以秒為單位
* `validExpiry` 數字- 證書有效的結束日期以秒為單位
* `fingerprint`字符串-證書的指紋
