# 커스텀 드라이버를 이용한 자동화된 테스팅

Electron 응용 프로그램에 대한 자동화 된 테스트를 작성하려면, 응용 프로그램을 "drive" 하는 방법이 필요합니다. [Spectron](https://electronjs.org/spectron) is a commonly-used solution which lets you emulate user actions via [WebDriver](https://webdriver.io/). 그러나 node에 내장된 IPC-over-STDIO를 사용하여 custom driver 를 작성할 수도 있습니다. custom driver 의 이점은 Spectron보다 적은 오버 헤드를 요구하는 경향이 있으며, custom method들을 테스트 suite에 표시 할 수 있다는 것입니다.

To create a custom driver, we'll use Node.js' [child_process](https://nodejs.org/api/child_process.html) API. 아래의 테스트 suite 는 Electron 프로세스를 생성 한 다음 간단한 메시징 프로토콜을 설정합니다

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// spawn the process
const env = { /* ... */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = childProcess.spawn(electronPath, ['./app'], { stdio, env })

// listen for IPC messages from the app
appProcess.on('message', (msg) => {
  // ...
})

// send an IPC message to the app
appProcess.send({ my: 'message' })
```

From within the Electron app, you can listen for messages and send replies using the Node.js [process](https://nodejs.org/api/process.html) API:

```js
// listen for IPC messages from the test suite
process.on('message', (msg) => {
  // ...
})

// IPC 메시지를 테스트 슈트에 보냅니다.
process.send({ my: 'message' })
```

` appProcess ` 객체를 사용하여 테스트 suite 에서 Electron 앱으로 통신 할 수 있습니다.

편의를 위해, 더 높은 수준의 기능을 제공하는 드라이버 객체에서 ` appProcess `를 래핑하려고 할 수 있습니다. 그것을 하는 예는 아래와 같다:

```js
class TestDriver {
  constructor ({ path, args, env }) {
    this.rpcCalls = []

    // start child process
    env.APP_TEST_DRIVER = 1 // let the app know it should listen for messages
    this.process = childProcess.spawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // handle rpc responses
    this.process.on('message', (message) => {
      // pop the handler
      const rpcCall = this.rpcCalls[message.msgId]
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
    const msgId = this.rpcCalls.length
    this.process.send({ msgId, cmd, args })
    return new Promise((resolve, reject) => this.rpcCalls.push({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

이 응용 프로그램에서는 RPC 호출을위한 간단한 처리기를 작성해야합니다.

```js
if (process.env.APP_TEST_DRIVER) {
  process.on('message', onMessage)
}

async function onMessage ({ msgId, cmd, args }) {
  let method = METHODS[cmd]
  if (!method) method = () => new Error('Invalid method: ' + cmd)
  try {
    const resolve = await method(...args)
    process.send({ msgId, resolve })
  } catch (err) {
    const reject = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    process.send({ msgId, reject })
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

그런 다음 테스트 suite 에서 다음과 같이 테스트 드라이버를 사용할 수 있습니다.

```js
const test = require('ava')
const electronPath = require('electron')

const app = new TestDriver({
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
