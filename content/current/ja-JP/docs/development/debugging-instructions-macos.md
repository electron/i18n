# macOS におけるデバッグ

JavaScript アプリケーションに起因しないと思われるクラッシュや問題が Electron 上で起こった場合、特にネイティブ/ C++ デバッグの経験がない開発者にとって少しトリッキーなデバッグになります。 しかし、lldb と Electron のソースコードを使用することで、Electron のソースコード内でブレークポイントを使用したステップ実行デバッグを有効にできます。 グラフィカルインタフェースを希望する場合は、[Xcode におけるデバッグ](debugging-instructions-macos-xcode.md) を使用することもできます。

## 要件

* **Electronのデバッグビルド**: 最も簡単な方法は、[ビルド手順 (macOS)](build-instructions-macos.md) にリストされているツールと必要な環境を使って、自分でビルドをする方法です。 Electron を直接ダウンロードしてアタッチしデバッグできますが、Electron は高度に最適化されているためデバッグが困難であることに気付くでしょう。デバッガはすべての変数の内容は表示できませんし、インラインに展開されたり、末尾再帰やその他のコンパイラによる最適化により実行経路は奇妙に見えるはずです。

* **Xcode**: Xcode では、加えて Xcode コマンドラインツールもインストールします。 macOS の XCode には、デフォルトのデバッガの LLDB が入っています。 C、Objective-C、C++ のデバッグを、デスクトップ、iOS デバイス、シミュレータ上でサポートします。

* **.lldbinit**: `~/.lldbinit` を以下のように作成及び編集し、Chromium コードを適切にソースマップできるようにします。
   ```text
   command script import ~/electron/src/tools/lldb/lldbinit.py
   ```

## Electronへの接続とデバッグ

デバッグセッションを始めるには、ターミナルを開いて Electron のリリースでないビルドを引数として渡して `lldb` を実行します。

```sh
$ lldb ./out/Testing/Electron.app
(lldb) target create "./out/Testing/Electron.app"
Current executable set to './out/Testing/Electron.app' (x86_64).
```

### ブレークポイントの設定

LLDBは強力なツールであり、コード検査のための複数の計画をサポートします。 この基本的な導入では、正しく動作していないコマンドを JavaScript から呼び出していると仮定しましょう。Electron ソース内に対応するコマンドの C++をブレークしたいとします。

関連コードファイルは `./shell/` にあります。

`browser.cc` 内に `Browser::SetName()` として定義されている `app.setName()` をデバッグしたいと仮定しましょう。 `breakpoint` コマンドを用いて、以下のようにブレークするファイルと行を指定してブレークポイントを設定します。

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

そして、 Electron を実行します。

```sh
(lldb) run
```

Electron は起動時にアプリの名前を設定するため、アプリはすぐに一時停止されます。

```sh
(lldb) run
Process 25244 launched: '/Users/fr/Code/electron/out/Testing/Electron.app/Contents/MacOS/Electron' (x86_64)
Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
    frame #0: 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118
   115  }
   116
   117  void Browser::SetName(const std::string& name) {
-> 118    name_override_ = name;
   119  }
   120
   121  int Browser::GetBadgeCount() {
(lldb)
```

現在のフレームの引数とローカル変数を表示するには、`frame variable` (または `fr v`) を実行します。アプリの名前が現在は "Electron" にセットされているのが表示されるでしょう。

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

現在のスレッド内でソースレベルステップ実行するには、`step` (または `s`) を実行します。 これにより、`name_override_.empty()` に飛びます。 処理してステップオーバーするには、`next` (または `n`) を実行します。

```sh
(lldb) step
Process 25244 stopped
* thread #1: tid = 0x839a4c, 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119, queue = 'com.apple.main-thread', stop reason = step in
    frame #0: 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119
   116
   117  void Browser::SetName(const std::string& name) {
   118    name_override_ = name;
-> 119  }
   120
   121  int Browser::GetBadgeCount() {
   122    return badge_count_;
```

**注意:** 表示しようとしてもソースコードが表示されない場合は、上記の `~/.lldbinit ` ファイルを追加していない可能性があります。

このポイントでのデバッグが完了したら、`process continue` を実行します。 このスレッドで特定の行がヒットするまで (`thread until 100`) 続行することもできます。 このコマンドは、このフレームの100行目に達するまで、現在のフレーム内のスレッドを実行し、現在のフレームを終了すると停止します。

今、Electron の開発者ツールを開いて `setName` を呼び出すと、もう一度ブレークポイントにヒットします。

### 参考リンク
LLDB は素晴らしいドキュメントを備えた強力なツールです。 詳細については、[LLDB コマンド構造リファレンス](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) や [LLDB をスタンドアロンデバッガとして使用する方法](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html) などの Apple のデバッグドキュメントを参照してください。

さらに複雑なデバッグシナリオについて説明されている、LLDB の素晴らしい [マニュアルとチュートリアル](http://lldb.llvm.org/tutorial.html) も参考にできます。
