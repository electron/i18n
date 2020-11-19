# Geautomatiseerd testen met een aangepast stuurprogramma

Om geautomatiseerde tests voor je Electron app te schrijven heb je een manier nodig om je applicatie te "schijven". [Spectron](https://electronjs.org/spectron) is a commonly-used solution which lets you emulate user actions via [WebDriver](https://webdriver.io/). Het is echter ook mogelijk om uw eigen aangepaste stuurprogramma te schrijven met behulp van ingebouwde IPC-overSTDIO. Het voordeel van een custom driver is dat het minder overhead vereist dan Spectron, en laat je aangepaste methoden aan je testset blootstellen.

Om een aangepast stuurprogramma te maken, gebruiken we Node.js' [child_process](https://nodejs.org/api/child_process.html) API. De test suite zal het Electron proces starten en vervolgens een eenvoudig berichtenprotocol instellen:

```js
const childProcess = require('child_process')
const electronPath = require('electron')

// spawn het proces
const env = { /* . . */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = kinderproces. pawn(electronPath, ['./app'], { stdio, env })

// luisteren naar IPC berichten van de app
app-proces. n('message', (msg) => {
  // ...
})

// stuur een IPC bericht naar de app
appProcess.send({ my: 'message' })
```

Van binnen de Electron app, kunt u naar berichten luisteren en antwoorden sturen met behulp van de Node.js [proces](https://nodejs.org/api/process.html) API:

```js
// luisteren voor IPC berichten van de test suite
process.on('message', (msg) => {
  // ...
})

// stuur een IPC-bericht naar het testsuite
process.send({ my: 'message' })
```

We kunnen nu vanuit de testsuite communiceren met de Electron app via het `appProcess` object.

Voor het gemak kunt u `appProcess` in een bestuurder object wikkelen dat meer hoogwaardige functies biedt. Hier is een voorbeeld van hoe je dit kunt doen:

```js
class TestDriver {
  constructor ({ path, args, env }) {
    dit. pcalls = []

    // start subproces
    env. PP_TEST_DRIVER = 1 // laat de app weten dat hij moet luisteren naar berichten
    this.process = kinderproces. pawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    // handle rpc response
    this.process. n('bericht', (message) => {
      // pop de handler
      const rpcCall = dit. pcalls[message.msgId]
      als (!rpcall)
      keer terug. pcalls[message.msgId] = null
      // afkeuren/oplossen
      als (bericht. eject) rpcall.reject(message.reject)
      anderen rpcall. esolve(message.resolve)
    })

    // wacht op gereed
    this.isReady = deis.rpc('isReady'). atch(err) => {
      console. rror('Applicatie kan niet starten', err)
      this.stop()
      proces. xit(1)
    })
  }

  // eenvoudige RPC call
  // to gebruiken: driver. pc('method', 1, 2, 3).then(...)
  async rpc (cmd, ...args) {
    // stuur rpc request
    const msgId = dit. pcalls.length
    this.process. end({ msgId, cmd, args })
    retourneert nieuwe beloften (resolve, reject) => this.rpcalls. ush({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

In de app moet je een eenvoudige handler schrijven voor de RPC-oproepen:

```js
if (process.env.APP_TEST_DRIVER) {
  proces. n('bericht', onMessage)
}

async functie onMessage ({ msgId, cmd, args }) {
  let methode = METHODS[cmd]
  als (! ethod) methode = () => nieuwe fout('Ongeldige methode: ' + cmd)
  probeer {
    const resolve = wacht method(. .args)
    proces. end({ msgId, resolve })
  } catch (err) {
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
    // doe elke setup nodig
    return true
  }
  // definieer je RPC-able methoden hier
}
```

Vervolgens kunt u in uw testset uw test-driver op de volgende manier gebruiken:

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
  wacht app.stop()
})
```
