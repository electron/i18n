# Headless CI Systems 测试 (Travis CI, Jenkins)

Electron 基于 Chromium，所以需要一个显示驱动使其运转。 If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. 在 Travis，Circle， Jenkins 或者类似的系统上测试基于Electron的应用时，需要进行一些配置。 本质上，我们需要使用一个 虚拟的显示驱动。

## 配置虚拟显示服务器

首先安装 [Xvfb](https://en.wikipedia.org/wiki/Xvfb). 这是一个虚拟的帧缓冲，实现了X11显示服务协议，所有的图形操作都在内存中表现，而不需要显示在 任何屏幕输出设备上。这正是我们所需要的。

然后创建一个虚拟的xvfb屏幕并且导出一个指向他的名为 DISPLAY 的环境变量。 Electron 中的 Chromium 会自动的去寻找 `$DISPLAY`，所以你的应用不需要再去进行配置 这一步可以通过 Paul Betts 的 [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe) 实现自动化：如果系统需要，在`xvfb-maybe`前加上你的测试命令 然后这个小工具会自动的设置 xvfb。 On Windows or macOS, it will do nothing.

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

在 Travis 上, 你的 `.travis.yml` 应该和下面的代码相似:

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

Jenkins下, 有一个[可用的 Xvfb 插件](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin)。

### Circle CI

Circle CI 是非常棒的而且有xvfb，`$DISPLAY`也[已经搭建，所以不需要再进行设置](https://circleci.com/docs/environment#browsers)。

### AppVeyor

AppVeyor 运行于 Windows 上，支持 Selenium，Chromium，Electron 以及一些类似的工具，开箱即用，无需配置