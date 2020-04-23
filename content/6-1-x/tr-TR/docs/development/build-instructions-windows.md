# İnşaa Talimatları (Windows)

Electron'u windows üzerinde inşaa etmek için aşağıdaki yönlendirmeleri takip edin.

## Ön gereklilikler

* Windows 10 / Server 2012 R2 veya üzeri
* Visual Studio 2017 15.7.2 ya da daha yüksek bir sürüm - [VS 2017 Community sürümünü ücretsiz olarak indir](https://www.visualstudio.com/vs/)
* [Python 2.7.10 ya da daha yüksek bir sürüm](http://www.python.org/download/releases/2.7/)
  * Contrary to the `depot_tools` setup instructions linked below, you will need to use your locally installed Python with at least version 2.7.10 (with support for TLS 1.2). To do so, make sure that in **PATH**, your locally installed Python comes before the `depot_tools` folder. Right now `depot_tools` still comes with Python 2.7.6, which will cause the `gclient` command to fail (see https://crbug.com/868864).
  * [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) is also needed in order to run the build process.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
  * SDK'nın farklı sürümleri yan yana monte edilebilir. SDK'yı yüklemek için, Visual Studio Installer’ı açın, ` Değişim ` → ` Bireysel Bileşenler `, aşağı kaydırın ve uygun olanı seçin Windows SDK'yı yüklemek için. Another option would be to look at the [Windows SDK and emulator archive](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) and download the standalone version of the SDK respectively.
  * Ayrıca SDK(Yazılım Geliştirme Kiti) hata ayıklama araçları kurulmuş olmalıdır. If the Windows 10 SDK was installed via the Visual Studio installer, then they can be installed by going to: `Control Panel` → `Programs` → `Programs and Features` → Select the "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. Or, you can download the standalone SDK installer and use it to install the Debugging Tools.

Hali hazırda Windows kurulumunuz mevcut değilse, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) adresinde Windows'un belirli zamanlarda işaretlenmiş versiyonlarını, Electron'u inşaa etmek için kullanabilirsiniz.

Electron'u inşaa etmek tamamen komut satırı betikleri üzerinden yapılır. Visual Studio ile yapmak mümkün değildir. Electron'u herhangi bir editör ile geliştirebilirsiniz ama VisualStudio ile inşaa desteği ileride gelecek.

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

## İnşaa

Bakmak [Derleme Komutları: GN](build-instructions-gn.md)

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

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). Bu düzeltilmeli:

```sh
$ git config --system core.longpaths true
```

### hata: bildirilmemiş tanımlayıcı kullanımı 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### ImportError: No module named win32file

Make sure you have installed `pywin32` with `pip install pywin32`.
