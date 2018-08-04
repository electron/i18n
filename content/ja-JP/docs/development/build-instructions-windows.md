# ビルド手順 (Windows)

Windows 版 Electron のビルドについては、以下のガイドラインに従ってください。

## 必要な環境

* Windows 7 / Server 2008 R2 以上
* Visual Studio 2017 - [VS 2017 Community Edition (無料) をダウンロード](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Windows 向けデバッグツール](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) - `.pdb` ファイルからシンボルストアを作成するために `symstore.exe` が使用されるため、フルディストリビューションを作成する予定がある場合に使用します。

現在 Windows インストールを持っていない場合、[dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) に Electron をビルドするために使用できる Windows のバージョンがあります。

Electron のビルドは完全にコマンドラインスクリプトで行われ、Visual Studio では実行できません。 任意のエディタで Electron を開発できますが、将来 Visual Studio を使用したビルドがサポートされます。

**注釈:** Visual Studio はビルドに使用されていませんが、それが提供するビルドツールチェーンが必要なため、まだ **必要** です。

## コードを取得する

```powershell
$ git clone https://github.com/electron/electron.git
```

## ブートストラップ

ブートストラップスクリプトはビルドに必要な全ての依存関係をダウンロードし、ビルドプロジェクトファイルを作成します。 なお、Electron のビルドには `ninja` を用いるため、 Visual Studio のプロジェクトファイルが生成されないことにご留意ください。

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## ビルド

Release と Debug の両方をターゲットにしてビルドする場合、以下のコマンドを実行してください。

```powershell
$ python script\build.py
```

また、以下のように、Debug のみをターゲットにしてビルドすることもできます。

```powershell
$ python script\build.py -c D
```

ビルド完了後、`out/D` (Debug ターゲット) または `out/R` (Release ターゲット) 下に `electron.exe` が見られます。

## 32ビットビルド

32ビットターゲットをビルドするには、ブートストラップスクリプトを実行するときに `--target_arch=ia32` を渡す必要があります。

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

他のビルド手順は全く同じです。

## Visual Studio プロジェクト

Visual Studio プロジェクトを生成するには、`--msvs` 引数を渡します。

```powershell
$ python script\bootstrap.py --msvs
```

## クリーン

以下でビルドファイルをクリーンします。

```powershell
$ npm run clean
```

以下で `out` と `dist` ディレクトリだけをクリーンします。

```sh
$ npm run clean-build
```

**注釈:** どちらのクリーンコマンドもビルド前に `ブートストラップ` を再度実行する必要があります。

## テスト

[ビルドシステム概要: テスト](build-system-overview.md#tests) を参照してください。

## トラブルシューティング

### Command xxxx not found

`Command xxxx not found` のようなエラーに遭遇した場合、`開発者コマンド プロンプト for VS2015` コンソールを使用してビルドスクリプトを実行してみましょう。

### Fatal internal compiler error: C1001

最新の Visual Studio アップデートがインストールされていることを確認してください。

### Assertion failed: ((handle))->activecnt >= 0

Cygwin 下でビルドしている場合、`bootstrap.py` は以下のようなエラーで失敗しているでしょう。

```sh
Assertion failed: ((handle))->activecnt >= 0, file src\win\pipe.c, line 1430

Traceback (most recent call last):
  File "script/bootstrap.py", line 87, in <module>
    sys.exit(main())
  File "script/bootstrap.py", line 22, in main
    update_node_modules('.')
  File "script/bootstrap.py", line 56, in update_node_modules
    execute([NPM, 'install'])
  File "/home/zcbenz/codes/raven/script/lib/util.py", line 118, in execute
    raise e
subprocess.CalledProcessError: Command '['npm.cmd', 'install']' returned non-zero exit status 3
```

これは、Cygwin Python とWin32 Node を一緒に使用するときのバグが原因です。 解決方法は、以下のように Win32 Python を使用してブートストラップスクリプトを実行することです (Python を `C:\Python27` の下にインストールしたと仮定します)。

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

32ビット Node.js を再インストールしてください。

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

以下のようにディレクトリを作成すると [問題](https://stackoverflow.com/a/25095327/102704) は解決するはずです。

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

ビルドに Git Bash を使用している場合は、代わりに PowerShell または 開発者コマンド プロンプト for VS2015 を使用する必要があります。