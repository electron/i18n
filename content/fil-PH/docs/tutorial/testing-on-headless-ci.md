# Pagsusuri sa Headless na mga Cl System (Travis Cl, Jenkins)

Dahil nababase ito sa Chromium, ang Electron ay nangangailangan ng isang driver na pang-display upang gumana. Kung hindi makakakita ng driver na pang-display ang Chromium, ang Electron ay papalya sa paglunsad, at sa madaling salita, hindi makapagpagana ng kahit isa sa iyong mga pagsusuri, anuman ang paraan mo ng pagpapatakbo nito. Ang pagsusuri sa mga app na nakabatay sa Electron sa Travis, Circle, Jenkins o mga katulad na mga sistema, sa madaling salita, ay nangangailangan ng kaunting konpigurasyon. Ang mahalaga, kailangan nating gumamit ng isang virtual na display driver.

## Pagko-configure ng Server ng Virtual Display

Una, i-install ang [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Ito ay isang virtual na framebuffer na naglulunsad ng X11 display server protocol - ginaganap nito ang lahat ng mga grapikal na operasyon sa memorya nang hindi ng kahit ano sa screen, at ito ang ating kinakailangan.

Pagkatapos, gumawa ng isang virtual na xvfb screen at i-export sa isang environment na varyabol na tinatawag na DISPLAY na nakaturo dito. Ang Chromium sa Electron ay awtomatikong maghahanap ng `$DISPLAY`, kaya wala nang konpigurasyon sa app na kailangan. Ang hakbang na ito ay mapapadali gamit ang [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe) ni Paul Betts: I-prepend ang iyong mga utos-pagsusuri gamit ang `xvfb-maybe` at ang maliit na kasangkapan ay awtomatikong i-configure ang xvfb kung kailangan ng kasalukuyang sistema. Sa Windows o macOS, wala lang itong gagawin.

```sh
## On Windows or macOS, this just invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
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

Circle CI is awesome and has xvfb and `$DISPLAY` [already setup, so no further configuration is required](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor runs on Windows, supporting Selenium, Chromium, Electron and similar tools out of the box - no configuration is required.