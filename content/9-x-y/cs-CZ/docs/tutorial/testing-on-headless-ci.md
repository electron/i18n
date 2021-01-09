# Testing on Headless CI Systems (Travis CI, Github Actions, Jenkins)

Electron je založen na Chromu a potřebuje displejový ovladač. Pokud Chromium nedokáže najít ovladač obrazovky, Electron se nespustí - a proto neprovede žádný z vašich testů, bez ohledu na to, jak je používáte . Testování aplikací založených na Electronu v Travis, Circle, Jenkins nebo podobných systémech proto vyžaduje trochu konfigurace. V podstatě potřebujeme použít virtuálního ovladače.

## Konfigurace virtuálního displeje

Nejprve nainstalujte [Xvfb](https://en.wikipedia.org/wiki/Xvfb). Je to virtuální framebuffer, implementace zobrazovacího serveru X11 - provádí všechny grafické operace v paměti bez zobrazení výstupu obrazovky, , což přesně potřebujeme.

Pak vytvořte virtuální Xvfb obrazovku a exportujte proměnnou prostředí nazývanou DISPLAY, která na ni odkazuje. Chromium v Electronu automaticky vyhledá `$DISPLAY`, takže není potřeba další nastavení aplikace. Tento krok může být automatizován s Anai<unk> s Betts' [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe): Předložte test příkazy `xvfb-maybe` a malý nástroj automaticky nastaví Xvfb, je-li to vyžadováno stávajícím systémem. Na Windows nebo macOS to nic neudělá.

```sh
## Na Windows nebo macOS, to vyvolává elektronick-mocha
## Na Linuxu, pokud se nacházíme v prostředí bez hlav, bude to ekvivalentní
## k xvfb-run electron-mocha . test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### Cestování CI

V cestování by vaše `.travis.yml` měla vypadat zhruba takto:

```yml
addons:
  apt:
    balíčky:
      - xvfb

install:
  - export DISPLAY=':99. '
  - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Github Actions

For Github Actions, a [Xvfb action is available](https://github.com/marketplace/actions/gabrielbb-xvfb-action).

### Jenkins

Pro Jenkins je k dispozici [Xvfb plugin](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### Kruh CI

Kruh CI je úžasný a Xvfb a `$DISPLAY` [je již nastaven, takže není vyžadována žádná další konfigurace](https://circleci.com/docs/environment#browsers).

### AppVeyor

AppVeyor běží na Windows, podporuje Selenium, Chromium, Electron a podobné nástroje mimo krabici - není vyžadována žádná konfigurace.
