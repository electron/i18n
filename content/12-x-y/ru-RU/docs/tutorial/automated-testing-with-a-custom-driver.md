# Автоматическое тестирование с помощью собственного драйвера

Для написания автоматических тестов для вашего приложения Electron вам понадобится способ "управлять" вашим приложением. [Spectron](https://electronjs.org/spectron) is a commonly-used solution which lets you emulate user actions via [WebDriver](https://webdriver.io/). Тем не менее, также можно написать свой собственный драйвер с помощью встроенного в узел IPC-over-STDIO. Преимущество собственного драйвера состоит в том, что он требует меньше служебных данных, чем Spectron, и позволяет вам использовать собственные методы для вашего набора тестов.

Чтобы создать собственный драйвер, мы будем использовать Node.js API [child_process](https://nodejs.org/api/child_process.html). Набор тестов вызовет процесс Electron, а затем установит простой протокол обмена сообщениями:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// порождаем процесс
const env = { /* . . */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = childProcess. pawn(electronPath, ['./app'], { stdio, env })

// прослушивание сообщений IPC из приложения
appProcess. n('message', (msg) => {
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

Для удобства, вы можете обернуть `appProcess` в объект драйвера, который предоставляет более высокоуровневые функции. Вот пример того, как вы можете это сделать:

```js
class TestDriver {
  конструктор ({ path, args, env }) {
    это. pcCalls = []

    // запуск дочернего процесса
    env. PP_TEST_DRIVER = 1 // дайте приложению знать, что оно должно слушать сообщения
    this.process = childProcess. pawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // обрабатываем ответы rpc
    this.process. n('сообщение', (message) => {
      // pop the handler
      const rpcCall = this. pccalls[message.msgId]
      если (!rpcCall) возвращают
      это. pccalls[message.msgId] = null
      // отвергнуть/решить
      если (сообщение). eject) rpcCall.reject(message.reject)
      else rpcall. esolve(message.resolve)
    })

    // ожидание готовности
    this.isReady = this.rpc('isReady'). atch(err) => {
      консоли. rror('Application failed start', err)
      this.stop()
      . xit(1)
    })
  }

  // простой RPC-вызов
  // к использованию: драйвер. pc ('метод', 1, 2, 3).затем(...)
  async rpc (cmd, ...args) {
    // send rpc request
    const msgId = this. pcCalls.length
    это.процесс. end({ msgId, cmd, args })
    вернуть новый Promise(resolve, reject) => this.rpcalls. ush({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

В приложении вам нужно будет написать простой обработчик для вызовов RPC:

```js
if (process.env.APP_TEST_DRIVER) { процесс
  . n('сообщение', onMessage)
}

асинхронная функция onMessage ({ msgId, cmd, args }) {
  let method = METHODS[cmd]
  if (! ethod) метод = () => new Error('Недопустимый метод: ' + cmd)
  try {
    const resolve = await method(. ggs)
    процесс. end({ msgId, resolve })
  } catch (err) {
    const reject = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    process end({ msgId, reject })
  }
}

const METHODS = {
  isReady () {
    // делаем любые установки, необходимые
    return true
  }
  // определяем ваши RPC-доступные методы здесь
}
```

Затем в тесте можно использовать тестовый драйвер следующим образом:

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
test.before(async t => {
  await app.isReady
})
test. fter.always('cleanup', async t => {
  await app.stop()
})
```
