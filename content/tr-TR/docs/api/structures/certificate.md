# Certificate Nesnesi

* `data` String - PEM tarafından kodlanmış veri
* ` issuer ` [ CertificatePrincipal ](certificate-principal.md) - İhraçcı asıl
* `issuerName</ 0> String - İhracını Ortak Adı</li>
<li><code>issuerCert` Certificate - Issuer certificate (if not self-signed)
* `subject` [CertificatePrincipal](certificate-principal.md) - Subject principal
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate