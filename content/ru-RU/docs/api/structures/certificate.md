# Certificate Объект

* `data` String - PEM закодированные данные
* `issuer` [CertificatePrincipal](certificate-principal.md) - Основной эмитент
* `issuerName` String - Общее наименование эмитента
* `issuerCert` Certificate - Сертификат эмитента (если не самоподписанный)
* `subject` [CertificatePrincipal](certificate-principal.md) - Основной субъект
* `subjectName` String - Общее наименование субъекта
* `serialNumber` String - Hex значение, представленное строкой
* `validStart` Number - Дата начала действия сертификата в секундах
* `validExpiry` Number - Дата окончания действия сертификата в секундах
* `fingerprint` String - Отпечаток сертификата