# ビルド手順

カスタム Electron バイナリの作成にあたって **Electron そのもの** をビルドするには、以下のガイドラインに従ってください。 アプリのコードをビルド済み Electron バイナリにバンドルして頒布する場合は、[アプリケーション頒布][application-distribution] のガイドを参照してください。

## プラットフォーム要件

続行する前に、以下から各プラットフォームのビルド要件を確認してください。

* [macOS](build-instructions-macos.md#prerequisites)
* [Linux](build-instructions-linux.md#prerequisites)
* [Windows](build-instructions-windows.md#prerequisites)

## ビルドツール

[Electron ビルドツール](https://github.com/electron/build-tools) は、さまざまな設定やビルドターゲットを使ってソースから Electron をコンパイルするためのセットアップの多くを自動化します。 手動で環境構築する場合の手順は以下の通りです。

## GN 要件

[`depot_tools`][depot-tools] をインストールする必要があります。このツールセットは Chromium とその依存関係のダウンロードに使用されます。

更に Windows では、`DEPOT_TOOLS_WIN_TOOLCHAIN=0` と環境変数を設定する必要があります。 これを行うには、`コントロール パネル` → `システムとセキュリティ` → `システム` → `システムの詳細設定` を開き、`DEPOT_TOOLS_WIN_TOOLCHAIN` 環境変数を追加して値を `0` にします。  これはローカルにインストールされているバージョンの Visual Studio を使用するように `depot_tools` に知らせます (デフォルトで `depot_tools` は Google 社員のみがアクセスできる Google 内部のバージョンをダウンロードしようとします) 。

### git キャッシュのセットアップ

Electron を複数回チェックアウトする予定がある場合 (例えば複数の並列ディレクトリを異なるブランチにチェックアウトさせるなど)、git キャッシュを使用することでその後の `gclient` 呼び出しを高速化できます。 これをするには `GIT_CACHE_PATH` 環境変数を以下のように設定する必要があります。

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# 16G ほどあります。
```

## コードを取得

```sh
$ mkdir electron-gn && cd electron-gn
$ gclient config --name "src/electron" --unmanaged https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# これはしばらくかかります。コーヒーでも飲みに行きましょう。
```

> `https://github.com/electron/electron` の代わりに、`https://github.com/<username>/electron` のような自分のフォークを使うこともできます。

### プル/プッシュ時の注意

もし将来公式の `electron` レポジトリから `git pull` や `git push` をする予定であれば、現在はそれぞれのフォルダの origin URL を更新する必要があります。

```sh
$ cd src/electron
$ git remote remove origin
$ git remote add origin https://github.com/electron/electron
$ git checkout master
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
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

Windows 上(任意の引数はなし):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\")"
```

これはデバッグビルドの設定とともに `src/` 下の `out/Testing` ビルドディレクトリに生成されます。 `Testing` は他の名前に置換できますが、`out` のサブディレクトリである必要があります。 更に `gn gen` を再び実行してはいけません。ビルド引数を変更したい場合、` gn args out/Testing` を実行してエディタを呼び出します。

利用可能なビルド設定を一覧するには、`gn args out/Testing --list` を実行してください。

**Electron の Testing ビルド設定は以下のとおりです。**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

**Electron の Release (別名 "non-component" または "static") ビルド設定は以下のとおりです。**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**ビルドするには、`ninja` を `electron` ターゲットで実行します。** 注意: これはさらなる時間を要し、パソコンも熱くなります。

テスト構成は以下のとおりです。

```sh
$ ninja -C out/Testing electron
```

リリース構成は以下のとおりです。

```sh
$ ninja -C out/Release electron
```

これは、先に "libchromiumcontent" (` chromium` の `content/` ディレクトリと WebKit や V8 を含む依存関係) のすべてをビルドします。そのため時間がかかります。

実行形式は `./out/Testing` 下に置かれます。

```sh
$ ./out/Testing/Electron.app/Contents/MacOS/Electron
# Windowsの場合
$ ./out/Testing/electron.exe
# Linuxの場合
$ ./out/Testing/electron
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
$ gn gen out/Testing-x86 --args='... target_cpu = "x86"'
```

ソースコードとターゲット CPU/OS のすべての組み合わせが Chromium でサポートされているわけではありません。

| ホスト         | ターゲット         | 状況      |
| ----------- | ------------- | ------- |
| Windows x64 | Windows arm64 | 実験的     |
| Windows x64 | Windows x86   | 自動テスト済み |
| Linux x64   | Linux x86     | 自動テスト済み |

他の組み合わせをテストしてうまく動作することがわかれば、このドキュメントを更新してください :)

[`target_os`][target_os values] と [`target_cpu`][target_cpu values] の許可されている値については、 GN リファレンスを参照してください。

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
$ ninja -C out/Testing third_party/electron_node:headers
```

これで [テストを実行](testing.md#unit-tests) できます。

もし何かをデバッグ中であれば、以下のフラグを Electron バイナリに渡すと役に立つかもしれません。

```sh
$ npm run test -- \
  --enable-logging -g 'BrowserWindow module'
```

## 複数マシン間での gitのキャッシュの共有

gclient git キャッシュを Linux 上で SMB 共有としてエクスポートすることで、他のマシンと共有することは可能ですが、一度に一つのプロセス/マシンだけがキャッシュを使用できます。 git-cache スクリプトによって作成されたロックはこれを防止しようとしますが、ネットワーク内で完璧には動作しない可能性があります。

Windows では、SMBv2 にはディレクトリキャッシュがあり、git キャッシュスクリプトに問題が発生するため、レジストリキー

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

を0に設定して無効にする必要があります。 詳細: https://stackoverflow.com/a/9935126

これは PowerShell 内ですぐに設定できます (管理者権限で実行します)。

```powershell
New-ItemProperty -Path "HKLM:\System\CurrentControlSet\Services\Lanmanworkstation\Parameters" -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
```

## トラブルシューティング

### gclient sync が rebase に関する問題を報告する

`gclient sync` が中断されると、git ツリーが不正な状態のままになってしまい、将来 `gclient sync` を実行したときに不可解なメッセージが表示されます。

```plaintext
2> Conflict while rebasing this branch.
2> Fix the conflict and run gclient again.
2> See man git-rebase for details.
```

`src/electron` に git のコンフリクトやリベースがない場合は、`src` の `git am` を abort する必要があります。

```sh
$ cd ../
$ git am --abort
$ cd electron
$ gclient sync -f
```

### chromium-internal.googlesource.com のユーザー名/パスワードを聞かれる

Windows 上で `gclient sync` を実行しているときに `Username for 'https://chrome-internal.googlesource.com':` のプロンプトが表示された場合、おそらく `DEPOT_TOOLS_WIN_TOOLCHAIN` 環境変数が 0 に設定されていないからです。 `コントロール パネル` → `システムとセキュリティ` → `システム` → `システムの詳細設定` を開き、`DEPOT_TOOLS_WIN_TOOLCHAIN` 環境変数を追加して値を `0` にします。  これはローカルにインストールされているバージョンの Visual Studio を使用するように `depot_tools` に知らせます (デフォルトで `depot_tools` は Google 社員のみがアクセスできる Google 内部のバージョンをダウンロードしようとします) 。

[application-distribution]: ../tutorial/application-distribution.md

[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

[target_os values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values
[target_cpu values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values
