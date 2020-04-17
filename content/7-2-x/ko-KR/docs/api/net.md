# net

> Chromium 기본 네트워킹 라이브러리를 사용하여 HTTP/HTTPS 요청을 만듭니다.

프로세스: [Main](../glossary.md#main-process)

`net` 모듈은 HTTP(S) 요청을 만들기 위한 클라이언트 측 API입니다. Node.js의 [HTTP](https://nodejs.org/api/http.html), [HTTPS](https://nodejs.org/api/https.html) 모듈과 유사하지만 Node.js의 구현 대신 웹 프록시를 더 잘 지원하는 Chromium 기본 네트워킹 라이브러리를 사용합니다.

다음 내용은 기본 Node.js 모듈 대신에 `net` 모듈을 사용해야 하는 구체적인 이유들을 나열한 목록입니다.

* wpad 프로토콜과 proxy pac 구성 파일을 지원하는 시스템 프록시 구성에 대한 자동적인 지원.
* HTTPS 요청의 자동적인 터널링.
* Basic, Digest, NTLM, Kerberos 또는 Negotiate 인증 Scheme를 사용한 프록시 인증 지원.
* 접근 제어나 모니터링을 위해 사용하는 Fiddler 같은 부류의 프록시들을 지원.

이 모듈의 API 요소 (Class, 메서드, 속성, 그리고 이벤트 이름들) 들은 Node.js에서 사용되는 것과 비슷합니다.

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

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## 메서드

다음은 `net` 객체에서 사용할 수 있는 메서드입니다.

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - `ClientRequest` 생성자 옵션.

[`ClientRequest`](./client-request.md)를 반환합니다

주어진 `options`를 사용하여 `ClientRequest` 생성자에 직접적으로 넘겨주는 [`ClientRequest`](./client-request.md) 인스턴스를 생성합니다. `net.request` 메서드를 사용해 `options` 객체에 명시된 protocol scheme에 따라 보안 연결이나 보안되지 않은 HTTP 요청을 만들 수 있습니다.
