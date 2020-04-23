# Snapcraft ガイド (Ubuntu Software Center & 他)

このガイドは、Ubuntu Software Centerを含む、Snapcraft環境向けにあなたのElectronアプリケーションをパッケージする方法を提供します。

## 背景と必要条件

幅広いLinux コミュニティと共に、Canonicalは共通したソフトウェアインストールの問題を解決するために、[`snapcraft`](https://snapcraft.io/)プロジェクトを開始しました。 Snaps は、依存関係と自動アップデートに必要なソフトウェアパッケージを含めたパッケージであり、システムを修正することなく多くのメジャーなLinuxディストリビューションで動作します。

`.snap` ファイルを作成する方法は3つあります。:

1) [`electron-forge`](https://github.com/electron-userland/electron-forge) または [`electron-builder`](https://github.com/electron-userland/electron-builder)の使用、両方のツールは `snap`ですぐに使用できます。 これは最も簡単な選択肢です。 2) `electron-installer-snap`の使用、これは`electron-packager`のアウトプットを使用します。 3) 作成した`.deb`パッケージの使用

いずれにしても、`snapcraft` ツールをインストールしている必要があります。 Ubuntu 16.04 (または現在の LTS) でのビルドを推奨します。

```sh
snap install snapcraft --classic
```

一方でmacOS上ではHomebrewを使用することで_一応_ 、`snapcraft`をインストールすることはできます。しかし、これは`snap` パッケージをビルドできます。このツールは、ストアでのパッケージの管理用です。

## `electron-installer-snap`の使用

このモジュールは、[`electron-winstaller`](https://github.com/electron/windows-installer)のように動作します。またそのスコープ内の類似のモジュールは、snapパッケージのビルドに制限されます。 次のようにインストールできます:

```sh
npm install --save-dev electron-installer-snap
```

### ステップ1: Electronアプリケーションのパッケージ化

[electron-packager](https://github.com/electron-userland/electron-packager)(または似たようなツール) を使ってパッケージ化します。 アプリケーションサイズが大きくなるので、実際には必要ないモジュールを`node_modules`から確実に削除します。

出力はおおよそ以下のようになります:

```text
.
└── dist
    └── app-linux-x64
        ├── LICENSE
        ├── LICENSES.chromium.html
        ├── content_shell.pak
        ├── app
        ├── icudtl.dat
        ├── libgcrypt.so.11
        ├── libnode.so
        ├── locales
        ├── natives_blob.bin
        ├── resources
        ├── v8_context_snapshot.bin
        └── version
```

### ステップ2: `electron-installer-snap`の実行

`snapcraft` が環境変数 `PATH` に含まれている状態で、ターミナルから `electron-installer-snap`を実行します。その際に、`--src`パラメーターで、この第一ステップで作成するElectronアプリケーションの場所を指定します。

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

もし既存のビルドパイプラインがある場合は、 `electron-installer-snap`をプログラムとして利用できます。 詳しい情報については、[Snapcraft API docs](https://docs.snapcraft.io/build-snaps/syntax)を参照してください。

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## 既存のデビアンパッケージの使用

Snapcraft は既存の`.deb`ファイルをもとに、`.snap` ファイルに変換できます。 この場合`snapcraft.yaml`を利用してsnapを作成します。このファイルは、ソース、依存関係、説明、コアのビルドブロックを記述します。

### ステップ1: デビアンパッケージの作成

`.deb` パッケージがない場合、`electron-installer-snap`で容易 にsnapパッケージを作成できます。 しかし、Debianパッケージを作成する方法はいつくかあります。例えば、[`electron-forge`](https://github.com/electron-userland/electron-forge)や[`electron-builder`](https://github.com/electron-userland/electron-builder)または [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian)があります。

### ステップ2: snapcraft.yamlファイルの作成

利用可能な設定オプションの詳細については、[snapcraft 構文のドキュメント](https://docs.snapcraft.io/build-snaps/syntax) を参照してください。 以下で例を見てみましょう。

```yaml
name: myApp
version: '2.0.0'
summary: A little description for the app.
description: |
 あなたは知っていますか？ このアプリはすごい。 あなたのために色々してくれます。 ある者はこれで若さが保てるといい、また幸せに慣れると言っています。

grade: stable
confinement: classic

parts:
  slack:
    plugin: dump
    source: my-deb.deb
    source-type: deb
    after:
      - desktop-gtk3
    stage-packages:
      - libasound2
      - libgconf2-4
      - libnotify4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  electron-launch:
    plugin: dump
    source: files/
    prepare: |
      chmod +x bin/electron-launch

apps:
  myApp:
    command: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    desktop: usr/share/applications/myApp.desktop
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
```

ご覧の通り、`snapcraft.yaml` は `electron-launch` と呼ばれるファイルを起動するようにシステムに伝達しています。 この例では、以下のようにアプリのバイナリへ情報を渡します。

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

代替として、`snap` を `strict` 禁則でビルドした場合、以下のように `desktop-launch` コマンドを使用できます。

```yaml
apps:
  myApp:
    # TMPDIR パスを、Chromium Framework/Electron が
    # libappindicator の読み取り可能リソースを確認するために埋めます
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```
