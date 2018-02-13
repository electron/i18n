# Certyfikat Obiektu

* `data` String - Zakodowane dane PEM
* `issuer` [CertificatePrincipal](certificate-principal.md) - główny wystawca
* `issuerName` String - Nazwa wystawcy
* `issuerCert` Certificate - Wystawca certyfikatu (jeśli nie jest podpisany)
* `subject` [CertificatePrincipal](certificate-principal.md) - Podmiot główny
* `issuerName` String - Nazwa wystawcy
* `serialNumber` String - Wartość heksadecymalna reprezentowana przez ciąg
* `validStart` Liczba - Początkowa data ważności certyfikatu, który jest prawidłowy w sekundach
* `validStart` Liczba - Końcowa data ważności certyfikatu, który jest prawidłowy w sekundach
* `fingerprint` String - Odcisk palca certyfikatu