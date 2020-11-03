# Автоматичне тестування за допомогою користувацького драйвера

Щоб записати автоматичні тести для вашого застосунку, вам знадобиться спосіб "диску" вашого додатку. [Spectron](https://electronjs.org/spectron) is a commonly-used solution which lets you emulate user actions via [WebDriver](https://webdriver.io/). Однак, також можна написати власний драйвер з використанням вбудованого вузла IPC-over-STDIO. Перевага від користувальницького водія полягає в тому, що він вимагає менше накладних витрат, ніж Spectron, і дозволяє розкрити користувацькі методи для вашого набору тестів.

Щоб створити користувальницький драйвер, ми будемо використовувати Node.js' [child_process](https://nodejs.org/api/child_process.html) API. Цей тестовий набір генерує процес Electron та встановить простий протокол обміну повідомленнями:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// вивести процес
const env = { /* ... */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
конст appProcess = childProcess.spawn(electronPath, ['. app'], { stdio, env })

// прослуховуйте IPC повідомлення з додатку
appProcess.on('message', (msg) => {
...
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
  конструктор ({ path, args, env }) {
    це. pcCalls = []

    // почати дочірній процес
    env. PP_TEST_DRIVER = 1 // повідомте додаток, що він має слухати повідомлення
    . rocess = childProcess. pawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // обробити rpc відповіді
    це. яка. n('повідомлення', (message) => {
      // pop handler
      const rpcCall = це. pcCalls[message.msgId]
      , якщо (!rpcCall) повернув
      цього. pcCalls[message.msgId] = null
      // reject/resolve
      , якщо (повідомлення. eject) rpcCall.reject(message.reject)
      else rpcCall.resolve(повідомлення. esolve)
    })

    // чекайте готовності
    this.isReady = this.rpc('isReady'). atch((err) => {
      console.error('Програма не вдалося запустити', err)
      це. top ()
      процес. xit(1)
    })
  }

  // простий RPC виклик
  // для використання: драйвер. pc('метод', 1, 2, 3).then(. .)
  async rpc (смд, ... rgs) {
    // надішліть запит rpc
    const msgId = таким чином. pcCalls.length
    цього процесу. end({ msgId, cmd, args })
    return new Promise(врегульувати, reject) => this.rpcCalls. ush({ resolve, reject }))
  }

  зупинити () {
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
    const resolve = await method(. .args)
    процес. кінець({ msgId, resolve })
  } зловити (помилка) {
    паралельно відхилити = {
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

const app = new TestDriver({
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
