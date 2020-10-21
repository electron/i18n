# Тестирование с помощью систем непрерывной интеграции (Travis, Jenkins)

Being based on Chromium, Electron requires a display driver to function. If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. Testing Electron-based apps on Travis, Circle, Jenkins or similar Systems requires therefore a little bit of configuration. In essence, we need to use a virtual display driver.

## Configuring the Virtual Display Server

First, install [Xvfb](https://en.wikipedia.org/wiki/Xvfb). It's a virtual framebuffer, implementing the X11 display server protocol - it performs all graphical operations in memory without showing any screen output, which is exactly what we need.

Затем создайте виртуальный экран Xvfb и экспортируйте переменную окружения, называемую DISPLAY, которая указывает на него. Chromium in Electron will automatically look for `$DISPLAY`, so no further configuration of your app is required. Этот шаг может быть автоматизирован с помощью Anai<unk> s Betts' [xvfb-Может быть](https://github.com/anaisbetts/xvfb-maybe): Подготовьте ваши команды с `xvfb-может быть` и маленький инструмент автоматически настроет Xvfb, при необходимости текущей системой. On Windows or macOS, it will do nothing.

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

Для Travis, ваш `.travis.yml` должен выглядеть примерно так:

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

Для Jenkins доступен [плагин Xvfb](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Круг CI потрясающий и имеет Xvfb и `$DISPLAY` [уже настроен, поэтому дальнейшая настройка не требуется](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor работает под Windows, поддерживает Selenium, Chromium, Electron и другие подобные инструменты "из коробки" - настройка не требуется.
