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

After building is done, you can find `electron.exe` under `out\D` (debug target) or under `out\R` (release target).

## 32ビットビルド

To build for the 32bit target, you need to pass `--target_arch=ia32` when running the bootstrap script:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

The other building steps are exactly the same.

## Visual Studio プロジェクト

To generate a Visual Studio project, you can pass the `--msvs` parameter:

```powershell
$ python script\bootstrap.py --msvs
```

## クリーン

To clean the build files:

```powershell
$ npm run clean
```

To clean only `out` and `dist` directories:

```sh
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## テスト

See [Build System Overview: Tests](build-system-overview.md#tests)

## トラブルシューティング

### Command xxxx not found

If you encountered an error like `Command xxxx not found`, you may try to use the `VS2015 Command Prompt` console to execute the build scripts.

### Fatal internal compiler error: C1001

Make sure you have the latest Visual Studio update installed.

### Assertion failed: ((handle))->activecnt >= 0

If building under Cygwin, you may see `bootstrap.py` failed with following error:

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

This is caused by a bug when using Cygwin Python and Win32 Node together. The solution is to use the Win32 Python to execute the bootstrap script (assuming you have installed Python under `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

Try reinstalling 32bit Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

You may get this error if you are using Git Bash for building, you should use PowerShell or VS2015 Command Prompt instead.