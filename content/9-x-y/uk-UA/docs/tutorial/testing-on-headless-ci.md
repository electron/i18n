# Testing on Headless CI Systems (Travis CI, Github Actions, Jenkins)

Для роботи Electron потрібен драйвер для функціонування дисплеїв. Якщо Chromium не може знайти драйвер дисплея, Electron не зможе запустити - і тому не буде виконувати жодне з ваших тестів, незалежно від того, як ви працюєте на їх. Для тестування програм на Travis, Circle, Jenkins або схожих системах потрібно трохи змістити конфігурацію. По суті потрібно використовувати віртуальний диспетчер дисплея.

## Налаштування Virtual Display Server

Спочатку інсталюйте [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Це віртуальний фреймбурф, впровадження протоколу сервера X11 - це виконує всі графічні операції в пам'яті, не показуючи будь-яких виходів, , що саме нам потрібно.

Потім створіть віртуальний Xvfb екран і експортує змінну середовища під назвою DISPLAY, що вказує на нього. Chromium в Electron автоматично виглядатиме для `$DISPLAY`, тому програма не потрібна додаткова. This step can be automated with Anaïs Betts' [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure Xvfb, if required by the current system. На Windows або macOS, це нічого не робіть.

```sh
## На Windows або macOS, це посилається на electron-mocha
## на Linux якщо ми перебуваємо у безголовому середовищі, то це буде еквівалентно
## до xvfb-run electron-mocha . тест/*.js
xvfb-можливо electron-mocha ./test/*.js
```

### Travis CI

На Travis ваш `.travis.yml` має виглядати приблизно так:

```yml
addons:
  apt:
    packages:
      - xvfb

install:
  - export DISPLAY=':99.0'
  - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Github Actions

For Github Actions, a [Xvfb action is available](https://github.com/marketplace/actions/gabrielbb-xvfb-action).

### Jenkins

Для Jenkins [в наявності плагін Xvfb ](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Circle CI є неймовірним і має Xvfb і `$DISPLAY` [вже встановлено, тому жодна подальша конфігурація не є обов'язковою](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor запускається на Windows, підтримує Selenium, Chromium, Electron і їм подібні інструменти з коробки - ніякої конфігурації не потрібно.
