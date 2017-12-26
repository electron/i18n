# Testing on Headless CI Systems (Travis CI, Jenkins)

Berdasarkan Chromium , Electron mengharuskan penggerak tampilan berfungsi. Jika Chromium tidak dapat menemukan driver display, Elektron akan gagal diluncurkan - dan oleh karena itu tidak menjalankan tes Anda, terlepas dari bagaimana Anda menjalankannya. Menguji Aplikasi berbasis elektron pada Travis, Circle, Jenkins atau sejenisnya Sistem memerlukan sedikit konfigurasi. Intinya, kita perlu menggunakan driver display virtual.

## Mengkonfigurasi Server Tampilan Virtual

Pertama, instal  Xvfb </ 0> . Ini adalah framebuffer virtual, menerapkan protokol server tampilan X11 - itu melakukan semua operasi grafis di memori tanpa menunjukkan output layar, itulah yang kita butuhkan.</p> 

Kemudian, buat layar virtual xvfb dan ekspor variabel lingkungan disebut DISPLAY yang menunjukkan hal itu. Chromium in Electron secara otomatis akan mencari ` $ DISPLAY </ 0> , sehingga tidak diperlukan konfigurasi lebih lanjut dari aplikasi Anda.
Langkah ini bisa diotomatisasi dengan Paul Betts's
 <a href="https://github.com/paulcbetts/xvfb-maybe"> xvfb-maybe </a> : Tuliskan perintah pengujian Anda dengan <code> xvfb-maybe ` dan alat kecil akan secara otomatis mengkonfigurasi xvfb, jika dibutuhkan oleh sistem saat ini. Pada Windows atau macos, itu akan sederhana tidak melakukan apapun.

```sh
## Pada Windows atau macos, ini hanya memanggil electron-mocha
## Di Linux, jika kita berada dalam lingkungan tanpa kepala, ini akan sama
## ke xvfb-run electron-mocha ./test/*.js
xvfb-mungkin elektron-mocha ./test/*.js
```

### Travis CI

On Travis, your `.travis.yml` should look roughly like this:

```yml
addons:
  apt:
    packages:
      - xvfb

install:
  - export DISPLAY=':99.0'
  - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Jenkins

For Jenkins, a [Xvfb plugin is available](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI is awesome dan memiliki xvfb dan `$DISPLAY` [sudah disiapkan, jadi tidak ada konfigurasi lebih lanjut yang diperlukan](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor berjalan di Windows, mendukung Selenium, Chromium, Electron dan sejenisnya alat di luar kotak - tidak diperlukan konfigurasi.