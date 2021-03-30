# Electron での MessagePort

[`MessagePort`][] は、異なるコンテキスト間でメッセージを受け渡すことができるウェブ機能です。 `window.postMessage` に似ていますが、こちらはチャンネルが別々になります。 このドキュメントの目的は、Electron で拡張した Channel Messaging モデルの説明と、アプリ内での MessagePort の使用方法の例示です。

MessagePort がどのようなものでどのように動作するのかを、以下で簡単に説明します。

```js
// renderer.js ///////////////////////////////////////////////////////////////
// MessagePort のペアを作成します。 接続されたメッセージポートのペアを
// チャンネルといいます。
const channel = new MessageChannel()

// port1 と port2 の違いは、その使い方だけです。 port1 に
// 送信されたメッセージは port2 で受信され、逆も同様です。
const port1 = channel.port1
const port2 = channel.port2

// 受信側がリスナーを登録する前にそのチャンネルへメッセージを送信しても
// 大丈夫です。 リスナーが登録されるまでメッセージはキューに溜められます。
port2.postMessage({ answer: 42 })

// ここでチャネルの他方である port1 をメインプロセスに送信します。 MessagePort を
// 他のフレームや Web Worker などに送信することも可能です。
ipcRenderer.postMessage('port', null, [port1])
```

```js
// main.js ///////////////////////////////////////////////////////////////////
// メインプロセスでは、ポートを受け取ります。
ipcMain.on('port', (event) => {
  // メインプロセスで MessagePort を受信すると、それは
  // MessagePortMain に変化します。
  const port = event.ports[0]

  // MessagePortMain はウェブ方式のイベント API ではなく
  // Node.js 方式のイベント API を使用しています。 そのため .onmessage = ... ではなく .on('message', ...) とします。
  port.on('message', (event) => {
    // data は { answer: 42 }
    const data = event.data
  })

  // MessagePortMain は .start() メソッドが呼ばれるまでメッセージをキューに溜めます。
  port.start()
})
```

[Channel Messaging API][] のドキュメントは、MessagePort の動作原理をより詳しく知るのによいでしょう。

## メインプロセスでの MessagePort

レンダラーでの `MessagePort` クラスは、ウェブ上とまったく同じように動作します。 メインプロセスはウェブページではありませんが、Blink と統合していないので `MessagePort` や `MessageChannel` のクラスがありません。 メインプロセスで MessagePort をハンドルしてやり取りするために、Electron は 2 つの新しいクラス [`MessagePortMain`][] と [`MessageChannelMain`][] を追加しています。 これらはレンダラーの類似クラスと同様に動作します。

`MessagePort` オブジェクトは、レンダラープロセスかメインプロセスのいずれかで作成し、[`ipcRenderer.postMessage`][] や [`WebContents.postMessage`][] メソッドを使用して反対側へ送ります。 注意として、`send` や `invoke` のような通常の IPC メソッドは `MessagePort` の転送に使用できず、`postMessage` メソッドだけが `MessagePort` を転送できます。

メインプロセス経由で `MessagePort` を渡すと、他の方法では (同一オリジン制限などのため) 通信できないかもしれない 2 つのページを接続できます。

## 拡張: `close` イベント

Electron は `MessagePort` をより便利にするため、ウェブにない機能を追加しました。 それは、チャンネルの反対側が閉じられたときに発火する `close` イベントです。 ポートはガベージコレクションによって暗黙的に閉じることもあります。

レンダラーでは、`port.onclose` に代入するか `port.addEventListener('close', ...)` を呼ぶことで `close`イベントをリッスンできます。 メインプロセスでは、`port.on('close', ...)` を呼ぶことで `close` イベントをリッスンできます。

## ユースケース例

### ワーカープロセス

この例では、アプリに隠しウインドウとして実装されたワーカープロセスがあります。 メインプロセスを介して中継する際のパフォーマンスオーバーヘッドをなくして、アプリのページとワーカープロセスが直接通信できるようにしたいとします。

