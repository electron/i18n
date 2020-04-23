# ビルド手順

Electron のビルドについては、以下のガイドラインに従ってください。

## プラットフォーム要件

続行する前に、以下から各プラットフォームのビルド要件を確認してください。

  * [macOS](build-instructions-macos.md#prerequisites)
  * [Linux](build-instructions-linux.md#prerequisites)
  * [Windows](build-instructions-windows.md#prerequisites)

## GN 要件

[`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up) をインストールする必要があります。このツールセットは Chromium とその依存関係のダウンロードに使用されます。

更に Windows では、`DEPOT_TOOLS_WIN_TOOLCHAIN=0` と環境変数を設定する必要があります。 これを行うには、`コントロール パネル` → `システムとセキュリティ` → `システム` → `システムの詳細設定` を開き、`DEPOT_TOOLS_WIN_TOOLCHAIN` 環境変数を追加して値を `0` にします。  これはローカルにインストールされているバージョンの Visual Studio を使用するように `depot_tools` に知らせます (デフォルトで `depot_tools` は Google 社員のみがアクセスできる Google 内部のバージョンをダウンロードしようとします) 。

## キャッシュからのビルド (任意の手順)

### GIT\_CACHE\_PATH

Electron を数回ビルドしようとしている場合、git キャッシュを追加することでその後の `gclient` の呼び出しを高速化できます。 これをするには、`GIT_CACHE_PATH` 環境変数を以下のように設定する必要があります。

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# 16G ほどあります。
```

> **注**: git キャッシュは上流の git レポジトリの代わりに `src/electron` レポジトリの `origin` をローカルキャッシュに設定します。 これは、`git push` を実行しているときは望ましくありません。ローカルキャッシュではなくGithub にプッシュしたいと思うかもしれません。 これを修正するには、`src/electron` で以下を実行してください。

```sh
$ git remote set-url origin https://github.com/electron/electron
```

### sccache

Chromium と Electron をビルドするために幾千ものファイルをコンパイルしなければいけません。 [sccache](https://github.com/mozilla/sccache) を通して Electron CI のビルド出力を再利用することで待ち時間の多くを回避できます。 これにはいくつかの任意の手順 (下記リスト) と以下の2つの環境変数が必要です。

```sh
export SCCACHE_BUCKET="electronjs-sccache-ci"
export SCCACHE_TWO_TIER=true
```

## コードを取得

```sh
$ mkdir electron-gn && cd electron-gn
$ gclient config \
    --name "src/electron" \
    --unmanaged \
    https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# これは時間がかかります。コーヒーでも淹れましょう。
```

> `https://github.com/electron/electron` の代わりに、`https://github.com/<username>/electron` のような自分のフォークを使うこともできます。

#### プル/プッシュ時の注意

もし将来公式の `electron` レポジトリから `git pull` や `git push` をする予定であれば、現在はそれぞれのフォルダの origin URL を更新する必要があります。

```sh
$ cd src/electron
$ git remote remove origin
$ git remote add origin https://github.com/electron/electron
$ git branch --set-upstream-to=origin/master
$ cd -
```

:memo: `gclient` は、Chromium や Node.js のような依存の解決のために `src/electron` フォルダ内の `DEPS` と呼ばれるファイルを確認します。 `gclient sync -f` を実行することで Electron のビルドに必要な依存関係をすべて取得します。

なので、プルするには、以下のコマンドを実行するとよいでしょう。
```sh
$ cd src/electron
$ git pull
$ gclient sync -f
```

## ビルド

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
# この次の行は、sccacheでビルドする場合のみ必要
$ export GN_EXTRA_ARGS="${GN_EXTRA_ARGS} cc_wrapper=\"${PWD}/electron/external_binaries/sccache\""
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
```

Windows 上(任意の引数はなし):
```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\")"
```

これはデバッグビルドの設定とともに `src/` 配下の `out/Debug` ビルドディレクトリに生成されます。 `Debug` は他の名前に置換できますが、`out` のサブディレクトリである必要があります。 更に `gn gen` を再び実行してはいけません。ビルド引数を変更したい場合、` gn args out/Debug` を実行してエディタを呼び出します。

利用可能なビルド設定を一覧するには、`gn args
out/Debug --list` を実行してください。

**Electron の Debug (別名 "component" または "shared") ビルド設定は以下のとおりです。**

```sh
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
```

**Electron の Release (別名 "non-component" または "static") ビルド設定は以下のとおりです。**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**ビルドするには、`ninja` を `electron` ターゲットで実行します。** 注意: これはさらなる時間を要し、パソコンも熱くなります。

デバッグ構成は以下のとおりです。
```sh
$ ninja -C out/Debug electron
```

リリース構成は以下のとおりです。
```sh
$ ninja -C out/Release electron
```

これは、先に "libchromiumcontent" (` chromium` の `content/` ディレクトリとWebKitとV8などの依存関係) のすべてをビルドします。そのため時間がかかります。

次回以降のビルドを高速化するには、[sccache](https://github.com/mozilla/sccache) が使用できます。 GN 引数 `cc_wrapper = "sccache"` を追加して `gn args out/Debug` を実行するように、エディタで開いてファイルの末尾に追加してください。

実行形式は `./out/Debug` 下に置かれます。

```sh
$ ./out/Debug/Electron.app/Contents/MacOS/Electron
# Windowsの場合
$ ./out/Debug/electron.exe
# Linuxの場合
$ ./out/Debug/electron
```

### パッケージ化

Linuxの場合、デバッグ情報やシンボル情報を削除します。
```sh
electron/script/strip-binaries.py -d out/Release
```

配布可能なzipファイルとしてこのエレクトロンビルドをパッケージするには、次のようにする。
```sh
ninja -C out/Release electron:electron_dist_zip
```

### クロスコンパイル

構築しているプラットフォームと同じでないプラットフォーム用にコンパイルするには、`target_cpu` 及び `target_os` GN 引数を設定します。 例えば、x64 ホストから x86 ターゲットをコンパイルするには、`gn args` で `target_cpu = "x86"` と指定します。

```sh
$ gn gen out/Debug-x86 --args='... target_cpu = "x86"'
```

ソースコードとターゲット CPU/OS のすべての組み合わせが Chromium でサポートされているわけではありません。

<table>
<tr><th>ホスト</th><th>ターゲット</th><th>状況</th></tr>
<tr><td>Windows x64</td><td>Windows arm64</td><td>実験的</td>
<tr><td>Windows x64</td><td>Windows x86</td><td>自動テスト済み</td></tr>
<tr><td>Linux x64</td><td>Linux x86</td><td>自動テスト済み</td></tr>
</table>

他の組み合わせをテストしてうまく動作することがわかれば、このドキュメントを更新してください :)

[`target_os`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values) と [`target_cpu`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values) の許可されている値については、 GN リファレンスを参照してください。

#### Arm 上で Windows (実験的)

Arm 上の Windows 用にクロスコンパイルするには、[Chromium のガイドに従って](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio) 必要な依存関係、SDK およびライブラリを取得し、`gclient sync` を実行する前に環境内で `ELECTRON_BUILDING_WOA=1` でビルドします。

```bat
set ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

もしくは (PowerShell を用いる場合) こうします。
```powershell
$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

それから、上記のように `target_cpu="arm64"` で `gn gen` を実行します。

## テスト

このテストを実行するために、あなたは最初に、このビルドプロセスの一部としてビルドする Node.js と同じバージョンに対してテストモジュールをビルドする必要があります。 再びコンパイルするモジュールのためのビルドヘッダを生成するために、`src/`ディレクトリの下で以下のように実行します。

```sh
$ ninja -C out/Debug third_party/electron_node:headers
# 生成ヘッダありでテストモジュールをインストールする場合
$ (cd electron/spec && npm i --nodedir=../../out/Debug/gen/node_headers)
```

それから、`electron/spec` を引数にして Electronを実行します。

```sh
# macOSの場合:
$ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec
# Windowsの場合:
$ ./out/Debug/electron.exe electron/spec
# Linuxの場合:
$ ./out/Debug/electron electron/spec
```

もし何かをデバッグ中であれば、以下のフラグを Electron バイナリに渡すと役に立つかもしれません。

```sh
$ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```

## 複数マシン間での gitのキャッシュの共有

gclient git キャッシュを Linux 上で SMB 共有としてエクスポートすることで、他のマシンと共有することは可能ですが、一度に一つのプロセス/マシンだけがキャッシュを使用できます。 git-cache スクリプトによって作成されたロックはこれを防止しようとしますが、ネットワーク内で完璧には動作しない可能性があります。

Windows では、SMBv2 にはディレクトリキャッシュがあり、git キャッシュスクリプトに問題が発生するため、レジストリキー

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

を0に設定して無効にする必要があります。 詳細: https://stackoverflow.com/a/9935126

## トラブルシューティング

### git キャッシュ内の古いロック
git キャッシュを使用している間に `gclient sync` が割り込まれた場合、キャッシュがロックされたままになります。 このロックを除去するには、`gclient sync` に `--break_repo_locks` 引数を渡します。

### chromium-internal.googlesource.com のユーザー名/パスワードを聞かれる
Windows 上で `gclient sync` を実行しているときに `Username for 'https://chrome-internal.googlesource.com':` のプロンプトが表示された場合、おそらく `DEPOT_TOOLS_WIN_TOOLCHAIN` 環境変数が 0 に設定されていないからです。 `コントロール パネル` → `システムとセキュリティ` → `システム` → `システムの詳細設定` を開き、`DEPOT_TOOLS_WIN_TOOLCHAIN` 環境変数を追加して値を `0` にします。  これはローカルにインストールされているバージョンの Visual Studio を使用するように `depot_tools` に知らせます (デフォルトで `depot_tools` は Google 社員のみがアクセスできる Google 内部のバージョンをダウンロードしようとします) 。
