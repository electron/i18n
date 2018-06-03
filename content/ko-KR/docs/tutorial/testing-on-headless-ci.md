# Testing on Headless CI Systems (Travis CI, Jenkins) - UI 없이 테스트 하기

Chromium을 기반으로하는, Electron은 디스플레이 드라이버 작동을 요구합니다. 만약 Chromium이 디스플레이 드라이버를 찾을 수없는 경우, Electron을 실행하는 데 실패합니다 - 따라서 실행하는 방법에 관계없이 테스트를 실행하지 않습니다. Travis, Circle, Jenkins 또는 유사한 시스템에서 Electron기반 앱을 테스트하려면 약간의 구성이 필요합니다. 실제로, 우리는 가상 디스플레이 드라이버의 사용이 필요합니다.

## 가상 디스플레이 서버 구성

우선, [Xvfb](https://en.wikipedia.org/wiki/Xvfb)를 설치합니다. It's a virtual framebuffer, implementing the X11 display server protocol - it performs all graphical operations in memory without showing any screen output, which is exactly what we need.

Then, create a virtual xvfb screen and export an environment variable called DISPLAY that points to it. Chromium in Electron will automatically look for `$DISPLAY`, so no further configuration of your app is required. This step can be automated with Paul Betts's [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure xvfb, if required by the current system. On Windows or macOS, it will do nothing.

```sh
## On Windows or macOS, this invokes electron-mocha
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