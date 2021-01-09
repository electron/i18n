# Automatizované testování s vlastním řidičem

Chcete-li psát automatické testy pro vaši Electron aplikaci, budete potřebovat způsob, jak "řídit" vaši aplikaci. [Spectron](https://electronjs.org/spectron) je běžně používané řešení, které umožňuje emulovat akce uživatele prostřednictvím [WebDriver](http://webdriver.io/). Nicméně, je také možné napsat vlastní ovladač pomocí vestavěného IPC-over-STDIO. Výhodou vlastního řidiče je, že má tendenci vyžadovat méně režijních nákladů než Spectron, a umožňuje vystavit vlastní metody vašemu testovacímu soupravě.

Pro vytvoření vlastního ovladače použijeme Node.js' [child_process](https://nodejs.org/api/child_process.html) API. Testovací sada spustí proces Electron a poté vytvoří jednoduchý protokol pro zasílání zpráv:

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

// pošlete IPC zprávu do aplikace
appProcess.send({ my: 'message' })
```

V rámci Electron aplikace můžete poslouchat zprávy a posílat odpovědi pomocí Node.js [procesu](https://nodejs.org/api/process.html) API:

```js
// poslouchejte zprávy IPC od testovací sady
proces.on('message', (msg) => {
  // ...
})

// pošlete IPC zprávu do testovací sady
proces.send({ my: 'message' })
```

Nyní můžeme komunikovat z testovací sady do aplikace Electron pomocí objektu `appProcess`.

Pro pohodlí můžete zabalit `appProcess` do objektu řidiče, který poskytuje více funkcí na vysoké úrovni. Zde je příklad, jak to můžete udělat:

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

V aplikaci je třeba napsat jednoduchý handler pro RPC hovory:

```js
if (process.env.APP_TEST_DRIVER) {
  process. n('zpráva', onMessage)
}

async funkce onMessage ({ msgId, cmd, args }) {
  let method = METHODS[cmd]
  if (! ethod) metoda = () => nová chyba ('Neplatná metoda: ' + cmd)
  Zkuste {
    let resolve = vyčkejte metodu(. proces .args)
    . end({ msgId, resolve })
  } catch (err) {
    let odmítnout = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    proces. end({ msgId, reject })
  }
}

const METHODS = {
  isReady () {
    // do jakéhokoli nastavení potřebný
    return true
  }
  // definujte metody RPC-able zde
}
```

Potom můžete ve svém testovacím balíku použít testovací ovladač takto:

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
test.before(async t => {
  await app.isReady
})
test. fter.always('cleanup', async t => {
  čeká na app.stop()
})
```
