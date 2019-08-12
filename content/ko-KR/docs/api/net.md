# net

> Chromium 기본 네트워킹 라이브러리를 사용하여 HTTP/HTTPS 요청을 만듭니다.

프로세스:[Main](../glossary.md#main-process)

`net` 모듈은 HTTP(S) 요청을 만들기 위한 클라이언트 측 API입니다. Node.js의 [HTTP](https://nodejs.org/api/http.html), [HTTPS](https://nodejs.org/api/https.html) 모듈과 유사하지만 Node.js의 구현 대신 웹 프록시를 더 잘 지원하는 Chromium 기본 네트워킹 라이브러리를 사용합니다.

다음 내용은 기본 Node.js 모듈 대신에 `net` 모듈을 사용해야 하는 구체적인 이유들을 나열한 목록입니다.

* Automatic management of system proxy configuration, support of the wpad protocol and proxy pac configuration files.
* HTTPS 요청의 자동적인 터널링.
* Support for authenticating proxies using basic, digest, NTLM, Kerberos or negotiate authentication schemes.
* Support for traffic monitoring proxies: Fiddler-like proxies used for access control and monitoring.

The API components (including classes, methods, properties and event names) are similar to those used in Node.js.

사용 예시:

```javascript
const { app } = require('electron')
app.on('ready', () => {
  const { net } = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
})
```

`net` API는 애플리케이션이 `ready` 이벤트를 발생시킨 후에만 사용할 수 있습니다. `ready` 이벤트 이전에 이 모듈을 사용하려고 하면 오류를 발생시킵니다.

## 메서드

다음은 `net` 객체에서 사용할 수 있는 메서드입니다.

### `net.request(options)`

* `options` (Object | String) - `ClientRequest` 생성자 옵션.

[`ClientRequest`](./client-request.md)를 반환합니다

Creates a [`ClientRequest`](./client-request.md) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.