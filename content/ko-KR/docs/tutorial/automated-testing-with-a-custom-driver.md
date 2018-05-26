# Automated Testing with a Custom Driver

Electron 응용 프로그램에 대한 자동화 된 테스트를 작성하려면, 응용 프로그램을 "drive" 하는 방법이 필요합니다. [ Spectron ](https://electronjs.org/spectron)은 [ WebDriver ](http://webdriver.io/)를 통해 사용자 작업을 에뮬레이트 할 수있는 일반적으로 사용되는 솔루션입니다. 그러나 node에 내장된 IPC-over-STDIO를 사용하여 custom driver 를 작성할 수도 있습니다. custom driver 의 이점은 Spectron보다 적은 오버 헤드를 요구하는 경향이 있으며, custom method들을 테스트 suite에 표시 할 수 있다는 것입니다.

custom driver 를 만들기 위해 nodejs 의  child_process </ 0> API를 사용할 것입니다. 아래의 테스트 suite 는 Electron 프로세스를 생성 한 다음 간단한 메시징 프로토콜을 설정합니다</p> 

```js
var childProcess = require('child_process')
var electronPath = require('electron')

// spawn the process
var env = { /* ... */ }
var stdio = ['inherit', 'inherit', 'inherit', 'ipc']
var appProcess = childProcess.spawn(electronPath, ['./app'], {stdio, env})

// listen for IPC messages from the app
appProcess.on('message', (msg) => {
  // ...
})

// send an IPC message to the app
appProcess.send({my: 'message'})
```

Electron 어플리케이션에서 nodejs [ 프로세스 ](https://nodejs.org/api/process.html) API를 사용하여 메시지를 수신하고 응답을 보낼 수 있습니다.

```js
// listen for IPC messages from the test suite
process.on('message', (msg) => {
  // ...
})

// send an IPC message to the test suite
process.send({my: 'message'})
```

` appProcess ` 객체를 사용하여 테스트 suite 에서 Electron 앱으로 통신 할 수 있습니다.

For convenience, you may want to wrap `appProcess` in a driver object that provides more high-level functions. Here is an example of how you can do this:

```js
class TestDriver {
  constructor ({path, args, env}) {
    this.rpcCalls = []

    // start child process
    env.APP_TEST_DRIVER = 1 // let the app know it should listen for messages
    this.process = childProcess.spawn(path, args, {stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env})

    // handle rpc responses
    this.process.on('message', (message) => {
      // pop the handler
      var rpcCall = this.rpcCalls[message.msgId]
      if (!rpcCall) return
      this.rpcCalls[message.msgId] = null
      // reject/resolve
      if (message.reject) rpcCall.reject(message.reject)
      else rpcCall.resolve(message.resolve)
    })

    // wait for ready
    this.isReady = this.rpc('isReady').catch((err) => {
      console.error('Application failed to start', err)
      this.stop()
      process.exit(1)
    })
  }

  // simple RPC call
  // to use: driver.rpc('method', 1, 2, 3).then(...)
  async rpc (cmd, ...args) {
    // send rpc request
    var msgId = this.rpcCalls.length
    this.process.send({msgId, cmd, args})
    return new Promise((resolve, reject) => this.rpcCalls.push({resolve, reject}))
  }

  stop () {
    this.process.kill()
  }
}
```

In the app, you'd need to write a simple handler for the RPC calls:

```js
if (process.env.APP_TEST_DRIVER) {
  process.on('message', onMessage)
}

async function onMessage ({msgId, cmd, args}) {
  var method = METHODS[cmd]
  if (!method) method = () => new Error('Invalid method: ' + cmd)
  try {
    var resolve = await method(...args)
    process.send({msgId, resolve})
  } catch (err) {
    var reject = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    process.send({msgId, reject})
  }
}

const METHODS = {
  isReady () {
    // do any setup needed
    return true
  }
  // define your RPC-able methods here
}
```

Then, in your test suite, you can use your test-driver as follows:

```js
var test = require('ava')
var electronPath = require('electron')

var app = new TestDriver({
  path: electronPath,
  args: ['./app'],
  env: {
    NODE_ENV: 'test'
  }
})
test.before(async t => {
  await app.isReady
})
test.after.always('cleanup', async t => {
  await app.stop()
})
```