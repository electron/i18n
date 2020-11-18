# Snapcraft ガイド (Ubuntu Software Center & 他)

このガイドは、Ubuntu Software Centerを含む、Snapcraft環境向けにあなたのElectronアプリケーションをパッケージする方法を提供します。

## 背景と必要条件

幅広いLinux コミュニティと共に、Canonicalは共通したソフトウェアインストールの問題を解決するために、[`snapcraft`](https://snapcraft.io/)プロジェクトを開始しました。 Snaps は、依存関係と自動アップデートに必要なソフトウェアパッケージを含めたパッケージであり、システムを修正することなく多くのメジャーなLinuxディストリビューションで動作します。

`.snap` ファイルを作成する方法は3つあります。:

1) [`electron-forge`](https://github.com/electron-userland/electron-forge) または [`electron-builder`](https://github.com/electron-userland/electron-builder)の使用、両方のツールは `snap`ですぐに使用できます。 これは最も簡単な選択肢です。 2) `electron-installer-snap`の使用、これは`electron-packager`のアウトプットを使用します。 3) 作成した`.deb`パッケージの使用

場合によっては、`snapcraft` ツールをインストールしている必要があります。 特定ディストリビューションの `snapcraft` のインストール手順は [こちら](https://snapcraft.io/docs/installing-snapcraft) です。

## `electron-installer-snap`の使用

このモジュールは、[`electron-winstaller`](https://github.com/electron/windows-installer)のように動作します。またそのスコープ内の類似のモジュールは、snapパッケージのビルドに制限されます。 次のようにインストールできます:

```sh
npm install --save-dev electron-installer-snap
```

### ステップ1: Electronアプリケーションのパッケージ化

[electron-packager](https://github.com/electron/electron-packager) (または類似ツール) を用いてパッケージします。 アプリケーションサイズが大きくなるので、実際には必要ないモジュールを`node_modules`から確実に削除します。

出力はおおよそ以下のようになります:

```plaintext
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

## `electron-packager` と共に `snapcraft` を使用する

### ステップ 1: サンプル snapcraft プロジェクトの作成

プロジェクトディレクトリを作成し、`snap/snapcraft.yaml` に以下を追加します。

```yaml
name: electron-packager-hello-world
version: '0.1'
summary: Hello World Electron app
description: |
  Simple Hello World Electron app as an example
base: core18
confinement: strict
grade: stable

apps:
  electron-packager-hello-world:
    command: electron-quick-start/electron-quick-start --no-sandbox
    extensions: [gnome-3-34]
    plugs:
    - browser-support
    - network
    - network-bind
    environment:
      # Chromium フレームワーク/Electron の TMPDIR パスを修正し、
      # libappindicator が読めるリソースを確保します。
      TMPDIR: $XDG_RUNTIME_DIR

parts:
  electron-quick-start:
    plugin: nil
    source: https://github.com/electron/electron-quick-start.git
    override-build: |
        npm install electron electron-packager
        npx electron-packager . --overwrite --platform=linux --output=release-build --prune=true
        cp -rv ./electron-quick-start-linux-* $SNAPCRAFT_PART_INSTALL/electron-quick-start
    build-snaps:
    - node/14/stable
    build-packages:
    - unzip
    stage-packages:
    - libnss3
    - libnspr4
```

この例を既存のプロジェクトに適用する場合は以下のようにしましょう。

- `source: https://github.com/electron/electron-quick-start.git` を `source: .` に置き換えます。
- すべての `electron-quick-start` の箇所をプロジェクト名に置き換えます。

### ステップ 2: snap のビルド

```sh
$ snapcraft

<output snipped>
Snapped electron-packager-hello-world_0.1_amd64.snap
```

### ステップ 3: snap のインストール

```sh
sudo snap install electron-packager-hello-world_0.1_amd64.snap --dangerous
```

### ステップ 4: snap の実行

```sh
electron-packager-hello-world
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
    # Chromium Framework/Electron の TMPDIR パスを修正し、
    # libappindicator が読み取れるリソースを確保します。
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
