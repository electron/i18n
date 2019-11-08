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

### sccache

Chromium と Electron をビルドするために幾千ものファイルをコンパイルしなければいけません。 [sccache](https://github.com/mozilla/sccache) を通して Electron CI のビルド出力を再利用することで待ち時間の多くを回避できます。 これにはいくつかの任意の手順 (下記リスト) と以下の2つの環境変数が必要です。

```sh
export SCCACHE_BUCKET="electronjs-sccache-ci"
export SCCACHE_TWO_TIER=true
```

## コードを取得

```sh
$ mkdir electron-gn && cd electron-gn
$ gclient config --name "src/electron" --unmanaged https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# これはしばらくかかります、コーヒーを飲みに行きましょう。
```

> `https://github.com/electron/electron` の代わりに、`https://github.com/<username>/electron` のような自分のフォークを使うこともできます。

#### プル/プッシュ時の注意

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
# this next line is needed only if building with sccache
$ export GN_EXTRA_ARGS="${GN_EXTRA_ARGS} cc_wrapper=\"${PWD}/electron/external_binaries/sccache\""
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

Windows 上(任意の引数はなし):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\")"
```

This will generate a build directory `out/Testing` under `src/` with the testing build configuration. You can replace `Testing` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Testing` to bring up an editor.

To see the list of available build configuration options, run `gn args
out/Testing --list`.

**For generating Testing build config of Electron:**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

**Electron の Release (別名 "non-component" または "static") ビルド設定は以下のとおりです。**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**ビルドするには、`ninja` を `electron` ターゲットで実行します。** 注意: これはさらなる時間を要し、パソコンも熱くなります。

For the testing configuration:

```sh
$ ninja -C out/Testing electron
```

リリース構成は以下のとおりです。

```sh
$ ninja -C out/Release electron
```

これは、先に "libchromiumcontent" (` chromium` の `content/` ディレクトリとWebKitとV8などの依存関係) のすべてをビルドします。そのため時間がかかります。

次回以降のビルドを高速化するには、[sccache](https://github.com/mozilla/sccache) が使用できます。 Add the GN arg `cc_wrapper = "sccache"` by running `gn args out/Testing` to bring up an editor and adding a line to the end of the file.

The built executable will be under `./out/Testing`:

```sh
$ ./out/Testing/Electron.app/Contents/MacOS/Electron
# or, on Windows
$ ./out/Testing/electron.exe
# or, on Linux
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

<table>
  
<tr><th>ホスト</th><th>ターゲット</th><th>状況</th></tr>
  
  <tr>
    <td>
      Windows x64
    </td>
    
    <td>
      Windows arm64
    </td>
    
    <td>
      実験的
    </td>
<tr><td>Windows x64</td><td>Windows x86</td><td>自動テスト済み</td></tr>
<tr><td>Linux x64</td><td>Linux x86</td><td>自動テスト済み</td></tr>
</table> 
    
    <p>
      他の組み合わせをテストしてうまく動作することがわかれば、このドキュメントを更新してください :)
    </p>
    
    <p>
      <a href="https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values"><code>target_os</code></a> と <a href="https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values"><code>target_cpu</code></a> の許可されている値については、 GN リファレンスを参照してください。
    </p>
    
    <h4>
      Arm 上で Windows (実験的)
    </h4>
    
    <p>
      Arm 上の Windows 用にクロスコンパイルするには、<a href="https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio">Chromium のガイドに従って</a> 必要な依存関係、SDK およびライブラリを取得し、<code>gclient sync</code> を実行する前に環境内で <code>ELECTRON_BUILDING_WOA=1</code> でビルドします。
    </p>
    
    <pre><code class="bat">set ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
</code></pre>
    
    <p>
      もしくは (PowerShell を用いる場合) こうします。
    </p>
    
    <pre><code class="powershell">$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
</code></pre>
    
    <p>
      それから、上記のように <code>target_cpu="arm64"</code> で <code>gn gen</code> を実行します。
    </p>
    
    <h2>
      テスト
    </h2>
    
    <p>
      このテストを実行するために、あなたは最初に、このビルドプロセスの一部としてビルドする Node.js と同じバージョンに対してテストモジュールをビルドする必要があります。 再びコンパイルするモジュールのためのビルドヘッダを生成するために、<code>src/</code>ディレクトリの下で以下のように実行します。
    </p>
    
    <pre><code class="sh">$ ninja -C out/Testing third_party/electron_node:headers
</code></pre>
    
    <p>
      これで <a href="testing.md#unit-tests">テストを実行</a> できます。
    </p>
    
    <p>
      もし何かをデバッグ中であれば、以下のフラグを Electron バイナリに渡すと役に立つかもしれません。
    </p>
    
    <pre><code class="sh">$ npm run test -- \
  --enable-logging -g 'BrowserWindow module'
</code></pre>
    
    <h2>
      複数マシン間での gitのキャッシュの共有
    </h2>
    
    <p>
      gclient git キャッシュを Linux 上で SMB 共有としてエクスポートすることで、他のマシンと共有することは可能ですが、一度に一つのプロセス/マシンだけがキャッシュを使用できます。 git-cache スクリプトによって作成されたロックはこれを防止しようとしますが、ネットワーク内で完璧には動作しない可能性があります。
    </p>
    
    <p>
      Windows では、SMBv2 にはディレクトリキャッシュがあり、git キャッシュスクリプトに問題が発生するため、レジストリキー
    </p>
    
    <pre><code class="sh">HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
</code></pre>
    
    <p>
      を0に設定して無効にする必要があります。 詳細: https://stackoverflow.com/a/9935126
    </p>
    
    <p>
      これは PowerShell 内ですぐに設定できます (管理者権限で実行します)。
    </p>
    
    <pre><code class="powershell">New-ItemProperty -Path "HKLM:\System\CurrentControlSet\Services\Lanmanworkstation\Parameters" -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
</code></pre>
    
    <h2>
      トラブルシューティング
    </h2>
    
    <h3>
      git キャッシュ内の古いロック
    </h3>
    
    <p>
      git キャッシュを使用している間に <code>gclient sync</code> が割り込まれた場合、キャッシュがロックされたままになります。 このロックを除去するには、<code>gclient sync</code> に <code>--break_repo_locks</code> 引数を渡します。
    </p>
    
    <h3>
      chromium-internal.googlesource.com のユーザー名/パスワードを聞かれる
    </h3>
    
    <p>
      Windows 上で <code>gclient sync</code> を実行しているときに <code>Username for 'https://chrome-internal.googlesource.com':</code> のプロンプトが表示された場合、おそらく <code>DEPOT_TOOLS_WIN_TOOLCHAIN</code> 環境変数が 0 に設定されていないからです。 <code>コントロール パネル</code> → <code>システムとセキュリティ</code> → <code>システム</code> → <code>システムの詳細設定</code> を開き、<code>DEPOT_TOOLS_WIN_TOOLCHAIN</code> 環境変数を追加して値を <code>0</code> にします。 これはローカルにインストールされているバージョンの Visual Studio を使用するように <code>depot_tools</code> に知らせます (デフォルトで <code>depot_tools</code> は Google 社員のみがアクセスできる Google 内部のバージョンをダウンロードしようとします) 。
    </p>