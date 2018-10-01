# ビルド手順

Electron のビルドについては、以下のガイドラインに従ってください。

## プラットフォーム要件

続行する前に、以下から各プラットフォームのビルド要件を確認してください。

- [macOS](build-instructions-macos.md#prerequisites)
- [Linux](build-instructions-linux.md#prerequisites)
- [Windows](build-instructions-windows.md#prerequisites)

## GN 要件

[`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up) をインストールする必要があります。このツールセットは Chromium とその依存関係のダウンロードに使用されます。

更に Windows では、`DEPOT_TOOLS_WIN_TOOLCHAIN=0` と環境変数を設定する必要があります。 これを行うには、`コントロール パネル` → `システムとセキュリティ` → `システム` → `システムの詳細設定` を開き、`DEPOT_TOOLS_WIN_TOOLCHAIN` 環境変数を追加して値を `0` にします。 これはローカルにインストールされているバージョンの Visual Studio を使用するように `depot_tools` に知らせます (デフォルトで `depot_tools` は Google 社員のみがアクセスできる Google 内部のバージョンをダウンロードしようとします) 。

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
export SCCACHE_BUCKET="electronjs-sccache"
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

## ビルド

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
# this next line is needed only if building with sccache
$ export GN_EXTRA_ARGS="${GN_EXTRA_ARGS} cc_wrapper=\"${PWD}/electron/external_binaries/sccache\""
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
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

This will build all of what was previously 'libchromiumcontent' (i.e. the `content/` directory of `chromium` and its dependencies, incl. WebKit and V8), so it will take a while.

To speed up subsequent builds, you can use [sccache](https://github.com/mozilla/sccache). Add the GN arg `cc_wrapper = "sccache"` by running `gn args out/Debug` to bring up an editor and adding a line to the end of the file.

The built executable will be under `./out/Debug`:

```sh
$ ./out/Debug/Electron.app/Contents/MacOS/Electron
# Windowsの場合
$ ./out/Debug/electron.exe
# Linuxの場合
$ ./out/Debug/electron
```

### Cross-compiling

To compile for a platform that isn't the same as the one you're building on, set the `target_cpu` and `target_os` GN arguments. For example, to compile an x86 target from an x64 host, specify `target_cpu = "x86"` in `gn args`.

```sh
$ gn gen out/Debug-x86 --args='... target_cpu = "x86"'
```

Not all combinations of source and target CPU/OS are supported by Chromium. Only cross-compiling Windows 32-bit from Windows 64-bit and Linux 32-bit from Linux 64-bit have been tested in Electron. If you test other combinations and find them to work, please update this document :)

See the GN reference for allowable values of [`target_os`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values) and [`target_cpu`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values)

## テスト

To run the tests, you'll first need to build the test modules against the same version of Node.js that was built as part of the build process. To generate build headers for the modules to compile against, run the following under `src/` directory.

```sh
$ ninja -C out/Debug third_party/electron_node:headers
# 生成ヘッダありでテストモジュールをインストールする場合
$ (cd electron/spec && npm i --nodedir=../../out/Debug/gen/node_headers)
```

Then, run Electron with `electron/spec` as the argument:

```sh
# macOSの場合:
$ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec
# Windowsの場合:
$ ./out/Debug/electron.exe electron/spec
# Linuxの場合:
$ ./out/Debug/electron electron/spec
```

If you're debugging something, it can be helpful to pass some extra flags to the Electron binary:

```sh
$ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```

## Sharing the git cache between multiple machines

It is possible to share the gclient git cache with other machines by exporting it as SMB share on linux, but only one process/machine can be using the cache at a time. The locks created by git-cache script will try to prevent this, but it may not work perfectly in a network.

On Windows, SMBv2 has a directory cache that will cause problems with the git cache script, so it is necessary to disable it by setting the registry key

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

to 0. More information: https://stackoverflow.com/a/9935126

## トラブルシューティング

### Stale locks in the git cache

If `gclient sync` is interrupted while using the git cache, it will leave the cache locked. To remove the lock, pass the `--break_repo_locks` argument to `gclient sync`.