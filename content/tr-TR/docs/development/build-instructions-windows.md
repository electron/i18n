# İnşaa Talimatları (Windows)

Electron'u windows üzerinde inşaa etmek için aşağıdaki yönlendirmeleri takip edin.

## Ön gereklilikler

* Windows 10 / Server 2012 R2 veya üzeri
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Tam teşekkül bir dağıtım yaratmayı düşünüyorsanız, `symstore.exe`, `.pdb` dosyalarından sembol pazarı üretmek için kullanılır.

Hali hazırda Windows kurulumunuz mevcut değilse, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) adresinde Windows'un belirli zamanlarda işaretlenmiş versiyonlarını, Electron'u inşaa etmek için kullanabilirsiniz.

Electron'u inşaa etmek tamamen komut satırı betikleri üzerinden yapılır. Visual Studio ile yapmak mümkün değildir. Electron'u herhangi bir editör ile geliştirebilirsiniz ama VisualStudio ile inşaa desteği ileride gelecek.

**Not:** Visual Studio inşaa için kullanılmasa da **gerekli** çünkü Visual Studio ile gelen inşaa yardımcılarını kullanıyoruz.

## İnşaa

See [Build Instructions: GN](build-instructions-gn.md)

## 32bit İnşaa

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Diğer inşaa adımları aynı bu şekilde.

## Visual Studio projesi

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## Arıza Giderme

### Command xxxx not found

`Command xxxx not found`, gibi bir hata aldıysanız inşaa betiklerini `VS2015 Command Prompt` kullanarak çalıştırmayı deneyebilirsiniz.

### Fatal internal compiler error: C1001

Visual Studio'nun son sürümüne sahip olduğunuzdan emin olun.

### LNK1181: cannot open input file 'kernel32.lib'

32bit Node.js'i tekrardan kurmayı deneyin.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

İnşaa için Git Bash kullanıyorsanız, bu hatayı alabilirsiniz. Yerine Powershell veya VS2015 Komut Satırı'nı kullanmalısınız.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```