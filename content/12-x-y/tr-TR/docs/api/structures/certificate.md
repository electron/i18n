# Sertifika Objesi

* `data` String - PEM ile kodlanmış veri
* ` issuer ` [ CertificatePrincipal ](certificate-principal.md) - İhraçcı asıl
* `subjectName` String - dizinin ortak Adı
* `issuerCert` sertifika - kurum sertifikası (hazır imzalı değilse)
* `subject` [CertificatePrincipal](certificate-principal.md) - Konu
* `subjectName` String - konunun ortak adı
* `seri numarası` Dize - Hex değerini temsil eder
* `validStart` Number - geçerli sertifikanın başlangıç tarihi( saniye türünden)
* `validExpiry` Number - geçerli sertifikanın bitiş tarihi(saniye türünden)
* `fingerprint` String - sertifkanın parmak izi
