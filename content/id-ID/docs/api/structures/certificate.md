# Objek Sertifikat

* `data` String - data PEM yang dikodekan
* `issuer` [SertifikatPokok](certificate-principal.md) - Pokok Emiten
* `issuerName` String - Nama Umum Emiten
* `issuerCert` Sertifikat - Sertifikat Emiten (jika tidak-betandatangan)
* `subject` [CertificatePrincipal](certificate-principal.md) - Pokok Subyek
* `subjectName` String - Nama Umum Subyek
* `serialNumber` String - Nila Hex yang mewakili string
* `validStart` Angka - Tanggal dimulainya Sertifikat mulai menjadi valid dalam detik
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate