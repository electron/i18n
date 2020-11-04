# الاختبار الآلي مع برنامج تشغيل مخصص

لكتابة الاختبارات التلقائية لتطبيق إلكترون الخاص بك، ستحتاج إلى طريقة "قيادة" تطبيقك. [Spectron](https://electronjs.org/spectron) هو حل شائع الاستخدام يتيح لك محاكاة إجراءات المستخدم عبر WebDriver </ 1>. ومع ذلك، من الممكن أيضا كتابة سائق مخصص الخاص بك باستخدام البني العقدة IPC-over-STDIO. الفائدة من برنامج تشغيل مخصص هو أنه يميل إلى تتطلب حمل أقل من Spectron ، ويسمح لك بتعريف الأساليب المخصصة إلى مجموعة الاختبار الخاصة بك.</p> 

لإنشاء مشغل مخصص، سوف نستخدم Node.js' [child_process](https://nodejs.org/api/child_process.html) API. ستصدر مجموعة الاختبار عملية إلكترون، ثم ستنشئ بروتوكول مراسلة بسيط:



```js
var childProcess = require('child_process')
var electronPath = require('electron')

// spawn the process
var env = { /* ... */ }
var stdio = ['inherit', 'inherit', 'inherit', 'ipc']
var appProcess = childProcess.spawn(electronPath, ['./app'], { stdio, env })

// listen for IPC messages from the app
appProcess.on('message', (msg) => {
  // ...
})

// أرسل رسالة IPC إلى التطبيق
appProcess.send({ my: 'message' })
```


من داخل تطبيق Electron ، يمكنك الاستماع للرسائل وإرسال الردود باستخدام عملية Node.js [](https://nodejs.org/api/process.html) API:



```js
// استمع إلى رسائل IPC من مجموعة الاختبار
process.on('message', (msg) => {
  // ...
})

// أرسل رسالة IPC إلى مجموعة الاختبار
العملية.send({ my: 'message' })
```


يمكننا الآن التواصل من مجموعة الاختبار إلى تطبيق إلكترون باستخدام كائن `تطبيق` العملية.

من أجل الملاءمة، قد ترغب في تغليف `عملية تطبيق` في كائن مشغل يوفر المزيد من الدوال الرفيعة المستوى. وفيما يلي مثال على كيفية القيام بذلك:



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
      var rpcCall = this.rpcCalls[message.msgId]
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
    var msgId = this.rpcCalls.length
    this.process.send({ msgId, cmd, args })
    return new Promise((resolve, reject) => this.rpcCalls.push({ resolve, reject }))
  }

  stop () {
    this.process.kill()
  }
}
```


في التطبيق، ستحتاج إلى كتابة معالج بسيط لمكالمات RPC:



```js
if (process.env.APP_TEST_DRIVER) {
  process.on('message', onMessage)
}

async function onMessage ({ msgId, cmd, args }) {
  var method = METHODS[cmd]
  if (!method) method = () => new Error('Invalid method: ' + cmd)
  try {
    var resolve = await method(...args)
    process.send({ msgId, resolve })
  } catch (err) {
    var reject = {
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


ثم في حقيبة الاختبار الخاصة بك، يمكنك استخدام محرك الاختبار على النحو التالي:



```js
var test = require('ava')
var electronPath = require('electron')

var app = new TestDriver({
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
