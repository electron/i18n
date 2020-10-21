# Testare automată cu un driver personalizat

Pentru a scrie teste automate pentru aplicația ta Electron vei avea nevoie de un mod de a "conduce" aplicația ta. [Spectron](https://electronjs.org/spectron) este o soluție utilizată frecvent, care vă permite să emulați acțiunile utilizatorului prin [WebDriver](http://webdriver.io/). Cu toate acestea, este de asemenea posibil să vă scrieți propriul șofer personalizat folosind nodul IPC-over-STDIO încorporat. Beneficiul unui șofer personalizat este că tinde să necesite cheltuieli mai mici decât în cazul spectrului radio, și vă permite să expuneți metode personalizate la grupul de teste.

Pentru a crea un șofer personalizat, vom folosi API-ul [pentru copil_process](https://nodejs.org/api/child_process.html) Node.js. Suita de teste va genera procesul Electron, apoi va stabili un simplu protocol de mesagerie:

```js
const Process = require('child_process')
const electronPath = require('electron')

// spawn the process
const env = { /* . . */ }
const stdio = ['inherit', 'inherit', 'inherit', 'ipc']
const appProcess = childProcess. pawn(electronPath, ['./app'], { stdio, env })

// ascultă mesajele IPC din aplicația
aplicații. n('mesaj', (msg) => {
  // ...
})

// trimite un mesaj IPC către aplicația
appProcess.send({ my: 'message' })
```

Din interiorul aplicației Electron, poți asculta mesaje și trimite răspunsuri folosind procesul [Node.js](https://nodejs.org/api/process.html) API:

```js
// ascultă mesajele IPC din suita de teste
process.on('message', (msg) => {
  // ...
})

// trimite un mesaj IPC la suita de teste
proces.send({ my: 'message' })
```

Acum putem comunica din suita de teste către aplicația Electron folosind obiectul `appProcess`.

Pentru comoditate, poate doriți să încheiați `appProcess` într-un obiect șofer care oferă mai multe funcții de înalt nivel. Iată un exemplu despre cum poți face asta:

```js
class TestDriver {
  constructor ({ path, args, env }) {
    this. pcApeluri = []

    // începe procesul copil
    env. PP_TEST_DRIVER = 1 // anunță aplicația că ar trebui să asculte mesaje
    this.process = childProcess. pawn(cale, args, { stdio: ['inherit', 'inherit', 'ipc'], env })

    // manipulează răspunsurile rpc
    this.process. n ('mesaj', (message) => {
      // pop manipulatorul
      const rpcCall = acesta. pcApelează[message.msgId]
      dacă (!rpcCall) returnează
      aceasta. cApeluri[message.msgId] = null
      // reject/resolve
      if (message. ejectaţi) rpcCall.reject(message.reject)
      else rpcCall. esolve(message.resolve)
    })

    // așteaptă să te pregăte
    this.isReady = this.rpc('isReady'). atch(eroare) => {
      consolă. rror('Aplicația a eșuat', eroare)
      procesul this.stop()
      . xit(1)
    })
  }

  // apel RPC simplu
  // pentru a utiliza: șoferul. pc('method', 1, 2, 3).then(...)
  async rpc (cmd, ...args) {
    // trimite rpc request
    const msgId = this. pcCalls.length
    this.process. end({ msgId, cmd, args })
    returnează noua Promise((rezolvare, respingere) => this.rpcCalls. ush({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```

În aplicație trebuie să scrieți un simplu handler pentru apelurile RTP:

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

Apoi, în suita de teste, poți folosi șoferul de probă după cum urmează:

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
