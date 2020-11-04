# Automatyczne testowania z pomocą niestandardowego sterownika

Aby zapisywać zautomatyzowane testy dla twojej aplikacji Electron, będziesz potrzebował sposobu na "dyskowanie" aplikacji. [Spectron](https://electronjs.org/spectron) to często używane rozwiązanie, które pozwala emulować działania użytkownika przez [WebDriver](http://webdriver.io/). Możliwe jest jednak również zapisanie własnego sterownika za pomocą wbudowanego IPC węzła poza STDIO. Zaletą niestandardowego sterownika jest to, że zazwyczaj wymaga on mniej uderzeń niż Spectron, i pozwala ujawnić niestandardowe metody swojemu zestawowi testowemu.

Aby utworzyć własny kierowcę, używamy API Node.js' [child_process](https://nodejs.org/api/child_process.html). Pakiet testowy pojawi się proces Electrona, a następnie ustanowi prosty protokół wiadomości:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// spawn the process
const env = { /* . . */ }
const stdio = ['dziedziczenie', 'dziedziczenie', 'ipc']
const appProcess = potomstwo. pawn(electronPath, ['./app'], { stdio, env })

// nasłuchuj wiadomości IPC z aplikacji
appProces. n('message', (msg) => {
  // ...
})

// wyślij wiadomość IPC do aplikacji
appProcess.send({ my: 'message' })
```

Z aplikacji Electron możesz słuchać wiadomości i wysyłać odpowiedzi za pomocą procesu Node.js [](https://nodejs.org/api/process.html) API:

```js
// nasłuchuj wiadomości IPC z pakietu testowego
process.on('message', (msg) => {
  // ...
})

// wyślij wiadomość IPC do testowego zestawu
process.send({ my: 'message' })
```

Możemy teraz komunikować się z pakietu testowego do aplikacji Electron za pomocą obiektu `appProcess`.

Dla wygody, możesz zebrać `appProcess` w obiekcie sterownika, który zapewnia więcej funkcji wysokiego poziomu. Oto przykład tego, jak można to zrobić:

```js
klasa TestDriver {
  konstruktor ({ path, args, env }) {
    to. pcCCall = []

    // rozpocznij proces potomny
    env. PP_TEST_DRIVER = 1 // poinformuj aplikację, że powinna słuchać wiadomości
    to.process = proces dziecięcy. pawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // obsłużyć odpowiedzi rpc
    this.process. n('wiadomość', (message) => {
      // wyskakuje program obsługi
      const rpcCall = to. pcCCall[message.msgId]
      jeśli (!rpcCall) zwróci to
      . pcCCall[message.msgId] = null
      // reject/resolve
      jeśli (wiadomość. eject) rpcCall.reject(message.reject)
      else rpcCall. esolve(message.resolve)
    })

    // czekaj na gotowy
    this.isReady = this.rpc('isReady'). atch((err) => {
      konsola. rror('Aplikacja nie została uruchomiona, err)
      this.stop()
      proces. xit(1)
    })
  }

  // proste połączenie RPC
  // aby użyć: kierowca. pc('metoda', 1, 2, 3).to(...)
  async rpc (cmd, ...args) {
    // wyślij żądanie rpc
    const msgId = to. [PLACEHOLDER] pcCCcalls.length
    this.process. end({ msgId, cmd, args })
    zwraca nowe Promise((resolve, reject) => this.rpcCcalls. ush({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

W aplikacji musisz napisać prosty program obsługi połączeń RPC:

```js
if (process.env.APP_TEST_DRIVER) {
  proces. n('wiadomość', onMessage)
}

funkcja asynchroniczna ({ msgId, cmd, args }) {
  let method = METHODS[cmd]
  jeśli (! ethod) method = () => new Error('Invalid method: ' + cmd)
  try {
    const resolve = oczekiwanie (. .args)
    proces. end({ msgId, resolve })
  } złapanie (err) {
    const reject = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    proces. end({ msgId, reject })
  }
}

const METHODS = {
  isReady () {
    // zrób potrzebne konfiguracje
    return true
  }
  // zdefiniuj metody RPC tutaj
}
```

Następnie, w zestawie testowym, możesz użyć sterownika testowego w następujący sposób:

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
test.before(async => {
  await app.isReady
})
test. fter.always('cleanup', async t => {
  oczekuje app.stop()
})
```
