# Windows におけるデバッグ

JavaScriptアプリケーションによらないと思われるクラッシュや問題がElectron上で起こった場合、デバッグは少し複雑になります。ネイティブ/C++の経験がない場合には得にそうでしょう。 しかし、Visual Studio、Github にホストされている Electron のシンボルサーバーと Electron のソースコードを使用することで、Electron のソースコード内でブレークポイントを使用したデバッグを有効にできます。

**こちらも参照**: Chromium のデバッグに関する豊富な情報があります。その多くは Chromium 開発者サイト ([Debugging Chromium on Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows)) の Electron にも適しています。

## 要件

* **Electronのデバッグビルド**: 最も簡単な方法は、[ビルド手順 (Windows) ](build-instructions-windows.md)にリストされているツールと必要な環境を使って、自分でビルドをする方法です。 Electron を直接ダウンロードしてアタッチしデバッグできますが、Electron は高度に最適化されているためデバッグが困難であることに気付くでしょう。デバッガはすべての変数の内容は表示できませんし、インラインに展開されたり、末尾再帰やその他のコンパイラによる最適化により実行経路は奇妙に見えるはずです。

* **Visual Studio with C++ Tools**: Visual Studio 2013 と Visual Studio 2015 の無料コミュニティ版両方が動きます。 インストール後[GithubのElectron シンボルサーバーを使うための設定を行います](setting-up-symbol-server.md)。 これによりVisual StudioがElectron内で起こっていることをより理解できるようになり、人が読める形式で現在の変数を表示することができます。

* **ProcMon**: [無料の SysInternals ツール](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx)を使うことでプロセスパラメーター、ファイル操作、レジストリ操作を検査することができます。

## Electronへの接続とデバッグ

デバッグセッションを始めるには、PowerShell/CMD を開いて Electron のデバッグビルドを実行し、引数として開くアプリケーションを渡して使用します。

```powershell
$ ./out/Debug/electron.exe ~/my-electron-app/
```

### ブレークポイントの設定

そして、Visual Studio を開きます。 Electron は Visual Studio でビルドされていないため、プロジェクトファイルは含まれていません。しかし、ソースコードファイルを "ファイルとして" 開くことができます。つまり、Visual Studio がそれ単独で開きます。 ブレークポイントを設定することもできます。 Visual Studio は、ソースコードがアタッチされたプロセスで実行されているコードと一致することを自動的に認識し、それに応じてブレークします。

関連するコードファイルは `./atom/` にあります。

### アタッチ

ローカルまたはリモートコンピュータ上で実行中のプロセスに Visual Studio デバッガをアタッチできます。 プロセスを実行中にしてから、"プロセスにアタッチ" ダイアログを開くためにプロセスにデバッグ/アタッチをクリック (または `CTRL+ALT+P` を押下) します。 この機能を使用してローカルまたはリモートコンピュータ上で実行されているアプリをデバッグし、複数のプロセスを同時にデバッグすることができます。

Electron が異なるユーザアカウントで実行されている場合、`すべてのユーザからのプロセスを表示する` チェックボックスを選択してください。 開かれているアプリの BrowserWindow の数に応じて、複数のプロセスが表示されることに注意してください。 典型的な1ウインドウアプリは、Visual Studio に2つの `Electron.exe` エントリ - メインプロセス用とレンダラプロセス用を表示します。 リストは名前だけを表示するので、どちらがどちらであるかを把握する信頼できる方法は現在ありません。

### どのプロセスにアタッチするべきか

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

## プロセス監視にProcMonを使用する

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.