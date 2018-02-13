# Layunin ng Sertipiko

* `data` na String - Naka-encode na datos ng PEM
* `issuer`[CertificatePrincipal](certificate-principal.md) - Prinsipal na tagaisyu
* `issuerName` na String - Karaniwang Pangalan ng Issuer
* `issuerCert` Sertipiko - sertipiko ng Issuer (kung hindi sariling lagda)
* `subject`[CertificatePrincipal](certificate-principal.md) - Prinsipal na paksa
* `subjectName` na String - Karaniwang Pangalan ng Paksa
* `serialNumber` na String - Halaga ng Hex na kumakatawan sa string
* `validStart` Number - Umpisa ng petsa ng sertipiko nang pagiging balido sa segundo
* `validExpiry` Number - Katapusan ng petsa ng sertipiko nang pagiging balido sa segundo
* `fingerprint` String - Fingerprint ng mga sertipiko