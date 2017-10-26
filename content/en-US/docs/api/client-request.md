## Class: ClientRequest

> Make HTTP/HTTPS requests.

Process: [Main](../glossary.md#main-process)

`ClientRequest` implements the [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams)
interface and is therefore an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### `new ClientRequest(options)`

* `options` (Object | String) - If `options` is a String, it is interpreted as
the request URL. If it is an object, it is expected to fully specify an HTTP request via the
following properties:
  * `method` String (optional) - The HTTP request method. Defaults to the GET
method.
  * `url` String (optional) - The request URL. Must be provided in the absolute
form with the protocol scheme specified as http or https.
  * `session` Object (optional) - The [`Session`](session.md) instance with
which the request is associated.
  * `partition` String (optional) - The name of the [`partition`](session.md)
  with which the request is associated. Defaults to the empty string. The
`session` option prevails on `partition`. Thus if a `session` is explicitly
specified, `partition` is ignored.
  * `protocol` String (optional) - The protocol scheme in the form 'scheme:'.
Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
  * `host` String (optional) - The server host provided as a concatenation of
the hostname and the port number 'hostname:port'
  * `hostname` String (optional) - The server host name.
  * `port` Integer (optional) - The server's listening port number.
  * `path` String (optional) - The path part of the request URL.
  * `redirect` String (optional) - The redirect mode for this request. Should be
one of `follow`, `error` or `manual`. Defaults to `follow`. When mode is `error`,
any redirection will be aborted. When mode is `manual` the redirection will be
deferred until [`request.followRedirect`](#requestfollowRedirect) is invoked. Listen for the [`redirect`](#event-redirect) event in
this mode to get more details about the redirect request.

`options` properties such as `protocol`, `host`, `hostname`, `port` and `path`
strictly follow the Node.js model as described in the
[URL](https://nodejs.org/api/url.html) module.

For instance, we could have created the same request to 'github.com' as follows:

```JavaScript
const request = net.request({
  method: 'GET',
  protocol: 'https:',
  hostname: 'github.com',
  port: 443,
  path: '/'
})
```

### Instance Events

#### Event: 'response'

Returns:

* `response` IncomingMessage - An object representing the HTTP response message.

#### Event: 'login'

Returns:

* `authInfo` Object
  * `isProxy` Boolean
  * `scheme` String
  * `host` String
  * `port` Integer
  * `realm` String
* `callback` Function
  * `username` String
  * `password` String

Emitted when an authenticating proxy is asking for user credentials.

The `callback` function is expected to be called back with user credentials:

* `username` String
* `password` String

```JavaScript
request.on('login', (authInfo, callback) => {
  callback('username', 'password')
})
```
Providing empty credentials will cancel the request and report an authentication
error on the response object:

```JavaScript
request.on('response', (response) => {
  console.log(`STATUS: ${response.statusCode}`);
  response.on('error', (error) => {
    console.log(`ERROR: ${JSON.stringify(error)}`)
  })
})
request.on('login', (authInfo, callback) => {
  callback()
})
```

#### Event: 'finish'

Emitted just after the last chunk of the `request`'s data has been written into
the `request` object.

#### Event: 'abort'

Emitted when the `request` is aborted. The `abort` event will not be fired if
the `request` is already closed.

#### Event: 'error'

Returns:

* `error` Error - an error object providing some information about the failure.

Emitted when the `net` module fails to issue a network request. Typically when
the `request` object emits an `error` event, a `close` event will subsequently
follow and no response object will be provided.

#### Event: 'close'

Emitted as the last event in the HTTP request-response transaction. The `close`
event indicates that no more events will be emitted on either the `request` or
`response` objects.


#### Event: 'redirect'

Returns:

* `statusCode` Integer
* `method` String
* `redirectUrl` String
* `responseHeaders` Object

Emitted when there is redirection and the mode is `manual`. Calling
[`request.followRedirect`](#requestfollowRedirect) will continue with the redirection.

### Instance Properties

#### `request.chunkedEncoding`

A `Boolean` specifying whether the request will use HTTP chunked transfer encoding
or not. Defaults to false. The property is readable and writable, however it can
be set only before the first write operation as the HTTP headers are not yet put
on the wire. Trying to set the `chunkedEncoding` property after the first write
will throw an error.

Using chunked encoding is strongly recommended if you need to send a large
request body as data will be streamed in small chunks instead of being
internally buffered inside Electron process memory.

### Instance Methods

#### `request.setHeader(name, value)`

* `name` String - An extra HTTP header name.
* `value` Object - An extra HTTP header value.

Adds an extra HTTP header. The header name will issued as it is without
lowercasing. It can be called only before first write. Calling this method after
the first write will throw an error. If the passed value is not a `String`, its
`toString()` method will be called to obtain the final value.

#### `request.getHeader(name)`

* `name` String - Specify an extra header name.

Returns `Object` - The value of a previously set extra header name.

#### `request.removeHeader(name)`

* `name` String - Specify an extra header name.

Removes a previously set extra header name. This method can be called only
before first write. Trying to call it after the first write will throw an error.

#### `request.write(chunk[, encoding][, callback])`

* `chunk` (String | Buffer) - A chunk of the request body's data. If it is a
string, it is converted into a Buffer using the specified encoding.
* `encoding` String (optional) - Used to convert string chunks into Buffer
objects. Defaults to 'utf-8'.
* `callback` Function (optional) - Called after the write operation ends.

`callback` is essentially a dummy function introduced in the purpose of keeping
similarity with the Node.js API. It is called asynchronously in the next tick
after `chunk` content have been delivered to the Chromium networking layer.
Contrary to the Node.js implementation, it is not guaranteed that `chunk`
content have been flushed on the wire before `callback` is called.

Adds a chunk of data to the request body. The first write operation may cause
the request headers to be issued on the wire. After the first write operation,
it is not allowed to add or remove a custom header.

#### `request.end([chunk][, encoding][, callback])`

* `chunk` (String | Buffer) (optional)
* `encoding` String (optional)
* `callback` Function (optional)

Sends the last chunk of the request data. Subsequent write or end operations
will not be allowed. The `finish` event is emitted just after the end operation.

#### `request.abort()`

Cancels an ongoing HTTP transaction. If the request has already emitted the
`close` event, the abort operation will have no effect. Otherwise an ongoing
event will emit `abort` and `close` events. Additionally, if there is an ongoing
response object,it will emit the `aborted` event.

#### `request.followRedirect()`

Continues any deferred redirection request when the redirection mode is `manual`.
