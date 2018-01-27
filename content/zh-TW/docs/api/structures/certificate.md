# 憑證物件

* `data` String - PEM 編碼後的資料
* `issuer` [CertificatePrincipal](certificate-principal.md) - 簽發者主體
* `issuerName` String - 簽發者通用名稱
* `issuerCert` Certificate - 簽發者憑證 (如果不是自我簽署的)
* `subject` [CertificatePrincipal](certificate-principal.md) - Subject principal
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate