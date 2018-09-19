# "Build Instructions" (Windows)

Sundin ang mga sumusunod na patnubuay para sa pagbuo ng Elektron sa "Windows".

## Mga Pangunahing Kailangan

* Windows 10 / Server 2012 R2 o mas mataas pa
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Debugging Tools para sa Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) ang `symstore.exe` ay ginagamit para sa paggawa ng "symbol store" o kung saan nakalagak ang "symbol files", na galing sa payl na `.pdb` na kinakailangan kung nais mong gumawa o lumikha ng kumpletong ditribusyon.

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