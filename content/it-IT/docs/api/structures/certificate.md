# Oggetto certificato

* `data` Stringa - dati PEM codificati
* `issuer` [CertificatePrincipal](certificate-principal.md) - Emittente principale
* `issuerName` Stringa - nome comune dell'emittente
* `issuerCert` Certificato - emittente del certificato (se non self-signed)
* `Soggetto`[CeertificatePrincipal](certificate-principal.md)- Emittente principale
* `Nomesogetto` Striga - nome comune dell'emittente
* `numerodiserie` Striga - Hex valore rappresentato striga
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate