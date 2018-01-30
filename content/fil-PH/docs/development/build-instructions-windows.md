# "Build Instructions" (Windows)

Sundin ang mga sumusunod na patnubuay para sa pagbuo ng Elektron sa "Windows".

## Mga Pangunahing Kailangan

* Windows 7 / Server 2008 R2 o mas mataas pa
* Visual Studio 2015 Update 3 - [download VS 2015 Community Edition for free](https://www.visualstudio.com/vs/older-downloads/)
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

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## Ang Pagbubuo

Ang pagbuo ng parehong pinupuntirya na "Release" at "Debug":

```powershell
$ python script\build.py
```

Maaari rin naman na buuin lamang ang pinupuntirya na "Debug":

```powershell
$ python script\build.py -c D
```

Matapos mabuo ang mga ito, maaaring makita ang `electron.exe` sa ilalim ng `out\D` (debug target) o sa ilalim ng `out\R` (release target).

## Pagbuo ng 32bit

Para mabuo ang pinupuntirya na 32bit, dapat daanan ang `--target_arch=ia32` kapag pinapatakbo ang iskrip na "bootstrap":

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

Ang mga hakbang para sa iba pang pagbuo ay pareho lamang.

## Proyekto na "Visual Studio"

Para makabuo ng proyekto ng "Visual Studio", maaaring idaan sa "parameter" na `--msvs`:

```powershell
$ python script\bootstrap.py --msvs
```

## Ang Paglilinis

Upang malinis ang binubuong files:

```powershell
$ npm run clean
```

Na maglilinis lamang ng mga direktoryong `out` at `dist`:

```sh
$ npm run clean-build
```

Paalala: Ang parehong codes para sa paglilinis ay kailangang muling pinatatakbo ng `bootstrap</strong> bago mabuo.</p>

<h2>Mga Pag-susuri</h2>

<p>Tingnan ang <a href="build-system-overview.md#tests"> Buod ng Pagbuo ng Sistema: Mga Pagsusuri </a></p>

<h2>"Troubleshooting"</h2>

<h3>"Command xxxx" ay 'di mahanap</h3>

<p>Kung ikaw ay makatagpo ng mali tulad ng <code>Command xxxx not found`, maaaring gamitin ang "console" na `VS2015 Command Prompt` para mapalabas ang mga binubuong iskrip.

### "Fatal internal compiler error": C1001

Siguraduhin na mayroon kang "installed" na pinakabagong "Visual Studio update".

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

Simply making that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp is not recognized as an internal or external command

You may get this error if you are using Git Bash for building, you should use PowerShell or VS2015 Command Prompt instead.