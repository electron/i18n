# Platform yang Didukung

Platform berikut didukung oleh Electron :

### macOS

Hanya binari 64bit yang disediakan untuk macOS , dan versi maco minimum yang didukung adalah macos 10.9.

### Windows

Windows 7 dan yang lebih baru didukung, sistem operasi yang lama tidak didukung (dan tidak berfungsi).

Kedua  ia32 </ 0> ( <code> x86 </ 0> ) dan <code> x64 </ 0> ( <code> amd64 </ 0> ) binari yang disediakan untuk Windows . Harap dicatat, versi Windows <code> ARM </ 0> tidak didukung untuk saat ini.</p>

<h3>Linux</h3>

<p>Berkas-berkas Elektron dibangun pada kode prebuilt <code> ia32 </ code> (<code> i686 </ code>) dan <code> x64 </ code> Ubuntu 12.04, biner <code> armv7l </ code> dibangun melawan ARM v7 dengan ABI hard-float dan NEON untuk Debian Wheezy.</p>

<p><a href="https://github.com/electron/electron/blob/master/docs/tutorial/planned-breaking-changes.md#duplicate-arm-assets"> Sampai rilis Electron 2.0 </a> , Elektron juga akan lanjutkan untuk melepaskan <code> armv7l </ code> biner dengan akhiran <code> lengan </ code> yang baru. Kedua binari adalah identik.</p>

<p>Apakah biner prebuilt dapat berjalan pada distribusi bergantung pada apakah distribusi mencakup perpustakaan yang terhubung dengan Elektron pada platform bangunan, jadi hanya Ubuntu 12.04 yang dijamin berhasil, namun mengikuti platform juga diverifikasi untuk dapat menjalankan binari prebuilt dari Elektron :</p>

<ul>
<li>Ubuntu 12.04 dan yang lebih baru</li>
<li>Fedora 21</li>
<li>Debian 8</li>
</ul>