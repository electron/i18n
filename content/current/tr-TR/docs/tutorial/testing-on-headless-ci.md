# Başsız CI Sistemlerde Test (Travis CI, Jenkins)

Chronium'a dayanan Electron'un, çalışması için bir ekran sürücüsü gerekir. If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. Travis, Circle, Jenkins veya benzeri sistemlerdeki Electron tabanlı uygulamaların test edilmesi bu nedenle biraz yapılandırma gerektirir. Özünde, bir sanal ekran sürücüsü kullanmamız gerekir.

## Sanal Ekran Sunucusunu Yapılandırma

Önce

 Xvfb'yi </ 0> yükleyin. X11, ekran sunucusu protokolünü uygulayan sanal çerçeve tampon belleğidir - ekran görüntüsü göstermeden bellekteki tüm grafik işlemleri gerçekleştirir; tam da ihtiyacımız olan şey budur.</p> 

Then, create a virtual Xvfb screen and export an environment variable called DISPLAY that points to it. Electron'da Chromium otomatik olarak `$DISPLAY` arar, bu nedenle uygulamanıza başka bir yapılandırma gerekli değildir. This step can be automated with Anaïs Betts' [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure Xvfb, if required by the current system. On Windows or macOS, it will do nothing.



```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```




### Travis CI

Travis'te, ` travis.yml`'iniz kabaca şöyle olmalıdır:



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

Jenkins için, bir [Xvfb girişi mevcuttur](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).



### CI Döngüsü

Circle CI is awesome and has Xvfb and `$DISPLAY` [already set up, so no further configuration is required](https://circleci.com/docs/environment#browsers).



### AppVeyor

AppVeyor, Windows'da çalışır ve Selenium, Chromium , Electron ve benzeri araçları kutudan çıkarmadan destekler - yapılandırmaya gerek yoktur.
