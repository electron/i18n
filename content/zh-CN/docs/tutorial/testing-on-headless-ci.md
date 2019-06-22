# Headless CI Systems 测试 (Travis CI, Jenkins)

Electron 基于 Chromium，所以需要一个显示驱动使其运转。 如果 Chromium 无法找到一个显示驱动， Electron 会启动失败，因此无论你如何去运行它，Electron 不会执行你的任何测试。 在 Travis，Circle， Jenkins 或者类似的系统上测试基于Electron的应用时，需要进行一些配置。 本质上，我们需要使用一个 虚拟的显示驱动。

## 配置虚拟显示服务器

首先安装 [Xvfb](https://en.wikipedia.org/wiki/Xvfb). 这是一个虚拟的帧缓冲，实现了X11显示服务协议，所有的图形操作都在内存中表现，而不需要显示在 任何屏幕输出设备上。这正是我们所需要的。

Then, create a virtual Xvfb screen and export an environment variable called DISPLAY that points to it. Electron 中的 Chromium 会自动的去寻找 `$DISPLAY`，所以你的应用不需要再去进行配置 This step can be automated with Paul Betts's [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure Xvfb, if required by the current system. 在 Windows 或 macOS ，它不会执行任何东西。

```sh
## 在 Windows 或者 macOS，这只是调用 electron-mocha
## 在 Linux， 如果我们在一个 headless 环境，这将是等同于
## 执行 xvfb-run electron-mocha ./test/*.js
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

Circle CI is awesome and has Xvfb and `$DISPLAY` [already set up, so no further configuration is required](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor 运行于 Windows 上，支持 Selenium，Chromium，Electron 以及一些类似的工具，开箱即用，无需配置