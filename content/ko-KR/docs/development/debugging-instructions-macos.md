# Debugging on macOS

만약 작성한 Javascript 애플리케이션이 아닌 Electron 자체의 크래시나 문제를 경험하고 있다면, 네이티브/C++ 디버깅에 익숙하지 않은 개발자는 디버깅이 약간 까다로울 수 있습니다. However, using lldb, and the Electron source code, it is fairly easy to enable step-through debugging with breakpoints inside Electron's source code.

## 요구 사항

* **A debug build of Electron**: The easiest way is usually building it yourself, using the tools and prerequisites listed in the [build instructions for macOS](build-instructions-osx.md). 물론 직접 다운로드 받은 Electron 바이너리에도 디버거 연결 및 디버깅을 사용할 수 있지만, 실질적으로 디버깅이 까다롭게 고도의 최적화가 되어있음을 발견하게 될 것입니다: 인라인화, 꼬리 호출, 이외 여러 가지 생소한 최적화가 적용되어 디버거가 모든 변수와 실행 경로를 정상적으로 표시할 수 없습니다.

* **Xcode**: In addition to Xcode, also install the Xcode command line tools. They include LLDB, the default debugger in Xcode on Mac OS X. It supports debugging C, Objective-C and C++ on the desktop and iOS devices and simulator.

## Electron에 디버거 연결하고 디버깅하기

To start a debugging session, open up Terminal and start `lldb`, passing a debug build of Electron as a parameter.

```bash
$ lldb ./out/D/Electron.app
(lldb) target create "./out/D/Electron.app"
Current executable set to './out/D/Electron.app' (x86_64).
```

### 중단점 설정

LLDB is a powerful tool and supports multiple strategies for code inspection. For this basic introduction, let's assume that you're calling a command from JavaScript that isn't behaving correctly - so you'd like to break on that command's C++ counterpart inside the Electron source.

관련된 코드 파일들은 `./atom/`에서 찾을 수 있으며 또한 Brightray 안 `./brightray/browser`와 `./brightray/common`에서도 찾을 수 있습니다. 만약 하드코어를 좋아한다면, Chromium을 직접 디버깅할 수도 있습니다. 확실히 `chromium_src` 안에서 찾을 수 있습니다.

Let's assume that you want to debug `app.setName()`, which is defined in `browser.cc` as `Browser::SetName()`. Set the breakpoint using the `breakpoint` command, specifying file and line to break on:

```bash
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Then, start Electron:

```bash
(lldb) run
```

The app will immediately be paused, since Electron sets the app's name on launch:

```bash
(lldb) run
Process 25244 launched: '/Users/fr/Code/electron/out/D/Electron.app/Contents/MacOS/Electron' (x86_64)
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

```bash
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

To do a source level single step in the currently selected thread, execute `step` (or `s`). This would take you into `name_override_.empty()`. To proceed and do a step over, run `next` (or `n`).

```bash
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