# macOs'da Hata Ayıklama

Eğer Electron'da JavaScriptten kaynaklanmadığını düşündüğünüz Electronun neden olduğu hatalarla karşılaşırsanız, hata ayıklama biraz can sıkıcı olabilir, özellikle yerel / C ++ için kullanılmayan geliştiriciler için hata ayıklama biraz zor olabilir. However, using lldb, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code. You can also use [XCode for debugging](debugging-instructions-macos-xcode.md) if you prefer a graphical interface.

## Gereksinimler

* **Electron'un bir hata ayıklama yapısı**: En kolay yol, genellikle [macOS için yapı talimatları](build-instructions-macos.md)'nda listelenen araçları ve ön koşulları kullanarak onu kendiniz kurmanızdır. While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.

* **Xcode**: Xcode'a ek olarak, ayrıca Xcode'un komut satırı araçlarını da yükler. They include LLDB, the default debugger in Xcode on macOS. It supports debugging C, Objective-C and C++ on the desktop and iOS devices and simulator.

* **.lldbinit**: Create or edit `~/.lldbinit` to allow Chromium code to be properly source-mapped.
   ```text
   command script import ~/electron/src/tools/lldb/lldbinit.py
   ```

## Electron'da ekleme yapma ve hata ayıklama

To start a debugging session, open up Terminal and start `lldb`, passing a non-release build of Electron as a parameter.

```sh
$ lldb ./out/Testing/Electron.app
(lldb) target create "./out/Testing/Electron.app"
Current executable set to './out/Testing/Electron.app' (x86_64).
```

### Kesme noktalarını ayarlama

LLDB güçlü bir araçtır ve kod denetimi için birden fazla stratejiyi desteklemektedir. Bu temel giriş için, JavaScript'ten doğru şekilde davranmayan bir komut çağırdığınızı varsayalım -böylece, bu komutun Electron kaynağı içindeki C++ muadili parçasını kırmak istiyorsunuz.

Relevant code files can be found in `./shell/`.

`browser.cc`'da `Browser:: SetName()` olarak tanımlanan `app.setName()`'i hata ayıklamak istediğinizi varsayalım. Devre dışı bırakılacak dosya ve satırı belirterek, kesme noktasını `breakpoint` komutunu kullanarak ayarlayın:

```sh
(lldb) breakpoint set --file browser.cc --line 117
Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4
```

Sonra, Electron'u başlatın.

```sh
(lldb) Çalıştır
```

Electron, uygulamanın adını başlattığında ayarladığından, uygulama hemen duraklatılır:

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

Geçerli karenin argümanlarını ve yerel değişkenlerini göstermek için uygulamanın şu anda adı "Electron" olarak ayarladığını gösterecek `frame variable` (veya `fr v`)'yi çalıştırın".

```sh
(lldb) frame variable
(atom::Browser *) this = 0x0000000108b14f20
(const string &) name = "Electron": {
    [...]
}
```

Seçili iş parçasında bir kaynak seviyesi tek adım yapmak için `step` (veya `s`) uygulayın. Bu sizi `name_override_.empty()`'e götürür. Devam etmek ve bir adım ileri atmak için `next`(veya `n`)'i çalıştırın.

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

Bu noktada hata ayıklamayı bitirmek için `process continue` komutunu çalıştırın. Bu iş parçacığına belirli bir satıra gelene kadar da devam edebilirsiniz (`thread until 100`). Bu komut, geçerli karede 100 satıra erişine kadar iş parçacığını çalıştırır veya geçerli kareden çıkmaya çalışır.

Ardından, Electron'un geliştirici araçlarını açar ve `setName` komutunu çağırırsanız, yine kırılma noktasına ulaşacaksınız.

### Daha fazla bilgi
LLDB harika bir dokümantasyona sahip güçlü bir araçtır. Bunun hakkında daha fazla bilgi edinmek için Apple'ın debug dökümantasyonuna göz atmayı düşünün, mesela [LLDB Komut Dizilimi Referansı](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) veya [LLDB'yi başlı başına debugger olarak kullanma](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

Aynı zamanda LLDB'nin fantastik ve daha komplex debug senaryolarını içeren [rehberlerine ve kılavuzlarına](https://lldb.llvm.org/tutorial.html) göz atabilirsiniz.
