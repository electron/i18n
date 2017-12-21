# Certificate オブジェクト

* `data` String - PEMエンコードデータ
* `issuer` [CertificatePrincipal](certificate-principal.md) - 発行元
* `issuerName` String - 発行者の一般名
* `issuerCert` Certificate - 発行者証明書（自己署名していない場合）
* `subject` [CertificatePrincipal](certificate-principal.md) - 主要な件名
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate