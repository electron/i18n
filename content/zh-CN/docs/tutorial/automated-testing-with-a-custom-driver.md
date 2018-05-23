# 使用自定义驱动程序进行自动化测试

为Electron应用编写自动测试, 你需要一种 "驱动" 应用程序的方法。 [ Spectron ](https://electronjs.org/spectron) 是一种常用的解决方案, 它允许您通过 [ WebDriver ](http://webdriver.io/) 模拟用户行为。 当然，也可以使用node的内建IPC STDIO来编写自己的自定义驱动。 自定义驱动的优势在于，它往往比Spectron需要更少的开销，并允许你向测试套件公开自定义方法。

要创建自定义驱动, 我们将使用 nodejs 的 [ child_process ](https://nodejs.org/api/child_process.html) API。 测试套件将生成 Electron 子进程，然后建立一个简单的消息传递协议。

```js
var childProcess = require('child_process')
var electronPath = require('electron')

// 生成进程
var env = { /* ... */ }
var stdio = ['inherit', 'inherit', 'inherit', 'ipc']
var appProcess = childProcess.spawn(electronPath, ['./app'], {stdio, env})

// 从应用侦听IPC消息
appProcess.on('message', (msg) => {
  // ...
})

// 向应用发送IPC消息
appProcess.send({my: 'message'})
```

从Electron应用中，你可以侦听消息并使用 nodejs [ 进程 ](https://nodejs.org/api/process.html) API 发送答复:

```js
// 从测试套件进程侦听IPC消息
process.on('message', (msg) => {
  // ...
})

// 向测试套件进程发送IPC消息
process.send({my: 'message'})
```

现在，我们可以使用`appProcess` 对象从测试套件到Electron应用进行通讯。

为了方便起见，你可能需要封装`appProcess`到一个驱动对象，以便提供更多高级函数。 下面是一个如何这样做的示例：

```js
class TestDriver {
  constructor ({path, args, env}) {
    this.rpcCalls = []

    // 启动子进程
    env.APP_TEST_DRIVER = 1 // 让应用知道该侦听消息
    this.process = childProcess.spawn(path, args, {stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env})

    // 处理 rpc 响应
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