# الاختبار الآلي مع برنامج تشغيل مخصص

لكتابة الاختبارات التلقائية لتطبيق إلكترون الخاص بك، ستحتاج إلى طريقة "قيادة" تطبيقك. [Spectron](https://electronjs.org/spectron) هو حل شائع الاستخدام يتيح لك محاكاة إجراءات المستخدم عبر WebDriver </ 1>. ومع ذلك، من الممكن أيضا كتابة سائق مخصص الخاص بك باستخدام البني العقدة IPC-over-STDIO. الفائدة من برنامج تشغيل مخصص هو أنه يميل إلى تتطلب حمل أقل من Spectron ، ويسمح لك بتعريف الأساليب المخصصة إلى مجموعة الاختبار الخاصة بك.</p> 

لإنشاء مشغل مخصص، سوف نستخدم Node.js' [child_process](https://nodejs.org/api/child_process.html) API. ستصدر مجموعة الاختبار عملية إلكترون، ثم ستنشئ بروتوكول مراسلة بسيط:



```js
Const childProcess = require('child_process')
const electronPath = require('electron')

// spawn the process
const env = { /* . */ }
ستديو = ['الإرث'، 'الإرث'، 'الإرث'، 'الإرث'، 'ipc']
Apst appProcess. باون(electronPath, ['./app'], { stdio, env })

// الاستماع لرسائل IPC من التطبيق
عملية التطبيق. لا ('رسالة', (msg) => {
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
الفئة TestDriver {
  الإنشاء ({ path, args, env }) {
    هذا. pcCalls = []

    // ابدأ عملية الطفل
    env. PP_TEST_DRIVER = 1 // أخبر التطبيق بأنه ينبغي أن يستمع للرسائل
    هذا.العملية = عملية الأطفال. pawn(pa, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })

    /// معالجة ردود rpc
    هذا.العملية. لا ('رسالة', (رسالة) => {
      // تبويب المعالج
      rpcCall = هذا. مكالمات[message.msgId]
      إذا كان (!rpcCall) يعود
      هذا. pccall[message.msgId] = فارغ
      // رفض/حل
      إذا (رسالة). إخراج) rpcCall.reft(message.reft)
      rpcall. esolve(message.resolve)
    })

    // انتظر جاهز
    هذا.isReady = this.rpc('isReady'). atch(err) => {
      وحدة تحكم rror('فشل في بدء التطبيق', خطأ)
      هذا.stop()
      العملية. xit(1)
    })
  }

  // مكالمة RPC بسيطة
  // لاستخدام: سائق. pc('method', 1, 2, 3).then(...)
  async rpc (md, ...args) {
    // إرسال طلب rpc
    const msgId = هذا. pcCalls.length
    هذا.العملية. end({ msgId, cmd, args })
    إرجاع Promise(resol, reft) => this.rpcalls. دفع({ resolve, reject }))
  }

  توقف () {
    هذا.process.kill()
  }
}
```


في التطبيق، ستحتاج إلى كتابة معالج بسيط لمكالمات RPC:



```js
إذا (process.env.APP_TEST_DRIVER) {
  العملية. لا ('رسالة', onMessage)
}

async onMessage ({ msgId, cmd, args }) {
  اترك الأسلوب = METHODS[cmd]
  اذا (! طريقة الإيثود) = () => خطأ جديد ('طريقة غير صحيحة: ' + cmd)
  حاول {
    حل المتغير = انتظار الطريقة (. .args)
    العملية. end({ msgId, resolve })
  } اصطياد (خطأ) {
    رفض واحد = {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    العملية. end({ msgId, reject })
  }
}

const METHODS = {
  isجاهز () {
    // قم بأي إعداد يحتاج إليه
    Retrue
  }
  // / / حدد الأساليب الخاصة بك RPC-RPC هنا
}
```


ثم في حقيبة الاختبار الخاصة بك، يمكنك استخدام محرك الاختبار على النحو التالي:



```js
اختبار const = مطلوب('ava')
const electronPath = require('electron')

const app = New TestDriver({
  path: electronPath,
  args: ['. تطبيق']،
  env: {
    NODE_ENV: 'test'
  }
})
test.bepre(async t => {
  await app.isReady
})
اختبار. fter.always('Cleup', async t => {
  ينتظر التطبيق.stop()
})
```
