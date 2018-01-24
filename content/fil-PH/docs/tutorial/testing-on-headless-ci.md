# Pagsusuri sa Headless na mga Cl System (Travis Cl, Jenkins)

Dahil nababase ito sa Chromium, ang Electron ay nangangailangan ng isang driver na pang-display upang gumana. Kung hindi makakakita ng driver na pang-display ang Chromium, ang Electron ay papalya sa paglunsad, at sa madaling salita, hindi makapagpagana ng kahit isa sa iyong mga pagsusuri, anuman ang paraan mo ng pagpapatakbo nito. Ang pagsusuri sa mga app na nakabatay sa Electron sa Travis, Circle, Jenkins o mga katulad na mga sistema, sa madaling salita, ay nangangailangan ng kaunting konpigurasyon. Ang mahalaga, kailangan nating gumamit ng isang virtual na display driver.

## Pagko-configure ng Server ng Virtual Display

Una, i-install ang [Xvfb](https://en.wikipedia.org/wiki/Xvfb). It's a virtual framebuffer, implementing the X11 display server protocol - it performs all graphical operations in memory without showing any screen output, which is exactly what we need.

Then, create a virtual xvfb screen and export an environment variable called DISPLAY that points to it. Chromium in Electron will automatically look for `$DISPLAY`, so no further configuration of your app is required. This step can be automated with Paul Betts's [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure xvfb, if required by the current system. On Windows or macOS, it will simply do nothing.

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