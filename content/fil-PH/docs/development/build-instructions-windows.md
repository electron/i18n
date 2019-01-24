# "Build Instructions" (Windows)

Sundin ang mga sumusunod na patnubuay para sa pagbuo ng Elektron sa "Windows".

## Mga Pangunahing Kailangan

* Windows 10 / Server 2012 R2 o mas mataas pa
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7.10 or higher](http://www.python.org/download/releases/2.7/) 
  * Contrary to the `depot_tools` setup instructions linked below, you will need to use your locally installed Python with at least version 2.7.10 (with support for TLS 1.2). To do so, make sure that in **PATH**, your locally installed Python comes before the `depot_tools` folder. Right now `depot_tools` still comes with Python 2.7.6, which will cause the `gclient` command to fail (see https://crbug.com/868864).
  * [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) is also needed in order to run the build process.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files. 
  * Different versions of the SDK can be installed side by side. To install the SDK, open Visual Studio Installer, select `Change` → `Individual Components`, scroll down and select the appropriate Windows SDK to install. Another option would be to look at the [Windows SDK and emulator archive](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) and download the standalone version of the SDK respectively.
  * The SDK Debugging Tools must also be installed. If the Windows 10 SDK was installed via the Visual Studio installer, then they can be installed by going to: `Control Panel` → `Programs` → `Programs and Features` → Select the "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. Or, you can download the standalone SDK installer and use it to install the Debugging Tools.

Kung wala kang "Windows installation", ang [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) ay mayroong mga bersyon ng "timebombed" ng "Windows" na maaaring gamitin upang bumuo ng Elektron.

Ang pagbuo ng Elektron ay nangyayari lamang sa "command-line scripts" at hindi magagawa sa "Visual Studio". Maaaring paunlarin ang Elektron nang kahit anong programa ng kompyuter na maaaring lumikha o bumago ng datos na dapat din ay hahalili sa "Visual Studio" sa hinaharap.

**Tandaan:** Kahit pa ang "Visual Studio" ay 'di ginagamit sa pagbuo ng Elektron, ito ay **kailangan** pa rin upang magamit ang kinakailangan na "toolchains" galing dito.

## Ang Pagbubuo

See [Build Instructions: GN](build-instructions-gn.md)

## Pagbuo ng 32bit

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Ang mga hakbang para sa iba pang pagbuo ay pareho lamang.

## Proyekto na "Visual Studio"

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## Paghahanap ng ProblemaPaghahanap ng Problema

### "Command xxxx" ay 'di mahanap

Kung ikaw ay makatagpo ng mali tulad ng `Command xxxx not found`, maaaring gamitin ang "console" na `VS2015 Command Prompt` para mapalabas ang mga binubuong iskrip.

### "Fatal internal compiler error": C1001

Siguraduhin na mayroon kang "installed" na pinakabagong "Visual Studio update".

### LNK1181: cannot open input file 'kernel32.lib'

Subukang ang "reinstalling" ng "32bit Node.js".

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp ay 'di kinikilala bilang panloob o panlabas na "command"

Maaaring makuha ang maling ito kapag ikaw ay gumagamit ng "Git Bash" para sa pagbuo, sa halip, dapat gamitin ang PowerShell o VS2015 Command Prompt.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```

### error: use of undeclared identifier 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.