# net

> Chromium 기본 네트워킹 라이브러리를 사용하여 HTTP/HTTPS 요청을 만듭니다.

프로세스:[Main](../glossary.md#main-process)

`net` 모듈은 HTTP(S) 요청을 만들기 위한 클라이언트 측 API입니다. It is similar to the [HTTP](https://nodejs.org/api/http.html) and [HTTPS](https://nodejs.org/api/https.html) modules of Node.js but uses Chromium's native networking library instead of the Node.js implementation, offering better support for web proxies.

The following is a non-exhaustive list of why you may consider using the `net` module instead of the native Node.js modules:

* Automatic management of system proxy configuration, support of the wpad protocol and proxy pac configuration files.
* Automatic tunneling of HTTPS requests.
* Support for authenticating proxies using basic, digest, NTLM, Kerberos or negotiate authentication schemes.
* Support for traffic monitoring proxies: Fiddler-like proxies used for access control and monitoring.

The API components (including classes, methods, properties and event names) are similar to those used in Node.js.

Example usage:

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

다음은 `net` 객체에서 사용할 수 있는 메서드입니다:

### `net.request(options)`

* `options` (Object | String) - `ClientRequest` 생성자 옵션.

[`ClientRequest`](./client-request.md)를 반환합니다

Creates a [`ClientRequest`](./client-request.md) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.