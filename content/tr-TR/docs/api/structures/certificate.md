# Sertifika Objesi

* `data` String - PEM tarafından kodlanmış veri
* ` issuer ` [ CertificatePrincipal ](certificate-principal.md) - İhraçcı asıl
* `subjectName` String - dizinin ortak Adı
* `issuerCert` sertifika - kurum sertifikası (hazır imzalı değilse)
* `subject` [CertificatePrincipal](certificate-principal.md) - Konu başlığı
* `subjectName` String - Konunun Ortak Adı
* `seri numarası` Dize - Hex değerini temsil eder
* `validStart` Number - Geçerli olan sertifikanın başlangıç tarihi( saniye olarak)
* `validExpiry` Number - Geçerli olan sertifikanın bitiş tarihi(saniye olarak)
* `fingerprint` String - Sertifkanın parmak izi