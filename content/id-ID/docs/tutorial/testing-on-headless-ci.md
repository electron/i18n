# Testing on Headless CI Systems (Travis CI, Jenkins)

Berdasarkan Chromium , Electron mengharuskan penggerak tampilan berfungsi. If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. Menguji Aplikasi berbasis elektron pada Travis, Circle, Jenkins atau sejenisnya Sistem memerlukan sedikit konfigurasi. Intinya, kita perlu menggunakan driver display virtual.

## Mengkonfigurasi Server Tampilan Virtual

Pertama, instal  Xvfb </ 0> . Ini adalah framebuffer virtual, menerapkan protokol server tampilan X11 - itu melakukan semua operasi grafis di memori tanpa menunjukkan output layar, itulah yang kita butuhkan.</p> 

Kemudian, buat layar virtual xvfb dan ekspor variabel lingkungan disebut DISPLAY yang menunjukkan hal itu. Chromium in Electron secara otomatis akan mencari ` $ DISPLAY </ 0> , sehingga tidak diperlukan konfigurasi lebih lanjut dari aplikasi Anda.
Langkah ini bisa diotomatisasi dengan Paul Betts's
 <a href="https://github.com/paulcbetts/xvfb-maybe"> xvfb-maybe </a> : Tuliskan perintah pengujian Anda dengan <code> xvfb-maybe ` dan alat kecil akan secara otomatis mengkonfigurasi xvfb, jika dibutuhkan oleh sistem saat ini. On Windows or macOS, it will do nothing.

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

Di Travis, ` .travis.yml ` Anda akan terlihat seperti ini:

```yml
addons:
   apt:
     packages:
       - xvfb install:
   - export DISPLAY = ':   99.0 '
 - Xvfb: 99 -screen 0 1024x768x24 & gt; / dev / null 2 & gt; & amp; 1 & amp;
```

### Jenkins

Untuk Jenkins, plugin  Xvfb tersedia </ 0> .</p> 

### Lingkaran CI

Circle CI is awesome dan memiliki xvfb dan ` $ DISPLAY ` [ sudah disiapkan, jadi tidak perlu konfigurasi lebih lanjut ](https://circleci.com/docs/environment#browsers) .

### AppVeyor

AppVeyor berjalan di Windows, mendukung Selenium, Chromium, Electron dan sejenisnya alat di luar kotak - tidak diperlukan konfigurasi.