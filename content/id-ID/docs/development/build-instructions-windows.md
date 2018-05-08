# Membangun petunjuk (Windows)

Ikuti panduan di bawah ini untuk membangun Elektron di Linux.

## Prasyarat

* Windows 7 / Server 2008 R2 atau lebih tinggi
* Visual Studio 2017 - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
* [Python 2.7](http://www.python.org/download/releases/2.7/)
* [Node.js](https://nodejs.org/download/)
* [Git](http://git-scm.com)
* [Debugging Tools untuk Windows](https://msdn.microsoft.com/en-us/library/windows/hardware/ff551063.aspx) jika Anda berencana untuk membuat distribusi penuh sejak `symstore.exe` digunakan untuk membuat simbol dari `.pdb` file.

Jika saat ini Anda tidak memiliki instalasi Windows, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) memiliki versi Windows yang timebombed yang dapat anda gunakan untuk membangun Electron.

Bangunan Electron dilakukan sepenuhnya dengan script baris perintah dan tidak dapat dilakukan dengan Visual Studio. Anda bisa mengembangkan electron dengan editor tapi dukungan untuk bangunan dengan Visual Studio akan datang di masa depan.

**Catatan:** Walaupun Visual Studio tidak digunakan untuk membangun, hal ini masih **diperlukan** karena kita perlu membangun toolchains yang menyediakan.

## Mendapatkan kode

```powershell
$ git klon https://github.com/electron/electron.git
```

## Bootstrap

Script bootstrap akan mendownload semua dependensi build yang diperlukan dan membuat file proyek build. Perhatikan bahwa kita menggunakan `ninja` untuk membangun Electron sehingga tidak ada proyek Visual Studio yang dihasilkan.

```powershell
$ cd electron
$ python script\bootstrap.py -v
```

## Bangunan

Jika Anda ingin membangun target Release dan Debug :

```powershell
$ python script\build.py
```

Anda juga dapat membangun target Debug saja:

```powershell
$ python script\build.py - c D
```

Setelah pembangunan selesai, Anda dapat menemukan `electron.exe` dibawah `out\D` (debug target) atau di bawah `out\R` (rilis target).

## Membangun 32bit

Untuk membangun target 32bit, Anda harus melewati `--target_arch=ia32`kapan menjalankan script bootstrap:

```powershell
$ python script\bootstrap.py -v --target_arch=ia32
```

Langkah lain membangun tentu sama persis.

## Proyek Visual Studio

Untuk menghasilkan proyek Visual Studio, Anda bisa melewati `--msvs` parameter:

```powershell
$ python script\bootstrap.py --msvs
```

## Pembersihan

Untuk membersihkan membangun file:

```powershell
$ npm bersih
```

Untuk pembersihan hanya `keluar` dan `dist` direktori:

```sh
$ npm berjalan bersih-bangun
```

**Catatan:** Kedua perintah bersih perlu menjalankan `bootstrap` lagi sebelum membangun.

## Coba

Lihat [Bangun Gambaran Sistem: Pengujian](build-system-overview.md#tests)

## Penyelesaian masalah

### Perintah xxxx tidak ditemukan

Jika Anda mengalami kesalahan seperti `Command xxxx tidak ditemukan`, Anda dapat mencoba menggunakannya `VS2015 Command Prompt` konsol untuk menjalankan bangunan skrip.

### Kesalahan fatal kompilator internal: C1001

Pastikan Anda menginstal pembaruan Visual Studio terbaru.

### Assertion failed: ((handle))->activecnt >= 0

Jika membangun di bawah Cygwin, Anda mungkin melihat `bootstrap.py` gagal mengikuti perintah berikut kesalahan:

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

Hal ini disebabkan oleh bug saat menggunakan Cygwin Python dan Win32 Node bersamaan. Sebuah Solusinya adalah menggunakan Win32 Python untuk mengeksekusi script bootstrap (dengan asumsi Anda telah menginstal Python di bawah `C:\Python27`):

```powershell
$ /cygdrive/c/Python27/python.exe script/bootstrap.py
```

### LNK1181: tidak dapat membuka file masukan 'kernel32.lib'

Try reinstalling 32bit Node.js.

### Error: ENOENT, stat 'C:\Users\USERNAME\AppData\Roaming\npm'

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

```powershell
$ mkdir ~\AppData\Roaming\npm
```

### node-gyp tidak dikenali sebagai perintah internal atau eksternal

Anda mungkin mendapatkan kesalahan ini jika Anda menggunakan Git Bash untuk bangunan, sebaiknya gunakan PowerShell atau VS2015 Command Prompt sebagai gantinya.