```js
// main.js ///////////////////////////////////////////////////////////////////
const { BrowserWindow, app, ipcMain, MessageChannelMain } = require('electron')

app.whenReady().then(async () => {
  // ワーカープロセスは隠し BrowserWindow であるため、Blink のすべての
  // コンテキスト (<canvas>, audio, fetch() などを含む) にアクセスできます。
  const worker = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true }
  })
  await worker.loadFile('worker.html')

  // メインウインドウはワーカープロセスへ仕事を送り、
  // MessagePort を介して結果を受信します。
  const mainWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: true }
  })
  mainWindow.loadFile('app.html')

  // 返信で MessagePort を転送する必要があるので、
  // ここで ipcMain.handle() は使えません。
  ipcMain.on('request-worker-channel', (event) => {
    // セキュリティ上の理由から、期待するフレームだけが
    // ワーカーにアクセスできるようにしておきましょう。
    if (event.senderFrame === mainWindow.webContents.mainFrame) {
      // 新しいチャンネルを作成し...
      const { port1, port2 } = new MessageChannelMain()
      // ...その一方をワーカーへ送り...
      worker.webContents.postMessage('new-client', null, [port1])
      // ...そしてもう一方をメインウインドウへ送ります。
      event.senderFrame.postMessage('provide-worker-channel', null, [port2])
      // これでメインウインドウとワーカーがメインプロセスを介さずに
      // 通信できるようになりました!
    }
  })
})
```

```html
<!-- worker.html ------------------------------------------------------------>
<script>
const { ipcRenderer } = require('electron')

function doWork(input) {
  // CPU の力が必要な処理。
  return input * 2
}

// 複数のウィンドウがある、メインウインドウがリロードされた、
// などの場合に複数クライアントを取得することがあります。
ipcRenderer.on('new-client', (event) => {
  const [ port ] = event.ports
  port.onmessage = (event) => {
    // イベントデータは任意のシリアライズ可能なオブジェクトにできます
    // (イベントに他の MessagePort を載せることもできます!)
    const result = doWork(event.data)
    port.postMessage(result)
  }
})
</script>
```

```html
<!-- app.html --------------------------------------------------------------->
<script>
const { ipcRenderer } = require('electron')

// ワーカーとの通信に使用できるチャンネルを送るように
// メインプロセスへ要求します。
ipcRenderer.send('request-worker-channel')

ipcRenderer.once('provide-worker-channel', (event) => {
  // 返信を受け取ったら、ポートを取り出し...
  const [ port ] = event.ports
  // ...結果を受信するハンドラを登録したら...
  port.onmessage = (event) => {
    console.log('received result:', event.data)
  }
  // ...メッセージを送信して動かしましょう!
  port.postMessage(21)
})
</script>
```

### ストリームの返信

Electron の組み込み IPC メソッドは、一方向通信 (`send` など) と送信に対する返信 (`invoke` など) の 2 つのモードしかサポートしていません。 MessageChannel を使用すれば、一つのリクエストに対してデータのストリームで応答する "応答ストリーム" を実装できます。

```js
// renderer.js ///////////////////////////////////////////////////////////////

function makeStreamingRequest (element, callback) {
  // MessageChannel は軽量なので、リクエストごとに新規作成してもコストが
  // かかりません。
  const { port1, port2 } = new MessageChannel()

  // 一方のポートをメインプロセスへ送り...
  ipcRenderer.postMessage(
    'give-me-a-stream',
    { element, count: 10 },
    [port2]
  )

  // ...もう一方は持っておきます。 メインプロセスはその一方のポートに
  // メッセージを送り、終了すればこれを閉じます。
  port1.onmessage = (event) => {
    callback(event.data)
  }
  port1.onclose = () => {
    console.log('stream ended')
  }
}

makeStreamingRequest(42, (data) => {
  console.log('got response data:', event.data)
})
// "got response data: 42" が 10 回見えるでしょう。
```

