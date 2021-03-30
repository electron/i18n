# webFrameMain

> ウェブページと iframe を制御します。

プロセス: [Main](../glossary.md#main-process)

`webFrameMain` モジュールは、既存の [`WebContents`](web-contents.md) インスタンスを横断したフレームの探索に利用できます。 ナビゲーションイベントがよくあるユースケースでしょう。

```javascript
const { BrowserWindow, webFrameMain } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://twitter.com')

win.webContents.on(
  'did-frame-navigate',
  (event, url, isMainFrame, frameProcessId, frameRoutingId) => {
    const frame = webFrameMain.fromId(frameProcessId, frameRoutingId)
    if (frame) {
      const code = 'document.body.innerHTML = document.body.innerHTML.replaceAll("heck", "h*ck")'
      frame.executeJavaScript(code)
    }
  }
)
```

また、[`WebContents`](web-contents.md) の `mainFrame` プロパティを使用することでも既存ページのフレームへアクセスできます。

```javascript
const { BrowserWindow } = require('electron')

async function main () {
  const win = new BrowserWindow({ width: 800, height: 600 })
  await win.loadURL('https://reddit.com')

  const youtubeEmbeds = win.webContents.mainFrame.frames.filter((frame) => {
    try {
      const url = new URL(frame.url)
      return url.host === 'www.youtube.com'
    } catch {
      return false
    }
  })

  console.log(youtubeEmbeds)
}

main()
```

## メソッド

これらのメソッドは、`webFrameMain` モジュールからアクセスできます。

### `webFrameMain.fromId(processId, routingId)`

* `processId` Integer - `Integer` 型で、そのフレームを所有しているプロセスの内部 ID を表します。
* `routingId` Integer - `Integer` 型で、現在のレンダラープロセスでの一意なフレーム ID を表します。 ルーティング ID は、`WebFrameMain` インスタンス (`frame.routingId`) から取得できるほか、フレーム固有の `WebContents` ナビゲーションイベント (`did-frame-navigate` など) によっても渡されます。

戻り値 `WebFrameMain | undefined` - 指定のプロセスとルーティングの ID のフレームです。指定の ID に関連付けられた WebFrameMain がない場合は `undefined` になります。

## クラス: WebFrameMain

プロセス: [Main](../glossary.md#main-process)

### インスタンスメソッド

#### `frame.executeJavaScript(code[, userGesture])`

* `code` String
* `userGesture` Boolean (任意) - 省略値は `false`。

戻り値 `Promise<unknown>` - 実行されたコードの結果で resolve されるか、実行でスロー又は reject された結果の場合に reject される Promise。

ページ内の `code` を評価します。

ブラウザウインドウでは、`requestFullScreen` のような、いくつかの HTML API は、ユーザからのジェスチャーでのみ呼び出されます。 `userGesture` を `true` にセットすることでこの制限がなくなります。

#### `frame.reload()`

戻り値 `boolean` - リロードが正常に開始されたかどうか。 フレームに履歴がない場合のみ `false` になります。

#### `frame.send(channel, ...args)`

* `channel` String
* `...args` any[]

引数と共に、`channel` を介してレンダラープロセスに非同期メッセージを送信します。 引数は [`postMessage`]\[] と同様に [構造化複製アルゴリズム\]\[SCA\] でシリアライズされるので、プロトタイプチェーンは含まれません。 関数、Promise、Symbol、WeakMap、WeakSet の送信は、例外が送出されます。

レンダラープロセスは `ipcRenderer` モジュールで [`channel`](ipc-renderer.md) を聞いてメッセージを処理できます。

#### `frame.postMessage(channel, message, [transfer])`

* `channel` String
* `message` any
* `transfer` MessagePortMain[] (任意)

レンダラープロセスにメッセージを送信し、任意で 0 個以上の [`MessagePortMain`][] オブジェクトの所有権を転送します。

転送された `MessagePortMain` オブジェクトは、レンダラープロセスで発生したイベントの `ports` プロパティにアクセスすれば利用できます。 レンダラーに着くと、それらはネイティブの DOM `MessagePort` オブジェクトになります。

例:

```js
// メインプロセス
const { port1, port2 } = new MessageChannelMain()
webContents.mainFrame.postMessage('port', { message: 'hello' }, [port1])

// レンダラープロセス
ipcRenderer.on('port', (e, msg) => {
  const [port] = e.ports
  // ...
})
```

### インスタンスプロパティ

#### `frame.url` _読み出し専用_

`string` 型で、そのフレームの現在の URL を表します。

#### `frame.top` _読み出し専用_

`WebFrameMain | null` 型で、`frame` が属するフレーム階層の最上位フレームを表します。

#### `frame.parent` _読み出し専用_

`WebFrameMain | null` 型で、`frame` の親フレームを表します。`frame` がそのフレーム階層の最上位フレームであれば、このプロパティは `null` です。

#### `frame.frames` _読み出し専用_

`WebFrameMain[]` 型で、`frame` の直接の子フレームを格納するコレクションです。

#### `frame.framesInSubtree` _読み出し専用_

`WebFrameMain[]` 型で、`frame` のサブツリーのうち自身を含んだ全フレームのコレクションです。 これは、すべてのフレームをトラバースするときに便利です。

#### `frame.frameTreeNodeId` _読み出し専用_

`Integer` 型で、フレーム内部の FrameTreeNode インスタンスの ID を表します。 この ID はブラウザー内で共通となっており、コンテンツをホストするフレームを一意に識別します。 識別子はフレーム作成時に固定され、フレームが有効である間は変化しません。 フレームが削除されると、その ID が再び使用されることはありません。

#### `frame.name` _読み出し専用_

`String` 型で、そのフレームの名前を表します。

#### `frame.osProcessId` _読み出し専用_

`Integer` 型で、このフレームを所有するプロセスのオペレーティングシステムの `pid` を表します。

#### `frame.processId` _読み出し専用_

`Integer` 型で、このフレームを所有するプロセスの Chromium 内部の `pid` を表します。 これは OS のプロセス ID と同じではありません。それを読み出すには `frame.osProcessId` を使用してください。

#### `frame.routingId` _読み出し専用_

現在のレンダラープロセスでの一意なフレーム ID を表す `Integer`。 同じ基底フレームを参照する `WebFrameMain` インスタンスすべては、それぞれ同じ `routingId` になります。
