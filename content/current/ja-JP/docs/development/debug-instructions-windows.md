# Windows におけるデバッグ

JavaScriptアプリケーションによらないと思われるクラッシュや問題がElectron上で起こった場合、デバッグは少し複雑になります。ネイティブ/C++の経験がない場合には得にそうでしょう。 しかし、Visual Studio、Github にホストされている Electron のシンボルサーバーと Electron のソースコードを使用することで、Electron のソースコード内でブレークポイントを使用したデバッグを有効にできます。

**See also**: There's a wealth of information on debugging Chromium, much of which also applies to Electron, on the Chromium developers site: [Debugging Chromium on Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

## 要件

* **A debug build of Electron**: The easiest way is usually building it yourself, using the tools and prerequisites listed in the [build instructions for Windows](build-instructions-windows.md). Electron を直接ダウンロードしてアタッチしデバッグできますが、Electron は高度に最適化されているためデバッグが困難であることに気付くでしょう。デバッガはすべての変数の内容は表示できませんし、インラインに展開されたり、末尾再帰やその他のコンパイラによる最適化により実行経路は奇妙に見えるはずです。

* **Visual Studio with C++ Tools**: The free community editions of Visual Studio 2013 and Visual Studio 2015 both work. インストール後[GithubのElectron シンボルサーバーを使うための設定を行います](setting-up-symbol-server.md)。 これによりVisual StudioがElectron内で起こっていることをより理解できるようになり、人が読める形式で現在の変数を表示することができます。

* **ProcMon**: The [free SysInternals tool](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) allows you to inspect a processes parameters, file handles, and registry operations.

## Electronへの接続とデバッグ

デバッグセッションを始めるには、PowerShell/CMD を開いて Electron のデバッグビルドを実行し、引数として開くアプリケーションを渡して使用します。

```powershell
$ ./out/Testing/electron.exe ~/my-electron-app/
```

### ブレークポイントの設定

そして、Visual Studio を開きます。 Electron は Visual Studio でビルドされていないため、プロジェクトファイルは含まれていません。しかし、ソースコードファイルを "ファイルとして" 開くことができます。つまり、Visual Studio がそれ単独で開きます。 ブレークポイントを設定することもできます。 Visual Studio は、ソースコードがアタッチされたプロセスで実行されているコードと一致することを自動的に認識し、それに応じてブレークします。

関連コードファイルは `./shell/` にあります。

### アタッチ

ローカルまたはリモートコンピュータ上で実行中のプロセスに Visual Studio デバッガをアタッチできます。 プロセスを実行中にしてから、"プロセスにアタッチ" ダイアログを開くためにプロセスにデバッグ/アタッチをクリック (または `CTRL+ALT+P` を押下) します。 この機能を使用してローカルまたはリモートコンピュータ上で実行されているアプリをデバッグし、複数のプロセスを同時にデバッグすることができます。

Electron が異なるユーザアカウントで実行されている場合、`すべてのユーザからのプロセスを表示する` チェックボックスを選択してください。 開かれているアプリの BrowserWindow の数に応じて、複数のプロセスが表示されることに注意してください。 典型的な1ウインドウアプリは、Visual Studio に2つの `Electron.exe` エントリ - メインプロセス用とレンダラプロセス用を表示します。 リストは名前だけを表示するので、どちらがどちらであるかを把握する信頼できる方法は現在ありません。

### どのプロセスにアタッチするべきか

メインの JavaScript ファイルで検出されるコードとリモート (`require('electron').remote`) を使用して呼び出されるコードは、最終的にメインプロセス内で実行され、他のコードはそれぞれのレンダラープロセス内で実行されます。

デバッグ中は複数のプログラムにアタッチすることができますが、随時1つのプログラムだけがデバッガでアクティブになります。 `デバッグの場所` ツールバーか `プロセスウインドウ` 内でアクティブなプログラムをセットできます。

## プロセス監視にProcMonを使用する

Visual Studio は特定のコードパスを検査するのには優れていますが、ProcMon の強みは、アプリケーションのオペレーティングシステムで行われているすべてのことを実際に監視していることです。プロセスのファイル、レジストリ、ネットワーク、プロセス、プロファイリングの詳細をキャプチャします。 It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

ProcMon の基本及び高度なデバッグ機能については、Microsoft が提供する [このビデオチュートリアル](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) を参照してください。
