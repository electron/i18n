# Objek Sertifikat

* `data` String - data PEM yang di-encode
* `issuer` [SertifikatPokok](certificate-principal.md) - Pokok Emiten
* `issuerName` String - Nama Umum Emiten
* `issuerCert` Sertifikat - Sertifikat Emiten (jika tidak-betandatangan)
* `subject` [CertificatePrincipal](certificate-principal.md) - Pokok Subyek
* `subjectName` String - Nama Umum Subyek
* `serialNumber` String - Nila Hex yang mewakili string
* `validStart` Angka - Tanggal dimulainya Sertifikat mulai menjadi valid dalam detik
* `validExpiry` Angka - Tanggal akhir Sertifikat masih valid dalam detik
* `fingerprint` String - Sidik jari Sertifikat