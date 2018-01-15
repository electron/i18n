# Layunin ng Sertipiko

* `data` na String - PEM naka-encode na datos
* `issuer`[CertificatePrincipal](certificate-principal.md) - prinsipal na Issuer
* `issuerName` na String - Karaniwang Pangalan ng Issuer
* `issuerCert` Sertipiko - sertipiko ng Issuer (kung hindi sariling lagda)
* `subject`[CertificatePrincipal](certificate-principal.md) - prinsipal na Paksa
* `subjectName` na String - Karaniwang Pangalam ng Paksa
* `serialNumber` na String - Halaga ng Hex na kumakatawan sa string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate