# Certificate Nesnesi

* `data` String - PEM tarafından kodlanmış veri
* ` issuer ` [ CertificatePrincipal ](certificate-principal.md) - İhraçcı asıl
* `issuerName</ 0> String - İhracını Ortak Adı</li>
<li><code>issuerCert` Certificate - Issuer certificate (if not self-signed)
* `subject` [CertificatePrincipal](certificate-principal.md) - Konu başlığı
* `subjectName` String - Konunun Ortak Adı
* `serialNumber` String - Hex value represented string
* `validStart` Number - Geçerli olan sertifikanın başlangıç tarihi
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate