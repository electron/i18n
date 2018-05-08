# Pagsusuri sa Headless na mga Cl System (Travis Cl, Jenkins)

Dahil nababase ito sa Chromium, ang Electron ay nangangailangan ng isang driver na pang-display upang gumana. If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. Ang pagsusuri sa mga app na nakabatay sa Electron sa Travis, Circle, Jenkins o mga katulad na mga sistema, sa madaling salita, ay nangangailangan ng kaunting konpigurasyon. Ang mahalaga, kailangan nating gumamit ng isang virtual na display driver.

## Pagko-configure ng Server ng Virtual Display

Una, i-install ang [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Ito ay isang virtual na framebuffer na naglulunsad ng X11 display server protocol - ginaganap nito ang lahat ng mga grapikal na operasyon sa memorya nang hindi ng kahit ano sa screen, at ito ang ating kinakailangan.

Pagkatapos, gumawa ng isang virtual na xvfb screen at i-export sa isang environment na varyabol na tinatawag na DISPLAY na nakaturo dito. Ang Chromium sa Electron ay awtomatikong maghahanap ng `$DISPLAY`, kaya wala nang konpigurasyon sa app na kailangan. Ang hakbang na ito ay mapapadali gamit ang [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe) ni Paul Betts: I-prepend ang iyong mga utos-pagsusuri gamit ang `xvfb-maybe` at ang maliit na kasangkapan ay awtomatikong i-configure ang xvfb kung kailangan ng kasalukuyang sistema. On Windows or macOS, it will do nothing.

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

Sa Travis, ang iyong `.travis.yml` ay dapat nakikitang ganito:

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

Sa Jenkins, ang isang [Xvfb plugin ay matatagpuan](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle Cl

Ang Circle Cl ay kahanga-hanga at mayroong xvfb at `$DISPLAY` [na naka-setup na kaya wala nang dagdag na konpigurasyon ang kailangan](https://circleci.com/docs/environment#browsers).

### AppVeyor

Ang AppVeyor ay gumagana sa Windows, sumusuporta sa Selenium, Chromium, Electron at mga katulad na kasangkapan - walang konpigurasyon na kailangan.