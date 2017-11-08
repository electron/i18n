# 인증서 개체

* `데이터` String- 데이터가 암호화된 PEM
* `발급자` [인증서 책임자](certificate-principal.md) - 발급 책임자
* `발급자 이름` String- 발급자의 일반적인 이름
* `발급자 인증서` 인증서 - 발급자 인증서(하지 않을 경우 자체 서명)
* `주제` [인증서 책임자](certificate-principal.md) - 발급 책임자
* `대상 이름` String - 대상의 일반적인 이름
* `시리얼넘버` String - 문자열은 16진수 값으로 표시
* `유효 시작` Integer - 인증서의 유효기간 시작 날짜
* `유효 만기` Integer - 인증서의 유효기간 종료 날짜
* `지문` String - 인증서의 지문