# Automatizované testování s vlastním řidičem

Chcete-li psát automatické testy pro vaši Electron aplikaci, budete potřebovat způsob, jak "řídit" vaši aplikaci. [Spectron](https://electronjs.org/spectron) is a commonly-used solution which lets you emulate user actions via [WebDriver](https://webdriver.io/). Nicméně, je také možné napsat vlastní ovladač pomocí vestavěného IPC-over-STDIO. Výhodou vlastního řidiče je, že má tendenci vyžadovat méně režijních nákladů než Spectron, a umožňuje vystavit vlastní metody vašemu testovacímu soupravě.

Pro vytvoření vlastního ovladače použijeme Node.js' [child_process](https://nodejs.org/api/child_process.html) API. Testovací sada spustí proces Electron a poté vytvoří jednoduchý protokol pro zasílání zpráv:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// spawn the process
const env = { /* . . */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = dětský proces. pawn(electronPath, ['./app'], { stdio, env })

// naslouchat IPC zprávám aplikace
. n('message', (msg) => {
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
třída TestDriver {
  konstruktor ({ path, args, env }) {
    tohoto. pcCall = []

    // start child process
    cv. PP_TEST_DRIVER = 1 // nechte aplikaci vědět, že by měla naslouchat zprávám
    this.process = dětský process. pawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // zpracovat rpc odpovědi
    tohle.process. n('zpráva', (zpráva) => {
      // pop handler
      const rpcCall = tohle volání[message.msgId]
      , pokud (!rpcall) vrátí
      to. pchovory[message.msgId] = null
      // odmítnutí / vyřešení
      pokud (zpráva). eject) rpcCall.reject(message.reject)
      else rpcall. esolve(message.resolve)
    })

    // čekat na připravenost
    this.isReady = this.rpc('isReady'). atch((err) => {
      konzola. rror('Application failed to start', err)
      this.stop()
      process. xit(1)
    })
  }

  // jednoduché RPC volání
  // k použití: řidič. pc('method', 1, 2, 3).then(...)
  async rpc (cmd, ...args) {
    // send rpc request
    const msgId = to. pcCalls.length
    this.process. end({ msgId, cmd, args })
    vrátí nový Promise((vyřešit, odmítnout) => this.rpchovorů. ush({ resolve, reject }))
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
    const resolve = await method(. proces .args)
    . end({ msgId, resolve })
  } catch (err) {
    const odmítne = {
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
  čeká na app.stop()
})
```
