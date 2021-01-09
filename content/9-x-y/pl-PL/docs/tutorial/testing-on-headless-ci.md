# Testing on Headless CI Systems (Travis CI, Github Actions, Jenkins)

Opierając się na Chromium, Electron wymaga sterownika wyświetlacza do działania. Jeśli Chromium nie może znaleźć sterownika wyświetlacza, Electron nie uruchomi się - i w związku z tym nie wykonasz żadnych testów, niezależnie od tego, jak używasz ich. Testowanie aplikacji elektronów w Travis, Circle, Jenkins lub podobnych Systemach wymaga więc niewielkiej konfiguracji. Zasadniczo musimy użyć wirtualnego sterownika.

## Konfigurowanie serwera wirtualnego wyświetlania

Najpierw zainstaluj [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Jest to wirtualny bufor ram, implementujący protokół serwera X11 - wykonuje wszystkie operacje graficzne w pamięci bez pokazywania wyjścia ekranu, dokładnie tego potrzebujemy.

Następnie utwórz wirtualny ekran Xvfb i wyeksportuj zmienną środowiskową o nazwie DISPLAY, która do niej wskazuje. Chromium w Electron będzie automatycznie szukał dla `$DISPLAY`, więc dalsza konfiguracja Twojej aplikacji nie jest wymagana. This step can be automated with Anaïs Betts' [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure Xvfb, if required by the current system. W systemie Windows lub macOS nic nie zrobi.

```sh
## W systemie Windows lub macOS wywołuje to electron-mocha
## Na Linux, jeśli znajdujemy się w środowisku bezgłownym, będzie to równoważne
## z xvfb-run electron-mocha . test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

W Travis, Twój `.travis.yml` powinien wyglądać mniej więcej tak:

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

Dla Jenkinsa dostępna jest [wtyczka Xvfb](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Circle CI

Okręg CI jest niesamowity i ma już skonfigurowane Xvfb i `$DISPLAY` [, więc dalsza konfiguracja nie jest wymagana](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor działa na Windows, wspierając w polu narzędzia Selenium, Chromium, Electron i podobne - konfiguracja nie jest wymagana.
