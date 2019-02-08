# デバッガでシンボルサーバを設定

デバッグシンボルは、よりよいデバッグセッションができるようにします。 それらは実行形式と動的ライブラリに含まれる関数についての情報を持ち、クリーンなコールスタックを取得するための情報を提供します。 Symbol Server を使用すると、デバッガは大きなデバッグファイルをユーザにダウンロードさせることなく、正しいシンボル、バイナリ、そしてソースを自動的にロードできます。 このサーバーは [Microsoft's symbol server](https://support.microsoft.com/kb/311503) のように機能するもので、そこにあるドキュメントが役立つかもしれません。

リリースされた Electron ビルドは非常に最適化されているため、デバッグは必ずしも容易ではないことに注意してください。 デバッガはすべての変数の内容は表示できませんし、インラインに展開されたり、末尾再帰やその他のコンパイラによる最適化により実行経路は奇妙に見えるはずです。 唯一の回避策は、最適化されていないローカルビルドをビルドすることです。

Electron の公式シンボルサーバの URL は https://electron-symbols.githubapp.com です。 この URL に直接アクセスすることはできません。デバッグツールのシンボルパスに追加する必要があります。 In the examples below, a local cache directory is used to avoid repeatedly fetching the PDB from the server. Replace `c:\code\symbols` with an appropriate cache directory on your machine.

## Using the Symbol Server in Windbg

The Windbg symbol path is configured with a string value delimited with asterisk characters. To use only the Electron symbol server, add the following entry to your symbol path (**Note:** you can replace `c:\code\symbols` with any writable directory on your computer, if you'd prefer a different location for downloaded symbols):

```powershell
SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

Set this string as `_NT_SYMBOL_PATH` in the environment, using the Windbg menus, or by typing the `.sympath` command. If you would like to get symbols from Microsoft's symbol server as well, you should list that first:

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

## Using the symbol server in Visual Studio

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' /> <img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />

## Troubleshooting: Symbols will not load

Type the following commands in Windbg to print why symbols are not loading:

```powershell
> !sym noisy
> .reload /f electron.exe
```