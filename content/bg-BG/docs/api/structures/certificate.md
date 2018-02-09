# Обект Certificate

* `data` String - PEM кодирани данни
* `issuer` [CertificatePrincipal](certificate-principal.md) - Издател
* `issuerName` String - Общо наименование на издателя
* `issuerCert` Certificate - Издателски сертификат (ако не е самоподписан)
* `subject` [CertificatePrincipal](certificate-principal.md) - Основание на издателя
* `subjectName` String - Общо наименование на основанието
* `serialNumber` String - Шестнайсетичен (hex) номер представен като низ
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate