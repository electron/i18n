# Отладка под macOS

Если вы наблюдаете аварии или проблемы в работе Electron, которые, как вы считаете, вызваны самим Electron, а не приложением на JavaScript, отладка может быть немного сложной, особенно для разработчиков ранее не занимавшихся отладкой кода на C++. Однако, используя lldb и исходный код Electron, вы можете включить отладку с точками останова внутри исходного кода Electron. Если вы предпочитаете графический интерфейс, Вы также можете использовать [XCode для отладки](debugging-instructions-macos-xcode.md).

## Требования

* **A debug build of Electron**: The easiest way is usually building it yourself, using the tools and prerequisites listed in the [build instructions for macOS](build-instructions-macos.md). Вы конечно можете скачать обычную сборку Electron и подключиться для отладки к ней, но вы обнаружите, что она сильно оптимизирована, и это существенно затрудняет отладку: отладчик не сможет показать вам содержимое всех переменных, так же путь выполнения может казаться странным вследствие встраивания функций (inlining), хвостовых вызовов (trail calls) и других оптимизаций, выполненных компилятором.

* **Xcode**: In addition to Xcode, also install the Xcode command line tools. Они включают в себя LLDB, дебаггер по умолчанию в Xcode на macOS. Он поддерживает отладку C, Objective-C и C++ на настольных и iOS устройствах и симуляторах.

* **.lldbinit**: Create or edit `~/.lldbinit` to allow Chromium code to be properly source-mapped.
   ```text
   скрипт команды импортирует ~/electron/src/tools/lldb/lldbinit.py. 07gf
   ```

## Подключение к Electron для отладки

To start a debugging session, open up Terminal and start `lldb`, passing a non-release build of Electron as a parameter.

```sh
$ lldb ./out/Testing/Electron.app
(lldb) target create "./out/Testing/Electron.app"
Current executable set to './out/Testing/Electron.app' (x86_64).
```

### Задание точек останова

LLDB is a powerful tool and supports multiple strategies for code inspection. For this basic introduction, let's assume that you're calling a command from JavaScript that isn't behaving correctly - so you'd like to break on that command's C++ counterpart inside the Electron source.

Соответствующие файлы кода можно найти в `./atom/`.

Let's assume that you want to debug `app.setName()`, which is defined in `browser.cc` as `Browser::SetName()`. Set the breakpoint using the `breakpoint` command, specifying file and line to break on:

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string&lt;char, std::__1::char_traits&lt;char&gt;, std::__1::allocator&lt;char&gt; > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Then, start Electron:

```sh
(lldb) run
```

The app will immediately be paused, since Electron sets the app's name on launch:

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

**NOTE:** If you don't see source code when you think you should, you may not have added the `~/.lldbinit` file above.

To finish debugging at this point, run `process continue`. You can also continue until a certain line is hit in this thread (`thread until 100`). This command will run the thread in the current frame till it reaches line 100 in this frame or stops if it leaves the current frame.

Now, if you open up Electron's developer tools and call `setName`, you will once again hit the breakpoint.

### Дальнейшее изучение
LLDB это мощный инструмент с отличной документацией. To learn more about it, consider Apple's debugging documentation, for instance the [LLDB Command Structure Reference][lldb-command-structure] or the introduction to [Using LLDB as a Standalone Debugger][lldb-standalone].

You can also check out LLDB's fantastic [manual and tutorial][lldb-tutorial], which will explain more complex debugging scenarios.

[lldb-command-structure]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2
[lldb-standalone]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html
[lldb-tutorial]: http://lldb.llvm.org/tutorial.html
