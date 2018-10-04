# Membangun petunjuk (Windows)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* Windows 10 / Server 2012 R2 atau lebih tinggi
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Debugging Tools untuk Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) jika Anda berencana untuk membuat distribusi penuh sejak `symstore.exe` digunakan untuk membuat simbol dari `.pdb` file.

Jika saat ini Anda tidak memiliki instalasi Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) memiliki versi Windows yang timebombed yang dapat anda gunakan untuk membangun Electron.

Bangunan Electron dilakukan sepenuhnya dengan script baris perintah dan tidak dapat dilakukan dengan Visual Studio. Anda bisa mengembangkan electron dengan editor tapi dukungan untuk bangunan dengan Visual Studio akan datang di masa depan.

**Catatan:** Walaupun Visual Studio tidak digunakan untuk membangun, hal ini masih **diperlukan** karena kita perlu membangun toolchains yang menyediakan.

## Bangunan

See [Build Instructions: GN](build-instructions-gn.md)

## Membangun 32bit

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Langkah lain membangun tentu sama persis.

## Proyek Visual Studio

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

```powershell
$ gn gen out/Debug --ide=vs2017
```

## Penyelesaian masalah

### Perintah xxxx tidak ditemukan

Jika Anda mengalami kesalahan seperti `Command xxxx tidak ditemukan`, Anda dapat mencoba menggunakannya `VS2015 Command Prompt` konsol untuk menjalankan bangunan skrip.

### Kesalahan fatal kompilator internal: C1001

Pastikan Anda menginstal pembaruan Visual Studio terbaru.

### LNK1181: tidak dapat membuka file masukan 'kernel32.lib'

Try reinstalling 32bit Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp tidak dikenali sebagai perintah internal atau eksternal

Anda mungkin mendapatkan kesalahan ini jika Anda menggunakan Git Bash untuk bangunan, sebaiknya gunakan PowerShell atau VS2015 Command Prompt sebagai gantinya.

### cannot create directory at '...': Filename too long

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

```sh
$ git config --system core.longpaths true
```