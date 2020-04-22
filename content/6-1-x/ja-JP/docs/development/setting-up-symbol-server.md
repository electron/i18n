# デバッガでシンボルサーバを設定

デバッグシンボルは、よりよいデバッグセッションができるようにします。 それらは実行形式と動的ライブラリに含まれる関数についての情報を持ち、クリーンなコールスタックを取得するための情報を提供します。 Symbol Server を使用すると、デバッガは大きなデバッグファイルをユーザにダウンロードさせることなく、正しいシンボル、バイナリ、そしてソースを自動的にロードできます。 このサーバーは [Microsoft's symbol server](https://support.microsoft.com/kb/311503) のように機能するもので、そこにあるドキュメントが役立つかもしれません。

リリースされた Electron ビルドは非常に最適化されているため、デバッグは必ずしも容易ではないことに注意してください。 デバッガはすべての変数の内容は表示できませんし、インラインに展開されたり、末尾再帰やその他のコンパイラによる最適化により実行経路は奇妙に見えるはずです。 唯一の回避策は、最適化されていないローカルビルドをビルドすることです。

Electron の公式シンボルサーバの URL は https://electron-symbols.githubapp.com です。 この URL に直接アクセスすることはできません。デバッグツールのシンボルパスに追加する必要があります。 以下の例では、ローカルキャッシュディレクトリを使用してサーバーから PDB を繰り返し取得しないようにしています。 `c:\code\symbols` をコンピュータ上の適切なキャッシュディレクトリに置き換えてください。

## Windbg でシンボルサーバを使用する

Windbg シンボルパスは、アスタリスク文字で区切られた文字列値で構成されています。 Electron シンボルサーバーのみを使用するには、以下のシンボルパスに次のエントリを追加します (**注意:** `c:\code\symbols` をコンピュータ上の書き込み可能なディレクトリに置き換えてください)。

```powershell
SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

Windbg メニューを使用するか、または `.sympath` コマンドを入力して、環境内でこの文字列を `_NT_SYMBOL_PATH` に設定します。 Microsoft のシンボルサーバーからもシンボルを取得したい場合は、先にそれを並べる必要があります。

```powershell
SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://electron-symbols.githubapp.com
```

## Visual Studio 内でシンボルサーバを使用する

<img src='https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg' />
<img src='https://mdn.mozillademos.org/files/2497/2005_options.gif' />

## トラブルシューティング: シンボルが読み込めない

Windbg で次のコマンドを入力して、シンボルが読み込まれない理由を表示します。

```powershell
> !sym noisy
> .reload /f electron.exe
```
