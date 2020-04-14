# Certificate Object

* `data` String - PEM кодирани данни
* `issuer` [CertificatePrincipal](certificate-principal.md) - Издател
* `issuerName` String - Общо наименование на издателя
* `issuerCert` Certificate - Издателски сертификат (ако не е самоподписан)
* `subject` [CertificatePrincipal](certificate-principal.md) - Основание на издателя
* `subjectName` String - Общо наименование на основанието
* `serialNumber` String - Шестнайсетичен (hex) номер представен като низ
* `validStart` Number - Начална дата на валидност на сертификата представена в секунди
* `validStart` Number - Начална дата на валидност на сертификата представена в секунди
* `fingerprint` String - Пръстов отпечатък на сертификата
