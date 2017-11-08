# 인증서 개체

* `데이터` 문자열- 데이터가 암호화된 PEM
* `발급자` [인증서 책임자](certificate-principal.md) - 발급 책임자
* `발급자 이름` 문자열- 발급자의 일반적인 이름
* `발급자 인증서` 인증서 - 발급자 인증서(하지 않을 경우 자체 서명)
* `주제` [인증서 책임자](certificate-principal.md) - 발급 책임자
* `주제 이름` 문자열 - 주제는 일반적인 이름
* `serialNumber` String - Hex value represented string
* `validStart` Number - Start date of the certificate being valid in seconds
* `validExpiry` Number - End date of the certificate being valid in seconds
* `fingerprint` String - Fingerprint of the certificate