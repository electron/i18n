# Layunin ng Sertipiko

* `data` na String - PEM naka-encode na datos
* `issuer`[CertificatePrincipal](certificate-principal.md) - prinsipal na Issuer
* `issuerName` na String - Karaniwang Pangalan ng Issuer
* `issuerCert` Sertipiko - sertipiko ng Issuer (kung hindi sariling lagda)
* `subject`[CertificatePrincipal](certificate-principal.md) - prinsipal na Paksa
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate