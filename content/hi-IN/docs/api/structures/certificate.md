# Certificate वस्तु

* ` डाटा ` String - PEM एंकोडेड डेटा
* ` जारीकर्ता ` [ CertificatePrincipal ](certificate-principal.md) जारीकर्ता प्राचार्य
* ` issuerName ` String - जारीकर्ता का समान्य नाम
* ` issuerCert ` प्रमाणपत्र - जारीकर्ता का प्रमाणपत्र (यदि स्व-हस्ताक्षरित नहीं है)
* ` विषय ` [ CertificatePrincipal ](certificate-principal.md) - विषय मुख्याध्यापक
* `subjectName` String - Subject's Common Name
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate