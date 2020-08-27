# Объект Certificate

* `data` String - PEM закодированные данные
* `issuer` [CertificatePrincipal](certificate-principal.md) - основной эмитент
* `issuerName` String - общее наименование эмитента
* `issuerCert` Certificate - сертификат эмитента (если не самоподписанный)
* `subject` [CertificatePrincipal](certificate-principal.md) - основной субъект
* `subjectName` String - общее наименование субъекта
* `serialNumber` String - HEX значение, представленное строкой
* `validStart` Number - дата начала действия сертификата в секундах
* `validExpiry` Number - дата окончания действия сертификата в секундах
* `fingerprint` String - отпечаток сертификата