```js
// main.js ///////////////////////////////////////////////////////////////////

ipcMain.on('give-me-a-stream', (event, msg) => {
  // レンダラーから応答を送信するための MessagePort が
  // 送られてきます。
  const [replyPort] = event.ports

  // ここではメッセージを同期的に送信していますが、ポートを保存しておけば
  // 非同期的なメッセージ送信も同じくらい簡単にできます。
  for (let i = 0; i < msg.count; i++) {
    replyPort.postMessage(msg.element)
  }

  // 終わったらポートを閉じて、もうメッセージを送信しないことを
  // 相手に示します。 これは厳密には必要ではありません。
  // 明示的にポートを閉じなければ最終的にガベージコレクションされ、
  // レンダラーの 'close' イベントも発生するでしょう。
  replyPort.close()
})
```

### コンテキストが分離されたページのメインプロセスとメインワールド間で直接やり取りする

[コンテキスト分離][] が有効になっている場合、メインプロセスからレンダラーへの IPC メッセージは、メインワールドではなく分離されたワールドへ送られます。 分離したワールドを介さずに、メインワールドへ直接メッセージを送りたいこともあるでしょう。

```js
// main.js ///////////////////////////////////////////////////////////////////
const { BrowserWindow, app, MessageChannelMain } = require('electron')
const path = require('path')

app.whenReady().then(async () => {
  // contextIsolation が有効な BrowserWindow を作成します。
  const bw = new BrowserWindow({
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  bw.loadURL('index.html')

  // この一方のチャンネルを、コンテキスト分離ページの
  // メインワールドへ送ります。
  const { port1, port2 } = new MessageChannelMain()

  // 相手側がリスナーを登録する前にそのチャンネルで
  // メッセージを送信しても大丈夫です。 リスナーが登録されるまでメッセージはキューに
  // 溜められます。
  port2.postMessage({ test: 21 })

  // レンダラーのメインワールドからのメッセージを受信することもできます。
  port2.on('message', (event) => {
    console.log('from renderer main world:', event.data)
  })
  port2.start()

  // プリロードスクリプトはこの IPC メッセージを受信し、ポートを
  // メインワールドへ転送します。
  bw.webContents.postMessage('main-world-port', null, [port1])
})
```

```js
// preload.js ////////////////////////////////////////////////////////////////
const { ipcRenderer } = require('electron')

// メインワールドがメッセージを受信できるようになるまで待ってから
// ポートを送信する必要があります。 この Promise をプリロードで作成することで、load イベント
// が発生する前に onload リスナーを登録できることが保証されます。
const windowLoaded = new Promise(resolve => {
  window.onload = resolve
})

ipcRenderer.on('main-world-port', async (event) => {
  await windowLoaded
  // 分離ワールドからメインワールドへポートを転送するために、通常の
  // window.postMessage を使用します。
  window.postMessage('main-world-port', '*', event.ports)
})
```

```html
<!-- index.html ------------------------------------------------------------->
<script>
window.onmessage = (event) => {
  // event.source === window は、メッセージが <iframe> や他のソースから
  // ではなくプリロードスクリプト由来だということです。
  if (event.source === window && event.data === 'main-world-port') {
    const [ port ] = event.ports
    // ポートを確保すれば、メインプロセスと直接通信できるように
    // なります。
    port.onmessage = (event) => {
      console.log('from main process:', event.data)
      port.postMessage(event.data * 2)
    }
  }
}
</script>
```

[コンテキスト分離]: context-isolation.md
[`ipcRenderer.postMessage`]: ../api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer
[`WebContents.postMessage`]: ../api/web-contents.md#contentspostmessagechannel-message-transfer
[`MessagePortMain`]: ../api/message-port-main.md
[`MessageChannelMain`]: ../api/message-channel-main.md
[`MessagePort`]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
[Channel Messaging API]: https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
