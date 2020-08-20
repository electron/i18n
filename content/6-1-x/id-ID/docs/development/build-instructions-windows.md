# Membangun Intruksi (Windows)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* Windows 10 / Server 2012 R2 atau lebih tinggi
* Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7.10 atau lebih baru](http://www.python.org/download/releases/2.7/)
  * Berkebalikan dengan instruksi pemasangan `depot_tools` yang ada di bawah ini, anda perlu untuk menggunakan Python dengan versi minimal 2.7.10 yang terpasang secara lokal (dengan dukungan untuk TLS 1.2). To do so, make sure that in **PATH**, your locally installed Python comes before the `depot_tools` folder. Saat ini `depot_tools` masih memerlukan Python 2.7.6, yang akan menyebabkan perintah ekstensi `gclient` akan gagal (lihat https://crbug.com/868864).
  * [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) juga diperlukan agar proses build dapat berlangsung.
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
  * Versi SDK yang berbeda dapat dipasang bersamaan. Untuk memasang SDK, buka Visual Studio Installer, pilih `Change` → `Individual Components`, gulir ke bawah dan pilih SDK yang sesuai untuk dipasang. Opsi lainnya dapat ditemukan di [Windows SDK and emulator archive](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) dan unduh SDK versi standalone.
  * Peralatan Debugging SDK juga harus dipasang. Bila SDK WIndows 10 telah terpasang melalui Visual Stdio installer, lalu mereka dapat dipasang melalui: `Control Panel` → `Programs` → `Programs and Features` → pilih "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. Atau, Anda dapat mengunduh penginstal SDK mandiri dan menggunakannya untuk menginstal Alat Debugging.

Jika saat ini Anda tidak memiliki instalasi Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) memiliki versi Windows yang timebombed yang dapat anda gunakan untuk membangun Electron.

Bangunan Electron dilakukan sepenuhnya dengan script baris perintah dan tidak dapat dilakukan dengan Visual Studio. Anda bisa mengembangkan electron dengan editor tapi dukungan untuk bangunan dengan Visual Studio akan datang di masa depan.

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

## Bangunan

Lihat [Build Instructions: GN](build-instructions-gn.md)

## Membangun 32bit

Untuk membangun target 32bit, Anda harus meneruskan ` target_cpu = "x86" ` sebagai GN arg. Anda dapat membangun target 32bit bersama dengan target 64bit dengan menggunakan file direktori keluaran yang berbeda untuk GN, mis. ` out / Release-x86 `, dengan berbeda argumen.

```powershell
$ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""
```

Langkah lain membangun tentu sama persis.

## Proyek Visual Studio

Untuk membuat proyek Visual Studio, Anda dapat mengirimkan parameter ` --ide = vs2017 ` ke ` gn gen `:

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

Membuat direktori tersebut [ should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp tidak dikenali sebagai perintah internal atau eksternal

Anda mungkin mendapatkan kesalahan ini jika Anda menggunakan Git Bash untuk bangunan, sebaiknya gunakan PowerShell atau VS2015 Command Prompt sebagai gantinya.

### tidak dapat membuat direktori di '...': Nama file terlalu panjang

node.js memiliki beberapa [extremely long path names](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), dan secara default git di windows tidak menangani nama jalur yang panjang dengan benar (meskipun windows mendukungnya). Ini harus memperbaikinya:

```sh
$ git config --system core.longpaths true
```

### error: penggunaan pengenal yang tidak diumumkan 'DefaultDelegateCheckMode'

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### ImportError: Tidak ada modul bernama win32file

Pastikan anda telah memeasang `pywin32` dengan `pip install pywin32`.
