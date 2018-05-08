# 在無周邊 CI 系統上測試 (Travis CI, Jenkins)

因為 Electron 是架構在 Chromium 上的，需要顯示驅動程式才能運作。 If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. 要在 Travis, Circle, Jenkins 或類似的系統上測試 Electron 應用程式，需要一些額外設定。 實際上，我們需要使用虛擬顯示驅動程式。

## 設定虛擬顯示伺服器

首先，安裝 [Xvfb](https://en.wikipedia.org/wiki/Xvfb)。 It's a virtual framebuffer, implementing the X11 display server protocol - it performs all graphical operations in memory without showing any screen output, which is exactly what we need.

Then, create a virtual xvfb screen and export an environment variable called DISPLAY that points to it. Chromium in Electron will automatically look for `$DISPLAY`, so no further configuration of your app is required. This step can be automated with Paul Betts's [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure xvfb, if required by the current system. On Windows or macOS, it will do nothing.

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

在 Travis 上，你的 `.travis.yml` 看起來應該像這樣:

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

在 Jenkins 裡[有 Xvfb 外掛程式可以用](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin)。

### Circle CI

Circle CI 很威，[已經設定好 xvfb 及 `$DISPLAY`，不用再額外設定。](https://circleci.com/docs/environment#browsers)

### AppVeyor

AppVeyor 是在 Windows 上跑的，直接支援 Selenium, Chromium, Electron 及類似的工具，不需額外設定。