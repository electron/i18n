---
title: 'Electron の舞台裏&#58: Node をライブラリとして使用する'
author: zcbenz
date: '2016-08-08'
---

Electron の舞台裏について説明するシリーズ、第二弾です。 イベントループの統合についてまだ読んでいない方は [最初の記事](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) をご覧ください。

ほとんどの人は [Node](https://nodejs.org) をサーバサイドアプリケーションに使っていますが、Node の豊富な API セットと活発なコミュニティのおかげで組み込みライブラリにも最適です。 この記事では、Electron のライブラリとして Node がどのように使われているかを解説します。

---

## ビルドシステム

Node も Electron も [`GYP`](https://gyp.gsrc.io) をビルドシステムとして使用しています。 アプリ内に Node を埋め込みたい場合は、あなたもビルドシステムとして GYP を使用する必要があります。

`GYP` は初めてですか? そうであれば、この記事を読み進める前に [このガイド](https://gyp.gsrc.io/docs/UserDocumentation.md) を読んでからにしてください。

## Node のフラグ

Node のソースコードディレクトリにある [`node.gyp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) ファイルには、Node をどのように構築するかが記述されており、多くの [`GYP`](https://gyp.gsrc.io) 変数とともに Node のどの部分を有効にするのか、特定の設定ファイルを開くかどうかを制御しています。

ビルドフラグを変更するには、プロジェクトの `.gypi` ファイルに変数を設定する必要があります。 Node の `configure` スクリプトは、いくつかの一般的な設定ファイルを生成できます。例えば、`./configure --shared` を実行すると、Node を共有ライブラリとしてビルドするように指示する変数を含んだ `config.gypi` が生成されます。

Electron は独自のビルドスクリプトを持っているので、この `configure` スクリプトは使いません。 Node の設定は、Electron のルートソースコードディレクトリにある [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) ファイルで定義されています。

## Electron と Node のリンク

Electron では、`GYP` 変数 `node_shared` を `true` に設定することで Node を共有ライブラリとしてリンクしています。このため、Node のビルドタイプは `executable` から `shared_library` に変更され、Node の `main` エントリポイントを含むソースコードはコンパイルされません。

Electron は Chromium に同梱されている V8 ライブラリを使用しているため、Node のソースコードに含まれている V8 ライブラリは使用しません。 これは `node_use_v8_platform` と `node_use_bundled_v8` の両方を `false` に設定することで実現しています。

## 共有ライブラリか静的ライブラリか

Node とリンクする際には 2 つの選択肢があります。静的ライブラリとしてビルドし最終的な実行ファイルにインクルードするか、共有ライブラリとしてビルドし最終的な実行ファイルと一緒に頒布するかです。

Electron では、Node は長い間静的ライブラリとしてビルドしていました。 これはビルドがシンプルで、高水準なコンパイラの最適化が可能で、余分な `node.dll` ファイルいらずで Electron を頒布できました。

しかし、これは Chrome が [BoringSSL](https://boringssl.googlesource.com/boringssl) を使うようになってから変わりました。 BoringSSL は [OpenSSL](https://www.openssl.org) のフォークで、いくつかの未使用の API を削除し、多くの既存のインターフェースを変更しています。 Node は依然 OpenSSL を使用しているため、コンパイラがそれらをリンクすると、矛盾するシンボルのために多数のリンクエラーを発生させてしまいます。

Electron では、Node で BoringSSL を使うことも Chromium で OpenSSL を使うこともできませんでした。そのため、Node を共有ライブラリとしてビルドするように切り替え、[BoringSSL と OpenSSL のシンボルをそれぞれのコンポーネントで隠す](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) という選択肢しかありませんでした。

この変化は、Electron にいくぶんかプラスの副作用をもたらしました。 この変更以前は、Windows 上でネイティブモジュールを使用している場合、インポートライブラリ内で実行ファイル名をハードコーディングしていたため、実行ファイル名を変更できませんでした。 Node が共有ライブラリとして構築されてからは、すべてのネイティブモジュールを `node.dll` にリンクしたため、この制限がなくなりました。

## ネイティブモジュールのサポート

[Node のネイティブモジュール](https://nodejs.org/api/addons.html) は、Node がロードするエントリ関数を定義し、Node から V8 や libuv のシンボルを検索することで動作します。 これは組み込み開発者にとっては少し面倒です。なぜなら、デフォルトではライブラリとして Node をビルドする際に V8 と libuv のシンボルが隠されており、ネイティブモジュールはシンボルを見つけられずロードに失敗するからです。

そこで、ネイティブモジュールを動作させるために Electron では V8 と libuv のシンボルを公開しました。 V8 では、[Chromium の設定ファイル内の全シンボルを強制的に公開する](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122) ことで実現しています。 libuv の場合、[`BUILDING_UV_SHARED=1` 定義を設定する](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228) ことで実現しています。

## アプリで Node を起動する

Node をビルドしてリンクする全作業の後は、最後の段階としてアプリで Node を実行します。

Node は、自分自身を他のアプリに組み込むための公開 API は多く提供していません。 通常は、[`node::Start` と `node::Init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) を呼び出すだけで Node の新しいインスタンスを起動できます。 しかし、Node ベースで複雑なアプリを構築する場合は、`node::CreateEnvironment` のような API を使用して全ステップを正確に制御する必要があります。

Electron で Node を起動する際には、公式の Node バイナリに近いメインプロセスで動作するスタンドアロンモードと、ウェブページに Node API を挿入する組み込みモードの、2 つのモードがあります。 この詳細は後々の記事で解説する予定です。

