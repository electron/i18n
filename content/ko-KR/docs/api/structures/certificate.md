# 증명서 개체

* `데이터` 스트링형- 데이터가 암호화된 PEM
* `issuer` [CertificatePrincipal](certificate-principal.md) - Issuer principal
* `issuerName` String - Issuer's Common Name
* `issuerCert` Certificate - Issuer certificate (if not self-signed)
* `subject` [CertificatePrincipal](certificate-principal.md) - Subject principal
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate