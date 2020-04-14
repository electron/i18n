# Certificate Object

* `data` String- 데이터가 암호화된 PEM
* `issuer` [CertificatePrincipal](certificate-principal.md) - 발급 책임자
* `issuerName` String- 발급자의 일반적인 이름
* `issuerCert` 인증서 - 발급자 인증서(하지 않을 경우 자체 서명)
* `subject` [CertificatePrincipal](certificate-principal.md)- 발급 책임자
* `subjectName` String - 대상의 일반적인 이름
* `serialNumber` String - 문자열은 16진수 값으로 표시
* `validStart` Integer - 인증서의 유효기간 시작 날짜
* `validExpiry` Integer - 인증서의 유효기간 종료 날짜
* `validExpiry` String - 인증서의 지문