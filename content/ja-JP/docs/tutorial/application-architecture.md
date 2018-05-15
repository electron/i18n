# Electron アプリケーションアーキテクチャ

Electron の API に入る前に、Electron で利用可能な2つのプロセスタイプについて議論する必要があります。 それらは根本的に異なっており、理解することが重要です。

## メインプロセスとレンダラープロセス

Electron において、`package.json` の `main` で指定されたスクリプトを実行するプロセスを **メインプロセス** と呼びます。 メインプロセスで実行されるスクリプトは、ウェブページを生成することで GUI を表示できます。 Electron アプリには常に1つのメインプロセスがありますが、これ以上はありません。

Electron はウェブページを表示するために Chromium を使用しているため、 Chromium のマルチプロセスアーキテクチャも使用されます。 Electronにおける各ウェブページはそれぞれのプロセスとして動作します。これを **レンダラープロセス** と呼びます。

通常のブラウザでは、ウェブページはサンドボックス化された環境で実行され、ネイティブリソースへのアクセスは許可されません。 しかし、Electron を使用している場合は、Node.js API をウェブページ内で使用して、OS へ作用できるローレベル API を使用することが出来ます。

### メインプロセスとレンダラープロセスの違い

メインプロセスは `BrowserWindow` インスタンスを作成してウェブページを作成します。 各 `BrowserWindow` インスタンスは、独自のレンダラープロセスでウェブページを実行します。 `BrowserWindow` インスタンスが破棄されると、対応するレンダラープロセスも終了します。

メインプロセスは、すべてのウェブページとそれに対応するレンダラープロセスを管理します。 各レンダラープロセスは独立しており、その中で実行されているウェブページのみに注力します。

ウェブページでは、ネイティブ GUI 関連の API を呼び出すことは許可されていません。これは、ウェブページがネイティブ GUI リソースを管理することは非常に危険であり、リソースをリークさせるのは容易いからです。 ウェブページで GUI 操作を実行する場合、ウェブページのレンダラープロセスはメインプロセスと通信して、メインプロセスがそれらの操作を実行するよう要求する必要があります。

> #### 余談: プロセス間通信
> 
> Electron では、メインプロセスとレンダラープロセスの間で通信するのにいくつかの方法があります。 メッセージ送信用の [`ipcRenderer`](../api/ipc-renderer.md) および [`ipcMain`](../api/ipc-main.md) モジュールと、RPC スタイルの通信用の [remote](../api/remote.md) モジュールなどがあります。 また、[ウェブページ間でデータを共有する方法](../faq.md#how-to-share-data-between-web-pages) についての FAQ エントリもあります。

## Electron API を使用する

Electron は、メインプロセスとレンダラープロセスの両方でデスクトップアプリケーションの開発をサポートするいくつかの API を提供しています。 両方のプロセスで、Electron の API にアクセスするには、それが含まれているモジュールが必要です。

```javascript
const electron = require('electron')
```

すべての Electron API にはプロセスタイプが割り当てられています。 それらの多くはメインプロセスからのみ使用することができ、レンダラープロセスからのものや、両方からのものなどがあります。 The documentation for each individual API will state which process it can be used from.

たとえば、Electronのウィンドウは `BrowserWindow` クラスを使用して作成されます。 これはメインプロセスでのみ利用可能です。

```javascript
// これはメインプロセスでは動作しますが
// レンダラプロセスでは `undefined` になります
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
```

プロセス間の通信が可能であるため、レンダラープロセスはメインプロセスを呼び出してタスクを実行できます。 Electron には `remote` というモジュールがあり、通常はメインプロセスでのみ利用可能な API を公開しています。 レンダラープロセスから `BrowserWindow` を作成するには、remote を仲介者として使用します。

```javascript
// これはレンダラープロセスでは動作しますが
// メインプロセスでは `undefined` になります
const { remote } = require('electron')
const { BrowserWindow } = remote

const win = new BrowserWindow()
```

## Node.js API を使用する

Electron は、メインプロセスとレンダラープロセスの両方で Node.js へのフルアクセスを公開します。 これには2つの重要な意味があります。

1) Node.js で利用できるすべての API は Electron で利用できます。 Electron アプリから以下のコードを呼ぶと動作します。

```javascript
const fs = require('fs')

const root = fs.readdirSync('/')

// これで、ディスクのルートレベル ( '/' か 'C:\')
// のすべてのファイルが出力されます。
console.log(root)
```

既に予測できるように、これはリモートコンテンツをロードしようとする場合にセキュリティの重要な意味を持ちます。 [セキュリティドキュメント](./security.md) に、リモートコンテンツの読み込みに関する詳細とガイダンスがあります。

2) アプリケーションで Node.js モジュールを使用できます。 好きな npm モジュールを選んでください。 npm は現在、オープンソースコードの世界最大のリポジトリ ―― サーバーアプリケーション用に予約され、保守されたもの ―― を提供しています。これを使用できることは、Electron の重要な機能の1つです。

たとえば、アプリケーションで公式の AWS SDK を使用するには、まずそれを依存関係としてインストールします。

```sh
npm install --save aws-sdk
```

Then, in your Electron app, require and use the module as if you were building a Node.js application:

```javascript
// S3 クライアントの準備
const S3 = require('aws-sdk/clients/s3')
```

重要な注意点が1つあります。ネイティブな Node.js モジュール (ネイティブコードのコンパイルが必要なモジュール) は、Electron と一緒に使用するためにコンパイルする必要があります。

Node.js モジュールの大部分はネイティブでは *ありません*。 ~650.000のモジュールのうち400個だけがネイティブです。 However, if you do need native modules, please consult [this guide on how to recompile them for Electron](./using-native-node-modules.md).