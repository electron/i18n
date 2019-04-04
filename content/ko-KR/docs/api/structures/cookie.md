# 쿠키 개체

* `이름` String - 쿠키의 이름
* `값` String - 쿠키 값
* `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
* `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
* `경로` String(옵션) - 쿠키의 경로
* `보안` Boolean(옵션) - 쿠키 안전 표시 여부
* `HTTP전용` Boolean (옵션) - 쿠키의 HTTP전용 표시 여부 
* `세션` Boolean (옵션) - 쿠키가 세션 쿠키인지 아니면 만료일이 있는 영구 쿠키인지
* `유효 기간` Double (옵션) - 쿠키 만료일은 유닉스 시간을 몇초로 나타낸 것입니다. 세션 쿠키에는 제공되지 않습니다.