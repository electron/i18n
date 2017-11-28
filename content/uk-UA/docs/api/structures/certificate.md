# Об'єкт Certificate

* `data` String - PEM закодовані дані
* `issuer` [CertificatePrincipal](certificate-principal.md) - Головний емітент
* `issuerName` String - загальне ім'я чи назва емітента
* `issuerCert` Certificate - Сертифікат емітента (якщо не самостійно підписанний)
* `subject` [CertificatePrincipal](certificate-principal.md) - Subject principal
* `subjectName` String - Загальне им'я суб'єкту
* `serialNumber` String - HEX значення, представлене рядком
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate