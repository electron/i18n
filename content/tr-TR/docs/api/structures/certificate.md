# Certificate Nesnesi

* `data` String - PEM tarafından kodlanmış veri
* ` issuer ` [ CertificatePrincipal ](certificate-principal.md) - İhraçcı asıl
* `issuerName</ 0> String - İhracını Ortak Adı</li>
<li><code>issuerCert` Sertifika - Kurum sertifikası (kendiliğinden imzalı değilse)
* `subject` [CertificatePrincipal](certificate-principal.md) - Konu başlığı
* `subjectName` String - Konunun Ortak Adı
* `serialNumber` String - Hex value represented string
* `validStart` Number - Geçerli olan sertifikanın başlangıç tarihi( saniye olarak)
* `validExpiry` Number - Geçerli olan sertifikanın bitiş tarihi(saniye olarak)
* `fingerprint` String - Sertifkanın parmak izi