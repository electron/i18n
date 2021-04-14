# カスタムドライバを使った自動テスト

Electron アプリの自動テストを作成するには、アプリケーションを「ドライブ」する方法が必要になります。 [Spectron](https://electronjs.org/spectron) は、[WebDriver](https://webdriver.io/) を介してユーザの操作をエミュレートする、一般的な解決方法です。 ただし、Node に組み込まれている IPC 越し標準入出力を使用して独自のカスタムドライバを書くことも可能です。 カスタムドライバの利点は、Spectron よりもオーバーヘッドが少なくて済むことです。また、カスタムメソッドをあなたのテストスイートに公開できます。

カスタムドライバを作成するには、Node.js の [child_process](https://nodejs.org/api/child_process.html) API を使用します。 テストスイートは、以下のように Electron プロセスを spawn してから、簡単なメッセージングプロトコルを確立します。

```js
constプロセス = child_process
コンスト電子パス = 必要 ('電子')

/
/ コンスト env = { /*
. '継承'、'継承'、'ipc']
コンストプロセス = childProcess.spawn(電子パス、'/app', { stdio, env })

// アプリ
appProcess.on('message')、(メッセージ) => {
  // .
})

// アプリへ IPC メッセージを送る
appProcess.send({ my: 'message' })
```

Electron アプリケーション内からは、Node.js の [process](https://nodejs.org/api/process.html) API を使用して、メッセージをリッスンして返信を送信できます。

```js
// テストスイートからの IPC メッセージをリッスンする
process.on('message', (msg) => {
  // ...
})

// テストスイートへ IPC メッセージを送る
process.send({ my: 'message' })
```

これで、`appProcess` オブジェクトを使用してテストスイートから Electron アプリケーションに通信できます。

利便性のために、より高度な機能を提供するドライバオブジェクトで `appProcess` をラップすることをお勧めします。 以下は、これをどのようにするかの例です。

```js
クラス TestDriver {
  コンストラクター ({ path, args, env }) {
    this.rpcCalls = []

    子プロセスを開始します
    env。APP_TEST_DRIVER = 1 // this.process = childProcess.spawn(パス、args、{stdio: [継承する]、[継承する'、'継承'、"
    メッセージをリッスンする必要があることをアプリに知らせます。 'ipc']、env })

    // rpc 応答
    this.process.on('message') => {
      // const rpcCall = this.rpcCall
[message.msgId]
      (rpc[message.msgId] Call) が   場合
      は 、=null
      // 拒否/解決
      (メッセージ) .reject) rpcCall.reject (message.reject)
      他の rpcCall.resolve(message.resolve)
    }

    //
    //
    準備完了を待ちます 。.isReady = this.rpc('isReady').catch((> ) =
      コンソール.エラー('アプリケーションが開始できませんでした)、

  プロセスを
      this.stop
      (1)
  
  ): ドライバー.rpc('メソッド', 1, 2, 3).その後().
  非同期 rpc (cmd, ..args) {
    // rpc 要求
    msgId = this.rpcCalls.length
    this.process.send({ msgId, cmd, args })
    返す新しい約束 (((解決、拒否){ resolve, reject }> =

    

  終了 )  終了 ( this.process.kill()
  }
} }
```

このアプリでは、RPC 呼び出しのために簡単なハンドラを作成する必要があります。

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
    // ここで必要なセットアップをします
    return true
  }
  // ここで RPC 可能なメソッドを定義します
}
```

すると、テストスイート内では、以下のようにテストドライバを使用できます。

```js
const test = require('ava')
const electronPath = require('electron')

const app = new TestDriver({
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
