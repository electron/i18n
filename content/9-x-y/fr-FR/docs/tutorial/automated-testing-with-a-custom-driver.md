# Test automatisé avec un driver personnalisé

Afin d'écrire des tests automatisés pour votre application Electron, vous aurez besoin d'un moyen de "piloter" votre application. [Spectron](https://electronjs.org/spectron) est une solution usuelle, qui vous laisse émuler des actions utilisateur avec [WebDriver](http://webdriver.io/). Toutefois, il est également possible d'écrire votre propre driver personnalisé avec l'IPC-over-STDIO intégré à node.js. L'avantage d'un driver personnalisé est qu'il demande moins de ressources que Spectron, et qu'il vous laisse éprouver des méthodes personnalisées à votre suite de tests.

Pour créer un pilote personnalisé, nous utiliserons l'API [child_process](https://nodejs.org/api/child_process.html) de Node.js. La suite de tests fera apparaître le processus Electron, puis établira un protocole de messagerie basique :

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

// send an IPC message to the app
appProcess.send({ my: 'message' })
```

Depuis l'application Electron, vous pouvez écouter des messages et envoyer des réponses en utilisant l'API Node.js [process](https://nodejs.org/api/process.html):

```js
// listen for IPC messages from the test suite
process.on('message', (msg) => {
  // ...
})

// send an IPC message to the test suite
process.send({ my: 'message' })
```

Nous pouvons maintenant communiquer de la suite de tests à l'application Electron en utilisant l'objet `appProcess`.

Pour plus de commodité, vous voudrez peut-être envelopper `appProcess` dans un objet pilote qui fournit plus de fonctions de haut niveau. Voici un exemple de la façon dont vous pouvez faire ceci :

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

Dans l'application, vous devrez écrire un gestionnaire simple pour les appels RPC :

```js
if (process.env.APP_TEST_DRIVER) {
  processus. n('message', onMessage)
}

fonction asynchrone onMessage ({ msgId, cmd, args }) {
  let méthode = METHODS[cmd]
  if (! ethod) method = () => new Error('Méthode invalide : ' + cmd)
  try {
    let resolve = wait method(. .args)
    processus. end({ msgId, resolve })
  } catch (err) {
    let reject = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    process. end({ msgId, reject })
  }
}

const METHODS = {
  isReady () {
    // exécute toutes les configurations nécessaires
    return true
  }
  // définissez vos méthodes RPC ici
}
```

Ensuite, dans votre suite de test, vous pouvez utiliser votre pilote de test comme suit:

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
test. fter.always('nettoyage', async t => {
  attendent app.stop()
})
```
