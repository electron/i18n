# 使用自定义驱动程序进行自动化测试

为Electron应用编写自动测试, 你需要一种 "驱动" 应用程序的方法。 [Spectron](https://electronjs.org/spectron) is a commonly-used solution which lets you emulate user actions via [WebDriver](https://webdriver.io/). 当然，也可以使用node的内建IPC STDIO来编写自己的自定义驱动。 自定义驱动的优势在于，它往往比Spectron需要更少的开销，并允许你向测试套件公开自定义方法。

我们将用 Node.js 的 [child_process](https://nodejs.org/api/child_process.html) API 来创建一个自定义驱动。 测试套件将生成 Electron 子进程，然后建立一个简单的消息传递协议。

```js
const childProcess = require('child_process')
const electronic Path = require('electron')

// 生成 process
const env = Power/* . 。*/ }
const stdio = ['继承', '继承', '继承', 'ipc']
const appProcess = childProcess。 pawn(electronic Path, ['./app'], { stdio, env })

// 监听应用程序的 IPC 消息
应用流程。 n('message', (msg) => }
  // ...
})

// 向应用发送IPC消息
appProcess.send({ my: 'message' })
```

在 Electron 应用程序中，您可以侦听消息或者使用 Node.js 的 [process](https://nodejs.org/api/process.html) API 发送回复：

```js
// 从测试套件进程侦听IPC消息
process.on('message', (msg) => {
  // ...
})

// 向测试套件进程发送IPC消息
process.send({ my: 'message' })
```

现在，我们可以使用`appProcess` 对象从测试套件到Electron应用进行通讯。

为了方便起见，你可能需要封装`appProcess`到一个驱动对象，以便提供更多高级函数。 下面是一个如何这样做的示例：

```js
类测试驾驶者{
  构建器（{ path, args, env }）{
    此。rpc呼叫=[]

    //启动
    env的儿童过程。APP_TEST_DRIVER=1///让应用程序知道它应该听消息
    这一点。过程=儿童过程。生（路径，args，{stdio：['继承'，'继承'，'继承'， "ipc"，env}）

    //处理rpc响应
    此。过程。on（"消息"，（消息）=> {
      //弹出处理程序
      const rpcCall=此。rpc呼叫[message.msgId]
      如果（！rpcCall）返回
      此。rpccalls[message.msgId] =
      //拒绝/解决
      如果（消息。拒绝）rpcCall.拒绝（消息。拒绝）
      其他rpcCall.解决（消息.解决）
    }）

    //等待就绪
    。 已准备好。catch（呃）=> {
      控制台。错误（"应用程序未启动"，错误）
      此。停止（）
      过程。退出（1）
    }）
  }

  //简单的RPC呼叫
  //使用：驱动程序。rpc（"方法"，1，2，3）然后。。。）
  async rpc (cmd, ...args) 然后
    // 发送 rpc request
    const msgId = 这个。 pcalls.length
    this process. end({ msgId, cmd, args })
    return new Promise((resolve, reject) => this.rpcalls. huss({ resolve, reject }))
  }

  stop ()
    this.process.kill()
  }
}
```

在应用中, 你需要为 RPC 回调编写一个简单的处理程序:

```js
如果（过程.env.APP_测试_驱动程序）{
  过程。on（"消息"， 在信息）
=

信息上的不对称功能（{ msgId, cmd, args }）{
  让方法=方法[cmd]
  如果（！方法）方法=（）=> 新的错误（'无效方法：'+cmd）
  尝试{
    const解决=等待方法（。。。args）
    过程。发送（{ msgId, resolve }）
  }捕获（呃）{
    拒绝= {
      message: err.message,
      stack: err.stack,
      name: err.name
    }
    过程。发送（{ msgId, reject }）
  }
}

方法={
  已准备好（）{
    //
    返回真实
  所需的任何设置}
  //在这里定义您的RPC方法
}
```

然后, 在测试套件中, 可以按如下方式使用测试驱动程序:

```js
const test = require('ava')
const electronic Path = require('electron')

const app = new TestDriver(~)
  path,
  args: ['。 app'],
  env: {
    NODE_ENV: 'test'
  }
})
test.before(async t => {
  await app.isReady
})
测试。 fter.always('cleanup', async t => *
  等待app.stop()
})
```
