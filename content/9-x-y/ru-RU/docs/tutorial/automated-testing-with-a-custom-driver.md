# Автоматическое тестирование с помощью собственного драйвера

Для написания автоматических тестов для вашего приложения Electron вам понадобится способ "управлять" вашим приложением. [Spectron](https://electronjs.org/spectron) - это широко используемое решение, которое позволяет вам эмулировать действия пользователя через [WebDriver](http://webdriver.io/). Тем не менее, также можно написать свой собственный драйвер с помощью встроенного в узел IPC-over-STDIO. Преимущество собственного драйвера состоит в том, что он требует меньше служебных данных, чем Spectron, и позволяет вам использовать собственные методы для вашего набора тестов.

Чтобы создать собственный драйвер, мы будем использовать Node.js API [child_process](https://nodejs.org/api/child_process.html). Набор тестов вызовет процесс Electron, а затем установит простой протокол обмена сообщениями:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// spawn the process
let env = { /* ... */ }
let stdio = ['inherit', 'inherit', 'inherit', 'ipc']
let appProcess = childProcess.spawn(electronPath, ['./app'], { stdio, env })

// listen for IPC messages from the app
appProcess.on('message', (msg) => {
  // ...
})

// отправляем IPC сообщение в приложение
appProcess.send({ my: 'message' })
```

Из приложения Electron вы можете прослушивать сообщения и посылать ответы с помощью API [process](https://nodejs.org/api/process.html) из Node.js:

```js
// слушаем IPC сообщение из теста
process.on('message', (msg) => {
  // ...
})

// отправляем IPC сообщение в тест
process.send({ my: 'message' })
```

Теперь мы можем передавать данные из теста в приложению Electron, используя объект `appProcess`.

Для удобства, вы можете обернуть `appProcess` в объект драйвера, который предоставляет более высокоуровневые функции. Here is an example of how you can do this:

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
      let rpcCall = this.rpcCalls[message.msgId]
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
    let msgId = this.rpcCalls.length
    this.process.send({ msgId, cmd, args })
    return new Promise((resolve, reject) => this.rpcCalls.push({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

В приложении вам нужно будет написать простой обработчик для вызовов RPC:

```js
if (process.env.APP_TEST_DRIVER) {
  process.on('message', onMessage)
}

async function onMessage ({ msgId, cmd, args }) {
  let method = METHODS[cmd]
  if (!method) method = () => new Error('Invalid method: ' + cmd)
  try {
    let resolve = await method(...args)
    process.send({ msgId, resolve })
  } catch (err) {
    let reject = {
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

Затем в тесте можно использовать тестовый драйвер следующим образом:

```js
const test = require('ava')
const electronPath = require('electron')

let app = new TestDriver({
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
