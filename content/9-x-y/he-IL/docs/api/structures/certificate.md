# הרכיב Certificate (אישור)

* `data` ‏String - נתונים בהצפנת PEM
* `issuer` [CertificatePrincipal](certificate-principal.md) - Issuer principal
* `issuerName` String - Issuer's Common Name
* `issuerCert` Certificate - Issuer certificate (if not self-signed)
* `subject` [CertificatePrincipal](certificate-principal.md) - Subject principal
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart`‏ Number - מועד תחילת תוקף האישור בשניות
* `validExpiry` ‏Number - מועד סיום תוקף האישור בשניות
* `fingerprint` ‏String - טביעת האצבע של האישור
