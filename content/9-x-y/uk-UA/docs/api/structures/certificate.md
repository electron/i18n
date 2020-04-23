# Об'єкт Certificate

* `data` String - PEM закодовані дані
* `issuer` [CertificatePrincipal](certificate-principal.md) - Головний емітент
* `issuerName` String - загальне ім'я чи назва емітента
* `issuerCert` Certificate - Сертифікат емітента (якщо не самостійно підписанний)
* `subject` [CertificatePrincipal](certificate-principal.md) - Основний суб'єкт
* `subjectName` String - Загальне им'я суб'єкту
* `serialNumber` String - HEX значення, представлене рядком
* `validStart` Number - Дата початку дії сертифікату в секундах
* `validExpiry` Number - Дата закінчення дії сертифіката в секундах
* `fingerprint` String - Відбиток сертифікату
