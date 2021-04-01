# Отладка под macOS

Если вы наблюдаете аварии или проблемы в работе Electron, которые, как вы считаете, вызваны самим Electron, а не приложением на JavaScript, отладка может быть немного сложной, особенно для разработчиков ранее не занимавшихся отладкой кода на C++. Однако, используя lldb и исходный код Electron, вы можете включить отладку с точками останова внутри исходного кода Electron. Если вы предпочитаете графический интерфейс, Вы также можете использовать [XCode для отладки](debugging-instructions-macos-xcode.md).

## Требования

* **отладка сборки Electron**: Самый простой способ, как правило, строить его себя, используя инструменты и предпосылки, перечисленные в [инструкции по сборке macOS](build-instructions-macos.md). Вы конечно можете скачать обычную сборку Electron и подключиться для отладки к ней, но вы обнаружите, что она сильно оптимизирована, и это существенно затрудняет отладку: отладчик не сможет показать вам содержимое всех переменных, так же путь выполнения может казаться странным вследствие встраивания функций (inlining), хвостовых вызовов (trail calls) и других оптимизаций, выполненных компилятором.

* **Xcode**: В дополнение к Xcode, также установите утилиты командной строки Xcode. Они включают в себя LLDB, дебаггер по умолчанию в Xcode на macOS. Он поддерживает отладку C, Objective-C и C++ на настольных и iOS устройствах и симуляторах.

* **.lldbinit**: Создайте или отредактировать `~/.lldbinit` , чтобы код Chromium был правильно отображен на источнике.

   ```text
   скрипт команды импортирует ~/electron/src/tools/lldb/lldbinit.py. 07gf
   ```

## Подключение к Electron для отладки

Чтобы начать сеанс отладки, откройте Терминал и `lldb`, пройдя неразимную Electron в качестве параметра.

```sh
$ lldb ./out/Testing/Electron.app
(lldb) цель создать "./out/Testing/Electron.app"
Текущий выполненный набор './out/Testing/Electron.app' (x86_64).
```

### Задание точек останова

LLDB является мощным инструментом и поддерживает несколько стратегий проверки кода. Для этого базового введения, предположим, что вы звоните команде из JavaScript , которая ведет себя неправильно - так что вы хотели бы сломать на C-C- аналог этой команды внутри источника Electron.

Соответствующие файлы кода можно найти в `./shell/`.

Допустим, вы хотите отладить его, `app.setName()`определяется в `browser.cc` как `Browser::SetName()`. Установите точку разрыва с помощью `breakpoint` , указав файл и строку, чтобы взломать:

```sh
(lldb) набор точки разрыва --файл browser.cc --линия 117
Breakpoint 1: где q Electron Framework'atom::Browser::SetName (std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::выделитель<char> > const&) No 20 в browser.cc:118, адрес 0x000000000015fdb4
```

Затем, запустите Electron:

```sh
(lldb) запуск
```

Приложение будет немедленно приостановлено, так как Electron устанавливает имя приложения на запуске:

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

Чтобы показать аргументы и локальные переменные для текущего кадра, запустите `frame variable` (или `fr v`), который покажет вам, что приложение в настоящее время устанавливает имя "Электрон".

```sh
(lldb) переменная переменная
(атом:::Браузер) это 0x0000000108b14f20
( &) имя - "
    [...]Электрон":
}
```

Чтобы сделать исходный уровень одним шагом в выбранном в настоящее время потоке, выполните `step` (или `s`). Это приведет вас в `name_override_.empty()`. Чтобы продолжить и сделать шаг вперед, запустить `next` (или `n`).

```sh
(lldb) шаг
Процесс 25244 остановлен
- нить #1: tid - 0x839a4c, 0x0000000100162dcc Electron Framework'atom::Browser::SetName (это -0x0000000108b14f20, имя "Электрон") - 44 в browser.cc:119, очередь - 'com.apple.main-thread', стоп-причина - шаг в кадре
    #0: 0x0000000100162dcc Electron Framework'atom::Browser::SetName (это -0x0000000108b14f20, имя "Электрон") - 44 в browser.cc:119
   116
   117 void Browser:SetName(const std:::string& name) -
   118 name_override_ - имя;
-> 119
   120
   121 int Browser::GetBadgeCount() -
   122 badge_count_;
```

**ПРИМЕЧАНИЕ:** Если вы не видите исходный код, когда вы думаете, что вы должны, вы, возможно, не добавили `~/.lldbinit` файл выше.

To finish debugging at this point, run `process continue`. You can also continue until a certain line is hit in this thread (`thread until 100`). This command will run the thread in the current frame till it reaches line 100 in this frame or stops if it leaves the current frame.

Now, if you open up Electron's developer tools and call `setName`, you will once again hit the breakpoint.

### Дальнейшее изучение

LLDB это мощный инструмент с отличной документацией. Чтобы узнать больше об этом, рассмотрим документацию apple по отладке, например, ссылку на структуру командования [LLDB][lldb-command-structure] или введение в [Использование LLDB в качестве автономного debugger][lldb-standalone].

You can also check out LLDB's fantastic [manual and tutorial][lldb-tutorial], which will explain more complex debugging scenarios.

[lldb-command-structure]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2
[lldb-standalone]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html
[lldb-tutorial]: https://lldb.llvm.org/tutorial.html
