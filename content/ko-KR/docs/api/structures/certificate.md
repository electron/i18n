# 인증서 개체

* `데이터` 문자열- 데이터가 암호화된 PEM
* `발급자` [인증서 책임자](certificate-principal.md) - 발급 책임자
* `발급자 이름` 문자열- 발급자의 일반적인 이름
* `issuerCert` Certificate - Issuer certificate (if not self-signed)
* `subject` [CertificatePrincipal](certificate-principal.md) - Subject principal
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate