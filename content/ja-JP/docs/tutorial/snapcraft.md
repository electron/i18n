# Snapcraft ガイド (Ubuntu Software Center & 他)

このガイドは、Ubuntu Software Centerを含む、Snapcraft環境向けにあなたのElectronアプリケーションをパッケージする方法を提供します。

## 背景と必要条件

幅広いLinux コミュニティと共に、Canonicalは共通したソフトウェアインストールの問題を解決するために、[`snapcraft`](https://snapcraft.io/)プロジェクトを開始しました。 Snaps は、依存関係と自動アップデートに必要なソフトウェアパッケージを含めたパッケージであり、システムを修正することなく多くのメジャーなLinuxディストリビューションで動作します。

`.snap` ファイルを作成する方法は3つあります。:

1) [`electron-forge`](https://github.com/electron-userland/electron-forge) または [`electron-builder`](https://github.com/electron-userland/electron-builder)の使用、両方のツールは `snap`ですぐに使用できます。 これは最も簡単な選択肢です。 2) `electron-installer-snap`の使用、これは`electron-packager`のアウトプットを使用します。 3) 作成した`.deb`パッケージの使用

いずれの方法であっても、あなたは`snapcraft` ツールをインストールしていなければなりません。また私達は、Ubuntu 16.04 (または現在のLTS) でのビルドを推奨します。

```sh
snap install snapcraft --classic
```

一方でmacOS上ではHomebrewを使用することで*一応* 、`snapcraft`をインストールすることはできます。しかし、これは`snap` パッケージをビルドできます。このツールは、ストアでのパッケージの管理用です。

## `electron-installer-snap`の使用

The module works like [`electron-winstaller`](https://github.com/electron/windows-installer) and similar modules in that its scope is limited to building snap packages. 次のようにインストールできます:

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

From a terminal that has `snapcraft` in its `PATH`, run `electron-installer-snap` with the only required parameter `--src`, which is the location of your packaged Electron application created in the first step.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

If you have an existing build pipeline, you can use `electron-installer-snap` programmatically. For more information, see the [Snapcraft API docs](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## 既存のデビアンパッケージの使用

Snapcraft is capable of taking an existing `.deb` file and turning it into a `.snap` file. The creation of a snap is configured using a `snapcraft.yaml` file that describes the sources, dependencies, description, and other core building blocks.

### ステップ1: デビアンパッケージの作成

If you do not already have a `.deb` package, using `electron-installer-snap` might be an easier path to create snap packages. However, multiple solutions for creating Debian packages exist, including [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) or [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### ステップ2: snapcraft.yamlファイルの作成

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

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

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Alternatively, if you're building your `snap` with `strict` confinement, you can use the `desktop-launch` command:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```