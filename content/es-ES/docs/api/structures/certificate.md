# Objeto Certificate

* `data` String - Datos cifrados en formato PEM
* `issuer` [CertificatePrincipal](certificate-principal.md) - Emisor principal
* `issuerName` String - Nombre común del emisor
* `issuerCert` Certificate - Certificado de emisor (si no esta autofimado)
* `subject` [CertificatePrincipal](certificate-principal.md) - Asunto principal
* `subjectName` String - Nombre común del asunto
* `serialNumber` String - Valor hexagesimal representado por un string
* `validStart` Number - Fecha de inicio del certificado siendo validado en segundos
* `validExpiry` Number - Fecha de finalización del certificado siendo validado en segundos
* `fingerprint` String - Huella digital del certificado
