# macOS におけるデバッグ

JavaScript アプリケーションに起因しないと思われるクラッシュや問題が Electron 上で起こった場合、特にネイティブ/ C++ デバッグの経験がない開発者にとって少しトリッキーなデバッグになります。 しかし、lldb と Electron のソースコードを使用することで、Electron のソースコード内でブレークポイントを使用したステップ実行デバッグを有効にできます。 グラフィカルインタフェースを希望する場合は、[Xcode におけるデバッグ](debugging-instructions-macos-xcode.md) を使用することもできます。

## 要件

* **Electronのデバッグビルド**: 最も簡単な方法は、[ビルド手順 (macOS)](build-instructions-macos.md) にリストされているツールと必要な環境を使って、自分でビルドをする方法です。 Electron を直接ダウンロードしてアタッチしデバッグできますが、Electron は高度に最適化されているためデバッグが困難であることに気付くでしょう。デバッガはすべての変数の内容は表示できませんし、インラインに展開されたり、末尾再帰やその他のコンパイラによる最適化により実行経路は奇妙に見えるはずです。

* **Xcode**: Xcode では、加えて Xcode コマンドラインツールもインストールします。 Mac OS X の Xcode にはデフォルトのデバッガである LLDB が含まれています。C、Objective-C、C++ のデバッグを、デスクトップ、iOS デバイス、シミュレータ上でサポートしています。

## Electronへの接続とデバッグ

デバッグセッションを始めるには、ターミナルを開いて Electron のデバッグビルドを引数として渡して `lldb` を実行します。

```sh
$ lldb ./out/Debug/Electron.app
(lldb) target create "./out/Debug/Electron.app"
Current executable set to './out/Debug/Electron.app' (x86_64).
```

### ブレークポイントの設定

LLDBは強力なツールであり、コード検査のための複数の計画をサポートします。 For this basic introduction, let's assume that you're calling a command from JavaScript that isn't behaving correctly - so you'd like to break on that command's C++ counterpart inside the Electron source.

関連するコードファイルは `./atom/` にあります。

Let's assume that you want to debug `app.setName()`, which is defined in `browser.cc` as `Browser::SetName()`. Set the breakpoint using the `breakpoint` command, specifying file and line to break on:

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Then, start Electron:

```sh
(lldb) run
```

The app will immediately be paused, since Electron sets the app's name on launch:

```sh
(lldb) run
Process 25244 launched: '/Users/fr/Code/electron/out/Debug/Electron.app/Contents/MacOS/Electron' (x86_64)
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

To show the arguments and local variables for the current frame, run `frame variable` (or `fr v`), which will show you that the app is currently setting the name to "Electron".

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

To do a source level single step in the currently selected thread, execute `step` (or `s`). This would take you into `name_override_.empty()`. To proceed and do a step over, run `next` (or `n`).

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

To finish debugging at this point, run `process continue`. You can also continue until a certain line is hit in this thread (`thread until 100`). This command will run the thread in the current frame till it reaches line 100 in this frame or stops if it leaves the current frame.

Now, if you open up Electron's developer tools and call `setName`, you will once again hit the breakpoint.

### Further Reading

LLDB is a powerful tool with a great documentation. To learn more about it, consider Apple's debugging documentation, for instance the [LLDB Command Structure Reference](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) or the introduction to [Using LLDB as a Standalone Debugger](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

You can also check out LLDB's fantastic [manual and tutorial](http://lldb.llvm.org/tutorial.html), which will explain more complex debugging scenarios.