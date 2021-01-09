# Автоматичне тестування за допомогою користувацького драйвера

Щоб записати автоматичні тести для вашого застосунку, вам знадобиться спосіб "диску" вашого додатку. [Спектран](https://electronjs.org/spectron) - це спільне рішення, яке дозволяє вам імітувати дії користувачів за допомогою [WebDriver](http://webdriver.io/). Однак, також можна написати власний драйвер з використанням вбудованого вузла IPC-over-STDIO. Перевага від користувальницького водія полягає в тому, що він вимагає менше накладних витрат, ніж Spectron, і дозволяє розкрити користувацькі методи для вашого набору тестів.

Щоб створити користувальницький драйвер, ми будемо використовувати Node.js' [child_process](https://nodejs.org/api/child_process.html) API. Цей тестовий набір генерує процес Electron та встановить простий протокол обміну повідомленнями:

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

// відправити повідомлення IPC у додаток
appProcess.send({ my: 'message' })
```

З додатку Electron, ви можете слухати повідомлення та надсилати відповіді за допомогою модуля Node.js [процес](https://nodejs.org/api/process.html) API:

```js
// слухайте IPC повідомлення з тестового набору
process.on('message', (msg) => {
  // ...
})

// відправити повідомлення IPC до тестового набору
process.send({ my: 'message' })
```

Тепер ми можемо спілкуватися з комплекту тестів до програми Electron, використовуючи об'єкт `appProcess`.

Для зручності, вам може захотіти обгорнути `додаток` в об'єкті водія, який надає більше функцій високого рівня. Ось приклад того, як ви можете це зробити:

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

У програмі слід написати простий обробник для RPC дзвінків:

```js
якщо (process.env.APP_TEST_DRIVER) {
  процес. n('повідомлення', onMessage)
}

async функція onMessage ({ msgId, cmd, args }) {
  let = METHODS[cmd]
  якщо (! ethod) method = () = () => new Error('Неприпустимий метод: ' + cmd)
  спробуйте {
    let resolve = await method(. .args)
    процес. кінець({ msgId, resolve })
  } ловити (помилка) {
    let reject = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    процесу. end({ msgId, reject })
  }
}

const METHODS = {
  isReady () {
    // внести будь-які налаштування, необхідні
    return true
  }
  // задайте ваші методи RPC-можна використати тут
}
```

Тоді, у вашому комплексі тестів, ви можете використовувати вашого тестового драйвера наступним чином:

```js
const test = require('ava')
const electronPath = require('electron')

let app = new TestDriver({
  path: electronPath,
  args: ['. app'],
  env: {
    NODE_ENV: 'test'
  }
})
тест.before(async t => {
  await app.isReady
})
тестів. fter.always('cleanup', async t => {
  await app.stop()
})
```
