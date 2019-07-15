# Testing on Headless CI Systems (Travis CI, Jenkins) - UI 없이 테스트 하기

Chromium을 기반으로하는, Electron은 디스플레이 드라이버 작동을 요구합니다. 만약 Chromium이 디스플레이 드라이버를 찾을 수없는 경우, Electron을 실행하는 데 실패합니다 - 따라서 실행하는 방법에 관계없이 테스트를 실행하지 않습니다. Travis, Circle, Jenkins 또는 유사한 시스템에서 Electron기반 앱을 테스트하려면 약간의 구성이 필요합니다. 실제로, 우리는 가상 디스플레이 드라이버의 사용이 필요합니다.

## 가상 디스플레이 서버 구성

우선, [Xvfb](https://en.wikipedia.org/wiki/Xvfb)를 설치합니다. X11 디스플레이 서버 프로토콜을 구현된 가상 프레임 버퍼이며 - 우리가 정확하게 필요로 하는 기능인 화면에 출력하지 않고 메모리에서 모든 그래픽 작업을 수행합니다.

Then, create a virtual Xvfb screen and export an environment variable called DISPLAY that points to it. Electron의 Chromium은 자동으로 `$DISPLAY`를 검색하므로, 더이상 앱의 구성이 필요 없습니다. This step can be automated with Anaïs Betts' [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure Xvfb, if required by the current system. Windows 또는 macOS에서는, 아무 작업도 수행하지 않습니다.

```sh
## Windows 나 macOS에서, 다음 명령은 electron-mocha 를 실행합니다
## Linux에서, Ui없는 환경이라면
## xvfb-run electron-mocha ./test/*.js 가 동일한 명령입니다.
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

Travis에서 `.travis.yml`은 대략 다음과 같이 보일 것입니다.

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

Jenkins의 경우 [Xvfb 플러그인을 사용할 수 있습니다](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI is awesome and has Xvfb and `$DISPLAY` [already set up, so no further configuration is required](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor는 Windows에서 실행되며, Selenium, Chromium, Electron 및 유사 도구를 즉시 지원합니다 - 구성이 필요하지 않습니다.