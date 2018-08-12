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

## Ang Pagkuha ng "Code"

```powershell
$ git clone https://github.com/electron/electron.git
```

## "Bootstrapping"

Ang "bootstrap" skrip ay "dina-download" ang lahat ng kailangang "build dependencies" at nililikha ang "build project files". Pansinin ang ginagamit na `ninja` para sa pagbuo ng "Electron", ay humahadlang upang walang proyekto ng "Visual Studio" ang mabuo dito.

To bootstrap for a static, non-developer build, run:

```powershell
$ cd electron
$ npm run bootstrap
```

Or to bootstrap for a development session that builds faster by not statically linking:

```powershell
$ cd electron
$ npm run bootstrap:dev
```

## Ang Pagbubuo

Build both `Release` and `Debug` targets:

```powershell
$ npm run build
```

You can also build either the `Debug` or `Release` target on its own:

```powershell
$ npm run build:dev
```

```powershell
$ npm run build:release
```

After building is done, you can find `electron.exe` under `out\D` (debug target) or under `out\R` (release target).

## Pagbuo ng 32bit

To build for the 32bit target, you need to pass `--target_arch=ia32` when running the bootstrap script:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

The other building steps are exactly the same.

## Proyekto na "Visual Studio"

To generate a Visual Studio project, you can pass the `--msvs` parameter:

```powershell
$ python script\bootstrap.py --msvs
```

## Paglilinis

Upang malinis ang binubuong files:

```powershell
$ npm run clean
```

Na maglilinis lamang ng mga direktoryong `out` at `dist`:

```sh
$ npm run clean-build
```

Paalala: Ang parehong codes para sa paglilinis ay kailangang muling pinatatakbo ng `bootstrap</strong> bago mabuo.</p>

<h2>Mga Pagsusuri</h2>

<p>Tingnan ang <a href="build-system-overview.md#tests"> Buod ng Pagbuo ng Sistema: Mga Pagsusuri </a></p>

<h2>Paghahanap ng ProblemaPaghahanap ng Problema</h2>

<h3>"Command xxxx" ay 'di mahanap</h3>

<p>If you encountered an error like <code>Command xxxx not found`, you may try to use the `VS2015 Command Prompt` console to execute the build scripts.

### "Fatal internal compiler error": C1001

Make sure you have the latest Visual Studio update installed.

### Assertion failed: ((handle))->activecnt >= 0

If building under Cygwin, you may see `bootstrap.py` failed with following error:

```sh
Assertion failed: ((handle))->activecnt >= 0, file src\win\pipe.c, line 1430

Traceback (most recent call last):
  File "script/bootstrap.py", line 87, in <module>
    sys.exit(main())
  File "script/bootstrap.py", line 22, in main
    update_node_modules('.')
  File "script/bootstrap.py", line 56, in update_node_modules
    execute([NPM, 'install'])
  File "/home/zcbenz/codes/raven/script/lib/util.py", line 118, in execute
    raise e
subprocess.CalledProcessError: Command '['npm.cmd', 'install']' returned non-zero exit status 3
```

This is caused by a bug when using Cygwin Python and Win32 Node together. The solution is to use the Win32 Python to execute the bootstrap script (assuming you have installed Python under `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: cannot open input file 'kernel32.lib'

Try reinstalling 32bit Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp ay 'di kinikilala bilang panloob o panlabas na "command"

You may get this error if you are using Git Bash for building, you should use PowerShell or VS2015 Command Prompt instead.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```