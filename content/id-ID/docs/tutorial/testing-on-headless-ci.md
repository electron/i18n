# Testing on Headless CI Systems (Travis CI, Jenkins)

Being based on Chromium, Electron requires a display driver to function. If Chromium can't find a display driver, Electron will simply fail to launch - and therefore not executing any of your tests, regardless of how you are running them. Testing Electron-based apps on Travis, Circle, Jenkins or similar Systems requires therefore a little bit of configuration. In essence, we need to use a virtual display driver.

## Mengkonfigurasi Server Tampilan Virtual

First, install [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Ini adalah framebuffer virtual, menerapkan protokol server tampilan X11 - itu melakukan semua operasi grafis di memori tanpa menunjukkan output layar, itulah yang kita butuhkan.

Kemudian, buat layar virtual xvfb dan ekspor variabel lingkungan disebut DISPLAY yang menunjukkan hal itu. Chromium in Electron will automatically look for `$DISPLAY`, so no further configuration of your app is required. This step can be automated with Paul Betts's [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure xvfb, if required by the current system. Pada Windows atau macos, itu akan sederhana tidak melakukan apapun.

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